# Stale dependents

Downstream deliverables that haven't been refreshed since their upstream document changed.
Computed by reading `.design-engineer-plugin/dependencies.yaml` (the static graph) and
comparing against recent edits.

- 2026-05-20 — No stale dependents.

  The product rename (DesignPulse → Sift, commit bbc570b) was fully propagated and
  verified clean across all 9 affected files before committing. No downstream deliverable
  was left referencing the old name or old token (--pulse-blue). Nothing is stale.

  Previously cleared (2026-05-20 reconciliation): information-architecture.md was flagged
  stale against the prototype — confirmed resolved; all patterns present in the file.
  figma-workflow and product-assessment are downstream of prototype per dependencies.yaml
  but absent on disk (skipped in the shortened Phase 4) — nothing to refresh.
