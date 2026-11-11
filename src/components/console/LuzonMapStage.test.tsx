import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LuzonMapStage from './LuzonMapStage';

describe('LuzonMapStage', () => {
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
});
