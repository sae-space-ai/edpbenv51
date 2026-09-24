import { EcosystemStatus, Components, AIActArticle, LogEntry, ActionResult } from './types';

// Simulation data matching the backend
const SIMULATED_COMPONENTS: Components = {
  generative_ai: {
    qwen3: { status: "active", role: "general_llm", license: "Apache-2.0" },
    deepseek_v4: { status: "active", role: "coding_llm", license: "MIT" },
    glm_52: { status: "active", role: "reasoning_llm", license: "MIT" },
    gemma_4: { status: "active", role: "multimodal_llm", license: "Apache-2.0" },
    phi_4_mini: { status: "active", role: "edge_llm", license: "MIT" },
    llama_4_scout: { status: "active", role: "long_context_llm", license: "Llama" },
    kimi_k3: { status: "active", role: "frontier_llm", license: "Kimi" },
  },
  cybersecurity: {
    strix: { status: "armed", role: "autonomous_pentest", mode: "dry-run" },
    nuclei: { status: "armed", role: "scanner", mode: "dry-run" },
    pentestgpt: { status: "armed", role: "llm_copilot", mode: "advisory" },
    pentagi: { status: "armed", role: "multiagent", mode: "dry-run" },
    hexstrike_ai: { status: "armed", role: "mcp_bridge", mode: "advisory" },
    faraday: { status: "armed", role: "vuln_mgmt", mode: "ingest" },
    metasploit: { status: "armed", role: "exploitation", mode: "lab-only" },
    recon_ng: { status: "armed", role: "osint", mode: "passive" },
  },
  databases: {
    pgvector: { status: "active", role: "vector_store", strength: "WAL+PITR" },
    milvus: { status: "standby", role: "billion_scale", strength: "recall" },
    qdrant: { status: "standby", role: "low_latency", strength: "filtering" },
  },
  subagents: {
    ai_governance: { status: "ready", provider: "qwen3" },
    ai_act_compliance: { status: "ready", provider: "glm_52" },
    risk_assessment: { status: "ready", provider: "qwen3" },
    regulatory_monitor: { status: "ready", provider: "glm_52" },
    privacy_tech: { status: "ready", provider: "qwen3" },
    cloud_security: { status: "ready", provider: "deepseek_v4" },
    training_designer: { status: "ready", provider: "gemma_4" },
    evidence_engine: { status: "ready", provider: "phi_4_mini" },
  },
  gigafactories: {
    nexus_agi: { status: "reachable", agents: 133, auth: false },
    ai_agent_marketplace: { status: "reachable", agents: "10K+", auth: true },
    peli_agent_factory: { status: "reachable", agents: "100+", auth: false },
    beacon_mcp: { status: "reachable", agents: "3,800+", auth: false },
    a2astore: { status: "reachable", agents: "80+", auth: false },
  },
};

