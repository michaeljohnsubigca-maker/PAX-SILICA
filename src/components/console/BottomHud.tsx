import React, { useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, MapPin, ExternalLink, Cpu } from 'lucide-react';
import { CORRIDOR_NODES } from '../../data/nodes';

const ACRONYMS = new Set(['NCC', 'BCDA', 'RA', 'AI', 'R&D', 'LNG', 'ICT', 'PEZA', 'BPO']);

function formatRoleLabel(text: string): string {
  const cleaned = text.replace(/\s*•\s*/g, ', ');
  if (cleaned !== cleaned.toUpperCase()) return cleaned;
  return cleaned
    .toLowerCase()
    .replace(/\b([a-z0-9&-]+)\b/g, (word, _g1, offset) => {
      const upper = word.toUpperCase();
      if (ACRONYMS.has(upper)) return upper;
      if (offset === 0) return word.charAt(0).toUpperCase() + word.slice(1);
      return word;
    });
}

function formatMiddleDots(text: string): string {
  return text.replace(/\s*•\s*/g, ', ');
}

export interface BottomHudProps {
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

const NODE_JUMP_ITEMS = [
  { id: 'ncc', label: 'Capas Hub' },
  { id: 'bulacan', label: 'Wafer Lab' },
  { id: 'batangas', label: 'Batangas AI' },
  { id: 'subic', label: 'Subic Port' },
  { id: 'manila', label: 'Metro Manila' },
];

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
  const isHidden = opacity <= 0.02;
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hudRef.current;
    if (!el) return;
    (el as HTMLElement & { inert?: boolean }).inert = isHidden;
  }, [isHidden]);

  // 8px viewport margin + 320px panel + 8px gap = 336px
  const leftOffset = leftPanelCollapsed ? 'left-2' : 'left-[336px]';
  const rightOffset = rightPanelCollapsed ? 'right-2' : 'right-[336px]';

  return (
    <div
      ref={hudRef}
      id="bottomCenterHud"
      className={`hidden lg:flex absolute bottom-2 ${leftOffset} ${rightOffset} z-20 flex-col gap-2 transition-none`}
      style={{
        transform: `translate3d(0, ${translateY}px, 0)`,
        opacity,
        pointerEvents: !isHidden && pointerEvents ? 'auto' : 'none',
      }}
    >
      {/* Node Inspector Drawer */}
      {isDrawerOpen && (
        <div
          id="nodeInspectorDrawer"
          className="midnight-frame p-4 space-y-3 transition-none"
        >
          <div className="flex items-center justify-between gap-2 border-b border-rule pb-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-medium text-ink">
                {inspectedNode.fullTitle}
              </h3>
              <span className="text-xs px-2 py-0.5 bg-paper-2 border border-rule-2 text-ink-2">
                {formatRoleLabel(inspectedNode.role)}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted num">
                {inspectedNode.coordsText}
              </span>
              <button
                type="button"
                onClick={() => onSelectNode(inspectedNode.id)}
                className="ctrl h-8 px-2.5 text-xs flex items-center gap-1.5"
              >
                <span>Focus Camera</span>
                <ExternalLink className="w-3 h-3 text-accent" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-rule text-xs">
            <div className="py-2 md:py-0 md:pr-3 space-y-1">
              <div className="text-accent font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                <span>Zone Allocation</span>
              </div>
              <p className="text-ink-2 leading-snug">{inspectedNode.allocation}</p>
            </div>

            <div className="py-2 md:py-0 md:px-3 space-y-1">
              <div className="text-accent font-medium flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                <span>Suitors &amp; Consortia</span>
              </div>
              <p className="text-ink-2 leading-snug">{formatMiddleDots(inspectedNode.suitors)}</p>
            </div>

            <div className="py-2 md:py-0 md:pl-3 space-y-1">
              <div className="text-accent font-medium">Critical Dependencies</div>
              <p className="text-ink-2 leading-snug">{inspectedNode.dependencies}</p>
            </div>
          </div>

          <p className="text-xs text-ink-2 leading-relaxed midnight-well p-3">
            {inspectedNode.summary}
          </p>
        </div>
      )}

      {/* Floating Control Bar (segmented choices filled ink when chosen) */}
      <div className="midnight-frame p-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {NODE_JUMP_ITEMS.map((item) => {
            const isSelected = selectedNodeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => onHoverNode(item.id)}
                onMouseLeave={() => onHoverNode(null)}
                onClick={() => onSelectNode(item.id)}
                className={`ctrl h-8 px-2.5 text-xs ${
                  isSelected
                    ? 'bg-ink text-paper border-ink'
                    : 'text-ink-2 border-rule'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => onSelectNode('ALL')}
            className={`ctrl h-8 px-2.5 text-xs ${
              selectedNodeId === 'ALL'
                ? 'bg-paper-3 text-ink border-rule-2'
                : 'text-muted border-rule'
            }`}
          >
            Reset
          </button>
        </div>

        <button
          type="button"
          onClick={onToggleDrawer}
          className="ctrl h-8 px-3 text-xs text-ink flex items-center gap-2 shrink-0"
        >
          <span>{inspectedNode.name} Specs</span>
          {isDrawerOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
};

export default BottomHud;
