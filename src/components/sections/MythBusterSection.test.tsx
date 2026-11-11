import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MythBusterSection from './MythBusterSection';

describe('MythBusterSection', () => {
  it('renders all myth claims with official verdicts', () => {
    render(<MythBusterSection />);
    expect(screen.getByText(/Diplomatic Immunity/i)).toBeDefined();
    expect(screen.getAllByText(/REJECTED BY PH GOVT/i).length).toBeGreaterThan(0);
  });

  it('expands card to show legal citation and authority when clicked', () => {
    render(<MythBusterSection />);
    const detailButton = screen.getAllByRole('button', { name: /view legal basis/i })[0];
    fireEvent.click(detailButton);
    expect(screen.getByText(/BCDA CEO Joshua Bingcang/i)).toBeDefined();
  });
});
