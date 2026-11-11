import React from 'react';
import { X, MapPin, Building, Globe, Train, CheckCircle2 } from 'lucide-react';
import { CorridorNode } from '../../types/domain';

interface NodeInspectorDrawerProps {
  activeNode: CorridorNode | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NodeInspectorDrawer: React.FC<NodeInspectorDrawerProps> = ({
  activeNode,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !activeNode) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Node inspector drawer"
      className="absolute top-4 right-4 bottom-4 w-full sm:w-96 max-w-[calc(100vw-2rem)] z-30 rounded-2xl bg-sandLinen/95 dark:bg-deepNavy/95 backdrop-blur-md border border-sandMuted/70 dark:border-stone-800 p-6 shadow-sahara-card flex flex-col justify-between overflow-y-auto animate-fadeIn"
    >
      <div>
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-sandMuted/40 dark:border-stone-800 mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border border-saharaTerracotta-500/30 bg-saharaTerracotta-500/10 text-saharaTerracotta-600 dark:text-saharaTerracotta-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>{activeNode.coordsText}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close inspector"
            className="p-1.5 rounded-lg border border-sandMuted/60 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:border-saharaTerracotta-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Node Title & Role */}
        <span className="text-[11px] font-mono uppercase tracking-widest text-saharaTerracotta-600 dark:text-saharaTerracotta-400">
          {activeNode.role}
        </span>
        <h3 className="font-serif text-2xl font-normal text-stone-900 dark:text-stone-100 mt-1 mb-4 leading-tight">
          {activeNode.fullTitle}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-6">
          {activeNode.description}
        </p>

        {/* Specification Points */}
        <div className="space-y-3.5 mb-6">
          <div className="p-3 rounded-xl bg-sandSurface/60 dark:bg-panelDark/60 border border-sandMuted/40 dark:border-stone-800">
            <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Building className="w-3 h-3 text-saharaTerracotta-500" />
              <span>Zone Allocation</span>
            </div>
            <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
              {activeNode.allocation}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-sandSurface/60 dark:bg-panelDark/60 border border-sandMuted/40 dark:border-stone-800">
            <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Globe className="w-3 h-3 text-amber-500" />
              <span>Industry Suitors</span>
            </div>
            <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
              {activeNode.suitors}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-sandSurface/60 dark:bg-panelDark/60 border border-sandMuted/40 dark:border-stone-800">
            <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Train className="w-3 h-3 text-emerald-600" />
              <span>Logistics Spine</span>
            </div>
            <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
              {activeNode.logistics}
            </div>
          </div>
        </div>

        {/* Key Projects */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
            Anchor Strategic Projects
          </div>
          <ul className="space-y-1.5">
            {activeNode.keyProjects.map((proj, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-saharaTerracotta-500 shrink-0" />
                <span>{proj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-sandMuted/40 dark:border-stone-800 mt-6">
        <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400 text-center">
          Vetted under Philippine Republic Act No. 7227
        </div>
      </div>
    </div>
  );
};

export default NodeInspectorDrawer;
