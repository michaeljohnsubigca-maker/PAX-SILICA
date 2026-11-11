import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DispatchesFeed from './DispatchesFeed';

describe('DispatchesFeed', () => {
  it('filters news cards when stakeholder chip is clicked', () => {
    render(<DispatchesFeed />);
    const officialChip = screen.getByRole('button', { name: /State \/ Official/i });
    fireEvent.click(officialChip);
    expect(screen.getByText(/Zero Data Centers Inside Capas/i)).toBeDefined();
  });

  it('filters cards by search query', () => {
    render(<DispatchesFeed />);
    const searchInput = screen.getByPlaceholderText(/Search dispatches/i);
    fireEvent.change(searchInput, { target: { value: 'Immunity' } });
    expect(screen.getByText(/Rejects Extraterritorial Immunity/i)).toBeDefined();
  });
});
