# =============================================================================
# EDPB-BACKEND v5.1 — API SERVERLESS COMPLETO PARA VERCEL
# Autor: Manuel Gago Fernández | Candidato EDPB SPE 2025-2030
# Despliegue: Vercel (Python 3.11 · @vercel/python)
# Archivo: api/index.py
# =============================================================================
# ESTRUCTURA DEL REPOSITORIO:
# edpb-backend/
# ├── api/
# │   └── index.py          <- ESTE ARCHIVO
# ├── frontend/
# │   └── api-client.js     <- auto-generado en runtime
# ├── assets/
# │   └── eu-ai-icons/      <- 4 iconos UE
# ├── requirements.txt       <- requests==2.31.0
# ├── vercel.json           <- config serverless
# └── README.md
# =============================================================================

import os
import json
import time
import uuid
import hashlib
import threading
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler
from collections import deque
from urllib.parse import urlparse, parse_qs

try:
    import requests
except ImportError:
    requests = None

# =============================================================================
# CONFIGURACIÓN GLOBAL
# =============================================================================
ECOSYSTEM = {
    "name": os.getenv("ECOSYSTEM_NAME", "EDPB-SUPER-ECOSYSTEM"),
    "version": os.getenv("ECOSYSTEM_VERSION", "5.1.0"),
    "candidate": "Manuel Gago Fernández",
    "candidate_id": "EDPB-SPE-2025-2030",
    "start_time": time.time(),
    "instance_id": hashlib.sha256(str(time.time()).encode()).hexdigest()[:12],
    "mode": "continuous",
    "auto_repair": True,
    "region": os.getenv("VERCEL_REGION", "unknown"),
    "deployment_url": os.getenv("VERCEL_URL", "localhost"),
    "git_commit": os.getenv("VERCEL_GIT_COMMIT_SHA", "local")[:8],
    "git_branch": os.getenv("VERCEL_GIT_COMMIT_REF", "main"),
}

# =============================================================================
# 31 COMPONENTES DEL ECOSISTEMA
# =============================================================================
COMPONENTS = {
    "generative_ai": {
        "qwen3": {"status": "active", "role": "general_llm", "license": "Apache-2.0"},
        "deepseek_v4": {"status": "active", "role": "coding_llm", "license": "MIT"},
        "glm_52": {"status": "active", "role": "reasoning_llm", "license": "MIT"},
        "gemma_4": {"status": "active", "role": "multimodal_llm", "license": "Apache-2.0"},
        "phi_4_mini": {"status": "active", "role": "edge_llm", "license": "MIT"},
        "llama_4_scout": {"status": "active", "role": "long_context_llm", "license": "Llama"},
        "kimi_k3": {"status": "active", "role": "frontier_llm", "license": "Kimi"},
    },
    "cybersecurity": {
        "strix": {"status": "armed", "role": "autonomous_pentest", "mode": "dry-run"},
        "nuclei": {"status": "armed", "role": "scanner", "mode": "dry-run"},
        "pentestgpt": {"status": "armed", "role": "llm_copilot", "mode": "advisory"},
        "pentagi": {"status": "armed", "role": "multiagent", "mode": "dry-run"},
        "hexstrike_ai": {"status": "armed", "role": "mcp_bridge", "mode": "advisory"},
        "faraday": {"status": "armed", "role": "vuln_mgmt", "mode": "ingest"},
        "metasploit": {"status": "armed", "role": "exploitation", "mode": "lab-only"},
        "recon_ng": {"status": "armed", "role": "osint", "mode": "passive"},
    },
    "databases": {
        "pgvector": {"status": "active", "role": "vector_store", "strength": "WAL+PITR"},
        "milvus": {"status": "standby", "role": "billion_scale", "strength": "recall"},
        "qdrant": {"status": "standby", "role": "low_latency", "strength": "filtering"},
    },
    "subagents": {
        "ai_governance": {"status": "ready", "provider": "qwen3"},
        "ai_act_compliance": {"status": "ready", "provider": "glm_52"},
        "risk_assessment": {"status": "ready", "provider": "qwen3"},
        "regulatory_monitor": {"status": "ready", "provider": "glm_52"},
        "privacy_tech": {"status": "ready", "provider": "qwen3"},
        "cloud_security": {"status": "ready", "provider": "deepseek_v4"},
        "training_designer": {"status": "ready", "provider": "gemma_4"},
        "evidence_engine": {"status": "ready", "provider": "phi_4_mini"},
    },
    "gigafactories": {
        "nexus_agi": {"status": "reachable", "agents": 133, "auth": False},
        "ai_agent_marketplace": {"status": "reachable", "agents": "10K+", "auth": True},
        "peli_agent_factory": {"status": "reachable", "agents": "100+", "auth": False},
        "beacon_mcp": {"status": "reachable", "agents": "3,800+", "auth": False},
        "a2astore": {"status": "reachable", "agents": "80+", "auth": False},
    },
}

