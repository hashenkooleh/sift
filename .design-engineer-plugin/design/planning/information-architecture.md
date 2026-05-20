# Information architecture

## Navigation model

Sidebar navigation (persistent, desktop-first). ShadCN sidebar component. 5 main items:
- Digest (home/default)
- Sources
- Archive
- Design System (internal, dev-only page)
- Settings

## Screen inventory

### 1. Digest (/)

Primary screen. What user sees every morning.

**Layout:** Cards with summaries (confirmed during prototyping)

**Header actions (top-right):**
- "~15 min read" time badge
- "Parse video" button (YouTube icon) → opens modal with URL input
- "+" button with dropdown: Parse URL (article, GitHub), Upload file, Forward via Telegram

**Content sections:**
- Pending queue (top, conditional) — shows items currently being processed by agent with spinner, source type, and ETA
- Filter bar: dropdown filters per source type (Telegram/YouTube/Web) with per-channel checkboxes inside each; Priority filter on the right
- Today's highlights — AI-generated summary of top insights across all sources
- Per-channel breakdown — individual digest cards per source
- Search bar: keyword search across today's summaries

**Digest card anatomy:**
- Source type badge (TG / YT / Web) + priority dot + source name + timestamp
- Title + summary text (Ukrainian)
- Actions: Mark useful, View original, Hide

**Card actions:**
- Mark useful — saves to Knowledge Base, persists indefinitely
- View original — expand to see full original message + author name
- Hide — temporarily remove from feed (does not delete)

**Input channels:**
- Parse video (YouTube URL → transcript + screenshots + AI summary → digest card)
- Parse URL (any article/GitHub → extract text + AI summary → digest card)
- Forward via Telegram (forward message to @DesignPulseBot → agent processes → digest card)
- Upload file (PDF/doc → extract text + summary) — future

### 2. Sources (/sources)

Manage connected content sources and their priorities.

**Content:**
- Connected sources list
  - Source card: name, type (Telegram | YouTube | GitHub — future), priority badge, enabled/disabled toggle
  - Actions per source: set priority (High / Medium / Low), enable/disable, remove
- Add source button → connect new Telegram channel
  - Future: YouTube channel, GitHub repos, X/Threads

**MVP scope:** Telegram channels only. UI prepared for future source types.

### 3. Archive (/archive)

Two-tab structure:

**Tab 1: Knowledge Base**
- Items marked as "useful" — persists indefinitely
- Searchable by keyword
- Filter by source, date

**Tab 2: Recent**
- Last 2 weeks of digests
- Auto-expire logic:
  - Single mentions: auto-removed after 2 weeks
  - Repeated patterns (topic mentioned 3+ times across different sources/dates): retained longer
- Search and filter same as Knowledge Base tab

### 4. Design System (/design-system)

Internal page — living component gallery, source of truth for all UI elements.

**Sections:**
- **Tokens** — color palette (all --midnight, --slate, --pulse-blue etc. with swatches), typography scale (Geist Sans/Mono sizes and weights), spacing scale (8px base)
- **Base components** — ShadCN components with custom theme: Button (variants + states), Input, Checkbox, Toggle, Badge, Tabs, Sidebar
- **Custom components** — DigestCard (all states: default, useful-marked, hidden, with source type badges), FilterDropdown (with channel checkboxes), PendingItem (with spinner), SourceRow (with priority badge + toggle), YouTubeParseModal, TelegramForwardModal
- **Patterns** — card actions bar, search bar, filter bar, page header with action buttons

Each component shows: default state, hover, active, disabled, loading (where applicable).

### 5. Settings (/settings)

Minimal on MVP:
- Trigger time (default: 08:00, configurable)
- Theme (Light / Dark)
- Language note: UI in English, AI-generated content in Ukrainian by default

## User flows

### Flow 1: Morning digest (primary, daily)

```
Open app
  → Digest page loads with today's highlights
    → Scan cards/table
      → Mark useful on relevant items
      → View original on interesting ones
        → Close app
```
Duration: ~15 minutes. This is the core loop.

### Flow 2: Task-driven search (on-demand)

```
Receive task from client
  → Open app
    → Search by keyword in Digest or Archive
      → See relevant summaries from Knowledge Base + Recent
        → View original for details
          → Apply approach to task
```

### Flow 3: Source management (occasional)

```
Open Sources page
  → See connected channels with priority levels
    → Adjust priority on a channel
    → Add new channel (paste Telegram channel URL/name)
      → Changes reflected in next day's digest
```

## Data model

### sources
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| name | text | Channel/source display name |
| type | enum | telegram, youtube, github (future) |
| url | text | Telegram channel URL or identifier |
| priority | enum | high, medium, low |
| enabled | boolean | Active/inactive toggle |
| created_at | timestamptz | |

### messages
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| source_id | UUID | FK → sources |
| external_id | text | Telegram message ID |
| author | text | Message author name |
| text | text | Full message text |
| media_url | text | Attached media (nullable) |
| created_at | timestamptz | Original message timestamp |
| tags | JSONB | Future AI — auto-generated topic tags |
| embedding | vector | Future AI — for semantic search |
| cluster_id | UUID | Future AI — topic clustering |

### summaries
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| source_id | UUID | FK → sources (nullable for cross-source summaries) |
| date | date | Digest date |
| text | text | AI-generated summary (Ukrainian) |
| key_topics | JSONB | Extracted topic list |
| created_at | timestamptz | |

### user_feedback
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| message_id | UUID | FK → messages |
| summary_id | UUID | FK → summaries (nullable) |
| type | enum | useful, hidden |
| reason | text | Optional — why hidden |
| created_at | timestamptz | |

Knowledge Base = query: `SELECT * FROM messages JOIN user_feedback ON ... WHERE type = 'useful'`

## Navigation depth

Maximum 2 levels:
- Level 1: Sidebar item (Digest, Sources, Archive, Settings)
- Level 2: Tab within page (Archive: Knowledge Base / Recent)

No deeper nesting. Keeps it simple.

## Parking lot (not in MVP IA)

- Landing page, Auth, Pricing, Profile — deferred
- GitHub integration — new source type, parking lot
- Onboarding flow — one user, not needed
- X/Threads integration — API limitations
