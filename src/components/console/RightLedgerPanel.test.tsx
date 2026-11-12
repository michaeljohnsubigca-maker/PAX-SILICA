import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RightLedgerPanel from './RightLedgerPanel';

describe('RightLedgerPanel', () => {
  it('renders 2x2 Bento KPIs and default Milestones content', () => {
    render(
      <RightLedgerPanel
        activeTab="milestones"
        onTabChange={vi.fn()}
        onSelectNode={vi.fn()}
        onHoverNode={vi.fn()}
        isCollapsed={false}
        onToggleCollapse={vi.fn()}
        opacity={1}
        translateXPercent={0}
        pointerEvents={true}
      />
    );

    expect(screen.getByText(/Project Ledger/i)).toBeDefined();
    expect(screen.getByText('1,620 ha')).toBeDefined();
    expect(screen.getByText('$40B–$70B')).toBeDefined();
    expect(screen.getByText('₱180B / yr')).toBeDefined();
    expect(screen.getByText('130K–200K')).toBeDefined();
    expect(screen.getByText(/PHASED INDUSTRIAL TIMELINE/i)).toBeDefined();
  });

  it('triggers onTabChange when tab buttons are clicked', () => {
    const handleTabChange = vi.fn();

    render(
      <RightLedgerPanel
        activeTab="milestones"
        onTabChange={handleTabChange}
        onSelectNode={vi.fn()}
        onHoverNode={vi.fn()}
        isCollapsed={false}
        onToggleCollapse={vi.fn()}
        opacity={1}
        translateXPercent={0}
        pointerEvents={true}
      />
    );

    const lawAuditBtn = screen.getByRole('button', { name: /Law Audit/i });
    fireEvent.click(lawAuditBtn);
    expect(handleTabChange).toHaveBeenCalledWith('myths');

    const valueChainBtn = screen.getByRole('button', { name: /Value Chain/i });
    fireEvent.click(valueChainBtn);
    expect(handleTabChange).toHaveBeenCalledWith('supply');
  });

  it('renders fact checked myths when myths tab is active', () => {
    render(
      <RightLedgerPanel
        activeTab="myths"
        onTabChange={vi.fn()}
        onSelectNode={vi.fn()}
        onHoverNode={vi.fn()}
        isCollapsed={false}
        onToggleCollapse={vi.fn()}
        opacity={1}
        translateXPercent={0}
        pointerEvents={true}
      />
    );

    expect(screen.getByText(/CONSTITUTIONAL & SOVEREIGNTY AUDIT/i)).toBeDefined();
    expect(screen.getAllByText(/DISPROVEN/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/BCDA CEO Joshua Bingcang & Palace Legal Team/i)).toBeDefined();
  });

  it('renders "Go to Source" links on Milestones tab and stops click propagation', () => {
    const handleSelectNode = vi.fn();

    render(
      <RightLedgerPanel
        activeTab="milestones"
        onTabChange={vi.fn()}
        onSelectNode={handleSelectNode}
        onHoverNode={vi.fn()}
        isCollapsed={false}
        onToggleCollapse={vi.fn()}
        opacity={1}
        translateXPercent={0}
        pointerEvents={true}
      />
    );

    const sourceLinks = screen.getAllByRole('link', { name: /Go to Source/i });
    expect(sourceLinks.length).toBe(7);
    expect(sourceLinks[0].getAttribute('target')).toBe('_blank');
    expect(sourceLinks[0].getAttribute('rel')).toBe('noopener noreferrer');
    expect(sourceLinks[0].getAttribute('href')).toBeTruthy();

    fireEvent.click(sourceLinks[0]);
    expect(handleSelectNode).not.toHaveBeenCalled();
  });

  it('renders "Go to Source" links on Law Audit tab and stops click propagation', () => {
    const handleSelectNode = vi.fn();

    render(
      <RightLedgerPanel
        activeTab="myths"
        onTabChange={vi.fn()}
        onSelectNode={handleSelectNode}
        onHoverNode={vi.fn()}
        isCollapsed={false}
        onToggleCollapse={vi.fn()}
        opacity={1}
        translateXPercent={0}
        pointerEvents={true}
      />
    );

    const sourceLinks = screen.getAllByRole('link', { name: /Go to Source/i });
    expect(sourceLinks.length).toBe(5);
    expect(sourceLinks[0].getAttribute('target')).toBe('_blank');
    expect(sourceLinks[0].getAttribute('rel')).toBe('noopener noreferrer');
    expect(sourceLinks[0].getAttribute('href')).toBeTruthy();

    fireEvent.click(sourceLinks[0]);
    expect(handleSelectNode).not.toHaveBeenCalled();
  });
});
