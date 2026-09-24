import { useState } from 'react';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  command?: string;
}

export default function DeployGuide() {
  const [phase, setPhase] = useState(0);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 'git', label: 'Git instalado', checked: false },
    { id: 'node', label: 'Node.js instalado', checked: false },
    { id: 'python', label: 'Python 3.11+ instalado', checked: false },
    { id: 'vercel-cli', label: 'Vercel CLI instalado', checked: false },
    { id: 'gh-cli', label: 'GitHub CLI instalado', checked: false },
    { id: 'vercel-auth', label: 'Vercel autenticado (vercel login)', checked: false },
    { id: 'gh-auth', label: 'GitHub autenticado (gh auth login)', checked: false },
  ]);

  const files = [
    { path: 'api/index.py', desc: 'Backend serverless Python 3.11', lines: 651, status: 'ready' },
    { path: 'requirements.txt', desc: 'Dependencias Python', lines: 1, status: 'ready' },
    { path: 'vercel.json', desc: 'Configuración Vercel serverless', lines: 20, status: 'ready' },
    { path: '.gitignore', desc: 'Exclusiones Git', lines: 10, status: 'ready' },
    { path: 'README.md', desc: 'Documentación del proyecto', lines: 280, status: 'ready' },
  ];

  const endpoints = [
    { method: 'GET', path: '/api/status', desc: 'Estado completo + telemetría' },
    { method: 'GET', path: '/api/version', desc: 'Versión + commit + región' },
    { method: 'GET', path: '/api/health', desc: 'Health check auto-reparación' },
    { method: 'GET', path: '/api/log', desc: 'Log con hashes SHA-256' },
    { method: 'GET', path: '/api/components', desc: '31 componentes' },
    { method: 'GET', path: '/api/actions', desc: '14 acciones disponibles' },
    { method: 'GET', path: '/api/evidence?article=X', desc: 'Evidencia AI Act' },
    { method: 'GET', path: '/api/subagent?agent=X&task=Y', desc: 'Despacho sub-agente' },
    { method: 'GET', path: '/api/scan?target=X&tool=Y', desc: 'Scan ciberseguridad' },
    { method: 'GET', path: '/api/factories', desc: '5 gigafactorías' },
    { method: 'GET', path: '/api/ai_act_articles', desc: 'Lista 58 artículos' },
    { method: 'GET', path: '/api/ai_act_mapping', desc: 'Mapping completo' },
    { method: 'POST', path: '/api', desc: '14 acciones vía JSON' },
    { method: 'POST', path: '/api/test', desc: 'Test completo ecosistema' },
    { method: 'POST', path: '/api/action', desc: 'Acción específica' },
  ];

  const phases = [
    {
      title: 'FASE 0 — Preparación',
      icon: '🔧',
      color: 'cyan',
      commands: [
        { label: 'Verificar Git', cmd: 'git --version' },
        { label: 'Verificar Node.js', cmd: 'node --version' },
        { label: 'Verificar Python', cmd: 'python --version' },
        { label: 'Verificar Vercel CLI', cmd: 'vercel --version || npm install -g vercel@latest' },
        { label: 'Verificar GitHub CLI', cmd: 'gh --version' },
        { label: 'Login Vercel', cmd: 'vercel login' },
        { label: 'Login GitHub', cmd: 'gh auth login' },
      ],
    },
    {
      title: 'FASE 1 — Archivos',
      icon: '📁',
      color: 'purple',
      commands: [
        { label: 'Estructura del proyecto', cmd: 'mkdir -p api' },
        { label: 'Verificar archivos', cmd: 'ls -la api/index.py requirements.txt vercel.json .gitignore README.md' },
      ],
    },
    {
      title: 'FASE 2 — Git + GitHub',
      icon: '🚀',
      color: 'green',
      commands: [
        { label: 'Inicializar Git', cmd: 'git init' },
        { label: 'Rama principal', cmd: 'git branch -M main' },
        { label: 'Agregar archivos', cmd: 'git add .' },
        { label: 'Commit', cmd: 'git commit -m "EDPB Backend v5.1 — 31 componentes, 15 endpoints, 58 artículos AI Act"' },
        { label: 'Crear repo GitHub', cmd: 'gh repo create edpb-backend --public --description "EDPB Backend v5.1 — MVP Fast-track candidate" --source=. --remote=origin --push' },
        { label: 'Alternativa push', cmd: 'git remote add origin https://github.com/TU_USUARIO/edpb-backend.git && git push -u origin main' },
      ],
    },
    {
      title: 'FASE 3 — Deploy Vercel',
      icon: '⚡',
      color: 'amber',
      commands: [
        { label: 'Link proyecto', cmd: 'vercel link --yes' },
        { label: 'Deploy producción', cmd: 'vercel --prod --yes' },
        { label: 'Obtener URL', cmd: 'PROD_URL=$(vercel ls --prod | grep -oE \'https://[a-zA-Z0-9.-]+\\.vercel\\.app\' | head -1) && echo "PROD_URL=$PROD_URL"' },
        { label: 'Verificar status', cmd: 'curl -s "$PROD_URL/api/status" | head -c 300' },
      ],
    },
    {
      title: 'FASE 4 — Verificación',
      icon: '✅',
      color: 'blue',
      commands: [
        { label: 'Verificar GET endpoints', cmd: `for ep in status version health components actions log factories ai_act_articles ai_act_mapping; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/api/$ep")
  echo "GET /api/$ep -> HTTP $CODE"
done` },
        { label: 'Verificar GET con params', cmd: `for q in "evidence?article=Art.%209" "subagent?agent=ai_governance&task=test" "scan?target=self-test.local&tool=strix"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/api/$q")
  echo "GET /api/$q -> HTTP $CODE"
done` },
        { label: 'Verificar POST endpoints', cmd: `curl -s -X POST "$PROD_URL/api" -H "Content-Type: application/json" -d '{"action":"status"}' -o /dev/null -w "POST /api -> HTTP %{http_code}\\n"
curl -s -X POST "$PROD_URL/api/test" -o /dev/null -w "POST /api/test -> HTTP %{http_code}\\n"
curl -s -X POST "$PROD_URL/api/action" -H "Content-Type: application/json" -d '{"action":"health_check"}' -o /dev/null -w "POST /api/action -> HTTP %{http_code}\\n"` },
      ],
    },
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const toggleChecklist = (id: string) => {
    setChecklist(prev => prev.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const checkedCount = checklist.filter(i => i.checked).length;
  const totalFiles = files.length;
  const totalEndpoints = endpoints.length;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-amber-500/10 rounded-xl border border-gray-800 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">🏗️</span>
              EDPB-ARCHITECT-2025
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Guía interactiva de despliegue autónomo en GitHub + Vercel
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Autor: Manuel Gago Fernández · Candidato EDPB SPE 2025-2030
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center px-4 py-2 bg-gray-900/50 rounded-lg border border-gray-700">
              <p className="text-2xl font-bold text-cyan-400">{totalFiles}</p>
              <p className="text-xs text-gray-400">Archivos</p>
            </div>
            <div className="text-center px-4 py-2 bg-gray-900/50 rounded-lg border border-gray-700">
              <p className="text-2xl font-bold text-purple-400">{totalEndpoints}</p>
              <p className="text-xs text-gray-400">Endpoints</p>
            </div>
            <div className="text-center px-4 py-2 bg-gray-900/50 rounded-lg border border-gray-700">
              <p className="text-2xl font-bold text-amber-400">{checkedCount}/{checklist.length}</p>
              <p className="text-xs text-gray-400">Prereqs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Files Status */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>📂</span> Estado de Archivos del Proyecto
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {files.map((file) => (
            <div key={file.path} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                ✓
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-white truncate">{file.path}</p>
                <p className="text-xs text-gray-400">{file.desc}</p>
              </div>
              <span className="text-xs text-gray-500">{file.lines}L</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prerequisites Checklist */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>✅</span> Prerrequisitos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {checklist.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                item.checked
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                item.checked ? 'bg-green-500 border-green-500' : 'border-gray-600'
              }`}>
                {item.checked && <span className="text-white text-xs">✓</span>}
              </div>
              <span className={`text-sm ${item.checked ? 'text-green-400' : 'text-gray-300'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all"
              style={{ width: `${(checkedCount / checklist.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-400">{Math.round((checkedCount / checklist.length) * 100)}%</span>
        </div>
      </div>

      {/* Phase Navigation */}
      <div className="flex flex-wrap gap-2">
        {phases.map((p, i) => (
          <button
            key={i}
            onClick={() => setPhase(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              phase === i
                ? 'bg-gray-800 text-white border border-gray-600'
                : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700'
            }`}
          >
            <span>{p.icon}</span>
            <span>{p.title}</span>
          </button>
        ))}
      </div>

      {/* Current Phase */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{phases[phase].icon}</span>
          <h3 className="text-lg font-semibold text-white">{phases[phase].title}</h3>
        </div>
        <div className="space-y-3">
          {phases[phase].commands.map((cmd, i) => {
            const cmdId = `${phase}-${i}`;
            return (
              <div key={i} className="bg-gray-950 rounded-lg border border-gray-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-800">
                  <span className="text-xs text-gray-400 font-medium">{cmd.label}</span>
                  <button
                    onClick={() => copyToClipboard(cmd.cmd, cmdId)}
                    className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
                  >
                    {copiedCmd === cmdId ? '✓ Copiado' : '📋 Copiar'}
                  </button>
                </div>
                <pre className="px-4 py-3 text-xs text-cyan-300 font-mono overflow-x-auto whitespace-pre-wrap">
                  {cmd.cmd}
                </pre>
              </div>
            );
          })}
        </div>
      </div>

      {/* Endpoints Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>🌐</span> Endpoints a Verificar (15)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-3 text-xs text-gray-400 uppercase">Método</th>
                <th className="text-left py-2 px-3 text-xs text-gray-400 uppercase">Ruta</th>
                <th className="text-left py-2 px-3 text-xs text-gray-400 uppercase">Descripción</th>
                <th className="text-left py-2 px-3 text-xs text-gray-400 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((ep, i) => (
                <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 text-xs rounded font-mono ${
                      ep.method === 'GET'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {ep.method}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs text-cyan-300">{ep.path}</td>
                  <td className="py-2 px-3 text-xs text-gray-400">{ep.desc}</td>
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 text-xs bg-gray-700 text-gray-400 rounded">
                      Pendiente
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Deploy */}
      <div className="bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl border border-cyan-500/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <span>⚡</span> Despliegue Rápido (4 comandos)
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Si ya tienes prerrequisitos, ejecuta estos 4 comandos en orden:
        </p>
        <div className="space-y-2">
          {[
            { step: 1, label: 'Crear estructura', cmd: 'mkdir -p api && ls api/index.py requirements.txt vercel.json' },
            { step: 2, label: 'Git + GitHub', cmd: 'git init && git branch -M main && git add . && git commit -m "EDPB Backend v5.1" && gh repo create edpb-backend --public --source=. --push' },
            { step: 3, label: 'Deploy Vercel', cmd: 'vercel link --yes && vercel --prod --yes' },
            { step: 4, label: 'Verificar', cmd: 'curl $(vercel ls --prod | grep -oE \'https://[a-zA-Z0-9.-]+\\.vercel\\.app\' | head -1)/api/status' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3 bg-gray-900/50 rounded-lg p-3 border border-gray-800">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {item.step}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                <code className="text-xs text-cyan-300 font-mono break-all">{item.cmd}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Report Template */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>📊</span> Plantilla de Reporte Final
        </h3>
        <pre className="text-xs text-gray-300 font-mono bg-gray-950 rounded-lg p-4 overflow-x-auto">
{`╔══════════════════════════════════════════════════════════════╗
║  EDPB-BACKEND v5.1 — DESPLIEGUE COMPLETO                     ║
║  Ejecutado: [ISO 8601]                                       ║
║  Estado: FUNCIONANDO                                         ║
╚══════════════════════════════════════════════════════════════╝

GitHub: https://github.com/{USER}/edpb-backend
Vercel: https://{PROJECT}.vercel.app

Endpoints verificados: 15/15
- GET  /api/status          -> HTTP 200
- GET  /api/version         -> HTTP 200
- GET  /api/health          -> HTTP 200
- GET  /api/log             -> HTTP 200
- GET  /api/components      -> HTTP 200
- GET  /api/actions         -> HTTP 200
- GET  /api/factories       -> HTTP 200
- GET  /api/ai_act_articles -> HTTP 200
- GET  /api/ai_act_mapping  -> HTTP 200
- GET  /api/evidence        -> HTTP 200
- GET  /api/subagent        -> HTTP 200
- GET  /api/scan            -> HTTP 200
- POST /api                 -> HTTP 200
- POST /api/test            -> HTTP 200
- POST /api/action          -> HTTP 200

Componentes: 31
Artículos AI Act: 58
Estado: OPERATIVO EN LA NUBE`}
        </pre>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Componentes', value: '31', color: 'cyan' },
          { label: 'Artículos AI Act', value: '58', color: 'purple' },
          { label: 'Endpoints', value: '15', color: 'green' },
          { label: 'Regiones', value: '2', color: 'amber' },
          { label: 'Coste', value: 'FREE', color: 'blue' },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
            <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* APIs Gratuitas */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>🔑</span> 9 APIs Gratuitas Integradas
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Todas con capa gratuita, sin tarjeta de crédito, y listas para producción.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: 'Google AI Studio', model: 'gemini-3-flash', limit: '15 RPM / 1500 RPD', env: 'GEMINI_API_KEY', color: 'blue' },
            { name: 'OpenRouter', model: 'qwen3, llama-4', limit: '20 RPM / 50 RPD', env: 'OPENROUTER_API_KEY', color: 'purple' },
            { name: 'Groq', model: 'llama-3.3-70b', limit: '30 RPM / 14400 RPD', env: 'GROQ_API_KEY', color: 'orange' },
            { name: 'Alibaba Bailian', model: 'Qwen3, DeepSeek', limit: '70M tokens', env: 'ALIBABA_BAILIAN_API_KEY', color: 'red' },
            { name: 'NVIDIA NIM', model: 'GLM-5.2, Llama-4', limit: '40 RPM / 1000 RPD', env: 'NVIDIA_API_KEY', color: 'green' },
            { name: 'Mistral', model: 'mistral-small', limit: '1B tokens/mes', env: 'MISTRAL_API_KEY', color: 'amber' },
            { name: 'DeepSeek', model: 'deepseek-v3.2', limit: '60 RPM', env: 'DEEPSEEK_API_KEY', color: 'cyan' },
            { name: 'Cerebras', model: 'llama-3.1-8b', limit: '30 RPM / 14400 RPD', env: 'CEREBRAS_API_KEY', color: 'indigo' },
            { name: 'Vercel Postgres', model: 'pgvector', limit: '256 MB free', env: 'DATABASE_URL', color: 'emerald' },
          ].map((api) => (
            <div key={api.name} className="bg-gray-800/50 rounded-lg border border-gray-700 p-3 hover:border-gray-600 transition-all">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">{api.name}</h4>
                <span className={`text-xs px-1.5 py-0.5 rounded bg-${api.color}-500/20 text-${api.color}-400`}>
                  FREE
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-1">Modelo: <span className="text-gray-300 font-mono">{api.model}</span></p>
              <p className="text-xs text-gray-400 mb-1">Límite: <span className="text-gray-300">{api.limit}</span></p>
              <p className="text-xs text-gray-500 font-mono truncate">{api.env}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700">
          <p className="text-xs text-gray-400">
            <span className="text-cyan-400 font-semibold">Configurar en Vercel:</span>{' '}
            <code className="text-cyan-300 font-mono">vercel env add [VARIABLE_NAME]</code>
          </p>
        </div>
      </div>

      {/* Habilidades y Complementos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>🎯</span> 6 Habilidades del Arquitecto
          </h3>
          <div className="space-y-3">
            {[
              { num: 1, name: 'Detección de Errores', desc: 'SyntaxError, ImportError, TypeError, config' },
              { num: 2, name: 'Corrección Automática', desc: 'Fixes Python, ESLint, TypeScript, .env' },
              { num: 3, name: 'Verificación con curl', desc: 'HTTP status, latencias, resultados reales' },
              { num: 4, name: 'Gestión de Git', desc: 'init, commit, push, tags, releases, CI/CD' },
              { num: 5, name: 'Gestión de Vercel', desc: 'link, deploy, env vars, URL, verificación' },
              { num: 6, name: 'Reporte Trazable', desc: 'JSON, 100 tests, success_rate, SHA-256' },
            ].map((skill) => (
              <div key={skill.num} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {skill.num}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{skill.name}</p>
                  <p className="text-xs text-gray-400">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>🧩</span> 3 Complementos
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <h4 className="text-sm font-semibold text-purple-400 mb-1">Complemento 1 — EU AI Icons</h4>
              <p className="text-xs text-gray-400">SVG y PNG oficiales de la Comisión Europea</p>
              <p className="text-xs text-gray-500 mt-1 font-mono">assets/eu-ai-icons/</p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <h4 className="text-sm font-semibold text-amber-400 mb-1">Complemento 2 — 100 Pruebas</h4>
              <p className="text-xs text-gray-400">8 batches: conectividad, evidencias, subagentes, ciberseguridad, LLM, gigafactorías, logs, completos</p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <h4 className="text-sm font-semibold text-green-400 mb-1">Complemento 3 — Monitoreo</h4>
              <p className="text-xs text-gray-400">UptimeRobot (2 monitores), Vercel Analytics, Vercel Logs (30 días)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
