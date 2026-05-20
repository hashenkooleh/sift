# Project Map

Living file tree of the project. Format per entry:
`path – description (≤10 words) | when to read`

Folders under `.design-engineer-plugin/design/` are created on-demand by the
skill that writes its first deliverable there. Add entries below as folders
appear; remove entries if a folder is deleted.

## .design-engineer-plugin/design/ (populated by discovery pipeline)
- foundation/ – problem, audience, assumptions, business-plan, storybrand | read at pipeline start
- research/ – competitor-analysis | read before positioning
- planning/ – mvp-requirements, information-architecture | read before design and dev
- exploration/ – behavior-map, references, story-panels/morning-ritual | read before prototyping
- (psychology/, reviews/, dev/ – not created; those skills were skipped)
- features/ – per-feature spec dirs (post-launch features) | read when iterating

## .design-engineer-plugin/prototype/ (committed; HTML prototypes)
- prototype.html – polished 4-page prototype (Digest/Sources/Archive/Settings) | read before dev

## Application code (Next.js 15 App Router – scaffolded 2026-05-15)
- CLAUDE.md – project rules: tech stack, design direction, tokens, conventions | read before any dev
- src/app/layout.tsx – root layout, fonts (Geist), theme | read before screen work
- src/app/globals.css – Tailwind + custom dark theme tokens wired into ShadCN | read before styling
- src/app/(dashboard)/layout.tsx – sidebar layout (placeholder sidebar) | read before screen work
- src/app/(dashboard)/page.tsx – Digest screen (placeholder scaffold) | read when building Digest
- src/app/(dashboard)/sources|archive|settings/page.tsx – placeholder scaffolds | read when building those screens
- src/app/(dashboard)/design-system/page.tsx – Design System source of truth (tokens + base components done; custom = placeholders) | read before building any component
- src/components/ui/ – 6 customized ShadCN base components (button, badge, input, separator, tabs, toggle) | reuse before creating new UI
- src/components/custom/ – product components (NOT created yet: DigestCard, FilterDropdown, PendingItem, SourceRow, modals) | build here next
- src/lib/utils.ts – cn() utility | read before styling
- package.json / next.config.ts / tsconfig.json / components.json – build + ShadCN config | read for setup

## .design-engineer-plugin/plans/ (committed; implementation plans)
- <YYYY-MM-DD>-<slug>.md – active implementation plan | read by hooks
- archive/ – completed plans | reference history

## .design-engineer-plugin/temporary/ (GITIGNORED; auto-purged at phase boundaries)
- scratch/ – general throwaway | safe to delete anytime
- playwright/ – Playwright debug captures | safe to delete anytime
- intermediate/ – prep work + exploratory drafts | safe to delete anytime

## Project Root
- .design-engineer-plugin/config.yaml – plugin config and resume state | read by /design-engineer:launch
- .design-engineer-plugin/dependencies.yaml – deliverable dependency graph | read by hooks automatically
- .claude/agent-memory/design-engineer-compound-documenter/ – cross-session pipeline state (Anthropic-managed) | read for resume context
