import { useState, useEffect } from 'react';
import { AIActArticle } from '../types';
import { getAIActMapping } from '../api';

export default function AIActView() {
  const [mapping, setMapping] = useState<Record<string, AIActArticle>>({});
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMapping();
  }, []);

  const loadMapping = async () => {
    setLoading(true);
    try {
      const data = await getAIActMapping();
      setMapping(data.mapping);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const articles = Object.entries(mapping);
  const filteredArticles = articles.filter(([key, article]) => {
    const q = search.toLowerCase();
    return (
      key.toLowerCase().includes(q) ||
      article.title.toLowerCase().includes(q) ||
      article.expertise.some(e => e.toLowerCase().includes(q))
    );
  });

  // Group articles by section
  const gpaiArticles = filteredArticles.filter(([key]) => {
    const num = parseInt(key.replace('Art. ', ''));
    return num >= 44 && num <= 55;
  });
  const innovationArticles = filteredArticles.filter(([key]) => {
    const num = parseInt(key.replace('Art. ', ''));
    return num >= 56 && num <= 59;
  });
  const coreArticles = filteredArticles.filter(([key]) => {
    const num = parseInt(key.replace('Art. ', ''));
    return num < 44 || num > 59;
  });

  // Collect all unique expertise areas
  const allExpertise = [...new Set(articles.flatMap(([, a]) => a.expertise))].sort();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🇪🇺</span> EU AI Act Compliance Mapping
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {articles.length} articles mapped (Art. 5-62) with expertise areas and compliance requirements
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">Total expertise areas:</span>
            <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
              {allExpertise.length}
            </span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles by number, title, or expertise area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
      </div>

      {/* Selected Article Detail */}
      {selectedArticle && mapping[selectedArticle] && (
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/30 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white">{selectedArticle}: {mapping[selectedArticle].title}</h3>
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {mapping[selectedArticle].expertise.map((exp) => (
              <span
                key={exp}
                className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-2xl font-bold text-white">{coreArticles.length}</p>
          <p className="text-xs text-gray-400 mt-1">Core Articles</p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-2xl font-bold text-purple-400">{gpaiArticles.length}</p>
          <p className="text-xs text-gray-400 mt-1">GPAI Articles</p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">{innovationArticles.length}</p>
          <p className="text-xs text-gray-400 mt-1">Innovation Articles</p>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {/* Core Articles */}
        {coreArticles.length > 0 && (
          <ArticleSection
            title="Core AI Act Provisions"
            icon="📋"
            articles={coreArticles}
            selectedArticle={selectedArticle}
            onSelect={setSelectedArticle}
            color="cyan"
          />
        )}

        {/* GPAI Articles */}
        {gpaiArticles.length > 0 && (
          <ArticleSection
            title="General-Purpose AI (GPAI)"
            icon="🤖"
            articles={gpaiArticles}
            selectedArticle={selectedArticle}
            onSelect={setSelectedArticle}
            color="purple"
          />
        )}

        {/* Innovation Articles */}
        {innovationArticles.length > 0 && (
          <ArticleSection
            title="Innovation & Testing"
            icon="🔬"
            articles={innovationArticles}
            selectedArticle={selectedArticle}
            onSelect={setSelectedArticle}
            color="amber"
          />
        )}
      </div>

      {/* Expertise Areas */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">All Expertise Areas ({allExpertise.length})</h3>
        <div className="flex flex-wrap gap-2">
          {allExpertise.map((exp) => (
            <button
              key={exp}
              onClick={() => setSearch(exp)}
              className="px-3 py-1.5 text-xs bg-gray-800 text-gray-300 rounded-lg border border-gray-700 hover:border-cyan-500 hover:text-cyan-400 transition-all"
            >
              {exp}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArticleSection({
  title,
  icon,
  articles,
  selectedArticle,
  onSelect,
  color,
}: {
  title: string;
  icon: string;
  articles: [string, AIActArticle][];
  selectedArticle: string | null;
  onSelect: (key: string) => void;
  color: string;
}) {
  const borderColor = color === 'purple' ? 'border-purple-500/30' : color === 'amber' ? 'border-amber-500/30' : 'border-cyan-500/30';
  const bgColor = color === 'purple' ? 'bg-purple-500/10' : color === 'amber' ? 'bg-amber-500/10' : 'bg-cyan-500/10';
  const textColor = color === 'purple' ? 'text-purple-400' : color === 'amber' ? 'text-amber-400' : 'text-cyan-400';

  return (
    <div>
      <h3 className={`text-sm font-semibold ${textColor} mb-3 flex items-center gap-2`}>
        <span>{icon}</span> {title} ({articles.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {articles.map(([key, article]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`text-left p-3 rounded-lg border transition-all ${
              selectedArticle === key
                ? `${bgColor} ${borderColor}`
                : 'bg-gray-900 border-gray-800 hover:border-gray-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-mono font-bold ${textColor}`}>{key}</span>
              <span className="text-xs text-gray-300 truncate">{article.title}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {article.expertise.slice(0, 3).map((exp) => (
                <span key={exp} className="px-1.5 py-0.5 text-[10px] bg-gray-800 text-gray-400 rounded">
                  {exp}
                </span>
              ))}
              {article.expertise.length > 3 && (
                <span className="px-1.5 py-0.5 text-[10px] text-gray-500">
                  +{article.expertise.length - 3}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
