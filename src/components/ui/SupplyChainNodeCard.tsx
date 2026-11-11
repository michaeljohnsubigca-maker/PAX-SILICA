import React from 'react';
import { Layers, MapPin, ArrowRight, CheckCircle, Factory } from 'lucide-react';
import { SupplyChainStage } from '../../types/domain';

interface SupplyChainNodeCardProps {
  stage: SupplyChainStage;
}

export const SupplyChainNodeCard: React.FC<SupplyChainNodeCardProps> = ({ stage }) => {
  return (
    <div className="p-7 rounded-2xl bg-sandSurface/80 dark:bg-panelDark border border-sandMuted/60 dark:border-stone-800 shadow-sahara-card transition-all duration-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-sandMuted/40 dark:border-stone-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-saharaTerracotta-600 dark:text-saharaTerracotta-400">
            {stage.stage}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 mt-1">
            {stage.title}
          </h3>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sandLinen dark:bg-deepNavy border border-sandMuted/60 dark:border-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300">
          <MapPin className="w-3.5 h-3.5 text-saharaTerracotta-500" />
          <span>{stage.nodeTag}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-base text-stone-700 dark:text-stone-300 leading-relaxed mb-6">
        {stage.description}
      </p>

      {/* Key Metrics Pill */}
      <div className="p-4 rounded-xl bg-sandLinen/90 dark:bg-deepNavy/90 border border-sandMuted/50 dark:border-stone-800 mb-6">
        <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-saharaTerracotta-500" />
          <span>Output &amp; Focus Areas</span>
        </div>
        <div className="font-mono text-sm font-semibold text-stone-900 dark:text-stone-100">
          {stage.metrics}
        </div>
      </div>

      {/* Inputs vs Value Add Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-sandMuted/40 dark:border-stone-800 bg-sandSurface/40 dark:bg-panelDark/40">
          <div className="flex items-center gap-1.5 text-xs font-mono text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">
            <Factory className="w-3.5 h-3.5 text-amber-500" />
            <span>Feedstock Inputs</span>
          </div>
          <div className="text-xs text-stone-800 dark:text-stone-200 leading-normal">
            {stage.inputs}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Domestic Value-Add</span>
          </div>
          <div className="text-xs text-stone-800 dark:text-stone-200 leading-normal">
            {stage.domesticValueAdd}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainNodeCard;
