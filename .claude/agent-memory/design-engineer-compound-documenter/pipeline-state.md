# Pipeline state

- **Last updated**: 2026-05-22
- **Current phase**: Phase 5 – Development (Digest screen build, 5-phase sub-pipeline)
- **Last completed skill**: development phase 3 – data layer + DigestCard + PendingItem — pending user approval + commit
- **Next skill**: development phase 4 – FilterDropdown + YouTubeParseModal + TelegramForwardModal
- **Mode**: guided
- **Project type**: new
- **Product name**: Sift
- **Branch**: feat/nifty-prancing-moore
- **Plan**: .design-engineer-plugin/plans/2026-05-21-nifty-prancing-moore.md
- **GitHub**: https://github.com/hashenkooleh/sift
- **Figma file**: g8hBtHVY9zHNzuNQH7G1yH (visual helper only, code-first)

## Recent deliverables (last 8)

- 2026-05-22 – digest-card.tsx – dev phase 3 data layer + feed components – src/components/custom/digest-card.tsx
- 2026-05-22 – pending-item.tsx – dev phase 3 data layer + feed components – src/components/custom/pending-item.tsx
- 2026-05-22 – types.ts – dev phase 3 data layer – src/lib/types.ts
- 2026-05-22 – mock-data.ts – dev phase 3 data layer – src/lib/mock-data.ts
- 2026-05-22 – source-type.ts – dev phase 3 data layer – src/lib/source-type.ts
- 2026-05-22 – checkbox.tsx – dev phase 2 base primitives – src/components/ui/checkbox.tsx
- 2026-05-22 – dialog.tsx – dev phase 2 base primitives – src/components/ui/dialog.tsx
- 2026-05-22 – popover.tsx – dev phase 2 base primitives – src/components/ui/popover.tsx

## Open questions

- Playwright test scripts target `playwright-cli` (not installed); phase verification uses Playwright MCP + screenshots instead. `tests/*.sh` files are behavioral spec only.
- Dashboard pages (Sources, Archive, Settings) remain placeholder scaffolds.
- Theme toggle (Light/Dark) in prototype + IA; CLAUDE.md is dark-only for MVP — flag when Settings screen is built.
- references.md still says "підсвічений індиго" for active nav — one-line correction needed (can be done any time before Phase 5 wraps).
- Phase 4 carry-forward: FilterDropdown checkbox rows must be full-row clickable `<label>`s (14px Checkbox alone is below a comfortable pointer target).
- Phase 4 carry-forward: FilterDropdown trigger needs chevron + open-state affordance; Popover primitive is unopinionated about its trigger.
- Phase 4 carry-forward: YouTube-parse / Telegram-forward modals — decide whether backdrop click should discard typed input; base-ui Dialog supports gating via `onOpenChange`.
- Data/backend phase: DigestCard lacks a triaged/resolved visual state — defer until real card-action behavior is wired.
- Data/backend phase: PendingItem progress bar must become determinate when real agent-progress data is available.
- Data/backend phase: PendingEntry model has no failed/errored variant — error register needed in data layer.
