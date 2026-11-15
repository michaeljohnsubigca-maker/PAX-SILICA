import { describe, it, expect } from 'vitest';
import {
  CORRIDOR_NODE_IDS,
  DISPATCH_STAKEHOLDERS,
  DISPATCH_TOPICS,
} from '../types/domain';
import { isGenericPath, isRedirectWrapperUrl } from '../../scripts/verify-sources-core';
import { CORRIDOR_NODES } from './nodes';
import { MYTH_PROVISIONS } from './myths';
import { SUPPLY_CHAIN_STAGES } from './supplyChain';
import { NEWS_CARDS } from './dispatches';
import { MILESTONES } from './milestones';

function expectSpecificSourceUrl(url?: string) {
  expect(url).toBeDefined();
  expect(url?.startsWith('https://')).toBe(true);
  expect(isRedirectWrapperUrl(url!)).toBe(false);
  const parsed = new URL(url!);
  expect(isGenericPath(parsed.pathname)).toBe(false);
}

describe('Domain Data Integrity', () => {
  it('contains all 5 corridor nodes with valid coordinates', () => {
    const keys = Object.keys(CORRIDOR_NODES);
    CORRIDOR_NODE_IDS.forEach((nodeId) => {
      expect(keys).toContain(nodeId);
    });
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
      expectSpecificSourceUrl(myth.citationUrl);
    });
  });

  it('contains 4 supply chain stages', () => {
    expect(SUPPLY_CHAIN_STAGES).toHaveLength(4);
  });

  it('contains news dispatches with canonical domain fields and verified citation URLs', () => {
    expect(NEWS_CARDS.length).toBeGreaterThanOrEqual(13);

    const ids = NEWS_CARDS.map((card) => card.id);
    expect(new Set(ids).size).toBe(NEWS_CARDS.length);

    NEWS_CARDS.forEach((card) => {
      expect(card.headline.length).toBeGreaterThan(0);
      expect(card.source.length).toBeGreaterThan(0);
      expect(CORRIDOR_NODE_IDS).toContain(card.nodeId);
      expect(CORRIDOR_NODES[card.nodeId]).toBeDefined();
      expect(card.nodeLabel.length).toBeGreaterThan(0);
      expect(card.nodeLabel).toBe(CORRIDOR_NODES[card.nodeId].name);
      card.secondaryNodes?.forEach((secondaryId) => {
        expect(CORRIDOR_NODE_IDS).toContain(secondaryId);
        expect(CORRIDOR_NODES[secondaryId]).toBeDefined();
      });
      expect(DISPATCH_STAKEHOLDERS).toContain(card.stakeholder);
      expect(DISPATCH_TOPICS).toContain(card.topic);
      expectSpecificSourceUrl(card.citationUrl);
    });

    DISPATCH_STAKEHOLDERS.forEach((stakeholder) => {
      expect(NEWS_CARDS.some((card) => card.stakeholder === stakeholder)).toBe(true);
    });

    DISPATCH_TOPICS.forEach((topic) => {
      expect(NEWS_CARDS.some((card) => card.topic === topic)).toBe(true);
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
