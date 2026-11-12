import React from 'react';
import { Radar, ArrowUp, Search, X, Layers } from 'lucide-react';
import { CORRIDOR_NODES } from '../../data/nodes';

interface TopCommandHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedNodeId: string;
  onResetNode: () => void;
  cursorCoords: string;
  onScrollToTop: () => void;
  isWideView: boolean;
  onToggleWideView: () => void;
  opacity: number;
  translateYPercent: number;
  pointerEvents: boolean;
}

export const TopCommandHeader: React.FC<TopCommandHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedNodeId,
  onResetNode,
  cursorCoords,
  onScrollToTop,
  isWideView,
  onToggleWideView,
  opacity,
  translateYPercent,
  pointerEvents,
}) => {
  const activeNode = selectedNodeId !== 'ALL' ? CORRIDOR_NODES[selectedNodeId] : null;
  const activeNodeText = activeNode ? activeNode.name.toUpperCase() : 'ALL LUZON';

  return (
    <header
      id="topCommandHeader"
      className="absolute top-3 left-3 right-3 sm:left-4 sm:right-4 z-30 glass-panel rounded-2xl px-4 py-2 transition-none"
      style={{
        transform: `translate3d(0, ${translateYPercent}%, 0)`,
        opacity,
        pointerEvents: pointerEvents ? 'auto' : 'none',
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
        {/* Brand / Status */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-400/40 flex items-center justify-center text-blue-400 hover:bg-blue-500/25 transition shrink-0 cursor-pointer"
              onClick={onScrollToTop}
              title="Return to Pure Map View"
            >
              <Radar className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight leading-none">
                  Pax Silica
                </span>
                <span className="text-slate-400 font-mono text-xs">//</span>
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-blue-400">
                  Luzon Corridor
                </span>
              </div>
              <div className="flex items-center gap-2 text-[9px] font-mono text-slate-300 mt-0.5">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  OP VETTED (OCT 2026)
                </span>
                <span>•</span>
                <span className="text-slate-300">BILATERAL SIGNING: Q4 2026</span>
              </div>
            </div>
          </div>

          {/* Mobile Map Button */}
          <button
            className="lg:hidden px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-[10px] text-slate-300 flex items-center gap-1 cursor-pointer"
            onClick={onScrollToTop}
          >
            <ArrowUp className="w-3 h-3" />
            Map
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex items-center gap-2 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="globalSearchInput"
              type="text"
              placeholder="Search dispatches, laws, wafer specs, suitors..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/15 focus:border-blue-400/80 rounded-xl pl-8 pr-7 py-1 text-xs text-white placeholder:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-400/50 font-mono transition"
            />
            {searchQuery && (
              <button
                id="clearSearchBtn"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Active Node Indicator Chip */}
          <div className="hidden sm:flex items-center gap-1 bg-white/[0.06] border border-white/15 rounded-xl px-2.5 py-1 text-[11px] font-mono shrink-0">
            <span className="text-slate-300 text-[10px]">SCOPE:</span>
            <span id="activeNodeHeaderText" className="text-blue-300 font-bold">
              {activeNodeText}
            </span>
            {selectedNodeId !== 'ALL' && (
              <button
                id="resetNodeFilterBtn"
                onClick={onResetNode}
                className="text-slate-300 hover:text-white ml-1 cursor-pointer"
                title="Reset Scope to All Luzon"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Live Telemetry & Wide View Switch */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-2 bg-white/[0.06] border border-white/15 rounded-xl px-3 py-1 font-mono text-[10px] text-slate-300">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              GPS LIVE
            </span>
            <span>•</span>
            <span className="text-slate-300">42ms</span>
            <span>•</span>
            <span className="text-sky-300">5 NODES ACTIVE</span>
            <span>•</span>
            <span id="cursorCoordsDisplay" className="text-white">
              {cursorCoords || '15.3410° N, 120.5360° E'}
            </span>
          </div>

          <button
            onClick={onToggleWideView}
            className="px-2.5 py-1 rounded-xl bg-white/[0.06] hover:bg-slate-800 border border-white/15 font-mono text-[11px] text-white flex items-center gap-1.5 transition cursor-pointer"
            title="Toggle between Workspace Panels and Pure Map Mode"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span id="panelsToggleLabel">{isWideView ? 'Panels View' : 'Wide View'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopCommandHeader;