const AI_ACT_MAPPING: Record<string, AIActArticle> = {
  "Art. 5": { title: "Prohibited practices", expertise: ["AI Governance", "AI Risk Management", "Policy Monitoring"] },
  "Art. 6": { title: "High-risk classification", expertise: ["AI Risk Management", "AI Auditing"] },
  "Art. 9": { title: "Risk management system", expertise: ["AI Risk Management", "DPIA", "Evidence-Based Compliance"] },
  "Art. 10": { title: "Data governance", expertise: ["Data Protection", "Data science", "Anonymisation"] },
  "Art. 11": { title: "Technical documentation", expertise: ["Traceability", "Auditability"] },
  "Art. 12": { title: "Record-keeping", expertise: ["Traceability", "Digital forensics"] },
  "Art. 13": { title: "Transparency", expertise: ["Human Oversight", "Trustworthy AI", "UX"] },
  "Art. 14": { title: "Human oversight", expertise: ["Human Oversight", "AI Supervision", "AI Assurance"] },
  "Art. 15": { title: "Accuracy, robustness, cybersecurity", expertise: ["AI Security", "Cryptology"] },
  "Art. 16": { title: "Obligations of providers", expertise: ["AI Compliance", "Regulatory Analysis"] },
  "Art. 17": { title: "Quality management system", expertise: ["AI Auditing", "Evidence-Based Compliance"] },
  "Art. 18": { title: "Documentation keeping", expertise: ["Traceability", "Auditability"] },
  "Art. 19": { title: "Automatically generated logs", expertise: ["Digital forensics", "Traceability"] },
  "Art. 20": { title: "Corrective actions", expertise: ["AI Risk Management", "AI Compliance"] },
  "Art. 21": { title: "Cooperation with authorities", expertise: ["Policy Monitoring", "Regulatory Analysis"] },
  "Art. 22": { title: "Authorised representatives", expertise: ["Technology-related Law"] },
  "Art. 23": { title: "Obligations of importers", expertise: ["AI Compliance"] },
  "Art. 24": { title: "Obligations of distributors", expertise: ["AI Compliance"] },
  "Art. 25": { title: "Responsibilities along AI value chain", expertise: ["AI Governance", "Regulatory Analysis"] },
  "Art. 26": { title: "Obligations of deployers", expertise: ["AI Compliance", "Human Oversight"] },
  "Art. 27": { title: "Fundamental rights impact assessment", expertise: ["DPIA", "Risk Management"] },
  "Art. 28": { title: "Notifying authorities", expertise: ["Policy Monitoring"] },
  "Art. 29": { title: "Notified bodies", expertise: ["AI Auditing", "Conformity assessment"] },
  "Art. 30": { title: "Notification procedure", expertise: ["Regulatory Analysis"] },
  "Art. 31": { title: "Requirements for notified bodies", expertise: ["AI Auditing"] },
  "Art. 32": { title: "Presumption of conformity", expertise: ["AI Compliance"] },
  "Art. 33": { title: "Standards", expertise: ["Trustworthy AI", "AI Assurance"] },
  "Art. 34": { title: "Common specifications", expertise: ["Regulatory Analysis"] },
  "Art. 35": { title: "Harmonised standards", expertise: ["AI Assurance"] },
  "Art. 36": { title: "Access to data", expertise: ["Data Protection", "Cloud"] },
  "Art. 37": { title: "Codes of conduct", expertise: ["AI Governance"] },
  "Art. 38": { title: "Guidelines", expertise: ["Policy Monitoring"] },
  "Art. 39": { title: "Voluntary codes of conduct", expertise: ["AI Governance"] },
  "Art. 40": { title: "Confidentiality", expertise: ["Data Protection"] },
  "Art. 41": { title: "Penalties", expertise: ["Regulatory Analysis"] },
  "Art. 42": { title: "AI regulatory sandboxes", expertise: ["AI Governance", "AI Compliance"] },
  "Art. 43": { title: "Real-world testing", expertise: ["AI Risk Management", "Human Oversight"] },
  "Art. 44": { title: "GPAI models", expertise: ["AI Governance", "Trustworthy AI"] },
  "Art. 45": { title: "GPAI obligations", expertise: ["AI Compliance", "Traceability"] },
  "Art. 46": { title: "GPAI systemic risk", expertise: ["AI Risk Management", "AI Security"] },
  "Art. 47": { title: "GPAI evaluation", expertise: ["AI Auditing", "Evidence-Based Compliance"] },
  "Art. 48": { title: "GPAI documentation", expertise: ["Traceability", "Auditability"] },
  "Art. 49": { title: "GPAI transparency", expertise: ["Human Oversight", "Trustworthy AI"] },
  "Art. 50": { title: "GPAI copyright", expertise: ["Technology-related Law"] },
  "Art. 51": { title: "GPAI codes of practice", expertise: ["AI Governance"] },
  "Art. 52": { title: "GPAI standards", expertise: ["AI Assurance"] },
  "Art. 53": { title: "GPAI monitoring", expertise: ["Policy Monitoring"] },
  "Art. 54": { title: "GPAI enforcement", expertise: ["Regulatory Analysis"] },
  "Art. 55": { title: "GPAI penalties", expertise: ["Regulatory Analysis", "AI Governance", "AI Compliance"] },
  "Art. 56": { title: "Innovation support", expertise: ["AI Governance", "Fintech", "Training exercises"] },
  "Art. 57": { title: "SME support", expertise: ["AI Compliance", "Fintech", "Evidence-Based Compliance"] },
  "Art. 58": { title: "Sandboxes for SMEs", expertise: ["AI Governance", "AI Compliance", "Risk Management"] },
  "Art. 59": { title: "Testing in real world", expertise: ["AI Risk Management", "Human Oversight", "AI Auditing"] },
  "Art. 60": { title: "Informed consent", expertise: ["Data Protection", "Human Oversight", "Trustworthy AI"] },
  "Art. 61": { title: "Supervision", expertise: ["AI Supervision", "Policy Monitoring", "Regulatory Analysis"] },
  "Art. 62": { title: "Market surveillance", expertise: ["Regulatory Analysis", "Policy Monitoring", "AI Auditing"] },
};

let simulationTelemetry = {
  requests_total: 0,
  requests_success: 0,
  requests_error: 0,
  evidence_generated: 0,
  subagents_dispatched: 0,
  scans_simulated: 0,
  gigafactory_queries: 0,
  auto_repairs: 0,
  uptime_seconds: 0,
  last_health_check: null as string | null,
  latency_history: [] as number[],
  error_history: [] as any[],
};

