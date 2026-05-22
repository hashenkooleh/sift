#!/bin/bash
# Test: phase5-header-modals
# Expected: On /, clicking "Parse video" opens the YouTubeParseModal dialog.
#           Clicking the "+" menu button opens a Popover menu. Within that menu
#           clicking "Forward via Telegram" opens the TelegramForwardModal dialog.
#           Only one surface (modal or menu) is open at a time. Escape closes
#           whatever surface is currently open.

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null
playwright-cli goto "http://localhost:3002/" -s "$SESSION"

SNAPSHOT=$(playwright-cli snapshot -s "$SESSION")

# ── No modal/menu open on page load ─────────────────────────────────────────
# Both the YouTubeParseModal, the TelegramForwardModal, and the + menu Popover
# must be closed on initial load. No role="dialog" and no aria-expanded="true"
# on the + menu should be present.
if echo "$SNAPSHOT" | grep -qi 'role="dialog"'; then
  echo "FAIL: A dialog is open on page load at / — all modals must be closed until triggered"
  FAIL=1
fi

# ── "Parse video" button is present ─────────────────────────────────────────
# The plan: the PageHeader actions slot includes a "Parse video" button.
# It must be in the accessibility tree as an interactive element.
if ! echo "$SNAPSHOT" | grep -qi "Parse video\|parse.*video"; then
  echo "FAIL: 'Parse video' button not found at / — PageHeader Parse video action not rendered"
  FAIL=1
fi

# ── Click "Parse video" opens YouTubeParseModal ──────────────────────────────
# The plan: "'Parse video' opens YouTubeParseModal". After the click the dialog
# must be present and contain a URL input and a Parse button.
playwright-cli click 'button:has-text("Parse video")' -s "$SESSION" 2>/dev/null || {
  echo "FAIL: Could not click 'Parse video' button at / — button not found or not clickable"
  FAIL=1
}

AFTER_PARSE_VIDEO=$(playwright-cli snapshot -s "$SESSION")

if ! echo "$AFTER_PARSE_VIDEO" | grep -qi 'role="dialog"\|dialog'; then
  echo "FAIL: YouTubeParseModal did not open after clicking 'Parse video' at / — modal not wired to button"
  FAIL=1
fi

# The opened dialog must contain a URL input (core YouTubeParseModal content).
if ! echo "$AFTER_PARSE_VIDEO" | grep -qi 'url\|https\|youtube\|input\|placeholder'; then
  echo "FAIL: Open dialog after 'Parse video' click does not contain a URL input — wrong modal opened or modal is empty"
  FAIL=1
fi

# ── Escape dismisses the Parse video modal ──────────────────────────────────
playwright-cli press "Escape" -s "$SESSION" 2>/dev/null || true

AFTER_ESC_PARSE=$(playwright-cli snapshot -s "$SESSION")

if echo "$AFTER_ESC_PARSE" | grep -qi 'role="dialog"'; then
  echo "FAIL: YouTubeParseModal still open after Escape key — Escape dismiss not wired on / page"
  FAIL=1
fi

# ── "+" menu button is present ──────────────────────────────────────────────
# The plan: the PageHeader has a "+" menu button (Popover) as a second action.
# It must be in the accessibility tree.
if ! echo "$AFTER_ESC_PARSE" | grep -qE '\+|aria-label="\+"|\bAdd\b'; then
  echo "FAIL: '+' menu button not found at / after closing Parse video modal — plus-menu action not rendered"
  FAIL=1
fi

# ── Click "+" opens a Popover menu ──────────────────────────────────────────
# The plan: the "+" button opens a Popover with action items including
# "Forward via Telegram", "Parse URL", and "Upload file".
playwright-cli click 'button:has-text("+")' -s "$SESSION" 2>/dev/null || \
playwright-cli click '[aria-label="+"]' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button[aria-label="Add"]' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Add")' -s "$SESSION" 2>/dev/null || {
  echo "FAIL: Could not click the '+' menu button at / — button not found or not clickable"
  FAIL=1
}

AFTER_PLUS=$(playwright-cli snapshot -s "$SESSION")

# The + Popover menu must now be open. It shows the action items.
if ! echo "$AFTER_PLUS" | grep -qi 'aria-expanded="true"\|popover\|menu\|Forward via Telegram\|Parse URL\|Upload'; then
  echo "FAIL: '+' menu Popover did not open after click at / — Popover not wired to '+' button"
  FAIL=1
