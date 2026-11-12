import React from 'react';
import {
  ShieldCheck,
  ChevronRight,
  Milestone,
  Scale,
  Network,
  Clock,
  Layers,
  ArrowDown,
  ExternalLink,
} from 'lucide-react';
import { MILESTONES } from '../../data/milestones';
import { MYTHS_DATA } from '../../data/myths';
import { SUPPLY_CHAIN_STAGES } from '../../data/supplyChain';

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
  return (
    <aside
      id="rightGlassPanel"
      className="hidden lg:flex absolute top-[106px] lg:top-[72px] bottom-[60px] lg:bottom-2 left-2 right-2 lg:left-auto sm:right-2 lg:w-[320px] z-20 glass-panel rounded-2xl flex-col overflow-hidden transition-none"
      style={{
        top: topOffset !== undefined ? `${topOffset}px` : undefined,
        transform: `translate3d(${isCollapsed ? 118 : translateXPercent}%, 0, 0)`,
        opacity: isCollapsed ? 0 : opacity,
        pointerEvents: !isCollapsed && pointerEvents ? 'auto' : 'none',
      }}
    >
      {/* KPI Bento Grid (2x2) */}
      <div className="p-2.5 border-b border-white/12 bg-white/[0.06] shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              Project Ledger
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-mono text-[9px] text-sky-300 bg-sky-500/15 border border-sky-400/35 px-1.5 py-0.5 rounded-full font-semibold">
              DTI / BCDA
            </span>
            <button
              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center border border-white/10 transition cursor-pointer"
              onClick={onToggleCollapse}
              title="Minimize Ledger Panel"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* KPI 1 */}
          <div className="glass-subtle rounded-lg p-2 border border-white/12">
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-300">
              <span>CAPAS ZONE</span>
              <span className="text-sky-300 font-semibold">17.1% NCC</span>
            </div>
            <div className="font-mono text-base font-bold text-white mt-0.5 leading-none">
              1,620 ha
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <div className="text-[10px] text-slate-200 mt-1 truncate">
              4,000 acres in 9,450ha
            </div>
          </div>

          {/* KPI 2 */}
          <div className="glass-subtle rounded-lg p-2 border border-white/12">
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-300">
              <span>CAPEX TARGET</span>
              <span className="text-sky-300 font-semibold">50+ SUITORS</span>
            </div>
            <div className="font-mono text-base font-bold text-sky-300 mt-0.5 leading-none">
              $40B–$70B
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-sky-400 rounded-full" style={{ width: '82%' }}></div>
            </div>
            <div className="text-[10px] text-slate-200 mt-1 truncate">
              KR, SG, US, JP, TW
            </div>
          </div>

          {/* KPI 3 */}
          <div className="glass-subtle rounded-lg p-2 border border-white/12">
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-300">
              <span>GROSS YIELD</span>
              <span className="text-emerald-400 font-semibold">MATURITY</span>
            </div>
            <div className="font-mono text-base font-bold text-emerald-400 mt-0.5 leading-none">
              ₱180B / yr
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '55%' }}></div>
            </div>
            <div className="text-[10px] text-slate-200 mt-1 truncate">
              Recurring industrial
            </div>
          </div>

          {/* KPI 4 */}
          <div className="glass-subtle rounded-lg p-2 border border-white/12">
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-300">
              <span>WORKFORCE</span>
              <span className="text-blue-200 font-semibold">STEM / FAB</span>
            </div>
            <div className="font-mono text-base font-bold text-white mt-0.5 leading-none">
              130K–200K
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-blue-400 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="text-[10px] text-slate-200 mt-1 truncate">
              Wafer R&amp;D &amp; mineral fab
            </div>
          </div>
        </div>
      </div>

      {/* Ledger Tab Switcher */}
      <div className="px-2.5 pt-2 pb-2 border-b border-white/12 shrink-0">
        <div className="grid grid-cols-3 gap-2 bg-white/[0.06] p-1.5 rounded-xl border border-white/15">
          <button
            onClick={() => onTabChange('milestones')}
            className={`py-1 px-1.5 rounded-lg font-mono text-[10px] font-medium transition flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'milestones'
                ? 'bg-blue-600/35 text-white border border-blue-400/60 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Milestone className="w-3 h-3 text-blue-400" />
            <span>Milestones</span>
          </button>

          <button
            onClick={() => onTabChange('myths')}
            className={`py-1 px-1.5 rounded-lg font-mono text-[10px] font-medium transition flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'myths'
                ? 'bg-blue-600/35 text-white border border-blue-400/60 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Scale className="w-3 h-3 text-blue-400" />
            <span>Law Audit</span>
          </button>

          <button
            onClick={() => onTabChange('supply')}
            className={`py-1 px-1.5 rounded-lg font-mono text-[10px] font-medium transition flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'supply'
                ? 'bg-blue-600/35 text-white border border-blue-400/60 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Network className="w-3 h-3 text-blue-400" />
            <span>Value Chain</span>
          </button>
        </div>
      </div>

      {/* Scrollable Ledger Content */}
      <div className="flex-1 overflow-y-auto glass-scroll p-2 space-y-2" id="rightPanelContent">
        {/* TAB 1: MILESTONES */}
        {activeTab === 'milestones' && (
          <div className="space-y-2">
            <div className="glass-subtle rounded-xl p-2.5 text-[10px] text-slate-300 flex items-start gap-1.5 border border-white/12">
              <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-white">
                  PHASED INDUSTRIAL TIMELINE:
                </span>{' '}
                Click any milestone to focus geographical anchor.
              </div>
            </div>

            <div className="space-y-2 border-l border-slate-800 ml-2 pl-3">
              {MILESTONES.map((ms) => {
                let badgeClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
                if (ms.statusColor === 'amber') {
                  badgeClass = 'text-sky-300 bg-sky-500/15 border-sky-400/30';
                } else if (ms.statusColor === 'stone' || ms.statusColor === 'slate') {
                  badgeClass = 'text-slate-300 bg-slate-800 border-slate-700';
                }

                return (
                  <div
                    key={ms.id}
                    onMouseEnter={() => onHoverNode(ms.nodeId)}
                    onMouseLeave={() => onHoverNode(null)}
                    onClick={() => onSelectNode(ms.nodeId)}
                    className="intel-card rounded-xl p-2.5 space-y-1.5 cursor-pointer hover:border-blue-400/60 transition"
                  >
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border ${badgeClass}`}>
                        {ms.status}
                      </span>
                      <span className="font-mono text-[9px] text-slate-300">{ms.date}</span>
                    </div>

                    <h4 className="text-xs font-semibold text-white leading-snug">{ms.title}</h4>
                    <p className="text-[10px] text-slate-300 leading-relaxed">{ms.details}</p>

                    <div className="pt-1 flex items-center justify-between text-[9px] font-mono text-slate-300 border-t border-slate-800/80">
                      <span className="flex items-center gap-1 text-sky-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        {ms.nodeName}
                      </span>
                      <div className="flex items-center gap-2">
                        {ms.citationUrl && (
                          <a
                            href={ms.citationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-600/25 hover:bg-blue-600/40 text-sky-200 hover:text-white border border-blue-400/40 font-mono text-[9px] font-semibold transition cursor-pointer"
                            title="Go to Source"
                          >
                            <span>Go to Source</span>
                            <ExternalLink className="w-2.5 h-2.5 text-blue-400" />
                          </a>
                        )}
                        <span className="text-blue-400">Focus Node →</span>
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
          <div className="space-y-2">
            <div className="glass-subtle rounded-xl p-2.5 text-[10px] text-slate-300 flex items-start gap-1.5 border border-white/12">
              <Scale className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-white">
                  CONSTITUTIONAL &amp; SOVEREIGNTY AUDIT:
                </span>{' '}
                Fact-checked provisions under Philippine jurisdiction.
              </div>
            </div>

            <div className="space-y-2">
              {MYTHS_DATA.map((myth) => {
                let verdictPill = 'bg-rose-500/15 text-rose-300 border-rose-400/35';
                if (myth.verdictType === 'amber') {
                  verdictPill = 'bg-sky-500/15 text-sky-300 border-sky-400/35';
                } else if (myth.verdictType === 'emerald') {
                  verdictPill = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/35';
                }

                return (
                  <div
                    key={myth.id}
                    onMouseEnter={() => onHoverNode(myth.nodeId)}
                    onMouseLeave={() => onHoverNode(null)}
                    onClick={() => onSelectNode(myth.nodeId)}
                    className="intel-card rounded-xl p-2.5 space-y-1.5 cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-[9px] font-bold text-slate-300">CLAIM CHECK</span>
                      <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border ${verdictPill}`}>
                        {myth.verdict}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-slate-100">
                      “{myth.claim}”
                    </p>

                    <div className="bg-white/[0.06] rounded-lg p-2 border border-white/10 space-y-1">
                      <div className="font-mono text-[9px] text-blue-400 flex items-center justify-between">
                        <span>LEGAL REF:</span>
                        <span className="text-white font-semibold truncate max-w-[170px]">
                          {myth.legalRef}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                        {myth.explanation}
                      </p>
                    </div>

                    <div className="pt-0.5 flex items-center justify-between text-[9px] font-mono text-slate-300">
                      <span className="text-slate-300 truncate max-w-[150px]">
                        Authority: {myth.authority}
                      </span>
                      {myth.citationUrl && (
                        <a
                          href={myth.citationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-600/25 hover:bg-blue-600/40 text-sky-200 hover:text-white border border-blue-400/40 font-mono text-[9px] font-semibold transition cursor-pointer"
                          title="Go to Source"
                        >
                          <span>Go to Source</span>
                          <ExternalLink className="w-2.5 h-2.5 text-blue-400" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: VALUE CHAIN */}
        {activeTab === 'supply' && (
          <div className="space-y-2">
            <div className="glass-subtle rounded-xl p-2.5 text-[10px] text-slate-300 flex items-start gap-1.5 border border-white/12">
              <Layers className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-blue-400">
                  MINERAL-TO-WAFER:
                </span>{' '}
                Click any phase to inspect geographic anchor node.
              </div>
            </div>

            <div className="space-y-2">
              {SUPPLY_CHAIN_STAGES.map((st, idx) => {
                let borderAccent = 'border-l-blue-500';
                let pillStyle = 'bg-blue-500/20 text-white border-blue-400/40';
                if (st.color === 'terracotta') {
                  borderAccent = 'border-l-blue-600';
                  pillStyle = 'bg-blue-600/25 text-white border-blue-400/40';
                } else if (st.color === 'siliconGold' || st.color === 'amber') {
                  borderAccent = 'border-l-sky-400';
                  pillStyle = 'bg-sky-500/20 text-sky-200 border-sky-400/40';
                } else if (st.color === 'emerald') {
                  borderAccent = 'border-l-cyan-400';
                  pillStyle = 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40';
                } else if (st.color === 'sandstone') {
                  borderAccent = 'border-l-indigo-400';
                  pillStyle = 'bg-indigo-500/20 text-indigo-200 border-indigo-400/40';
                }

                return (
                  <React.Fragment key={st.id}>
                    <div
                      onMouseEnter={() => onHoverNode(st.nodeId)}
                      onMouseLeave={() => onHoverNode(null)}
                      onClick={() => onSelectNode(st.nodeId)}
                      className={`intel-card border-l-4 ${borderAccent} rounded-r-xl p-2.5 space-y-1 cursor-pointer`}
                    >
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <span className="font-mono text-[9px] font-bold text-slate-300">
                          {st.stage}
                        </span>
                        <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${pillStyle} font-semibold`}>
                          {st.nodeTag}
                        </span>
                      </div>

                      <h4 className="text-[11px] font-bold text-white">{st.title}</h4>
                      <div className="font-mono text-[9px] text-sky-300 font-semibold">
                        {st.metrics}
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed">{st.description}</p>
                    </div>

                    {idx < SUPPLY_CHAIN_STAGES.length - 1 && (
                      <div className="flex items-center justify-center gap-1 text-slate-400 font-mono text-[9px] py-0.5">
                        <ArrowDown className="w-2.5 h-2.5 text-blue-400/80" />
                        <span>SCMB RAIL FEED</span>
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
