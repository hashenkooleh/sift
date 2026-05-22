import { LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { SOURCE_TYPE_META } from "@/lib/source-type"
import type { PendingEntry } from "@/lib/types"

export interface PendingItemProps {
  /** The queue item being processed. */
  entry: PendingEntry
  className?: string
}

/**
 * One row in the agent processing queue: a spinner, a Geist Mono source label,
 * a status line, and a Geist Mono ETA. The Linear/Retool "processing" register
 * — shown above the digest feed while the agent is still distilling an item.
 */
export function PendingItem({ entry, className }: PendingItemProps) {
  const SourceIcon = SOURCE_TYPE_META[entry.sourceType].icon

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LoaderCircle
        aria-hidden
        className="size-4 shrink-0 animate-spin text-primary"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <SourceIcon className="size-3 shrink-0" />
          <span className="truncate">{entry.label}</span>
        </div>
        <p className="mt-0.5 text-xs text-faint">{entry.status}</p>
      </div>
      <span className="shrink-0 font-mono text-xs whitespace-nowrap text-faint">
        {entry.eta}
      </span>
    </div>
  )
}
