# Sift design system — saved decisions

Loaded automatically at the start of each `ui-design-system` run. Last updated 2026-05-21.

## Direction and feel

Cold and precise, luxury-refined dark. Linear is the single aesthetic spine — copy Linear's system (tokens, depth model, typographic treatment, monospace discipline), adapt layouts to Sift's own screens. Full direction: `.design-engineer-plugin/design/exploration/references.md`.

## Depth strategy

Borders only. 1px `--border` for all structure. Interaction feedback through tonal shift to `--elevated`, not shadow. Shadows allowed only on modals and dropdowns.

## Spacing

Base unit 8px. Card padding 16px, gap between cards 12px, sidebar width 240px.

## Typography

Geist Sans for UI, Geist Mono for metadata (IDs, timestamps, counts). Two-tone treatment from Linear: primary text and a muted continuation at the same size. Three text tiers: `--dawn-white` primary, `--text-secondary` secondary, `--faint` tertiary.

## Colour temperature

Cool dark. Cool three-step elevation `#0A0A0B → #1A1A1D → #222225`, never warm grey. Single accent: `--signal` `#5E6AD2` (Linear indigo). Semantic colours `--success` and `--warning` for status only. No second accent, no rainbow coding.

## Token architecture

Three layers, defined in `src/app/globals.css` under `.dark`:
- Layer 1: raw domain tokens (`--midnight`, `--slate`, `--elevated`, `--border`, `--dawn-white`, `--text-secondary`, `--faint`, `--signal`, `--success`, `--warning`).
- Layer 2: ShadCN role names alias to Layer 1 (`--background`, `--card`, `--primary`, `--muted`...).
- Layer 3: components consume Layer 2 only.
Retheme by changing a Layer 1 value once. The dimmest text tier is exposed as the `text-faint` utility.

## Component inventory

Base (ShadCN, customised, built): Button, Input, Badge, Tabs, Toggle, Separator.
Custom (product-specific, not yet built): DigestCard, FilterDropdown, PendingItem, SourceRow, YouTubeParseModal, TelegramForwardModal. Add each to the `/design-system` catalog page before using it in screens.

## Consistency checks

- Spacing on the 8px grid.
- Depth borders-only; shadows only on modals and dropdowns.
- Colours from the defined palette; no hardcoded hex in styling.
- Components consume Layer 2 aliases, never raw Layer 1 tokens or hex.

## Status

The accent retheme (`--signal` `#5E6AD2`, renamed from `--signal-blue`) is fully propagated across `globals.css`, `src/`, the `/design-system` page, and `CLAUDE.md` as of 2026-05-21. No open reconciliation items.
