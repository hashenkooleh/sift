# Design references and direction

## Design intent

**Who:** Андрій, фрілансер-дизайнер. Вранці з кавою, ноутбук відкритий. У голові — задачі від клієнтів.

**What must he do:** За 15 хвилин побачити що нового в індустрії, відмітити корисне, закрити і піти працювати.

**Feel:** Cold and precise, polished. Dark SaaS — як Linear: чисто, щільно, кожна деталь продумана.

## Bold aesthetic flavor

Luxury / refined (dark variant). Generous whitespace на темному фоні. Subtle motion. Quiet confidence. Refined engineering aesthetic, not raw brutalism.

## Reference apps

### Linear (linear.app)
**Take:** Dark theme palette, smooth animations, sidebar navigation, clean typography на темному фоні, subtle 1px borders замість shadows, command-palette UX pattern, issue card layout → digest card layout.

### Vercel (vercel.com)
**Take:** Gradient accents (purple-blue), contrast hierarchy, Geist typeface family (Sans + Mono), polished but technical feel, deployment card pattern → digest summary pattern.

### Brief Digest (briefdigest.news)
**Take:** Digest card with "N sources merged" badge, compact summary format, source attribution row (Reuters | BBC | TechCrunch → Channel A | Channel B), clean feed structure, AI clustering visualization.

### Avoid
- Feedly's enterprise density and cluttered UI
- Readwise's deep-work reading-mode complexity
- Generic light-theme SaaS templates
- "Warm and cozy" aesthetic — this is a tool, not a notebook
- Excessive gradients or glassmorphism

## Design tokens

### Palette (dark theme)

| Token | Value | Usage |
|-------|-------|-------|
| --bg-primary | #0A0A0B | Main background |
| --bg-surface | #1A1A1D | Cards, sidebar |
| --bg-elevated | #222225 | Hover states, active items |
| --border | #2A2A2D | Subtle borders (1px) |
| --text-primary | #FAFAFA | Headings, primary content |
| --text-secondary | #A0A0A0 | Timestamps, metadata |
| --text-muted | #666666 | Disabled, hints |
| --accent | #3B82F6 | Primary action, links, priority-high badge |
| --accent-subtle | #3B82F620 | Accent backgrounds (12% opacity) |
| --success | #22C55E | "Mark useful" confirmation |
| --warning | #F59E0B | Priority-medium badge |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Page title | Geist Sans | 24px | 600 |
| Section heading | Geist Sans | 18px | 600 |
| Card title | Geist Sans | 16px | 500 |
| Body text | Geist Sans | 14px | 400 |
| Metadata | Geist Mono | 12px | 400 |
| Badge | Geist Sans | 11px | 500 |

### Spacing

Base unit: 8px. Card padding: 16px. Gap between cards: 12px. Sidebar width: 240px.

### Depth

Practically flat. 1px borders (#2A2A2D). Minimal shadows (only modals/dropdowns). Hover = background shift to --bg-elevated.

## Signature element

Digest card: dark surface (#1A1A1D) with 1px border (#2A2A2D), accent badge for priority level, clean source attribution row in Geist Mono. Like a Linear issue card adapted for content digest.

## Named defaults to avoid

1. White background SaaS template — generic, no character
2. Card shadows instead of borders — too soft for this aesthetic
3. Rainbow color coding — only one accent + semantic colors
