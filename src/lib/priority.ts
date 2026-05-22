import type { Priority } from "./types"

/**
 * Priority dot color per priority level — high indigo, medium amber, low
 * faint grey. Consumed by DigestCard (the feed-ranking dot) and FilterDropdown
 * (the per-channel row dot); both must speak one visual language.
 */
export const PRIORITY_DOT: Record<Priority, string> = {
  high: "bg-primary",
  medium: "bg-chart-3",
  low: "bg-faint",
}
