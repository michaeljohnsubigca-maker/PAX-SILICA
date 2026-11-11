import { MythProvision } from '../types/domain';

export const MYTH_PROVISIONS: MythProvision[] = [
  {
    id: 'myth-1',
    claim: 'US tech executives and foreign engineers will enjoy diplomatic immunity inside the Capas zone.',
    verdict: 'REJECTED BY PH GOVT',
    verdictType: 'rose',
    nodeId: 'ncc',
    authority: 'BCDA CEO Joshua Bingcang & Palace Legal Counsel',
    legalRef: 'Philippine Constitutional Sovereignty & Oct 2026 OP Vetted Framework',
    explanation: 'Both the Bases Conversion and Development Authority (BCDA) and Malacañang Palace explicitly rejected early foreign proposals for extraterritorial immunity. All foreign personnel, engineers, and corporate executives remain fully subject to Philippine civil, labor, tax, and criminal laws.',
  },
  {
    id: 'myth-2',
    claim: 'Pax Silica converts the 1,620-hectare Capas hub into an exclusive foreign military base under EDCA.',
    verdict: 'FALSE // PURELY COMMERCIAL & CIVILIAN',
    verdictType: 'rose',
    nodeId: 'ncc',
    authority: 'Department of National Defense & BCDA Board',
    legalRef: 'BCDA Commercial Charter & Republic Act No. 7227',
    explanation: 'The 1,620-hectare parcel in Capas is zoned exclusively for civilian industrial manufacturing, microelectronics fabrication, research universities, and clean energy. It does not host military garrisons, foreign weapons storage, or armed force deployments.',
  },
  {
    id: 'myth-3',
    claim: 'Massive AI hyperscale data centers in Capas will drain Central Luzon municipal water and power grids.',
    verdict: 'CLARIFIED // ZERO DATA CENTERS IN CAPAS',
    verdictType: 'amber',
    nodeId: 'ncc',
    authority: 'Trade Undersecretary Ceferino Rodolfo',
    legalRef: 'DTI Luzon Corridor Industrial Allocation Directive Nov 2026',
    explanation: 'DTI clarified that the 1,620-hectare Capas hub is reserved strictly for semiconductor fabrication, cleanrooms, and testing facilities. Hyperscale cloud data centers are prohibited in Capas and instead routed to dedicated energy-rich corridors in Batangas and Bulacan.',
  },
  {
    id: 'myth-4',
    claim: 'Philippine critical minerals will be extracted and shipped raw to foreign fabs with zero domestic value.',
    verdict: 'PROHIBITED // DOMESTIC REFINING MANDATED',
    verdictType: 'emerald',
    nodeId: 'subic',
    authority: 'Department of Environment and Natural Resources & DTI Board of Investments',
    legalRef: 'BOI Critical Minerals Domestic Processing Directive 2026',
    explanation: 'The Pax Silica pact mandates domestic value-addition. Nickel, copper, and chromite from Zambales and Luzon mining belts must undergo domestic chemical refining at Subic Bay and Clark before any export or integration into semiconductor supply chains.',
  },
];
