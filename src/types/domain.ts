export const CORRIDOR_NODE_IDS = ['ncc', 'bulacan', 'subic', 'manila', 'batangas'] as const;
export type CorridorNodeId = (typeof CORRIDOR_NODE_IDS)[number];

export const DISPATCH_STAKEHOLDERS = [
  'State / Official',
  'Think Tank / Academic',
  'Civil Society / Local',
] as const;
export type DispatchStakeholder = (typeof DISPATCH_STAKEHOLDERS)[number];

export const DISPATCH_TOPICS = [
  'Semiconductors & AI',
  'Sovereignty & Legal',
  'Minerals & Power',
  'Land & Community',
] as const;
export type DispatchTopic = (typeof DISPATCH_TOPICS)[number];

export interface CorridorNode {
  id: string;
  name: string;
  fullTitle: string;
  role: string;
  iconName?: string;
  coords: [number, number];
  coordsText: string;
  color: string;
  badgeClass: string;
  allocation: string;
  suitors: string;
  dependencies: string;
  summary: string;
  logistics?: string;
  description?: string;
  keyProjects?: string[];
}

export interface MythProvision {
  id: string;
  claim: string;
  verdict: string;
  verdictType: 'rose' | 'amber' | 'emerald';
  nodeId: string;
  authority: string;
  legalRef: string;
  explanation: string;
  citationUrl?: string;
}

export interface SupplyChainStage {
  id: string;
  stageNumber: string;
  stage: string;
  title: string;
  nodeId: string;
  nodeTag: string;
  color: 'terracotta' | 'siliconGold' | 'amber' | 'emerald' | 'sandstone' | 'blue';
  metrics: string;
  description: string;
  inputs?: string;
  domesticValueAdd?: string;
}

export interface IntelligenceDispatch {
  id: string;
  source: string;
  date: string;
  stakeholder: DispatchStakeholder;
  topic: DispatchTopic;
  nodeId: CorridorNodeId;
  nodeLabel: string;
  secondaryNodes?: CorridorNodeId[];
  headline: string;
  summary: string;
  quote: string;
  speaker: string;
  verifiedOfficial?: boolean;
  citationUrl?: string;
}

export interface ProjectMilestone {
  id: string;
  date: string;
  title: string;
  status: string;
  statusColor: 'emerald' | 'amber' | 'slate' | 'stone';
  nodeId: string;
  nodeName: string;
  details: string;
  citationUrl?: string;
}

export interface ExplainerPillar {
  title: string;
  question: string;
  answer: string;
  keyStat: string;
  statLabel: string;
}

export interface ExplainerContent {
  declarationDate: string;
  signatoryOrder: string;
  partnerNations: string[];
  heroSummary: string;
  pillars: ExplainerPillar[];
}
