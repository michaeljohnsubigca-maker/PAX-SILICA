import React from 'react';
import { ChevronUp, ChevronDown, MapPin, ExternalLink, Cpu } from 'lucide-react';
import { CORRIDOR_NODES } from '../../data/nodes';

interface BottomHudProps {
  selectedNodeId: string;
  inspectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  onHoverNode: (nodeId: string | null) => void;
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
  opacity: number;
  translateY: number;
  pointerEvents: boolean;
}

export const BottomHud: React.FC<BottomHudProps> = ({
  selectedNodeId,
  inspectedNodeId,
  onSelectNode,
  onHoverNode,
  isDrawerOpen,
  onToggleDrawer,
  leftPanelCollapsed,
  rightPanelCollapsed,
  opacity,
  translateY,
  pointerEvents,
}) => {
  const inspectedNode = CORRIDOR_NODES[inspectedNodeId] || CORRIDOR_NODES.ncc;

  const leftOffset = leftPanelCollapsed ? 'left-6' : 'left-[325px] xl:left-[340px]';
  const rightOffset = rightPanelCollapsed ? 'right-6' : 'right-[325px] xl:right-[340px]';

  return (
    <div
      id="bottomCenterHud"
      className={`hidden lg:flex absolute bottom-3 ${leftOffset} ${rightOffset} z-20 flex-col gap-2 transition-all duration-300`}
      style={{
        transform: `translate3d(0, ${translateY}px, 0)`,
        opacity,
        pointerEvents: pointerEvents ? 'auto' : 'none',
      }}
    >
      {/* Node Inspector Drawer */}
      {isDrawerOpen && (
        <div
          id="nodeInspectorDrawer"
          className="glass-panel rounded-2xl p-3 border border-saharaTerracotta-500/30 shadow-glass-elevated space-y-2.5 transition-all duration-300 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-saharaTerracotta-500/20 pb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: inspectedNode.color }}
              ></span>
              <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                {inspectedNode.fullTitle}
              </h3>
              <span className={`font-mono text-[9px] px-2 py-0.5 rounded-full border ${inspectedNode.badgeClass}`}>
                {inspectedNode.role}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-stone-400">
                {inspectedNode.coordsText}
              </span>
              <button
                onClick={() => onSelectNode(inspectedNode.id)}
                className="px-2 py-0.5 rounded-lg bg-saharaTerracotta-500/20 hover:bg-saharaTerracotta-500/30 text-sandOchre-200 border border-saharaTerracotta-500/40 font-mono text-[10px] flex items-center gap-1 transition"
              >
                <span>Focus Camera</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
            {/* Allocation */}
            <div className="bg-surfaceObsidian/90 rounded-xl p-2.5 border border-saharaTerracotta-500/20 space-y-1">
              <div className="font-mono text-[9px] uppercase tracking-wider text-saharaTerracotta-400 font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-saharaTerracotta-400" />
                <span>Zone Allocation</span>
              </div>
              <p className="text-stone-200 leading-snug">{inspectedNode.allocation}</p>
            </div>

            {/* Suitors */}
            <div className="bg-surfaceObsidian/90 rounded-xl p-2.5 border border-saharaTerracotta-500/20 space-y-1">
              <div className="font-mono text-[9px] uppercase tracking-wider text-siliconAmber-400 font-bold flex items-center gap-1">
                <Cpu className="w-3 h-3 text-siliconAmber-400" />
                <span>Suitors &amp; Consortia</span>
              </div>
              <p className="text-stone-200 leading-snug">{inspectedNode.suitors}</p>
            </div>

            {/* Dependencies */}
            <div className="bg-surfaceObsidian/90 rounded-xl p-2.5 border border-saharaTerracotta-500/20 space-y-1">
              <div className="font-mono text-[9px] uppercase tracking-wider text-telemetryEmerald-400 font-bold">
                Critical Dependencies
              </div>
              <p className="text-stone-200 leading-snug">{inspectedNode.dependencies}</p>
            </div>
          </div>

          <p className="text-[11px] text-stone-300 leading-relaxed font-normal bg-black/30 p-2 rounded-lg border border-stone-800">
            {inspectedNode.summary}
          </p>
        </div>
      )}

      {/* Floating Control Bar */}
      <div className="glass-panel rounded-2xl px-3 py-1.5 flex items-center justify-between gap-2 border border-saharaTerracotta-500/30 shadow-glass-elevated">
        {/* Node Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          {[
            { id: 'ncc', label: 'Capas Hub', dotColor: '#c2652a' },
            { id: 'bulacan', label: 'Wafer Lab', dotColor: '#fbbf24' },
            { id: 'batangas', label: 'Batangas AI', dotColor: '#d97706' },
            { id: 'subic', label: 'Subic Port', dotColor: '#e07a3f' },
            { id: 'manila', label: 'Metro Manila', dotColor: '#10b981' },
          ].map((item) => {
            const isSelected = selectedNodeId === item.id;
            return (
              <button
                key={item.id}
                onMouseEnter={() => onHoverNode(item.id)}
                onMouseLeave={() => onHoverNode(null)}
                onClick={() => onSelectNode(item.id)}
                className={`px-2.5 py-1 rounded-xl font-mono text-[11px] transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-saharaTerracotta-500/30 text-sandOchre-100 border border-saharaTerracotta-400/60 shadow-sm'
                    : 'bg-surfaceObsidian/80 hover:bg-stone-800/80 text-stone-300 border border-saharaTerracotta-500/20'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: item.dotColor }}
                ></span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => onSelectNode('ALL')}
            className={`px-2.5 py-1 rounded-xl font-mono text-[11px] transition cursor-pointer whitespace-nowrap ${
              selectedNodeId === 'ALL'
                ? 'bg-saharaTerracotta-500/30 text-sandOchre-100 border border-saharaTerracotta-400/60'
                : 'bg-surfaceObsidian/80 hover:bg-stone-800/80 text-stone-400 border border-saharaTerracotta-500/20'
            }`}
          >
            Reset
          </button>
        </div>

        {/* Toggle Drawer Button */}
        <button
          onClick={onToggleDrawer}
          className="px-3 py-1 rounded-xl bg-saharaTerracotta-500/15 hover:bg-saharaTerracotta-500/25 border border-saharaTerracotta-500/35 font-mono text-[11px] text-sandOchre-200 flex items-center gap-1.5 shrink-0 transition cursor-pointer"
        >
          <span>{inspectedNode.name} Specs</span>
          {isDrawerOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-saharaTerracotta-400" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-saharaTerracotta-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default BottomHud;
