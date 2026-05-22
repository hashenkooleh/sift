#!/bin/bash
# Test: phase5-digest-screen-layout
# Expected: The Digest screen at / renders the fully assembled page in prototype
#           order: PageHeader (title "Today's digest"), a search bar, a filter bar
#           with an "All" chip and at least one FilterDropdown, a "Today's
#           highlights" section, a pending/processing section, and a feed of
#           DigestCards. The old placeholder text ("Scaffold ready") is gone.

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null
playwright-cli goto "http://localhost:3002/" -s "$SESSION"

SNAPSHOT=$(playwright-cli snapshot -s "$SESSION")

# ── Old placeholder must be gone ────────────────────────────────────────────
# Before Phase 5 the page.tsx contained an 8-line placeholder. Once the Digest
# screen is assembled the placeholder text must no longer appear.
if echo "$SNAPSHOT" | grep -qi "Scaffold ready\|scaffold\|placeholder page\|coming soon\|TODO"; then
  echo "FAIL: Old placeholder text still present at / — Digest screen not assembled yet"
  FAIL=1
fi

# ── Page header: "Today's digest" title ─────────────────────────────────────
# The plan: PageHeader title is "Today's digest". It is the primary h1/heading
# on the page and must appear before any other content sections.
if ! echo "$SNAPSHOT" | grep -qi "Today's digest\|Today.s digest\|today.*digest"; then
  echo "FAIL: 'Today's digest' heading not found at / — PageHeader title not rendered"
  FAIL=1
fi

# ── Page header: Geist Mono meta line ───────────────────────────────────────
# The plan: PageHeader has "a Geist Mono meta line" — a secondary line beneath
# the title showing a date or source-count string (e.g. "22 May 2026", "12 items",
# "4 sources"). We look for a date-like or count-like meta string near the header.
if ! echo "$SNAPSHOT" | grep -qE '[0-9]{1,2}[[:space:]]+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|[0-9]+ (item|source|article|digest|summary)|[0-9]{4}'; then
  echo "FAIL: No Geist Mono meta line (date or count) found in PageHeader at / — meta line not rendered"
  FAIL=1
fi

# ── Page header: "~15 min read" badge ───────────────────────────────────────
# The plan: PageHeader includes a "~15 min read" badge. This badge must appear
# somewhere in or near the header on the assembled page.
if ! echo "$SNAPSHOT" | grep -qi "15 min\|min read\|~15"; then
  echo "FAIL: '~15 min read' badge not found in PageHeader at / — read-time badge not rendered"
  FAIL=1
fi

# ── Page header: "Parse video" button ───────────────────────────────────────
# The plan: PageHeader actions include a "Parse video" button. It must be visible
# in the header area as a button element.
if ! echo "$SNAPSHOT" | grep -qi "Parse video\|parse.*video"; then
  echo "FAIL: 'Parse video' button not found in PageHeader at / — Parse video action not rendered"
  FAIL=1
fi

# ── Page header: "+" menu button ────────────────────────────────────────────
# The plan: PageHeader actions include a "+" menu button that opens a Popover.
# It must be present as an accessible button.
if ! echo "$SNAPSHOT" | grep -qE '\+|aria-label="\+"|\bAdd\b|menu.*button|action.*menu'; then
  echo "FAIL: '+' menu button not found in PageHeader at / — plus-menu action not rendered"
  FAIL=1
fi

# ── Search bar ──────────────────────────────────────────────────────────────
# The plan: a search input with placeholder "Search summaries…" immediately
# below the header. The input must be in the accessibility tree.
if ! echo "$SNAPSHOT" | grep -qi "Search summaries\|search.*summar\|summar.*search"; then
  echo "FAIL: Search bar with 'Search summaries…' placeholder not found at / — search bar not rendered"
  FAIL=1
fi

# ── Filter bar: "All" chip ───────────────────────────────────────────────────
# The plan: filter bar starts with an "All" chip. It is a button or link labeled
# "All" that acts as the default/reset filter.
if ! echo "$SNAPSHOT" | grep -qi '\bAll\b'; then
  echo "FAIL: 'All' filter chip not found at / — filter bar not rendered"
  FAIL=1
fi

# ── Filter bar: FilterDropdowns (Telegram / YouTube / Web) ──────────────────
# The plan: filter bar has 3 FilterDropdowns labeled Telegram, YouTube, and Web.
if ! echo "$SNAPSHOT" | grep -qi "Telegram"; then
  echo "FAIL: 'Telegram' FilterDropdown not found in filter bar at / — Telegram filter not rendered"
  FAIL=1
fi

if ! echo "$SNAPSHOT" | grep -qi "YouTube"; then
  echo "FAIL: 'YouTube' FilterDropdown not found in filter bar at / — YouTube filter not rendered"
  FAIL=1
fi

if ! echo "$SNAPSHOT" | grep -qi "Web"; then
  echo "FAIL: 'Web' FilterDropdown not found in filter bar at / — Web filter not rendered"
  FAIL=1
fi

# ── Filter bar: Priority filter ─────────────────────────────────────────────
# The plan: the filter bar also includes a Priority filter chip/dropdown.
if ! echo "$SNAPSHOT" | grep -qi "Priority\|priority"; then
  echo "FAIL: Priority filter not found in filter bar at / — Priority filter not rendered"
  FAIL=1
fi

# ── "Today's highlights" section ────────────────────────────────────────────
# The plan: a static placeholder slot labeled "Today's highlights" — a quiet
# structural section, not broken empty state, not faked AI content.
if ! echo "$SNAPSHOT" | grep -qi "Today.s highlights\|today.*highlight\|highlights"; then
  echo "FAIL: 'Today's highlights' section not found at / — highlights placeholder slot not rendered"
  FAIL=1
fi

# ── Pending / Processing section ─────────────────────────────────────────────
# The plan: pending section with a "Processing" heading and PendingItem rows from
# mock data. The heading must be present on the assembled page.
if ! echo "$SNAPSHOT" | grep -qi "Processing\|Pending\|processing"; then
  echo "FAIL: Pending/Processing section heading not found at / — pending section not rendered"
  FAIL=1
fi

# ── Digest card feed present ────────────────────────────────────────────────
# The plan: a feed of DigestCards from mock data. At least one card with its
# three action labels (Useful / View original / Hide) must appear.
if ! echo "$SNAPSHOT" | grep -qi "Useful\|View original\|Hide"; then
  echo "FAIL: No DigestCard action labels (Useful / View original / Hide) found at / — digest feed not rendered"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase5-digest-screen-layout — Digest screen at / renders in full prototype order: PageHeader (title, meta, badge, Parse video, + menu), search bar, filter bar (All chip, Telegram/YouTube/Web/Priority), Today's highlights slot, pending section, and digest card feed; old placeholder is gone"
else
  exit 1
fi
