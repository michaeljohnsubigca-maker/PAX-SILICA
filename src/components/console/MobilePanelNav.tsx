import React from 'react';
import { Radio, Map, ShieldCheck } from 'lucide-react';

interface MobilePanelNavProps {
  activeMobilePanel: 'news' | 'map' | 'ledger';
  onSelectMobilePanel: (panel: 'news' | 'map' | 'ledger') => void;
  dispatchesCount: number;
}

export const MobilePanelNav: React.FC<MobilePanelNavProps> = ({
  activeMobilePanel,
  onSelectMobilePanel,
  dispatchesCount,
}) => {
  const activeClass =
    'ctrl h-11 px-2 text-xs bg-ink text-paper border-ink flex items-center justify-center gap-1.5';
  const inactiveClass =
    'ctrl h-11 px-2 text-xs text-ink-2 border-rule flex items-center justify-center gap-1.5';

  return (
    <nav
      aria-label="Console views"
      className="lg:hidden absolute bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-[max(0.5rem,env(safe-area-inset-left))] right-[max(0.5rem,env(safe-area-inset-right))] z-30 midnight-frame p-2 flex items-center justify-between gap-2"
    >
      <button
        id="mobileTabNews"
        type="button"
        onClick={() => onSelectMobilePanel('news')}
        className={`flex-1 ${activeMobilePanel === 'news' ? activeClass : inactiveClass}`}
      >
        <Radio className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Dispatches</span>
        <span
          id="mobileNewsCountBadge"
          className={`text-xs px-1.5 py-0.5 num ${
            activeMobilePanel === 'news'
              ? 'bg-paper-2 text-ink'
              : 'bg-paper-2 text-ink-2'
          }`}
        >
          {dispatchesCount}
        </span>
      </button>

      <button
        id="mobileTabMap"
        type="button"
        onClick={() => onSelectMobilePanel('map')}
        className={`flex-1 ${activeMobilePanel === 'map' ? activeClass : inactiveClass}`}
      >
        <Map className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Corridor Map</span>
      </button>

      <button
        id="mobileTabLedger"
        type="button"
        onClick={() => onSelectMobilePanel('ledger')}
        className={`flex-1 ${activeMobilePanel === 'ledger' ? activeClass : inactiveClass}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Ledger</span>
      </button>
    </nav>
  );
};

export default MobilePanelNav;
