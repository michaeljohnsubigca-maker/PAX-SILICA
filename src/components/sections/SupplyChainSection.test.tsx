import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SupplyChainSection from './SupplyChainSection';

describe('SupplyChainSection', () => {
  it('renders all 4 supply chain stages', () => {
    render(<SupplyChainSection />);
    expect(screen.getAllByText(/Critical Minerals Extraction/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Capas Wafer Prototyping/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ATP Expansion/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Decarbonized Grid/i).length).toBeGreaterThan(0);
  });

  it('updates stage details when stage tab is selected', () => {
    render(<SupplyChainSection />);
    const stageTwoButton = screen.getByRole('button', { name: /Stage 02/i });
    fireEvent.click(stageTwoButton);
    expect(screen.getAllByText(/Capas Wafer Prototyping & Pilot Cleanrooms/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/200mm\/300mm Pilot Lines/i)).toBeDefined();
  });
});
