import React, { useEffect, useRef } from 'react';
import { Radio, ChevronLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { NEWS_CARDS } from '../../data/dispatches';
import {
  DISPATCH_STAKEHOLDERS,
  DISPATCH_TOPICS,
  DispatchStakeholder,
  DispatchTopic,
  IntelligenceDispatch,
} from '../../types/domain';

const STAKEHOLDER_META: Record<
  DispatchStakeholder,
  { shortLabel: string; tag: string; quoteBorder: string }
> = {
  'State / Official': {
    shortLabel: 'State',
    tag: 'bg-paper-2 text-ink-2 border-rule-2',
    quoteBorder: 'border-accent',
  },
  'Think Tank / Academic': {
    shortLabel: 'Think Tank',
    tag: 'bg-paper-2 text-muted border-rule',
    quoteBorder: 'border-ink-2',
  },
  'Civil Society / Local': {
    shortLabel: 'Civil Society',
    tag: 'bg-paper-3 text-ink border-rule-2',
    quoteBorder: 'border-muted',
  },
};

const TOPIC_LABELS: Record<DispatchTopic, string> = {
  'Semiconductors & AI': 'Semiconductors, Wafer Lab & AI',
  'Sovereignty & Legal': 'Sovereignty & RA 12252 Legal',
  'Minerals & Power': 'Critical Minerals & Power Grid',
  'Land & Community': 'Watershed & Ancestral Domain',
};

const STAKEHOLDER_PILLS: Array<{ id: 'ALL' | DispatchStakeholder; label: string }> = [
  { id: 'ALL', label: 'All' },
  ...DISPATCH_STAKEHOLDERS.map((id) => ({
    id,
    label: STAKEHOLDER_META[id].shortLabel,
  })),
];

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
  topOffset?: number;
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
  topOffset,
}) => {
  const query = searchQuery.trim().toLowerCase();
  const isHidden = isCollapsed || opacity <= 0.02;
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    (el as HTMLElement & { inert?: boolean }).inert = isHidden;
  }, [isHidden]);

  const filteredCards = NEWS_CARDS.filter((card) => {
    const matchesNode =
      selectedNodeId === 'ALL' ||
      card.nodeId === selectedNodeId ||
      Boolean(card.secondaryNodes?.some((node) => node === selectedNodeId));

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

  return (
    <aside
      ref={panelRef}
      id="leftGlassPanel"
      className="flex absolute top-[106px] lg:top-[72px] bottom-[calc(4.5rem+env(safe-area-inset-bottom))] lg:bottom-2 left-2 right-2 sm:left-2 lg:right-auto lg:w-[320px] z-20 midnight-frame flex-col overflow-hidden transition-none"
      style={{
        top: topOffset !== undefined ? `calc(${topOffset}px + env(safe-area-inset-top, 0px))` : undefined,
        transform: `translate3d(${isCollapsed ? -115 : translateXPercent}%, 0, 0)`,
        opacity: isCollapsed ? 0 : opacity,
        pointerEvents: !isHidden && pointerEvents ? 'auto' : 'none',
      }}
    >
      {/* Panel Header */}
      <div className="p-3 border-b border-rule bg-paper-2 space-y-2.5 shrink-0">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-[17px] text-ink flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
            <span>Intelligence Dispatches</span>
          </h2>
          <div className="flex items-center gap-2">
            <span
              id="newsCountIndicator"
              className="text-xs font-medium px-2 py-0.5 bg-paper-3 text-ink-2 border border-rule-2 num"
            >
              {filteredCards.length}
            </span>
            <button
              type="button"
              className="hidden lg:flex ctrl w-7 h-7 items-center justify-center text-ink-2"
              onClick={onToggleCollapse}
              title="Minimize Dispatches Panel"
              aria-label="Minimize Dispatches Panel"
            >
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Stakeholder Filter Tabs (filled ink when chosen) */}
        <div className="flex flex-wrap gap-1.5" id="stakeholderPillsContainer">
          {STAKEHOLDER_PILLS.map((item) => {
            const isActive = stakeholderFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onStakeholderFilterChange(item.id)}
                className={`stakeholder-pill ctrl px-2 py-1 text-xs ${
                  isActive
                    ? 'bg-ink text-paper border-ink'
                    : 'text-ink-2 border-rule'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Vector Select */}
        <div className="flex items-center gap-2">
          <label htmlFor="topicFilterSelect" className="text-xs text-muted shrink-0">
            Vector
          </label>
          <select
            id="topicFilterSelect"
            value={topicFilter}
            onChange={(e) => onTopicFilterChange(e.target.value)}
            className="ctrl-input flex-1 h-8 px-2 text-xs truncate cursor-pointer"
          >
            <option value="ALL">All Vectors</option>
            {DISPATCH_TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {TOPIC_LABELS[topic]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scrollable Ledger Feed */}
      <div className="flex-1 overflow-y-auto console-scroll divide-y divide-rule" id="newsFeedContainer">
        {filteredCards.length === 0 ? (
          <div className="p-6 text-center space-y-2">
            <div className="text-xs font-medium text-ink">No dispatches match filter</div>
            <p className="text-xs text-muted">Reset scope or search parameters to view all reports.</p>
            <button
              type="button"
              onClick={onResetFilters}
              className="ctrl mt-2 px-3 py-1.5 text-xs text-ink"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredCards.map((card: IntelligenceDispatch) => {
            const { tag, quoteBorder } = STAKEHOLDER_META[card.stakeholder];
            const isNodeActive = selectedNodeId === card.nodeId;

            return (
              <article
                key={card.id}
                onMouseEnter={() => onHoverNode(card.nodeId)}
                onMouseLeave={() => onHoverNode(null)}
                className={`ledger-row p-3 space-y-2 ${
                  isNodeActive ? 'ledger-row-active' : ''
                }`}
              >
                {/* Top Row */}
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-ink">{card.source}</span>
                    <span className="text-muted num">{card.date}</span>
                  </div>
                  <span className="text-accent font-medium">{card.nodeLabel}</span>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`text-xs px-1.5 py-0.5 border ${tag} font-medium`}>
                    {card.stakeholder}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 bg-paper-2 text-muted border border-rule">
                    {card.topic}
                  </span>
                </div>

                {/* Title (keyboard-accessible button trigger for node selection) */}
                <h3 className="text-sm font-medium text-ink leading-snug">
                  <button
                    type="button"
                    onClick={() => onSelectNode(card.nodeId)}
                    className="text-left hover:text-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 transition-colors cursor-pointer"
                  >
                    {card.headline}
                  </button>
                </h3>

                {/* Summary */}
                <p className="text-xs text-ink-2 leading-relaxed">{card.summary}</p>

                {/* Verbatim Soundbite */}
                <blockquote className={`border-l-2 ${quoteBorder} pl-2.5 py-0.5 space-y-1`}>
                  <p className="text-xs text-ink leading-snug">{card.quote}</p>
                  <footer className="text-xs text-muted">{card.speaker}</footer>
                </blockquote>

                {/* Footer Actions (distinct Go to Source link and Isolate button) */}
                <div className="pt-1 flex items-center justify-between gap-2 text-xs">
                  {card.citationUrl ? (
                    <a
                      href={card.citationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ctrl px-2 py-1 text-xs text-ink-2 inline-flex items-center gap-1"
                      title="Go to primary source document"
                    >
                      <span>Go to Source</span>
                      <ExternalLink className="w-3 h-3 text-accent" aria-hidden="true" />
                    </a>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={() => onSelectNode(card.nodeId)}
                    className="ctrl px-2 py-1 text-xs text-ink inline-flex items-center gap-1"
                  >
                    <span>Isolate</span>
                    <ArrowRight className="w-3 h-3 text-accent" aria-hidden="true" />
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
