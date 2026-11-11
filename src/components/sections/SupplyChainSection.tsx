import React, { useState } from 'react';
import { GitCommit, Check } from 'lucide-react';
import { SUPPLY_CHAIN_STAGES } from '../../data/supplyChain';
import SupplyChainNodeCard from '../ui/SupplyChainNodeCard';

export const SupplyChainSection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>(SUPPLY_CHAIN_STAGES[0].id);

  const activeStage =
    SUPPLY_CHAIN_STAGES.find((s) => s.id === activeStageId) || SUPPLY_CHAIN_STAGES[0];

  return (
    <section id="supply-chain" className="py-16 sm:py-24 border-t border-sandMuted/40 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-saharaTerracotta-500/30 bg-saharaTerracotta-500/10 text-saharaTerracotta-600 dark:text-saharaTerracotta-400 text-xs font-mono mb-4">
            <GitCommit className="w-3.5 h-3.5" />
            <span>End-to-End Value Chain</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 dark:text-stone-50 tracking-tight leading-tight mb-4">
            The 4-Stage Semiconductor Supply Chain
          </h2>
          <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
            From raw nickel and copper extraction to cleanroom pilot fabrication and clean grid integration, explore how the Luzon Economic Corridor keeps strategic high-tech value inside the Philippines.
          </p>
        </div>

        {/* 4 Stage Stepper Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {SUPPLY_CHAIN_STAGES.map((st) => {
            const isActive = st.id === activeStageId;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStageId(st.id)}
                aria-label={`Stage ${st.stageNumber}`}
                className={`p-4 rounded-xl text-left transition-all border ${
                  isActive
                    ? 'bg-saharaTerracotta-500 text-white border-saharaTerracotta-600 shadow-sahara-card'
                    : 'bg-sandSurface/60 dark:bg-panelDark/60 text-stone-700 dark:text-stone-300 border-sandMuted/50 dark:border-stone-800 hover:border-saharaTerracotta-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-semibold ${isActive ? 'text-white/90' : 'text-saharaTerracotta-600 dark:text-saharaTerracotta-400'}`}>
                    STAGE {st.stageNumber}
                  </span>
                  {isActive && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="font-serif text-sm sm:text-base font-normal leading-snug truncate">
                  {st.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Card */}
        <SupplyChainNodeCard stage={activeStage} />
      </div>
    </section>
  );
};

export default SupplyChainSection;
