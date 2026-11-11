import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NodeInspectorDrawer from './NodeInspectorDrawer';
import { CORRIDOR_NODES } from '../../data/nodes';

describe('NodeInspectorDrawer', () => {
  it('renders node details when active node is provided', () => {
    render(
      <NodeInspectorDrawer
        activeNode={CORRIDOR_NODES.ncc}
        isOpen={true}
        onClose={() => {}}
      />
    );
    expect(screen.getAllByText(/New Clark City/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/1,620 Hectares inside 9,450-ha BCDA Estate/i)).toBeDefined();
    expect(screen.getByText(/50\+ Global Tech Companies/i)).toBeDefined();
    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('inset-x-4');
    expect(dialog.className).toContain('sm:w-96');
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <NodeInspectorDrawer
        activeNode={CORRIDOR_NODES.ncc}
        isOpen={true}
        onClose={handleClose}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /close inspector/i }));
    expect(handleClose).toHaveBeenCalledOnce();
  });
});
