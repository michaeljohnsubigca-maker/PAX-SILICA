import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LandingHeroOverlay from './LandingHeroOverlay';

describe('LandingHeroOverlay', () => {
  it('renders title, coordinates, and telemetry badge', () => {
    render(
      <LandingHeroOverlay
        cursorCoords="15.3410° N, 120.5360° E"
        onEnterConsole={vi.fn()}
        onFocusNode={vi.fn()}
        opacity={1}
        translateY={0}
      />
    );

    expect(
      screen.getByRole('heading', { name: /Pax Silica & the Luzon Corridor/i, level: 1 })
    ).toBeDefined();
    expect(screen.getByText('15.3410° N, 120.5360° E')).toBeDefined();
    expect(screen.getByText(/13TH SIGNATORY: PHILIPPINES/i)).toBeDefined();
  });

  it('triggers onEnterConsole callback when action buttons are clicked', () => {
    const handleEnter = vi.fn();
    render(
      <LandingHeroOverlay
        cursorCoords="15.3410° N, 120.5360° E"
        onEnterConsole={handleEnter}
        onFocusNode={vi.fn()}
        opacity={1}
        translateY={0}
      />
    );

    const enterBtn = screen.getByRole('button', { name: /Enter Intelligence Console/i });
    fireEvent.click(enterBtn);
    expect(handleEnter).toHaveBeenCalledTimes(1);

    const commandViewBtn = screen.getByRole('button', { name: /Command View/i });
    fireEvent.click(commandViewBtn);
    expect(handleEnter).toHaveBeenCalledTimes(2);
  });

  it('triggers onFocusNode callback when node chips are clicked', () => {
    const handleFocus = vi.fn();
    render(
      <LandingHeroOverlay
        cursorCoords="15.3410° N, 120.5360° E"
        onEnterConsole={vi.fn()}
        onFocusNode={handleFocus}
        opacity={1}
        translateY={0}
      />
    );

    const waferLabBtn = screen.getByRole('button', { name: /Wafer Lab/i });
    fireEvent.click(waferLabBtn);
    expect(handleFocus).toHaveBeenCalledWith('bulacan');
  });
});
