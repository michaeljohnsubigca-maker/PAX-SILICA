import React from 'react';
import { Cpu, ShieldCheck, ArrowDown, ChevronDown } from 'lucide-react';

interface LandingHeroOverlayProps {
  cursorCoords: string;
  onEnterConsole: () => void;
  onFocusNode: (nodeId: string) => void;
  opacity: number;
  translateY: number;
}

export const LandingHeroOverlay: React.FC<LandingHeroOverlayProps> = ({
  cursorCoords,
  onEnterConsole,
  onFocusNode,
  opacity,
  translateY,
}) => {
  const isHidden = opacity <= 0.02;

  return (
    <div
      id="landingHeroOverlay"
      className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between gap-3 px-4 sm:px-10 pt-[max(1rem,env(safe-area-inset-top))] pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-10 sm:pt-10 overflow-hidden transition-none"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        visibility: isHidden ? 'hidden' : 'visible',
      }}
    >
      {/* Top Operational Badge & Telemetry */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4">
        <div className="glass-panel rounded-2xl px-4 py-2.5 pointer-events-auto flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400"></span>
          </span>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-white font-bold">
              PAX SILICA // LUZON ATLAS
            </span>
          </div>
          <span className="hidden md:inline-block text-slate-600">|</span>
          <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[11px] text-sky-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            13TH SIGNATORY: PHILIPPINES
          </span>
        </div>

        {/* Top-Right Coordinates & Workspace Action */}
        <div className="glass-panel rounded-2xl px-3 sm:px-4 py-2 pointer-events-auto flex items-center justify-between gap-3">
          <div className="font-mono text-[11px] text-slate-300 flex items-center gap-2">
            <span className="text-blue-400 font-semibold">WGS84</span>
            <span className="text-white" id="landingCursorCoords">
              {cursorCoords || '15.3410° N, 120.5360° E'}
            </span>
          </div>
          <button
            className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/35 text-white border border-blue-400/40 hover:border-blue-300/70 font-mono text-[11px] font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            onClick={onEnterConsole}
          >
            <span>Command View</span>
            <ArrowDown className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>
      </div>

      {/* Center Editorial Card */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-0 sm:mb-4 min-h-0 w-full">
        <div className="glass-panel rounded-3xl px-4 sm:px-10 py-5 sm:py-9 pointer-events-auto max-h-full overflow-y-auto overscroll-contain border border-white/20 shadow-glass-elevated">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/15 font-mono text-[10px] uppercase tracking-[0.22em] text-sky-200 mb-3 flex-wrap justify-center">
            <span>Subic</span>
            <span className="text-slate-400">•</span>
            <span>New Clark City</span>
            <span className="text-slate-400">•</span>
            <span>Bulacan</span>
            <span className="text-slate-400">•</span>
            <span>Manila</span>
            <span className="text-slate-400">•</span>
            <span>Batangas</span>
          </div>

          <h1 className="font-sans font-bold text-3xl sm:text-6xl text-white tracking-tight leading-[1.08] [text-wrap:balance]">
            Pax Silica &amp; the Luzon Corridor
          </h1>

          <p className="mt-3.5 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-normal [text-wrap:pretty]">
            High-security intelligence ledger tracking the Philippines’{' '}
            <span className="text-white font-semibold">
              $40B–$70B semiconductor, wafer fabrication, and critical mineral corridor
            </span>
            . Explore live vector infrastructure or scroll into the command console.
          </p>

          {/* Action Cluster */}
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              className="group inline-flex items-center gap-2.5 w-full sm:w-auto justify-center min-h-11 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-sans font-bold text-xs tracking-wide shadow-glow-blue border border-white/25 hover:border-white/40 transition cursor-pointer"
              onClick={onEnterConsole}
            >
              <span>Enter Intelligence Console</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Fast Node Focus Chips */}
            <div className="flex flex-wrap justify-center items-center gap-1.5 bg-white/[0.06] border border-white/15 rounded-full p-1">
              <button
                className="px-3 py-2 sm:py-1 rounded-full text-[11px] font-mono text-slate-200 hover:text-white hover:bg-white/10 transition flex items-center gap-1.5"
                onClick={() => onFocusNode('ncc')}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Capas Hub
              </button>
              <button
                className="px-3 py-2 sm:py-1 rounded-full text-[11px] font-mono text-sky-200 hover:text-white hover:bg-white/10 transition flex items-center gap-1.5"
                onClick={() => onFocusNode('bulacan')}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                Wafer Lab
              </button>
              <button
                className="px-3 py-2 sm:py-1 rounded-full text-[11px] font-mono text-cyan-200 hover:text-white hover:bg-white/10 transition flex items-center gap-1.5"
                onClick={() => onFocusNode('batangas')}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Batangas AI
              </button>
            </div>
          </div>

          {/* Scroll Wheel Telemetry */}
          <div className="mt-6 hidden sm:flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-300">
            <div className="w-4 h-6 rounded-full border border-slate-500/70 flex justify-center pt-1">
              <span className="w-1 h-1.5 rounded-full bg-blue-400 animate-scroll-wheel"></span>
            </div>
            <span>Scroll to Ease Workspace</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHeroOverlay;