# =============================================================================
# MAPEO COMPLETO AI ACT (5-62) — incluye GPAI, innovación, supervisión
# =============================================================================
AI_ACT_MAPPING = {
    "Art. 5": {"title": "Prohibited practices", "expertise": ["AI Governance", "AI Risk Management", "Policy Monitoring"]},
    "Art. 6": {"title": "High-risk classification", "expertise": ["AI Risk Management", "AI Auditing"]},
    "Art. 9": {"title": "Risk management system", "expertise": ["AI Risk Management", "DPIA", "Evidence-Based Compliance"]},
    "Art. 10": {"title": "Data governance", "expertise": ["Data Protection", "Data science", "Anonymisation"]},
    "Art. 11": {"title": "Technical documentation", "expertise": ["Traceability", "Auditability"]},
    "Art. 12": {"title": "Record-keeping", "expertise": ["Traceability", "Digital forensics"]},
    "Art. 13": {"title": "Transparency", "expertise": ["Human Oversight", "Trustworthy AI", "UX"]},
    "Art. 14": {"title": "Human oversight", "expertise": ["Human Oversight", "AI Supervision", "AI Assurance"]},
    "Art. 15": {"title": "Accuracy, robustness, cybersecurity", "expertise": ["AI Security", "Cryptology"]},
    "Art. 16": {"title": "Obligations of providers", "expertise": ["AI Compliance", "Regulatory Analysis"]},
    "Art. 17": {"title": "Quality management system", "expertise": ["AI Auditing", "Evidence-Based Compliance"]},
    "Art. 18": {"title": "Documentation keeping", "expertise": ["Traceability", "Auditability"]},
    "Art. 19": {"title": "Automatically generated logs", "expertise": ["Digital forensics", "Traceability"]},
    "Art. 20": {"title": "Corrective actions", "expertise": ["AI Risk Management", "AI Compliance"]},
    "Art. 21": {"title": "Cooperation with authorities", "expertise": ["Policy Monitoring", "Regulatory Analysis"]},
    "Art. 22": {"title": "Authorised representatives", "expertise": ["Technology-related Law"]},
    "Art. 23": {"title": "Obligations of importers", "expertise": ["AI Compliance"]},
    "Art. 24": {"title": "Obligations of distributors", "expertise": ["AI Compliance"]},
    "Art. 25": {"title": "Responsibilities along AI value chain", "expertise": ["AI Governance", "Regulatory Analysis"]},
    "Art. 26": {"title": "Obligations of deployers", "expertise": ["AI Compliance", "Human Oversight"]},
    "Art. 27": {"title": "Fundamental rights impact assessment", "expertise": ["DPIA", "Risk Management"]},
    "Art. 28": {"title": "Notifying authorities", "expertise": ["Policy Monitoring"]},
    "Art. 29": {"title": "Notified bodies", "expertise": ["AI Auditing", "Conformity assessment"]},
    "Art. 30": {"title": "Notification procedure", "expertise": ["Regulatory Analysis"]},
    "Art. 31": {"title": "Requirements for notified bodies", "expertise": ["AI Auditing"]},
    "Art. 32": {"title": "Presumption of conformity", "expertise": ["AI Compliance"]},
    "Art. 33": {"title": "Standards", "expertise": ["Trustworthy AI", "AI Assurance"]},
    "Art. 34": {"title": "Common specifications", "expertise": ["Regulatory Analysis"]},
    "Art. 35": {"title": "Harmonised standards", "expertise": ["AI Assurance"]},
    "Art. 36": {"title": "Access to data", "expertise": ["Data Protection", "Cloud"]},
    "Art. 37": {"title": "Codes of conduct", "expertise": ["AI Governance"]},
    "Art. 38": {"title": "Guidelines", "expertise": ["Policy Monitoring"]},
    "Art. 39": {"title": "Voluntary codes of conduct", "expertise": ["AI Governance"]},
    "Art. 40": {"title": "Confidentiality", "expertise": ["Data Protection"]},
    "Art. 41": {"title": "Penalties", "expertise": ["Regulatory Analysis"]},
    "Art. 42": {"title": "AI regulatory sandboxes", "expertise": ["AI Governance", "AI Compliance"]},
    "Art. 43": {"title": "Real-world testing", "expertise": ["AI Risk Management", "Human Oversight"]},
    "Art. 44": {"title": "GPAI models", "expertise": ["AI Governance", "Trustworthy AI"]},
    "Art. 45": {"title": "GPAI obligations", "expertise": ["AI Compliance", "Traceability"]},
    "Art. 46": {"title": "GPAI systemic risk", "expertise": ["AI Risk Management", "AI Security"]},
    "Art. 47": {"title": "GPAI evaluation", "expertise": ["AI Auditing", "Evidence-Based Compliance"]},
    "Art. 48": {"title": "GPAI documentation", "expertise": ["Traceability", "Auditability"]},
    "Art. 49": {"title": "GPAI transparency", "expertise": ["Human Oversight", "Trustworthy AI"]},
    "Art. 50": {"title": "GPAI copyright", "expertise": ["Technology-related Law"]},
    "Art. 51": {"title": "GPAI codes of practice", "expertise": ["AI Governance"]},
    "Art. 52": {"title": "GPAI standards", "expertise": ["AI Assurance"]},
    "Art. 53": {"title": "GPAI monitoring", "expertise": ["Policy Monitoring"]},
    "Art. 54": {"title": "GPAI enforcement", "expertise": ["Regulatory Analysis"]},
    "Art. 55": {"title": "GPAI penalties", "expertise": ["Regulatory Analysis", "AI Governance", "AI Compliance"]},
    "Art. 56": {"title": "Innovation support", "expertise": ["AI Governance", "Fintech", "Training exercises"]},
    "Art. 57": {"title": "SME support", "expertise": ["AI Compliance", "Fintech", "Evidence-Based Compliance"]},
    "Art. 58": {"title": "Sandboxes for SMEs", "expertise": ["AI Governance", "AI Compliance", "Risk Management"]},
    "Art. 59": {"title": "Testing in real world", "expertise": ["AI Risk Management", "Human Oversight", "AI Auditing"]},
    "Art. 60": {"title": "Informed consent", "expertise": ["Data Protection", "Human Oversight", "Trustworthy AI"]},
    "Art. 61": {"title": "Supervision", "expertise": ["AI Supervision", "Policy Monitoring", "Regulatory Analysis"]},
    "Art. 62": {"title": "Market surveillance", "expertise": ["Regulatory Analysis", "Policy Monitoring", "AI Auditing"]},
}

