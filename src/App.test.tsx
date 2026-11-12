import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

describe('Pax Silica Geospatial Command Center', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
  });

  it('renders the geospatial stage, map container, and editorial hero overlay', () => {
    const { container } = render(<App />);

    expect(container.querySelector('#scrollRunway')).toBeDefined();
    expect(container.querySelector('#viewportStage')).toBeDefined();
    expect(container.querySelector('#luzonMap')).toBeDefined();

    // Hero title & corridor pills
    expect(
      screen.getByRole('heading', { name: /Pax Silica & the Luzon Corridor/i, level: 1 })
    ).toBeDefined();
    expect(screen.getByText(/High-security intelligence ledger tracking the Philippines’/i)).toBeDefined();
    expect(screen.getByText(/Enter Intelligence Console/i)).toBeDefined();
    expect(screen.getByText(/13TH SIGNATORY: PHILIPPINES/i)).toBeDefined();
  });

  it('renders quick jump buttons and triggers smooth scroll on click', () => {
    render(<App />);

    const capasBtn = screen.getAllByRole('button', { name: /Capas Hub/i })[0];
    expect(capasBtn).toBeDefined();
    fireEvent.click(capasBtn);

    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('renders top command header with search input and live telemetry', () => {
    render(<App />);

    expect(screen.getByPlaceholderText(/Search dispatches, laws, wafer specs, suitors/i)).toBeDefined();
    expect(screen.getByText(/GPS LIVE/i)).toBeDefined();
    expect(screen.getByText(/5 NODES ACTIVE/i)).toBeDefined();
    expect(screen.getByText(/OP VETTED \(OCT 2026\)/i)).toBeDefined();
  });

  it('renders intelligence dispatches with stakeholder filters and verbatim quotes', () => {
    render(<App />);

    expect(screen.getByText(/Intelligence Dispatches/i)).toBeDefined();
    expect(
      screen.getByText(/DTI Clarifies Zero Data Centers Inside Capas Hub; Batangas & Bulacan Roles Defined/i)
    ).toBeDefined();
    expect(screen.getByText(/Usec. Ceferino Rodolfo, DTI/i)).toBeDefined();

    // Filter by State
    const stateFilterBtn = screen.getByRole('button', { name: /^State$/i });
    fireEvent.click(stateFilterBtn);
    expect(
      screen.getByText(/DTI Clarifies Zero Data Centers Inside Capas Hub; Batangas & Bulacan Roles Defined/i)
    ).toBeDefined();
  });

  it('renders Project Ledger with 2x2 Bento KPI grid and switches tabs', () => {
    render(<App />);

    // 2x2 Bento KPIs
    expect(screen.getByText(/1,620 ha/i)).toBeDefined();
    expect(screen.getAllByText(/\$40B–\$70B/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/₱180B \/ yr/i)).toBeDefined();
    expect(screen.getByText(/130K–200K/i)).toBeDefined();

    // Default Milestones tab
    expect(screen.getByText(/PHASED INDUSTRIAL TIMELINE/i)).toBeDefined();
    expect(screen.getByText(/Pax Silica Declaration Signed \(13th Signatory\)/i)).toBeDefined();

    // Switch to Law Audit tab
    const lawAuditTabBtn = screen.getByRole('button', { name: /Law Audit/i });
    fireEvent.click(lawAuditTabBtn);
    expect(screen.getByText(/CONSTITUTIONAL & SOVEREIGNTY AUDIT/i)).toBeDefined();
    expect(screen.getAllByText(/DISPROVEN/i).length).toBeGreaterThan(0);

    // Switch to Value Chain tab
    const valueChainTabBtn = screen.getByRole('button', { name: /Value Chain/i });
    fireEvent.click(valueChainTabBtn);
    expect(screen.getByText(/MINERAL-TO-WAFER/i)).toBeDefined();
    expect(screen.getByText(/Subic Bay & Zambales Belt/i)).toBeDefined();
    expect(screen.getByText(/Bulacan Intermodal Corridor/i)).toBeDefined();
  });

  it('renders Bottom HUD with node jump buttons and specs drawer toggle', () => {
    render(<App />);

    const specsToggleBtn = screen.getByRole('button', { name: /Specs/i });
    expect(specsToggleBtn).toBeDefined();

    fireEvent.click(specsToggleBtn);
    expect(screen.getByText(/Zone Allocation/i)).toBeDefined();
    expect(screen.getByText(/Suitors & Consortia/i)).toBeDefined();
    expect(screen.getByText(/Critical Dependencies/i)).toBeDefined();
  });

  it('enforces non-overlapping bounds and uniform 8px spacing across all console panels', () => {
    const { container } = render(<App />);

    const header = container.querySelector('#topCommandHeader');
    expect(header).toBeDefined();
    expect(header?.className).toContain('top-2');
    expect(header?.className).toContain('left-2');
    expect(header?.className).toContain('right-2');

    const leftPanel = container.querySelector('#leftGlassPanel');
    expect(leftPanel).toBeDefined();
    expect(leftPanel?.className).toContain('left-2');
    expect(leftPanel?.className).toContain('lg:w-[320px]');
    expect(leftPanel?.className).toContain('lg:bottom-2');

    const rightPanel = container.querySelector('#rightGlassPanel');
    expect(rightPanel).toBeDefined();
    expect(rightPanel?.className).toContain('sm:right-2');
    expect(rightPanel?.className).toContain('lg:w-[320px]');
    expect(rightPanel?.className).toContain('lg:bottom-2');

    const bottomHud = container.querySelector('#bottomCenterHud');
    expect(bottomHud).toBeDefined();
    expect(bottomHud?.className).toContain('bottom-2');
    expect(bottomHud?.className).toContain('left-[336px]');
    expect(bottomHud?.className).toContain('right-[336px]');
  });
});
