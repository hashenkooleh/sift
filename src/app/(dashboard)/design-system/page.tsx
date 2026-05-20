import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const colors = [
  { name: "--midnight", value: "#0A0A0B", usage: "Main background" },
  { name: "--slate", value: "#1A1A1D", usage: "Cards, sidebar, surfaces" },
  { name: "--elevated", value: "#222225", usage: "Hover states, active items" },
  { name: "--border", value: "#2A2A2D", usage: "1px borders, dividers" },
  { name: "--dawn-white", value: "#FAFAFA", usage: "Primary text, headings" },
  { name: "--secondary", value: "#A0A0A0", usage: "Secondary text, metadata" },
  { name: "--muted", value: "#555555", usage: "Disabled, hints, timestamps" },
  { name: "--pulse-blue", value: "#3B82F6", usage: "Accent, links, priority-high" },
  { name: "--success", value: "#22C55E", usage: "Mark useful, confirmations" },
  { name: "--warning", value: "#F59E0B", usage: "Priority-medium, alerts" },
];

const typography = [
  { element: "Page title", font: "Geist Sans", size: "24px", weight: "600", sample: "Today's digest" },
  { element: "Section heading", font: "Geist Sans", size: "18px", weight: "600", sample: "Knowledge Base" },
  { element: "Card title", font: "Geist Sans", size: "16px", weight: "500", sample: "Figma AI components — new beta" },
  { element: "Body text", font: "Geist Sans", size: "14px", weight: "400", sample: "Placeholder summary text for digest cards." },
  { element: "Metadata", font: "Geist Mono", size: "12px", weight: "400", sample: "UX Unicorn · @uxunicorn · 2h ago" },
  { element: "Badge", font: "Geist Sans", size: "11px", weight: "500", sample: "HIGH" },
];

export default function DesignSystemPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold tracking-tight mb-1">Design System</h1>
      <p className="text-sm text-[#A0A0A0] mb-8">
        Living component gallery. Source of truth for all UI elements.
      </p>

      {/* === TOKENS: COLORS === */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Colors</h2>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-3 bg-[#1A1A1D] border border-[#2A2A2D] rounded-lg p-3"
            >
              <div
                className="w-10 h-10 rounded-md border border-[#2A2A2D] flex-shrink-0"
                style={{ backgroundColor: c.value }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{c.name}</div>
                <div className="text-xs font-mono text-[#555555]">{c.value}</div>
              </div>
              <div className="text-xs text-[#A0A0A0] text-right">{c.usage}</div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-12 bg-[#2A2A2D]" />

      {/* === TOKENS: TYPOGRAPHY === */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Typography</h2>
        <div className="space-y-3">
          {typography.map((t) => (
            <div
              key={t.element}
              className="flex items-baseline justify-between bg-[#1A1A1D] border border-[#2A2A2D] rounded-lg p-4"
            >
              <div className="flex-1">
                <span
                  className={t.font === "Geist Mono" ? "font-mono" : "font-sans"}
                  style={{ fontSize: t.size, fontWeight: Number(t.weight) }}
                >
                  {t.sample}
                </span>
              </div>
              <div className="text-right ml-4 flex-shrink-0">
                <div className="text-xs text-[#A0A0A0]">{t.element}</div>
                <div className="text-xs font-mono text-[#555555]">
                  {t.font} · {t.size} · {t.weight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-12 bg-[#2A2A2D]" />

      {/* === TOKENS: SPACING === */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Spacing</h2>
        <p className="text-sm text-[#A0A0A0] mb-4">Base unit: 8px. All spacing is a multiple of 8.</p>
        <div className="flex items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div
                className="bg-[#3B82F6] rounded-sm"
                style={{ width: s, height: s }}
              />
              <span className="text-xs font-mono text-[#555555]">{s}px</span>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-12 bg-[#2A2A2D]" />

      {/* === BASE COMPONENTS === */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Base components</h2>
        <p className="text-sm text-[#A0A0A0] mb-6">ShadCN components with DesignPulse dark theme.</p>

        {/* Buttons */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-[#A0A0A0] uppercase tracking-wider mb-3">Button</h3>
          <div className="flex flex-wrap gap-3 bg-[#1A1A1D] border border-[#2A2A2D] rounded-lg p-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-[#A0A0A0] uppercase tracking-wider mb-3">Badge</h3>
          <div className="flex flex-wrap gap-3 bg-[#1A1A1D] border border-[#2A2A2D] rounded-lg p-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge className="bg-[#3B82F620] text-[#3B82F6] border-0">HIGH</Badge>
            <Badge className="bg-[#F59E0B20] text-[#F59E0B] border-0">MED</Badge>
            <Badge className="bg-[#22222540] text-[#555555] border-0">LOW</Badge>
          </div>
        </div>

        {/* Input */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-[#A0A0A0] uppercase tracking-wider mb-3">Input</h3>
          <div className="flex flex-col gap-3 bg-[#1A1A1D] border border-[#2A2A2D] rounded-lg p-4 max-w-md">
            <Input placeholder="Search summaries..." />
            <Input placeholder="Paste YouTube URL..." className="font-mono text-xs" />
            <Input disabled placeholder="Disabled input" />
          </div>
        </div>
      </section>

      <Separator className="mb-12 bg-[#2A2A2D]" />

      {/* === CUSTOM COMPONENTS (placeholders) === */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Custom components</h2>
        <p className="text-sm text-[#555555]">
          DigestCard, FilterDropdown, PendingItem, SourceRow — will be built here next.
        </p>
      </section>
    </div>
  );
}
