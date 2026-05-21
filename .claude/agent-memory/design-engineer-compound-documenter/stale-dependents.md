# Stale dependents

Downstream deliverables that haven't been refreshed since their upstream document changed.
Computed by reading `.design-engineer-plugin/dependencies.yaml` (the static graph) and
comparing against recent edits.

- 2026-05-21

  **design-references (references.md) informs:** figma-workflow, prototype

  - figma-workflow: absent on disk (ui-figma-guide was run as an exploratory learning pass
    this session, not a formal pipeline deliverable) — nothing to refresh.
  - prototype (prototype.html): exists on disk. prototype.html is intentionally frozen as a
    throwaway layout reference — old blue accent and Inter font are known deviations, not
    regressions. Per session context, do NOT flag for update.

  **design-system.md** is a new Phase 5 dev deliverable. It has no `informs:` entry in the
  static graph (graph does not model it as an upstream). No stale dependents computed.

  **globals.css / token retheme** is implementation, not a graph deliverable.
  No stale dependents computed via graph.

  **Summary:** no actionable stale dependents this session. Placeholder markup in
  (dashboard)/page.tsx and layout.tsx (off-scale font sizes, duplicated nav className)
  will self-resolve when real custom components replace them in Phase 5.
