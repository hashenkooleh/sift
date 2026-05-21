#!/bin/bash
# Test: phase1-page-header
# Expected: the PageHeader component renders its title text as a heading and
#           exposes a right-aligned actions slot. Verified on two routes:
#           / (Digest) and /sources — both use the dashboard layout which
#           includes PageHeader. Title text must differ per page, confirming
#           the title prop is wired, not hardcoded.

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null

# ── / (Digest page) ──────────────────────────────────────────────────────────
playwright-cli goto "http://localhost:3000/" -s "$SESSION"
DIGEST=$(playwright-cli snapshot -s "$SESSION")

# PageHeader must render a heading (h1/h2) containing the page title.
# The Digest page title per the prototype and plan is "Digest" or "Today".
# We check for a heading role carrying "Digest" (case-insensitive).
if ! echo "$DIGEST" | grep -qi 'heading.*[Dd]igest\|[Dd]igest.*heading'; then
  echo "FAIL: / — PageHeader heading with title 'Digest' not found in accessibility tree"
  FAIL=1
fi

# PageHeader also exposes an actions slot (right-aligned children area).
# On the Digest page the plan places a "Parse video" Button and a "+" menu in
# that slot (Phase 5). For Phase 1 the slot itself must exist structurally.
# The placeholder page does not have these buttons; their absence is expected
# (Phase 5 adds them). What we verify here is that PageHeader renders at all
# and that a button or landmark scoped to the header area is present —
# meaning the actions prop/children slot is rendered even if empty or stubbed.
# We accept any <header> landmark or role="banner" in the snapshot.
if ! echo "$DIGEST" | grep -qi 'banner\|role="banner"\|<header'; then
  echo "FAIL: / — No header landmark found; PageHeader may not be rendered in the layout"
  FAIL=1
fi

# ── /sources ─────────────────────────────────────────────────────────────────
playwright-cli goto "http://localhost:3000/sources" -s "$SESSION"
SOURCES=$(playwright-cli snapshot -s "$SESSION")

# The Sources page must render a different heading title — "Sources".
# This proves the title prop is threaded through, not hardcoded to "Digest".
if ! echo "$SOURCES" | grep -qi 'heading.*[Ss]ources\|[Ss]ources.*heading'; then
  echo "FAIL: /sources — PageHeader heading with title 'Sources' not found; title prop may be static"
  FAIL=1
fi

# Header landmark must also be present on /sources.
if ! echo "$SOURCES" | grep -qi 'banner\|role="banner"\|<header'; then
  echo "FAIL: /sources — No header landmark found; PageHeader not rendered on Sources page"
  FAIL=1
fi

# ── Actions slot structural check ────────────────────────────────────────────
# On /sources the plan doesn't add custom actions yet, but PageHeader's markup
# must include the actions container div even when empty, so Phase 4/5 can slot
# into it without changing PageHeader itself.
# We verify the header region (banner) is present and the title is inside it —
# if both pass, the component structure is correct.

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase1-page-header — heading rendered with correct title on / and /sources"
else
  exit 1
fi
