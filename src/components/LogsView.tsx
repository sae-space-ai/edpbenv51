import { LogEntry } from '../types';

interface Props {
  logs: LogEntry[];
}

export default function LogsView({ logs }: Props) {
  const statusColors: Record<string, string> = {
    success: 'text-green-400 bg-green-500/10',
    error: 'text-red-400 bg-red-500/10',
    dispatched: 'text-cyan-400 bg-cyan-500/10',
    blocked: 'text-amber-400 bg-amber-500/10',
  };

  const componentColors: Record<string, string> = {
    subagent: 'border-l-cyan-500',
    evidence_engine: 'border-l-purple-500',
    cybersecurity: 'border-l-red-500',
    generative_ai: 'border-l-indigo-500',
    orchestrator: 'border-l-amber-500',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📋</span> Execution Log
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {logs.length} entries — Real-time execution trace of all ecosystem actions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs text-gray-400">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-xl font-bold text-white">{logs.length}</p>
          <p className="text-xs text-gray-400 mt-1">Total Entries</p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-xl font-bold text-green-400">
            {logs.filter(l => l.status === 'success').length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Successful</p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-xl font-bold text-red-400">
            {logs.filter(l => l.status === 'error').length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Errors</p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-xl font-bold text-cyan-400">
            {new Set(logs.map(l => l.component)).size}
          </p>
          <p className="text-xs text-gray-400 mt-1">Components</p>
        </div>
      </div>

      {/* Log Entries */}
      {logs.length > 0 ? (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-800 text-xs text-gray-400 font-medium uppercase tracking-wider">
            <div className="col-span-1">ID</div>
            <div className="col-span-2">Component</div>
            <div className="col-span-2">Action</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-3">Detail</div>
            <div className="col-span-2">Timestamp</div>
            <div className="col-span-1">Hash</div>
          </div>

          {/* Log Rows */}
          <div className="divide-y divide-gray-800/50 max-h-[600px] overflow-y-auto">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`grid grid-cols-12 gap-2 px-4 py-3 text-xs hover:bg-gray-800/30 transition-colors border-l-2 ${
                  componentColors[log.component] || 'border-l-gray-600'
                }`}
              >
                <div className="col-span-1 font-mono text-gray-500 truncate">{log.id}</div>
                <div className="col-span-2 font-mono text-gray-300 truncate">{log.component}</div>
                <div className="col-span-2 text-gray-300 truncate">{log.action}</div>
                <div className="col-span-1">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    statusColors[log.status] || 'text-gray-400 bg-gray-500/10'
                  }`}>
                    {log.status}
                  </span>
                </div>
                <div className="col-span-3 text-gray-400 truncate">{log.detail}</div>
                <div className="col-span-2 font-mono text-gray-500 truncate">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </div>
                <div className="col-span-1 font-mono text-gray-600 truncate" title={log.hash}>
                  {log.hash.slice(0, 8)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-12 text-center">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-gray-400">No log entries yet.</p>
          <p className="text-sm text-gray-500 mt-1">Execute some actions to generate log entries.</p>
        </div>
      )}

      {/* Raw JSON View */}
      {logs.length > 0 && (
        <details className="bg-gray-900 rounded-xl border border-gray-800">
          <summary className="px-6 py-4 cursor-pointer text-sm text-gray-400 hover:text-gray-200 transition-colors">
            View Raw JSON ({logs.length} entries)
          </summary>
          <div className="px-6 pb-4">
            <pre className="text-xs text-gray-300 font-mono bg-gray-950 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
              {JSON.stringify(logs, null, 2)}
            </pre>
          </div>
        </details>
      )}
    </div>
  );
}