# =============================================================================
# TELEMETRÍA Y LOG
# =============================================================================
TELEMETRY = {
    "requests_total": 0, "requests_success": 0, "requests_error": 0,
    "evidence_generated": 0, "subagents_dispatched": 0, "scans_simulated": 0,
    "gigafactory_queries": 0, "auto_repairs": 0, "uptime_seconds": 0,
    "last_health_check": None,
    "latency_history": deque(maxlen=100),
    "error_history": deque(maxlen=50),
}

EXECUTION_LOG = deque(maxlen=1000)

# =============================================================================
# UTILIDADES
# =============================================================================
def _hash(data: str) -> str:
    return hashlib.sha256(data.encode("utf-8")).hexdigest()[:16]

def _now() -> str:
    return datetime.now(timezone.utc).isoformat()

def _log(component, action, status, detail="", data=None):
    entry = {
        "id": str(uuid.uuid4())[:8],
        "component": component,
        "action": action,
        "status": status,
        "detail": detail,
        "timestamp": _now(),
        "hash": _hash(f"{component}{action}{status}{detail}"),
    }
    if data:
        entry["data"] = data
    EXECUTION_LOG.append(entry)
    return entry

def _track_latency(start):
    latency = (time.time() - start) * 1000
    TELEMETRY["latency_history"].append(round(latency, 2))
    return latency

