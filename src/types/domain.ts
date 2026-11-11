export interface CorridorNode {
  id: string;
  name: string;
  fullTitle: string;
  role: string;
  coords: [number, number];
  coordsText: string;
  color: string;
  badgeClass: string;
  allocation: string;
  suitors: string;
  logistics: string;
  description: string;
  keyProjects: string[];
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
}

export interface SupplyChainStage {
  id: string;
  stageNumber: string;
  stage: string;
  title: string;
  nodeId: string;
  nodeTag: string;
  color: 'amber' | 'terracotta' | 'emerald' | 'blue';
  metrics: string;
  description: string;
  inputs: string;
  domesticValueAdd: string;
}

export interface IntelligenceDispatch {
  id: string;
  source: string;
  date: string;
  stakeholder: 'State / Official' | 'Industry' | 'Allied Governments' | 'Civil Society';
  topic: string;
  nodeId: string;
  nodeLabel: string;
  secondaryNodes?: string[];
  headline: string;
  summary: string;
  verifiedOfficial: boolean;
  citationUrl?: string;
}

export interface ProjectMilestone {
  id: string;
  date: string;
  title: string;
  status: 'COMPLETED' | 'IN PROGRESS' | 'SCHEDULED';
  statusColor: 'emerald' | 'amber' | 'slate';
  nodeId: string;
  nodeName: string;
  details: string;
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
