import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('renders Pax Silica headline and key metrics', () => {
    render(<HeroSection />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Pax Silica/i);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Luzon Economic Corridor/i);
    expect(screen.getByText(/1,620 Hectares/i)).toBeDefined();
    expect(screen.getByText(/13 Allied Nations/i)).toBeDefined();
    expect(screen.getByText(/50\+ Global Suitors/i)).toBeDefined();
  });
});
