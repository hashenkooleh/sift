#!/bin/bash
# Test: phase4-filter-dropdown
# Expected: The FilterDropdown component is documented on /design-system with a
#           chip showing a label and a Geist Mono count. Clicking the chip opens
#           a Popover containing per-channel checkbox rows (each with a priority
#           dot and a channel name). The chevron rotates when the popover is open.
#           Checkboxes can be toggled (visual-only). Clicking outside closes the
#           popover; checkbox state is retained on reopen.

set -euo pipefail
SESSION="test-$(basename "$0" .sh)-$$"
FAIL=0

cleanup() { playwright-cli close -s "$SESSION" 2>/dev/null || true; }
trap cleanup EXIT

playwright-cli open -s "$SESSION" 2>/dev/null
playwright-cli goto "http://localhost:3002/design-system" -s "$SESSION"

SNAPSHOT=$(playwright-cli snapshot -s "$SESSION")

# ── Catalog section must exist ───────────────────────────────────────────────
# The plan requires FilterDropdown to be added to the /design-system catalog
# with its own section heading and NAV anchor before it is used anywhere else.
if ! echo "$SNAPSHOT" | grep -qi "FilterDropdown\|Filter Dropdown"; then
  echo "FAIL: 'FilterDropdown' heading/label not found on /design-system — component not documented"
  FAIL=1
fi

# ── Chip must render with a label ────────────────────────────────────────────
# The plan: "a filter chip (label + Geist Mono count + chevron)". The chip must
# display a visible label text on the catalog page before the popover is opened.
# The prototype names the filter chips "Telegram", "YouTube", "Web", "All", or a
# generic demo label.
if ! echo "$SNAPSHOT" | grep -qi "Telegram\|YouTube\|Web\|All\|Filter\|Channels"; then
  echo "FAIL: No filter chip label found — FilterDropdown chip not rendered on /design-system"
  FAIL=1
fi

# ── Chip must render with a count ────────────────────────────────────────────
# The plan: count is in Geist Mono. The catalog must display at least one
# numeric count badge or count label on the filter chip (e.g. "5", "(3)", "3").
if ! echo "$SNAPSHOT" | grep -qE '[0-9]+'; then
  echo "FAIL: No numeric count found near FilterDropdown chip — count badge not rendered"
  FAIL=1
fi

# ── Popover must be closed on page load ─────────────────────────────────────
# Before the chip is clicked the popover panel (channel checkbox list) must NOT
# be present in the accessibility tree. The list only renders when open.
if echo "$SNAPSHOT" | grep -qi 'aria-expanded="true"'; then
  echo "FAIL: FilterDropdown popover appears open on page load — should be closed until chip is clicked"
  FAIL=1
fi

# ── Open: chip click shows the popover with checkbox rows ───────────────────
# Click the FilterDropdown chip/trigger. The button may carry the label text
# (Telegram / YouTube / Web / Filter) or a generic "Filter" text. We try
# progressively.
playwright-cli click 'button:has-text("Telegram")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Filter")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("YouTube")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Channels")' -s "$SESSION" 2>/dev/null || {
  echo "FAIL: Could not find or click a FilterDropdown chip button — FilterDropdown may not be rendered"
  FAIL=1
}

OPEN_SNAP=$(playwright-cli snapshot -s "$SESSION")

# After the click the popover panel must appear. It contains channel checkboxes.
# base-ui Popover opens with aria-expanded="true" on the trigger, or the popup
# element itself enters the tree.
if ! echo "$OPEN_SNAP" | grep -qi 'aria-expanded="true"\|popover\|listbox\|menu'; then
  echo "FAIL: FilterDropdown popover did not open after chip click — open behavior not implemented"
  FAIL=1
fi

# ── Popover must contain checkbox rows ──────────────────────────────────────
# The plan: "per-channel Checkbox rows with priority dots". When open, the
# popover content must include at least one checkbox element (role="checkbox"
# or input[type=checkbox]).
if ! echo "$OPEN_SNAP" | grep -qi 'checkbox\|role="checkbox"'; then
  echo "FAIL: No checkbox rows found in open FilterDropdown popover — channel checkboxes not rendered"
  FAIL=1
fi

# ── Popover must contain channel names ──────────────────────────────────────
# The plan: "per-channel rows". The prototype's channels include names like
# "Telegram", "YouTube", "Ux Design Weekly", etc. At least one channel-like
# label must appear inside the open popover.
if ! echo "$OPEN_SNAP" | grep -qi "channel\|telegram\|youtube\|design\|web"; then
  echo "FAIL: No channel name labels found in open FilterDropdown popover — channel rows not rendered"
  FAIL=1
fi

# ── Chevron rotates when open ────────────────────────────────────────────────
# The plan: "chevron rotates when open". When the popover is open the trigger
# button (or an SVG within it) must carry a rotation/open indicator — typically
# a CSS class like "rotate-180", an aria attribute, or data-state="open" on the
# trigger.
if ! echo "$OPEN_SNAP" | grep -qi 'rotate\|data-state="open"\|aria-expanded="true"\|open'; then
  echo "FAIL: No chevron rotation or open-state indicator found on FilterDropdown trigger — chevron rotation not implemented"
  FAIL=1
fi

# ── Checkbox toggles (visual-only) ──────────────────────────────────────────
# The plan: "checkboxes toggle, feed unaffected." Click the first checkbox in
# the open popover and verify its checked state changes.
playwright-cli click '[role="checkbox"]' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'input[type="checkbox"]' -s "$SESSION" 2>/dev/null || {
  echo "FAIL: Could not click a checkbox in the FilterDropdown popover — checkboxes may not be interactive"
  FAIL=1
}

AFTER_CHECK=$(playwright-cli snapshot -s "$SESSION")

# After clicking a checkbox it must reflect a checked state in the a11y tree.
if ! echo "$AFTER_CHECK" | grep -qi 'checked\|aria-checked="true"\|data-checked'; then
  echo "FAIL: After clicking a FilterDropdown checkbox, no checked state detected — checkbox toggle not working"
  FAIL=1
fi

# ── Close: clicking outside closes the popover ──────────────────────────────
# Click a structural element far from the FilterDropdown (the page h1 or top
# of the body) to trigger the outside-click dismiss.
playwright-cli click 'h1' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'body' -s "$SESSION" --position '{"x":10,"y":10}' 2>/dev/null || true

AFTER_OUTSIDE=$(playwright-cli snapshot -s "$SESSION")

if echo "$AFTER_OUTSIDE" | grep -qi 'aria-expanded="true"'; then
  echo "FAIL: FilterDropdown popover still open after outside click — outside-click dismiss not implemented"
  FAIL=1
fi

# ── Close: Escape key closes the popover ────────────────────────────────────
# Re-open the popover for the Escape test.
playwright-cli click 'button:has-text("Telegram")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Filter")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("YouTube")' -s "$SESSION" 2>/dev/null || \
playwright-cli click 'button:has-text("Channels")' -s "$SESSION" 2>/dev/null || true

playwright-cli press "Escape" -s "$SESSION" 2>/dev/null || true

AFTER_ESC=$(playwright-cli snapshot -s "$SESSION")

if echo "$AFTER_ESC" | grep -qi 'aria-expanded="true"'; then
  echo "FAIL: FilterDropdown popover still open after Escape key — Escape dismiss not implemented"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: phase4-filter-dropdown — chip renders with label and count; click opens popover with checkbox rows; checkboxes toggle; outside click and Escape each dismiss it; chevron open-state indicator present"
else
  exit 1
fi
