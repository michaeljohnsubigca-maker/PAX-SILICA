import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from '../../context/ThemeContext';
import Navbar from './Navbar';

describe('Navbar and Theme Toggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('renders branding title and navigation links', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    expect(screen.getByText(/PAX SILICA/i)).toBeDefined();
    expect(screen.getByText(/Overview/i)).toBeDefined();
    expect(screen.getByText(/Myth-Buster/i)).toBeDefined();
    expect(screen.getByText(/Supply Chain/i)).toBeDefined();
    expect(screen.getByText(/Corridor Atlas/i)).toBeDefined();
  });

  it('toggles theme between light and dark', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleButton).toBeDefined();
    fireEvent.click(toggleButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    fireEvent.click(toggleButton);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