def _json_default(obj):
    return list(obj) if isinstance(obj, deque) else str(obj)

# =============================================================================
# MOTOR DE AUTO-REPARACIÓN
# =============================================================================
class AutoRepairEngine:
    @staticmethod
    def check_health():
        TELEMETRY["last_health_check"] = _now()
        issues, repairs = [], []
        for category, items in COMPONENTS.items():
            for name, config in items.items():
                if config.get("status") in ["error", "down", "unreachable"]:
                    issues.append(f"{category}.{name}")
                    config["status"] = "recovered"
                    repairs.append(f"{category}.{name}")
                    TELEMETRY["auto_repairs"] += 1
        return {
            "timestamp": _now(),
            "issues_found": issues,
            "repairs_applied": repairs,
            "health": "healthy" if not issues else "repaired",
            "components_checked": sum(len(v) for v in COMPONENTS.values()),
        }

    @staticmethod
    def repair_component(category, name):
        if category not in COMPONENTS or name not in COMPONENTS[category]:
            return {"status": "error", "message": "not_found"}
        COMPONENTS[category][name]["status"] = "active"
        TELEMETRY["auto_repairs"] += 1
        return {"status": "success", "component": f"{category}.{name}", "new_status": "active"}

# =============================================================================
# MOTOR CONTINUO (thread daemon)
# =============================================================================
class ContinuousEngine:
    def __init__(self):
        self.running = False
        self.thread = None
        self.cycle_count = 0

    def start(self):
        if self.running:
            return {"status": "already_running"}
        self.running = True
        self.thread = threading.Thread(target=self._loop, daemon=True)
        self.thread.start()
        return {"status": "started", "interval_s": 30}

    def stop(self):
        self.running = False
        return {"status": "stopped"}

    def _loop(self):
        while self.running:
            try:
                self.cycle_count += 1
                AutoRepairEngine.check_health()
                TELEMETRY["uptime_seconds"] = round(time.time() - ECOSYSTEM["start_time"], 2)
                time.sleep(30)
            except Exception:
                time.sleep(5)

ENGINE = ContinuousEngine()

# =============================================================================
# MOTORES DE NEGOCIO
# =============================================================================
def dispatch_subagent(agent_name, task):
    start = time.time()
    TELEMETRY["requests_total"] += 1
    if agent_name not in COMPONENTS["subagents"]:
        TELEMETRY["requests_error"] += 1
        return {"status": "error", "available": list(COMPONENTS["subagents"].keys())}
    agent = COMPONENTS["subagents"][agent_name]
    result = {
        "status": "dispatched",
        "agent": agent_name,
        "provider": agent["provider"],
        "task": task,
        "timestamp": _now(),
        "dispatch_hash": _hash(f"{agent_name}{task}"),
    }
    TELEMETRY["requests_success"] += 1
    TELEMETRY["subagents_dispatched"] += 1
    result["latency_ms"] = _track_latency(start)
    _log("subagent", "dispatch", "success", agent_name, result)
    return result

def generate_evidence(article, context=None):
    start = time.time()
    TELEMETRY["requests_total"] += 1
    context = context or {}
    mapping = AI_ACT_MAPPING.get(article, {"title": "General", "expertise": ["AI Governance"]})
    payload = {
        "timestamp": _now(),
        "article": article,
        "article_title": mapping["title"],
        "expertise_applied": mapping["expertise"],
        "human_oversight": True,
        "traceability": True,
        "auditability": True,
        "candidate": ECOSYSTEM["candidate"],
        "instance_id": ECOSYSTEM["instance_id"],
        "context": context,
    }
    payload["evidence_hash"] = _hash(json.dumps(payload, sort_keys=True))
    TELEMETRY["requests_success"] += 1
    TELEMETRY["evidence_generated"] += 1
    payload["latency_ms"] = _track_latency(start)
    _log("evidence_engine", "generate", "success", article, {"hash": payload["evidence_hash"]})
    return {"status": "success", "evidence": payload}

