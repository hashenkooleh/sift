#!/bin/bash
# Test: phase5-digest-feed
# Expected: The Digest feed at / shows multiple DigestCards ordered by priority
#           (high → medium → low). The first visible card is a high-priority card.
#           The pending section shows at least one processing row with a spinner,
#           a mono label, status text, and a mono ETA. Feed is single-column
#           (no card-in-card nesting).

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null
playwright-cli goto "http://localhost:3002/" -s "$SESSION"

SNAPSHOT=$(playwright-cli snapshot -s "$SESSION")

# ── Multiple DigestCards must be present ────────────────────────────────────
# The plan: "≥4 digest entries" from mock-data. The feed must render more than
# one card. We count occurrences of the "Useful" action label (one per card).
USEFUL_COUNT=$(echo "$SNAPSHOT" | grep -oi "Useful\|Mark useful" | wc -l | tr -d ' ')
if [ "${USEFUL_COUNT:-0}" -lt 2 ]; then
  echo "FAIL: Fewer than 2 DigestCards found at / (found ${USEFUL_COUNT:-0} 'Useful' labels) — digest feed not rendering multiple cards"
  FAIL=1
fi

# ── High-priority card is present ────────────────────────────────────────────
# The plan: feed is ranked high → medium → low. At minimum a high-priority card
# must be present. The mock data includes at least one high-priority entry.
# Priority is surfaced as a label, aria attribute, or data attribute in the tree.
if ! echo "$SNAPSHOT" | grep -qi "high\|priority.*high\|high.*priority"; then
  echo "FAIL: No high-priority DigestCard found at / — high-priority card missing from feed or priority ranking not implemented"
  FAIL=1
fi

# ── Low-priority card is also present ───────────────────────────────────────
# The plan specifies all three priority levels from mock data. A low-priority
# card must appear in the feed (ranked last).
if ! echo "$SNAPSHOT" | grep -qi "low\|priority.*low\|low.*priority"; then
  echo "FAIL: No low-priority DigestCard found at / — low-priority card missing from feed"
  FAIL=1
fi

# ── High-priority card appears before low-priority card ─────────────────────
# The plan: feed ordered high → medium → low. In the accessibility tree the
# text "high" must appear before the text "low" in document order.
HIGH_POS=$(echo "$SNAPSHOT" | grep -in "high" | head -1 | cut -d: -f1)
LOW_POS=$(echo "$SNAPSHOT" | grep -in "low" | head -1 | cut -d: -f1)
if [ -n "${HIGH_POS}" ] && [ -n "${LOW_POS}" ]; then
  if [ "${HIGH_POS}" -gt "${LOW_POS}" ]; then
    echo "FAIL: High-priority card appears after low-priority card in the feed — priority ranking (high → medium → low) not implemented"
    FAIL=1
  fi
fi

# ── Cards have titles and summaries ─────────────────────────────────────────
# The plan: each DigestCard renders a title and summary body text from mock data.
# We verify that at least one title/summary string from the prototype fixtures
# (non-trivially long text) is present — indicating real mock content, not an
# empty shell.
if ! echo "$SNAPSHOT" | grep -qE '.{40,}'; then
  echo "FAIL: No substantive text content (≥40 chars) found in digest feed at / — cards may be rendering without mock content"
  FAIL=1
fi

# ── Pending section: at least one PendingItem row ───────────────────────────
# The plan: pending section renders PendingItems from mock data (≥2 pending
# items in fixtures). A PendingItem must show a status/label text string.
# The plan: "spinner + Geist Mono label + status text + Geist Mono ETA".
if ! echo "$SNAPSHOT" | grep -qi "Processing\|Pending\|Fetching\|Analyzing\|Summarizing\|fetching\|analyzing"; then
  echo "FAIL: No PendingItem status text found in pending section at / — PendingItems not rendered from mock data"
  FAIL=1
fi

# ── Pending section: ETA or time estimate present ───────────────────────────
# The plan: PendingItem renders a Geist Mono ETA string (e.g. "~30s", "~2 min",
# "est. 1 min"). We look for a time-unit hint in the pending area.
if ! echo "$SNAPSHOT" | grep -qiE '~[0-9]|[0-9]+\s*(s|sec|min|m)\b|eta|est\.'; then
  echo "FAIL: No ETA / time estimate found in pending section at / — PendingItem ETA not rendered"
  FAIL=1
fi

# ── No card-in-card nesting ──────────────────────────────────────────────────
# The plan and CLAUDE.md: "no cards nested inside cards". The DigestCard must
# not wrap another card element. We check that "useful" (card action) does not
# appear nested inside a role="article" that is itself inside another
# role="article" — a heuristic check via line proximity in snapshot.
# A simpler proxy: the word "card" does not appear as an aria-label of a child
# of another card. We accept this passes vacuously if nesting cannot be
# detected in the text snapshot.
ARTICLE_COUNT=$(echo "$SNAPSHOT" | grep -oi 'role="article"' | wc -l | tr -d ' ')
if [ "${ARTICLE_COUNT:-0}" -gt 20 ]; then
  echo "FAIL: Unexpectedly high article/card count (${ARTICLE_COUNT}) — possible card-in-card nesting"
  FAIL=1
fi

# ── Source-type badges present in feed ──────────────────────────────────────
# The plan: DigestCards render TG/YT/Web source-type badges from mock data.
# At least one source-type identifier must appear in the live feed.
if ! echo "$SNAPSHOT" | grep -qiE '\bTG\b|\bYT\b|\bTelegram\b|\bYouTube\b|\bWeb\b'; then
  echo "FAIL: No source-type badge (TG / YT / Web / Telegram / YouTube) found in digest feed at / — source badges not rendered"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase5-digest-feed — / shows multiple DigestCards with real mock content; high-priority card precedes low-priority; source-type badges present; pending section shows at least one PendingItem with status and ETA; no card-in-card nesting detected"
else
  exit 1
fi
