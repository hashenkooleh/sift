# Stale dependents

Downstream deliverables that haven't been refreshed since their upstream document changed.
Computed by reading `.design-engineer-plugin/dependencies.yaml` (the static graph) and
comparing against recent edits.

- 2026-05-22 – Development phase 2 (base primitives) — pending user approval

  **Deliverables touched:** src/components/ui/checkbox.tsx, dialog.tsx, popover.tsx.
  All three documented on /design-system catalog.

  These are implementation files, not graph deliverables, so the static graph has no
  `informs:` entries for them directly. No new stale items introduced this phase.

- 2026-05-21 – Development phase 1 (app shell) — user-approved (carried forward)

  **references.md** (`.design-engineer-plugin/design/exploration/references.md`) — EXISTS ON DISK.
  The file describes the active nav item as "підсвічений індиго" (highlighted indigo).
  The resolved and user-approved treatment is grey elevated surface + 2px `--signal` left-edge bar.
  Decision is final — one-line correction can be made any time before Phase 5 wraps.

  **Summary:** 1 actionable stale item — references.md needs a one-line correction to the active
  nav-item description (decision is final, no user input needed).
