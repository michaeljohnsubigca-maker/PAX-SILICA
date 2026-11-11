import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { CORRIDOR_NODES } from '../../data/nodes';
import { CorridorNode } from '../../types/domain';
import { useTheme } from '../../context/ThemeContext';

interface LuzonMapProps {
  activeNode: CorridorNode | null;
  onSelectNode: (node: CorridorNode) => void;
}

export const LuzonMap: React.FC<LuzonMapProps> = ({ activeNode, onSelectNode }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const { theme } = useTheme();

  // 1. Initialize map once on mount
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        center: [14.9, 120.8],
        zoom: 8,
        minZoom: 7,
        maxZoom: 12,
        zoomControl: true,
        attributionControl: true,
      });

      const tileUrl =
        theme === 'dark'
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

      const tileLayer = L.tileLayer(tileUrl, {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 19,
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Connect Corridor Polyline
      const corridorCoords: [number, number][] = [
        CORRIDOR_NODES.subic.coords,
        CORRIDOR_NODES.ncc.coords,
        CORRIDOR_NODES.bulacan.coords,
        CORRIDOR_NODES.manila.coords,
        CORRIDOR_NODES.batangas.coords,
      ];

      L.polyline(corridorCoords, {
        color: '#c2652a',
        weight: 3.5,
        opacity: 0.8,
        dashArray: '6, 8',
      }).addTo(map);

      // Add Custom Markers
      Object.values(CORRIDOR_NODES).forEach((node) => {
        const customIcon = L.divIcon({
          className: 'custom-corridor-marker',
          html: `
            <div style="
              width: 18px;
              height: 18px;
              background-color: ${node.color};
              border: 3px solid #faf5ee;
              border-radius: 50%;
              box-shadow: 0 0 12px ${node.color}88;
              cursor: pointer;
            "></div>
          `,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });

        const marker = L.marker(node.coords, { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          onSelectNode(node);
        });

        markersRef.current[node.id] = marker;
      });

      mapInstanceRef.current = map;
    } catch {
      // Graceful fallback for non-browser/test environments
    }

    // Window resize & visibility handlers (Review Focus #2)
    const handleResize = () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.invalidateSize();
        } catch {
          // Safe fallback
        }
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        tileLayerRef.current = null;
      }
    };
  }, []);

  // 2. Seamlessly update tile layer on theme switch without recreating map instance
  useEffect(() => {
    if (tileLayerRef.current) {
      const tileUrl =
        theme === 'dark'
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      tileLayerRef.current.setUrl(tileUrl);
    }
  }, [theme]);

  // 3. Pan to active node if selected
  useEffect(() => {
    if (activeNode && mapInstanceRef.current) {
      try {
        mapInstanceRef.current.setView(activeNode.coords, 9, { animate: true });
      } catch {
        // Safe fallback
      }
    }
  }, [activeNode]);

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-sandMuted/60 dark:border-stone-800 shadow-sahara-card bg-sandSurface dark:bg-deepNavy">
      <div ref={mapContainerRef} className="w-full h-full z-10" />
    </div>
  );
};

export default LuzonMap;
