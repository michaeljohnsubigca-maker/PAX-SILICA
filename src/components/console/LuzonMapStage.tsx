import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { CORRIDOR_NODES } from '../../data/nodes';
import { CorridorNode } from '../../types/domain';

interface LuzonMapStageProps {
  selectedNodeId: string;
  hoveredNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onUpdateCoords: (coordsFormatted: string) => void;
  isWideView?: boolean;
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
    const haloClass = isHighlighted ? 'node-halo-fast' : 'node-halo';
    const haloSize = isHighlighted ? 'w-12 h-12' : 'w-9 h-9';
    const coreScale = isHighlighted ? 'scale-125' : isSelected ? 'scale-110' : 'scale-100';

    return `
      <div class="corridor-node-wrapper w-12 h-12 group cursor-pointer">
        <span class="${haloClass} ${haloSize}" style="background-color: ${node.color}33; border: 1.5px solid ${node.color};"></span>
        <div class="relative z-10 w-3.5 h-3.5 rounded-full border-2 border-[#fff7ed] transition-transform duration-200 ${coreScale}" style="background-color: ${node.color}; box-shadow: 0 0 16px ${node.color};"></div>
        <div class="absolute left-9 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-lg bg-[#141210]/95 backdrop-blur-md border text-[10px] font-mono font-bold tracking-tight shadow-xl pointer-events-none" style="border-color: ${node.color}88; color: #FFF7ED;">
          ${node.name}
        </div>
      </div>
    `;
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        center: [14.68, 120.7],
        zoom: 8,
        minZoom: 6,
        maxZoom: 13,
        zoomControl: false,
        scrollWheelZoom: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO | PAX SILICA SAHARA ATLAS',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      map.on('mousemove', (e) => {
        const formatted = `${e.latlng.lat.toFixed(4)}° N, ${e.latlng.lng.toFixed(4)}° E`;
        onUpdateCoords(formatted);
      });

      // 1. SCMB Rail Line
      const railCoords: [number, number][] = [
        CORRIDOR_NODES.subic.coords,
        CORRIDOR_NODES.ncc.coords,
        CORRIDOR_NODES.bulacan.coords,
        CORRIDOR_NODES.manila.coords,
        CORRIDOR_NODES.batangas.coords,
      ];

      const railGlow = L.polyline(railCoords, { color: '#c2652a', weight: 6, opacity: 0.3 });
      const railCore = L.polyline(railCoords, {
        color: '#e07a3f',
        weight: 2.5,
        opacity: 0.95,
        className: 'rail-spine-flow',
      }).bindTooltip('SCMB Freight Rail Spine (Subic → Clark → Bulacan → Manila → Batangas)', {
        sticky: true,
        className: 'pax-tooltip',
      });

      L.layerGroup([railGlow, railCore]).addTo(map);

      // 2. 1,620-ha Economic Security Zone
      const nccRing = L.circle(CORRIDOR_NODES.ncc.coords, {
        radius: 11500,
        color: '#10B981',
        weight: 1.2,
        dashArray: '4, 6',
        fillColor: '#10B981',
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
          color: '#10B981',
          weight: 2,
          fillColor: '#10B981',
          fillOpacity: 0.24,
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
          color: '#f59e0b',
          weight: 2.2,
          opacity: 0.92,
          className: 'mineral-feed-flow',
        }
      ).bindTooltip('Zambales Critical Mineral Feed (Nickel, Copper, Chromite → Tarlac)', {
        sticky: true,
        className: 'pax-tooltip',
      });

      const batangasGridConnect = L.polyline(
        [CORRIDOR_NODES.batangas.coords, [14.15, 121.15], CORRIDOR_NODES.manila.coords],
        {
          color: '#10b981',
          weight: 2,
          dashArray: '3, 6',
          opacity: 0.85,
        }
      ).bindTooltip('Southern Luzon Clean Power Grid (Batangas LNG/Solar → Corridor)', {
        sticky: true,
        className: 'pax-tooltip',
      });

      L.layerGroup([mineralFeed, batangasGridConnect]).addTo(map);

      // 4. Watershed Protected Boundary
      L.polygon(
        [
          [15.25, 120.35],
          [15.32, 120.38],
          [15.29, 120.46],
          [15.21, 120.43],
          [15.18, 120.36],
        ],
        {
          color: '#ef4444',
          weight: 1.5,
          dashArray: '6, 6',
          fillColor: '#ef4444',
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

      mapInstanceRef.current = map;
    } catch {
      // Graceful fallback for non-browser/test environments
    }

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
