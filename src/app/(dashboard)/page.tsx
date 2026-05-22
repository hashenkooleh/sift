/*
 * Digest screen (/) — the screen Андрій opens every morning to triage the
 * night's industry news. Server component: it renders the fixtures and the
 * static structure. The one interactive cluster (Parse video, the "+" capture
 * menu, the modal wiring) is isolated in DigestHeaderActions, a client island.
 *
 * Light-frontend run: search, the filter bar, and the digest-card actions are
 * visual-only (development/decisions.md, Decisions 4 and 5). They render and
 * toggle their own state but do not filter the feed.
 */

import { Search } from "lucide-react"

import { PageHeader } from "@/components/layout/page-header"
import { Input } from "@/components/ui/input"
import { DigestCard } from "@/components/custom/digest-card"
import { PendingItem } from "@/components/custom/pending-item"
import { FilterDropdown } from "@/components/custom/filter-dropdown"
import { digestEntries, pendingEntries, sources } from "@/lib/mock-data"

import { DigestHeaderActions } from "./digest-header-actions"

const telegramChannels = sources.filter((s) => s.type === "telegram")

export default function DigestPage() {
  return (
    <div>
      <PageHeader
        title="Today's digest"
        meta="14 May 2026 · 5 channels · 42 new messages"
        actions={<DigestHeaderActions />}
      />

      {/* Search — visual-only. */}
      <div className="mb-5 flex items-center gap-2 rounded-lg border border-border bg-card px-3 focus-within:border-ring">
        <Search aria-hidden className="size-3.5 shrink-0 text-faint" />
        <Input
          type="search"
          placeholder="Search summaries…"
          className="h-9 border-0 bg-transparent px-0 focus-visible:border-0 focus-visible:ring-0"
        />
      </div>

      {/* Filter bar — visual-only. */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="rounded-md border border-primary bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
          All
        </span>
        <FilterDropdown
          label="Telegram"
          count={telegramChannels.length}
          channels={telegramChannels}
        />
        <FilterDropdown label="YouTube" count={0} channels={[]} />
        <FilterDropdown label="Web" count={0} channels={[]} />
        <div className="flex-1" />
        <span className="cursor-default rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground">
          Priority
        </span>
      </div>

      {/* Today's highlights — a quiet placeholder slot. The IA names this
       * cross-source summary section; its AI content is Post-MVP, so the slot
       * is held open without faking output (development/decisions.md, Decision 1). */}
      <section className="mb-5">
        <h2 className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Today&apos;s highlights
        </h2>
        <div className="rounded-lg border border-dashed border-border px-4 py-5">
          <p className="text-sm text-muted-foreground">
            A cross-source summary of what mattered most today.
          </p>
          <p className="mt-1 font-mono text-xs text-faint">
            Arrives with the AI summary layer.
          </p>
        </div>
      </section>

      {/* Processing — items the agent is still distilling. */}
      <section className="mb-5 rounded-lg border border-border bg-card p-4">
        <h2 className="mb-2.5 flex items-center gap-1.5 text-xs font-medium text-chart-3">
          Processing
          <span className="font-mono text-faint">
            {pendingEntries.length} items
          </span>
        </h2>
        <div className="flex flex-col divide-y divide-border">
          {pendingEntries.map((entry) => (
            <div key={entry.id} className="py-2 first:pt-0 last:pb-0">
              <PendingItem entry={entry} />
            </div>
          ))}
        </div>
      </section>

      {/* Digest feed — single-column, already ranked high → medium → low. */}
      <section className="flex flex-col gap-3">
        {digestEntries.map((entry) => (
          <DigestCard key={entry.id} entry={entry} />
        ))}
      </section>
    </div>
  )
}
