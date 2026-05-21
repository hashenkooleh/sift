# Stale dependents

Downstream deliverables that haven't been refreshed since their upstream document changed.
Computed by reading `.design-engineer-plugin/dependencies.yaml` (the static graph) and
comparing against recent edits.

- 2026-05-21 – Development phase 1 (app shell) — user-approved

  **Deliverables touched:** sidebar.tsx, page-header.tsx, (dashboard)/layout.tsx,
  /design-system catalog page (Layout nav group added).

  These are implementation files, not graph deliverables, so the static graph has no
  `informs:` entries for them directly. One content conflict remains open:

  **references.md** (`.design-engineer-plugin/design/exploration/references.md`) — EXISTS ON DISK.
  The file describes the active nav item as "підсвічений індиго" (highlighted indigo).
  The resolved and user-approved treatment is grey elevated surface + 2px `--signal` left-edge bar.
  Decision is now final — one-line correction can be made any time before Phase 5 wraps.

  **design-references informs:** figma-workflow, prototype.
  - figma-workflow: absent on disk (was run as exploratory only, not a formal deliverable) — skip.
  - prototype.html: intentionally frozen as a throwaway layout reference — do NOT flag for update.

  **Summary:** 1 actionable stale item — references.md needs a one-line correction to the active
  nav-item description (decision is final, no user input needed).
