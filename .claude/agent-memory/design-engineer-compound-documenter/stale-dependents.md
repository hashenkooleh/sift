# Stale dependents

Downstream deliverables that haven't been refreshed since their upstream document changed.
Computed by reading `.design-engineer-plugin/dependencies.yaml` (the static graph) and
comparing against recent edits.

- 2026-05-22 – Development phase 5 (Digest screen assembly) — pending user approval

  **Deliverables touched:** src/app/(dashboard)/page.tsx,
  src/app/(dashboard)/digest-header-actions.tsx.
  Both documented on /design-system catalog as appropriate.

  These are implementation files, not graph deliverables — the static graph has no `informs:`
  entries for them directly. No new stale design-layer items introduced this phase.

  **Psych-scanner screen-level findings deferred to a future product-design iteration**
  (not actioned — conflict with prototype-fidelity constraint and user's locked Decision 1;
  recorded here so they are not lost):

  - Digest screen leads with chrome (search, filters, "Today's highlights" placeholder,
    Processing queue) before the ranked feed — psych-scanner argues the top-priority card
    should be the first substantive thing seen. Current order follows the prototype + the
    approved plan.
  - "Today's highlights" dashed placeholder occupies above-the-fold space daily —
    psych-scanner suggests removing or shrinking it. It exists by the user's explicit Decision 1
    (static placeholder slot).
  - Two capture affordances ("Parse video" button + "+" menu) — psych-scanner suggests
    consolidating to one; the prototype and IA keep them separate.
  - Empty YouTube/Web FilterDropdowns render with count 0 — psych-scanner suggests
    hiding/disabling; the prototype + IA intentionally show them as "UI prepared for future
    source types".
  - No end-of-digest marker — psych-scanner suggests a "that's everything" closure cue at the
    feed's end.

- 2026-05-22 – Development phase 4 (FilterDropdown + modals) — pending user approval (carried forward)

  **Psych-scanner findings deferred to data/backend phase** (not actioned in this UI pass —
  recorded here so they are not lost when the data phase begins):

  - FilterDropdown chip shows no active-filter state once closed; the count shown means "total
    channels", not "active filters applied". Real active-filter feedback (e.g. filled chip,
    count badge) belongs with real filtering logic, not the visual-only UI pass.
  - YouTubeParseModal URL input has no inline validation or format example — belongs with real
    URL parsing behavior.
  - YouTubeParseModal "Parse" action needs a loading/queued feedback state once it does real
    async work (spinner, disabled state during request).

- 2026-05-22 – Development phase 3 (data layer + DigestCard + PendingItem) — user-approved (carried forward)

  **Psych-scanner findings deferred to data/backend phase** (not actioned in this UI pass —
  recorded here so they are not lost when the data phase begins):

  - DigestCard has no triaged/resolved card state — after "Mark useful" / "Hide" a card looks
    unchanged; a dim/resolved visual treatment would make the feed a visibly shrinking task list.
    Belongs with real card-action behavior, not the visual-only UI pass.
  - PendingItem uses an indeterminate spinner; a determinate progress element requires real
    agent-progress data that does not exist yet.
  - PendingItem / PendingEntry only models the in-progress state — no failed/errored variant;
    the data phase must add an error register to the type and render a failure state.

- 2026-05-21 – Development phase 1 (app shell) — user-approved (carried forward)

  **references.md** (`.design-engineer-plugin/design/exploration/references.md`) — EXISTS ON DISK.
  The file describes the active nav item as "підсвічений індиго" (highlighted indigo).
  The resolved and user-approved treatment is grey elevated surface + 2px `--signal` left-edge bar.
  Decision is final — one-line correction can be made any time before Phase 5 wraps.

  **Summary:** 1 actionable stale item — references.md needs a one-line correction to the active
  nav-item description (decision is final, no user input needed).