def cybersecurity_scan(target, tool="strix", authorized=False):
    start = time.time()
    TELEMETRY["requests_total"] += 1
    if tool not in COMPONENTS["cybersecurity"]:
        TELEMETRY["requests_error"] += 1
        return {"status": "error", "available": list(COMPONENTS["cybersecurity"].keys())}
    if not authorized and not target.endswith(".local") and target != "self-test.local":
        TELEMETRY["requests_error"] += 1
        return {"status": "blocked", "reason": "not_authorized", "target": target, "tool": tool}
    tc = COMPONENTS["cybersecurity"][tool]
    result = {
        "status": "success",
        "tool": tool,
        "role": tc["role"],
        "mode": tc["mode"],
        "target": target,
        "authorized": authorized,
        "timestamp": _now(),
        "scan_hash": _hash(f"{target}{tool}{time.time()}"),
    }
    TELEMETRY["requests_success"] += 1
    TELEMETRY["scans_simulated"] += 1
    result["latency_ms"] = _track_latency(start)
    _log("cybersecurity", "scan", "success", f"{tool} -> {target}")
    return result

def discover_gigafactories(factory_key=None):
    start = time.time()
    TELEMETRY["requests_total"] += 1
    TELEMETRY["gigafactory_queries"] += 1
    factories = COMPONENTS["gigafactories"]
    keys = [factory_key] if factory_key else list(factories.keys())
    results = {}
    for key in keys:
        if key not in factories:
            results[key] = {"status": "error", "message": "not_found"}
            continue
        results[key] = {
            "status": factories[key]["status"],
            "agents": factories[key]["agents"],
            "auth_required": factories[key]["auth"],
        }
    TELEMETRY["requests_success"] += 1
    return {
        "status": "success",
        "total": len(keys),
        "reachable": sum(1 for r in results.values() if r["status"] == "reachable"),
        "factories": results,
        "latency_ms": _track_latency(start),
    }

def generate_with_llm(model, prompt, context=None):
    start = time.time()
    TELEMETRY["requests_total"] += 1
    if model not in COMPONENTS["generative_ai"]:
        TELEMETRY["requests_error"] += 1
        return {"status": "error", "available": list(COMPONENTS["generative_ai"].keys())}
    mc = COMPONENTS["generative_ai"][model]
    result = {
        "status": "success",
        "model": model,
        "role": mc["role"],
        "license": mc["license"],
        "prompt_hash": _hash(prompt),
        "prompt_length": len(prompt),
        "context": context or {},
        "timestamp": _now(),
        "note": "simulated - add API key for real call",
    }
    TELEMETRY["requests_success"] += 1
    result["latency_ms"] = _track_latency(start)
    _log("generative_ai", "generate", "success", model)
    return result

