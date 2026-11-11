import React from 'react';
import {
  ShieldCheck,
  ChevronRight,
  Milestone,
  Scale,
  Network,
  Clock,
  ExternalLink,
  Layers,
  ArrowDown,
} from 'lucide-react';
import { MILESTONES } from '../../data/milestones';
import { MYTHS_DATA } from '../../data/myths';
import { SUPPLY_CHAIN_STAGES } from '../../data/supplyChain';

interface RightLedgerPanelProps {
  activeTab: 'milestones' | 'myths' | 'supply';
  onTabChange: (tab: 'milestones' | 'myths' | 'supply') => void;
  onSelectNode: (nodeId: string) => void;
  onHoverNode: (nodeId: string | null) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  opacity: number;
  translateXPercent: number;
  pointerEvents: boolean;
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
}) => {
  return (
    <aside
      id="rightGlassPanel"
      className="hidden lg:flex absolute top-[112px] lg:top-[70px] bottom-3 left-3 right-3 lg:left-auto sm:right-4 lg:w-[310px] xl:w-[325px] z-20 glass-panel rounded-2xl flex-col overflow-hidden transition-none"
      style={{
        transform: `translate3d(${isCollapsed ? 118 : translateXPercent}%, 0, 0)`,
        opacity: isCollapsed ? 0 : opacity,
        pointerEvents: !isCollapsed && pointerEvents ? 'auto' : 'none',
      }}
    >
      {/* KPI Bento Grid (2x2) */}
      <div className="p-3 border-b border-saharaTerracotta-500/20 bg-surfaceObsidian/85 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-telemetryEmerald-400"></span>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-sandOchre-100 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-telemetryEmerald-400" />
              Project Ledger
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-mono text-[9px] text-telemetryEmerald-400 bg-telemetryEmerald-500/15 border border-telemetryEmerald-500/35 px-1.5 py-0.5 rounded-full font-semibold">
              DTI / BCDA
            </span>
            <button
              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center border border-white/10 transition"
              onClick={onToggleCollapse}
              title="Minimize Ledger Panel"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {/* KPI 1 */}
          <div className="glass-subtle rounded-lg p-2 border border-saharaTerracotta-500/20">
            <div className="flex items-center justify-between text-[9px] font-mono text-stone-400">
              <span>CAPAS ZONE</span>
              <span className="text-saharaTerracotta-300 font-semibold">17.1% NCC</span>
            </div>
            <div className="font-mono text-base font-bold text-white mt-0.5 leading-none">
              1,620 ha
            </div>
            <div className="w-full h-1 bg-stone-700/50 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-saharaTerracotta-400 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <div className="text-[9px] text-stone-400 mt-1 truncate">
              4,000 acres in 9,450ha
            </div>
          </div>

          {/* KPI 2 */}
          <div className="glass-subtle rounded-lg p-2 border border-saharaTerracotta-500/20">
            <div className="flex items-center justify-between text-[9px] font-mono text-stone-400">
              <span>CAPEX TARGET</span>
              <span className="text-siliconAmber-400 font-semibold">50+ SUITORS</span>
            </div>
            <div className="font-mono text-base font-bold text-siliconAmber-400 mt-0.5 leading-none">
              $40B–$70B
            </div>
            <div className="w-full h-1 bg-stone-700/50 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-siliconAmber-400 rounded-full" style={{ width: '82%' }}></div>
            </div>
            <div className="text-[9px] text-stone-400 mt-1 truncate">
              KR, SG, US, JP, TW
            </div>
          </div>

          {/* KPI 3 */}
          <div className="glass-subtle rounded-lg p-2 border border-saharaTerracotta-500/20">
            <div className="flex items-center justify-between text-[9px] font-mono text-stone-400">
              <span>GROSS YIELD</span>
              <span className="text-telemetryEmerald-400 font-semibold">MATURITY</span>
            </div>
            <div className="font-mono text-base font-bold text-telemetryEmerald-400 mt-0.5 leading-none">
              ₱180B / yr
            </div>
            <div className="w-full h-1 bg-stone-700/50 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-telemetryEmerald-400 rounded-full" style={{ width: '55%' }}></div>
            </div>
            <div className="text-[9px] text-stone-400 mt-1 truncate">
              Recurring industrial
            </div>
          </div>

          {/* KPI 4 */}
          <div className="glass-subtle rounded-lg p-2 border border-saharaTerracotta-500/20">
            <div className="flex items-center justify-between text-[9px] font-mono text-stone-400">
              <span>WORKFORCE</span>
              <span className="text-sandOchre-300 font-semibold">STEM / FAB</span>
            </div>
            <div className="font-mono text-base font-bold text-white mt-0.5 leading-none">
              130K–200K
            </div>
            <div className="w-full h-1 bg-stone-700/50 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-sandOchre-400 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="text-[9px] text-stone-400 mt-1 truncate">
              Wafer R&amp;D &amp; mineral fab
            </div>
          </div>
        </div>
      </div>

      {/* Ledger Tab Switcher */}
      <div className="px-3 pt-2 pb-1.5 border-b border-saharaTerracotta-500/20 shrink-0">
        <div className="grid grid-cols-3 gap-1 bg-surfaceObsidian p-1 rounded-xl border border-saharaTerracotta-500/25">
          <button
            onClick={() => onTabChange('milestones')}
            className={`py-1 px-1.5 rounded-lg font-mono text-[10px] font-medium transition flex items-center justify-center gap-1 ${
              activeTab === 'milestones'
                ? 'bg-saharaTerracotta-500/20 text-sandOchre-200 border border-saharaTerracotta-500/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Milestone className="w-3 h-3 text-saharaTerracotta-400" />
            <span>Milestones</span>
          </button>

          <button
            onClick={() => onTabChange('myths')}
            className={`py-1 px-1.5 rounded-lg font-mono text-[10px] font-medium transition flex items-center justify-center gap-1 ${
              activeTab === 'myths'
                ? 'bg-saharaTerracotta-500/20 text-sandOchre-200 border border-saharaTerracotta-500/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Scale className="w-3 h-3 text-saharaTerracotta-400" />
            <span>Law Audit</span>
          </button>

          <button
            onClick={() => onTabChange('supply')}
            className={`py-1 px-1.5 rounded-lg font-mono text-[10px] font-medium transition flex items-center justify-center gap-1 ${
              activeTab === 'supply'
                ? 'bg-saharaTerracotta-500/20 text-sandOchre-200 border border-saharaTerracotta-500/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Network className="w-3 h-3 text-saharaTerracotta-400" />
            <span>Value Chain</span>
          </button>
        </div>
      </div>

      {/* Scrollable Ledger Content */}
      <div className="flex-1 overflow-y-auto glass-scroll p-3 space-y-2.5" id="rightPanelContent">
        {/* TAB 1: MILESTONES */}
        {activeTab === 'milestones' && (
          <div className="space-y-2.5">
            <div className="glass-subtle rounded-xl p-2.5 text-[10px] text-stone-300 flex items-start gap-1.5 border border-saharaTerracotta-500/20">
              <Clock className="w-3.5 h-3.5 text-saharaTerracotta-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-sandOchre-200">
                  PHASED INDUSTRIAL TIMELINE:
                </span>{' '}
                Click any milestone to focus geographical anchor.
              </div>
            </div>

            <div className="space-y-2 border-l border-stone-800 ml-2 pl-3">
              {MILESTONES.map((ms) => {
                let badgeClass = 'text-telemetryEmerald-400 bg-telemetryEmerald-500/10 border-telemetryEmerald-500/30';
                if (ms.statusColor === 'amber') {
                  badgeClass = 'text-siliconAmber-400 bg-siliconAmber-500/10 border-siliconAmber-500/30';
                } else if (ms.statusColor === 'stone' || ms.statusColor === 'slate') {
                  badgeClass = 'text-stone-400 bg-stone-800 border-stone-700';
                }

                return (
                  <div
                    key={ms.id}
                    onMouseEnter={() => onHoverNode(ms.nodeId)}
                    onMouseLeave={() => onHoverNode(null)}
                    onClick={() => onSelectNode(ms.nodeId)}
                    className="intel-card rounded-xl p-2.5 space-y-1.5 cursor-pointer hover:border-saharaTerracotta-400/50 transition"
                  >
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border ${badgeClass}`}>
                        {ms.status}
                      </span>
                      <span className="font-mono text-[9px] text-stone-400">{ms.date}</span>
                    </div>

                    <h4 className="text-xs font-semibold text-white leading-snug">{ms.title}</h4>
                    <p className="text-[10px] text-stone-300 leading-relaxed">{ms.details}</p>

                    <div className="pt-1 flex items-center justify-between text-[9px] font-mono text-stone-400 border-t border-stone-800/80">
                      <span className="flex items-center gap-1 text-sandOchre-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-saharaTerracotta-400"></span>
                        {ms.nodeName}
                      </span>
                      <span className="text-saharaTerracotta-400">Focus Node →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: LAW AUDIT / MYTHS */}
        {activeTab === 'myths' && (
          <div className="space-y-2.5">
            <div className="glass-subtle rounded-xl p-2.5 text-[10px] text-stone-300 flex items-start gap-1.5 border border-saharaTerracotta-500/20">
              <Scale className="w-3.5 h-3.5 text-siliconAmber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-sandOchre-200">
                  CONSTITUTIONAL &amp; SOVEREIGNTY AUDIT:
                </span>{' '}
                Fact-checked provisions under Philippine jurisdiction.
              </div>
            </div>

            <div className="space-y-2">
              {MYTHS_DATA.map((myth) => {
                let verdictPill = 'bg-hazardRose-500/15 text-hazardRose-400 border-hazardRose-500/35';
                if (myth.verdictType === 'amber') {
                  verdictPill = 'bg-siliconAmber-500/15 text-siliconAmber-400 border-siliconAmber-500/35';
                } else if (myth.verdictType === 'emerald') {
                  verdictPill = 'bg-telemetryEmerald-500/15 text-telemetryEmerald-400 border-telemetryEmerald-500/35';
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
                      <span className="font-mono text-[9px] font-bold text-stone-400">CLAIM CHECK</span>
                      <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border ${verdictPill}`}>
                        {myth.verdict}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-sandOchre-100 italic">
                      “{myth.claim}”
                    </p>

                    <div className="bg-surfaceObsidian/90 rounded-lg p-2 border border-saharaTerracotta-500/20 space-y-1">
                      <div className="font-mono text-[9px] text-saharaTerracotta-400 flex items-center justify-between">
                        <span>LEGAL REF:</span>
                        <span className="text-stone-300 font-semibold truncate max-w-[170px]">
                          {myth.legalRef}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-300 leading-relaxed font-normal">
                        {myth.explanation}
                      </p>
                    </div>

                    <div className="pt-0.5 flex items-center justify-between text-[9px] font-mono text-stone-400">
                      <span className="text-stone-400 truncate max-w-[180px]">
                        Authority: {myth.authority}
                      </span>
                      {myth.citationUrl && (
                        <a
                          href={myth.citationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-saharaTerracotta-400 hover:text-sandOchre-200 flex items-center gap-0.5"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-2.5 h-2.5" />
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
          <div className="space-y-2.5">
            <div className="glass-subtle rounded-xl p-2.5 text-[10px] text-stone-300 flex items-start gap-1.5 border border-saharaTerracotta-500/20">
              <Layers className="w-3.5 h-3.5 text-telemetryEmerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-telemetryEmerald-400">
                  MINERAL-TO-WAFER:
                </span>{' '}
                Click any phase to inspect geographic anchor node.
              </div>
            </div>

            <div className="space-y-2">
              {SUPPLY_CHAIN_STAGES.map((st, idx) => {
                let borderAccent = 'border-l-siliconAmber-500';
                let pillStyle = 'bg-siliconAmber-500/15 text-siliconAmber-400 border-siliconAmber-500/30';
                if (st.color === 'terracotta') {
                  borderAccent = 'border-l-saharaTerracotta-400';
                  pillStyle = 'bg-saharaTerracotta-500/20 text-sandOchre-200 border-saharaTerracotta-500/40';
                } else if (st.color === 'emerald') {
                  borderAccent = 'border-l-telemetryEmerald-400';
                  pillStyle = 'bg-telemetryEmerald-500/15 text-telemetryEmerald-400 border-telemetryEmerald-500/30';
                } else if (st.color === 'sandstone') {
                  borderAccent = 'border-l-sandOchre-400';
                  pillStyle = 'bg-sandOchre-400/20 text-sandOchre-300 border-sandOchre-400/35';
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
                        <span className="font-mono text-[9px] font-bold text-stone-400">
                          {st.stage}
                        </span>
                        <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${pillStyle} font-semibold`}>
                          {st.nodeTag}
                        </span>
                      </div>

                      <h4 className="text-[11px] font-bold text-white">{st.title}</h4>
                      <div className="font-mono text-[9px] text-saharaTerracotta-300 font-semibold">
                        {st.metrics}
                      </div>
                      <p className="text-[10px] text-stone-300 leading-relaxed">{st.description}</p>
                    </div>

                    {idx < SUPPLY_CHAIN_STAGES.length - 1 && (
                      <div className="flex items-center justify-center gap-1 text-stone-500 font-mono text-[9px] py-0.5">
                        <ArrowDown className="w-2.5 h-2.5 text-saharaTerracotta-400/70" />
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
