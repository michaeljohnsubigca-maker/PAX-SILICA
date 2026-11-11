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
      className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-10 transition-none"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        visibility: isHidden ? 'hidden' : 'visible',
      }}
    >
      {/* Top Operational Badge & Telemetry */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="glass-panel rounded-2xl px-4 py-2.5 pointer-events-auto flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saharaTerracotta-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-saharaTerracotta-400"></span>
          </span>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-saharaTerracotta-400" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-sandOchre-100 font-bold">
              PAX SILICA // LUZON ATLAS
            </span>
          </div>
          <span className="hidden md:inline-block text-stone-600">|</span>
          <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[11px] text-siliconAmber-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            13TH SIGNATORY: PHILIPPINES
          </span>
        </div>

        {/* Top-Right Coordinates & Workspace Action */}
        <div className="glass-panel rounded-2xl px-4 py-2 pointer-events-auto flex items-center gap-3">
          <div className="font-mono text-[11px] text-stone-400 flex items-center gap-2">
            <span className="text-saharaTerracotta-400 font-semibold">WGS84</span>
            <span className="text-stone-200" id="landingCursorCoords">
              {cursorCoords || '15.3410° N, 120.5360° E'}
            </span>
          </div>
          <button
            className="px-3.5 py-1.5 rounded-xl bg-saharaTerracotta-500/20 hover:bg-saharaTerracotta-500/30 text-sandOchre-200 border border-saharaTerracotta-500/40 font-mono text-[11px] font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            onClick={onEnterConsole}
          >
            <span>Command View</span>
            <ArrowDown className="w-3.5 h-3.5 text-saharaTerracotta-400" />
          </button>
        </div>
      </div>

      {/* Center Editorial Card */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-2 sm:mb-4">
        <div className="glass-panel rounded-3xl px-6 sm:px-10 py-7 sm:py-9 pointer-events-auto border border-saharaTerracotta-500/30 shadow-glass-elevated">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surfaceObsidian/90 border border-saharaTerracotta-500/30 font-mono text-[10px] uppercase tracking-[0.22em] text-sandOchre-300 mb-3.5">
            <span>Subic</span>
            <span className="text-stone-600">•</span>
            <span>New Clark City</span>
            <span className="text-stone-600">•</span>
            <span>Bulacan</span>
            <span className="text-stone-600">•</span>
            <span>Manila</span>
            <span className="text-stone-600">•</span>
            <span>Batangas</span>
          </div>

          <h1 className="font-display italic font-medium text-4xl sm:text-6xl text-white tracking-tight leading-[1.08]">
            Pax Silica &amp; the Luzon Corridor
          </h1>

          <p className="mt-3.5 text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed font-normal">
            High-security intelligence ledger tracking the Philippines’{' '}
            <span className="text-sandOchre-200 font-semibold">
              $40B–$70B semiconductor, wafer fabrication, and critical mineral corridor
            </span>
            . Explore live vector infrastructure or scroll into the command console.
          </p>

          {/* Action Cluster */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-saharaTerracotta-500 to-saharaTerracotta-400 text-stone-950 font-sans font-bold text-xs tracking-wide shadow-glow-sahara hover:brightness-110 transition cursor-pointer"
              onClick={onEnterConsole}
            >
              <span>Enter Intelligence Console</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Fast Node Focus Chips */}
            <div className="flex items-center gap-1.5 bg-surfaceObsidian/90 border border-saharaTerracotta-500/25 rounded-full p-1">
              <button
                className="px-3 py-1 rounded-full text-[11px] font-mono text-sandOchre-200 hover:bg-white/10 transition flex items-center gap-1.5"
                onClick={() => onFocusNode('ncc')}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-saharaTerracotta-400"></span>
                Capas Hub
              </button>
              <button
                className="px-3 py-1 rounded-full text-[11px] font-mono text-siliconAmber-400 hover:bg-white/10 transition flex items-center gap-1.5"
                onClick={() => onFocusNode('bulacan')}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-siliconAmber-400"></span>
                Wafer Lab
              </button>
              <button
                className="px-3 py-1 rounded-full text-[11px] font-mono text-sandOchre-300 hover:bg-white/10 transition flex items-center gap-1.5"
                onClick={() => onFocusNode('batangas')}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sandOchre-400"></span>
                Batangas AI
              </button>
            </div>
          </div>

          {/* Scroll Wheel Telemetry */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
            <div className="w-4 h-6 rounded-full border border-stone-500/70 flex justify-center pt-1">
              <span className="w-1 h-1.5 rounded-full bg-saharaTerracotta-400 animate-scroll-wheel"></span>
            </div>
            <span>Scroll to Ease Workspace</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHeroOverlay;
