# Stale dependents

Downstream deliverables that haven't been refreshed since their upstream document changed.
Computed by reading `.design-engineer-plugin/dependencies.yaml` (the static graph) and
comparing against recent edits.

- 2026-05-20 — No stale dependents.

  Previously (2026-05-14) information-architecture.md was flagged stale because the prototype
  introduced new patterns (YouTube parse bar, Telegram forward, Pending queue, filter
  dropdowns per source type). A 2026-05-20 disk review confirmed information-architecture.md
  already reflects all of these — the Parse video button, the "+" dropdown, the Pending
  queue section, and per-source-type filter dropdowns are all present in the file. The
  warning was resolved and is cleared.

  figma-workflow and product-assessment are downstream of prototype per dependencies.yaml
  but both are absent on disk (skipped in the shortened Phase 4) — nothing to refresh.
