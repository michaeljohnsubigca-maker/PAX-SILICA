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
      className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between gap-4 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-8 pt-[max(1rem,env(safe-area-inset-top))] pb-[calc(5.25rem+env(safe-area-inset-bottom))] lg:pb-8 sm:pt-8 overflow-hidden transition-none"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        visibility: isHidden ? 'hidden' : 'visible',
      }}
    >
      {/* Top Bar: Identity & Live Coordinates */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="midnight-frame px-4 py-2.5 pointer-events-auto flex items-center gap-3">
          <Cpu className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
          <span className="text-xs font-medium text-ink whitespace-nowrap">
            Pax Silica / Luzon Atlas
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 border-l border-rule pl-3 text-xs text-ink-2 whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
            <span>13th Signatory: Philippines</span>
          </span>
        </div>

        <div className="midnight-frame px-3 sm:px-4 py-2 pointer-events-auto flex items-center justify-between gap-3">
          <div className="text-xs text-muted flex items-center gap-2 num">
            <span className="font-medium text-ink-2">WGS84</span>
            <span className="text-ink" id="landingCursorCoords">
              {cursorCoords || '15.3410° N, 120.5360° E'}
            </span>
          </div>
          <button
            type="button"
            className="ctrl h-10 lg:h-8 px-3 text-xs inline-flex items-center gap-1.5"
            onClick={onEnterConsole}
          >
            <span>Command View</span>
            <ArrowDown className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Left-Anchored Midnight Editorial Dossier */}
      <div className="w-full max-w-xl pointer-events-auto">
        <div className="midnight-frame p-6 sm:p-8 max-h-full overflow-y-auto overscroll-contain">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted pb-4 border-b border-rule">
            {CORRIDOR_STOPS.map((stop, idx) => (
              <span
                key={stop}
                className={idx > 0 ? 'border-l border-rule pl-3' : undefined}
              >
                {stop}
              </span>
            ))}
          </div>

          <h1 className="mt-5 text-[clamp(2rem,3.6vw,3.1rem)] text-ink leading-[1.04]">
            Pax Silica &amp; the Luzon Corridor
          </h1>

          <p className="mt-4 text-sm sm:text-base text-ink-2 max-w-[52ch] leading-relaxed">
            High-security intelligence ledger tracking the Philippines’{' '}
            <span className="text-ink font-medium">
              $40B to $70B semiconductor, wafer fabrication, and critical mineral corridor
            </span>
            . Explore live vector infrastructure or scroll into the command console.
          </p>

          {/* Primary Action & Direct Node Jumps */}
          <div className="mt-6 pt-5 border-t border-rule flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="ctrl ctrl-primary h-11 lg:h-10 px-5 text-sm inline-flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap"
              onClick={onEnterConsole}
            >
              <span>Enter Intelligence Console</span>
              <ChevronDown className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="ctrl h-11 lg:h-10 px-3 text-xs text-ink-2"
                onClick={() => onFocusNode('ncc')}
              >
                Capas Hub
              </button>
              <button
                type="button"
                className="ctrl h-11 lg:h-10 px-3 text-xs text-ink-2"
                onClick={() => onFocusNode('bulacan')}
              >
                Wafer Lab
              </button>
              <button
                type="button"
                className="ctrl h-11 lg:h-10 px-3 text-xs text-ink-2"
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
