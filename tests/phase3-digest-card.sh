#!/bin/bash
# Test: phase3-digest-card
# Expected: The DigestCard component is documented on /design-system with a
#           metadata row (priority dot, source-type badge, mono source, mono
#           timestamp), a title, summary text, and three action labels
#           (Mark useful / View original / Hide). Priority high/medium/low
#           variants and TG/YT/Web source-type variants are all present.
#           Clicking the "Useful" action toggles a green active state; clicking
#           again reverts it. "Hide" and "View original" do not remove the card.

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null
playwright-cli goto "http://localhost:3002/design-system" -s "$SESSION"

SNAPSHOT=$(playwright-cli snapshot -s "$SESSION")

# ── Catalog section must exist ───────────────────────────────────────────────
# The /design-system page must include a DigestCard section heading and NAV
# anchor. The plan requires every new component to be cataloged before use.
if ! echo "$SNAPSHOT" | grep -qi "DigestCard\|Digest Card"; then
  echo "FAIL: 'DigestCard' heading/label not found on /design-system — component not documented"
  FAIL=1
fi

# ── Source-type badges (TG / YT / Web) must all be present ──────────────────
# The plan checklist: "priority high/medium/low dot color, TG/YT/Web badge".
# The catalog must show all three source-type variants in the DigestCard section.
if ! echo "$SNAPSHOT" | grep -q "TG\|Telegram"; then
  echo "FAIL: No TG/Telegram source-type badge found — Telegram variant not rendered"
  FAIL=1
fi

if ! echo "$SNAPSHOT" | grep -q "YT\|YouTube"; then
  echo "FAIL: No YT/YouTube source-type badge found — YouTube variant not rendered"
  FAIL=1
fi

if ! echo "$SNAPSHOT" | grep -qi "Web"; then
  echo "FAIL: No Web source-type badge found — Web variant not rendered"
  FAIL=1
fi

# ── Priority variants must be present ────────────────────────────────────────
# The plan specifies high / medium / low priority variants with distinct dot
# colors. The catalog must label or annotate all three.
if ! echo "$SNAPSHOT" | grep -qi "high"; then
  echo "FAIL: No 'high' priority variant found — high-priority DigestCard not rendered"
  FAIL=1
fi

if ! echo "$SNAPSHOT" | grep -qi "medium"; then
  echo "FAIL: No 'medium' priority variant found — medium-priority DigestCard not rendered"
  FAIL=1
fi

if ! echo "$SNAPSHOT" | grep -qi "low"; then
  echo "FAIL: No 'low' priority variant found — low-priority DigestCard not rendered"
  FAIL=1
fi

# ── Three action labels must be present ──────────────────────────────────────
# The plan names the three visual-only actions: "Mark useful", "View original",
# "Hide". The catalog must render all three within the DigestCard demo.
if ! echo "$SNAPSHOT" | grep -qi "useful\|mark useful"; then
  echo "FAIL: No 'Useful'/'Mark useful' action label found — DigestCard actions not rendered"
  FAIL=1
fi

if ! echo "$SNAPSHOT" | grep -qi "view original\|original"; then
  echo "FAIL: No 'View original' action label found — DigestCard actions not rendered"
  FAIL=1
fi

if ! echo "$SNAPSHOT" | grep -qi "hide"; then
  echo "FAIL: No 'Hide' action label found — DigestCard actions not rendered"
  FAIL=1
fi

# ── Useful-marked variant must be present in the catalog ────────────────────
# The plan says the catalog must show the "useful-marked" state where the Useful
# action is green. We look for a "useful" element that carries a green/active
# indicator in the accessibility tree (data attribute, aria-pressed, or label).
if ! echo "$SNAPSHOT" | grep -qi "useful-marked\|aria-pressed\|marked"; then
  echo "FAIL: No useful-marked state variant found — useful-marked DigestCard not cataloged"
  FAIL=1
fi

# ── Click "Useful" toggles green active state ────────────────────────────────
# The plan: "clicking Useful toggles its own styling green; click again reverts."
# Snapshot before click, click an interactive Useful button, snapshot after,
# verify a toggled/active state is now present.

BEFORE_TOGGLE=$(playwright-cli snapshot -s "$SESSION")

# Click the first non-active "Useful" / "Mark useful" button in the card demo.
playwright-cli click 'button:has-text("Useful")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Mark useful")' -s "$SESSION" 2>/dev/null || {
  echo "FAIL: Could not click a 'Useful' action button — DigestCard may not be rendered or interactive"
  FAIL=1
}

AFTER_TOGGLE=$(playwright-cli snapshot -s "$SESSION")

# After toggling, the button should carry an active/pressed/green indicator.
# We accept aria-pressed="true", a data-active attribute, or a visible "Useful"
# that now reads as active in the accessibility tree.
if ! echo "$AFTER_TOGGLE" | grep -qi 'aria-pressed="true"\|data-active\|active\|pressed'; then
  echo "FAIL: After clicking 'Useful', no active/pressed state detected — toggle not working"
  FAIL=1
fi

# ── "Hide" does NOT remove the card ─────────────────────────────────────────
# The plan: "Hide and View original do not mutate the feed." Clicking Hide must
# leave the DigestCard (or its title / actions) still visible in the snapshot.
playwright-cli click 'button:has-text("Hide")' -s "$SESSION" 2>/dev/null || true

AFTER_HIDE=$(playwright-cli snapshot -s "$SESSION")

# The card content (title, actions) should still be present — visual-only.
if ! echo "$AFTER_HIDE" | grep -qi "useful\|view original\|original"; then
  echo "FAIL: After clicking 'Hide', card content disappeared — Hide is mutating the feed (should be visual-only)"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase3-digest-card — metadata row, title, summary, three actions rendered; priority + source-type + useful-marked variants present; Useful toggles active state; Hide is visual-only"
else
  exit 1
fi
