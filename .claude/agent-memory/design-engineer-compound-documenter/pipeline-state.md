# Pipeline state

- **Last updated**: 2026-05-22
- **Current phase**: Phase 5 – Development (Digest screen build, 5-phase sub-pipeline)
- **Last completed skill**: development phase 4 – FilterDropdown + YouTubeParseModal + TelegramForwardModal — pending user approval + commit
- **Next skill**: development phase 5 – Digest screen assembly (final phase)
- **Mode**: guided
- **Project type**: new
- **Product name**: Sift
- **Branch**: feat/nifty-prancing-moore
- **Plan**: .design-engineer-plugin/plans/2026-05-21-nifty-prancing-moore.md
- **GitHub**: https://github.com/hashenkooleh/sift
- **Figma file**: g8hBtHVY9zHNzuNQH7G1yH (visual helper only, code-first)

## Recent deliverables (last 8)

- 2026-05-22 – filter-dropdown.tsx – dev phase 4 FilterDropdown + modals – src/components/custom/filter-dropdown.tsx
- 2026-05-22 – youtube-parse-modal.tsx – dev phase 4 FilterDropdown + modals – src/components/custom/youtube-parse-modal.tsx
- 2026-05-22 – telegram-forward-modal.tsx – dev phase 4 FilterDropdown + modals – src/components/custom/telegram-forward-modal.tsx
- 2026-05-22 – priority.ts – dev phase 4 FilterDropdown + modals – src/lib/priority.ts
- 2026-05-22 – digest-card.tsx – dev phase 3 data layer + feed components – src/components/custom/digest-card.tsx
- 2026-05-22 – pending-item.tsx – dev phase 3 data layer + feed components – src/components/custom/pending-item.tsx
- 2026-05-22 – types.ts – dev phase 3 data layer – src/lib/types.ts
- 2026-05-22 – source-type.ts – dev phase 3 data layer – src/lib/source-type.ts

## Open questions

- Playwright test scripts target `playwright-cli` (not installed); phase verification uses Playwright MCP + screenshots instead. `tests/*.sh` files are behavioral spec only.
- Dashboard pages (Sources, Archive, Settings) remain placeholder scaffolds.
- Theme toggle (Light/Dark) in prototype + IA; CLAUDE.md is dark-only for MVP — flag when Settings screen is built.
- references.md still says "підсвічений індиго" for active nav — one-line correction needed (can be done any time before Phase 5 wraps).
- Phase 5: keep `(dashboard)/page.tsx` a server component; isolate interactive header actions (Parse video button + "+" Popover menu) into one small client component, passing server-rendered fixtures as props to client leaves.
- Phase 5: Popover-then-Dialog nesting risk — "+" menu is a Popover and one of its rows opens TelegramForwardModal (a Dialog); test focus-trap interaction explicitly.
- Data/backend phase: DigestCard lacks a triaged/resolved visual state — defer until real card-action behavior is wired.
- Data/backend phase: PendingItem progress bar must become determinate when real agent-progress data is available.
- Data/backend phase: PendingEntry model has no failed/errored variant — error register needed in data layer.
