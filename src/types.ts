export interface EcosystemStatus {
  ecosystem: string;
  version: string;
  instance_id: string;
  candidate: string;
  candidate_id: string;
  mode: string;
  region: string;
  deployment_url: string;
  git_commit: string;
  git_branch: string;
  uptime_seconds: number;
  components: Record<string, number>;
  components_total: number;
  ai_act_articles_mapped: number;
  telemetry: Telemetry;
  engine: { running: boolean; cycles: number };
  status: string;
}

export interface Telemetry {
  requests_total: number;
  requests_success: number;
  requests_error: number;
  evidence_generated: number;
  subagents_dispatched: number;
  scans_simulated: number;
  gigafactory_queries: number;
  auto_repairs: number;
  uptime_seconds: number;
  last_health_check: string | null;
  latency_history: number[];
  error_history: any[];
}

export interface ComponentInfo {
  status: string;
  role?: string;
  license?: string;
  mode?: string;
  strength?: string;
  provider?: string;
  agents?: string | number;
  auth?: boolean;
}

export interface Components {
  generative_ai: Record<string, ComponentInfo>;
  cybersecurity: Record<string, ComponentInfo>;
  databases: Record<string, ComponentInfo>;
  subagents: Record<string, ComponentInfo>;
  gigafactories: Record<string, ComponentInfo>;
}

export interface AIActArticle {
  title: string;
  expertise: string[];
}

export interface LogEntry {
  id: string;
  component: string;
  action: string;
  status: string;
  detail: string;
  timestamp: string;
  hash: string;
}

export interface ActionResult {
  status: string;
  [key: string]: any;
}

export type TabId = 'dashboard' | 'components' | 'aiact' | 'actions' | 'logs' | 'deploy';
