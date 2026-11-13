import { render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import L from 'leaflet';
import LuzonMapStage from './LuzonMapStage';

describe('LuzonMapStage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('renders map viewport container and vignette overlay', () => {
    const handleSelectNode = vi.fn();
    const handleUpdateCoords = vi.fn();

    const { container } = render(
      <LuzonMapStage
        selectedNodeId="ncc"
        hoveredNodeId={null}
        onSelectNode={handleSelectNode}
        onUpdateCoords={handleUpdateCoords}
      />
    );

    const mapElement = container.querySelector('#luzonMap');
    expect(mapElement).toBeDefined();
    expect(mapElement?.classList.contains('absolute')).toBe(true);

    const vignetteElement = container.querySelector('.map-vignette');
    expect(vignetteElement).toBeDefined();
  });

  it('initializes tileLayer with ESRI dark canvas default when no API key is provided', () => {
    const tileLayerSpy = vi.spyOn(L, 'tileLayer');
    render(
      <LuzonMapStage
        selectedNodeId="ALL"
        hoveredNodeId={null}
        onSelectNode={vi.fn()}
        onUpdateCoords={vi.fn()}
      />
    );
    expect(tileLayerSpy).toHaveBeenCalledWith(
      expect.stringContaining('ArcGIS/rest/services/Canvas/World_Dark_Gray_Base'),
      expect.any(Object)
    );
  });

  it('unmounts cleanly without errors', () => {
    const handleSelectNode = vi.fn();
    const handleUpdateCoords = vi.fn();

    const { unmount } = render(
      <LuzonMapStage
        selectedNodeId="ALL"
        hoveredNodeId={null}
        onSelectNode={handleSelectNode}
        onUpdateCoords={handleUpdateCoords}
      />
    );

    expect(() => unmount()).not.toThrow();
  });

  it('configures Leaflet map with touch pinch zoom and fractional zoom options', () => {
    const mapSpy = vi.spyOn(L, 'map');

    render(
      <LuzonMapStage
        selectedNodeId="ALL"
        hoveredNodeId={null}
        onSelectNode={vi.fn()}
        onUpdateCoords={vi.fn()}
      />
    );

    expect(mapSpy).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({
        scrollWheelZoom: false,
        touchZoom: true,
        bounceAtZoomLimits: false,
        zoomSnap: 0,
        zoomDelta: 0.5,
      })
    );
  });

  it('zooms in and out on trackpad pinch wheel events while ignoring normal scroll', () => {
    const { container } = render(
      <LuzonMapStage
        selectedNodeId="ALL"
        hoveredNodeId={null}
        onSelectNode={vi.fn()}
        onUpdateCoords={vi.fn()}
      />
    );

    const setZoomAroundSpy = vi.spyOn(L.Map.prototype, 'setZoomAround');
    const mapEl = container.querySelector('#luzonMap') as HTMLElement;
    expect(mapEl).not.toBeNull();

    // Normal scroll without ctrlKey/metaKey should not trigger map zoom
    const normalWheel = new WheelEvent('wheel', {
      deltaY: 40,
      ctrlKey: false,
      bubbles: true,
      cancelable: true,
    });
    mapEl.dispatchEvent(normalWheel);
    expect(setZoomAroundSpy).not.toHaveBeenCalled();

    // Pinch-out (ctrlKey + negative deltaY) zooms in (> initial zoom 8)
    const pinchOut = new WheelEvent('wheel', {
      deltaY: -40,
      ctrlKey: true,
      clientX: 200,
      clientY: 200,
      bubbles: true,
      cancelable: true,
    });
    mapEl.dispatchEvent(pinchOut);
    expect(setZoomAroundSpy).toHaveBeenCalledTimes(1);
    const zoomedInLevel = setZoomAroundSpy.mock.calls[0][1] as number;
    expect(zoomedInLevel).toBeGreaterThan(8);

    // Pinch-in (ctrlKey + positive deltaY) zooms out relative to current zoom
    const pinchIn = new WheelEvent('wheel', {
      deltaY: 40,
      ctrlKey: true,
      clientX: 200,
      clientY: 200,
      bubbles: true,
      cancelable: true,
    });
    mapEl.dispatchEvent(pinchIn);
    expect(setZoomAroundSpy).toHaveBeenCalledTimes(2);
    const zoomedOutLevel = setZoomAroundSpy.mock.calls[1][1] as number;
    expect(zoomedOutLevel).toBeLessThan(zoomedInLevel);
  });

  it('zooms in and out on WebKit gesturestart and gesturechange pinch events', () => {
    const { container } = render(
      <LuzonMapStage
        selectedNodeId="ALL"
        hoveredNodeId={null}
        onSelectNode={vi.fn()}
        onUpdateCoords={vi.fn()}
      />
    );

    const setZoomAroundSpy = vi.spyOn(L.Map.prototype, 'setZoomAround');
    const mapEl = container.querySelector('#luzonMap') as HTMLElement;

    const gestureStart = new Event('gesturestart', { bubbles: true, cancelable: true });
    mapEl.dispatchEvent(gestureStart);

    const gesturePinchOut = Object.assign(
      new Event('gesturechange', { bubbles: true, cancelable: true }),
      { scale: 1.5, clientX: 150, clientY: 150 }
    );
    mapEl.dispatchEvent(gesturePinchOut);
    expect(setZoomAroundSpy).toHaveBeenCalledTimes(1);
    const zoomedInLevel = setZoomAroundSpy.mock.calls[0][1] as number;
    expect(zoomedInLevel).toBeGreaterThan(8);

    const gesturePinchIn = Object.assign(
      new Event('gesturechange', { bubbles: true, cancelable: true }),
      { scale: 0.75, clientX: 150, clientY: 150 }
    );
    mapEl.dispatchEvent(gesturePinchIn);
    expect(setZoomAroundSpy).toHaveBeenCalledTimes(2);
    const zoomedOutLevel = setZoomAroundSpy.mock.calls[1][1] as number;
    expect(zoomedOutLevel).toBeLessThan(8);
  });
});
