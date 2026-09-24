import { useState } from 'react';
import { Components, ComponentInfo } from '../types';

interface Props {
  components: Components;
}

const CATEGORY_CONFIG: Record<string, { label: string; icon: string; color: string; description: string }> = {
  generative_ai: { label: 'Generative AI', icon: '🧠', color: 'purple', description: 'Large Language Models for various tasks' },
  cybersecurity: { label: 'Cybersecurity', icon: '🛡️', color: 'red', description: 'Autonomous security tools and scanners' },
  databases: { label: 'Databases', icon: '🗄️', color: 'green', description: 'Vector stores and data persistence' },
  subagents: { label: 'Sub-Agents', icon: '🤖', color: 'cyan', description: 'Specialized AI agents for governance tasks' },
  gigafactories: { label: 'Gigafactories', icon: '🏭', color: 'amber', description: 'External agent marketplaces and factories' },
};

export default function ComponentsView({ components }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('generative_ai');

  const categories = Object.keys(CATEGORY_CONFIG);
  const currentCategory = CATEGORY_CONFIG[activeCategory];
  const currentComponents = components[activeCategory as keyof Components] || {};

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const config = CATEGORY_CONFIG[cat];
          const count = Object.keys(components[cat as keyof Components] || {}).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === cat
                  ? 'bg-gray-800 text-white border border-gray-700'
                  : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700'
              }`}
            >
              <span>{config.icon}</span>
              <span>{config.label}</span>
              <span className="px-1.5 py-0.5 text-xs rounded-full bg-gray-700 text-gray-300">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Category Header */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{currentCategory.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-white">{currentCategory.label}</h2>
            <p className="text-sm text-gray-400">{currentCategory.description}</p>
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(currentComponents).map(([name, info]) => (
          <ComponentCard key={name} name={name} info={info} category={activeCategory} />
        ))}
      </div>
    </div>
  );
}

function ComponentCard({ name, info, category }: { name: string; info: ComponentInfo; category: string }) {
  const statusColors: Record<string, string> = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    armed: 'bg-red-500/20 text-red-400 border-red-500/30',
    ready: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    standby: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    reachable: 'bg-green-500/20 text-green-400 border-green-500/30',
    recovered: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
    down: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const statusColor = statusColors[info.status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors font-mono">
          {name.replace(/_/g, ' ')}
        </h3>
        <span className={`px-2 py-0.5 text-xs rounded-full border ${statusColor}`}>
          {info.status}
        </span>
      </div>

      <div className="space-y-2">
        {info.role && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-16">Role:</span>
            <span className="text-xs text-gray-300 font-mono">{info.role}</span>
          </div>
        )}
        {info.license && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-16">License:</span>
            <span className="text-xs text-gray-300">{info.license}</span>
          </div>
        )}
        {info.mode && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-16">Mode:</span>
            <span className="text-xs text-gray-300 font-mono">{info.mode}</span>
          </div>
        )}
        {info.strength && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-16">Strength:</span>
            <span className="text-xs text-gray-300">{info.strength}</span>
          </div>
        )}
        {info.provider && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-16">Provider:</span>
            <span className="text-xs text-cyan-400 font-mono">{info.provider}</span>
          </div>
        )}
        {info.agents && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-16">Agents:</span>
            <span className="text-xs text-amber-400 font-mono">{info.agents}</span>
          </div>
        )}
        {info.auth !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-16">Auth:</span>
            <span className={`text-xs font-mono ${info.auth ? 'text-amber-400' : 'text-green-400'}`}>
              {info.auth ? 'Required' : 'Open'}
            </span>
          </div>
        )}
      </div>

      {/* Category badge */}
      <div className="mt-3 pt-3 border-t border-gray-800">
        <span className="text-xs text-gray-500">
          {CATEGORY_CONFIG[category]?.icon} {CATEGORY_CONFIG[category]?.label}
        </span>
      </div>
    </div>
  );
}
