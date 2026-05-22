"use client"

import { useState } from "react"
import { EyeOff, ExternalLink, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { PRIORITY_DOT } from "@/lib/priority"
import { SOURCE_TYPE_META } from "@/lib/source-type"
import type { DigestEntry } from "@/lib/types"

export interface DigestCardProps {
  /** The summary-plus-source view model this card renders. */
  entry: DigestEntry
  className?: string
}

function CardAction({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors",
        active
          ? "text-chart-2"
          : "text-faint hover:bg-muted hover:text-muted-foreground"
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </button>
  )
}

/**
 * One distilled card in the digest feed: a single bordered surface carrying a
 * Geist Mono metadata row (priority dot, source-type badge, source attribution,
 * timestamp), a Geist Sans title and summary, and a row of text actions.
 *
 * Visual-only: "Mark useful" toggles its own green styling; "View original"
 * and "Hide" do not mutate the feed (see development/decisions.md, Decision 5).
 */
export function DigestCard({ entry, className }: DigestCardProps) {
  const [markedUseful, setMarkedUseful] = useState(entry.markedUseful ?? false)
  const sourceType = SOURCE_TYPE_META[entry.sourceType]

  return (
    <article
      className={cn(
        "rounded-lg border border-border bg-card p-4 transition-colors hover:border-muted",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span
          role="img"
          aria-label={`${entry.priority} priority`}
          className={cn(
            "size-2 shrink-0 rounded-full",
            PRIORITY_DOT[entry.priority]
          )}
        />
        <Badge variant="outline" className="rounded-sm font-mono uppercase">
          <sourceType.icon />
          {sourceType.label}
        </Badge>
        <span className="font-mono text-xs text-muted-foreground">
          {entry.sourceName} · {entry.sourceHandle}
        </span>
        <span className="ml-auto font-mono text-xs text-faint">
          {entry.timestamp}
        </span>
      </div>

      <h3 className="mt-2.5 text-sm font-medium leading-relaxed text-foreground">
        {entry.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {entry.summary}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <CardAction
          icon={Star}
          label="Mark useful"
          active={markedUseful}
          onClick={() => setMarkedUseful((v) => !v)}
        />
        <CardAction icon={ExternalLink} label="View original" />
        <CardAction icon={EyeOff} label="Hide" />
      </div>
    </article>
  )
}
