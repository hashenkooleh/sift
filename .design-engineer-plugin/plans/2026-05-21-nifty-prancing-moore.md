# Digest screen — implementation plan

## Context

Sift's design-system foundation is done (3-layer tokens in `globals.css`, six themed base components, the `/design-system` catalog page). Every dashboard page is still an 8-line placeholder and no product-specific components exist (`src/components/custom/` is absent). This plan builds the **Digest screen** — MVP requirement #3 (Dashboard UI), the primary screen Андрій opens every morning to triage industry news in 15 minutes.

**Governing constraint (user steer):** this is a **pure UI/UX pass**. The goal is to turn `.design-engineer-plugin/prototype/prototype.html` into real, clickable React components so the prototype can be tested as production components. Keep the frontend light — no Supabase, no backend, no complex state architecture. All interactivity is visual-only (toggles, open/close). The data layer, real filtering, and persistence are a later run. Decisions are recorded in `.design-engineer-plugin/development/decisions.md`.

## Summary

Build the Digest screen by translating the prototype into themed React components: three base primitives (Checkbox, Dialog, Popover), two layout components (Sidebar, PageHeader), five custom components (DigestCard, PendingItem, FilterDropdown, YouTubeParseModal, TelegramForwardModal), a typed mock-data module, then assemble them into the Digest page at `/`. Each component is added to the `/design-system` catalog before it is used in the screen (per CLAUDE.md). Five phases; every phase is one commit.

## Architectural decisions

- **Prototype is the layout baseline.** `prototype.html` dictates layout, spacing, typography, and color. Components reproduce it 1:1 — no creative deviation. The one substitution: inline SVGs / the `📡` emoji become `lucide-react` glyphs (emoji as iconography is a hard anti-pattern; Lucide is already a dependency).
- **Routing fix first.** `src/app/page.tsx` (a redirect to a non-existent `/digest`) and `src/app/(dashboard)/page.tsx` both resolve to `/` — a Next.js parallel-route conflict. The IA says "Digest (/)", so `src/app/page.tsx` is deleted; the digest screen stays at `(dashboard)/page.tsx` = `/`. This is Phase 1 so the dev server is healthy for all later verification.
- **Component layering.** Base primitives in `src/components/ui/` (ShadCN/base-ui pattern: `cva` + `cn()`, consuming Layer-2 tokens only — matches `button.tsx`/`badge.tsx`). Layout components in `src/components/layout/`. Product components in `src/components/custom/`. Path choices follow CLAUDE.md's explicit file-structure section; Sidebar is a light custom component, not the heavy ShadCN sidebar primitive (light-frontend steer).
- **Light data, typed.** `src/lib/types.ts` holds types shaped to the IA data model (Source / Message / Summary); `src/lib/mock-data.ts` holds fixtures. No fetching, no state store — the page imports fixtures directly. The eventual Supabase swap is a near drop-in.
- **Visual-only interactivity.** Modals and dropdowns open/close; toggles toggle their own styling. Filters, search, and card actions (Useful / View original / Hide) do not mutate the feed. Real behavior is deferred.

## Phase 1: App shell — Sidebar, PageHeader, routing fix

**Objective**: Build the Sidebar and PageHeader, wire the Sidebar into the dashboard layout, and resolve the `/` route conflict so the app renders.

**Depends on**: none

**Files**:
- Create: `src/components/layout/sidebar.tsx`, `src/components/layout/page-header.tsx`
- Modify: `src/app/(dashboard)/layout.tsx` (replace the placeholder `<aside>` with `<Sidebar />`), `src/app/design-system/page.tsx` (catalog entries + NAV)
- Delete: `src/app/page.tsx` (route conflict with `(dashboard)/page.tsx`; the broken `/digest` redirect)

**Reuse**:
- Use as-is: `cn()` (`src/lib/utils.ts`); `lucide-react` icons (already a dependency, used in `design-system/page.tsx`)
- New: Sidebar — no existing equivalent; 240px `--slate` panel, 1px right hairline, monochrome Lucide glyphs, active item indigo, collapses to a 56px icon-rail at ≤768px (prototype `@media` rule). Nav: Digest `/`, Sources `/sources`, Archive `/archive`, Design System `/design-system`, Settings `/settings` (footer).
- New: PageHeader — no existing equivalent; title + Geist Mono meta line + right-aligned actions slot (`children`/`actions` prop).

