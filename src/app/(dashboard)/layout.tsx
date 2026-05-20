export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar placeholder — will be replaced with custom Sidebar component */}
      <aside className="w-60 min-w-60 border-r border-[#2A2A2D] bg-[#1A1A1D] flex flex-col p-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
          <span className="text-sm font-semibold tracking-tight">DesignPulse</span>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          <a href="/digest" className="text-sm text-[#A0A0A0] hover:text-[#FAFAFA] hover:bg-[#222225] rounded-md px-3 py-2 transition-colors">
            Digest
          </a>
          <a href="/sources" className="text-sm text-[#A0A0A0] hover:text-[#FAFAFA] hover:bg-[#222225] rounded-md px-3 py-2 transition-colors">
            Sources
          </a>
          <a href="/archive" className="text-sm text-[#A0A0A0] hover:text-[#FAFAFA] hover:bg-[#222225] rounded-md px-3 py-2 transition-colors">
            Archive
          </a>
          <a href="/design-system" className="text-sm text-[#A0A0A0] hover:text-[#FAFAFA] hover:bg-[#222225] rounded-md px-3 py-2 transition-colors">
            Design System
          </a>
        </nav>
        <a href="/settings" className="text-sm text-[#A0A0A0] hover:text-[#FAFAFA] hover:bg-[#222225] rounded-md px-3 py-2 transition-colors border-t border-[#2A2A2D] pt-3 mt-2">
          Settings
        </a>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
