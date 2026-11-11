# Pax Silica Philippines Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-performance web dashboard educating citizens and media on Pax Silica in the Philippines using the Sahara warm minimalism design system.

**Architecture:** Client-side React application powered by Vite, Tailwind CSS, and Leaflet. Structured domain data lives in typed TypeScript files, decoupling content from UI rendering. The interface uses a single-page narrative scroll paired with an interactive corridor atlas and live intelligence ledger.

**Tech Stack:** React 18, TypeScript 5, Vite, Tailwind CSS 3, Leaflet, Lucide React, Vitest, Testing Library.

**Spec:** [docs/superpowers/specs/2026-11-11-pax-silica-dashboard-design.md](file:///Users/michaeljohnsubigca/Work/PAX%20SILICA/docs/superpowers/specs/2026-11-11-pax-silica-dashboard-design.md)

## Global Constraints

- Static client-side architecture with zero required server runtimes.
- Uses open Leaflet map tiles with no proprietary paid API keys.
- Adheres strictly to the Sahara warm minimalism design system: Burnt sienna (`#c2652a`), Warm linen (`#faf5ee`), EB Garamond headlines, and Manrope body typography.
- Obsidian dark mode toggle with `#0c0a09` deep obsidian background and `#1c1917` surface panels.
- Content updates must not require modifying component JSX. All copy and telemetry remain isolated in `src/data/`.

## Review Focus

- Node inspector drawer must render cleanly on mobile viewports without overflowing the map stage.
- Leaflet container must handle window resizes and tab switches without broken map tile grids.
- Filter chips for intelligence dispatches must handle zero-result queries gracefully.
- Myth-buster card citations must link to verified legal or government authority sources.
- Dark mode toggle must persist state in `localStorage` and synchronize root document classes immediately.

---

### Task 1: Project Scaffolding, Dependencies, and Design System Configuration

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: Base Vite build environment, Tailwind theme tokens, and testing suite.

- [ ] **Step 1: Write test verifying application root renders**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App root', () => {
  it('renders application header', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL due to missing packages or configuration.

- [ ] **Step 3: Initialize project configuration, install packages, and define Tailwind Sahara tokens**

Install dependencies: `react`, `react-dom`, `leaflet`, `lucide-react`.
Install dev dependencies: `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `@types/leaflet`, `tailwindcss`, `postcss`, `autoprefixer`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.
Configure `tailwind.config.js` with:
- `saharaTerracotta`: `#c2652a`
- `sandLinen`: `#faf5ee`
- `sandSurface`: `#f3ede2`
- `deepNavy`: `#0c0a09`
- `panelDark`: `#1c1917`
- Fonts: `EB Garamond` (serif), `Manrope` (sans), `JetBrains Mono` (mono).
Configure `index.html` with Google Fonts links and Leaflet stylesheet.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit scaffolding**

```bash
git add package.json vite.config.ts tsconfig.json tailwind.config.js postcss.config.js index.html src/
git commit -m "chore: scaffold vite react typescript application with sahara design tokens"
```

---

### Task 2: Core Domain Data Models and Static Data Modules

**Files:**
- Create: `src/types/domain.ts`
- Create: `src/data/explainer.ts`
- Create: `src/data/myths.ts`
- Create: `src/data/nodes.ts`
- Create: `src/data/supplyChain.ts`
- Create: `src/data/dispatches.ts`
- Create: `src/data/milestones.ts`
- Test: `src/data/data.test.ts`

**Interfaces:**
- Produces:
  - `CorridorNode`: Node metadata, geographic coordinates, acreage, and logistics connections.
  - `MythProvision`: Claim, verdict, authority, citation, and explanation.
  - `SupplyChainStage`: Stage title, node association, metrics, and description.
  - `IntelligenceDispatch`: Source, date, stakeholder category, topic, headline, and summary.
  - `ProjectMilestone`: Date, title, status, node association, and details.
  - `ExplainerContent`: Mission overview, economic significance, and key metrics.

- [ ] **Step 1: Write tests verifying domain data validity**

```typescript
import { describe, it, expect } from 'vitest';
import { CORRIDOR_NODES } from './nodes';
import { MYTH_PROVISIONS } from './myths';
import { SUPPLY_CHAIN_STAGES } from './supplyChain';
import { NEWS_CARDS } from './dispatches';
import { MILESTONES } from './milestones';

describe('Domain Data Integrity', () => {
  it('contains all 5 corridor nodes with valid coordinates', () => {
    const keys = Object.keys(CORRIDOR_NODES);
    expect(keys).toContain('ncc');
    expect(keys).toContain('subic');
    expect(keys).toContain('manila');
    expect(keys).toContain('batangas');
    expect(keys).toContain('bulacan');
    keys.forEach((key) => {
      const node = CORRIDOR_NODES[key];
      expect(node.coords).toHaveLength(2);
      expect(node.coords[0]).toBeGreaterThan(13);
      expect(node.coords[0]).toBeLessThan(17);
    });
  });

  it('contains verified myth provisions with valid authorities', () => {
    expect(MYTH_PROVISIONS.length).toBeGreaterThanOrEqual(4);
    MYTH_PROVISIONS.forEach((myth) => {
      expect(myth.authority.length).toBeGreaterThan(0);
      expect(myth.explanation.length).toBeGreaterThan(0);
    });
  });

  it('contains 4 supply chain stages', () => {
    expect(SUPPLY_CHAIN_STAGES).toHaveLength(4);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test src/data/data.test.ts`
Expected: FAIL with missing modules.

- [ ] **Step 3: Implement domain types in `src/types/domain.ts` and populate data files**

Create typed data records extracted from the vetted prototype:
- `src/data/nodes.ts`: Capas New Clark City, Subic Bay Port, Metro Manila PEZA, Batangas Clean Energy Port, Bulacan Rail Logistics Hub.
- `src/data/myths.ts`: Rumors regarding diplomatic immunity, US military bases, secret data centers, and raw ore flight.
- `src/data/supplyChain.ts`: Upstream extraction, intermediate fabrication, advanced packaging, clean energy grid.
- `src/data/dispatches.ts`: Official releases from DTI, BCDA, and allied partners.
- `src/data/milestones.ts`: Timeline entries from April 2026 declaration through operational phases.
- `src/data/explainer.ts`: Executive overview text and strategic pillars.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test src/data/data.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit domain data**

```bash
git add src/types/domain.ts src/data/
git commit -m "feat: add typed domain models and vetted pax silica dataset"
```

---

### Task 3: Theme Provider, Header, and Hero Component

**Files:**
- Create: `src/context/ThemeContext.tsx`
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/sections/HeroSection.tsx`
- Test: `src/components/layout/Navbar.test.tsx`
- Test: `src/components/sections/HeroSection.test.tsx`

**Interfaces:**
- Consumes: `EXPLAINER_CONTENT` from `src/data/explainer.ts`.
- Produces: `ThemeProvider`, `useTheme`, `Navbar`, and `HeroSection`.

- [ ] **Step 1: Write test verifying theme toggle and hero text**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../../context/ThemeContext';
import Navbar from './Navbar';
import HeroSection from '../sections/HeroSection';

describe('Navbar and Theme Toggle', () => {
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
  });
});

describe('HeroSection', () => {
  it('renders Pax Silica headline and key metrics', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Pax Silica/i)).toBeDefined();
    expect(screen.getByText(/Luzon Economic Corridor/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test src/components/layout/Navbar.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement ThemeContext, Navbar, and HeroSection**

`ThemeContext`: Manages `theme` state (`light` by default, `dark`), syncs `dark` class on `document.documentElement`, and stores choice in `localStorage`.
`Navbar`: Sahara warm minimalism bar with branding title in EB Garamond, navigation links ("Explainer", "Corridor Map", "Myth-Buster", "Dispatches"), and theme toggle icon.
`HeroSection`: Sun-baked editorial presentation with prominent EB Garamond serif headline, summary text in Manrope, and stat pills (1,620 Hectares, 50+ Suitors, $100B Allied Network).

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test src/components/layout/Navbar.test.tsx src/components/sections/HeroSection.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit layout and hero**

```bash
git add src/context/ src/components/layout/ src/components/sections/HeroSection.tsx
git commit -m "feat: implement theme provider, navigation bar, and hero section"
```

---

### Task 4: Foundational Explainer and Myth-Buster Counter-Disinformation Sections

**Files:**
- Create: `src/components/sections/ExplainerSection.tsx`
- Create: `src/components/sections/MythBusterSection.tsx`
- Create: `src/components/ui/MythCard.tsx`
- Test: `src/components/sections/MythBusterSection.test.tsx`

**Interfaces:**
- Consumes: `EXPLAINER_CONTENT` from `src/data/explainer.ts`, `MYTH_PROVISIONS` from `src/data/myths.ts`.
- Produces: `ExplainerSection` and `MythBusterSection`.

- [ ] **Step 1: Write test verifying myth-buster card rendering and verdict colors**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MythBusterSection from './MythBusterSection';

describe('MythBusterSection', () => {
  it('renders all myth claims with official verdicts', () => {
    render(<MythBusterSection />);
    expect(screen.getByText(/Diplomatic Immunity/i)).toBeDefined();
    expect(screen.getAllByText(/REJECTED BY PH GOVT/i).length).toBeGreaterThan(0);
  });

  it('expands card to show legal citation and authority when clicked', () => {
    render(<MythBusterSection />);
    const detailButton = screen.getAllByRole('button', { name: /view legal basis/i })[0];
    fireEvent.click(detailButton);
    expect(screen.getByText(/BCDA CEO Joshua Bingcang/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test src/components/sections/MythBusterSection.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement ExplainerSection, MythBusterSection, and MythCard**

`ExplainerSection`: Three structured cards addressing:
1. What is Pax Silica?
2. Why is the Philippines strategically central?
3. What are the economic safeguards for local sovereignty and workforce development?
`MythBusterSection`: Grid of `MythCard` components. Each card displays:
- The circulating rumor statement.
- Official verdict badge in terracotta/rose styling.
- Authority attribution (BCDA, Office of the President, DTI).
- Legal basis tag and collapsible plain-language factual explanation.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test src/components/sections/MythBusterSection.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit explainer and myth-buster components**

```bash
git add src/components/sections/ExplainerSection.tsx src/components/sections/MythBusterSection.tsx src/components/ui/MythCard.tsx
git commit -m "feat: add explainer section and myth-buster counter-disinformation module"
```

---

### Task 5: 4-Stage Semiconductor Supply Chain Flow Component

**Files:**
- Create: `src/components/sections/SupplyChainSection.tsx`
- Create: `src/components/ui/SupplyChainNodeCard.tsx`
- Test: `src/components/sections/SupplyChainSection.test.tsx`

**Interfaces:**
- Consumes: `SUPPLY_CHAIN_STAGES` from `src/data/supplyChain.ts`.
- Produces: `SupplyChainSection`.

- [ ] **Step 1: Write test verifying supply chain stage interaction**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SupplyChainSection from './SupplyChainSection';

describe('SupplyChainSection', () => {
  it('renders all 4 supply chain stages', () => {
    render(<SupplyChainSection />);
    expect(screen.getByText(/Critical Minerals Extraction/i)).toBeDefined();
    expect(screen.getByText(/Intermediate Wafer Fabrication/i)).toBeDefined();
    expect(screen.getByText(/Advanced Packaging/i)).toBeDefined();
    expect(screen.getByText(/Clean Energy Grid/i)).toBeDefined();
  });

  it('updates stage details when stage tab is selected', () => {
    render(<SupplyChainSection />);
    const stageTwoButton = screen.getByRole('button', { name: /Stage 02/i });
    fireEvent.click(stageTwoButton);
    expect(screen.getByText(/Capas Wafer Lab/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test src/components/sections/SupplyChainSection.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement SupplyChainSection**

Create interactive flow component:
- Step timeline header showing 4 connected stages with connector lines.
- Dynamic stage card displaying title, location badge, key metrics, input feedstocks, domestic value-adds, and participating agencies.
- Responsive layout adapting from horizontal desktop process flow to stacked mobile stepper.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test src/components/sections/SupplyChainSection.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit supply chain section**

```bash
git add src/components/sections/SupplyChainSection.tsx src/components/ui/SupplyChainNodeCard.tsx
git commit -m "feat: implement 4-stage semiconductor supply chain flow component"
```

---

### Task 6: Interactive Luzon Corridor Atlas and Node Inspector Drawer

**Files:**
- Create: `src/components/map/LuzonMap.tsx`
- Create: `src/components/map/NodeInspectorDrawer.tsx`
- Create: `src/components/sections/CorridorAtlasSection.tsx`
- Test: `src/components/map/NodeInspectorDrawer.test.tsx`

**Interfaces:**
- Consumes: `CORRIDOR_NODES` from `src/data/nodes.ts`.
- Produces: `CorridorAtlasSection`, `LuzonMap`, and `NodeInspectorDrawer`.

- [ ] **Step 1: Write test verifying node inspector drawer opens and shows node specs**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
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
    expect(screen.getByText(/New Clark City/i)).toBeDefined();
    expect(screen.getByText(/1,620 Hectares/i)).toBeDefined();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vitest.fn();
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test src/components/map/NodeInspectorDrawer.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement LuzonMap, NodeInspectorDrawer, and CorridorAtlasSection**

`LuzonMap`:
- Initializes Leaflet map centered on Luzon (`[14.9, 120.8]`, zoom 8).
- Places custom styled HTML markers with pulsing node indicators.
- Draws polyline connecting lines representing the Luzon Economic Corridor cargo railway and expressway spine.
- Synchronizes with theme (warm tinted map styling in light mode, dark obsidian tiles in dark mode).
`NodeInspectorDrawer`:
- Slide-out panel displaying full node title, geographic coordinates, zone allocation acreage, primary role, key suitors, and infrastructure connectivity.
`CorridorAtlasSection`:
- Hosts map viewport, quick node selector buttons (New Clark City, Subic Bay, Manila, Batangas, Bulacan), and manages active node state.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test src/components/map/NodeInspectorDrawer.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit corridor atlas components**

```bash
git add src/components/map/ src/components/sections/CorridorAtlasSection.tsx
git commit -m "feat: implement interactive luzon corridor atlas and node inspector drawer"
```

---

### Task 7: Intelligence Dispatches Feed, Milestones Timeline, and Shareable Cards

**Files:**
- Create: `src/components/ledger/DispatchesFeed.tsx`
- Create: `src/components/ledger/MilestonesTimeline.tsx`
- Create: `src/components/sections/LedgerSection.tsx`
- Create: `src/components/ui/ShareableCardModal.tsx`
- Test: `src/components/ledger/DispatchesFeed.test.tsx`
- Test: `src/components/ledger/MilestonesTimeline.test.tsx`

**Interfaces:**
- Consumes: `NEWS_CARDS` from `src/data/dispatches.ts`, `MILESTONES` from `src/data/milestones.ts`.
- Produces: `LedgerSection`.

- [ ] **Step 1: Write tests for filtering dispatches and rendering timeline**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DispatchesFeed from './DispatchesFeed';
import MilestonesTimeline from './MilestonesTimeline';

describe('DispatchesFeed', () => {
  it('filters news cards when stakeholder chip is clicked', () => {
    render(<DispatchesFeed />);
    const officialChip = screen.getByRole('button', { name: /State \/ Official/i });
    fireEvent.click(officialChip);
    expect(screen.getByText(/Zero Data Centers Inside Capas/i)).toBeDefined();
  });
});

describe('MilestonesTimeline', () => {
  it('renders milestones in chronological order with status badges', () => {
    render(<MilestonesTimeline />);
    expect(screen.getByText(/Pax Silica Declaration Signed/i)).toBeDefined();
    expect(screen.getByText(/COMPLETED/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test src/components/ledger/DispatchesFeed.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement DispatchesFeed, MilestonesTimeline, ShareableCardModal, and LedgerSection**

`DispatchesFeed`:
- Search input and stakeholder filter pills ("All", "State / Official", "Industry", "Allied Governments").
- News dispatch cards with source attribution, date badge, topic tags, headline, summary, and "Share Fact" button.
`MilestonesTimeline`:
- Timeline spine with node badges, completion status badges (Completed, In Progress, Scheduled), and detailed milestone notes.
`ShareableCardModal`:
- Modal previewing a styled graphic fact summary card with copy-to-clipboard action for social media and press sharing.
`LedgerSection`:
- Segmented tab control switching between "Intelligence Dispatches" and "Milestone Ledger".

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test src/components/ledger/DispatchesFeed.test.tsx src/components/ledger/MilestonesTimeline.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit ledger components**

```bash
git add src/components/ledger/ src/components/ui/ShareableCardModal.tsx src/components/sections/LedgerSection.tsx
git commit -m "feat: implement dispatches feed, milestone timeline, and shareable fact cards"
```

---

### Task 8: Main Application Integration, Accessibility, and Production Build

**Files:**
- Modify: `src/App.tsx`
- Create: `src/components/layout/Footer.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: All components from Tasks 1 through 7.
- Produces: Complete production application bundle.

- [ ] **Step 1: Write integration test verifying all 6 modules are present in App**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Full Integration', () => {
  it('renders all 6 core modules seamlessly', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Pax Silica/i, level: 1 })).toBeDefined();
    expect(screen.getByText(/Foundational Overview/i)).toBeDefined();
    expect(screen.getByText(/Myth vs Reality/i)).toBeDefined();
    expect(screen.getByText(/Semiconductor Supply Chain/i)).toBeDefined();
    expect(screen.getByText(/Luzon Corridor Atlas/i)).toBeDefined();
    expect(screen.getByText(/Intelligence Ledger/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test src/App.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Assemble App.tsx and implement Footer**

Wire all sections into a narrative scroll in `src/App.tsx`:
1. `Navbar`
2. `HeroSection`
3. `ExplainerSection`
4. `MythBusterSection`
5. `SupplyChainSection`
6. `CorridorAtlasSection`
7. `LedgerSection`
8. `Footer` with legal disclaimers, data source attributions, and constitutional sovereignty notices.
Verify smooth scrolling anchors (`#explainer`, `#myths`, `#supply-chain`, `#atlas`, `#ledger`).

- [ ] **Step 4: Run full test suite and execute production build**

Run: `npm test`
Expected: All tests PASS.
Run: `npm run build`
Expected: Build succeeds with zero errors, generating static output in `dist/`.

- [ ] **Step 5: Commit full integration**

```bash
git add src/App.tsx src/components/layout/Footer.tsx src/App.test.tsx
git commit -m "feat: integrate full 6-module narrative application and verify production build"
```
