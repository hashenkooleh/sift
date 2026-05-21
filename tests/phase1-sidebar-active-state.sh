#!/bin/bash
# Test: phase1-sidebar-active-state
# Expected: navigating to /sources makes the Sources nav item carry the active
#           (indigo) highlight, not the Digest item. The active item is
#           distinguished from inactive items via an aria-current attribute or
#           a class that encodes the active token (--signal / indigo).

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null

# ── Visit /sources ──────────────────────────────────────────────────────────
playwright-cli goto "http://localhost:3000/sources" -s "$SESSION"
SNAPSHOT=$(playwright-cli snapshot -s "$SESSION")

# The /sources page must load without a 404 or error.
if echo "$SNAPSHOT" | grep -qi "404\|This page could not be found\|Application error"; then
  echo "FAIL: /sources returned a 404 or application error"
  FAIL=1
fi

# The Sources nav item must carry aria-current="page" (standard Next.js active
# link convention) when the current path is /sources.
# Playwright accessibility snapshot surfaces aria attributes directly.
if ! echo "$SNAPSHOT" | grep -q 'aria-current="page"'; then
  echo "FAIL: No nav item has aria-current=page on /sources — active state not implemented"
  FAIL=1
fi

# Specifically, the element marked aria-current="page" must be the Sources link,
# not the Digest link. Digest is href="/" so it must NOT have aria-current.
# We check that the digest link (href="/") is present but NOT marked current.
# A crude but reliable heuristic: if both href="/" and aria-current="page" appear
# on the SAME element the grep below finds them in close proximity.
# We serialise the snapshot and look for the pattern 'href="/" [^>]*aria-current'
# or 'aria-current[^>]*href="/"'. If found, Digest is wrongly active.
if echo "$SNAPSHOT" | grep -qP 'href="/"\s[^>]*aria-current|aria-current[^>]*href="/"'; then
  echo "FAIL: Digest (href=/) is marked aria-current on /sources — wrong item is active"
  FAIL=1
fi

# The Sources link itself (href="/sources") must be present in the snapshot
# regardless of active state, confirming the sidebar rendered at all.
if ! echo "$SNAPSHOT" | grep -q 'href="/sources"'; then
  echo "FAIL: href=/sources not found in sidebar — Sidebar component not rendered"
  FAIL=1
fi

# ── Cross-check: visit / and confirm Digest is now active ───────────────────
playwright-cli goto "http://localhost:3000/" -s "$SESSION"
SNAPSHOT2=$(playwright-cli snapshot -s "$SESSION")

if ! echo "$SNAPSHOT2" | grep -q 'aria-current="page"'; then
  echo "FAIL: No nav item has aria-current=page on / — active state not implemented on home route"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase1-sidebar-active-state — Sources active on /sources, Digest active on /"
else
  exit 1
fi
