#!/bin/bash
# Test: phase1-sidebar-responsive-collapse
# Expected: at viewport width ≤768px the sidebar collapses to a 56px icon rail
#           and nav labels (text) are hidden; at desktop width (1280px) the
#           labels are visible. The plan specifies this as a CSS @media rule
#           matching the prototype's responsive behaviour.

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null

# ── Desktop viewport (1280×800) ─────────────────────────────────────────────
# playwright-cli sets viewport before goto via --viewport flag.
# The accessibility snapshot at desktop width must contain the visible label
# text for nav items. "Digest", "Sources", "Archive" are the most reliable
# because they are short, unique to the sidebar, and not repeated elsewhere.
playwright-cli goto "http://localhost:3000/" -s "$SESSION" --viewport '{"width":1280,"height":800}'
DESKTOP=$(playwright-cli snapshot -s "$SESSION")

# At desktop width, nav item labels must appear as accessible text in the tree.
# "Digest" is the home item label. Its absence means the sidebar is already
# collapsed or not rendered.
if ! echo "$DESKTOP" | grep -qi "Digest"; then
  echo "FAIL: Desktop (1280px) — sidebar label 'Digest' not found; sidebar may be collapsed or absent"
  FAIL=1
fi

if ! echo "$DESKTOP" | grep -qi "Sources"; then
  echo "FAIL: Desktop (1280px) — sidebar label 'Sources' not found"
  FAIL=1
fi

if ! echo "$DESKTOP" | grep -qi "Archive"; then
  echo "FAIL: Desktop (1280px) — sidebar label 'Archive' not found"
  FAIL=1
fi

# ── Mobile viewport (375×812) ───────────────────────────────────────────────
# Navigate again at narrow width. The sidebar must collapse to an icon rail:
# labels must NOT appear as visible text in the accessibility tree.
# The icon-rail state hides labels via CSS (sr-only / display:none / width:0).
# Playwright's snapshot reflects the computed accessibility tree — hidden text
# is excluded (visibility:hidden / display:none / aria-hidden:true all suppress
# the node). We rely on that contract.
playwright-cli goto "http://localhost:3000/" -s "$SESSION" --viewport '{"width":375,"height":812}'
MOBILE=$(playwright-cli snapshot -s "$SESSION")

# If labels are still exposed at 375px the collapse is not implemented.
# We look for the label text appearing as a standalone accessible name.
# "Digest" is safest — it only appears as a sidebar label at this stage.
if echo "$MOBILE" | grep -q '"Digest"'; then
  echo "FAIL: Mobile (375px) — label 'Digest' still visible in accessibility tree; sidebar did not collapse"
  FAIL=1
fi

if echo "$MOBILE" | grep -q '"Sources"'; then
  echo "FAIL: Mobile (375px) — label 'Sources' still visible; sidebar did not collapse to icon rail"
  FAIL=1
fi

# The icon links themselves must still be present (navigation must remain
# functional on mobile — just label-free). At minimum the hrefs survive.
if ! echo "$MOBILE" | grep -q 'href="/sources"'; then
  echo "FAIL: Mobile (375px) — href=/sources missing entirely; sidebar may have vanished"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase1-sidebar-responsive-collapse — labels visible at 1280px, hidden at 375px"
else
  exit 1
fi