let simulationLogs: LogEntry[] = [];
let startTime = Date.now();

function generateHash(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(16, '0').slice(0, 16);
}

function addLog(component: string, action: string, status: string, detail: string) {
  const entry: LogEntry = {
    id: Math.random().toString(36).slice(2, 10),
    component,
    action,
    status,
    detail,
    timestamp: new Date().toISOString(),
    hash: generateHash(`${component}${action}${status}${detail}`),
  };
  simulationLogs.unshift(entry);
  if (simulationLogs.length > 100) simulationLogs.pop();
  return entry;
}

// Simulation mode
let useSimulation = true;
let apiBaseUrl = '';

export function setApiUrl(url: string) {
  apiBaseUrl = url;
  useSimulation = false;
}

export function enableSimulation() {
  useSimulation = true;
}

export function isSimulation(): boolean {
  return useSimulation;
}

async function fetchApi(path: string, options?: RequestInit): Promise<any> {
  if (useSimulation) {
    return simulateApi(path, options);
  }
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  return response.json();
}

function simulateApi(path: string, options?: RequestInit): Promise<any> {
  return new Promise((resolve) => {
    const latency = Math.random() * 50 + 10;
    setTimeout(() => {
      simulationTelemetry.requests_total++;
      simulationTelemetry.uptime_seconds = (Date.now() - startTime) / 1000;

      if (path === '/api/status' || path === '' || path === '/') {
        simulationTelemetry.requests_success++;
        resolve({
          ecosystem: "EDPB-SUPER-ECOSYSTEM",
          version: "5.1.0",
          instance_id: generateHash("instance" + startTime),
          candidate: "Manuel Gago Fernández",
          candidate_id: "EDPB-SPE-2025-2030",
          mode: "continuous",
          region: "eu-west-1",
          deployment_url: "edpb-backend.vercel.app",
          git_commit: "a1b2c3d4",
          git_branch: "main",
          uptime_seconds: simulationTelemetry.uptime_seconds,
          components: {
            generative_ai: 7,
            cybersecurity: 8,
            databases: 3,
            subagents: 8,
            gigafactories: 5,
          },
          components_total: 31,
          ai_act_articles_mapped: 58,
          telemetry: { ...simulationTelemetry },
          engine: { running: true, cycles: Math.floor(simulationTelemetry.uptime_seconds / 30) },
          status: "operational",
        });
      } else if (path === '/api/components') {
        simulationTelemetry.requests_success++;
        resolve({ status: "success", components: SIMULATED_COMPONENTS, total: 31 });
      } else if (path === '/api/ai_act_mapping') {
        simulationTelemetry.requests_success++;
        resolve({ status: "success", mapping: AI_ACT_MAPPING });
      } else if (path === '/api/ai_act_articles') {
        simulationTelemetry.requests_success++;
        resolve({ status: "success", total: 58, articles: Object.keys(AI_ACT_MAPPING) });
      } else if (path === '/api/log') {
        simulationTelemetry.requests_success++;
        resolve({ status: "success", log: simulationLogs });
      } else if (path === '/api/health') {
        simulationTelemetry.requests_success++;
        simulationTelemetry.last_health_check = new Date().toISOString();
        resolve({
          timestamp: new Date().toISOString(),
          issues_found: [],
          repairs_applied: [],
          health: "healthy",
          components_checked: 31,
        });
      } else if (path === '/api' && options?.method === 'POST') {
        const body = JSON.parse(options.body as string || '{}');
        handlePostAction(body, resolve);
      } else {
        simulationTelemetry.requests_error++;
        resolve({ status: "error", message: "not_found" });
      }
    }, latency);
  });
}

