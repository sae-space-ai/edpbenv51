# EDPB-BACKEND v5.1

[![Status](https://img.shields.io/badge/status-MVP-yellow)]()
[![Fast-track](https://img.shields.io/badge/EDPB-SPE%202025--2030-blue)]()
[![Vercel](https://img.shields.io/badge/deploy-Vercel-black)]()
[![APIs](https://img.shields.io/badge/APIs%20gratuitas-9-green)]()

Backend serverless para el ecosistema EDPB-SUPER-ECOSYSTEM v5.1.

## Autor
**Manuel Gago Fernández** — Candidato EDPB SPE 2025-2030

## Características

- **31 componentes** organizados en 5 categorías
- **58 artículos AI Act** mapeados (Art. 5-62, incluyendo GPAI 44-55)
- **15 endpoints** (12 GET + 3 POST)
- **9 APIs gratuitas** integradas (sin tarjeta de crédito)
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
├── README.md                  <- Documentación
└── APIS.md                    <- Guía de APIs gratuitas
```

## 9 APIs Gratuitas Integradas

| # | API | Modelo Principal | Límite Gratuito | Variable |
|---|-----|------------------|-----------------|----------|
| 1 | Google AI Studio | gemini-3-flash | 15 RPM / 1500 RPD | `GEMINI_API_KEY` |
| 2 | OpenRouter | nemotron-3-ultra, qwen3, glm-5.2, llama-4 | 20 RPM / 50 RPD | `OPENROUTER_API_KEY` |
| 3 | Groq | llama-3.3-70b, qwen-3 | 30 RPM / 14400 RPD | `GROQ_API_KEY` |
| 4 | Alibaba Bailian | Qwen3, DeepSeek, GLM, Kimi | 70M tokens gratis | `ALIBABA_BAILIAN_API_KEY` |
| 5 | NVIDIA NIM | GLM-5.2, Llama-4 | 40 RPM / 1000 RPD | `NVIDIA_API_KEY` |
| 6 | Mistral | mistral-small | 1 RPS / 1B tokens/mes | `MISTRAL_API_KEY` |
| 7 | DeepSeek | deepseek-v3.2 | 60 RPM | `DEEPSEEK_API_KEY` |
| 8 | Cerebras | llama-3.1-8b | 30 RPM / 14400 RPD | `CEREBRAS_API_KEY` |
| 9 | Vercel Postgres | PostgreSQL + pgvector | Free tier | `DATABASE_URL` |

**Ver [APIS.md](./APIS.md) para documentación completa de cada API.**

## Componentes (31)

### Módulo 1 — Generative AI (7)
| Modelo | Rol | Licencia |
|--------|-----|----------|
| qwen3 | general_llm | Apache-2.0 |
| deepseek_v4 | coding_llm | MIT |
| glm_52 | reasoning_llm | MIT |
| gemma_4 | multimodal_llm | Apache-2.0 |
| phi_4_mini | edge_llm | MIT |
| llama_4_scout | long_context_llm | Llama |
| kimi_k3 | frontier_llm | Kimi |

### Módulo 2 — Cybersecurity (8)
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

### Módulo 3 — Databases (3)
| Base de Datos | Rol | Fortaleza |
|---------------|-----|-----------|
| pgvector | vector_store | WAL+PITR |
| milvus | billion_scale | recall |
| qdrant | low_latency | filtering |

### Módulo 4 — Sub-Agents (8)
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

### Módulo 5 — Gigafactories (5)
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

## 6 Habilidades del Arquitecto

1. **Detección de Errores** — SyntaxError, ImportError, TypeError, config
2. **Corrección Automática** — Fixes Python, ESLint, TypeScript, .env
3. **Verificación con curl** — HTTP status, latencias, resultados reales
4. **Gestión de Git** — init, commit, push, tags, releases, CI/CD
5. **Gestión de Vercel** — link, deploy, env vars, URL, verificación
6. **Reporte Trazable** — JSON, 100 tests, success_rate, SHA-256

## 3 Complementos

### Complemento 1 — EU AI Icons
- SVG y PNG oficiales de la Comisión Europea
- Ubicación: `assets/eu-ai-icons/`

### Complemento 2 — 100 Pruebas
- **Batch A:** 10 tests conectividad
- **Batch B:** 20 tests evidencias
- **Batch C:** 16 tests subagentes
- **Batch D:** 16 tests ciberseguridad
- **Batch E:** 14 tests LLM
- **Batch F:** 10 tests gigafactorías
- **Batch G:** 8 tests log
- **Batch H:** 6 tests completos

### Complemento 3 — Monitoreo
- **UptimeRobot:** 2 monitores (status + health)
- **Vercel Analytics:** activar
- **Vercel Logs:** 30 días retención

## Despliegue en Vercel

### Opción A — Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel@latest

# Login
vercel login

# Link proyecto
vercel link --yes

# Agregar variables de entorno
vercel env add GEMINI_API_KEY
vercel env add OPENROUTER_API_KEY
vercel env add GROQ_API_KEY
vercel env add ALIBABA_BAILIAN_API_KEY
vercel env add NVIDIA_API_KEY
vercel env add MISTRAL_API_KEY
vercel env add DEEPSEEK_API_KEY
vercel env add CEREBRAS_API_KEY
vercel env add DATABASE_URL

# Deploy producción
vercel --prod --yes
```

### Opción B — GitHub + Vercel Dashboard

1. Push a GitHub:
```bash
git init
git branch -M main
git add .
git commit -m "EDPB Backend v5.1 — 31 componentes, 15 endpoints, 58 artículos AI Act, 9 APIs gratuitas"
git remote add origin https://github.com/TU_USUARIO/edpb-backend.git
git push -u origin main
```

2. Ir a https://vercel.com/new
3. Importar repositorio `edpb-backend`
4. Framework Preset: **Other**
5. Agregar Environment Variables (ver sección APIs)
6. Deploy

### Opción C — Despliegue Rápido (4 comandos)

```bash
# 1. Crear estructura
mkdir -p api && ls api/index.py requirements.txt vercel.json

# 2. Git + GitHub
git init && git branch -M main && git add . && git commit -m "EDPB Backend v5.1" && gh repo create edpb-backend --public --source=. --push

# 3. Deploy Vercel
vercel link --yes && vercel --prod --yes

# 4. Verificar
curl $(vercel ls --prod | grep -oE 'https://[a-zA-Z0-9.-]+\.vercel\.app' | head -1)/api/status
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

## Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `ECOSYSTEM_NAME` | Nombre del ecosistema | No (default: EDPB-SUPER-ECOSYSTEM) |
| `ECOSYSTEM_VERSION` | Versión | No (default: 5.1.0) |
| `VERCEL_REGION` | Región de despliegue | No (auto) |
| `VERCEL_URL` | URL del deployment | No (localhost) |
| `PORT` | Puerto local | No (default: 8000) |
| `GEMINI_API_KEY` | Google AI Studio | Opcional |
| `OPENROUTER_API_KEY` | OpenRouter | Opcional |
| `GROQ_API_KEY` | Groq | Opcional |
| `ALIBABA_BAILIAN_API_KEY` | Alibaba Bailian | Opcional |
| `NVIDIA_API_KEY` | NVIDIA NIM | Opcional |
| `MISTRAL_API_KEY` | Mistral | Opcional |
| `DEEPSEEK_API_KEY` | DeepSeek | Opcional |
| `CEREBRAS_API_KEY` | Cerebras | Opcional |
| `DATABASE_URL` | Vercel Postgres | Opcional |

## Resumen

| Métrica | Valor |
|---------|-------|
| Componentes | 31 |
| Artículos AI Act | 58 |
| Endpoints | 15 (12 GET + 3 POST) |
| APIs Gratuitas | 9 |
| Habilidades | 6 |
| Complementos | 3 |
| Archivos | 6 |
| Runtime | Python 3.11 serverless |
| Regiones | iad1 + fra1 |
| Max Duration | 300s |
| Memory | 1024 MB |
| Tiempo de despliegue | ~2 minutos |
| Coste | GRATIS (Vercel Hobby Plan + APIs gratuitas) |

---

**Estado: LISTO PARA PRODUCCIÓN**

© 2025 Manuel Gago Fernández  
Candidato EDPB SPE 2025-2030
