import React from 'react';
import { Radio, ChevronLeft, ArrowRight } from 'lucide-react';
import { NEWS_CARDS } from '../../data/dispatches';
import { IntelligenceDispatch } from '../../types/domain';

interface LeftDispatchesPanelProps {
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  hoveredNodeId: string | null;
  onHoverNode: (nodeId: string | null) => void;
  searchQuery: string;
  stakeholderFilter: string;
  onStakeholderFilterChange: (st: string) => void;
  topicFilter: string;
  onTopicFilterChange: (tp: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onResetFilters: () => void;
  opacity: number;
  translateXPercent: number;
  pointerEvents: boolean;
}

export const LeftDispatchesPanel: React.FC<LeftDispatchesPanelProps> = ({
  selectedNodeId,
  onSelectNode,
  onHoverNode,
  searchQuery,
  stakeholderFilter,
  onStakeholderFilterChange,
  topicFilter,
  onTopicFilterChange,
  isCollapsed,
  onToggleCollapse,
  onResetFilters,
  opacity,
  translateXPercent,
  pointerEvents,
}) => {
  const query = searchQuery.trim().toLowerCase();

  const filteredCards = NEWS_CARDS.filter((card) => {
    const matchesNode =
      selectedNodeId === 'ALL' ||
      card.nodeId === selectedNodeId ||
      (card.secondaryNodes && card.secondaryNodes.includes(selectedNodeId));

    const matchesStakeholder =
      stakeholderFilter === 'ALL' || card.stakeholder === stakeholderFilter;

    const matchesTopic = topicFilter === 'ALL' || card.topic === topicFilter;

    const matchesSearch =
      !query ||
      card.headline.toLowerCase().includes(query) ||
      card.summary.toLowerCase().includes(query) ||
      card.quote.toLowerCase().includes(query) ||
      card.source.toLowerCase().includes(query) ||
      card.nodeLabel.toLowerCase().includes(query) ||
      card.speaker.toLowerCase().includes(query);

    return matchesNode && matchesStakeholder && matchesTopic && matchesSearch;
  });

  const getStakeholderStyles = (stakeholder: string) => {
    if (stakeholder === 'Think Tank / Academic') {
      return {
        pill: 'bg-siliconAmber-500/15 text-siliconAmber-400 border-siliconAmber-500/30',
        quoteBorder: 'border-siliconAmber-400',
      };
    }
    if (stakeholder === 'Civil Society / Local') {
      return {
        pill: 'bg-hazardRose-500/15 text-hazardRose-400 border-hazardRose-500/30',
        quoteBorder: 'border-hazardRose-400',
      };
    }
    return {
      pill: 'bg-saharaTerracotta-500/15 text-sandOchre-200 border-saharaTerracotta-500/35',
      quoteBorder: 'border-saharaTerracotta-500',
    };
  };

  return (
    <aside
      id="leftGlassPanel"
      className="hidden lg:flex absolute top-[112px] lg:top-[70px] bottom-3 left-3 right-3 sm:left-4 lg:right-auto lg:w-[310px] xl:w-[325px] z-20 glass-panel rounded-2xl flex-col overflow-hidden transition-none"
      style={{
        transform: `translate3d(${isCollapsed ? -115 : translateXPercent}%, 0, 0)`,
        opacity: isCollapsed ? 0 : opacity,
        pointerEvents: !isCollapsed && pointerEvents ? 'auto' : 'none',
      }}
    >
      {/* Panel Header */}
      <div className="p-3 border-b border-saharaTerracotta-500/20 bg-surfaceObsidian/85 space-y-2.5 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-saharaTerracotta-400"></span>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-sandOchre-100 flex items-center gap-1">
              <Radio className="w-3 h-3 text-saharaTerracotta-400" />
              Intelligence Dispatches
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              id="newsCountIndicator"
              className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-saharaTerracotta-500/15 text-sandOchre-200 border border-saharaTerracotta-500/35"
            >
              {filteredCards.length}
            </span>
            <button
              className="hidden lg:flex w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white items-center justify-center border border-white/10 transition"
              onClick={onToggleCollapse}
              title="Minimize Dispatches Panel"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Stakeholder Filter Pills */}
        <div className="flex flex-wrap gap-1" id="stakeholderPillsContainer">
          {[
            { id: 'ALL', label: 'All' },
            { id: 'State / Official', label: 'State' },
            { id: 'Think Tank / Academic', label: 'Think Tank' },
            { id: 'Civil Society / Local', label: 'Civil Society' },
          ].map((item) => {
            const isActive = stakeholderFilter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onStakeholderFilterChange(item.id)}
                className={`stakeholder-pill px-2 py-0.5 rounded-md text-[9px] font-mono transition font-semibold ${
                  isActive
                    ? 'bg-saharaTerracotta-500/25 text-sandOchre-200 border border-saharaTerracotta-500/50'
                    : 'bg-stone-800/40 text-stone-400 border border-stone-700/60 hover:text-stone-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Vector Select */}
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400 shrink-0">
            Vector:
          </span>
          <select
            id="topicFilterSelect"
            value={topicFilter}
            onChange={(e) => onTopicFilterChange(e.target.value)}
            className="flex-1 bg-surfaceObsidian border border-saharaTerracotta-500/25 rounded-lg px-2 py-1 text-[11px] font-mono text-stone-200 focus:outline-none focus:border-saharaTerracotta-400/80 truncate"
          >
            <option value="ALL">All Vectors</option>
            <option value="Semiconductors & AI">Semiconductors, Wafer Lab & AI</option>
            <option value="Sovereignty & Legal">Sovereignty & RA 12252 Legal</option>
            <option value="Minerals & Power">Critical Minerals & Power Grid</option>
            <option value="Land & Community">Watershed & Ancestral Domain</option>
          </select>
        </div>
      </div>

      {/* Scrollable Feed */}
      <div className="flex-1 overflow-y-auto glass-scroll p-2.5 space-y-2.5" id="newsFeedContainer">
        {filteredCards.length === 0 ? (
          <div className="intel-card rounded-xl p-4 text-center space-y-2">
            <div className="font-mono text-[10px] text-stone-400">NO DISPATCHES MATCH FILTER</div>
            <p className="text-[11px] text-stone-400">Reset scope or search parameters.</p>
            <button
              onClick={onResetFilters}
              className="mt-1 px-3 py-1 rounded-lg bg-saharaTerracotta-500/20 text-sandOchre-200 border border-saharaTerracotta-500/40 font-mono text-[10px] hover:bg-saharaTerracotta-500/30 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredCards.map((card: IntelligenceDispatch) => {
            const { pill, quoteBorder } = getStakeholderStyles(card.stakeholder);
            const isNodeActive = selectedNodeId === card.nodeId;

            return (
              <article
                key={card.id}
                onMouseEnter={() => onHoverNode(card.nodeId)}
                onMouseLeave={() => onHoverNode(null)}
                onClick={() => onSelectNode(card.nodeId)}
                className={`intel-card cursor-pointer rounded-xl p-3 space-y-2 ${
                  isNodeActive
                    ? 'ring-1 ring-saharaTerracotta-400/60 border-saharaTerracotta-400/50'
                    : ''
                }`}
              >
                {/* Top Row */}
                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-stone-800 text-sandOchre-100 border border-stone-700/60">
                      {card.source}
                    </span>
                    <span className="font-mono text-[9px] text-stone-400">{card.date}</span>
                  </div>

                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-saharaTerracotta-500/10 text-sandOchre-300 border border-saharaTerracotta-500/30 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-saharaTerracotta-400"></span>
                    {card.nodeLabel}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-1 flex-wrap">
                  <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${pill} font-semibold`}>
                    {card.stakeholder}
                  </span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-surfaceObsidian text-stone-300 border border-saharaTerracotta-500/20 truncate max-w-[170px]">
                    {card.topic}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xs font-semibold text-white leading-snug">{card.headline}</h3>

                {/* Summary */}
                <p className="text-[11px] text-stone-300 leading-relaxed font-normal">
                  {card.summary}
                </p>

                {/* Verbatim Soundbite with Editorial Serif Polish */}
                <blockquote
                  className={`bg-surfaceObsidian/95 border-l-2 ${quoteBorder} rounded-r-lg p-2.5 space-y-1 shadow-sm`}
                >
                  <p className="font-display italic text-[12px] text-sandOchre-100 leading-snug">
                    {card.quote}
                  </p>
                  <footer className="font-mono text-[9px] text-stone-400 font-medium">
                    — {card.speaker}
                  </footer>
                </blockquote>

                {/* Footer Action */}
                <div className="pt-0.5 flex items-center justify-between text-[9px] font-mono text-stone-400">
                  <span className="text-saharaTerracotta-400 flex items-center gap-1">
                    <span>Focus Map</span>
                    <ArrowRight className="w-2.5 h-2.5 text-saharaTerracotta-400" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectNode(card.nodeId);
                    }}
                    className="px-1.5 py-0.5 rounded bg-stone-800/40 hover:bg-stone-800/80 text-stone-200 border border-stone-700/60 transition"
                  >
                    Isolate
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default LeftDispatchesPanel;
