# Key decisions log

Decisions that affect multiple downstream deliverables. Append-only – older entries are valuable for understanding why current choices were made.

## 2026-05-14

- **UX/UI designers only, not broader IT** – narrows persona, competitor positioning, all future copy. Affects: target-audience, assumptions, competitor-analysis, storybrand, mvp-requirements.
- **AI as intelligence layer, not "second brain"** – product positioning and differentiation hinge on this framing; "second brain" is saturated and carries wrong connotations. Affects: storybrand, competitor-analysis, all future marketing copy, mvp-requirements.
- **Manual source curation with priority levels** – user controls what gets aggregated; no auto-scraping. Affects: assumptions (P1-P6), mvp-requirements, UX design patterns.
- **Pet project for personal use first** – ship to self before external users; affects pricing strategy (no monetization pressure in MVP), business assumptions, MVP scope.
- **Telegram integration is the key moat** – verified working at time of competitor analysis; zero competitors support it natively. Affects: competitor positioning, mvp-requirements, storybrand differentiation angle.

## 2026-05-14 – Phase 3 (planning)

- **Claude Code agent as AI backend** – $0 extra cost, reuses existing Anthropic subscription. Affects: tech-stack, mvp-requirements, business-plan cost model, all future dev decisions.
- **Archive auto-expire: single mentions 2 weeks, repeated patterns retained longer** – keeps archive lean without losing signal; distinction between noise and emerging pattern is built into retention logic. Affects: ia data model, mvp-requirements, archive UX.
- **Knowledge Base = user-curated "useful" items, persists indefinitely** – explicit user action ("mark useful") as the curation signal; no auto-inference. Affects: ia data model, mvp-requirements F5/F6, all Knowledge Base UX flows.
- **UI language English, AI-generated content language Ukrainian** – product surface is English; digest/summary output is Ukrainian to match user's primary reading context. Affects: all screen copy, IA labels, storybrand tone, future onboarding.
- **Sources as separate page, not nested under Settings** – Sources is a primary workflow surface; burying it in Settings would reduce discoverability and daily use. Affects: ia nav structure, all screen designs.
- **GitHub integration to parking lot** – new idea surfaced during IA; needs research before committing. Affects: mvp-requirements scope (excluded for now), future roadmap.

## 2026-05-14 – Phase 4 (design & validation, shortened)

- **Dark theme (Linear/Vercel style) as default** – explicit choice against warm/approachable aesthetic; luxury/refined dark variant. Geist Sans/Mono typography. Palette: #0A0A0B bg, #1A1A1D surfaces, #3B82F6 accent. Affects: prototype, all future screen designs, figma-workflow if run, component tokens.
- **Cards format for digest (not table or timeline)** – chosen as primary content display pattern. Affects: prototype layout, figma-workflow, all dev screen implementations.
- **Two input channels: UI buttons (Parse video, Parse URL) + Telegram forward to bot** – dual entry model; no other ingestion methods in MVP. Affects: mvp-requirements (confirm alignment), ia (stale – see stale-dependents), all dev screens.
- **Pending queue pattern for async processing** – items enter a visible pending state before appearing in digest. Affects: ia (stale), prototype, all dev data-flow implementation.
- **Filter dropdowns per source type (Telegram/YouTube/Web) with per-channel checkboxes** – granular source filtering at the channel level. Affects: ia (stale), prototype, dev filter/query logic.
- **Source type badges on cards (TG, YT, Web)** – visual provenance signal on every digest card. Affects: prototype, dev card component.
- **bias-audit, journey-map, motivation-audit, ethics-review, product-assessment all skipped** – advisor recommendation: overhead not justified for a pet project. Phase 4 shortened to design-references + prototype only. Affects: pipeline sequence (Phase 5 starts directly after prototype).

## 2026-05-20

- **Product renamed DesignPulse → Sift** – old name was descriptive and generic; "Sift" names the core value of sifting signal from noise, more distinctive and memorable. Propagated across 9 files (CLAUDE.md, design deliverables, prototype.html, src/). Telegram bot handle is now @SiftBot, npm package name is "sift". Affects: all naming, copy, tokens, marketing, any future external references.
- **Accent token renamed --pulse-blue → --signal-blue** – CLAUDE.md requires domain-specific token names; "signal" fits Sift's concept of surfacing signal from noise, "pulse" was tied to the old product name. Affects: globals.css, design-system page, prototype.html, all components using the accent color.
- **GitHub repo is public** – user chose public over the recommended private repo. Strategy documents (business-plan.md, competitor-analysis.md) are now publicly visible on GitHub. Affects: what external parties can see; treat those files as effectively public going forward.

## 2026-05-21

