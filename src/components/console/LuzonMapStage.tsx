import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { CORRIDOR_NODES } from '../../data/nodes';
import { CorridorNode } from '../../types/domain';

interface WebKitGestureEvent extends Event {
  scale?: number;
  clientX?: number;
  clientY?: number;
}

interface LuzonMapStageProps {
  selectedNodeId: string;
  hoveredNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onUpdateCoords: (coordsFormatted: string) => void;
  isWideView?: boolean;
}

function readTokenColor(tokenName: string, fallback: string): string {
  if (typeof window === 'undefined' || !document?.documentElement) return fallback;
  const val = getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
  return val || fallback;
}

export const LuzonMapStage: React.FC<LuzonMapStageProps> = ({
  selectedNodeId,
  hoveredNodeId,
  onSelectNode,
  onUpdateCoords,
  isWideView,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  const createMarkerHtml = (node: CorridorNode, isHighlighted: boolean, isSelected: boolean) => {
    const activeState = isHighlighted || isSelected ? 'is-active' : '';
    const ringSize = isHighlighted ? 'w-8 h-8' : 'w-6 h-6';

    return `
      <div class="corridor-node-wrapper w-12 h-12 group cursor-pointer">
        <span class="corridor-node-ring ${ringSize} ${activeState}"></span>
        <div class="corridor-node-core relative z-10 w-3 h-3 ${activeState}"></div>
        <div class="corridor-node-label absolute left-9 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 text-xs font-medium pointer-events-none">
          ${node.name}
        </div>
      </div>
    `;
  };

  // Initialize Map
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;
    if (mapInstanceRef.current) return;

    const accentColor = readTokenColor('--color-accent', 'currentColor');
    const accentSubtle = readTokenColor('--color-accent-2', 'currentColor');
    const inkSecondary = readTokenColor('--color-ink-2', 'currentColor');
    const mutedColor = readTokenColor('--color-muted', 'currentColor');
    const ruleSecondary = readTokenColor('--color-rule-2', 'currentColor');

    try {
      const map = L.map(container, {
        center: [14.68, 120.7],
        zoom: 8,
        minZoom: 6,
        maxZoom: 13,
        zoomControl: false,
        scrollWheelZoom: false,
        touchZoom: true,
        bounceAtZoomLimits: false,
        zoomSnap: 0,
        zoomDelta: 0.5,
      });
      mapInstanceRef.current = map;

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const cartoKey = import.meta.env.VITE_CARTO_API_KEY?.trim();

      const tileConfig = cartoKey
        ? {
            url: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${cartoKey}`,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a> | PAX SILICA ATLAS',
            subdomains: 'abcd',
            maxZoom: 20,
            detectRetina: true,
          }
        : {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            attribution:
              'Tiles &copy; <a href="https://www.esri.com" target="_blank" rel="noopener noreferrer">Esri</a> &mdash; Esri, DeLorme, NAVTEQ | PAX SILICA ATLAS',
            subdomains: 'abcd',
            maxZoom: 16,
            detectRetina: false,
          };

      L.tileLayer(tileConfig.url, {
        attribution: tileConfig.attribution,
        subdomains: tileConfig.subdomains,
        maxZoom: tileConfig.maxZoom,
        detectRetina: tileConfig.detectRetina,
      }).addTo(map);

      map.on('mousemove', (e) => {
        const formatted = `${e.latlng.lat.toFixed(4)}° N, ${e.latlng.lng.toFixed(4)}° E`;
        onUpdateCoords(formatted);
      });

      // 1. SCMB Rail Line (crisp vector spine, no animated dash or neon glow)
      const railCoords: [number, number][] = [
        CORRIDOR_NODES.subic.coords,
        CORRIDOR_NODES.ncc.coords,
        CORRIDOR_NODES.bulacan.coords,
        CORRIDOR_NODES.manila.coords,
        CORRIDOR_NODES.batangas.coords,
      ];

      L.polyline(railCoords, {
        color: accentColor,
        weight: 2.5,
        opacity: 0.9,
      })
        .bindTooltip('SCMB Freight Rail Spine (Subic, Clark, Bulacan, Manila, Batangas)', {
          sticky: true,
          className: 'pax-tooltip',
        })
        .addTo(map);

      // 2. 1,620-ha Economic Security Zone
      const nccRing = L.circle(CORRIDOR_NODES.ncc.coords, {
        radius: 11500,
        color: accentSubtle,
        weight: 1.2,
        dashArray: '4, 6',
        fillColor: accentSubtle,
        fillOpacity: 0.06,
      });

      const eszPoly = L.polygon(
        [
          [15.385, 120.495],
          [15.392, 120.568],
          [15.31, 120.578],
          [15.298, 120.502],
        ],
        {
          color: accentColor,
          weight: 1.5,
          fillColor: accentSubtle,
          fillOpacity: 0.2,
        }
      ).bindTooltip('1,620-ha (4,000-acre) Pax Silica Security Zone (Capas, Tarlac)', {
        sticky: true,
        className: 'pax-tooltip',
      });

      L.layerGroup([nccRing, eszPoly]).addTo(map);

      // 3. Minerals & Grid
      const mineralFeed = L.polyline(
        [
          [15.52, 119.98],
          [15.15, 120.12],
          CORRIDOR_NODES.subic.coords,
          CORRIDOR_NODES.ncc.coords,
        ],
        {
          color: inkSecondary,
          weight: 1.8,
          dashArray: '6, 6',
          opacity: 0.85,
        }
      ).bindTooltip('Zambales Critical Mineral Feed (Nickel, Copper, Chromite to Tarlac)', {
        sticky: true,
        className: 'pax-tooltip',
      });

      const batangasGridConnect = L.polyline(
        [CORRIDOR_NODES.batangas.coords, [14.15, 121.15], CORRIDOR_NODES.manila.coords],
        {
          color: mutedColor,
          weight: 1.8,
          dashArray: '3, 6',
          opacity: 0.85,
        }
      ).bindTooltip('Southern Luzon Clean Power Grid (Batangas LNG and Solar to Corridor)', {
        sticky: true,
        className: 'pax-tooltip',
      });

      L.layerGroup([mineralFeed, batangasGridConnect]).addTo(map);

      // 4. Watershed Protected Boundary (cool Midnight boundary tone)
      L.polygon(
        [
          [15.25, 120.35],
          [15.32, 120.38],
          [15.29, 120.46],
          [15.21, 120.43],
          [15.18, 120.36],
        ],
        {
          color: ruleSecondary,
          weight: 1.5,
          dashArray: '6, 6',
          fillColor: inkSecondary,
          fillOpacity: 0.08,
        }
      )
        .bindTooltip('Mt. Pinatubo Watershed & Ancestral Domain Protection Buffer', {
          sticky: true,
          className: 'pax-tooltip',
        })
        .addTo(map);

      // 5. Add Corridor Markers
      Object.values(CORRIDOR_NODES).forEach((node) => {
        const icon = L.divIcon({
          className: 'custom-leaflet-node',
          html: createMarkerHtml(node, false, selectedNodeId === node.id),
          iconSize: [48, 48],
          iconAnchor: [24, 24],
        });

        const marker = L.marker(node.coords, { icon }).addTo(map);
        marker.on('click', () => {
          onSelectNode(node.id);
        });

        markersRef.current[node.id] = marker;
      });
    } catch {
      // Graceful fallback for non-browser/test environments
    }

    let lastWheelPinchTime = 0;
    let gestureStartZoom = mapInstanceRef.current?.getZoom() ?? 8;

    const getPinchPoint = (clientX?: number, clientY?: number) => {
      const rect = container.getBoundingClientRect();
      const hasClientCoords =
        typeof clientX === 'number' &&
        typeof clientY === 'number' &&
        (clientX !== 0 || clientY !== 0);

      return hasClientCoords
        ? L.point(clientX - rect.left, clientY - rect.top)
        : L.point(rect.width / 2, rect.height / 2);
    };

    const applyPinchZoom = (targetZoom: number, clientX?: number, clientY?: number) => {
      const map = mapInstanceRef.current;
      if (!map) return;

      const minZoom = map.getMinZoom();
      const maxZoom = map.getMaxZoom();
      const nextZoom = Math.min(maxZoom, Math.max(minZoom, targetZoom));
      if (nextZoom !== map.getZoom()) {
        map.setZoomAround(getPinchPoint(clientX, clientY), nextZoom, { animate: false });
      }
    };

    const handleWheelPinch = (e: WheelEvent) => {
      // Only intercept trackpad pinch gestures; leave normal scroll for #scrollRunway
      if (!e.ctrlKey && !e.metaKey) return;

      e.preventDefault();
      e.stopPropagation();
      lastWheelPinchTime = Date.now();

      const map = mapInstanceRef.current;
      if (!map) return;

      const modeMultiplier = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1;
      const rawDelta = -e.deltaY * modeMultiplier * 0.015;
      const clampedDelta = Math.max(-0.6, Math.min(0.6, rawDelta));
      applyPinchZoom(map.getZoom() + clampedDelta, e.clientX, e.clientY);
    };

    const handleGestureStart = (e: Event) => {
      e.preventDefault();
      if (mapInstanceRef.current) {
        gestureStartZoom = mapInstanceRef.current.getZoom();
      }
    };

    const handleGestureChange = (e: Event) => {
      e.preventDefault();
      if (Date.now() - lastWheelPinchTime < 100) return;

      const gestureEvent = e as WebKitGestureEvent;
      const map = mapInstanceRef.current;
      if (!map || typeof gestureEvent.scale !== 'number' || gestureEvent.scale <= 0) {
        return;
      }

      const targetZoom = map.getScaleZoom(gestureEvent.scale, gestureStartZoom);
      applyPinchZoom(targetZoom, gestureEvent.clientX, gestureEvent.clientY);
    };

    const handleGestureEnd = (e: Event) => {
      e.preventDefault();
    };

    container.addEventListener('wheel', handleWheelPinch, { passive: false });
    container.addEventListener('gesturestart', handleGestureStart, { passive: false });
    container.addEventListener('gesturechange', handleGestureChange, { passive: false });
    container.addEventListener('gestureend', handleGestureEnd, { passive: false });

    const handleResize = () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.invalidateSize();
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('wheel', handleWheelPinch);
      container.removeEventListener('gesturestart', handleGestureStart);
      container.removeEventListener('gesturechange', handleGestureChange);
      container.removeEventListener('gestureend', handleGestureEnd);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {
          // ignore
        }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update marker icons on selected/hovered change
  useEffect(() => {
    Object.values(CORRIDOR_NODES).forEach((node) => {
      const marker = markersRef.current[node.id];
      if (marker) {
        const isSelected = selectedNodeId === node.id;
        const isHighlighted = hoveredNodeId === node.id;
        const newHtml = createMarkerHtml(node, isHighlighted, isSelected);
        const icon = L.divIcon({
          className: 'custom-leaflet-node',
          html: newHtml,
          iconSize: [48, 48],
          iconAnchor: [24, 24],
        });
        marker.setIcon(icon);
      }
    });
  }, [selectedNodeId, hoveredNodeId]);

  // Pan / Zoom when selected node changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    try {
      if (selectedNodeId === 'ALL') {
        mapInstanceRef.current.flyTo([14.68, 120.7], 8, { duration: 1.1 });
      } else {
        const node = CORRIDOR_NODES[selectedNodeId];
        if (node) {
          const targetZoom = node.id === 'ncc' ? 10 : 10.5;
          mapInstanceRef.current.flyTo(node.coords, targetZoom, { duration: 0.95 });
        }
      }
    } catch {
      // ignore
    }
  }, [selectedNodeId]);

  // Invalidate map size on layout/wide view toggles
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        try {
          mapInstanceRef.current?.invalidateSize();
        } catch {
          // ignore
        }
      }, 310);
    }
  }, [isWideView]);

  return (
    <>
      <div id="luzonMap" ref={mapContainerRef} className="absolute inset-0 w-full h-full z-10" />
      <div className="map-vignette absolute inset-0 z-10 pointer-events-none" />
    </>
  );
};

export default LuzonMapStage;
