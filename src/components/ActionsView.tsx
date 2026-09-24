import { useState } from 'react';

interface Props {
  onAction: (action: string, data?: Record<string, any>) => Promise<any>;
  actionResult: any;
}

const ACTIONS = [
  {
    category: 'Sub-Agents',
    icon: '🤖',
    actions: [
      { id: 'dispatch_subagent', label: 'Dispatch Sub-Agent', fields: [
        { name: 'agent_name', label: 'Agent', type: 'select', options: ['ai_governance', 'ai_act_compliance', 'risk_assessment', 'regulatory_monitor', 'privacy_tech', 'cloud_security', 'training_designer', 'evidence_engine'] },
        { name: 'task', label: 'Task', type: 'text', placeholder: 'Describe the task...' },
      ]},
    ],
  },
  {
    category: 'Evidence Engine',
    icon: '📝',
    actions: [
      { id: 'generate_evidence', label: 'Generate Evidence', fields: [
        { name: 'article', label: 'AI Act Article', type: 'select', options: ['Art. 5', 'Art. 6', 'Art. 9', 'Art. 10', 'Art. 13', 'Art. 14', 'Art. 15', 'Art. 27', 'Art. 44', 'Art. 45', 'Art. 46', 'Art. 55', 'Art. 56', 'Art. 58', 'Art. 61', 'Art. 62'] },
      ]},
    ],
  },
  {
    category: 'Cybersecurity',
    icon: '🛡️',
    actions: [
      { id: 'cybersecurity_scan', label: 'Run Security Scan', fields: [
        { name: 'target', label: 'Target', type: 'text', placeholder: 'self-test.local' },
        { name: 'tool', label: 'Tool', type: 'select', options: ['strix', 'nuclei', 'pentestgpt', 'pentagi', 'hexstrike_ai', 'faraday', 'metasploit', 'recon_ng'] },
        { name: 'authorized', label: 'Authorized', type: 'checkbox' },
      ]},
    ],
  },
  {
    category: 'Generative AI',
    icon: '🧠',
    actions: [
      { id: 'generate_llm', label: 'Generate with LLM', fields: [
        { name: 'model', label: 'Model', type: 'select', options: ['qwen3', 'deepseek_v4', 'glm_52', 'gemma_4', 'phi_4_mini', 'llama_4_scout', 'kimi_k3'] },
        { name: 'prompt', label: 'Prompt', type: 'textarea', placeholder: 'Enter your prompt...' },
      ]},
    ],
  },
  {
    category: 'Gigafactories',
    icon: '🏭',
    actions: [
      { id: 'discover_gigafactories', label: 'Discover Factories', fields: [
        { name: 'factory_key', label: 'Factory (optional)', type: 'select', options: ['', 'nexus_agi', 'ai_agent_marketplace', 'peli_agent_factory', 'beacon_mcp', 'a2astore'] },
      ]},
    ],
  },
  {
    category: 'System',
    icon: '⚙️',
    actions: [
      { id: 'health_check', label: 'Health Check', fields: [] },
      { id: 'run_full_ecosystem_test', label: 'Full Ecosystem Test', fields: [] },
    ],
  },
];

export default function ActionsView({ onAction, actionResult }: Props) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const currentActionConfig = ACTIONS.flatMap(c => c.actions).find(a => a.id === selectedAction);

  const handleExecute = async () => {
    if (!selectedAction) return;
    setExecuting(true);
    try {
      const res = await onAction(selectedAction, formData);
      setResult(res);
    } catch (err) {
      setResult({ status: 'error', message: String(err) });
    } finally {
      setExecuting(false);
    }
  };

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>⚡</span> Ecosystem Actions
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Execute actions across the EDPB Super Ecosystem — dispatch agents, generate evidence, run scans, and more.
        </p>
      </div>

      {/* Action Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ACTIONS.map((category) => (
          <div key={category.category} className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2 mb-3">
              <span>{category.icon}</span> {category.category}
            </h3>
            <div className="space-y-2">
              {category.actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => { setSelectedAction(action.id); setFormData({}); setResult(null); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedAction === action.id
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Form */}
      {selectedAction && currentActionConfig && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            {currentActionConfig.label}
          </h3>

          {currentActionConfig.fields.length > 0 ? (
            <div className="space-y-4 mb-6">
              {currentActionConfig.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm text-gray-400 mb-1">{field.label}</label>
                  {field.type === 'select' && (
                    <select
                      value={formData[field.name] || (field.options && field.options[0]) || ''}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                    >
                      {field.options && field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt || '(all)'}</option>
                      ))}
                    </select>
                  )}
                  {field.type === 'text' && (
                    <input
                      type="text"
                      value={formData[field.name] || ''}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    />
                  )}
                  {field.type === 'textarea' && (
                    <textarea
                      value={formData[field.name] || ''}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  )}
                  {field.type === 'checkbox' && (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[field.name] || false}
                        onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className="text-sm text-gray-300">Authorized scan</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 mb-4">This action requires no parameters.</p>
          )}

          <button
            onClick={handleExecute}
            disabled={executing}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {executing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Executing...
              </>
            ) : (
              <>
                <span>▶</span> Execute Action
              </>
            )}
          </button>
        </div>
      )}

      {/* Result */}
      {(result || actionResult) && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
            <span>📤</span> Result
          </h3>
          <pre className="text-xs text-gray-300 font-mono bg-gray-950 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
            {JSON.stringify(result || actionResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
