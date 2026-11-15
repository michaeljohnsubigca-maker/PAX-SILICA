import { describe, it, expect, vi } from 'vitest';
import {
  extractCitationEntries,
  isGenericPath,
  isRedirectWrapperUrl,
  detectBotChallenge,
  verifyCitationUrl,
} from './verify-sources-core.mjs';

function makeResponse({ status = 200, headers = {}, html = '<html><head><title>Article</title></head></html>' } = {}) {
  const cancel = vi.fn(async () => {});
  return {
    status,
    headers: new Headers(headers),
    body: { cancel },
    text: async () => html,
    cancelSpy: cancel,
  };
}

describe('verify-sources-core', () => {
  it('extracts both single- and double-quoted citation entries without crossing records', () => {
    const sample = `
      export const ITEMS = [
        { id: 'a-1', title: 'skip no citation' },
        { id: 'a-2', citationUrl: 'https://example.com/news/story-2' },
        { id: "a-3", citationUrl: "https://example.com/news/story-3" },
      ];
    `;
    expect(extractCitationEntries(sample)).toEqual([
      { id: 'a-2', url: 'https://example.com/news/story-2' },
      { id: 'a-3', url: 'https://example.com/news/story-3' },
    ]);
  });

  it('identifies generic root, section, and index paths', () => {
    expect(isGenericPath('/')).toBe(true);
    expect(isGenericPath('/news/')).toBe(true);
    expect(isGenericPath('/business')).toBe(true);
    expect(isGenericPath('/nation')).toBe(true);
    expect(isGenericPath('/campus-press')).toBe(true);
    expect(isGenericPath('/index.html')).toBe(true);
    expect(isGenericPath('/news/index.html')).toBe(true);
    expect(isGenericPath('/2026/11/14/thousands-of-youth-walk-out/')).toBe(false);
  });

  it('passes on a direct HTTP 200 article response', async () => {
    const fetchImpl = vi.fn(async () =>
      makeResponse({
        status: 200,
        html: '<html><head><title>Direct Story Title</title></head><body>ok</body></html>',
      }),
    );

    const result = await verifyCitationUrl('https://www.bulatlat.com/2026/11/14/story-slug/', {
      fetchImpl,
    });

    expect(result).toMatchObject({
      ok: true,
      status: 200,
      title: 'Direct Story Title',
      hops: [],
      finalUrl: 'https://www.bulatlat.com/2026/11/14/story-slug/',
    });
  });

  it('follows legitimate 301 article redirects, cancels intermediate bodies, and records hops', async () => {
    const redirectRes = makeResponse({
      status: 301,
      headers: { location: '/2026/11/14/canonical-story-slug/' },
    });
    const finalRes = makeResponse({
      status: 200,
      html: '<html><head><title>Canonical Story</title></head></html>',
    });

    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(redirectRes)
      .mockResolvedValueOnce(finalRes);

    const result = await verifyCitationUrl('https://example.com/2026/11/14/old-slug/', {
      fetchImpl,
    });

    expect(result).toMatchObject({
      ok: true,
      status: 200,
      title: 'Canonical Story',
      finalUrl: 'https://example.com/2026/11/14/canonical-story-slug/',
      hops: [
        {
          from: 'https://example.com/2026/11/14/old-slug/',
          to: 'https://example.com/2026/11/14/canonical-story-slug/',
          status: 301,
        },
      ],
    });
    expect(redirectRes.cancelSpy).toHaveBeenCalledTimes(1);
    expect(fetchImpl).toHaveBeenCalledWith(
      'https://example.com/2026/11/14/old-slug/',
      expect.objectContaining({ redirect: 'manual' }),
    );
  });

  it('rejects redirects landing on a generic homepage or section path', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(makeResponse({ status: 301, headers: { location: 'https://example.com/' } }))
      .mockResolvedValueOnce(makeResponse({ status: 200, html: '<title>Homepage</title>' }));

    const result = await verifyCitationUrl('https://example.com/2026/11/14/deleted-story/', {
      fetchImpl,
    });

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('GENERIC_DESTINATION');
  });

  it('rejects circular redirect loops', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(makeResponse({ status: 302, headers: { location: 'https://example.com/article-b' } }))
      .mockResolvedValueOnce(makeResponse({ status: 302, headers: { location: 'https://example.com/article-a' } }));

    const result = await verifyCitationUrl('https://example.com/article-a', {
      fetchImpl,
    });

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('REDIRECT_LOOP');
    expect(result.hops).toHaveLength(2);
  });

  it('rejects chains exceeding maxHops', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(makeResponse({ status: 302, headers: { location: 'https://example.com/step-1' } }))
      .mockResolvedValueOnce(makeResponse({ status: 302, headers: { location: 'https://example.com/step-2' } }))
      .mockResolvedValueOnce(makeResponse({ status: 302, headers: { location: 'https://example.com/step-3' } }));

    const result = await verifyCitationUrl('https://example.com/step-0', {
      maxHops: 2,
      fetchImpl,
    });

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('EXCEEDED_MAX_HOPS');
  });

  it('rejects HTTPS to HTTP protocol downgrade on redirect', async () => {
    const fetchImpl = vi.fn().mockResolvedValueOnce(
      makeResponse({
        status: 301,
        headers: { location: 'http://example.com/insecure-story' },
      }),
    );

    const result = await verifyCitationUrl('https://example.com/secure-story', {
      fetchImpl,
    });

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('PROTOCOL_DOWNGRADE');
  });

  it('rejects search/cloud redirect wrappers and shorteners', async () => {
    const fetchImpl = vi.fn();

    expect(isRedirectWrapperUrl('https://vertexaisearch.cloud.google.com/grounding-api-redirect/abc')).toBe(true);
    expect(isRedirectWrapperUrl('https://www.google.com/url?q=https://example.com/story')).toBe(true);
    expect(isRedirectWrapperUrl('https://bit.ly/3xyz')).toBe(true);

    const vertexResult = await verifyCitationUrl(
      'https://vertexaisearch.cloud.google.com/grounding-api-redirect/abc',
      { fetchImpl },
    );
    const googleUrlResult = await verifyCitationUrl(
      'https://www.google.com/url?q=https://example.com/story',
      { fetchImpl },
    );

    expect(vertexResult.ok).toBe(false);
    expect(vertexResult.reason).toBe('REDIRECT_WRAPPER');
    expect(googleUrlResult.ok).toBe(false);
    expect(googleUrlResult.reason).toBe('REDIRECT_WRAPPER');
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('rejects Cloudflare 403 and HTTP 200 soft challenge pages', async () => {
    expect(
      detectBotChallenge(403, { server: 'cloudflare', 'cf-ray': '12345-MNL' }, '<title>Attention Required! | Cloudflare</title>'),
    ).toBe(true);
    expect(
      detectBotChallenge(200, {}, '<html><head><title>Just a moment...</title></head></html>'),
    ).toBe(true);
    expect(
      detectBotChallenge(
        200,
        { server: 'cloudflare' },
        '<html><head><title>Real Article</title></head><body><script src="/cdn-cgi/challenge-platform/scripts/jsd/main.js"></script></body></html>',
      ),
    ).toBe(false);

    const fetch403 = vi.fn().mockResolvedValueOnce(
      makeResponse({
        status: 403,
        headers: { server: 'cloudflare', 'cf-ray': 'abc-MNL', 'cf-mitigated': 'challenge' },
        html: '<html><head><title>Just a moment...</title></head></html>',
      }),
    );

    const fetch200Soft = vi.fn().mockResolvedValueOnce(
      makeResponse({
        status: 200,
        html: '<html><head><title>Security Check - Verify Captcha</title></head></html>',
      }),
    );

    const res403 = await verifyCitationUrl('https://example.com/2026/11/14/protected-story', {
      fetchImpl: fetch403,
    });
    const res200Soft = await verifyCitationUrl('https://example.com/2026/11/14/soft-challenge', {
      fetchImpl: fetch200Soft,
    });

    expect(res403.ok).toBe(false);
    expect(res403.reason).toBe('BOT_CHALLENGE');
    expect(res200Soft.ok).toBe(false);
    expect(res200Soft.reason).toBe('BOT_CHALLENGE');
  });
});