- **Linear is the single aesthetic spine for Sift** – reference set narrowed from 5 apps to 4; Linear chosen as the primary visual reference, not just one of several. Affects: references.md, design-system.md, all future UI decisions, prototype reference framing.
- **Accent changed from #3B82F6 (--signal-blue) to #5E6AD2 (--signal), Linear indigo** – old blue was a generic Bootstrap/Tailwind colour; Linear indigo is more refined and on-brand. Token renamed --signal-blue → --signal. Fully propagated across globals.css, src/, /design-system page, CLAUDE.md, and all design deliverables. Affects: every file touching the accent colour token.
- **Three-layer token architecture adopted** – Layer 1: raw domain tokens (--midnight, --slate, --signal, --dawn-white, --faint, --whisper); Layer 2: ShadCN role-name aliases (--background, --foreground, --primary, etc.) that map to Layer 1; Layer 3: per-component overrides. Affects: globals.css, all components, any future token additions.
- **Tertiary text raised from #555555 to #8A8A8A (--faint) for WCAG AA** – #555555 on #0A0A0B fails contrast (3.5:1); #8A8A8A passes AA at 4.6:1. Old value logged in memory as a known failure. Affects: globals.css muted token, any component using muted/tertiary text, design-system documentation.
- **Figma stays a visual helper only; Sift remains code-first** – Figma MCP was connected (OAuth) and prototype pushed to file g8hBtHVY9zHNzuNQH7G1yH as a learning pass. Decision confirmed: Figma is a reference and communication tool, not the source of truth. Affects: ui-figma-guide classification (exploratory, not a pipeline requirement), future workflow expectations.

## 2026-05-21 – Development phase 1 (app shell) — user-approved

- **Active nav-item state: grey elevated surface + 2px `--signal` left-edge bar** – RESOLVED at Phase 1 sign-off. Matches the frozen prototype and Linear's own treatment; an indigo fill would over-signal on a dark background. The 2px indigo left-edge bar provides the accent hit without flooding the surface. Affects: sidebar.tsx, design-system catalog, and references.md (one-line correction still pending — references.md still says "підсвічений індиго").
- **"Design System" nav item moved to footer group beside Settings** – RESOLVED. Primary nav is now a 3-item triage spine (Digest / Sources / Archive only); Design System is a dev/reference surface, not a daily-use destination. Affects: sidebar.tsx nav structure, any documentation listing primary nav items.
- **Sift logo wrapped as a link to `/`** – RESOLVED. Standard web convention; clicking the logo resets to the home/Digest view. Affects: sidebar.tsx logo element.
- **PageHeader exposes a single `actions` prop** – `children` alternative removed as parameter sprawl; a single named slot is cleaner to compose. Affects: page-header.tsx and every screen that renders a page header.
- **Governing constraint: pure UI/UX pass, no backend** – all Phase 5 Digest-screen work is visual-only interactivity; no Supabase, no real filtering logic. Heavier architecture deferred until UI is test-approved. Affects: mock-data strategy, filter behavior, card actions, modal behavior across all phases of this sub-pipeline.
- **Playwright verification via MCP + screenshots, not playwright-cli** – `playwright-cli` binary absent in this environment; `tests/*.sh` files stand as written behavioral spec only, not as runnable checks. Affects: all phase verification steps in the Digest-screen sub-pipeline.

## 2026-05-22 – Development phase 2 (base primitives) — pending user approval

- **Dialog exports `DialogHeader`/`DialogFooter` layout helpers** – not in the plan's literal component list, but the plan said "export the composable parts"; these helpers keep Phase 4 modal composition consistent and avoid re-inventing layout scaffolding in each modal. Affects: dialog.tsx, YouTubeParseModal, TelegramForwardModal.
- **Checkbox box is 14px (`size-3.5`), deliberately sub-8px-grid** – matches the prototype's `.filter-option` checkbox exactly; visual regression over ergonomics was an intentional product call. Affects: checkbox.tsx, FilterDropdown checkbox rows (Phase 3+). Carry-forward: FilterDropdown rows must be full-row `<label>` hit-areas to compensate.
- **base-ui v1.4.1 API surface locked for Phase 4 composition** – Checkbox forwards `checked`/`defaultChecked`/`onCheckedChange`; Dialog and Popover expose `open`/`onOpenChange` and `className` passthrough. Recording this now so Phase 4 doesn't rediscover the API. Affects: FilterDropdown, YouTubeParseModal, TelegramForwardModal.
- **Shadows only on Dialog/Popover popups, not on flat surfaces** – consistent with the governing rule (1px border, no card shadow); popups are the one exception because elevation is meaningful there. Affects: dialog.tsx, popover.tsx, and any future popup components.

## 2026-05-14 – Phase 2 (strategy)

- **Telegram-bot as digest delivery channel** – ride existing habit rather than building a new surface. Zone A analysis confirmed prompt is the weakest lever; delivery channel is where friction is lowest. Affects: mvp-requirements, ia, storybrand delivery story, all UX flows.
- **AI layer deferred to post-MVP** – manual curation ships first; AI assistance added only after 90-day dogfood proves the core loop works. Prevents scope creep and keeps MVP in the 2-week target window. Affects: mvp-requirements, business-plan roadmap, tech-stack choices.
- **Success metric = daily use for 90 days, not revenue** – pet project framing; no monetization pressure in v1. Affects: mvp-requirements acceptance criteria, business-plan KPIs, feature prioritization.
- **8h/week time budget (6h features + 2h maintenance)** – hard constraint that governs feature scope and MVP definition. Affects: mvp-requirements, ia scope, all future sprint planning.
- **MVP in 2 weeks → 30-day dogfood → open to 3–5 colleagues free** – phased rollout locks release sequencing. Affects: mvp-requirements, ia, go-to-market sequencing.
