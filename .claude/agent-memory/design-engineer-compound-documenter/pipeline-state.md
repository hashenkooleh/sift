# Pipeline state

- **Last updated**: 2026-05-22
- **Current phase**: Phase 5 – Development (Digest screen build, 5-phase sub-pipeline)
- **Last completed skill**: development phase 2 – base primitives (Checkbox, Dialog, Popover) — pending user approval + commit
- **Next skill**: development phase 3 – data layer (types + mock fixtures) + DigestCard + PendingItem
- **Mode**: guided
- **Project type**: new
- **Product name**: Sift
- **Branch**: feat/nifty-prancing-moore
- **Plan**: .design-engineer-plugin/plans/2026-05-21-nifty-prancing-moore.md
- **GitHub**: https://github.com/hashenkooleh/sift
- **Figma file**: g8hBtHVY9zHNzuNQH7G1yH (visual helper only, code-first)

## Recent deliverables (last 8)

- 2026-05-22 – checkbox.tsx – dev phase 2 base primitives – src/components/ui/checkbox.tsx
- 2026-05-22 – dialog.tsx – dev phase 2 base primitives – src/components/ui/dialog.tsx
- 2026-05-22 – popover.tsx – dev phase 2 base primitives – src/components/ui/popover.tsx
- 2026-05-21 – digest-screen-phase-1-app-shell-20260521.md – dev phase 1 documentation – .design-engineer-plugin/design/dev/digest-screen-phase-1-app-shell-20260521.md
- 2026-05-21 – sidebar.tsx – dev phase 1 app shell – src/components/layout/sidebar.tsx
- 2026-05-21 – page-header.tsx – dev phase 1 app shell – src/components/layout/page-header.tsx
- 2026-05-21 – (dashboard)/layout.tsx – dev phase 1 app shell – src/app/(dashboard)/layout.tsx (Sidebar wired in)
- 2026-05-21 – globals.css rewrite – ui-design-system – src/app/globals.css (3-layer token architecture)

## Open questions

- Playwright test scripts target `playwright-cli` (not installed); phase verification uses Playwright MCP + screenshots instead. `tests/*.sh` files are behavioral spec only.
- Custom components (DigestCard, FilterDropdown, YouTubeParseModal, TelegramForwardModal, SourceRow) not yet built — Phase 3+.
- Dashboard pages (Sources, Archive, Settings) remain placeholder scaffolds.
- Theme toggle (Light/Dark) in prototype + IA; CLAUDE.md is dark-only for MVP — flag when Settings screen is built.
- references.md still says "підсвічений індиго" for active nav — one-line correction needed (can be done any time before Phase 5 wraps).
- Phase 4 carry-forward: FilterDropdown checkbox rows must be full-row clickable `<label>`s (14px Checkbox alone is below a comfortable pointer target).
- Phase 4 carry-forward: FilterDropdown trigger needs chevron + open-state affordance; Popover primitive is unopinionated about its trigger.
- Phase 4 carry-forward: YouTube-parse / Telegram-forward modals — decide whether backdrop click should discard typed input; base-ui Dialog supports gating via `onOpenChange`.