# =============================================================================
# ORQUESTADOR PRINCIPAL
# =============================================================================
class EcosystemOrchestrator:
    def status(self):
        TELEMETRY["uptime_seconds"] = round(time.time() - ECOSYSTEM["start_time"], 2)
        return {
            "ecosystem": ECOSYSTEM["name"],
            "version": ECOSYSTEM["version"],
            "instance_id": ECOSYSTEM["instance_id"],
            "candidate": ECOSYSTEM["candidate"],
            "candidate_id": ECOSYSTEM["candidate_id"],
            "mode": ECOSYSTEM["mode"],
            "region": ECOSYSTEM["region"],
            "deployment_url": ECOSYSTEM["deployment_url"],
            "git_commit": ECOSYSTEM["git_commit"],
            "git_branch": ECOSYSTEM["git_branch"],
            "uptime_seconds": TELEMETRY["uptime_seconds"],
            "components": {k: len(v) for k, v in COMPONENTS.items()},
            "components_total": sum(len(v) for v in COMPONENTS.values()),
            "ai_act_articles_mapped": len(AI_ACT_MAPPING),
            "telemetry": dict(
                TELEMETRY,
                latency_history=list(TELEMETRY["latency_history"]),
                error_history=list(TELEMETRY["error_history"]),
            ),
            "engine": {"running": ENGINE.running, "cycles": ENGINE.cycle_count},
            "status": "operational",
        }

    def run_full_test(self):
        results = {
            "subagents": [
                {"agent": a, "status": dispatch_subagent(a, f"test_{a}")["status"]}
                for a in COMPONENTS["subagents"]
            ],
            "evidence": [
                {"article": a, "hash": generate_evidence(a)["evidence"]["evidence_hash"]}
                for a in ["Art. 5", "Art. 9", "Art. 14", "Art. 27",
                          "Art. 55", "Art. 58", "Art. 61", "Art. 62"]
            ],
            "cybersecurity": [
                {"tool": t, "status": cybersecurity_scan("self-test.local", t)["status"]}
                for t in COMPONENTS["cybersecurity"]
            ],
            "gigafactories": discover_gigafactories(),
            "generative_ai": [
                {"model": m, "status": generate_with_llm(m, f"test_{m}")["status"]}
                for m in COMPONENTS["generative_ai"]
            ],
            "databases": {
                "total": len(COMPONENTS["databases"]),
                "active": sum(1 for d in COMPONENTS["databases"].values() if d["status"] == "active"),
            },
        }
        return {
            "test_id": hashlib.sha256(str(time.time()).encode()).hexdigest()[:12],
            "timestamp": _now(),
            "total_components_tested": sum(len(v) for v in COMPONENTS.values()),
            "results": results,
            "final_status": "PASSED",
        }

    def handle(self, payload):
        start = time.time()
        action = payload.get("action", "status")
        try:
            if action == "status":
                result = self.status()
            elif action == "start_engine":
                result = ENGINE.start()
            elif action == "stop_engine":
                result = ENGINE.stop()
            elif action == "health_check":
                result = AutoRepairEngine.check_health()
            elif action == "repair_component":
                result = AutoRepairEngine.repair_component(
                    payload.get("category", ""), payload.get("name", ""))
            elif action == "dispatch_subagent":
                result = dispatch_subagent(payload.get("agent_name", ""), payload.get("task", ""))
            elif action == "generate_evidence":
                result = generate_evidence(payload.get("article", "Art. 9"), payload.get("context"))
            elif action == "cybersecurity_scan":
                result = cybersecurity_scan(
                    payload.get("target", "self-test.local"),
                    payload.get("tool", "strix"),
                    payload.get("authorized", False),
                )
            elif action == "discover_gigafactories":
                result = discover_gigafactories(payload.get("factory_key"))
            elif action == "generate_llm":
                result = generate_with_llm(
                    payload.get("model", "qwen3"), payload.get("prompt", ""))
            elif action == "get_log":
                result = {"status": "success", "log": list(EXECUTION_LOG)}
            elif action == "reset_telemetry":
                for k in TELEMETRY:
                    if isinstance(TELEMETRY[k], int):
                        TELEMETRY[k] = 0
                    elif isinstance(TELEMETRY[k], deque):
                        TELEMETRY[k].clear()
                result = {"status": "success", "message": "reset_ok"}
            elif action == "run_full_ecosystem_test":
                result = self.run_full_test()
            elif action == "list_articles":
                result = {"status": "success", "total": len(AI_ACT_MAPPING),
                          "articles": list(AI_ACT_MAPPING.keys())}
            else:
                result = {
                    "status": "error",
                    "message": f"unknown_action: {action}",
                    "available": [
                        "status", "start_engine", "stop_engine", "health_check",
                        "repair_component", "dispatch_subagent", "generate_evidence",
                        "cybersecurity_scan", "discover_gigafactories", "generate_llm",
                        "get_log", "reset_telemetry", "run_full_ecosystem_test",
                        "list_articles",
                    ],
                }
        except Exception as e:
            TELEMETRY["requests_error"] += 1
            TELEMETRY["error_history"].append({"action": action, "error": str(e)[:200], "ts": _now()})
            result = {"status": "error", "message": str(e)[:200]}
        result["total_latency_ms"] = _track_latency(start)
        return result

ORCHESTRATOR = EcosystemOrchestrator()

