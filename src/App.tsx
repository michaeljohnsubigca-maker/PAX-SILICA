import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { LuzonMapStage } from './components/console/LuzonMapStage';
import { LandingHeroOverlay } from './components/console/LandingHeroOverlay';
import { TopCommandHeader } from './components/console/TopCommandHeader';
import { LeftDispatchesPanel } from './components/console/LeftDispatchesPanel';
import { RightLedgerPanel } from './components/console/RightLedgerPanel';
import { BottomHud } from './components/console/BottomHud';
import { MobilePanelNav } from './components/console/MobilePanelNav';
import { NEWS_CARDS } from './data/dispatches';

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export const App: React.FC = () => {
  // Console Application State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState('ALL');
  const [inspectedNodeId, setInspectedNodeId] = useState('ncc');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [cursorCoords, setCursorCoords] = useState('15.3410° N, 120.5360° E');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(56);

  // Filters & Tabs State
  const [searchQuery, setSearchQuery] = useState('');
  const [stakeholderFilter, setStakeholderFilter] = useState('ALL');
  const [topicFilter, setTopicFilter] = useState('ALL');
  const [rightTab, setRightTab] = useState<'milestones' | 'myths' | 'supply'>('milestones');

  // Layout & Responsive States
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<'news' | 'map' | 'ledger'>('map');

  // Scroll Choreography Listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(window.innerHeight * 0.85, 520);
      const rawP = clamp(scrollY / maxScroll, 0, 1);
      setScrollProgress(rawP);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Choreography Interpolations
  const heroP = clamp(scrollProgress / 0.55, 0, 1);
  const heroOpacity = 1 - easeOutCubic(heroP);
  const heroTranslateY = -28 * easeOutCubic(heroP);

  const headerP = easeOutCubic(clamp((scrollProgress - 0.12) / 0.68, 0, 1));
  const headerYPercent = (1 - headerP) * -120;
  const headerOpacity = headerP;
  const headerPointerEvents = headerP > 0.65;

  const leftP = easeOutCubic(clamp((scrollProgress - 0.18) / 0.74, 0, 1));
  const leftXPercent = (1 - leftP) * -112;
  const leftOpacity = leftP;
  const leftPointerEvents = leftP > 0.75;

  const rightP = easeOutCubic(clamp((scrollProgress - 0.24) / 0.74, 0, 1));
  const rightXPercent = (1 - rightP) * 112;
  const rightOpacity = rightP;
  const rightPointerEvents = rightP > 0.75;

  const bottomP = easeOutCubic(clamp((scrollProgress - 0.3) / 0.7, 0, 1));
  const bottomY = (1 - bottomP) * 130;
  const bottomOpacity = bottomP;
  const bottomPointerEvents = bottomP > 0.75;

  // Actions
  const scrollToWorkspace = useCallback(() => {
    const targetY = window.innerHeight * 0.95;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }, []);

  const scrollToPureMap = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectNode = useCallback(
    (nodeId: string) => {
      setSelectedNodeId(nodeId);
      if (nodeId !== 'ALL') {
        setInspectedNodeId(nodeId);
      }
    },
    []
  );

  const handleFocusFromLanding = useCallback(
    (nodeId: string) => {
      handleSelectNode(nodeId);
      scrollToWorkspace();
    },
    [handleSelectNode, scrollToWorkspace]
  );

  const handleResetFilters = useCallback(() => {
    setSelectedNodeId('ALL');
    setStakeholderFilter('ALL');
    setTopicFilter('ALL');
    setSearchQuery('');
  }, []);

  const isWideView = leftPanelCollapsed && rightPanelCollapsed;

  const toggleWideView = useCallback(() => {
    if (isWideView) {
      setLeftPanelCollapsed(false);
      setRightPanelCollapsed(false);
    } else {
      setLeftPanelCollapsed(true);
      setRightPanelCollapsed(true);
    }
  }, [isWideView]);

  return (
    <div id="scrollRunway" className="relative w-full h-[220vh] selection:bg-blue-500/30 selection:text-white">
      {/* FIXED 100VW x 100VH GEOSPATIAL STAGE */}
      <div id="viewportStage" className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-deepNavy">
        {/* LEAFLET MAP OF LUZON */}
        <LuzonMapStage
          selectedNodeId={selectedNodeId}
          hoveredNodeId={hoveredNodeId}
          onSelectNode={handleSelectNode}
          onUpdateCoords={setCursorCoords}
          isWideView={isWideView}
        />

        {/* LAYER 1: EDITORIAL HERO OVERLAY (Visible at 0% Scroll) */}
        <LandingHeroOverlay
          cursorCoords={cursorCoords}
          onEnterConsole={scrollToWorkspace}
          onFocusNode={handleFocusFromLanding}
          opacity={heroOpacity}
          translateY={heroTranslateY}
        />

        {/* LAYER 2: TOP COMMAND & TELEMETRY BAR */}
        <TopCommandHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedNodeId={selectedNodeId}
          onResetNode={() => setSelectedNodeId('ALL')}
          cursorCoords={cursorCoords}
          onScrollToTop={scrollToPureMap}
          isWideView={isWideView}
          onToggleWideView={toggleWideView}
          opacity={headerOpacity}
          translateYPercent={headerYPercent}
          pointerEvents={headerPointerEvents}
          onHeightChange={setHeaderHeight}
        />

        {/* LAYER 3: LEFT PANEL — INTELLIGENCE DISPATCHES */}
        <div className={mobilePanel === 'news' ? 'block lg:block' : 'hidden lg:block'}>
          <LeftDispatchesPanel
            selectedNodeId={selectedNodeId}
            onSelectNode={handleSelectNode}
            hoveredNodeId={hoveredNodeId}
            onHoverNode={setHoveredNodeId}
            searchQuery={searchQuery}
            stakeholderFilter={stakeholderFilter}
            onStakeholderFilterChange={setStakeholderFilter}
            topicFilter={topicFilter}
            onTopicFilterChange={setTopicFilter}
            isCollapsed={leftPanelCollapsed}
            onToggleCollapse={() => setLeftPanelCollapsed((prev) => !prev)}
            onResetFilters={handleResetFilters}
            opacity={mobilePanel === 'news' ? 1 : leftOpacity}
            translateXPercent={mobilePanel === 'news' ? 0 : leftXPercent}
            pointerEvents={mobilePanel === 'news' ? true : leftPointerEvents}
            topOffset={headerHeight + 16}
          />
        </div>

        {/* Floating Left Reopen Button */}
        {scrollProgress > 0.4 && leftPanelCollapsed && (
          <button
            id="floatingLeftOpenBtn"
            onClick={() => setLeftPanelCollapsed(false)}
            className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-30 glass-panel panel-dock-pill rounded-full p-2 text-blue-400 hover:text-white transition cursor-pointer border border-white/20"
            title="Expand Dispatches Panel"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* LAYER 4: RIGHT PANEL — VERIFIED AUDIT LEDGER */}
        <div className={mobilePanel === 'ledger' ? 'block lg:block' : 'hidden lg:block'}>
          <RightLedgerPanel
            activeTab={rightTab}
            onTabChange={setRightTab}
            onSelectNode={handleSelectNode}
            onHoverNode={setHoveredNodeId}
            isCollapsed={rightPanelCollapsed}
            onToggleCollapse={() => setRightPanelCollapsed((prev) => !prev)}
            opacity={mobilePanel === 'ledger' ? 1 : rightOpacity}
            translateXPercent={mobilePanel === 'ledger' ? 0 : rightXPercent}
            pointerEvents={mobilePanel === 'ledger' ? true : rightPointerEvents}
            topOffset={headerHeight + 16}
          />
        </div>

        {/* Floating Right Reopen Button */}
        {scrollProgress > 0.4 && rightPanelCollapsed && (
          <button
            id="floatingRightOpenBtn"
            onClick={() => setRightPanelCollapsed(false)}
            className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-30 glass-panel panel-dock-pill rounded-full p-2 text-blue-400 hover:text-white transition cursor-pointer border border-white/20"
            title="Expand Ledger Panel"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* LAYER 5: BOTTOM CENTER HUD & NODE INSPECTOR */}
        <BottomHud
          selectedNodeId={selectedNodeId}
          inspectedNodeId={inspectedNodeId}
          onSelectNode={handleSelectNode}
          onHoverNode={setHoveredNodeId}
          isDrawerOpen={isDrawerOpen}
          onToggleDrawer={() => setIsDrawerOpen((prev) => !prev)}
          leftPanelCollapsed={leftPanelCollapsed}
          rightPanelCollapsed={rightPanelCollapsed}
          opacity={bottomOpacity}
          translateY={bottomY}
          pointerEvents={bottomPointerEvents}
        />

        {/* MOBILE NAVIGATION DOCK */}
        <MobilePanelNav
          activeMobilePanel={mobilePanel}
          onSelectMobilePanel={(panel) => {
            setMobilePanel(panel);
            setLeftPanelCollapsed(false);
            setRightPanelCollapsed(false);
            if (scrollProgress < 0.9) scrollToWorkspace();
          }}
          dispatchesCount={NEWS_CARDS.length}
        />
      </div>
    </div>
  );
};

export default App;
