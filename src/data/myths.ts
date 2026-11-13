import { MythProvision } from '../types/domain';

export const MYTHS_DATA: MythProvision[] = [
  {
    id: 'myth-1',
    claim: 'US tech locators will enjoy extraterritorial diplomatic immunity inside New Clark City.',
    verdict: 'DISPROVEN',
    verdictType: 'rose',
    nodeId: 'ncc',
    legalRef: 'Article II, Sec. 7 & 8, 1987 PH Constitution • Oct 2026 Vetted Bilateral Framework',
    authority: 'BCDA CEO Joshua Bingcang & Palace Legal Team',
    explanation: 'Malacañang and BCDA categorically confirmed zero diplomatic immunity. Foreign locators and engineers are 100% subject to Philippine civil, labor, tax, and environmental courts.',
    citationUrl: 'https://www.gmanetwork.com/news/money/economy/1009135/pax-silica-to-operate-under-philippine-laws-bcda/story/',
  },
  {
    id: 'myth-2',
    claim: 'New Clark City will be turned into a military facility under EDCA agreements.',
    verdict: 'DISPROVEN',
    verdictType: 'rose',
    nodeId: 'ncc',
    legalRef: 'Republic Act No. 7227 (Bases Conversion & Dev Act)',
    authority: 'Department of National Defense & BCDA',
    explanation: 'The 1,620-ha zone is strictly a civilian commercial development for semiconductor and mineral refinement. EDCA agreed locations are separate and strictly managed by the AFP.',
    citationUrl: 'https://lawphil.net/statutes/repacts/ra1992/ra_7227_1992.html',
  },
  {
    id: 'myth-3',
    claim: 'Massive AI data centers will drain Capas, Tarlac’s water and energy grid.',
    verdict: 'DISPROVEN',
    verdictType: 'amber',
    nodeId: 'ncc',
    legalRef: 'DTI Luzon Corridor Industrial Allocation Directive (Nov 2026)',
    authority: 'Usec. Ceferino Rodolfo, DTI',
    explanation: 'DTI confirmed zero data centers in Capas. Power-hungry hyperscale compute centers are placed in Batangas adjacent to LNG and subsea cables. Capas is strictly for mineral processing and wafer hardware.',
    citationUrl: 'https://www.abs-cbn.com/news/business/2026/8/24/pax-silica-to-focus-on-advanced-manufacturing-not-ai-data-centers-dti-2039',
  },
  {
    id: 'myth-4',
    claim: 'Foreign firms will own land permanently inside the 1,620-hectare zone.',
    verdict: 'DISPROVEN',
    verdictType: 'rose',
    nodeId: 'ncc',
    legalRef: 'Republic Act No. 12252 (Long-Term Lease of Private Lands & BCDA Charter)',
    authority: 'Senate Committee on Economic Affairs',
    explanation: 'Foreign ownership of land remains prohibited under the Constitution. Land tenure operates strictly via 50-year commercial leases renewable up to 25 years under Republic Act No. 12252.',
    citationUrl: 'https://www.philstar.com/business/2026/07/24/2544359/pax-silica-investors-may-lease-new-clark-land-99-years-bcda',
  },
  {
    id: 'myth-5',
    claim: 'Critical minerals from Zambales will be exported as raw ores without domestic value-add.',
    verdict: 'DISPROVEN',
    verdictType: 'emerald',
    nodeId: 'subic',
    legalRef: 'BOI Green Lane & Domestic Mineral Value-Addition Mandate',
    authority: 'Department of Trade and Industry & DENR',
    explanation: 'All participating firms must commit to domestic chemical refining and value-addition. Subic Bay and Capas will process raw nickel, copper, and chromite into electronic-grade materials.',
    citationUrl: 'https://www.startup.ph/a-zambales-nickel-mine-is-now-part-of-americas-plan-to-out-build-china-on-ev-batteries-and-ai-chips/',
  },
];

// Alias for backwards compatibility if needed
export const MYTH_PROVISIONS = MYTHS_DATA;
