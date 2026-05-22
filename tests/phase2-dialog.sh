#!/bin/bash
# Test: phase2-dialog
# Expected: The Dialog component is documented on /design-system; its trigger
#           opens a centered dialog over a backdrop; the dialog closes via the
#           close button, via Escape, and via a backdrop click.

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null
playwright-cli goto "http://localhost:3002/design-system" -s "$SESSION"

SNAPSHOT=$(playwright-cli snapshot -s "$SESSION")

# ── Catalog section must exist ───────────────────────────────────────────────
# The plan requires the Dialog component to be added to the /design-system
# catalog with its own section heading and NAV anchor.
if ! echo "$SNAPSHOT" | grep -qi "Dialog"; then
  echo "FAIL: 'Dialog' heading/label not found on /design-system — component not documented"
  FAIL=1
fi

# ── Trigger button must be present while dialog is closed ────────────────────
# The catalog must render a trigger button for the dialog demo. Before it is
# clicked, the dialog (role="dialog") must NOT be visible in the tree.
if echo "$SNAPSHOT" | grep -qi 'role="dialog"'; then
  echo "FAIL: Dialog is open on page load — should be closed until its trigger is clicked"
  FAIL=1
fi

# A button that opens the dialog must exist. The plan names it as a trigger.
# We look for a button whose accessible name contains "dialog" or "open"
# (case-insensitive) in the dialog section of the catalog.
if ! echo "$SNAPSHOT" | grep -qi 'Open.*[Dd]ialog\|[Tt]rigger\|Show.*[Dd]ialog\|Open'; then
  echo "FAIL: No dialog trigger button found on /design-system — Dialog demo not rendered"
  FAIL=1
fi

# ── Open: trigger click shows the dialog ────────────────────────────────────
# Click the first button in the Dialog catalog section to open it.
playwright-cli click 'button:has-text("Open")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Trigger")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Dialog")' -s "$SESSION" 2>/dev/null || {
  echo "FAIL: Could not find or click a dialog trigger button — Dialog demo may not be rendered"
  FAIL=1
}

OPEN_SNAP=$(playwright-cli snapshot -s "$SESSION")

# After the click a dialog must be in the accessibility tree.
if ! echo "$OPEN_SNAP" | grep -qi 'role="dialog"\|dialog'; then
  echo "FAIL: Dialog did not open after trigger click — open behavior not implemented"
  FAIL=1
fi

# The dialog must have a close affordance (button or element whose name hints
# at closing: "Close", "×", "Dismiss").
if ! echo "$OPEN_SNAP" | grep -qi 'Close\|Dismiss\|×\|✕'; then
  echo "FAIL: No close affordance found inside open dialog — close button not implemented"
  FAIL=1
fi

# ── Close: Escape key dismisses the dialog ──────────────────────────────────
playwright-cli press "Escape" -s "$SESSION" 2>/dev/null || true

AFTER_ESC=$(playwright-cli snapshot -s "$SESSION")

if echo "$AFTER_ESC" | grep -qi 'role="dialog"'; then
  echo "FAIL: Dialog still open after Escape key — Escape dismiss not implemented"
  FAIL=1
fi

# ── Close: close button dismisses the dialog ────────────────────────────────
# Re-open the dialog for the close-button test.
playwright-cli click 'button:has-text("Open")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Trigger")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Dialog")' -s "$SESSION" 2>/dev/null || true

playwright-cli click 'button:has-text("Close")' -s "$SESSION" 2>/dev/null || \
playwright-cli click '[aria-label="Close"]' -s "$SESSION" 2>/dev/null || \
playwright-cli click '[aria-label="Dismiss"]' -s "$SESSION" 2>/dev/null || true

AFTER_CLOSE_BTN=$(playwright-cli snapshot -s "$SESSION")

if echo "$AFTER_CLOSE_BTN" | grep -qi 'role="dialog"'; then
  echo "FAIL: Dialog still open after close button click — close button not implemented"
  FAIL=1
fi

# ── Close: backdrop click dismisses the dialog ──────────────────────────────
# Re-open the dialog for the backdrop test.
playwright-cli click 'button:has-text("Open")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Trigger")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Dialog")' -s "$SESSION" 2>/dev/null || true

# Click outside the dialog popup — at page coordinates well away from center.
# playwright-cli click supports CSS selectors; the backdrop is typically a sibling
# overlay element. We click the backdrop element directly if it has a known role,
# otherwise click a coordinate far from the dialog.
playwright-cli click '[data-backdrop]\|.backdrop\|[aria-label="backdrop"]' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'body' -s "$SESSION" --position '{"x":10,"y":10}' 2>/dev/null || true

AFTER_BACKDROP=$(playwright-cli snapshot -s "$SESSION")

if echo "$AFTER_BACKDROP" | grep -qi 'role="dialog"'; then
  echo "FAIL: Dialog still open after backdrop click — backdrop dismiss not implemented"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase2-dialog — trigger opens dialog; Escape, close button, and backdrop each dismiss it"
else
  exit 1
fi
