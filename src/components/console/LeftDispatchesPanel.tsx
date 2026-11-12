import React from 'react';
import { Radio, ChevronLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { NEWS_CARDS } from '../../data/dispatches';
import { IntelligenceDispatch } from '../../types/domain';

export interface LeftDispatchesPanelProps {
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
        pill: 'bg-sky-500/15 text-sky-200 border-sky-400/35',
        quoteBorder: 'border-sky-400',
      };
    }
    if (stakeholder === 'Civil Society / Local') {
      return {
        pill: 'bg-rose-500/15 text-rose-200 border-rose-400/35',
        quoteBorder: 'border-rose-400',
      };
    }
    return {
      pill: 'bg-blue-500/20 text-white border-blue-400/40',
      quoteBorder: 'border-blue-400',
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
      <div className="p-3 border-b border-white/12 bg-white/[0.06] space-y-2.5 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-blue-400" />
              Intelligence Dispatches
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span
              id="newsCountIndicator"
              className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-600/25 text-white border border-blue-400/40"
            >
              {filteredCards.length}
            </span>
            <button
              className="hidden lg:flex w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white items-center justify-center border border-white/10 transition cursor-pointer"
              onClick={onToggleCollapse}
              title="Minimize Dispatches Panel"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Stakeholder Filter Pills */}
        <div className="flex flex-wrap gap-2" id="stakeholderPillsContainer">
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
                className={`stakeholder-pill px-2 py-0.5 rounded-md text-[9px] font-mono transition font-semibold cursor-pointer ${
                  isActive
                    ? 'bg-blue-600/35 text-white border border-blue-400/70 shadow-sm'
                    : 'bg-white/[0.05] text-slate-300 border border-white/10 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Vector Select */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono uppercase tracking-wider text-slate-300 shrink-0">
            Vector:
          </span>
          <select
            id="topicFilterSelect"
            value={topicFilter}
            onChange={(e) => onTopicFilterChange(e.target.value)}
            className="flex-1 bg-white/[0.06] border border-white/15 rounded-lg px-2 py-1 text-[11px] font-mono text-white focus:outline-none focus:border-blue-400/80 truncate cursor-pointer"
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
      <div className="flex-1 overflow-y-auto glass-scroll p-2 space-y-2" id="newsFeedContainer">
        {filteredCards.length === 0 ? (
          <div className="intel-card rounded-xl p-4 text-center space-y-2">
            <div className="font-mono text-[10px] text-slate-300">NO DISPATCHES MATCH FILTER</div>
            <p className="text-[11px] text-slate-300">Reset scope or search parameters.</p>
            <button
              onClick={onResetFilters}
              className="mt-1 px-3 py-1 rounded-lg bg-blue-600/20 text-white border border-blue-400/40 font-mono text-[10px] hover:bg-blue-600/30 transition cursor-pointer"
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
                className={`intel-card cursor-pointer rounded-xl p-2.5 space-y-2 ${
                  isNodeActive
                    ? 'ring-1 ring-blue-400/80 border-blue-400/70 shadow-glow-blue'
                    : ''
                }`}
              >
                {/* Top Row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white border border-white/12">
                      {card.source}
                    </span>
                    <span className="font-mono text-[9px] text-slate-300">{card.date}</span>
                  </div>

                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-sky-200 border border-blue-400/30 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    {card.nodeLabel}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${pill} font-semibold`}>
                    {card.stakeholder}
                  </span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10 truncate max-w-[170px]">
                    {card.topic}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xs font-semibold text-white leading-snug">{card.headline}</h3>

                {/* Summary */}
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  {card.summary}
                </p>

                {/* Verbatim Soundbite with High-Contrast Polish */}
                <blockquote
                  className={`bg-white/[0.06] border-l-2 ${quoteBorder} rounded-r-lg p-2 space-y-1 shadow-sm`}
                >
                  <p className="font-sans text-[12px] text-slate-100 leading-snug font-medium">
                    “{card.quote}”
                  </p>
                  <footer className="font-mono text-[9px] text-slate-300 font-medium">
                    — {card.speaker}
                  </footer>
                </blockquote>

                {/* Footer Action */}
                <div className="pt-0.5 flex items-center justify-between text-[9px] font-mono text-slate-300">
                  <span className="text-blue-400 flex items-center gap-1">
                    <span>Focus Map</span>
                    <ArrowRight className="w-2.5 h-2.5 text-blue-400" />
                  </span>
                  <div className="flex items-center gap-2">
                    {card.citationUrl && (
                      <a
                        href={card.citationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-1.5 py-0.5 rounded bg-blue-500/15 hover:bg-blue-500/25 text-sky-200 border border-blue-400/30 transition flex items-center gap-1 cursor-pointer"
                        title="Go to primary source document"
                      >
                        <span>Go to Source</span>
                        <ExternalLink className="w-2.5 h-2.5 text-sky-300" />
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectNode(card.nodeId);
                      }}
                      className="px-1.5 py-0.5 rounded bg-slate-800/60 hover:bg-slate-700/80 text-white border border-white/15 transition cursor-pointer"
                    >
                      Isolate
                    </button>
                  </div>
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