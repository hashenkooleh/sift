export default function DigestPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Today&apos;s digest</h1>
          <p className="text-xs font-mono text-faint mt-1">15 May 2026 · 5 channels · 42 new messages</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-primary bg-primary/15 px-2.5 py-1 rounded-md">~15 min read</span>
        </div>
      </div>

      {/* Placeholder digest card */}
      <div className="bg-card border border-border rounded-lg p-4 mb-3">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-[11px] font-mono text-muted-foreground">UX Unicorn · @uxunicorn</span>
          <span className="text-[11px] font-mono text-faint ml-auto">2h ago</span>
        </div>
        <p className="text-sm font-medium mb-2">Figma AI components — new beta feature</p>
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          Placeholder summary text. This will be replaced with real AI-generated Ukrainian summaries from Telegram channels.
        </p>
      </div>

      <p className="text-xs text-faint mt-8 text-center">
        Scaffold ready. Components will be built on the Design System page first.
      </p>
    </div>
  );
}
