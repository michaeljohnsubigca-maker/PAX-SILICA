import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Full Integration', () => {
  it('renders all 6 core modules seamlessly', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Pax Silica/i, level: 1 })).toBeDefined();
    expect(screen.getAllByText(/Foundational Overview/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Myth vs. Reality/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Semiconductor Supply Chain/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Interactive Luzon Economic Corridor Map/i)).toBeDefined();
    expect(screen.getByText(/Intelligence Dispatches & Project Ledger/i)).toBeDefined();
    expect(screen.getAllByText(/Republic Act No. 7227/i).length).toBeGreaterThan(0);
  });
});
