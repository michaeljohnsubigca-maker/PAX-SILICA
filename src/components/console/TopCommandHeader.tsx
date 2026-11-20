import React, { useEffect, useRef } from 'react';
import { Radar, ArrowUp, Search, X, Layers } from 'lucide-react';
import { CORRIDOR_NODES } from '../../data/nodes';

export interface TopCommandHeaderProps {
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
  onHeightChange?: (height: number) => void;
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
  onHeightChange,
}) => {
  const headerRef = useRef<HTMLElement>(null);
  const activeNode = selectedNodeId !== 'ALL' ? CORRIDOR_NODES[selectedNodeId] : null;
  const activeNodeText = activeNode ? activeNode.name : 'All Luzon';
  const isHidden = opacity <= 0.02;

  useEffect(() => {
    if (!headerRef.current || !onHeightChange) return;

    const measureHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        if (height > 0) {
          onHeightChange(height);
        }
      }
    };

    measureHeight();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        measureHeight();
      });
      observer.observe(headerRef.current);
      return () => observer.disconnect();
    }
  }, [onHeightChange]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    (el as HTMLElement & { inert?: boolean }).inert = isHidden;
  }, [isHidden]);

  return (
    <header
      ref={headerRef}
      id="topCommandHeader"
      className="absolute top-2 left-2 right-2 mt-[env(safe-area-inset-top)] z-30 midnight-frame px-2 py-1.5 lg:px-3 lg:py-2 transition-none"
      style={{
        transform: `translate3d(0, ${translateYPercent}%, 0)`,
        opacity,
        pointerEvents: !isHidden && pointerEvents ? 'auto' : 'none',
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1.5 lg:gap-2">
        {/* Identity & Verification Status */}
        <div className="flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              className="icon-hit ctrl w-8 h-8 flex items-center justify-center text-accent shrink-0"
              onClick={onScrollToTop}
              title="Return to Pure Map View"
              aria-label="Return to Pure Map View"
            >
              <Radar className="w-4 h-4" aria-hidden="true" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                <span className="text-sm sm:text-base lg:text-lg font-medium text-ink tracking-tight leading-none">
                  Pax Silica
                </span>
                <span className="border-l border-rule pl-1.5 sm:pl-2 text-[11px] sm:text-xs font-medium text-accent truncate">
                  Luzon Corridor
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-muted mt-0.5 leading-tight whitespace-nowrap overflow-hidden">
                <span className="text-success font-medium shrink-0">OP vetted (Oct 2026)</span>
                <span className="hidden sm:inline border-l border-rule pl-2 shrink-0">
                  Bilateral signing: Q4 2026
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="lg:hidden ctrl min-h-[34px] px-2.5 py-1 text-xs text-ink-2 inline-flex items-center gap-1 shrink-0"
            onClick={onScrollToTop}
          >
            <ArrowUp className="w-3 h-3" aria-hidden="true" />
            <span>Map</span>
          </button>
        </div>

        {/* Search & Scope Indicator (visible at all widths including 320px phone) */}
        <div className="flex items-center gap-1.5 lg:gap-2 flex-1 lg:max-w-xl min-w-0">
          <div className="relative flex-1 min-w-0">
            <Search
              className="w-3.5 h-3.5 text-muted absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="globalSearchInput"
              type="text"
              enterKeyHint="search"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Search dispatches, laws, wafer specs, suitors"
              placeholder="Search dispatches, laws, wafer specs, suitors..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="ctrl-input w-full h-9 lg:h-8 pl-7 pr-7 py-1 text-xs"
            />
            {searchQuery && (
              <button
                id="clearSearchBtn"
                type="button"
                aria-label="Clear search"
                onClick={() => onSearchChange('')}
                className="icon-hit ctrl absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center border-transparent text-muted hover:text-ink"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 h-9 lg:h-8 bg-paper-2 border border-rule px-2 lg:px-2.5 text-xs shrink-0 max-w-[44%] sm:max-w-none">
            <span className="text-muted hidden sm:inline shrink-0">Scope:</span>
            <span id="activeNodeHeaderText" className="text-ink font-medium truncate">
              {activeNodeText}
            </span>
            {selectedNodeId !== 'ALL' && (
              <button
                id="resetNodeFilterBtn"
                type="button"
                onClick={onResetNode}
                className="icon-hit ctrl w-5 h-5 flex items-center justify-center border-transparent text-muted hover:text-ink shrink-0"
                title="Reset Scope to All Luzon"
                aria-label="Reset Scope to All Luzon"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Coordinate Readout & Wide View Switch */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2.5 h-8 bg-paper-2 border border-rule px-3 text-xs text-ink-2 num">
            <span className="text-success font-medium">GPS live</span>
            <span className="border-l border-rule pl-2.5 text-ink-2">5 nodes active</span>
            <span id="cursorCoordsDisplay" className="border-l border-rule pl-2.5 text-ink">
              {cursorCoords || '15.3410° N, 120.5360° E'}
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleWideView}
            className="ctrl h-8 px-3 text-xs flex items-center gap-1.5"
            title="Toggle between Workspace Panels and Pure Map Mode"
          >
            <Layers className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
            <span id="panelsToggleLabel">{isWideView ? 'Panels View' : 'Wide View'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopCommandHeader;
