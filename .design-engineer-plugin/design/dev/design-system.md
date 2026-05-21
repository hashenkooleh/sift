# Design system

Code-first design system for Sift. Built in code, not Figma. The `/design-system` page in the app is the living catalog; this document records the architecture and the decisions behind it. Established 2026-05-21 via the `ui-design-system` skill.

## Architecture

Three layers. Components consume Layer 2 only, never Layer 1 directly.

```
Layer 1  raw domain tokens   (the palette, source of truth)
            ↓
Layer 2  semantic aliases    (ShadCN role names point at Layer 1)
            ↓
Layer 3  components          (ShadCN base + Sift custom)
```

All tokens are defined in `src/app/globals.css` under `.dark`. The project is dark-only, and `.dark` is always applied on `<html>` (see `src/app/layout.tsx`). The `:root` block holds the default ShadCN light theme; it is never active and is left untouched.

## Depth strategy

Borders only. A 1px `--border` carries all structure: navigation, panels, cards, dividers. Interaction feedback comes from a tonal shift (hover moves a surface to `--elevated`), not from shadow. Shadows are allowed only on modals and dropdowns. This matches the cold, precise intent in `references.md` and the `CLAUDE.md` rule "No shadows except modals".

## Layer 1: token inventory

Raw domain values. These are the source of truth. A retheme changes a value here once and it propagates through every alias.

| Token | Value | Role |
|---|---|---|
| `--midnight` | `#0A0A0B` | App background, pre-dawn blue-black |
| `--slate` | `#1A1A1D` | Cards, sidebar surfaces |
| `--elevated` | `#222225` | Hover and active surfaces |
| `--border` | `#2A2A2D` | 1px borders and dividers |
| `--dawn-white` | `#FAFAFA` | Primary text |
| `--text-secondary` | `#A0A0A0` | Secondary text, metadata |
| `--faint` | `#8A8A8A` | Tertiary text, passes WCAG AA on `--midnight` |
| `--signal` | `#5E6AD2` | Single accent, Linear indigo |
| `--success` | `#22C55E` | "Mark useful" confirmation |
| `--warning` | `#F59E0B` | Medium-priority status |

`--destructive` (`#EF4444`) is held directly at Layer 2 — it is a single-use role with no domain-palette meaning.

## Layer 2: semantic aliases

ShadCN role names. Components and Tailwind utilities consume these. Each points at a Layer 1 token.

| Alias | Points to |
|---|---|
| `--background` | `--midnight` |
| `--foreground` | `--dawn-white` |
| `--card`, `--popover`, `--sidebar` | `--slate` |
| `--primary`, `--ring`, `--sidebar-primary`, `--chart-1` | `--signal` |
| `--secondary`, `--muted`, `--accent`, `--sidebar-accent` | `--elevated` |
| `--muted-foreground`, `--chart-4` | `--text-secondary` |
| `--chart-5` | `--faint` |
| `--input`, `--sidebar-border` | `--border` |
| `--destructive` | `#EF4444` (direct) |

The dimmest text tier needs its own utility because ShadCN has no role for a third text level. `--faint` is exposed through `@theme inline` as `--color-faint`, which gives the Tailwind class `text-faint`. Subtle accent backgrounds use the Tailwind opacity modifier (`bg-primary/15`) rather than a separate token.

## Layer 3: component catalog

Base components (ShadCN, customised with the dark theme). All consume Layer 2 token classes, no hardcoded values:
Button, Input, Badge, Tabs, Toggle, Separator.

Custom components (product-specific, not yet built — to be built in the development phase, added to the `/design-system` page first per `CLAUDE.md`):
DigestCard, FilterDropdown, PendingItem, SourceRow, YouTubeParseModal, TelegramForwardModal.

## Compliance

| Check | Result |
|---|---|
| Hardcoded colours in styling | 0 (was ~20 across layout and screens) |
| Components use semantic aliases | Yes |
| Depth strategy consistent | Yes, borders-only |
| Token naming consistent | Yes, three-layer with domain names |
| Build and TypeScript | Passes (`next build` clean) |
| Hardcoded font sizes | `text-[11px]` and `text-[13px]` remain in placeholder digest markup |
| Duplicated styling | Five sidebar nav links in `(dashboard)/layout.tsx` repeat one className |

The token layer is fully compliant. The two remaining items sit in placeholder markup (`(dashboard)/page.tsx`, `(dashboard)/layout.tsx`) that will be replaced by real components (DigestCard, Sidebar) in the development phase. The 10 hex strings in `design-system/page.tsx` are catalog display data, not styling.

## Extending the system

- New colour: add a Layer 1 token only if the value is reused across more than one role; a single-use value can sit directly at Layer 2.
- New component: consume Layer 2 classes (`bg-card`, `text-foreground`, `border-border`, `text-faint`), never raw Layer 1 tokens or hex.
- Retheme: change the Layer 1 value once.
- Add every new component to the `/design-system` catalog page first, then use it in screens.

## Decisions this session

- Adopted the three-layer architecture: domain tokens (Layer 1), ShadCN names as aliases (Layer 2). This resolved the gap where `CLAUDE.md` mandated domain token names but the code used generic ShadCN names.
- Accent moved from `#3B82F6` to `#5E6AD2` (Linear indigo) and the token renamed `--signal-blue` to `--signal`, per the moodboard refresh in `references.md`.
- Tertiary text lifted from `#555555` to `#8A8A8A` (`--faint`) so it passes WCAG AA.
- Depth confirmed as borders-only.

## Open items

- `prototype.html` keeps the old blue and Inter font. It is left frozen as a layout reference and is not updated (prototypes are throwaway artifacts once design direction is set).

The accent retheme is fully reconciled: `globals.css`, `src/`, the `/design-system` page, and `CLAUDE.md` all use `--signal` `#5E6AD2` as of 2026-05-21.
