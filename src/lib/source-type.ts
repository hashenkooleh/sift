import { Globe, Send, SquarePlay } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import type { SourceType } from "./types"

/**
 * Presentation metadata per source type — the short badge label and the glyph.
 * Consumed by DigestCard (label + icon) and PendingItem (icon only).
 * `github` deliberately reads as Web until it earns its own treatment.
 */
export const SOURCE_TYPE_META: Record<
  SourceType,
  { label: string; icon: LucideIcon }
> = {
  telegram: { label: "TG", icon: Send },
  youtube: { label: "YT", icon: SquarePlay },
  web: { label: "Web", icon: Globe },
  github: { label: "Web", icon: Globe },
}
