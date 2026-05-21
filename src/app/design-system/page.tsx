"use client"

/*
 * Design System — Sift's component catalog and source of truth.
 * Rule: every component below is the real production component, imported from
 * src/components. Never re-stub, copy, or fake a component here. States are
 * reached only through each component's real API. This page is a viewer —
 * read components here, change them in src/components/ui.
 */

import { useEffect, useState, type ReactNode } from "react"
import { ArrowRight, LoaderCircle, Plus, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"

const NAV = [
  {
    group: "Foundations",
    items: [
      { id: "colors", label: "Colors" },
      { id: "typography", label: "Typography" },
      { id: "spacing", label: "Spacing & radius" },
    ],
  },
  {
    group: "Components",
    items: [
      { id: "button", label: "Button" },
      { id: "badge", label: "Badge" },
      { id: "input", label: "Input" },
      { id: "toggle", label: "Toggle" },
      { id: "tabs", label: "Tabs" },
      { id: "separator", label: "Separator" },
    ],
  },
  {
    group: "Patterns",
    items: [{ id: "flows", label: "Flows" }],
  },
]

const SECTION_IDS = NAV.flatMap((g) => g.items.map((i) => i.id))

const colorTokens = [
  { swatch: "bg-background", name: "--background", value: "#0A0A0B", usage: "App background (midnight)" },
  { swatch: "bg-card", name: "--card", value: "#1A1A1D", usage: "Cards, sidebar (slate)" },
  { swatch: "bg-muted", name: "--muted", value: "#222225", usage: "Hover / active surfaces (elevated)" },
  { swatch: "bg-border", name: "--border", value: "#2A2A2D", usage: "1px borders and dividers" },
  { swatch: "bg-foreground", name: "--foreground", value: "#FAFAFA", usage: "Primary text (dawn-white)" },
  { swatch: "bg-muted-foreground", name: "--muted-foreground", value: "#A0A0A0", usage: "Secondary text, metadata" },
  { swatch: "bg-primary", name: "--primary", value: "#5E6AD2", usage: "Accent, links, focus (aliases --signal, Linear indigo)" },
  { swatch: "bg-destructive", name: "--destructive", value: "#EF4444", usage: "Errors, destructive actions" },
  { swatch: "bg-chart-2", name: "--chart-2", value: "#22C55E", usage: "Success, confirmations" },
  { swatch: "bg-chart-3", name: "--chart-3", value: "#F59E0B", usage: "Warning, medium priority" },
]

const typeScale = [
  { sample: "Today's digest", className: "text-2xl font-semibold tracking-tight", meta: "Geist Sans · 24 / 600" },
  { sample: "Knowledge Base", className: "text-lg font-semibold", meta: "Geist Sans · 18 / 600" },
  { sample: "Figma ships AI components", className: "text-base font-medium", meta: "Geist Sans · 16 / 500" },
  { sample: "Summary body text for a digest card.", className: "text-sm", meta: "Geist Sans · 14 / 400" },
  { sample: "UX Unicorn · @uxunicorn · 2h ago", className: "font-mono text-xs", meta: "Geist Mono · 12 / 400" },
]

const spacingScale = [
  { w: "w-1", label: "4" },
  { w: "w-2", label: "8" },
  { w: "w-3", label: "12" },
  { w: "w-4", label: "16" },
  { w: "w-6", label: "24" },
  { w: "w-8", label: "32" },
  { w: "w-12", label: "48" },
]

const radiusScale = [
  { r: "rounded-sm", label: "sm" },
  { r: "rounded-md", label: "md" },
  { r: "rounded-lg", label: "lg" },
  { r: "rounded-xl", label: "xl" },
]

const buttonProps = [
  {
    prop: "variant",
    type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
    def: '"default"',
    desc: "Visual emphasis of the button.",
  },
  {
    prop: "size",
    type: '"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
    def: '"default"',
    desc: "Dimensions. The icon-* sizes are square, for icon-only buttons.",
  },
  {
    prop: "disabled",
    type: "boolean",
    def: "false",
    desc: "Disables interaction; renders at 50% opacity.",
  },
  {
    prop: "render",
    type: "ReactElement",
    def: "—",
    desc: "Render as another element (Base UI) — e.g. an anchor for a link button.",
  },
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "Label text and/or icon elements.",
  },
]

