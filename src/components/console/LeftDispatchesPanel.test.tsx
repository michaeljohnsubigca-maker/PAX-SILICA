import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NEWS_CARDS } from '../../data/dispatches';
import LeftDispatchesPanel from './LeftDispatchesPanel';

describe('LeftDispatchesPanel', () => {
  it('renders intelligence dispatches count and items', () => {
    const { container } = render(
      <LeftDispatchesPanel
        selectedNodeId="ALL"
        onSelectNode={vi.fn()}
        hoveredNodeId={null}
        onHoverNode={vi.fn()}
        searchQuery=""
        stakeholderFilter="ALL"
        onStakeholderFilterChange={vi.fn()}
        topicFilter="ALL"
        onTopicFilterChange={vi.fn()}
        isCollapsed={false}
        onToggleCollapse={vi.fn()}
        onResetFilters={vi.fn()}
        opacity={1}
        translateXPercent={0}
        pointerEvents={true}
      />
    );

    expect(screen.getByText(/Intelligence Dispatches/i)).toBeDefined();
    expect(container.querySelector('#newsCountIndicator')?.textContent).toBe(String(NEWS_CARDS.length));
    expect(
      screen.getByText(/DTI Clarifies Zero Data Centers Inside Capas Hub; Batangas & Bulacan Roles Defined/i)
    ).toBeDefined();
  });

  it('triggers stakeholder and topic filter changes', () => {
    const handleStakeholder = vi.fn();
    const handleTopic = vi.fn();

    render(
      <LeftDispatchesPanel
        selectedNodeId="ALL"
        onSelectNode={vi.fn()}
        hoveredNodeId={null}
        onHoverNode={vi.fn()}
        searchQuery=""
        stakeholderFilter="ALL"
        onStakeholderFilterChange={handleStakeholder}
        topicFilter="ALL"
        onTopicFilterChange={handleTopic}
        isCollapsed={false}
        onToggleCollapse={vi.fn()}
        onResetFilters={vi.fn()}
        opacity={1}
        translateXPercent={0}
        pointerEvents={true}
      />
    );

    const thinkTankBtn = screen.getByRole('button', { name: /^Think Tank$/i });
    fireEvent.click(thinkTankBtn);
    expect(handleStakeholder).toHaveBeenCalledWith('Think Tank / Academic');

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Sovereignty & Legal' } });
    expect(handleTopic).toHaveBeenCalledWith('Sovereignty & Legal');
  });

  it('triggers node selection when clicking a card or isolate button', () => {
    const handleSelectNode = vi.fn();

    render(
      <LeftDispatchesPanel
        selectedNodeId="ALL"
        onSelectNode={handleSelectNode}
        hoveredNodeId={null}
        onHoverNode={vi.fn()}
        searchQuery=""
        stakeholderFilter="ALL"
        onStakeholderFilterChange={vi.fn()}
        topicFilter="ALL"
        onTopicFilterChange={vi.fn()}
        isCollapsed={false}
        onToggleCollapse={vi.fn()}
        onResetFilters={vi.fn()}
        opacity={1}
        translateXPercent={0}
        pointerEvents={true}
      />
    );

    const isolateBtns = screen.getAllByRole('button', { name: /Isolate/i });
    fireEvent.click(isolateBtns[0]);
    expect(handleSelectNode).toHaveBeenCalled();
  });

  it('renders "Go to Source" buttons with target="_blank" and prevents node selection', () => {
    const handleSelectNode = vi.fn();

    render(
      <LeftDispatchesPanel
        selectedNodeId="ALL"
        onSelectNode={handleSelectNode}
        hoveredNodeId={null}
        onHoverNode={vi.fn()}
        searchQuery=""
        stakeholderFilter="ALL"
        onStakeholderFilterChange={vi.fn()}
        topicFilter="ALL"
        onTopicFilterChange={vi.fn()}
        isCollapsed={false}
        onToggleCollapse={vi.fn()}
        onResetFilters={vi.fn()}
        opacity={1}
        translateXPercent={0}
        pointerEvents={true}
      />
    );

    const sourceLinks = screen.getAllByRole('link', { name: /Go to Source/i });
    expect(sourceLinks.length).toBe(NEWS_CARDS.length);
    expect(sourceLinks[0].getAttribute('target')).toBe('_blank');
    expect(sourceLinks[0].getAttribute('rel')).toBe('noopener noreferrer');
    expect(sourceLinks[0].getAttribute('href')).toBeTruthy();

    fireEvent.click(sourceLinks[0]);
    expect(handleSelectNode).not.toHaveBeenCalled();
  });

  it('filters and renders Philippine protest dispatches with valid source links', () => {
    const { container } = render(
      <LeftDispatchesPanel
        selectedNodeId="ALL"
        onSelectNode={vi.fn()}
        hoveredNodeId={null}
        onHoverNode={vi.fn()}
        searchQuery="walkout"
        stakeholderFilter="Civil Society / Local"
        onStakeholderFilterChange={vi.fn()}
        topicFilter="Sovereignty & Legal"
        onTopicFilterChange={vi.fn()}
        isCollapsed={false}
        onToggleCollapse={vi.fn()}
        onResetFilters={vi.fn()}
        opacity={1}
        translateXPercent={0}
        pointerEvents={true}
      />
    );

    expect(container.querySelector('#newsCountIndicator')?.textContent).toBe('2');
    expect(
      screen.getByText(/Thousands of Students Across 42 Campuses Walk Out Against Pax Silica & US Summit Visit/i)
    ).toBeDefined();
    expect(
      screen.getByText(/UST Central Student Council Backs Nationwide Walkout Ahead of 49th ASEAN Summit/i)
    ).toBeDefined();

    const links = screen.getAllByRole('link', { name: /Go to Source/i });
    expect(links).toHaveLength(2);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      'https://www.bulatlat.com/2026/11/14/thousands-of-youth-walk-out-against-pax-silica-trump-ph-visit/',
      'https://varsitarian.net/csc-slams-pax-silica-ahead-of-49th-asean-summit-backs-nov-13-natl-day-of-action/',
    ]);
  });
});
