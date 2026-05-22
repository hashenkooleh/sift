/*
 * Shared domain types for Sift.
 *
 * The persisted-record types (Source, Message, Summary) mirror the IA
 * "Data model" tables in
 * .design-engineer-plugin/design/planning/information-architecture.md.
 * They are shaped so a future Supabase swap is a near drop-in: field names
 * are the camelCase form of the snake_case DB columns, dates are ISO strings,
 * and the not-yet-built AI columns are present but optional.
 *
 * The view-model types (DigestEntry, PendingEntry) are what the feed
 * components actually render — a Summary joined to its Source plus the
 * derived fields a card needs.
 */

// --- Enums (mirror the Postgres enum columns) -------------------------------

/** sources.type — Telegram channels ship in MVP; the rest are prepared UI. */
export type SourceType = "telegram" | "youtube" | "web" | "github"

/** sources.priority — drives digest ranking and the card priority dot. */
export type Priority = "high" | "medium" | "low"

// --- Persisted records (IA "Data model" tables) -----------------------------

/** A connected content source. Table: `sources`. */
export interface Source {
  id: string
  /** Channel / source display name, e.g. "UX Unicorn". */
  name: string
  type: SourceType
  /** Telegram channel handle or source URL/identifier, e.g. "@uxunicorn". */
  url: string
  priority: Priority
  /** Active/inactive toggle on the Sources screen. */
  enabled: boolean
  /** ISO 8601 timestamp. */
  createdAt: string
}

/** A raw message pulled from a source. Table: `messages`. */
export interface Message {
  id: string
  /** FK → Source.id. */
  sourceId: string
  /** Provider-side message id, e.g. the Telegram message ID. */
  externalId: string
  /** Message author name. */
  author: string
  /** Full original message text. */
  text: string
  /** Attached media URL, if any. */
  mediaUrl?: string
  /** ISO 8601 timestamp of the original message. */
  createdAt: string

  // Future-AI columns — present so the type is schema-complete, not used yet.
  /** Auto-generated topic tags. */
  tags?: string[]
  /** Semantic-search vector. */
  embedding?: number[]
  /** FK → topic cluster, for clustering. */
  clusterId?: string
}

/** An AI-generated distillation of a source's messages. Table: `summaries`. */
export interface Summary {
  id: string
  /** FK → Source.id. Nullable in the schema for cross-source summaries. */
  sourceId: string | null
  /** Digest date, ISO date string (YYYY-MM-DD). */
  date: string
  /** AI-generated summary text (Ukrainian). */
  text: string
  /** Extracted topic list. */
  keyTopics: string[]
  /** ISO 8601 timestamp. */
  createdAt: string
}

// --- View models (what the feed components render) --------------------------

/**
 * One card in the digest feed: a Summary joined to its Source, plus the
 * derived fields the DigestCard renders. The feed is a list of these,
 * ranked by `priority`.
 */
export interface DigestEntry {
  /** FK → Summary.id this entry was distilled from. */
  id: string
  /** Source.type — selects the TG/YT/Web badge. */
  sourceType: SourceType
  /** Source.name, e.g. "UX Unicorn". */
  sourceName: string
  /** Source.url handle, e.g. "@uxunicorn". */
  sourceHandle: string
  /** Source.priority — selects the priority-dot color. */
  priority: Priority
  /** Card heading (Geist Sans). */
  title: string
  /** Distillation body (Geist Sans). */
  summary: string
  /** Human-readable relative time, e.g. "2h ago" (Geist Mono). */
  timestamp: string
  /** Whether the user has marked this entry useful (drives the green state). */
  markedUseful?: boolean
}

/**
 * One row in the pending queue: an item the agent is still distilling,
 * shown above the feed with a spinner and an ETA.
 */
export interface PendingEntry {
  id: string
  /** Where the item came from — selects the row glyph. */
  sourceType: SourceType
  /** Mono label, e.g. a truncated URL or "Forwarded from Telegram". */
  label: string
  /** What the agent is doing, e.g. "Generating summary...". */
  status: string
  /** Mono ETA, e.g. "~45s left". */
  eta: string
}
