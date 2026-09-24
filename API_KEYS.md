# EDPB-BACKEND v5.1 — API KEYS GUIDE

Guía completa de las 9 APIs gratuitas integradas en el ecosistema EDPB.

**Autor:** Manuel Gago Fernández — Candidato EDPB SPE 2025-2030

---

## Tabla Resumen

| # | API | Modelo Principal | Límite Gratuito | Variable de Entorno |
|---|-----|------------------|-----------------|---------------------|
| 1 | Google AI Studio | gemini-3-flash | 15 RPM / 1500 RPD | `GEMINI_API_KEY` |
| 2 | OpenRouter | nemotron-3-ultra, qwen3, glm-5.2, llama-4 | 20 RPM / 50 RPD | `OPENROUTER_API_KEY` |
| 3 | Groq | llama-3.3-70b, qwen-3 | 30 RPM / 14400 RPD | `GROQ_API_KEY` |
| 4 | Alibaba Bailian | Qwen3, DeepSeek, GLM, Kimi | 70M tokens gratis | `ALIBABA_BAILIAN_API_KEY` |
| 5 | NVIDIA NIM | GLM-5.2, Llama-4 | 40 RPM / 1000 RPD | `NVIDIA_API_KEY` |
| 6 | Mistral | mistral-small | 1 RPS / 1B tokens/mes | `MISTRAL_API_KEY` |
| 7 | DeepSeek | deepseek-v3.2 | 60 RPM | `DEEPSEEK_API_KEY` |
| 8 | Cerebras | llama-3.1-8b | 30 RPM / 14400 RPD | `CEREBRAS_API_KEY` |
| 9 | Vercel Postgres | PostgreSQL + pgvector | Free tier | `DATABASE_URL` |

---

## 1. Google AI Studio (Gemini)

**URL:** https://aistudio.google.com/app/apikey

**Modelo:** gemini-3-flash

**Límites:**
- 15 Requests Per Minute (RPM)
- 1500 Requests Per Day (RPD)

**Configuración:**
```bash
# Obtener API Key
# 1. Ir a https://aistudio.google.com/app/apikey
# 2. Crear nueva API Key
# 3. Copiar y guardar

# En Vercel
vercel env add GEMINI_API_KEY
```

**Ejemplo de uso:**
```python
import requests

response = requests.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent",
    headers={"x-goog-api-key": os.getenv("GEMINI_API_KEY")},
    json={"contents": [{"parts": [{"text": prompt}]}]}
)
```

---

## 2. OpenRouter

**URL:** https://openrouter.ai/keys

**Modelos disponibles:**
- nemotron-3-ultra
- qwen3
- glm-5.2
- llama-4

**Límites:**
- 20 RPM
- 50 RPD

**Configuración:**
```bash
vercel env add OPENROUTER_API_KEY
```

**Ejemplo de uso:**
```python
response = requests.post(
    "https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
        "Content-Type": "application/json"
    },
    json={
        "model": "nvidia/llama-3.1-nemotron-ultra-253b",
        "messages": [{"role": "user", "content": prompt}]
    }
)
```

---

## 3. Groq

**URL:** https://console.groq.com/keys

**Modelos:**
- llama-3.3-70b
- qwen-3

**Límites:**
- 30 RPM
- 14400 RPD (muy generoso)

**Configuración:**
```bash
vercel env add GROQ_API_KEY
```

**Ejemplo de uso:**
```python
response = requests.post(
    "https://api.groq.com/openai/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}",
        "Content-Type": "application/json"
    },
    json={
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": prompt}]
    }
)
```

---

## 4. Alibaba Bailian (Qwen oficial)

**URL:** https://bailian.console.aliyun.com/

**Modelos:**
- Qwen3
- DeepSeek
- GLM
- Kimi

**Límites:**
- 70 millones de tokens gratis

**Configuración:**
```bash
vercel env add ALIBABA_BAILIAN_API_KEY
```

**Ejemplo de uso:**
```python
response = requests.post(
    "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
    headers={
        "Authorization": f"Bearer {os.getenv('ALIBABA_BAILIAN_API_KEY')}",
        "Content-Type": "application/json"
    },
    json={
        "model": "qwen3",
        "input": {"messages": [{"role": "user", "content": prompt}]}
    }
)
```

---

## 5. NVIDIA NIM

**URL:** https://build.nvidia.com/

**Modelos:**
- GLM-5.2
- Llama-4

**Límites:**
- 40 RPM
- 1000 RPD

**Configuración:**
```bash
vercel env add NVIDIA_API_KEY
```

**Ejemplo de uso:**
```python
response = requests.post(
    "https://integrate.api.nvidia.com/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {os.getenv('NVIDIA_API_KEY')}",
        "Content-Type": "application/json"
    },
    json={
        "model": "nvidia/llama-3.1-glm-5.2",
        "messages": [{"role": "user", "content": prompt}]
    }
)
```

---

## 6. Mistral

**URL:** https://console.mistral.ai/

**Modelo:** mistral-small

**Límites:**
- 1 Request Per Second (RPS)
- 1 billón de tokens por mes

**Configuración:**
```bash
vercel env add MISTRAL_API_KEY
```

**Ejemplo de uso:**
```python
response = requests.post(
    "https://api.mistral.ai/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {os.getenv('MISTRAL_API_KEY')}",
        "Content-Type": "application/json"
    },
    json={
        "model": "mistral-small",
        "messages": [{"role": "user", "content": prompt}]
    }
)
```

---

## 7. DeepSeek

