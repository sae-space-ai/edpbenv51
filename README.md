# EDPB-BACKEND v5.1

[![Status](https://img.shields.io/badge/status-MVP-yellow)]()
[![Fast-track](https://img.shields.io/badge/EDPB-SPE%202025--2030-blue)]()
[![Vercel](https://img.shields.io/badge/deploy-Vercel-black)]()

Backend serverless para el ecosistema EDPB-SUPER-ECOSYSTEM v5.1.

## Autor
**Manuel Gago Fernández** — Candidato EDPB SPE 2025-2030

## Características

- **31 componentes** organizados en 5 categorías
- **58 artículos AI Act** mapeados (Art. 5-62, incluyendo GPAI 44-55)
- **15 endpoints** (12 GET + 3 POST)
- **3 motores internos** (AutoRepair, Continuous, Orchestrator)
- **Telemetría en tiempo real** con latencia y errores
- **Auto-reparación** de componentes caídos
- **CORS habilitado** para integración frontend

## Estructura del Repositorio

```
edpb-backend/
├── api/
│   └── index.py              <- Backend serverless (Python 3.11)
├── requirements.txt           <- Dependencias (requests)
├── vercel.json                <- Config Vercel serverless
├── .gitignore                 <- Exclusiones Git
└── README.md                  <- Documentación
```

## Componentes (31)

### Generative AI (7)
| Modelo | Rol | Licencia |
|--------|-----|----------|
| qwen3 | general_llm | Apache-2.0 |
| deepseek_v4 | coding_llm | MIT |
| glm_52 | reasoning_llm | MIT |
| gemma_4 | multimodal_llm | Apache-2.0 |
| phi_4_mini | edge_llm | MIT |
| llama_4_scout | long_context_llm | Llama |
| kimi_k3 | frontier_llm | Kimi |

### Cybersecurity (8)
| Herramienta | Rol | Modo |
|-------------|-----|------|
| strix | autonomous_pentest | dry-run |
| nuclei | scanner | dry-run |
| pentestgpt | llm_copilot | advisory |
| pentagi | multiagent | dry-run |
| hexstrike_ai | mcp_bridge | advisory |
| faraday | vuln_mgmt | ingest |
| metasploit | exploitation | lab-only |
| recon_ng | osint | passive |

### Databases (3)
| Base de Datos | Rol | Fortaleza |
|---------------|-----|-----------|
| pgvector | vector_store | WAL+PITR |
| milvus | billion_scale | recall |
| qdrant | low_latency | filtering |

### Sub-Agents (8)
| Agente | Provider |
|--------|----------|
| ai_governance | qwen3 |
| ai_act_compliance | glm_52 |
| risk_assessment | qwen3 |
| regulatory_monitor | glm_52 |
| privacy_tech | qwen3 |
| cloud_security | deepseek_v4 |
| training_designer | gemma_4 |
| evidence_engine | phi_4_mini |

### Gigafactories (5)
| Factoría | Agentes | Auth |
|----------|---------|------|
| nexus_agi | 133 | No |
| ai_agent_marketplace | 10K+ | Sí |
| peli_agent_factory | 100+ | No |
| beacon_mcp | 3,800+ | No |
| a2astore | 80+ | No |

## Endpoints (15)

### GET (12)

| Endpoint | Descripción |
|----------|-------------|
| `/api/status` | Estado completo + telemetría |
| `/api/version` | Versión + commit + región |
| `/api/health` | Health check auto-reparación |
| `/api/log` | Log con hashes SHA-256 |
| `/api/components` | 31 componentes |
| `/api/actions` | 14 acciones disponibles |
| `/api/evidence?article=X` | Evidencia AI Act |
| `/api/subagent?agent=X&task=Y` | Despacho sub-agente |
| `/api/scan?target=X&tool=Y` | Scan (bloquea no-.local) |
| `/api/factories` | 5 gigafactorías |
| `/api/ai_act_articles` | Lista 58 artículos |
| `/api/ai_act_mapping` | Mapping completo |

### POST (3)

| Endpoint | Descripción |
|----------|-------------|
| `/api` | 14 acciones vía JSON |
| `/api/test` | Test completo ecosistema |
| `/api/action` | Acción específica |

## Acciones Disponibles (14)

```json
{
  "action": "status"
}
{
  "action": "start_engine"
}
{
  "action": "stop_engine"
}
{
  "action": "health_check"
}
{
  "action": "repair_component",
  "category": "generative_ai",
  "name": "qwen3"
}
{
  "action": "dispatch_subagent",
  "agent_name": "ai_governance",
  "task": "Analizar cumplimiento Art. 9"
}
{
  "action": "generate_evidence",
  "article": "Art. 9",
  "context": {"organization": "ACME Corp"}
}
{
  "action": "cybersecurity_scan",
  "target": "self-test.local",
  "tool": "strix",
  "authorized": true
}
{
  "action": "discover_gigafactories",
  "factory_key": "nexus_agi"
}
{
  "action": "generate_llm",
  "model": "qwen3",
  "prompt": "Genera un informe de cumplimiento"
}
{
  "action": "get_log"
}
{
  "action": "reset_telemetry"
}
{
  "action": "run_full_ecosystem_test"
}
{
  "action": "list_articles"
}
```

## Despliegue en Vercel

### Opción A — Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel@latest

# Login
vercel login

# Link proyecto
vercel link --yes

# Deploy producción
vercel --prod --yes
```

### Opción B — GitHub + Vercel Dashboard

1. Push a GitHub:
```bash
git init
git branch -M main
git add .
git commit -m "EDPB Backend v5.1 — 15 endpoints, 31 componentes, 58 artículos AI Act"
git remote add origin https://github.com/TU_USUARIO/edpb-backend.git
git push -u origin main
```

2. Ir a https://vercel.com/new
3. Importar repositorio `edpb-backend`
4. Framework Preset: **Other**
5. Deploy

### Opción C — Despliegue Manual Rápido

```bash
# 1. Crear estructura
mkdir -p edpb-backend/api && cd edpb-backend

# 2. Copiar archivos (api/index.py, requirements.txt, vercel.json, .gitignore)

# 3. Git init + push
git init && git branch -M main
git add . && git commit -m "EDPB Backend v5.1"
git remote add origin https://github.com/TU_USUARIO/edpb-backend.git
git push -u origin main

# 4. Deploy a Vercel
npm install -g vercel@latest
vercel link --yes
vercel --prod --yes

# 5. Verificar
curl https://TU-PROYECTO.vercel.app/api/status
```

## Verificación de Endpoints

```bash
PROD_URL="https://tu-proyecto.vercel.app"

# Verificar GET endpoints
for ep in status version health components actions log factories ai_act_articles ai_act_mapping; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/api/$ep")
  echo "GET /api/$ep -> HTTP $CODE"
done

# Verificar GET con parámetros
for q in "evidence?article=Art.%209" "subagent?agent=ai_governance&task=test" "scan?target=self-test.local&tool=strix"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/api/$q")
  echo "GET /api/$q -> HTTP $CODE"
done

# Verificar POST endpoints
curl -s -X POST "$PROD_URL/api" \
  -H "Content-Type: application/json" \
  -d '{"action":"status"}' \
  -o /dev/null -w "POST /api -> HTTP %{http_code}\n"

curl -s -X POST "$PROD_URL/api/test" \
  -o /dev/null -w "POST /api/test -> HTTP %{http_code}\n"

curl -s -X POST "$PROD_URL/api/action" \
  -H "Content-Type: application/json" \
  -d '{"action":"health_check"}' \
  -o /dev/null -w "POST /api/action -> HTTP %{http_code}\n"
```

## Ejemplos de Uso

### Obtener estado del ecosistema
```bash
curl https://tu-proyecto.vercel.app/api/status
```

### Generar evidencia para Art. 9
```bash
curl "https://tu-proyecto.vercel.app/api/evidence?article=Art.%209"
```

### Despachar sub-agente
```bash
curl -X POST https://tu-proyecto.vercel.app/api \
  -H "Content-Type: application/json" \
  -d '{
    "action": "dispatch_subagent",
    "agent_name": "ai_governance",
    "task": "Analizar riesgos del sistema de IA"
  }'
```

### Ejecutar test completo
```bash
curl -X POST https://tu-proyecto.vercel.app/api/test
```

## Configuración Vercel

```json
{
  "version": 2,
  "name": "edpb-backend",
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python",
      "config": { "maxLambdaSize": "50mb" }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "api/index.py" },
    { "src": "/(.*)", "dest": "api/index.py" }
  ],
  "functions": {
    "api/index.py": { "maxDuration": 300, "memory": 1024 }
  },
  "regions": ["iad1", "fra1"]
}
```

## Desarrollo Local

```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor local
python api/index.py

# Servidor en http://localhost:8000
curl http://localhost:8000/api/status
```

## Variables de Entorno (Opcional)

| Variable | Descripción | Default |
|----------|-------------|---------|
| `ECOSYSTEM_NAME` | Nombre del ecosistema | EDPB-SUPER-ECOSYSTEM |
| `ECOSYSTEM_VERSION` | Versión | 5.1.0 |
| `VERCEL_REGION` | Región de despliegue | auto |
| `VERCEL_URL` | URL del deployment | localhost |
| `PORT` | Puerto local | 8000 |

## Licencia

MIT

## Resumen

| Métrica | Valor |
|---------|-------|
| Componentes | 31 |
| Artículos AI Act | 58 |
| Endpoints | 15 (12 GET + 3 POST) |
| Archivos | 5 |
| Runtime | Python 3.11 serverless |
| Regiones | iad1 + fra1 |
| Max Duration | 300s |
| Memory | 1024 MB |
| Tiempo de despliegue | ~2 minutos |
| Coste | GRATIS (Vercel Hobby Plan) |

---

**Estado: LISTO PARA PRODUCCIÓN**

© 2025 Manuel Gago Fernández  
Candidato EDPB SPE 2025-2030
