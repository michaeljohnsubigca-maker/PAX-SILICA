const GENERIC_EXACT_PATHS = new Set([
  '/',
  '/news',
  '/business',
  '/nation',
  '/campus-press',
  '/world',
  '/opinion',
  '/politics',
  '/economy',
  '/tech',
  '/technology',
  '/latest',
  '/breaking',
  '/articles',
  '/stories',
  '/topstories',
  '/home',
  '/index',
  '/news/nation',
  '/news/business',
  '/news/world',
  '/news/topstories',
  '/news/latest',
  '/topstories/nation',
]);

const INDEX_FILE_RE = /\/(?:index|default)\.(?:html?|php|aspx?)$/i;

const SHORTENER_HOSTS = new Set([
  'bit.ly',
  't.co',
  'tinyurl.com',
  'goo.gl',
  'ow.ly',
  'is.gd',
  'buff.ly',
  'rb.gy',
  'shorturl.at',
  'cutt.ly',
  'lnkd.in',
]);

const CHALLENGE_TITLE_RE = /(just a moment|attention required|security check|access denied|captcha)/i;
const CLOUDFLARE_BODY_RE = /cf-browser-verification|challenge-platform|__cf_chl_/i;
const SOFT_CHALLENGE_BODY_RE = /window\._cf_chl_opt|id=["']challenge-form["']/i;
const ENTRY_RE = /\bid\s*:\s*(['"])([^'"]+)\1(?:(?!\bid\s*:)[\s\S])*?\bcitationUrl\s*:\s*(['"])([^'"]+)\3/g;

function getHeader(headers, name) {
  if (!headers) return undefined;
  if (typeof headers.get === 'function') {
    return headers.get(name) ?? undefined;
  }
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === target) {
      return Array.isArray(value) ? value.join(', ') : String(value);
    }
  }
  return undefined;
}

function extractTitle(html) {
  return (String(html ?? '').match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
}

export function extractCitationEntries(fileContent) {
  const entries = [];
  for (const match of String(fileContent ?? '').matchAll(ENTRY_RE)) {
    entries.push({ id: match[2], url: match[4] });
  }
  return entries;
}

export function isGenericPath(pathname) {
  const normalized = String(pathname ?? '').trim().toLowerCase().replace(/\/+$/, '') || '/';
  if (GENERIC_EXACT_PATHS.has(normalized)) {
    return true;
  }
  return INDEX_FILE_RE.test(normalized);
}

export function isRedirectWrapperUrl(urlString) {
  let parsed;
  try {
    parsed = new URL(urlString);
  } catch {
    return false;
  }

  const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
  const pathname = parsed.pathname.toLowerCase();

  if (
    host === 'vertexaisearch.cloud.google.com' ||
    host.endsWith('.vertexaisearch.cloud.google.com')
  ) {
    return true;
  }

  if ((host === 'google.com' || host.endsWith('.google.com')) && (pathname === '/url' || pathname.startsWith('/url/'))) {
    return true;
  }

  if (
    (host === 'l.facebook.com' || host === 'lm.facebook.com' || host === 'facebook.com') &&
    pathname === '/l.php'
  ) {
    return true;
  }

  if (host === 'out.reddit.com') {
    return true;
  }

  return SHORTENER_HOSTS.has(host);
}

export function detectBotChallenge(status, headers, html = '') {
  const title = extractTitle(html);
  const cfMitigated = (getHeader(headers, 'cf-mitigated') ?? '').toLowerCase();
  const cfRay = getHeader(headers, 'cf-ray');
  const server = (getHeader(headers, 'server') ?? '').toLowerCase();

  if (cfMitigated.includes('challenge')) {
    return true;
  }

  if (CHALLENGE_TITLE_RE.test(title)) {
    return true;
  }

  if (
    (status === 403 || status === 503) &&
    (Boolean(cfRay) || server.includes('cloudflare') || CLOUDFLARE_BODY_RE.test(html))
  ) {
    return true;
  }

  return status === 200 && SOFT_CHALLENGE_BODY_RE.test(html);
}

function failResult(url, finalUrl, status, reason, title, hops) {
  return { ok: false, url, finalUrl, status, reason, title, hops };
}

export async function verifyCitationUrl(initialUrl, options = {}) {
  const {
    maxHops = 5,
    timeoutMs = 10000,
    fetchImpl = globalThis.fetch,
    userAgent = 'Mozilla/5.0',
  } = options;

  let parsed;
  try {
    parsed = new URL(initialUrl);
  } catch {
    return failResult(initialUrl, initialUrl, 'ERR', 'INVALID_URL', 'Invalid URL', []);
  }

  if (parsed.protocol !== 'https:') {
    return failResult(initialUrl, parsed.href, 'ERR', 'NON_HTTPS', `Non-HTTPS protocol "${parsed.protocol}"`, []);
  }

  if (isRedirectWrapperUrl(parsed.href)) {
    return failResult(initialUrl, parsed.href, 'WRAPPER', 'REDIRECT_WRAPPER', `Redirect wrapper "${parsed.hostname}"`, []);
  }

  if (isGenericPath(parsed.pathname)) {
    return failResult(initialUrl, parsed.href, 'GENERIC', 'GENERIC_PATH', `Generic path "${parsed.pathname}"`, []);
  }

  let currentUrl = parsed.href;
  const visited = new Set([currentUrl]);
  const hops = [];

  try {
    for (;;) {
      const fetchOptions = {
        redirect: 'manual',
        headers: { 'user-agent': userAgent },
      };
      if (typeof AbortSignal?.timeout === 'function') {
        fetchOptions.signal = AbortSignal.timeout(timeoutMs);
      }

      const res = await fetchImpl(currentUrl, fetchOptions);

      if (res.status >= 300 && res.status < 400) {
        // Drain/cancel intermediate redirect bodies so open sockets do not leak across hops.
        await res.body?.cancel()?.catch(() => {});

        const location = getHeader(res.headers, 'location');
        if (!location) {
          return failResult(initialUrl, currentUrl, res.status, 'MISSING_LOCATION', 'Redirect missing Location header', hops);
        }

        let nextUrl;
        try {
          nextUrl = new URL(location, currentUrl);
        } catch {
          return failResult(initialUrl, currentUrl, res.status, 'INVALID_REDIRECT_URL', `Invalid redirect target "${location}"`, hops);
        }

        hops.push({ from: currentUrl, to: nextUrl.href, status: res.status });

        if (nextUrl.protocol !== 'https:') {
          return failResult(initialUrl, nextUrl.href, res.status, 'PROTOCOL_DOWNGRADE', `Protocol downgrade to "${nextUrl.protocol}"`, hops);
        }

        if (isRedirectWrapperUrl(nextUrl.href)) {
          return failResult(initialUrl, nextUrl.href, res.status, 'REDIRECT_WRAPPER', `Redirect wrapper "${nextUrl.hostname}"`, hops);
        }

        if (visited.has(nextUrl.href)) {
          return failResult(initialUrl, nextUrl.href, res.status, 'REDIRECT_LOOP', `Redirect loop at "${nextUrl.href}"`, hops);
        }

        if (hops.length > maxHops) {
          return failResult(initialUrl, nextUrl.href, res.status, 'EXCEEDED_MAX_HOPS', `Exceeded max hops (${maxHops})`, hops);
        }

        visited.add(nextUrl.href);
        currentUrl = nextUrl.href;
        continue;
      }

      const html = typeof res.text === 'function' ? await res.text() : '';
      const title = extractTitle(html);

      if (detectBotChallenge(res.status, res.headers, html)) {
        return failResult(initialUrl, currentUrl, res.status, 'BOT_CHALLENGE', title || 'Bot challenge detected', hops);
      }

      if (res.status !== 200) {
        return failResult(initialUrl, currentUrl, res.status, 'HTTP_ERROR', title || `HTTP ${res.status}`, hops);
      }

      const finalParsed = new URL(currentUrl);
      if (isGenericPath(finalParsed.pathname)) {
        return failResult(initialUrl, currentUrl, res.status, 'GENERIC_DESTINATION', `Generic destination "${finalParsed.pathname}"`, hops);
      }

      return {
        ok: true,
        url: initialUrl,
        finalUrl: currentUrl,
        status: res.status,
        title,
        hops,
      };
    }
  } catch (err) {
    return failResult(
      initialUrl,
      currentUrl,
      'ERR',
      'NETWORK_ERROR',
      err instanceof Error ? err.message : String(err),
      hops,
    );
  }
}
