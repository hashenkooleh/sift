export default function DigestPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Today&apos;s digest</h1>
          <p className="text-xs font-mono text-[#555555] mt-1">15 May 2026 · 5 channels · 42 new messages</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#3B82F6] bg-[#3B82F620] px-2.5 py-1 rounded-md">~15 min read</span>
        </div>
      </div>

      {/* Placeholder digest card */}
      <div className="bg-[#1A1A1D] border border-[#2A2A2D] rounded-lg p-4 mb-3">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
          <span className="text-[11px] font-mono text-[#A0A0A0]">UX Unicorn · @uxunicorn</span>
          <span className="text-[11px] font-mono text-[#555555] ml-auto">2h ago</span>
        </div>
        <p className="text-sm font-medium mb-2">Figma AI components — new beta feature</p>
        <p className="text-[13px] text-[#A0A0A0] leading-relaxed">
          Placeholder summary text. This will be replaced with real AI-generated Ukrainian summaries from Telegram channels.
        </p>
      </div>

      <p className="text-xs text-[#555555] mt-8 text-center">
        Scaffold ready. Components will be built on the Design System page first.
      </p>
    </div>
  );
}
