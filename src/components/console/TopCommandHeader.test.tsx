import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TopCommandHeader from './TopCommandHeader';

describe('TopCommandHeader', () => {
  it('renders search input, brand, and telemetry', () => {
    render(
      <TopCommandHeader
        searchQuery=""
        onSearchChange={vi.fn()}
        selectedNodeId="ALL"
        onResetNode={vi.fn()}
        cursorCoords="14.5995° N, 120.9842° E"
        onScrollToTop={vi.fn()}
        isWideView={false}
        onToggleWideView={vi.fn()}
        opacity={1}
        translateYPercent={0}
        pointerEvents={true}
      />
    );

    expect(screen.getByText(/Pax Silica/i)).toBeDefined();
    expect(screen.getByText(/LUZON CORRIDOR/i)).toBeDefined();
    expect(screen.getByText(/ALL LUZON/i)).toBeDefined();
    expect(screen.getByText(/GPS LIVE/i)).toBeDefined();
    expect(screen.getByText('14.5995° N, 120.9842° E')).toBeDefined();
  });

  it('triggers search change and node reset events', () => {
    const handleSearch = vi.fn();
    const handleReset = vi.fn();

    render(
      <TopCommandHeader
        searchQuery="wafer"
        onSearchChange={handleSearch}
        selectedNodeId="ncc"
        onResetNode={handleReset}
        cursorCoords="15.3410° N, 120.5360° E"
        onScrollToTop={vi.fn()}
        isWideView={false}
        onToggleWideView={vi.fn()}
        opacity={1}
        translateYPercent={0}
        pointerEvents={true}
      />
    );

    expect(screen.getByText(/NEW CLARK CITY/i)).toBeDefined();
    const resetBtn = screen.getByTitle(/Reset Scope to All Luzon/i);
    fireEvent.click(resetBtn);
    expect(handleReset).toHaveBeenCalledTimes(1);

    const input = screen.getByPlaceholderText(/Search dispatches/i);
    fireEvent.change(input, { target: { value: 'cleanroom' } });
    expect(handleSearch).toHaveBeenCalledWith('cleanroom');
  });

  it('toggles wide view when button is clicked', () => {
    const handleToggleWide = vi.fn();

    render(
      <TopCommandHeader
        searchQuery=""
        onSearchChange={vi.fn()}
        selectedNodeId="ALL"
        onResetNode={vi.fn()}
        cursorCoords="15.3410° N, 120.5360° E"
        onScrollToTop={vi.fn()}
        isWideView={false}
        onToggleWideView={handleToggleWide}
        opacity={1}
        translateYPercent={0}
        pointerEvents={true}
      />
    );

    const toggleBtn = screen.getByTitle(/Toggle between Workspace Panels and Pure Map Mode/i);
    fireEvent.click(toggleBtn);
    expect(handleToggleWide).toHaveBeenCalledTimes(1);
  });
});
