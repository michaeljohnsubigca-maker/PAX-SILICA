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

  it('contains verified myth provisions with valid authorities and citation URLs', () => {
    expect(MYTH_PROVISIONS.length).toBeGreaterThanOrEqual(4);
    MYTH_PROVISIONS.forEach((myth) => {
      expect(myth.authority.length).toBeGreaterThan(0);
      expect(myth.explanation.length).toBeGreaterThan(0);
      expect(myth.citationUrl).toBeDefined();
      expect(myth.citationUrl?.startsWith('https://')).toBe(true);
    });
  });

  it('contains 4 supply chain stages', () => {
    expect(SUPPLY_CHAIN_STAGES).toHaveLength(4);
  });

  it('contains news dispatches with headlines and sources', () => {
    expect(NEWS_CARDS.length).toBeGreaterThanOrEqual(3);
    NEWS_CARDS.forEach((card) => {
      expect(card.headline.length).toBeGreaterThan(0);
      expect(card.source.length).toBeGreaterThan(0);
    });
  });

  it('contains milestones with valid statuses', () => {
    expect(MILESTONES.length).toBeGreaterThanOrEqual(3);
    MILESTONES.forEach((ms) => {
      expect(['COMPLETED', 'IN PROGRESS', 'SCHEDULED']).toContain(ms.status);
    });
  });
});