**Checklist:**
- [ ] `src/app/page.tsx` deleted; `/` renders `(dashboard)/page.tsx` with no route-conflict error
- [ ] `Sidebar` renders all 5 nav items with Lucide glyphs; active state driven by current route; indigo active highlight; footer holds Settings
- [ ] Sidebar collapses to icon-only 56px rail at ≤768px
- [ ] `PageHeader` renders title, optional mono meta line, and an actions slot
- [ ] `(dashboard)/layout.tsx` uses `<Sidebar />` instead of the inline placeholder
- [ ] Both components documented on `/design-system` with a framed preview and added to its NAV

**QA**:
- Run `npm run dev`; open `/` — page loads with no "parallel pages resolve to the same path" error
- Sidebar: every nav item navigates; the item for the current route shows the indigo active state
- Resize the window below 768px — sidebar collapses to a 56px icon rail, labels hidden
- Open `/design-system` — Sidebar and PageHeader appear in the catalog with all states
- Edge case: navigate directly to `/sources` — the Sources nav item (not Digest) shows active

## Phase 2: Base primitives — Checkbox, Dialog, Popover

**Objective**: Add the three missing base components needed by the filter dropdown and modals, themed dark, documented on the catalog.

**Depends on**: none (parallel to Phase 1; ordered after it so the dev server is healthy)

**Files**:
- Create: `src/components/ui/checkbox.tsx`, `src/components/ui/dialog.tsx`, `src/components/ui/popover.tsx`
- Modify: `src/app/design-system/page.tsx` (catalog entries + NAV)

**Reuse**:
- Use as-is: `cn()`; `@base-ui/react` primitives (`Checkbox`, `Dialog`, `Popover` — same library backing existing `button.tsx`/`tabs.tsx`, imported via subpaths e.g. `@base-ui/react/checkbox`)
- New: Checkbox — base-ui `Checkbox`, 14px box, `--border` outline, `--signal` when checked, Lucide `Check` glyph. Matches the prototype `.filter-option input` styling.
- New: Dialog — base-ui `Dialog` (Root/Portal/Backdrop/Popup), centered, `--slate` surface, 1px `--border`, the one place a shadow is allowed; close affordance.
- New: Popover — base-ui `Popover` (Root/Trigger/Positioner/Popup), `--slate` surface, 1px `--border`, shadow allowed; backs FilterDropdown and the header `+` menu.

**Checklist:**
- [ ] `Checkbox` renders unchecked / checked / disabled; checked = `--signal` fill + Check glyph
- [ ] `Dialog` opens centered over a backdrop, closes on backdrop click / Escape / close button; surface `--slate` + 1px border + shadow
- [ ] `Popover` anchors to its trigger, closes on outside click / Escape; surface `--slate` + 1px border + shadow
- [ ] All three consume Layer-2 token aliases only — no raw Layer-1 tokens, no hardcoded hex
- [ ] All three documented on `/design-system` with every state and added to its NAV

**QA**:
- Open `/design-system` — Checkbox shows unchecked/checked/disabled; click toggles the checked state
- Dialog: trigger opens it centered; backdrop click, Escape, and the close button each dismiss it
- Popover: trigger opens it anchored; clicking outside and Escape each dismiss it
- Edge case: open the Dialog, press Tab — focus stays trapped inside the dialog

## Phase 3: Data layer (light) + DigestCard + PendingItem

**Objective**: Define typed mock data shaped to the IA schema; build the two feed components.

**Depends on**: Phase 1 (catalog page conventions)

**Files**:
- Create: `src/lib/types.ts`, `src/lib/mock-data.ts`, `src/components/custom/digest-card.tsx`, `src/components/custom/pending-item.tsx`
- Modify: `src/app/design-system/page.tsx` (catalog entries + NAV)

