# Pax Silica Philippines Intelligence and Public Advocacy Portal Design

## Intent and purpose

The Pax Silica initiative represents a strategic economic partnership between the Philippines, the United States, Japan, and partner nations. 
This project builds a public-facing web platform for citizens, journalists, students, and policy analysts. 
The site delivers clear visual explainers on semiconductor sovereignty, counters misinformation with verified facts, and provides interactive exploration of the Luzon Economic Corridor.

## Principles applied

- `principle-foundational-thinking`. Core data models for corridor nodes, fact checks, dispatches, and supply chain stages are defined in strict TypeScript interfaces before component implementation.
- `principle-experience-first`. The interface leads with an engaging narrative scroll so readers understand foundational concepts before inspecting technical map telemetry.

## Goals, non-goals, and anti-goals

### Goals
- Educate citizens on the April 2026 Pax Silica Declaration and the strategic significance of the Luzon Economic Corridor.
- Provide a clear myth-busting counter-disinformation module addressing sovereignty rumors, base immunity claims, and data center locations.
- Deliver an interactive Leaflet map featuring the five primary economic nodes: New Clark City, Subic Bay, Metro Manila, Batangas, and Bulacan.
- Detail the 4-stage semiconductor supply chain spanning critical minerals to clean energy integration.
- Maintain an intelligence ledger tracking verified milestones and official government dispatches.
- Adhere strictly to the Sahara warm minimalism design system with EB Garamond headlines, Manrope sans body, burnt sienna accents, and warm linen surfaces.
- Provide an optional Obsidian dark mode toggle for low-light viewing.

### Non-goals
- Building a full dynamic CMS backend or authentication system.
- Real-time automated scraping of unvetted social media feeds.
- Multilingual localization beyond English in the initial release.

### Anti-goals
- Jargon-heavy military console aesthetics that alienate everyday citizens.
- Unverified rumors or speculation masquerading as official intelligence.
- Slow or bloated page weight caused by unoptimized assets.

## Constraints

- Static client-side architecture with zero required server runtimes.
- Must run cleanly in modern web browsers across desktop, tablet, and mobile devices.
- Uses OpenStreetMap and Leaflet without proprietary paid map tile API keys.

## Approaches evaluated

### Approach 1. Single-page narrative scroll with interactive map and ledger (Chosen)
The reader lands on an editorial hero and visual explainer. 
Scrolling continues through myth-buster cards and the 4-stage supply chain flow. 
An interactive Luzon Corridor Leaflet map sits alongside a live ledger for dispatches, zone inspectors, and milestones.
- Rationale for selection: Highest reader engagement. Prevents critical fact-checks from being hidden behind secondary tabs. Maintains the cohesive Sahara editorial feel.

### Approach 2. Tabbed multi-view console (Rejected)
Splits the application into four distinct screens: Overview, Map, Myths, and Ledger.
- Reason for rejection: Users frequently skip secondary tabs, lowering exposure to vital myth-busting facts.

### Approach 3. Long-form editorial paper with embedded figures (Rejected)
Presents content as an academic white paper with inline widgets.
- Reason for rejection: Cumbersome for readers who want to filter news or inspect corridor nodes quickly.

## Technical architecture

### Tech stack
- Build tool: Vite
- UI framework: React with TypeScript
- Styling: Tailwind CSS
- Mapping: Leaflet with React Leaflet
- Icons: Lucide React
- Typography: EB Garamond (headlines), Manrope (body and UI), JetBrains Mono (metrics and coordinates)

### Design tokens (Sahara Warm Minimalism)
- Primary accent: Burnt sienna (`#c2652a`)
- Primary background: Warm linen (`#faf5ee`)
- Secondary surface: Warm sand linen (`#f3ede2`)
- Border stroke: Warm muted gray (`#d8d0c8` at 60 percent opacity)
- Card shadow: Soft diffused shadow (`0 2px 16px rgba(58, 48, 42, 0.04)`)
- Dark mode background: Deep obsidian (`#0c0a09`)
- Dark mode surface: Dark panel (`#1c1917`)
- Dark mode text: Warm off-white (`#f5f5f4`)

## Core modules

### 1. Header and hero section
- Clean minimalist navbar with logo, section jump links, and dark mode toggle.
- Headline introducing Pax Silica and the Luzon Economic Corridor in EB Garamond.
- Concise summary of the 1,620-hectare Capas hub and allied semiconductor security network.

### 2. Foundational explainer
- High-level answers to three core citizen questions.
- What is Pax Silica?
- Why did allied nations partner with the Philippines?
- What does semiconductor sovereignty mean for local jobs and economic resilience?

### 3. Myth-buster and sovereign safeguards
- Card grid addressing widespread public rumors.
- Rumor 1: Diplomatic immunity for US tech executives (debunked with constitutional law references).
- Rumor 2: Foreign military base conversion (debunked with BCDA commercial zone charter).
- Rumor 3: Secret data centers in Capas (debunked with DTI clarification on Batangas and Bulacan roles).
- Rumor 4: Raw mineral export exploitation (debunked with domestic value-add refining mandates).
- Each card shows a clear verdict tag, legal authority source, and plain-language explanation.

### 4. Interactive Luzon corridor atlas
- Full interactive Leaflet map focused on Central and Southern Luzon.
- Interactive node markers for New Clark City, Subic Bay, Metro Manila, Batangas, and Bulacan.
- Railway, expressway, and maritime corridor connection overlays.
- Clickable node cards that open a detailed slide-out inspector with zone metrics, land allocations, and key tenant profiles.

### 5. 4-Stage semiconductor supply chain explorer
- Stage 1: Critical minerals extraction and domestic refining (Zambales and Subic).
- Stage 2: Intermediate wafer fabrication and cleanrooms (Capas Hub, New Clark City).
- Stage 3: Advanced packaging, assembly, and testing (PEZA corridors in Metro Manila and Calabarzon).
- Stage 4: Clean energy grid integration (Batangas solar and offshore wind).

### 6. Intelligence dispatches and project milestones
- Filterable news feed categorized by stakeholder (Official, Industry, Civil Society) and topic (Sovereignty, Geopolitics, Workforce).
- Chronological timeline tracking milestones from the April 2026 declaration through 2028 operational targets.
- Shareable summary cards allowing readers to copy or share verified takeaways.

## Data architecture

Content lives in structured TypeScript files under `src/data/`:
- `src/data/explainer.ts`: Core mission, declaration summary, and economic impact metrics.
- `src/data/myths.ts`: Rumor statements, official verdicts, legal citations, and explanations.
- `src/data/nodes.ts`: Geographic coordinates, zone acreage, roles, and status for each corridor node.
- `src/data/supplyChain.ts`: Detailed stage breakdowns, inputs, domestic value-adds, and node affiliations.
- `src/data/dispatches.ts`: Filterable news cards with source attributions, timestamps, and secondary tags.
- `src/data/milestones.ts`: Chronological milestone objects with completion status and verification references.

## Decisions left to the builder

- Exact Tailwind component abstractions and utility class composition.
- Micro-interaction animations for card hover states and drawer transitions.
- Selection of Leaflet basemap tile provider adhering to warm editorial styling.
