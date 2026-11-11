import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App root', () => {
  it('renders application header', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
  });
});