**Reuse**:
- Use as-is: `cn()`; `Badge` (`src/components/ui/badge.tsx`) for the TG/YT/Web source-type badge; `lucide-react` (`LoaderCircle` for the pending spinner, source-type glyphs)
- New: types — `Source`, `Message`, `Summary` shaped to the IA "Data model" tables (priority `high|medium|low`, source `type` enum, etc.)
- New: `mock-data.ts` — fixtures populated from the prototype's sample cards (the four Telegram digest cards, the channel list, the two pending items), typed against `types.ts`
- New: DigestCard — metadata row (priority dot, source-type Badge, Geist Mono source line, Geist Mono timestamp), Geist Sans title + summary, actions row (Mark useful / View original / Hide as text actions). States: default, useful-marked (Useful green), priority high/medium/low, source-type TG/YT/Web. Visual-only actions.
- New: PendingItem — spinner + Geist Mono label + status text + Geist Mono ETA; the Linear/Retool "processing" register.

**Checklist:**
- [ ] `types.ts` defines Source / Message / Summary matching the IA data-model fields
- [ ] `mock-data.ts` exports typed fixtures (≥4 digest entries, 5 channels, 2 pending items) — content from the prototype
- [ ] `DigestCard` renders all states: priority high/medium/low dot color, TG/YT/Web badge, default vs useful-marked
- [ ] `DigestCard` actions are visual-only (Useful toggles green; Hide and View original do not mutate the feed)
- [ ] `PendingItem` renders spinner, mono label, status, mono ETA
- [ ] No card nested inside a card; metadata in Geist Mono, title/summary in Geist Sans
- [ ] Both components documented on `/design-system` with every state and added to its NAV

**QA**:
- Open `/design-system` — DigestCard shows all priority + source-type + useful-marked states; PendingItem shows the spinner animating
- Click a card's "Useful" action — it turns green; click again — it reverts. "Hide"/"View original" change only their own hover styling, the card stays
- Verify `src/lib/mock-data.ts` is typed against `src/lib/types.ts` (no `any`)
- Edge case: a low-priority card shows the faint dot, not the indigo one

## Phase 4: FilterDropdown + modals

**Objective**: Build the filter dropdown and the two input modals.

**Depends on**: Phase 2 (Checkbox, Dialog, Popover), Phase 1 (PageHeader conventions)

**Files**:
- Create: `src/components/custom/filter-dropdown.tsx`, `src/components/custom/youtube-parse-modal.tsx`, `src/components/custom/telegram-forward-modal.tsx`
- Modify: `src/app/design-system/page.tsx` (catalog entries + NAV)

**Reuse**:
- Use as-is: `Popover` + `Checkbox` (Phase 2), `Dialog` (Phase 2), `Input` + `Button` (`src/components/ui/`), `cn()`, `lucide-react`
- New: FilterDropdown — a filter chip (label + Geist Mono count + chevron) opening a `Popover` of per-channel `Checkbox` rows with priority dots. Visual-only (checkboxes toggle, feed unaffected).
- New: YouTubeParseModal — a `Dialog` with a Geist Mono URL `Input` + Parse `Button` + helper text. Reproduces the prototype parse modal.
- New: TelegramForwardModal — a `Dialog` with the 3-step forward instructions and the `@SiftBot` callout. Reproduces the prototype telegram modal.

**Checklist:**
- [ ] `FilterDropdown` chip opens a Popover of channel checkboxes with priority dots; chevron rotates when open; count in Geist Mono
- [ ] `YouTubeParseModal` opens/closes; URL Input is Geist Mono; helper text present
- [ ] `TelegramForwardModal` opens/closes; 3 numbered steps; `@SiftBot` in Geist Mono indigo
- [ ] Modals use the Phase-2 `Dialog`; FilterDropdown uses the Phase-2 `Popover` + `Checkbox` — no re-implementation
- [ ] All three documented on `/design-system` with open/closed states and added to its NAV

**QA**:
- Open `/design-system` — FilterDropdown opens its checkbox list; checkboxes toggle; chevron rotates
- Trigger YouTubeParseModal and TelegramForwardModal — each opens centered, closes on backdrop / Escape / close button
- Verify the modals reuse `Dialog` (check imports) rather than redefining a dialog
- Edge case: open FilterDropdown, click a checkbox, click outside — popover closes, checkbox state is retained on reopen

## Phase 5: Digest screen assembly

**Objective**: Compose all components into the Digest page at `/`, matching the prototype layout.

**Depends on**: Phase 1, Phase 3, Phase 4

