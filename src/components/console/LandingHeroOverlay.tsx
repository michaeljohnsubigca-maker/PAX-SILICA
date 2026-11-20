import React from 'react';
import { Cpu, ShieldCheck, ArrowDown, ChevronDown } from 'lucide-react';

interface LandingHeroOverlayProps {
  cursorCoords: string;
  onEnterConsole: () => void;
  onFocusNode: (nodeId: string) => void;
  opacity: number;
  translateY: number;
}

const CORRIDOR_STOPS = ['Subic', 'New Clark City', 'Bulacan', 'Manila', 'Batangas'];

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
      aria-hidden={isHidden}
      className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between gap-2 sm:gap-4 pl-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] sm:px-6 lg:px-8 pt-[max(0.5rem,env(safe-area-inset-top))] sm:pt-6 lg:pt-8 pb-[calc(3.75rem+env(safe-area-inset-bottom))] lg:pb-8 overflow-hidden transition-none"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        visibility: isHidden ? 'hidden' : 'visible',
      }}
    >
      {/* Top Bar: Identity & Live Coordinates */}
      <div className="flex items-stretch sm:items-center justify-between gap-2 sm:gap-3">
        <div className="midnight-frame px-2.5 sm:px-4 py-1.5 sm:py-2 pointer-events-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-x-2 sm:gap-x-3 gap-y-1.5 w-full">
          <div className="flex items-center gap-2 min-w-0 order-1">
            <Cpu className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
            <span className="text-xs font-medium text-ink whitespace-nowrap">
              Pax Silica
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 border-l border-rule pl-3 text-xs text-ink-2 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
              <span>13th Signatory: Philippines</span>
            </span>
          </div>

          <div className="order-3 sm:order-2 basis-full sm:basis-auto sm:ml-auto border-t border-rule pt-1 sm:border-t-0 sm:pt-0 text-[11px] sm:text-xs text-muted flex items-center gap-1.5 sm:gap-2 num whitespace-nowrap min-w-0">
            <span className="font-medium text-ink-2 shrink-0">WGS84</span>
            <span className="text-ink truncate" id="landingCursorCoords">
              {cursorCoords || '15.3410° N, 120.5360° E'}
            </span>
          </div>

          <button
            type="button"
            className="order-2 sm:order-3 ctrl min-h-[34px] sm:min-h-[32px] px-2.5 sm:px-3 py-1 text-xs inline-flex items-center gap-1.5 shrink-0"
            onClick={onEnterConsole}
          >
            <span>Command View</span>
            <ArrowDown className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Left-Anchored Midnight Editorial Dossier */}
      <div className="w-full max-w-xl pointer-events-auto min-h-0 flex flex-col justify-end">
        <div className="midnight-frame p-3.5 sm:p-6 lg:p-8 max-h-full overflow-y-auto overscroll-contain">
          <div className="touch-scroll-x scroll-fade-x flex flex-nowrap sm:flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-0.5 text-[11px] sm:text-xs text-muted pb-2.5 sm:pb-4 border-b border-rule whitespace-nowrap">
            {CORRIDOR_STOPS.map((stop, idx) => (
              <span
                key={stop}
                className={idx > 0 ? 'border-l border-rule pl-2 sm:pl-3 shrink-0' : 'shrink-0'}
              >
                {stop}
              </span>
            ))}
          </div>

          <h1 className="mt-2.5 sm:mt-5 text-[clamp(1.375rem,1rem+2.5vw,2.75rem)] text-ink leading-[1.06]">
            Pax Silica &amp; the Luzon Corridor
          </h1>

          <p className="mt-2 sm:mt-4 text-xs sm:text-base text-ink-2 max-w-[52ch] leading-relaxed">
            High-security intelligence ledger tracking the Philippines’{' '}
            <span className="text-ink font-medium">
              $40B to $70B semiconductor, wafer fabrication, and critical mineral corridor
            </span>
            . Explore live vector infrastructure or scroll into the command console.
          </p>

          {/* Primary Action & Direct Node Jumps */}
          <div className="mt-3 sm:mt-6 pt-3 sm:pt-5 border-t border-rule flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              className="ctrl ctrl-primary min-h-[40px] px-4 sm:px-5 text-xs sm:text-sm inline-flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap"
              onClick={onEnterConsole}
            >
              <span>Enter Intelligence Console</span>
              <ChevronDown className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>

            <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
              <button
                type="button"
                className="ctrl min-h-[36px] sm:min-h-[40px] px-1.5 sm:px-3 text-[11px] sm:text-xs text-ink-2 truncate"
                onClick={() => onFocusNode('ncc')}
              >
                Capas Hub
              </button>
              <button
                type="button"
                className="ctrl min-h-[36px] sm:min-h-[40px] px-1.5 sm:px-3 text-[11px] sm:text-xs text-ink-2 truncate"
                onClick={() => onFocusNode('bulacan')}
              >
                Wafer Lab
              </button>
              <button
                type="button"
                className="ctrl min-h-[36px] sm:min-h-[40px] px-1.5 sm:px-3 text-[11px] sm:text-xs text-ink-2 truncate"
                onClick={() => onFocusNode('batangas')}
              >
                Batangas AI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHeroOverlay;
