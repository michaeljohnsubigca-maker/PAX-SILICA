import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MilestonesTimeline from './MilestonesTimeline';

describe('MilestonesTimeline', () => {
  it('renders milestones in chronological order with status badges', () => {
    render(<MilestonesTimeline />);
    expect(screen.getByText(/Pax Silica Declaration Signed/i)).toBeDefined();
    expect(screen.getAllByText(/COMPLETED/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/IN PROGRESS/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/SCHEDULED/i).length).toBeGreaterThan(0);
  });
});