**Files**:
- Modify: `src/app/(dashboard)/page.tsx`

**Reuse**:
- Use as-is: `PageHeader`, `DigestCard`, `PendingItem`, `FilterDropdown`, `YouTubeParseModal`, `TelegramForwardModal`, `Input` (search bar), `Button`, `Popover` (the header `+` menu), `cn()`, `lucide-react`; fixtures from `src/lib/mock-data.ts`
- New: the page-level composition only — the `+` action menu (a `Popover` with Parse URL / Upload file / Forward via Telegram rows) is built inline in the page; it is page-specific, not a reusable component.

**Checklist:**
- [ ] Page order matches the prototype: PageHeader (title + mono meta + "~15 min read" badge + "Parse video" button + "+" menu) → search bar → filter bar → "Today's highlights" placeholder slot → pending section → digest card feed
- [ ] "Parse video" opens YouTubeParseModal; the `+` menu's "Forward via Telegram" opens TelegramForwardModal; "Parse URL" opens YouTubeParseModal-as-URL; "Upload file" is visibly inert/"soon"
- [ ] Filter bar renders the "All" chip + 3 FilterDropdowns (Telegram/YouTube/Web) + Priority — visual-only
- [ ] "Today's highlights" renders as a quiet static placeholder slot (not a broken empty state, not faked AI content)
- [ ] Pending section renders PendingItems from mock data; digest feed renders DigestCards ranked by priority (high → medium → low)
- [ ] Feed is a single-column priority-ranked list — no identical card grid, no cards-in-cards
- [ ] Responsive: layout holds from laptop down to phone width

**QA**:
- Open `/` — the Digest screen matches `prototype.html`: header, search, filters, highlights slot, pending, ranked cards
- Click "Parse video" → YouTubeParseModal opens; click "+" → menu opens → "Forward via Telegram" → TelegramForwardModal opens
- Cards appear high-priority first; the "Today's highlights" slot reads as intentional, quiet, structural
- Resize to phone width — sidebar collapses, the digest column remains readable, nothing overflows
- Edge case: open a modal, then the `+` menu — only one surface is open at a time; Escape closes the open one

## Risk assessment

- **Next.js 16 / base-ui API drift** — `AGENTS.md` warns Next 16 has breaking changes; `@base-ui/react` Dialog/Popover/Checkbox APIs must be verified. Mitigation: the implementer checks `node_modules/next/dist/docs/` and base-ui subpath exports before coding; existing `tabs.tsx`/`button.tsx` show the correct base-ui import pattern.
- **Scope creep into real behavior** — "match the prototype" plus an implementer instinct could add real filtering or persistence. Mitigation: `decisions.md` records visual-only explicitly; the per-phase drift audit + `design-system-auditor` catch invented features.
- **Route conflict masking other errors** — until Phase 1 deletes `src/app/page.tsx`, `next dev` may error globally. Mitigation: Phase 1 is first and its QA confirms a clean dev server before any other phase.
- **`/design-system` page bloat** — adding 10 components to a 671-line page. Mitigation: acceptable (it is the catalog); each phase appends a self-contained section.
- **Emoji in the prototype** — the prototype source rows use a `📡` emoji. Mitigation: production components use `lucide-react` glyphs only; called out in the Design Grounding anti-pattern check.

## Questions for user

None blocking — the five pre-plan decisions resolved the open implementation choices. Two items are deliberately **out of scope** for this run and tracked as follow-ups:

- Real filtering/search logic and card-action persistence (Decisions 4 and 5 chose visual-only). The acceptance criterion "Фільтр по джерелах і пріоритетах" is met at the UI level only this run.
- The Supabase data layer, Telegram aggregation, the daily cron, and the AI summariser (MVP #1, #2, #4, #5) — a later run, per the light-frontend steer.

## Verification (end-to-end)

1. `npm run dev`, open `/` — Digest screen renders, no route-conflict error, no console errors.
2. `/design-system` — all 10 new components appear with their states.
3. Walk the prototype side by side with `/` — layout, spacing, typography, color match.
4. Per-phase Playwright CLI tests (written by `test-writer`) pass green after each phase's implementation.
5. Visual verification screenshots captured under `.design-engineer-plugin/temporary/playwright/<timestamp>/` per phase.
