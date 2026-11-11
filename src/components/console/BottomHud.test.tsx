import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BottomHud from './BottomHud';

describe('BottomHud', () => {
  it('renders node jump buttons and specs trigger button', () => {
    render(
      <BottomHud
        selectedNodeId="ALL"
        inspectedNodeId="ncc"
        onSelectNode={vi.fn()}
        onHoverNode={vi.fn()}
        isDrawerOpen={false}
        onToggleDrawer={vi.fn()}
        leftPanelCollapsed={false}
        rightPanelCollapsed={false}
        opacity={1}
        translateY={0}
        pointerEvents={true}
      />
    );

    expect(screen.getByRole('button', { name: /Capas Hub/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Wafer Lab/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Batangas AI/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Subic Port/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Metro Manila/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Reset/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /New Clark City Specs/i })).toBeDefined();
  });

  it('triggers onSelectNode when a quick jump button is clicked', () => {
    const handleSelectNode = vi.fn();

    render(
      <BottomHud
        selectedNodeId="ALL"
        inspectedNodeId="ncc"
        onSelectNode={handleSelectNode}
        onHoverNode={vi.fn()}
        isDrawerOpen={false}
        onToggleDrawer={vi.fn()}
        leftPanelCollapsed={false}
        rightPanelCollapsed={false}
        opacity={1}
        translateY={0}
        pointerEvents={true}
      />
    );

    const waferLabBtn = screen.getByRole('button', { name: /Wafer Lab/i });
    fireEvent.click(waferLabBtn);
    expect(handleSelectNode).toHaveBeenCalledWith('bulacan');
  });

  it('renders inspected node details when drawer is open', () => {
    render(
      <BottomHud
        selectedNodeId="ncc"
        inspectedNodeId="ncc"
        onSelectNode={vi.fn()}
        onHoverNode={vi.fn()}
        isDrawerOpen={true}
        onToggleDrawer={vi.fn()}
        leftPanelCollapsed={false}
        rightPanelCollapsed={false}
        opacity={1}
        translateY={0}
        pointerEvents={true}
      />
    );

    expect(screen.getByText('Zone Allocation')).toBeDefined();
    expect(screen.getByText('Suitors & Consortia')).toBeDefined();
    expect(screen.getByText('Critical Dependencies')).toBeDefined();
    expect(screen.getByText(/1,620 Hectares inside 9,450-ha BCDA Master Plan/i)).toBeDefined();
  });
});
