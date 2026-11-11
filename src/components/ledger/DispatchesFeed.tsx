import React, { useState } from 'react';
import { Search, Share2, CheckCircle2, Tag, Calendar, ExternalLink } from 'lucide-react';
import { NEWS_CARDS } from '../../data/dispatches';
import { IntelligenceDispatch } from '../../types/domain';
import ShareableCardModal from '../ui/ShareableCardModal';

export const DispatchesFeed: React.FC = () => {
  const [selectedStakeholder, setSelectedStakeholder] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeShareDispatch, setActiveShareDispatch] = useState<IntelligenceDispatch | null>(null);

  const stakeholders = ['All', 'State / Official', 'Industry', 'Allied Governments'];

  const filteredDispatches = NEWS_CARDS.filter((card) => {
    const matchesStakeholder =
      selectedStakeholder === 'All' || card.stakeholder === selectedStakeholder;
    const matchesSearch =
      searchQuery.trim() === '' ||
      card.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStakeholder && matchesSearch;
  });

  return (
    <div>
      {/* Controls: Search & Stakeholder Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dispatches by keyword, topic, or node..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sandMuted/70 dark:border-stone-800 bg-sandSurface/80 dark:bg-panelDark text-stone-900 dark:text-stone-100 placeholder-stone-400 text-xs focus:outline-none focus:border-saharaTerracotta-500 shadow-sm transition-colors"
          />
        </div>

        {/* Stakeholder Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {stakeholders.map((sh) => {
            const isSelected = selectedStakeholder === sh;
            return (
              <button
                key={sh}
                onClick={() => setSelectedStakeholder(sh)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  isSelected
                    ? 'bg-saharaTerracotta-500 text-white border-saharaTerracotta-600 shadow-sahara-soft'
                    : 'bg-sandSurface/70 dark:bg-panelDark/70 text-stone-700 dark:text-stone-300 border-sandMuted/60 dark:border-stone-800 hover:border-saharaTerracotta-400'
                }`}
              >
                {sh}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dispatches List */}
      {filteredDispatches.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-sandSurface/40 dark:bg-panelDark/40 border border-sandMuted/40 dark:border-stone-800">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            No intelligence dispatches match your filter or search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDispatches.map((card) => (
            <div
              key={card.id}
              className="p-6 rounded-2xl bg-sandSurface/70 dark:bg-panelDark/70 border border-sandMuted/50 dark:border-stone-800 shadow-sahara-soft flex flex-col justify-between hover:border-saharaTerracotta-400 transition-colors"
            >
              <div>
                {/* Meta Badges */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{card.date}</span>
                    <span>•</span>
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      {card.source}
                    </span>
                  </div>
                  {card.verifiedOfficial && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Official</span>
                    </span>
                  )}
                </div>

                {/* Headline */}
                <h3 className="font-serif text-xl font-normal text-stone-900 dark:text-stone-100 leading-snug mb-3">
                  {card.headline}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                  {card.summary}
                </p>
              </div>

              {/* Card Footer: Tags & Share Button */}
              <div className="pt-4 border-t border-sandMuted/40 dark:border-stone-800/80 flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-600 dark:text-stone-400 bg-sandLinen dark:bg-deepNavy px-2 py-0.5 rounded border border-sandMuted/50 dark:border-stone-800">
                    <Tag className="w-3 h-3 text-saharaTerracotta-500" />
                    <span>{card.nodeLabel}</span>
                  </span>
                  <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                    {card.topic}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {card.citationUrl && (
                    <a
                      href={card.citationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-sandMuted/50 dark:border-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                      title="Open citation source"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveShareDispatch(card)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-sandMuted/60 dark:border-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 hover:border-saharaTerracotta-400 hover:text-saharaTerracotta-600 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Fact</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share Modal */}
      <ShareableCardModal
        dispatch={activeShareDispatch}
        isOpen={activeShareDispatch !== null}
        onClose={() => setActiveShareDispatch(null)}
      />
    </div>
  );
};

export default DispatchesFeed;
