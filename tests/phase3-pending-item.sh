#!/bin/bash
# Test: phase3-pending-item
# Expected: The PendingItem component is documented on /design-system with an
#           animated spinner element, a Geist Mono label, a status text, and a
#           Geist Mono ETA. At least two PendingItem instances are shown (the
#           plan requires ≥2 pending fixtures from mock-data.ts).

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null
playwright-cli goto "http://localhost:3002/design-system" -s "$SESSION"

SNAPSHOT=$(playwright-cli snapshot -s "$SESSION")

# ── Catalog section must exist ───────────────────────────────────────────────
# The /design-system page must include a PendingItem section heading and NAV
# anchor. The plan requires the catalog to document every new component.
if ! echo "$SNAPSHOT" | grep -qi "PendingItem\|Pending Item"; then
  echo "FAIL: 'PendingItem' heading/label not found on /design-system — component not documented"
  FAIL=1
fi

# ── Spinner element must be present ─────────────────────────────────────────
# The plan: "PendingItem — spinner + Geist Mono label + status text + Geist Mono ETA".
# The spinner uses lucide-react's LoaderCircle (per plan). It typically renders
# with aria-label="loading", role="status", or an SVG with a class that includes
# "loader", "spin", or "animate". We check for any of these signals.
if ! echo "$SNAPSHOT" | grep -qi 'loader\|spin\|loading\|progress\|status'; then
  echo "FAIL: No spinner/loader element found on /design-system — PendingItem spinner not rendered"
  FAIL=1
fi

# ── Label must be present ────────────────────────────────────────────────────
# The plan specifies a Geist Mono label for each pending row. The prototype
# uses labels like channel names or source descriptors. We verify at least one
# text element that reads like a pending item label (not just generic "Loading").
# Accept any label text present inside the PendingItem demo section.
if ! echo "$SNAPSHOT" | grep -qi "pending\|processing\|fetching\|analyzing\|queued"; then
  echo "FAIL: No pending-queue label text found — PendingItem label not rendered"
  FAIL=1
fi

# ── Status text must be present ──────────────────────────────────────────────
# The plan's PendingItem surface: "spinner + Geist Mono label + status text +
# Geist Mono ETA." Status text describes what is happening (e.g. "Processing…",
# "Fetching transcript", "In progress").
if ! echo "$SNAPSHOT" | grep -qi 'processing\|in progress\|fetching\|analyzing\|summarizing\|status'; then
  echo "FAIL: No status text found — PendingItem status text not rendered"
  FAIL=1
fi

# ── ETA must be present ──────────────────────────────────────────────────────
# The plan: Geist Mono ETA. The prototype uses short strings like "~30s", "~1m",
# "~2 min". We look for a tilde (~) or a time-unit string (s / min / sec).
if ! echo "$SNAPSHOT" | grep -qE '~[0-9]|[0-9]+(s|sec|min|m)\b|ETA|eta'; then
  echo "FAIL: No ETA string found — PendingItem ETA not rendered"
  FAIL=1
fi

# ── At least two PendingItem instances (≥2 mock fixtures) ───────────────────
# The plan: "mock-data.ts exports typed fixtures (≥4 digest entries, 5 channels,
# 2 pending items)". The catalog must show both pending items.
# We count occurrences of the spinner/loader signal across the snapshot.
SPINNER_COUNT=$(echo "$SNAPSHOT" | grep -oci 'loader\|spin\|loading' || true)
if [ "$SPINNER_COUNT" -lt 2 ]; then
  echo "FAIL: Fewer than 2 PendingItem instances found (count=$SPINNER_COUNT) — mock-data fixtures not fully rendered"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase3-pending-item — spinner, label, status, and ETA present; ≥2 PendingItem instances rendered on /design-system"
else
  exit 1
fi
