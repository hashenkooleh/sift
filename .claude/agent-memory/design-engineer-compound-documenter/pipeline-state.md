# Pipeline state

- **Last updated**: 2026-05-20 (reconciled against disk — see note below)
- **Current phase**: Phase 5 – Development (in progress, scaffold stage)
- **Last completed skill**: dev-claude-md (CLAUDE.md) + Next.js project scaffold
- **Next skill**: build custom components on the Design System page, then assemble real screens
- **Mode**: guided
- **Project type**: new

## Reconciliation note (2026-05-20)

The previous snapshot (2026-05-14) said the next step was the CLAUDE.md draft and
the project was still at the end of Phase 4. A disk review on 2026-05-20 found that
development already began on 2026-05-15:

- CLAUDE.md exists at project root (full: tech stack, design direction, tokens, conventions).
- Next.js 15 App Router scaffold exists under `src/` — `(dashboard)` route group with
  5 pages (Digest, Sources, Archive, Design System, Settings).
- `src/app/globals.css` wires the custom dark theme into ShadCN tokens (`.dark` block).
- 6 base ShadCN components customized: button, badge, input, separator, tabs, toggle.
- Design System page partially built: tokens (colors, typography, spacing) + base
  components rendered; custom components are still placeholders.
- Dashboard pages are placeholder scaffolds — no real screens assembled yet.
- No git commits yet — the whole project is uncommitted.

## Recent deliverables (last 6)

- 2026-05-15 – Next.js scaffold (5 pages, globals.css, 6 base components) – dev implementation – src/
- 2026-05-15 – Design System page (tokens + base components, custom = placeholders) – dev implementation – src/app/(dashboard)/design-system/page.tsx
- 2026-05-15 – CLAUDE.md – dev-claude-md – CLAUDE.md
- 2026-05-14 – prototype.html – dev-prototyping – .design-engineer-plugin/prototype/prototype.html
- 2026-05-14 – references.md – ui-references-moodboard – .design-engineer-plugin/design/exploration/references.md
- 2026-05-14 – information-architecture.md – ux-information-architecture – .design-engineer-plugin/design/planning/information-architecture.md

## Open questions

- Custom components (DigestCard, FilterDropdown, PendingItem, SourceRow, YouTubeParseModal,
  TelegramForwardModal) not built yet — they are placeholders on the Design System page.
  Build them there first, then use in screens (per CLAUDE.md workflow rule).
- Dashboard pages (Digest, Sources, Archive, Settings) are still placeholder scaffolds —
  real screens not assembled.
- Theme toggle conflict: prototype + IA expose a Light/Dark toggle in Settings, but
  CLAUDE.md says dark-only for now. Decide whether to drop the toggle or defer it.
- Prototype uses the Inter font; CLAUDE.md forbids Inter (Geist only). The code already
  uses Geist correctly — only prototype.html deviates. Cosmetic, prototype is reference-only.
- bias-audit, journey-map, motivation-audit, ethics-review, product-assessment all skipped
  (advisor recommendation for pet project) — Phase 4 was shortened accordingly.
- figma-workflow and figma-handoff skipped — dev went directly from prototype to code.
- GitHub integration remains parked in roadmap (no scope commitment yet).
