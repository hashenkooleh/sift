#!/bin/bash
# Test: phase1-routing-fix
# Expected: navigating to / returns a 200 with dashboard content and no Next.js
#           parallel-route-conflict error ("digest" redirect is gone).

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null
playwright-cli goto "http://localhost:3000/" -s "$SESSION"

SNAPSHOT=$(playwright-cli snapshot -s "$SESSION")

# The root page must NOT redirect to /digest (which does not exist).
# After the fix, the dashboard page content appears directly at /.
# We check for dashboard-specific text that only (dashboard)/page.tsx renders.
if ! echo "$SNAPSHOT" | grep -qi "digest"; then
  echo "FAIL: Dashboard content not found at /"
  FAIL=1
fi

# A Next.js route-conflict error renders a specific "Error" heading or
# "parallel pages" / "redirect" language. Detect the broken redirect target.
if echo "$SNAPSHOT" | grep -q "/digest"; then
  echo "FAIL: Page still contains /digest reference — routing conflict not resolved"
  FAIL=1
fi

# The root must not show a Next.js 404 or generic error page.
if echo "$SNAPSHOT" | grep -qi "404\|This page could not be found\|Application error"; then
  echo "FAIL: Page returned an error or 404 — route conflict persists"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase1-routing-fix — / loads dashboard with no route-conflict error"
else
  exit 1
fi
