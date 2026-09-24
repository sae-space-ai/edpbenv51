import { EcosystemStatus } from '../types';

interface Props {
  status: EcosystemStatus;
  onHealthCheck: () => Promise<any>;
  actionResult: any;
}

export default function Dashboard({ status, onHealthCheck, actionResult }: Props) {
  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  };

  const avgLatency = status.telemetry.latency_history.length > 0
    ? (status.telemetry.latency_history.reduce((a, b) => a + b, 0) / status.telemetry.latency_history.length).toFixed(1)
    : '0';

  const componentCategories = [
    { key: 'generative_ai', label: 'Generative AI', icon: '🧠', color: 'from-purple-500 to-indigo-600' },
    { key: 'cybersecurity', label: 'Cybersecurity', icon: '🛡️', color: 'from-red-500 to-orange-600' },
    { key: 'databases', label: 'Databases', icon: '🗄️', color: 'from-green-500 to-emerald-600' },
    { key: 'subagents', label: 'Sub-Agents', icon: '🤖', color: 'from-cyan-500 to-blue-600' },
    { key: 'gigafactories', label: 'Gigafactories', icon: '🏭', color: 'from-amber-500 to-yellow-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Components"
          value={status.components_total.toString()}
          sublabel="across 5 categories"
          icon="⚙️"
          color="cyan"
        />
        <StatCard
          label="AI Act Articles"
          value={status.ai_act_articles_mapped.toString()}
          sublabel="fully mapped"
          icon="📜"
          color="purple"
        />
        <StatCard
          label="Uptime"
          value={formatUptime(status.uptime_seconds)}
          sublabel={`Engine: ${status.engine.running ? 'Running' : 'Stopped'} (${status.engine.cycles} cycles)`}
          icon="⏱️"
          color="green"
        />
        <StatCard
          label="Avg Latency"
          value={`${avgLatency}ms`}
          sublabel={`${status.telemetry.requests_total} total requests`}
          icon="⚡"
          color="amber"
        />
      </div>

      {/* Component Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {componentCategories.map((cat) => (
          <div key={cat.key} className="bg-gray-900 rounded-xl border border-gray-800 p-4 hover:border-gray-700 transition-all">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl mb-3`}>
              {cat.icon}
            </div>
            <h3 className="text-sm font-medium text-gray-300">{cat.label}</h3>
            <p className="text-2xl font-bold text-white mt-1">{status.components[cat.key] || 0}</p>
          </div>
        ))}
      </div>

      {/* Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Telemetry Metrics */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>📈</span> Telemetry
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <TelemetryItem label="Requests Total" value={status.telemetry.requests_total} />
            <TelemetryItem label="Success" value={status.telemetry.requests_success} color="green" />
            <TelemetryItem label="Errors" value={status.telemetry.requests_error} color="red" />
            <TelemetryItem label="Evidence Generated" value={status.telemetry.evidence_generated} />
            <TelemetryItem label="Subagents Dispatched" value={status.telemetry.subagents_dispatched} />
            <TelemetryItem label="Scans Simulated" value={status.telemetry.scans_simulated} />
            <TelemetryItem label="Gigafactory Queries" value={status.telemetry.gigafactory_queries} />
            <TelemetryItem label="Auto Repairs" value={status.telemetry.auto_repairs} color="amber" />
          </div>
        </div>

        {/* System Info */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>🖥️</span> System Info
          </h2>
          <div className="space-y-3">
            <InfoRow label="Ecosystem" value={status.ecosystem} />
            <InfoRow label="Version" value={status.version} />
            <InfoRow label="Instance ID" value={status.instance_id} mono />
            <InfoRow label="Candidate" value={status.candidate} />
            <InfoRow label="Candidate ID" value={status.candidate_id} />
            <InfoRow label="Mode" value={status.mode} />
            <InfoRow label="Region" value={status.region} />
            <InfoRow label="Git Commit" value={status.git_commit} mono />
            <InfoRow label="Git Branch" value={status.git_branch} />
            <InfoRow label="Deployment" value={status.deployment_url} mono />
          </div>
        </div>
      </div>

      {/* Latency Chart (simple bar visualization) */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>📉</span> Latency History (last {status.telemetry.latency_history.length} requests)
        </h2>
        {status.telemetry.latency_history.length > 0 ? (
          <div className="flex items-end gap-1 h-24">
            {status.telemetry.latency_history.slice(-30).map((latency, i) => {
              const maxLatency = Math.max(...status.telemetry.latency_history.slice(-30));
              const height = maxLatency > 0 ? (latency / maxLatency) * 100 : 0;
              return (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t opacity-80 hover:opacity-100 transition-opacity min-w-[2px]"
                  style={{ height: `${Math.max(height, 4)}%` }}
                  title={`${latency}ms`}
                ></div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No latency data yet. Perform some actions to generate data.</p>
        )}
      </div>

      {/* Health Check & Action Result */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={onHealthCheck}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <span>🏥</span> Run Health Check
        </button>
        {actionResult && (
          <div className="flex-1 bg-gray-900 rounded-lg border border-gray-800 p-3 overflow-x-auto">
            <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">
              {JSON.stringify(actionResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, sublabel, icon, color }: { label: string; value: string; sublabel: string; icon: string; color: string }) {
  const colorClasses: Record<string, string> = {
    cyan: 'border-cyan-500/30 bg-cyan-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
    green: 'border-green-500/30 bg-green-500/5',
    amber: 'border-amber-500/30 bg-amber-500/5',
  };
  return (
    <div className={`rounded-xl border p-5 ${colorClasses[color] || colorClasses.cyan}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{sublabel}</p>
    </div>
  );
}

function TelemetryItem({ label, value, color }: { label: string; value: number; color?: string }) {
  const textColor = color === 'green' ? 'text-green-400' : color === 'red' ? 'text-red-400' : color === 'amber' ? 'text-amber-400' : 'text-white';
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-xs text-gray-400">{label}</span>
      <span className={`text-sm font-mono font-bold ${textColor}`}>{value.toLocaleString()}</span>
    </div>
  );
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-gray-800/50">
      <span className="text-xs text-gray-400">{label}</span>
      <span className={`text-xs text-gray-200 ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
}
