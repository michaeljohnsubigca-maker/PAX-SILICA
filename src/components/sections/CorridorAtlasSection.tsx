import React, { useState } from 'react';
import { Map, MapPin, Eye } from 'lucide-react';
import { CORRIDOR_NODES } from '../../data/nodes';
import { CorridorNode } from '../../types/domain';
import LuzonMap from '../map/LuzonMap';
import NodeInspectorDrawer from '../map/NodeInspectorDrawer';

export const CorridorAtlasSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<CorridorNode | null>(CORRIDOR_NODES.ncc);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);

  const handleSelectNode = (node: CorridorNode) => {
    setActiveNode(node);
    setIsDrawerOpen(true);
  };

  return (
    <section id="atlas" className="py-16 sm:py-24 border-t border-sandMuted/40 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-saharaTerracotta-500/30 bg-saharaTerracotta-500/10 text-saharaTerracotta-600 dark:text-saharaTerracotta-400 text-xs font-mono mb-4">
              <Map className="w-3.5 h-3.5" />
              <span>Geospatial Corridor Atlas</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 dark:text-stone-50 tracking-tight leading-tight mb-4">
              Interactive Luzon Economic Corridor Map
            </h2>
            <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
              Explore the five key economic nodes anchoring the semiconductor security corridor. Select any node marker on the map or use the quick switcher below to inspect zoning, suitors, and freight connectivity.
            </p>
          </div>

          {/* Quick Node Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {Object.values(CORRIDOR_NODES).map((node) => {
              const isSelected = activeNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => handleSelectNode(node)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-saharaTerracotta-500 text-white border-saharaTerracotta-600 shadow-sahara-soft'
                      : 'bg-sandSurface/80 dark:bg-panelDark text-stone-700 dark:text-stone-300 border-sandMuted/60 dark:border-stone-800 hover:border-saharaTerracotta-400'
                  }`}
                >
                  <MapPin className="w-3 h-3" style={{ color: isSelected ? '#ffffff' : node.color }} />
                  <span>{node.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Map Container with Drawer Overlay */}
        <div className="relative">
          <LuzonMap activeNode={activeNode} onSelectNode={handleSelectNode} />

          <NodeInspectorDrawer
            activeNode={activeNode}
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          />

          {!isDrawerOpen && activeNode && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="absolute top-4 right-4 z-20 px-3.5 py-2 rounded-xl bg-sandLinen/90 dark:bg-deepNavy/90 backdrop-blur-md border border-sandMuted/60 dark:border-stone-800 text-xs font-medium text-stone-800 dark:text-stone-200 shadow-sahara-card flex items-center gap-2 hover:border-saharaTerracotta-400 transition-colors"
            >
              <Eye className="w-4 h-4 text-saharaTerracotta-500" />
              <span>Inspect {activeNode.name}</span>
            </button>
          )}
        </div>

        {/* Corridor Legend & Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl border border-sandMuted/40 dark:border-stone-800 bg-sandSurface/40 dark:bg-panelDark/40">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Freight Rail Backbone
            </span>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              Subic-Clark-Manila-Batangas
            </div>
          </div>
          <div className="p-4 rounded-xl border border-sandMuted/40 dark:border-stone-800 bg-sandSurface/40 dark:bg-panelDark/40">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Flagship Zone
            </span>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              1,620 ha New Clark City
            </div>
          </div>
          <div className="p-4 rounded-xl border border-sandMuted/40 dark:border-stone-800 bg-sandSurface/40 dark:bg-panelDark/40">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Maritime Gateways
            </span>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              Subic Bay &amp; Batangas Port
            </div>
          </div>
          <div className="p-4 rounded-xl border border-sandMuted/40 dark:border-stone-800 bg-sandSurface/40 dark:bg-panelDark/40">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Transit Bottleneck Bypass
            </span>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              Bulacan Intermodal Hub
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorridorAtlasSection;
