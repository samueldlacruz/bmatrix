export type MatrixId =
  | 'swot'
  | 'bcg'
  | 'ansoff'
  | 'mckinsey'
  | 'eisenhower'
  | 'raci'
  | 'risk'
  | 'value-effort'
  | 'how-might-we'
  | 'empathy-map';

export interface MatrixConfig {
  id: MatrixId;
  name: string;
  description: string;
  icon: string;
  color: string;
  colorClass: string;
}

export interface SWOTData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface BCGItem {
  id: string;
  name: string;
  revenue: number;
  growth: number;
  marketShare: number;
}

export interface AnsoffData {
  marketPenetration: string[];
  productDevelopment: string[];
  marketDevelopment: string[];
  diversification: string[];
}

export interface McKinseyCell {
  label: string;
  items: string[];
}

export interface EisenhowerTask {
  id: string;
  text: string;
  quadrant: 'do' | 'schedule' | 'delegate' | 'eliminate';
}

export interface RACIRow {
  id: string;
  task: string;
  assignments: Record<string, 'R' | 'A' | 'C' | 'I' | ''>;
}

export interface RiskItem {
  id: string;
  label: string;
  likelihood: number;
  impact: number;
}

export interface ValueEffortItem {
  id: string;
  label: string;
  value: number;
  effort: number;
}

export interface HMWData {
  userNeeds: string[];
  painPoints: string[];
  insights: string[];
  questions: string[];
}

export interface EmpathyMapData {
  says: string[];
  thinks: string[];
  does: string[];
  feels: string[];
}

export type MatrixData =
  | SWOTData
  | BCGItem[]
  | AnsoffData
  | McKinseyCell[]
  | EisenhowerTask[]
  | RACIRow[]
  | RiskItem[]
  | ValueEffortItem[]
  | HMWData
  | EmpathyMapData;