fi

# ── + menu contains "Forward via Telegram" item ─────────────────────────────
# The plan: the + menu includes "Forward via Telegram" which opens TelegramForwardModal.
if ! echo "$AFTER_PLUS" | grep -qi "Forward via Telegram\|forward.*telegram\|telegram.*forward"; then
  echo "FAIL: 'Forward via Telegram' menu item not found in open '+' menu at / — menu item missing"
  FAIL=1
fi

# ── + menu contains "Parse URL" item ────────────────────────────────────────
# The plan: "Parse URL" in the + menu opens YouTubeParseModal-as-URL.
if ! echo "$AFTER_PLUS" | grep -qi "Parse URL\|parse.*url\|url.*parse"; then
  echo "FAIL: 'Parse URL' menu item not found in open '+' menu at / — menu item missing"
  FAIL=1
fi

# ── + menu contains "Upload file" item ──────────────────────────────────────
# The plan: "Upload file" is visibly inert/"soon" in the + menu.
if ! echo "$AFTER_PLUS" | grep -qi "Upload\|upload file"; then
  echo "FAIL: 'Upload file' menu item not found in open '+' menu at / — menu item missing"
  FAIL=1
fi

# ── Click "Forward via Telegram" opens TelegramForwardModal ─────────────────
# The plan: "+ menu's 'Forward via Telegram' opens TelegramForwardModal". After
# clicking the item the dialog must appear and contain the 3-step instructions
# and the @SiftBot callout.
playwright-cli click ':text("Forward via Telegram")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Forward via Telegram")' -s "$SESSION" 2>/dev/null || \
playwright-cli click '[role="menuitem"]:has-text("Forward via Telegram")' -s "$SESSION" 2>/dev/null || {
  echo "FAIL: Could not click 'Forward via Telegram' item in '+' menu — item not clickable"
  FAIL=1
}

AFTER_TELEGRAM=$(playwright-cli snapshot -s "$SESSION")

if ! echo "$AFTER_TELEGRAM" | grep -qi 'role="dialog"\|dialog'; then
  echo "FAIL: TelegramForwardModal did not open after clicking 'Forward via Telegram' — modal not wired to menu item"
  FAIL=1
fi

# The opened dialog must contain the @SiftBot callout (core TelegramForwardModal content).
if ! echo "$AFTER_TELEGRAM" | grep -qi 'SiftBot\|@Sift\|siftbot\|@sift'; then
  echo "FAIL: Open dialog after 'Forward via Telegram' does not contain @SiftBot — wrong modal opened or modal is empty"
  FAIL=1
fi

# The dialog must contain numbered step instructions (the 3-step forward guide).
if ! echo "$AFTER_TELEGRAM" | grep -qE '1\.|Step 1|step 1|forward|Forward'; then
  echo "FAIL: TelegramForwardModal does not contain step instructions — 3-step forward guide not rendered"
  FAIL=1
fi

# ── Escape dismisses the Telegram modal ─────────────────────────────────────
playwright-cli press "Escape" -s "$SESSION" 2>/dev/null || true

AFTER_ESC_TG=$(playwright-cli snapshot -s "$SESSION")

if echo "$AFTER_ESC_TG" | grep -qi 'role="dialog"'; then
  echo "FAIL: TelegramForwardModal still open after Escape key — Escape dismiss not wired on / page"
  FAIL=1
fi

# ── Only one surface open at a time: open modal then re-open + menu ──────────
# The plan edge case: "open a modal, then the + menu — only one surface is open
# at a time." Re-open Parse video modal then ensure + menu is closed.
playwright-cli click 'button:has-text("Parse video")' -s "$SESSION" 2>/dev/null || true

MODAL_OPEN=$(playwright-cli snapshot -s "$SESSION")

# With the dialog open, the + menu must NOT also be showing as expanded.
if echo "$MODAL_OPEN" | grep -qi 'aria-expanded="true"'; then
  echo "FAIL: Both the modal and the '+' menu appear open simultaneously — surfaces should be mutually exclusive"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase5-header-modals — 'Parse video' opens YouTubeParseModal (URL input present); '+' menu opens with Forward via Telegram / Parse URL / Upload file items; 'Forward via Telegram' opens TelegramForwardModal (@SiftBot + steps present); Escape dismisses each surface; only one surface open at a time"
else
  exit 1
fi
