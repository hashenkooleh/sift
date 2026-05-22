/*
 * PageHeader — the title block at the top of every dashboard screen.
 * Renders a Geist Sans heading, an optional Geist Mono meta line, and a
 * right-aligned actions slot.
 */

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  meta?: ReactNode
  actions?: ReactNode
  className?: string
}

export function PageHeader({ title, meta, actions, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-wrap items-center justify-between gap-4",
        className
      )}
    >
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {meta ? (
          <p className="mt-1 font-mono text-xs text-faint">{meta}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  )
}
