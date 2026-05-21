#!/bin/bash
# Test: phase1-sidebar-nav-links
# Expected: The Sidebar component renders all 5 nav items with correct hrefs:
#           Digest (/), Sources (/sources), Archive (/archive),
#           Design System (/design-system), Settings (/settings).
#           Settings lives in the sidebar footer area.

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null
playwright-cli goto "http://localhost:3000/" -s "$SESSION"

SNAPSHOT=$(playwright-cli snapshot -s "$SESSION")

# Each nav item must appear as a link with the correct href.
# The Sidebar component (not the placeholder) must wire these up.

if ! echo "$SNAPSHOT" | grep -q 'href="/"'; then
  echo "FAIL: Sidebar missing Digest link (href=/)"
  FAIL=1
fi

if ! echo "$SNAPSHOT" | grep -q 'href="/sources"'; then
  echo "FAIL: Sidebar missing Sources link (href=/sources)"
  FAIL=1
fi

if ! echo "$SNAPSHOT" | grep -q 'href="/archive"'; then
  echo "FAIL: Sidebar missing Archive link (href=/archive)"
  FAIL=1
fi

if ! echo "$SNAPSHOT" | grep -q 'href="/design-system"'; then
  echo "FAIL: Sidebar missing Design System link (href=/design-system)"
  FAIL=1
fi

if ! echo "$SNAPSHOT" | grep -q 'href="/settings"'; then
  echo "FAIL: Sidebar missing Settings link (href=/settings)"
  FAIL=1
fi

# Verify the sidebar component itself is present — the placeholder aside used
# /digest links; the real Sidebar component replaces it.
# Presence of all 5 correct hrefs (/ not /digest) is the structural proof.
if echo "$SNAPSHOT" | grep -q 'href="/digest"'; then
  echo "FAIL: Sidebar still contains old placeholder /digest link — Sidebar component not wired in"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase1-sidebar-nav-links — all 5 nav items present with correct hrefs"
else
  exit 1
fi
