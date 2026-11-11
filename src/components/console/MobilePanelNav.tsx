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
    'py-1 px-2 rounded-lg text-[10px] font-mono font-medium bg-saharaTerracotta-500/25 text-sandOchre-200 border border-saharaTerracotta-500/40 flex items-center justify-center gap-1.5';
  const inactiveClass =
    'py-1 px-2 rounded-lg text-[10px] font-mono font-medium bg-white/5 text-stone-400 border border-white/5 flex items-center justify-center gap-1.5';

  return (
    <div className="lg:hidden absolute bottom-3 left-3 right-3 z-30 glass-panel rounded-2xl p-1.5 flex items-center justify-between gap-1 shadow-glass-elevated">
      <button
        id="mobileTabNews"
        onClick={() => onSelectMobilePanel('news')}
        className={`flex-1 ${activeMobilePanel === 'news' ? activeClass : inactiveClass}`}
      >
        <Radio className="w-3.5 h-3.5 text-saharaTerracotta-400" />
        <span>Dispatches</span>
        <span
          id="mobileNewsCountBadge"
          className="ml-1 text-[9px] px-1.5 py-0.2 bg-saharaTerracotta-500/30 text-sandOchre-200 rounded-full font-bold"
        >
          {dispatchesCount}
        </span>
      </button>

      <button
        id="mobileTabMap"
        onClick={() => onSelectMobilePanel('map')}
        className={`flex-1 ${activeMobilePanel === 'map' ? activeClass : inactiveClass}`}
      >
        <Map className="w-3.5 h-3.5 text-telemetryEmerald-400" />
        <span>Corridor Map</span>
      </button>

      <button
        id="mobileTabLedger"
        onClick={() => onSelectMobilePanel('ledger')}
        className={`flex-1 ${activeMobilePanel === 'ledger' ? activeClass : inactiveClass}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-siliconAmber-400" />
        <span>Audit Ledger</span>
      </button>
    </div>
  );
};

export default MobilePanelNav;
