# DesignPulse

Intelligence layer for designers. Aggregates content from Telegram channels, YouTube, and web sources into a structured daily digest with AI summaries.

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **UI:** ShadCN + custom design system on top
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (PostgreSQL)
- **Fonts:** Geist Sans + Geist Mono (Vercel)
- **Language:** TypeScript (strict mode)
- **AI:** Claude Code agent for summarization (uses existing subscription, no API costs)
- **Telegram:** Telegram API (user account, not bot) for channel monitoring
- **Hosting:** Vercel

## Design direction

Dark theme, Linear/Vercel aesthetic. Luxury/refined, not brutalist.

- Background: #0A0A0B (--midnight)
- Surfaces: #1A1A1D (--slate)
- Borders: #2A2A2D 1px (--border). No shadows except modals.
- Text: #FAFAFA primary, #A0A0A0 secondary, #555555 muted
- Accent: #3B82F6 (--pulse-blue). Single accent color only.
- Typography: Geist Sans for UI, Geist Mono for metadata/timestamps
- Spacing: 8px base unit
- Border radius: 6-8px (rounded but not pill-shaped)

Token names must be domain-specific: `--midnight`, `--slate`, `--pulse-blue`, `--dawn-white`. Never `--gray-700` or `--surface-2`.

## Design system

Custom design system built on ShadCN foundation. Two layers:

1. **Base components** — ShadCN components with custom dark theme (Button, Input, Checkbox, Toggle, Badge, Tabs, Sidebar)
2. **Custom components** — product-specific (DigestCard, FilterDropdown, PendingItem, SourceRow, YouTubeParseModal, TelegramForwardModal)

A live Design System page exists at `/design-system` as source of truth. Every component is documented there with all states (default, hover, active, disabled, loading).

When creating new components: add to the Design System page first, then use in screens.

## File structure

```
src/
  app/
    (dashboard)/
      page.tsx          # Digest (home)
      sources/page.tsx
      archive/page.tsx
      design-system/page.tsx
      settings/page.tsx
      layout.tsx         # Sidebar layout
    layout.tsx           # Root layout, fonts, theme
    globals.css          # Tailwind + custom tokens
  components/
    ui/                  # ShadCN base components (customized)
    custom/              # Product-specific components
      digest-card.tsx
      filter-dropdown.tsx
      pending-item.tsx
      source-row.tsx
      youtube-parse-modal.tsx
      telegram-forward-modal.tsx
    layout/
      sidebar.tsx
      page-header.tsx
  lib/
    supabase.ts          # Supabase client
    types.ts             # Shared types
    utils.ts             # Utilities
```

## Conventions

- UI language: English
- AI-generated content language: Ukrainian
- Component naming: PascalCase for components, kebab-case for files
- One component per file
- Props interface defined in the same file as the component
- Use `cn()` utility for conditional classes (ShadCN pattern)
- Prefer composition over configuration — small components composed together

## Source of truth hierarchy

1. User's direct input (always wins)
2. Design System page (/design-system) — for visual patterns
3. This CLAUDE.md — for conventions and rules
4. Prototype at `.design-engineer-plugin/prototype/prototype.html` — for layout reference
5. Design deliverables in `.design-engineer-plugin/design/` — for product decisions

## Do not

- Use light theme anywhere (dark-only for now)
- Add Inter, Roboto, or other fonts — Geist only
- Use generic token names (--primary, --gray-700)
- Create card shadows — use 1px borders
- Add gradient text or glassmorphism
- Nest cards inside cards
- Center-align body text (left-align, sidebar layout)
- Add features not in mvp-requirements.md without asking
