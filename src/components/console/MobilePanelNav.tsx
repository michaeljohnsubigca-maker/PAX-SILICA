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
  const baseClass =
    'mobile-nav-tab min-h-[44px] py-1.5 px-1 flex flex-col items-center justify-center gap-0.5 text-xs leading-tight font-medium cursor-pointer focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-[-2px]';
  const activeClass = `${baseClass} bg-paper-2 text-ink`;
  const inactiveClass = `${baseClass} bg-transparent text-muted`;

  return (
    <nav
      aria-label="Console views"
      className="lg:hidden absolute bottom-0 left-0 right-0 z-30 bg-paper-scrim border-t border-rule pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]"
    >
      <div className="grid grid-cols-3 divide-x divide-rule/60">
        <button
          id="mobileTabNews"
          type="button"
          aria-current={activeMobilePanel === 'news' ? 'page' : undefined}
          onClick={() => onSelectMobilePanel('news')}
          className={activeMobilePanel === 'news' ? activeClass : inactiveClass}
        >
          <Radio
            className={`w-3.5 h-3.5 shrink-0 ${
              activeMobilePanel === 'news' ? 'text-accent' : 'text-muted'
            }`}
            aria-hidden="true"
          />
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <span>Dispatches</span>
            <span
              id="mobileNewsCountBadge"
              className="text-xs px-1 py-0 bg-paper-3 text-ink-2 border border-rule num leading-tight"
            >
              {dispatchesCount}
            </span>
          </span>
        </button>

        <button
          id="mobileTabMap"
          type="button"
          aria-current={activeMobilePanel === 'map' ? 'page' : undefined}
          onClick={() => onSelectMobilePanel('map')}
          className={activeMobilePanel === 'map' ? activeClass : inactiveClass}
        >
          <Map
            className={`w-3.5 h-3.5 shrink-0 ${
              activeMobilePanel === 'map' ? 'text-accent' : 'text-muted'
            }`}
            aria-hidden="true"
          />
          <span className="whitespace-nowrap">Corridor Map</span>
        </button>

        <button
          id="mobileTabLedger"
          type="button"
          aria-current={activeMobilePanel === 'ledger' ? 'page' : undefined}
          onClick={() => onSelectMobilePanel('ledger')}
          className={activeMobilePanel === 'ledger' ? activeClass : inactiveClass}
        >
          <ShieldCheck
            className={`w-3.5 h-3.5 shrink-0 ${
              activeMobilePanel === 'ledger' ? 'text-accent' : 'text-muted'
            }`}
            aria-hidden="true"
          />
          <span className="whitespace-nowrap">Ledger</span>
        </button>
      </div>
    </nav>
  );
};

export default MobilePanelNav;
