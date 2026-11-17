import React, { useEffect, useRef } from 'react';
import {
  ShieldCheck,
  ChevronRight,
  Milestone,
  Scale,
  Network,
  Clock,
  Layers,
  ArrowDown,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { MILESTONES } from '../../data/milestones';
import { MYTHS_DATA } from '../../data/myths';
import { SUPPLY_CHAIN_STAGES } from '../../data/supplyChain';

const ACRONYMS = new Set(['NCC', 'BCDA', 'DTI', 'AI', 'SCMB', 'RA', 'US', 'UK', 'PH', 'ASEAN', 'DOST', 'BOI', 'DOE', 'NSCR', 'LNG', 'R&D', 'STEM', 'CPU']);

function formatDisplayLabel(text: string): string {
  const cleaned = text.replace(/\s*•\s*/g, ', ');
  if (cleaned !== cleaned.toUpperCase()) return cleaned;
  return cleaned
    .toLowerCase()
    .replace(/\b([a-z0-9&-]+)\b/g, (word, _g1, offset) => {
      const upper = word.toUpperCase();
      if (ACRONYMS.has(upper)) return upper;
      if (offset === 0) return word.charAt(0).toUpperCase() + word.slice(1);
      return word;
    });
}

function formatMiddleDots(text: string): string {
  return text.replace(/\s*•\s*/g, ', ');
}

export interface RightLedgerPanelProps {
  activeTab: 'milestones' | 'myths' | 'supply';
  onTabChange: (tab: 'milestones' | 'myths' | 'supply') => void;
  onSelectNode: (nodeId: string) => void;
  onHoverNode: (nodeId: string | null) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  opacity: number;
  translateXPercent: number;
  pointerEvents: boolean;
  topOffset?: number;
}

export const RightLedgerPanel: React.FC<RightLedgerPanelProps> = ({
  activeTab,
  onTabChange,
  onSelectNode,
  onHoverNode,
  isCollapsed,
  onToggleCollapse,
  opacity,
  translateXPercent,
  pointerEvents,
  topOffset,
}) => {
  const isHidden = isCollapsed || opacity <= 0.02;
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    (el as HTMLElement & { inert?: boolean }).inert = isHidden;
  }, [isHidden]);

  return (
    <aside
      ref={panelRef}
      id="rightGlassPanel"
      className="flex absolute top-[106px] lg:top-[72px] bottom-[calc(4.5rem+env(safe-area-inset-bottom))] lg:bottom-2 left-2 right-2 lg:left-auto sm:right-2 lg:w-[320px] z-20 midnight-frame flex-col overflow-hidden transition-none"
      style={{
        top: topOffset !== undefined ? `calc(${topOffset}px + env(safe-area-inset-top, 0px))` : undefined,
        transform: `translate3d(${isCollapsed ? 118 : translateXPercent}%, 0, 0)`,
        opacity: isCollapsed ? 0 : opacity,
        pointerEvents: !isHidden && pointerEvents ? 'auto' : 'none',
      }}
    >
      {/* Panel Header */}
      <div className="px-3 py-2.5 border-b border-rule bg-paper-2 flex items-center justify-between shrink-0">
        <h2 className="text-[17px] text-ink flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
          <span>Project Ledger</span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-2 bg-paper-3 border border-rule-2 px-2 py-0.5 font-medium">
            DTI / BCDA
          </span>
          <button
            type="button"
            className="ctrl w-7 h-7 flex items-center justify-center text-ink-2"
            onClick={onToggleCollapse}
            title="Minimize Ledger Panel"
            aria-label="Minimize Ledger Panel"
          >
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 2x2 Hairline Figures Grid */}
      <div className="grid grid-cols-2 border-b border-rule shrink-0">
        <div className="p-2.5 border-r border-b border-rule">
          <div className="flex items-center justify-between gap-1 text-xs text-muted">
            <span>Capas zone</span>
            <span className="text-ink-2 num">17.1% NCC</span>
          </div>
          <div className="text-base font-medium text-ink mt-1 leading-none num">
            1,620 ha
          </div>
          <div className="text-xs text-muted mt-1 leading-snug">4,000 acres in 9,450ha</div>
        </div>

        <div className="p-2.5 border-b border-rule">
          <div className="flex items-center justify-between gap-1 text-xs text-muted">
            <span>Capex target</span>
            <span className="text-ink-2 num">50+ suitors</span>
          </div>
          <div className="text-base font-medium text-accent mt-1 leading-none num">
            $40B–$70B
          </div>
          <div className="text-xs text-muted mt-1 leading-snug">KR, SG, US, JP, TW</div>
        </div>

        <div className="p-2.5 border-r border-rule">
          <div className="flex items-center justify-between gap-1 text-xs text-muted">
            <span>Gross yield</span>
            <span className="text-success">Maturity</span>
          </div>
          <div className="text-base font-medium text-success mt-1 leading-none num">
            ₱180B / yr
          </div>
          <div className="text-xs text-muted mt-1 leading-snug">Recurring industrial</div>
        </div>

        <div className="p-2.5">
          <div className="flex items-center justify-between gap-1 text-xs text-muted">
            <span>Workforce</span>
            <span className="text-ink-2">STEM / Fab</span>
          </div>
          <div className="text-base font-medium text-ink mt-1 leading-none num">
            130K–200K
          </div>
          <div className="text-xs text-muted mt-1 leading-snug">Wafer R&amp;D &amp; mineral fab</div>
        </div>
      </div>

      {/* Ledger Tab Switcher */}
      <div className="grid grid-cols-3 border-b border-rule bg-paper-2 shrink-0">
        <button
          type="button"
          onClick={() => onTabChange('milestones')}
          className={`ledger-tab min-h-11 lg:min-h-0 py-2 px-2 text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer border-b-2 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-[-2px] ${
            activeTab === 'milestones'
              ? 'border-accent text-ink bg-paper'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          <Milestone className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
          <span>Milestones</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('myths')}
          className={`ledger-tab min-h-11 lg:min-h-0 py-2 px-2 text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer border-b-2 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-[-2px] ${
            activeTab === 'myths'
              ? 'border-accent text-ink bg-paper'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
          <span>Law Audit</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('supply')}
          className={`ledger-tab min-h-11 lg:min-h-0 py-2 px-2 text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer border-b-2 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-[-2px] ${
            activeTab === 'supply'
              ? 'border-accent text-ink bg-paper'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          <Network className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
          <span>Value Chain</span>
        </button>
      </div>

      {/* Scrollable Ledger Content */}
      <div className="flex-1 overflow-y-auto console-scroll" id="rightPanelContent">
        {/* TAB 1: MILESTONES */}
        {activeTab === 'milestones' && (
          <div>
            <div className="bg-paper-2 border-b border-rule px-3 py-2 text-xs text-ink-2 flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-medium text-ink">Phased industrial timeline:</span>{' '}
                Select any milestone to focus its geographical anchor.
              </div>
            </div>

            <div className="divide-y divide-rule">
              {MILESTONES.map((ms) => {
                let badgeClass = 'text-success bg-paper-2 border-success/40';
                if (ms.statusColor === 'amber') {
                  badgeClass = 'text-accent bg-paper-2 border-accent/40';
                } else if (ms.statusColor === 'stone' || ms.statusColor === 'slate') {
                  badgeClass = 'text-muted bg-paper-2 border-rule-2';
                }

                return (
                  <div
                    key={ms.id}
                    onMouseEnter={() => onHoverNode(ms.nodeId)}
                    onMouseLeave={() => onHoverNode(null)}
                    className="ledger-row p-3 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                      <span className={`font-medium px-1.5 py-0.5 border ${badgeClass}`}>
                        {formatDisplayLabel(ms.status)}
                      </span>
                      <span className="text-muted num">{formatDisplayLabel(ms.date)}</span>
                    </div>

                    <h3 className="text-sm font-medium text-ink leading-snug">{ms.title}</h3>
                    <p className="text-xs text-ink-2 leading-relaxed">{ms.details}</p>

                    <div className="pt-1 flex items-center justify-between gap-2 text-xs text-muted">
                      <span className="text-ink-2">{ms.nodeName}</span>
                      <div className="flex items-center gap-2">
                        {ms.citationUrl && (
                          <a
                            href={ms.citationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ctrl inline-flex items-center gap-1 px-2 py-0.5 text-xs text-ink-2"
                            title="Go to Source"
                          >
                            <span>Go to Source</span>
                            <ExternalLink className="w-3 h-3 text-accent" aria-hidden="true" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => onSelectNode(ms.nodeId)}
                          className="ctrl inline-flex items-center gap-1 px-2 py-0.5 text-xs text-accent border-rule"
                        >
                          <span>Focus Node</span>
                          <ArrowRight className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: LAW AUDIT / MYTHS */}
        {activeTab === 'myths' && (
          <div>
            <div className="bg-paper-2 border-b border-rule px-3 py-2 text-xs text-ink-2 flex items-start gap-2">
              <Scale className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-medium text-ink">
                  Constitutional &amp; sovereignty audit:
                </span>{' '}
                Fact-checked provisions under Philippine jurisdiction.
              </div>
            </div>

            <div className="divide-y divide-rule">
              {MYTHS_DATA.map((myth) => {
                let verdictPill = 'bg-paper-3 text-ink border-rule-2';
                if (myth.verdictType === 'amber') {
                  verdictPill = 'bg-paper-2 text-accent border-accent/50';
                } else if (myth.verdictType === 'emerald') {
                  verdictPill = 'bg-paper-2 text-success border-success/50';
                }

                return (
                  <div
                    key={myth.id}
                    onMouseEnter={() => onHoverNode(myth.nodeId)}
                    onMouseLeave={() => onHoverNode(null)}
                    className="ledger-row p-3 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-muted font-medium">Claim check</span>
                      <span className={`font-medium px-1.5 py-0.5 border ${verdictPill}`}>
                        {formatDisplayLabel(myth.verdict)}
                      </span>
                    </div>

                    <h3 className="text-xs font-medium text-ink leading-snug">{myth.claim}</h3>

                    <div className="midnight-well p-2.5 space-y-1">
                      <div className="text-xs flex flex-wrap items-baseline justify-between gap-1">
                        <span className="text-accent shrink-0">Legal ref:</span>
                        <span className="text-ink font-medium">{formatMiddleDots(myth.legalRef)}</span>
                      </div>
                      <p className="text-xs text-ink-2 leading-relaxed">{myth.explanation}</p>
                    </div>

                    <div className="pt-0.5 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                      <span>Authority: {myth.authority}</span>
                      <div className="flex items-center gap-2">
                        {myth.citationUrl && (
                          <a
                            href={myth.citationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ctrl inline-flex items-center gap-1 px-2 py-0.5 text-xs text-ink-2"
                            title="Go to Source"
                          >
                            <span>Go to Source</span>
                            <ExternalLink className="w-3 h-3 text-accent" aria-hidden="true" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => onSelectNode(myth.nodeId)}
                          className="ctrl inline-flex items-center gap-1 px-2 py-0.5 text-xs text-accent border-rule"
                        >
                          <span>Focus</span>
                          <ArrowRight className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: VALUE CHAIN */}
        {activeTab === 'supply' && (
          <div>
            <div className="bg-paper-2 border-b border-rule px-3 py-2 text-xs text-ink-2 flex items-start gap-2">
              <Layers className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-medium text-ink">Mineral-to-wafer:</span>{' '}
                Select any phase to inspect its geographic anchor node.
              </div>
            </div>

            <div className="divide-y divide-rule">
              {SUPPLY_CHAIN_STAGES.map((st, idx) => {
                let borderAccent = 'border-l-accent';
                if (st.color === 'terracotta') {
                  borderAccent = 'border-l-accent-2';
                } else if (st.color === 'siliconGold' || st.color === 'amber') {
                  borderAccent = 'border-l-ink-2';
                } else if (st.color === 'emerald') {
                  borderAccent = 'border-l-success';
                } else if (st.color === 'sandstone') {
                  borderAccent = 'border-l-muted';
                }

                return (
                  <React.Fragment key={st.id}>
                    <div
                      onMouseEnter={() => onHoverNode(st.nodeId)}
                      onMouseLeave={() => onHoverNode(null)}
                      className={`ledger-row border-l-2 ${borderAccent} p-3 space-y-1.5`}
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                        <span className="font-medium text-muted">{formatDisplayLabel(st.stage)}</span>
                        <span className="px-1.5 py-0.5 bg-paper-2 border border-rule-2 text-ink-2 font-medium">
                          {st.nodeTag}
                        </span>
                      </div>

                      <h3 className="text-sm font-medium text-ink">
                        <button
                          type="button"
                          onClick={() => onSelectNode(st.nodeId)}
                          className="text-left hover:text-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 transition-colors cursor-pointer"
                        >
                          {st.title}
                        </button>
                      </h3>
                      <div className="text-xs text-accent font-medium num">
                        {formatMiddleDots(st.metrics)}
                      </div>
                      <p className="text-xs text-ink-2 leading-relaxed">{st.description}</p>
                    </div>

                    {idx < SUPPLY_CHAIN_STAGES.length - 1 && (
                      <div className="flex items-center justify-center gap-1.5 text-muted text-xs py-1.5 bg-paper-2">
                        <ArrowDown className="w-3 h-3 text-accent" aria-hidden="true" />
                        <span>SCMB rail feed</span>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightLedgerPanel;