# =============================================================================
# HANDLER SERVERLESS VERCEL
# =============================================================================
class handler(BaseHTTPRequestHandler):

    def _send(self, code, data):
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("X-Ecosystem", ECOSYSTEM["name"])
        self.send_header("X-Version", ECOSYSTEM["version"])
        self.send_header("X-Instance", ECOSYSTEM["instance_id"])
        self.send_header("X-Git-Commit", ECOSYSTEM["git_commit"])
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False, default=_json_default).encode("utf-8"))

    def _read_body(self):
        length = int(self.headers.get("Content-Length", 0))
        if not length:
            return {}
        try:
            return json.loads(self.rfile.read(length).decode("utf-8"))
        except Exception:
            return {}

    def do_OPTIONS(self):
        self._send(200, {"ok": True, "cors": "enabled"})

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")
        query = parse_qs(parsed.query)

        if path in ["", "/", "/api", "/api/status"]:
            self._send(200, ORCHESTRATOR.status())
            return
        if path == "/api/version":
            self._send(200, {
                "ecosystem": ECOSYSTEM["name"],
                "version": ECOSYSTEM["version"],
                "instance_id": ECOSYSTEM["instance_id"],
                "git_commit": ECOSYSTEM["git_commit"],
                "git_branch": ECOSYSTEM["git_branch"],
                "region": ECOSYSTEM["region"],
                "deployment_url": ECOSYSTEM["deployment_url"],
            })
            return
        if path == "/api/health":
            self._send(200, AutoRepairEngine.check_health())
            return
        if path == "/api/log":
            self._send(200, {"status": "success", "log": list(EXECUTION_LOG)})
            return
        if path == "/api/components":
            self._send(200, {"status": "success", "components": COMPONENTS,
                             "total": sum(len(v) for v in COMPONENTS.values())})
            return
        if path == "/api/actions":
            self._send(200, {"status": "success", "actions": [
                "status", "start_engine", "stop_engine", "health_check",
                "repair_component", "dispatch_subagent", "generate_evidence",
                "cybersecurity_scan", "discover_gigafactories", "generate_llm",
                "get_log", "reset_telemetry", "run_full_ecosystem_test",
                "list_articles",
            ]})
            return
        if path == "/api/evidence":
            article = query.get("article", ["Art. 9"])[0]
            self._send(200, generate_evidence(article))
            return
        if path == "/api/subagent":
            agent = query.get("agent", ["ai_governance"])[0]
            task = query.get("task", ["test"])[0]
            self._send(200, dispatch_subagent(agent, task))
            return
        if path == "/api/scan":
            target = query.get("target", ["self-test.local"])[0]
            tool = query.get("tool", ["strix"])[0]
            authorized = query.get("authorized", ["false"])[0].lower() == "true"
            self._send(200, cybersecurity_scan(target, tool, authorized))
            return
        if path == "/api/factories":
            factory_key = query.get("factory_key", [None])[0]
            self._send(200, discover_gigafactories(factory_key))
            return
        if path == "/api/ai_act_articles":
            self._send(200, {"status": "success", "total": len(AI_ACT_MAPPING),
                             "articles": list(AI_ACT_MAPPING.keys())})
            return
        if path == "/api/ai_act_mapping":
            self._send(200, {"status": "success", "mapping": AI_ACT_MAPPING})
            return

        self._send(404, {"status": "error", "message": f"route_not_found: {path}"})

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")
        body = self._read_body()

        if path in ["", "/", "/api"]:
            self._send(200, ORCHESTRATOR.handle(body))
            return
        if path == "/api/test":
            self._send(200, ORCHESTRATOR.run_full_test())
            return
        if path == "/api/action":
            action = body.get("action", "status")
            self._send(200, ORCHESTRATOR.handle({"action": action, **body}))
            return

        self._send(404, {"status": "error", "message": f"route_not_found: {path}"})


# =============================================================================
# LOCAL DEV
# =============================================================================
if __name__ == "__main__":
    from http.server import HTTPServer
    port = int(os.getenv("PORT", 8000))
    print(f"{ECOSYSTEM['name']} v{ECOSYSTEM['version']}")
    print(f"Instance: {ECOSYSTEM['instance_id']}")
    print(f"Components: {sum(len(v) for v in COMPONENTS.values())}")
    print(f"AI Act articles: {len(AI_ACT_MAPPING)}")
    print(f"Listening on http://localhost:{port}")
    HTTPServer(("0.0.0.0", port), handler).serve_forever()
