#!/bin/bash
# Test: phase4-youtube-parse-modal
# Expected: The YouTubeParseModal component is documented on /design-system.
#           A trigger button opens a Dialog containing a Geist Mono URL Input,
#           a Parse button, and helper text. The modal closes via the Escape key
#           and via the close button. The dialog must not be visible on page load.

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null
playwright-cli goto "http://localhost:3002/design-system" -s "$SESSION"

SNAPSHOT=$(playwright-cli snapshot -s "$SESSION")

# ── Catalog section must exist ───────────────────────────────────────────────
# The plan requires YouTubeParseModal to be added to the /design-system catalog
# with its own section heading and NAV anchor before it is used in any screen.
if ! echo "$SNAPSHOT" | grep -qi "YouTubeParseModal\|YouTube Parse Modal\|Parse Modal"; then
  echo "FAIL: 'YouTubeParseModal' heading/label not found on /design-system — component not documented"
  FAIL=1
fi

# ── Trigger button must be present ──────────────────────────────────────────
# The catalog must render a trigger button for the YouTubeParseModal demo.
# Typical labels: "Parse video", "Open", "Open YouTubeParseModal".
if ! echo "$SNAPSHOT" | grep -qi 'Parse.*[Vv]ideo\|Parse.*URL\|YouTube.*[Mm]odal\|Open.*Parse\|Parse\b'; then
  echo "FAIL: No YouTubeParseModal trigger button found on /design-system — trigger not rendered"
  FAIL=1
fi

# ── Modal must be closed on page load ───────────────────────────────────────
# The dialog (role="dialog") must NOT be present in the accessibility tree
# before the trigger is clicked. Modals are always rendered closed initially.
if echo "$SNAPSHOT" | grep -qi 'role="dialog"'; then
  echo "FAIL: A dialog is open on page load — YouTubeParseModal (or another dialog) should be closed until triggered"
  FAIL=1
fi

# ── Open: trigger click shows the modal ─────────────────────────────────────
# Click the YouTubeParseModal trigger. Try in priority order: "Parse video",
# "Parse URL", "Parse", then generic "Open".
playwright-cli click 'button:has-text("Parse video")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Parse URL")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Parse")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Open")' -s "$SESSION" 2>/dev/null || {
  echo "FAIL: Could not find or click the YouTubeParseModal trigger button — modal demo may not be rendered"
  FAIL=1
}

OPEN_SNAP=$(playwright-cli snapshot -s "$SESSION")

# After the click a dialog must be in the accessibility tree.
if ! echo "$OPEN_SNAP" | grep -qi 'role="dialog"\|dialog'; then
  echo "FAIL: YouTubeParseModal did not open after trigger click — open behavior not implemented"
  FAIL=1
fi

# ── Dialog must contain a URL input ─────────────────────────────────────────
# The plan: "a Geist Mono URL Input". The open dialog must contain an input
# element whose placeholder/aria-label references a URL (e.g. "https://",
# "YouTube URL", "Enter URL", "Paste URL").
if ! echo "$OPEN_SNAP" | grep -qi 'url\|https\|youtube\|input\|placeholder'; then
  echo "FAIL: No URL input found inside open YouTubeParseModal — URL Input not rendered"
  FAIL=1
fi

# ── Dialog must contain a Parse button ──────────────────────────────────────
# The plan: "a Parse button". The open dialog must contain a button labeled
# "Parse" (or "Parse URL", "Parse video") distinct from the trigger.
if ! echo "$OPEN_SNAP" | grep -qi 'Parse'; then
  echo "FAIL: No Parse button found inside open YouTubeParseModal — Parse button not rendered"
  FAIL=1
fi

# ── Dialog must contain helper text ─────────────────────────────────────────
# The plan: "helper text". The modal body must include a non-button, non-label
# descriptive text element (e.g. "Paste a YouTube URL", "Supports youtube.com",
# "Enter a valid URL"). We look for a helper/hint string.
if ! echo "$OPEN_SNAP" | grep -qi 'paste\|enter\|valid\|support\|example\|hint\|helper\|format\|youtube\.com\|http'; then
  echo "FAIL: No helper text found inside open YouTubeParseModal — helper text not rendered"
  FAIL=1
fi

# ── Dialog must have a close affordance ─────────────────────────────────────
# The plan: "closes on backdrop / Escape / close button". The open dialog must
# expose a close button (aria-label="Close", "Dismiss", or a visible × / ✕).
if ! echo "$OPEN_SNAP" | grep -qi 'Close\|Dismiss\|×\|✕'; then
  echo "FAIL: No close affordance found inside open YouTubeParseModal — close button not rendered"
  FAIL=1
fi

# ── Close: Escape key dismisses the modal ───────────────────────────────────
playwright-cli press "Escape" -s "$SESSION" 2>/dev/null || true

AFTER_ESC=$(playwright-cli snapshot -s "$SESSION")

if echo "$AFTER_ESC" | grep -qi 'role="dialog"'; then
  echo "FAIL: YouTubeParseModal still open after Escape key — Escape dismiss not implemented"
  FAIL=1
fi

# ── Close: close button dismisses the modal ─────────────────────────────────
# Re-open the modal to test the close button.
playwright-cli click 'button:has-text("Parse video")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Parse URL")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Parse")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Open")' -s "$SESSION" 2>/dev/null || true

playwright-cli click 'button:has-text("Close")' -s "$SESSION" 2>/dev/null || \
playwright-cli click '[aria-label="Close"]' -s "$SESSION" 2>/dev/null || \
playwright-cli click '[aria-label="Dismiss"]' -s "$SESSION" 2>/dev/null || true

AFTER_CLOSE_BTN=$(playwright-cli snapshot -s "$SESSION")

if echo "$AFTER_CLOSE_BTN" | grep -qi 'role="dialog"'; then
  echo "FAIL: YouTubeParseModal still open after close button click — close button dismiss not implemented"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase4-youtube-parse-modal — catalog section present; trigger opens dialog with URL input, Parse button, and helper text; Escape and close button each dismiss it"
else
  exit 1
fi