**URL:** https://platform.deepseek.com/

**Modelo:** deepseek-v3.2

**Límites:**
- 60 RPM

**Configuración:**
```bash
vercel env add DEEPSEEK_API_KEY
```

**Ejemplo de uso:**
```python
response = requests.post(
    "https://api.deepseek.com/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {os.getenv('DEEPSEEK_API_KEY')}",
        "Content-Type": "application/json"
    },
    json={
        "model": "deepseek-v3.2",
        "messages": [{"role": "user", "content": prompt}]
    }
)
```

---

## 8. Cerebras

**URL:** https://cloud.cerebras.ai/

**Modelo:** llama-3.1-8b

**Límites:**
- 30 RPM
- 14400 RPD

**Configuración:**
```bash
vercel env add CEREBRAS_API_KEY
```

**Ejemplo de uso:**
```python
response = requests.post(
    "https://api.cerebras.ai/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {os.getenv('CEREBRAS_API_KEY')}",
        "Content-Type": "application/json"
    },
    json={
        "model": "llama-3.1-8b",
        "messages": [{"role": "user", "content": prompt}]
    }
)
```

---

## 9. Vercel Postgres (pgvector)

**URL:** https://vercel.com/storage/postgres

**Características:**
- PostgreSQL 15+
- Extensión pgvector habilitada
- WAL + PITR (Write-Ahead Logging + Point-In-Time Recovery)

**Límites:**
- Free tier: 256 MB storage
- 60 horas de computación/mes

**Configuración:**
```bash
# En Vercel Dashboard
# 1. Ir a Storage > Create Database
# 2. Seleccionar Postgres
# 3. Conectar al proyecto
# 4. Copiar DATABASE_URL

vercel env add DATABASE_URL
```

**Ejemplo de uso:**
```python
import psycopg2

conn = psycopg2.connect(os.getenv("DATABASE_URL"))
cur = conn.cursor()

# Crear tabla con vector
cur.execute("""
    CREATE TABLE IF NOT EXISTS embeddings (
        id SERIAL PRIMARY KEY,
        text TEXT,
        embedding VECTOR(1536)
    )
""")

conn.commit()
```

---

## Configuración Rápida en Vercel

### Método 1: Vercel CLI (Recomendado)
```bash
# Agregar todas las variables
vercel env add GEMINI_API_KEY
vercel env add OPENROUTER_API_KEY
vercel env add GROQ_API_KEY
vercel env add ALIBABA_BAILIAN_API_KEY
vercel env add NVIDIA_API_KEY
vercel env add MISTRAL_API_KEY
vercel env add DEEPSEEK_API_KEY
vercel env add CEREBRAS_API_KEY
vercel env add DATABASE_URL

# Redeploy
vercel --prod
```

### Método 2: Vercel Dashboard
1. Ir a https://vercel.com/dashboard
2. Seleccionar proyecto `edpb-backend`
3. Settings > Environment Variables
4. Agregar cada variable para Production, Preview y Development
5. Redeploy desde Deployments > Promote to Production

---

## Estrategia de Uso Recomendada

### Para máxima disponibilidad:
1. **Primary:** Groq (14400 RPD, muy generoso)
2. **Secondary:** Cerebras (14400 RPD)
3. **Tertiary:** OpenRouter (50 RPD, múltiples modelos)

### Para máxima calidad:
1. **Primary:** Google AI Studio (Gemini 3 Flash)
2. **Secondary:** NVIDIA NIM (GLM-5.2)
3. **Tertiary:** Alibaba Bailian (Qwen3 oficial)

### Para máximo volumen:
1. **Primary:** Alibaba Bailian (70M tokens)
2. **Secondary:** Mistral (1B tokens/mes)
3. **Tertiary:** Groq (14400 RPD)

---

## Costes Estimados (Free Tier)

| API | Tokens/Mes | Requests/Día | Coste Mensual |
|-----|------------|--------------|---------------|
| Google AI Studio | ~1M | 1500 | $0 |
| OpenRouter | ~500K | 50 | $0 |
| Groq | ~2M | 14400 | $0 |
| Alibaba Bailian | 70M total | N/A | $0 |
| NVIDIA NIM | ~1M | 1000 | $0 |
| Mistral | 1B | ~86400 | $0 |
| DeepSeek | ~500K | ~86400 | $0 |
| Cerebras | ~1M | 14400 | $0 |
| Vercel Postgres | 256 MB | N/A | $0 |

**Total mensual estimado: $0**

---

## Notas Importantes

1. **No se requiere tarjeta de crédito** para ninguna de estas APIs
2. **Los límites son por cuenta**, no por proyecto
3. **Algunas APIs requieren verificación de email** antes de activar
4. **Vercel Postgres** requiere crear el proyecto en Vercel primero
5. **Los límites pueden cambiar** - verificar en la documentación oficial

---

## Recursos Adicionales

- [Google AI Studio Docs](https://ai.google.dev/docs)
- [OpenRouter Docs](https://openrouter.ai/docs)
- [Groq Docs](https://console.groq.com/docs)
- [Alibaba Bailian Docs](https://help.aliyun.com/product/2400256.html)
- [NVIDIA NIM Docs](https://docs.nvidia.com/nim/)
- [Mistral Docs](https://docs.mistral.ai/)
- [DeepSeek Docs](https://platform.deepseek.com/api-docs/)
- [Cerebras Docs](https://docs.cerebras.ai/)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)

---

© 2025 Manuel Gago Fernández  
Candidato EDPB SPE 2025-2030
