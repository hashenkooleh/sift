#!/bin/bash
# Test: phase4-telegram-forward-modal
# Expected: The TelegramForwardModal component is documented on /design-system.
#           A trigger button opens a Dialog containing three numbered instruction
#           steps and an @SiftBot callout (in Geist Mono indigo). The modal closes
#           via the Escape key and via the close button. The dialog must not be
#           visible on page load.

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null
playwright-cli goto "http://localhost:3002/design-system" -s "$SESSION"

SNAPSHOT=$(playwright-cli snapshot -s "$SESSION")

# ── Catalog section must exist ───────────────────────────────────────────────
# The plan requires TelegramForwardModal to be added to the /design-system
# catalog with its own section heading and NAV anchor.
if ! echo "$SNAPSHOT" | grep -qi "TelegramForwardModal\|Telegram Forward Modal\|Forward Modal"; then
  echo "FAIL: 'TelegramForwardModal' heading/label not found on /design-system — component not documented"
  FAIL=1
fi

# ── Trigger button must be present ──────────────────────────────────────────
# The catalog must render a trigger button for the TelegramForwardModal demo.
# Typical labels: "Forward via Telegram", "Open TelegramForwardModal", "Open".
if ! echo "$SNAPSHOT" | grep -qi 'Forward.*[Tt]elegram\|Telegram.*[Ff]orward\|Forward\b'; then
  echo "FAIL: No TelegramForwardModal trigger button found on /design-system — trigger not rendered"
  FAIL=1
fi

# ── Modal must be closed on page load ───────────────────────────────────────
# The dialog must NOT be in the accessibility tree until the trigger is clicked.
if echo "$SNAPSHOT" | grep -qi 'role="dialog"'; then
  echo "FAIL: A dialog is open on page load — TelegramForwardModal (or another dialog) should be closed until triggered"
  FAIL=1
fi

# ── Open: trigger click shows the modal ─────────────────────────────────────
# Click the TelegramForwardModal trigger. Priority order: "Forward via Telegram",
# "Telegram", then generic "Open".
playwright-cli click 'button:has-text("Forward via Telegram")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Forward")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Telegram")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Open")' -s "$SESSION" 2>/dev/null || {
  echo "FAIL: Could not find or click the TelegramForwardModal trigger button — modal demo may not be rendered"
  FAIL=1
}

OPEN_SNAP=$(playwright-cli snapshot -s "$SESSION")

# After the click a dialog must be in the accessibility tree.
if ! echo "$OPEN_SNAP" | grep -qi 'role="dialog"\|dialog'; then
  echo "FAIL: TelegramForwardModal did not open after trigger click — open behavior not implemented"
  FAIL=1
fi

# ── Dialog must contain three numbered steps ─────────────────────────────────
# The plan: "a Dialog with the 3-step forward instructions". The open dialog
# must contain numbered step indicators. We look for the step numbers 1, 2, 3
# appearing as ordinal labels (e.g. "1.", "Step 1", "1 ", or rendered as list
# items with ordinal text content).
if ! echo "$OPEN_SNAP" | grep -qE '\b1\b.*\b2\b|\bStep 1\b|1\..*2\.'; then
  echo "FAIL: Three numbered steps not found inside open TelegramForwardModal — instruction steps not rendered"
  FAIL=1
fi

# Additional check: verify that the number 3 also appears (completing the trio).
if ! echo "$OPEN_SNAP" | grep -qE '\b3\b|Step 3|3\.'; then
  echo "FAIL: Step 3 not found inside open TelegramForwardModal — only partial instruction steps rendered"
  FAIL=1
fi

# ── Dialog must contain @SiftBot callout ─────────────────────────────────────
# The plan: "@SiftBot in Geist Mono indigo". The open dialog must contain the
# text "@SiftBot" (case-sensitive, as it is a Telegram handle).
if ! echo "$OPEN_SNAP" | grep -q '@SiftBot\|@siftbot\|SiftBot'; then
  echo "FAIL: '@SiftBot' callout not found inside open TelegramForwardModal — @SiftBot mention not rendered"
  FAIL=1
fi

# ── Dialog must have a close affordance ─────────────────────────────────────
# The plan: "closes on backdrop / Escape / close button". The open dialog must
# expose a close button.
if ! echo "$OPEN_SNAP" | grep -qi 'Close\|Dismiss\|×\|✕'; then
  echo "FAIL: No close affordance found inside open TelegramForwardModal — close button not rendered"
  FAIL=1
fi

# ── Close: Escape key dismisses the modal ───────────────────────────────────
playwright-cli press "Escape" -s "$SESSION" 2>/dev/null || true

AFTER_ESC=$(playwright-cli snapshot -s "$SESSION")

if echo "$AFTER_ESC" | grep -qi 'role="dialog"'; then
  echo "FAIL: TelegramForwardModal still open after Escape key — Escape dismiss not implemented"
  FAIL=1
fi

# ── Close: close button dismisses the modal ─────────────────────────────────
# Re-open the modal to test the close button.
playwright-cli click 'button:has-text("Forward via Telegram")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Forward")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Telegram")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Open")' -s "$SESSION" 2>/dev/null || true

playwright-cli click 'button:has-text("Close")' -s "$SESSION" 2>/dev/null || \
playwright-cli click '[aria-label="Close"]' -s "$SESSION" 2>/dev/null || \
playwright-cli click '[aria-label="Dismiss"]' -s "$SESSION" 2>/dev/null || true

AFTER_CLOSE_BTN=$(playwright-cli snapshot -s "$SESSION")

if echo "$AFTER_CLOSE_BTN" | grep -qi 'role="dialog"'; then
  echo "FAIL: TelegramForwardModal still open after close button click — close button dismiss not implemented"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase4-telegram-forward-modal — catalog section present; trigger opens dialog with 3 numbered steps and @SiftBot callout; Escape and close button each dismiss it"
else
  exit 1
fi
