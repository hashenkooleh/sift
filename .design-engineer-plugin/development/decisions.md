# Implementation decisions — Digest screen

Source: `mvp-requirements.md` ("### 3. Dashboard UI" — головний екран показує дайджест за сьогодні; картки з саммарі, source attribution, timestamp; фільтр по джерелах і пріоритетах; responsive; ShadCN компоненти), `information-architecture.md` (screen "### 1. Digest (/)"), `references.md` (Linear-as-spine, cold and precise), `prototype.html` (layout baseline).

## Governing constraint (user steer, Decision 5 comment)

This run is a **pure UI/UX pass**. Goal: turn the existing `prototype.html` into real, clickable React components so the prototype can be tested as production components — clicked, navigated, felt. Keep the frontend **light**: no Supabase, no backend, no complex state architecture. Heavier architecture (data layer, real filtering, persistence) is deferred until the user has tested the UI and is satisfied. Every decision below is downstream of this constraint.

## Decision 1 — "Today's highlights" content section
Chose **static placeholder slot** over (omit entirely / build it fully). Reason: the IA names "Today's highlights" as a content section, but the prototype omits it and its cross-source AI summary is Post-MVP (ICE #10). A static placeholder slot honors the IA's structure without faking AI output, and the slot is ready when the AI layer ships.

## Decision 2 — Mock data strategy
Chose **typed fixtures shaped to the schema** (`src/lib/mock-data.ts`, types matching the IA data model: sources / messages / summaries) over (inline arrays in the page / loosely-typed fixtures). Reason: a single typed mock module keeps the eventual Supabase swap a near drop-in. Still light — it is a plain TypeScript fixture file, not a backend.

## Decision 3 — Input modals scope
Chose **build everything** over (defer both modals / build YouTube modal only). Reason: the Digest header's "Parse video" and "+" dropdown are part of the screen the user wants to click-test. Both YouTubeParseModal and TelegramForwardModal ship this run as real components with visual-only (open/close) behavior.

## Decision 4 — Filter and search behavior
Chose **visual-only** over (fully functional / filters work + search deferred). Reason: matches the user's light-frontend steer and the prototype exactly — chips, dropdowns, per-channel checkboxes, and the search bar render and toggle their own state but do not filter the feed. Real filtering is deferred to the data-layer run. Note: this means the acceptance criterion "Фільтр по джерелах і пріоритетах" is met at the UI level only; logic is a tracked follow-up.

## Decision 5 — Digest card actions (Mark useful / View original / Hide)
Chose **visual-only** over (local-state optimistic / mixed). Reason: same light-frontend steer. Actions toggle their own styling (Useful turns green, etc.) but do not mutate the feed — Hide does not remove, View original does not expand. The IA's "expand" / "remove from feed" behaviors arrive with the data-layer run.
