---
activity: design-system-retheme
date: 2026-05-21
phase: cross_phase
deliverable_type: lessons_learned
component: dev_design_system
status: complete
severity: high
tags: [design-system, design-tokens, linear, retheme, moodboard, figma-mcp, accent]
related_deliverables:
  - ".design-engineer-plugin/design/exploration/references.md"
  - ".design-engineer-plugin/design/dev/design-system.md"
  - ".design-engineer-plugin/design/dev/lessons-learned-20260520.md"
  - ".design-system/system.md"
tools_used: [claude-code, figma-mcp, playwright-mcp]
decisions:
  - "Linear is the single aesthetic spine. Copy Linear's system (tokens, depth model, type treatment, monospace discipline), adapt layouts to Sift's own screens. Chosen to avoid spreading reference effort thin across many apps."
  - "Accent moved from #3B82F6 to #5E6AD2 (Linear indigo); token renamed --signal-blue to --signal. The user chose exact Linear fidelity over keeping Sift's own blue, accepting that Sift now reads as a Linear-adjacent product."
  - "Three-layer token architecture: raw domain tokens (Layer 1) plus ShadCN role names as aliases (Layer 2). Resolves the conflict between the CLAUDE.md domain-token mandate and ShadCN's generic names without dropping either."
  - "Tertiary text lifted from #555555 to #8A8A8A (--faint) so it passes WCAG AA."
  - "Figma stays a visual helper, not a design source. The design system lives in code; a parallel system in Figma was rejected as duplicate maintenance for a solo code-first project."
failed_approaches:
  - "Glassmorphism was floated for a 'modern SaaS' feel, then dropped. It contradicts CLAUDE.md, reads as a 2021 trend in 2026, and would fail contrast on a dense dark feed."
  - "The skill's nested path exploration/references/references.md was rejected by the path-validation hook. The canonical location is the flat exploration/references.md, so the deliverable was written there."
  - "Notion Calendar was picked as a dense-data reference, but its marketing site is light and playful. Only its product-UI patterns are usable, not its aesthetic."
---

# Design system retheme

## What was done

Three skills ran in sequence this session, all Phase 4 design work for Sift.

`ui-references-moodboard` (refresh): rewrote `references.md`. Narrowed the reference set from five apps to four and made Linear the single aesthetic spine. Captured sectional screenshots of Linear, Raycast, Notion Calendar, and Retool with Playwright.

`ui-figma-guide`: connected the Figma MCP over OAuth and pushed the HTML prototype into Figma as a learning pass (file `g8hBtHVY9zHNzuNQH7G1yH`). Concluded that Figma stays a visual helper; Sift's design flow is code-first.

`ui-design-system`: defined a three-layer token architecture and executed the retheme in code. Rewrote `globals.css`, retokenised the layout and screen files, updated the design-system catalog page, and reconciled `CLAUDE.md`.

## Key decisions

See the frontmatter `decisions` block. The through-line: Linear became the single reference spine, the accent moved to Linear's indigo, and the token layer was restructured so domain names and ShadCN names coexist.

## What worked

- The three-layer architecture resolved the domain-token-versus-ShadCN-names conflict cleanly. ShadCN components keep working unchanged, and a retheme is now a one-line change at Layer 1.
- Executing the retheme inside `ui-design-system` rather than deferring it meant the compliance audit passed clean and `next build` succeeded with zero hardcoded styling hex.
- The Tailwind opacity modifier (`bg-primary/15`) removed the need for a separate subtle-accent token.

## What did not work

See the frontmatter `failed_approaches` block: glassmorphism, the nested deliverable path, and Notion Calendar's marketing-site aesthetic.

## Deliverable

- `references.md` (revised) — design direction
- `design-system.md` (new) — token architecture, compliance audit, extension guide
- `.design-system/system.md` (new) — saved decisions, auto-loaded by future `ui-design-system` runs
- Code: `globals.css` plus eight layout and screen files retokenised; `CLAUDE.md` accent reconciled
- Figma file `g8hBtHVY9zHNzuNQH7G1yH` — prototype capture, a learning artifact

## Dependencies

Builds on `references.md`, `mvp-requirements.md`, `information-architecture.md`. Feeds into `/design-engineer:development` for the custom-component build.

## Open questions

- Custom components (DigestCard, Sidebar, SourceRow, FilterDropdown, the two modals) are not yet built. That is the development phase.
- Placeholder markup keeps off-scale font sizes (`text-[11px]`, `text-[13px]`). They resolve when real components replace the placeholders.

## Context for next session

The token system lives in `src/app/globals.css` under `.dark`, three layers. The accent is `--signal` `#5E6AD2` everywhere. The next step is `/design-engineer:development` to build the custom components, each added to the `/design-system` page before use. `prototype.html` is frozen with the old blue and Inter font; do not update it, it is a throwaway layout reference. The Figma MCP is connected (account: Oleg Gashenko).
