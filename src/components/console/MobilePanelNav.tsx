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
    'py-1 px-2 rounded-lg text-[10px] font-mono font-medium bg-blue-600/35 text-white border border-blue-400/60 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer';
  const inactiveClass =
    'py-1 px-2 rounded-lg text-[10px] font-mono font-medium bg-white/5 text-slate-300 border border-white/5 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer';

  return (
    <div className="lg:hidden absolute bottom-3 left-3 right-3 z-30 glass-panel rounded-2xl p-1.5 flex items-center justify-between gap-1 shadow-glass-elevated">
      <button
        id="mobileTabNews"
        onClick={() => onSelectMobilePanel('news')}
        className={`flex-1 ${activeMobilePanel === 'news' ? activeClass : inactiveClass}`}
      >
        <Radio className="w-3.5 h-3.5 text-blue-400" />
        <span>Dispatches</span>
        <span
          id="mobileNewsCountBadge"
          className="ml-1 text-[9px] px-1.5 py-0.2 bg-blue-500/30 text-white rounded-full font-bold"
        >
          {dispatchesCount}
        </span>
      </button>

      <button
        id="mobileTabMap"
        onClick={() => onSelectMobilePanel('map')}
        className={`flex-1 ${activeMobilePanel === 'map' ? activeClass : inactiveClass}`}
      >
        <Map className="w-3.5 h-3.5 text-sky-400" />
        <span>Corridor Map</span>
      </button>

      <button
        id="mobileTabLedger"
        onClick={() => onSelectMobilePanel('ledger')}
        className={`flex-1 ${activeMobilePanel === 'ledger' ? activeClass : inactiveClass}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
        <span>Audit Ledger</span>
      </button>
    </div>
  );
};

export default MobilePanelNav;