function handlePostAction(body: any, resolve: (value: any) => void) {
  const action = body.action || 'status';
  simulationTelemetry.requests_success++;
  
  switch (action) {
    case 'dispatch_subagent': {
      const agent = body.agent_name || 'ai_governance';
      simulationTelemetry.subagents_dispatched++;
      addLog('subagent', 'dispatch', 'success', agent);
      resolve({
        status: "dispatched",
        agent,
        provider: SIMULATED_COMPONENTS.subagents[agent]?.provider || "qwen3",
        task: body.task || "test",
        timestamp: new Date().toISOString(),
        latency_ms: Math.random() * 100 + 20,
      });
      break;
    }
    case 'generate_evidence': {
      const article = body.article || "Art. 9";
      simulationTelemetry.evidence_generated++;
      addLog('evidence_engine', 'generate', 'success', article);
      resolve({
        status: "success",
        evidence: {
          timestamp: new Date().toISOString(),
          article,
          article_title: AI_ACT_MAPPING[article]?.title || "General",
          expertise_applied: AI_ACT_MAPPING[article]?.expertise || ["AI Governance"],
          human_oversight: true,
          traceability: true,
          auditability: true,
          candidate: "Manuel Gago Fernández",
          evidence_hash: generateHash(article + Date.now()),
          latency_ms: Math.random() * 80 + 15,
        },
      });
      break;
    }
    case 'cybersecurity_scan': {
      simulationTelemetry.scans_simulated++;
      addLog('cybersecurity', 'scan', 'success', `${body.tool || 'strix'} -> ${body.target || 'self-test.local'}`);
      resolve({
        status: "success",
        tool: body.tool || "strix",
        role: SIMULATED_COMPONENTS.cybersecurity[body.tool || 'strix']?.role || "autonomous_pentest",
        mode: SIMULATED_COMPONENTS.cybersecurity[body.tool || 'strix']?.mode || "dry-run",
        target: body.target || "self-test.local",
        authorized: body.authorized || false,
        timestamp: new Date().toISOString(),
        scan_hash: generateHash(`scan${Date.now()}`),
        latency_ms: Math.random() * 120 + 30,
      });
      break;
    }
    case 'discover_gigafactories': {
      simulationTelemetry.gigafactory_queries++;
      const factories: Record<string, any> = {};
      const keys = body.factory_key ? [body.factory_key] : Object.keys(SIMULATED_COMPONENTS.gigafactories);
      keys.forEach(k => {
        const f = SIMULATED_COMPONENTS.gigafactories[k];
        if (f) factories[k] = { status: f.status, agents: f.agents, auth_required: f.auth };
      });
      resolve({
        status: "success",
        total: keys.length,
        reachable: keys.length,
        factories,
        latency_ms: Math.random() * 60 + 10,
      });
      break;
    }
    case 'generate_llm': {
      const model = body.model || "qwen3";
      addLog('generative_ai', 'generate', 'success', model);
      resolve({
        status: "success",
        model,
        role: SIMULATED_COMPONENTS.generative_ai[model]?.role || "general_llm",
        license: SIMULATED_COMPONENTS.generative_ai[model]?.license || "Apache-2.0",
        prompt_hash: generateHash(body.prompt || ""),
        prompt_length: (body.prompt || "").length,
        timestamp: new Date().toISOString(),
        note: "simulated",
        latency_ms: Math.random() * 200 + 50,
      });
      break;
    }
    case 'run_full_ecosystem_test': {
      addLog('orchestrator', 'full_test', 'success', 'all_components');
      resolve({
        test_id: generateHash("test" + Date.now()),
        timestamp: new Date().toISOString(),
        total_components_tested: 31,
        results: {
          subagents: Object.keys(SIMULATED_COMPONENTS.subagents).map(a => ({ agent: a, status: "success" })),
          evidence: ["Art. 5", "Art. 9", "Art. 14", "Art. 27", "Art. 55", "Art. 58", "Art. 61", "Art. 62"].map(a => ({ article: a, hash: generateHash(a) })),
          cybersecurity: Object.keys(SIMULATED_COMPONENTS.cybersecurity).map(t => ({ tool: t, status: "success" })),
          gigafactories: { total: 5, reachable: 5 },
          generative_ai: Object.keys(SIMULATED_COMPONENTS.generative_ai).map(m => ({ model: m, status: "success" })),
          databases: { total: 3, active: 1 },
        },
        final_status: "PASSED",
      });
      break;
    }
    case 'health_check': {
      simulationTelemetry.last_health_check = new Date().toISOString();
      resolve({
        timestamp: new Date().toISOString(),
        issues_found: [],
        repairs_applied: [],
        health: "healthy",
        components_checked: 31,
      });
      break;
    }
    default: {
      resolve({ status: "success", message: `action_${action}_executed` });
    }
  }
}

export async function getStatus(): Promise<EcosystemStatus> {
  return fetchApi('/api/status');
}

export async function getComponents(): Promise<{ status: string; components: Components; total: number }> {
  return fetchApi('/api/components');
}

export async function getAIActMapping(): Promise<{ status: string; mapping: Record<string, AIActArticle> }> {
  return fetchApi('/api/ai_act_mapping');
}

export async function getLogs(): Promise<{ status: string; log: LogEntry[] }> {
  return fetchApi('/api/log');
}

export async function getHealth(): Promise<any> {
  return fetchApi('/api/health');
}

export async function postAction(action: string, data: Record<string, any> = {}): Promise<ActionResult> {
  return fetchApi('/api', {
    method: 'POST',
    body: JSON.stringify({ action, ...data }),
  });
}
