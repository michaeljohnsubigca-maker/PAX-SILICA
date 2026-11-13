import { describe, it, expect } from 'vitest';
import { CORRIDOR_NODES } from './nodes';
import { MYTH_PROVISIONS } from './myths';
import { SUPPLY_CHAIN_STAGES } from './supplyChain';
import { NEWS_CARDS } from './dispatches';
import { MILESTONES } from './milestones';

describe('Domain Data Integrity', () => {
  it('contains all 5 corridor nodes with valid coordinates', () => {
    const keys = Object.keys(CORRIDOR_NODES);
    expect(keys).toContain('ncc');
    expect(keys).toContain('subic');
    expect(keys).toContain('manila');
    expect(keys).toContain('batangas');
    expect(keys).toContain('bulacan');
    keys.forEach((key) => {
      const node = CORRIDOR_NODES[key];
      expect(node.coords).toHaveLength(2);
      expect(node.coords[0]).toBeGreaterThan(13);
      expect(node.coords[0]).toBeLessThan(17);
    });
  });

const GENERIC_SOURCE_PATHS = new Set(['', '/', '/news', '/news/', '/business', '/business/']);

function expectSpecificSourceUrl(url?: string) {
  expect(url).toBeDefined();
  expect(url?.startsWith('https://')).toBe(true);
  const parsed = new URL(url!);
  expect(GENERIC_SOURCE_PATHS.has(parsed.pathname)).toBe(false);
}

  it('contains verified myth provisions with valid authorities and citation URLs', () => {
    expect(MYTH_PROVISIONS.length).toBeGreaterThanOrEqual(4);
    MYTH_PROVISIONS.forEach((myth) => {
      expect(myth.authority.length).toBeGreaterThan(0);
      expect(myth.explanation.length).toBeGreaterThan(0);
      expectSpecificSourceUrl(myth.citationUrl);
    });
  });

  it('contains 4 supply chain stages', () => {
    expect(SUPPLY_CHAIN_STAGES).toHaveLength(4);
  });

  it('contains news dispatches with headlines, sources, and citation URLs', () => {
    expect(NEWS_CARDS.length).toBeGreaterThanOrEqual(3);
    NEWS_CARDS.forEach((card) => {
      expect(card.headline.length).toBeGreaterThan(0);
      expect(card.source.length).toBeGreaterThan(0);
      expectSpecificSourceUrl(card.citationUrl);
    });
  });

  it('contains milestones with valid statuses and citation URLs', () => {
    expect(MILESTONES.length).toBeGreaterThanOrEqual(3);
    MILESTONES.forEach((ms) => {
      expect(['COMPLETED', 'IMMINENT', 'IN PROGRESS', 'SCHEDULED']).toContain(ms.status);
      expectSpecificSourceUrl(ms.citationUrl);
    });
  });
});
