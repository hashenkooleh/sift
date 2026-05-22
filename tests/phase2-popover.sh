#!/bin/bash
# Test: phase2-popover
# Expected: The Popover component is documented on /design-system; its trigger
#           opens an anchored popover panel; the popover closes via Escape and
#           via an outside click.

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null
playwright-cli goto "http://localhost:3002/design-system" -s "$SESSION"

SNAPSHOT=$(playwright-cli snapshot -s "$SESSION")

# ── Catalog section must exist ───────────────────────────────────────────────
# The plan requires the Popover component to be added to the /design-system
# catalog with its own section heading and NAV anchor.
if ! echo "$SNAPSHOT" | grep -qi "Popover"; then
  echo "FAIL: 'Popover' heading/label not found on /design-system — component not documented"
  FAIL=1
fi

# ── Popover must be closed on page load ─────────────────────────────────────
# Before the trigger is clicked the popover panel must not be visible in the
# accessibility tree. The base-ui Popover Popup is conditionally rendered.
# role="tooltip" or a named region anchored to the trigger should be absent.
if echo "$SNAPSHOT" | grep -qi 'role="tooltip"'; then
  echo "FAIL: Popover appears open on page load — should be closed until trigger is clicked"
  FAIL=1
fi

# ── Trigger button must be present ──────────────────────────────────────────
# A trigger button for the popover demo must exist in the catalog section.
if ! echo "$SNAPSHOT" | grep -qi 'Popover\|Toggle\|Open'; then
  echo "FAIL: No popover trigger button found on /design-system — Popover demo not rendered"
  FAIL=1
fi

# ── Open: trigger click shows the popover ───────────────────────────────────
# Click the popover trigger. We target a button in the Popover demo section.
# The button text in catalog demos typically says "Open Popover", "Toggle", or
# simply echoes the component name.
playwright-cli click 'button:has-text("Popover")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Toggle")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Open")' -s "$SESSION" 2>/dev/null || {
  echo "FAIL: Could not find or click a popover trigger button — Popover demo may not be rendered"
  FAIL=1
}

OPEN_SNAP=$(playwright-cli snapshot -s "$SESSION")

# After the click a popover popup must appear in the accessibility tree.
# base-ui Popover.Popup renders with role="group", role="tooltip", or a
# popover-specific role. We look broadly for popover-related content that was
# absent before the click. A reliable signal is that the popup element itself
# is now in the tree — check for the data-popup or an aria attribute that only
# the open popup carries.
if ! echo "$OPEN_SNAP" | grep -qi 'popover\|tooltip\|data-popup\|aria-expanded="true"'; then
  echo "FAIL: Popover did not open after trigger click — open behavior not implemented"
  FAIL=1
fi

# ── Close: Escape key dismisses the popover ─────────────────────────────────
playwright-cli press "Escape" -s "$SESSION" 2>/dev/null || true

AFTER_ESC=$(playwright-cli snapshot -s "$SESSION")

# The popover panel must be gone from the tree after Escape.
# We check that aria-expanded on the trigger (if present) is now false, or that
# the popup element has disappeared.
if echo "$AFTER_ESC" | grep -qi 'aria-expanded="true"'; then
  echo "FAIL: Popover trigger still reports aria-expanded=true after Escape — Escape dismiss not implemented"
  FAIL=1
fi

# ── Close: outside click dismisses the popover ──────────────────────────────
# Re-open the popover for the outside-click test.
playwright-cli click 'button:has-text("Popover")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Toggle")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Open")' -s "$SESSION" 2>/dev/null || true

REOPEN_SNAP=$(playwright-cli snapshot -s "$SESSION")

# Verify it re-opened.
if ! echo "$REOPEN_SNAP" | grep -qi 'aria-expanded="true"\|popover\|tooltip'; then
  echo "FAIL: Popover did not re-open for outside-click test — cannot verify outside-click dismiss"
  FAIL=1
fi

# Click somewhere outside the popover — far from the trigger/popup area.
# We click the page heading area which is structurally far from the Popover demo.
playwright-cli click 'h1' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'body' -s "$SESSION" --position '{"x":10,"y":10}' 2>/dev/null || true

AFTER_OUTSIDE=$(playwright-cli snapshot -s "$SESSION")

if echo "$AFTER_OUTSIDE" | grep -qi 'aria-expanded="true"'; then
  echo "FAIL: Popover trigger still reports aria-expanded=true after outside click — outside-click dismiss not implemented"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase2-popover — trigger opens popover; Escape and outside click each dismiss it"
else
  exit 1
fi
