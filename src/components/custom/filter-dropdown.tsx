import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PRIORITY_DOT } from "@/lib/priority"
import type { Source } from "@/lib/types"

export interface FilterDropdownProps {
  /** Chip label, e.g. "Telegram". */
  label: string
  /** Geist Mono count shown on the chip, e.g. the number of channels. */
  count: number
  /** The channels listed inside the popover, one checkbox row each. */
  channels: Source[]
  className?: string
}

/**
 * A source-type filter for the digest filter bar — a chip carrying a label, a
 * Geist Mono count, and a chevron. Clicking the chip opens a Popover of
 * per-channel rows; each row is a full-width clickable label (the row is the
 * hit-area, not the 14px checkbox). The chevron rotates 180° while the popover
 * is open, driven by CSS off the trigger's aria-expanded state.
 *
 * Visual-only (development/decisions.md, Decision 4): the checkboxes toggle
 * their own state but do not filter a feed.
 */
export function FilterDropdown({
  label,
  count,
  channels,
  className,
}: FilterDropdownProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            className={cn(
              "group flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors",
              "hover:border-primary hover:text-foreground",
              "aria-expanded:border-primary aria-expanded:text-foreground",
              "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              className
            )}
          />
        }
      >
        {label}
        <span className="font-mono text-[10px] text-muted-foreground/60">
          {count}
        </span>
        <ChevronDown
          aria-hidden
          className="size-3 text-muted-foreground/40 transition-transform duration-150 group-aria-expanded:rotate-180"
        />
      </PopoverTrigger>

      <PopoverContent className="min-w-[220px] p-1.5">
        {channels.length === 0 ? (
          <p className="px-3 py-2 text-xs text-muted-foreground">
            No {label} channels yet.
          </p>
        ) : (
          channels.map((channel) => (
            <label
              key={channel.id}
              className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted"
            >
              <Checkbox defaultChecked={channel.enabled} />
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  PRIORITY_DOT[channel.priority]
                )}
              />
              {channel.name}
            </label>
          ))
        )}
      </PopoverContent>
    </Popover>
  )
}
