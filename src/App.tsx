import { useState, useEffect, useCallback } from 'react';
import { TabId, EcosystemStatus, Components, LogEntry } from './types';
import { getStatus, getComponents, getLogs, getHealth, postAction, isSimulation } from './api';
import Dashboard from './components/Dashboard';
import ComponentsView from './components/ComponentsView';
import AIActView from './components/AIActView';
import ActionsView from './components/ActionsView';
import LogsView from './components/LogsView';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [status, setStatus] = useState<EcosystemStatus | null>(null);
  const [components, setComponents] = useState<Components | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [actionResult, setActionResult] = useState<any>(null);

  const fetchData = useCallback(async () => {
    try {
      const [statusData, componentsData, logsData] = await Promise.all([
        getStatus(),
        getComponents(),
        getLogs(),
      ]);
      setStatus(statusData);
      setComponents(componentsData.components);
      setLogs(logsData.log);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleAction = async (action: string, data: Record<string, any> = {}) => {
    try {
      const result = await postAction(action, data);
      setActionResult(result);
      // Refresh data after action
      await fetchData();
      return result;
    } catch (err) {
      console.error('Action failed:', err);
      return { status: 'error', message: String(err) };
    }
  };

  const handleHealthCheck = async () => {
    const result = await getHealth();
    setActionResult(result);
    await fetchData();
    return result;
  };

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'components', label: 'Components', icon: '🔧' },
    { id: 'aiact', label: 'AI Act', icon: '📜' },
    { id: 'actions', label: 'Actions', icon: '⚡' },
    { id: 'logs', label: 'Logs', icon: '📋' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 text-lg font-mono">Initializing EDPB Ecosystem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20">
                E
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">EDPB Super Ecosystem</h1>
                <p className="text-xs text-gray-400">v5.1.0 — Manuel Gago Fernández — EDPB SPE 2025-2030</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {isSimulation() && (
                <span className="px-2 py-1 text-xs bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
                  SIMULATION
                </span>
              )}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${status?.status === 'operational' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span className="text-xs text-gray-400 font-mono">
                  {status?.status?.toUpperCase() || 'UNKNOWN'}
                </span>
              </div>
              {lastRefresh && (
                <span className="text-xs text-gray-500 font-mono">
                  {lastRefresh.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && status && (
          <Dashboard status={status} onHealthCheck={handleHealthCheck} actionResult={actionResult} />
        )}
        {activeTab === 'components' && components && (
          <ComponentsView components={components} />
        )}
        {activeTab === 'aiact' && (
          <AIActView />
        )}
        {activeTab === 'actions' && (
          <ActionsView onAction={handleAction} actionResult={actionResult} />
        )}
        {activeTab === 'logs' && (
          <LogsView logs={logs} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
          <p>EDPB Super Ecosystem v5.1.0 · Candidate: Manuel Gago Fernández · EDPB SPE 2025-2030</p>
          <p className="mt-1">31 Components · 58 AI Act Articles Mapped · Continuous Mode · Auto-Repair Enabled</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