const buttonUsage = [
  "One default (primary) button per view — competing primaries dilute the call to action.",
  "Icon-only buttons must carry an aria-label; the icon alone is not an accessible name (WCAG 4.1.2).",
  "For loading, keep the button disabled while the spinner shows — this also blocks double submits.",
  "Reserve destructive for irreversible actions; routine actions use default or outline.",
]

function Section({
  id,
  title,
  source,
  children,
}: {
  id: string
  title: string
  source?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-10">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {source ? (
        <p className="mt-1 font-mono text-xs text-muted-foreground">{source}</p>
      ) : null}
      <div className="mt-5">{children}</div>
    </section>
  )
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {children}
    </div>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-t border-border px-5 py-4 first:border-t-0 sm:flex-row sm:items-center sm:gap-6">
      <div className="shrink-0 font-mono text-xs text-muted-foreground sm:w-28">
        {label}
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

function SpecRow({
  name,
  note,
  children,
}: {
  name: string
  note?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-border px-5 py-4 first:border-t-0 sm:flex-row sm:items-start sm:gap-6">
      <div className="shrink-0 sm:w-44">
        <p className="font-mono text-xs text-foreground">{name}</p>
        {note ? (
          <p className="mt-1 text-xs text-muted-foreground">{note}</p>
        ) : null}
      </div>
      <div className="flex flex-1 flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 mb-3 text-sm font-medium">{children}</h3>
}

function PropsTable({
  rows,
}: {
  rows: { prop: string; type: string; def: string; desc: string }[]
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="border-b border-border bg-card">
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 font-mono text-[11px] font-medium tracking-wide text-muted-foreground uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.prop} className="border-b border-border last:border-b-0">
              <td className="px-4 py-3 align-top font-mono text-xs text-foreground">
                {r.prop}
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-primary">
                {r.type}
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                {r.def}
              </td>
              <td className="px-4 py-3 align-top text-xs text-muted-foreground">
                {r.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function DesignSystemPage() {
  const [activeId, setActiveId] = useState(SECTION_IDS[0])
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "0px 0px -75% 0px" }
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex">
      <nav className="sticky top-0 hidden h-screen w-60 shrink-0 overflow-y-auto border-r border-border bg-card px-3 py-6 md:block">
        <div className="px-3 pb-6">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary" />
            <span className="text-sm font-semibold tracking-tight">Sift</span>
          </div>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Design System
          </p>
        </div>
        {NAV.map((group) => (
          <div key={group.group} className="mb-5">
            <p className="px-3 pb-1.5 font-mono text-[11px] tracking-wide text-muted-foreground/70 uppercase">
              {group.group}
            </p>
            {group.items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "block rounded-md px-3 py-1.5 text-sm transition-colors",
                  activeId === item.id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        ))}
      </nav>

      <main className="flex-1 px-6 py-10 md:px-12">
        <div className="mx-auto max-w-3xl">
          <header className="mb-12">
            <h1 className="text-2xl font-semibold tracking-tight">
              Design System
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Component catalog and source of truth for Sift&apos;s interface.
              Every entry is the real production component, shown across its
              states.
            </p>
          </header>

          <Section id="colors" title="Colors">
            <div className="grid gap-3 sm:grid-cols-2">
              {colorTokens.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                >
                  <div
                    className={cn(
                      "size-10 shrink-0 rounded-md border border-border",
                      c.swatch
                    )}
                  />
                  <div>
                    <p className="font-mono text-xs text-foreground">{c.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {c.value}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {c.usage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="typography" title="Typography">
            <Panel>
              {typeScale.map((t) => (
                <div
                  key={t.meta}
                  className="flex items-baseline justify-between gap-6 border-t border-border px-5 py-4 first:border-t-0"
                >
                  <span className={t.className}>{t.sample}</span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {t.meta}
                  </span>
                </div>
              ))}
            </Panel>
          </Section>

          <Section id="spacing" title="Spacing & radius">
            <Panel>
              <Row label="Spacing">
                <div className="flex items-end gap-4">
                  {spacingScale.map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-2">
                      <div className={cn("h-8 rounded-sm bg-primary", s.w)} />
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Row>
              <Row label="Radius">
                {radiusScale.map((r) => (
                  <div key={r.label} className="flex flex-col items-center gap-2">
                    <div
                      className={cn("size-12 border border-border bg-muted", r.r)}
                    />
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {r.label}
                    </span>
                  </div>
                ))}
              </Row>
            </Panel>
          </Section>

          <Section id="button" title="Button" source="src/components/ui/button.tsx">
            <p className="mb-6 max-w-prose text-sm text-muted-foreground">
              The primary interactive control — triggers an action or navigation.
              Built on Base UI&apos;s button primitive; variants and sizes are
              driven by the buttonVariants cva.
            </p>

            <h3 className="mb-3 text-sm font-medium">Variants</h3>
            <Panel>
              <SpecRow name="default" note="Primary action — one per view">
                <Button>Add source</Button>
              </SpecRow>
              <SpecRow name="secondary" note="Secondary action, still prominent">
                <Button variant="secondary">Mark all read</Button>
              </SpecRow>
              <SpecRow name="outline" note="Low emphasis, bordered">
                <Button variant="outline">Filter</Button>
              </SpecRow>
              <SpecRow name="ghost" note="Minimal — toolbars, card actions">
                <Button variant="ghost">Hide</Button>
              </SpecRow>
              <SpecRow name="destructive" note="Irreversible or dangerous actions">
                <Button variant="destructive">Delete source</Button>
              </SpecRow>
              <SpecRow name="link" note="Navigational, inline with text">
                <Button variant="link">View original</Button>
              </SpecRow>
            </Panel>

            <SubHeading>Sizes</SubHeading>
            <Panel>
              <SpecRow name="xs / sm / default / lg" note="Text button heights">
                <Button size="xs">Extra small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </SpecRow>
            </Panel>

            <SubHeading>Icon-only</SubHeading>
            <Panel>
              <SpecRow
                name="icon-xs / icon-sm / icon / icon-lg"
                note="Square. Always needs an aria-label."
              >
                <Button size="icon-xs" aria-label="Add source">
                  <Plus />
                </Button>
                <Button size="icon-sm" aria-label="Add source">
                  <Plus />
                </Button>
                <Button size="icon" aria-label="Add source">
                  <Plus />
                </Button>
                <Button size="icon-lg" aria-label="Add source">
                  <Plus />
                </Button>
              </SpecRow>
            </Panel>

            <SubHeading>With icon</SubHeading>
            <Panel>
              <SpecRow
                name="leading"
                note={'Icon child carries data-icon="inline-start"'}
              >
                <Button>
                  <Plus data-icon="inline-start" />
                  New source
                </Button>
                <Button variant="outline">
                  <Search data-icon="inline-start" />
                  Search
                </Button>
              </SpecRow>
              <SpecRow
                name="trailing"
                note={'Icon child carries data-icon="inline-end"'}
              >
                <Button>
                  Continue
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </SpecRow>
            </Panel>

            <SubHeading>States</SubHeading>
            <Panel>
              <SpecRow
                name="default"
                note="Hover, focus-visible and active are reachable by interacting"
              >
                <Button>Default</Button>
              </SpecRow>
              <SpecRow name="disabled" note="disabled prop — non-interactive">
                <Button disabled>Disabled</Button>
              </SpecRow>
              <SpecRow
                name="loading (pattern)"
                note="No built-in prop — compose a spinner with disabled"
              >
                <Button disabled>
                  <LoaderCircle data-icon="inline-start" className="animate-spin" />
                  Saving…
                </Button>
              </SpecRow>
            </Panel>

            <SubHeading>Props</SubHeading>
            <PropsTable rows={buttonProps} />

            <SubHeading>Usage</SubHeading>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {buttonUsage.map((u) => (
                <li key={u} className="flex gap-2.5">
                  <span className="text-muted-foreground/40">—</span>
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="badge" title="Badge" source="src/components/ui/badge.tsx">
            <Panel>
              <Row label="Variants">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="ghost">Ghost</Badge>
              </Row>
              <Row label="Source type">
                <Badge variant="outline">TG</Badge>
                <Badge variant="outline">YT</Badge>
                <Badge variant="outline">Web</Badge>
              </Row>
            </Panel>
          </Section>

          <Section id="input" title="Input" source="src/components/ui/input.tsx">
            <div className="grid max-w-md gap-4">
              <div>
                <p className="mb-1.5 font-mono text-xs text-muted-foreground">
                  Default
                </p>
                <Input placeholder="Search summaries..." />
              </div>
              <div>
                <p className="mb-1.5 font-mono text-xs text-muted-foreground">
                  Disabled
                </p>
                <Input placeholder="Disabled input" disabled />
              </div>
              <div>
                <p className="mb-1.5 font-mono text-xs text-muted-foreground">
                  Error (aria-invalid)
                </p>
                <Input placeholder="Invalid value" aria-invalid />
              </div>
            </div>
          </Section>

          <Section id="toggle" title="Toggle" source="src/components/ui/toggle.tsx">
            <Panel>
              <Row label="Variants">
                <Toggle>Default</Toggle>
                <Toggle variant="outline">Outline</Toggle>
              </Row>
              <Row label="Sizes">
                <Toggle size="sm">Small</Toggle>
                <Toggle size="default">Default</Toggle>
                <Toggle size="lg">Large</Toggle>
              </Row>
              <Row label="States">
                <Toggle>Off</Toggle>
                <Toggle defaultPressed>On</Toggle>
                <Toggle disabled>Disabled</Toggle>
              </Row>
            </Panel>
          </Section>

          <Section id="tabs" title="Tabs" source="src/components/ui/tabs.tsx">
            <div className="space-y-6 rounded-lg border border-border bg-card p-5">
              <div>
                <p className="mb-2 font-mono text-xs text-muted-foreground">
                  Default
                </p>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="sources">Sources</TabsTrigger>
                    <TabsTrigger value="archive">Archive</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="overview"
                    className="pt-2 text-sm text-muted-foreground"
                  >
                    Today&apos;s digest across all channels.
                  </TabsContent>
                  <TabsContent
                    value="sources"
                    className="pt-2 text-sm text-muted-foreground"
                  >
                    Connected Telegram channels.
                  </TabsContent>
                  <TabsContent
                    value="archive"
                    className="pt-2 text-sm text-muted-foreground"
                  >
                    Saved items and recent digests.
                  </TabsContent>
                </Tabs>
              </div>
              <div>
                <p className="mb-2 font-mono text-xs text-muted-foreground">
                  Line
                </p>
                <Tabs defaultValue="kb">
                  <TabsList variant="line">
                    <TabsTrigger value="kb">Knowledge Base</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="kb"
                    className="pt-2 text-sm text-muted-foreground"
                  >
                    Items marked useful.
                  </TabsContent>
                  <TabsContent
                    value="recent"
                    className="pt-2 text-sm text-muted-foreground"
                  >
                    Last two weeks of digests.
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </Section>

          <Section
            id="separator"
            title="Separator"
            source="src/components/ui/separator.tsx"
          >
            <div className="space-y-6 rounded-lg border border-border bg-card p-5">
              <div>
                <p className="mb-2 font-mono text-xs text-muted-foreground">
                  Horizontal
                </p>
                <Separator />
              </div>
              <div>
                <p className="mb-2 font-mono text-xs text-muted-foreground">
                  Vertical
                </p>
                <div className="flex h-8 items-center gap-3 text-sm text-muted-foreground">
                  <span>Digest</span>
                  <Separator orientation="vertical" />
                  <span>Sources</span>
                  <Separator orientation="vertical" />
                  <span>Archive</span>
                </div>
              </div>
            </div>
          </Section>

          <Section id="flows" title="Flows">
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="text-sm font-medium">Disclosure</p>
              <p className="mt-1 mb-4 text-xs text-muted-foreground">
                An interactive open / close flow built from the real Toggle
                component.
              </p>
              <Toggle
                variant="outline"
                pressed={showDetails}
                onPressedChange={setShowDetails}
              >
                {showDetails ? "Hide details" : "Show details"}
              </Toggle>
              {showDetails ? (
                <div className="mt-3 rounded-md border border-border bg-muted p-3 text-sm text-muted-foreground">
                  Panel content revealed by the flow. The modal open / close flow
                  lands here once the Dialog base component is built.
                </div>
              ) : null}
            </div>
          </Section>
        </div>
      </main>
    </div>
  )
}
