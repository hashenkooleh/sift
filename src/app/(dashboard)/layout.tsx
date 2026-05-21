export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar placeholder — will be replaced with custom Sidebar component */}
      <aside className="w-60 min-w-60 border-r border-sidebar-border bg-sidebar flex flex-col p-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-sm font-semibold tracking-tight">Sift</span>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          <a href="/digest" className="text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-md px-3 py-2 transition-colors">
            Digest
          </a>
          <a href="/sources" className="text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-md px-3 py-2 transition-colors">
            Sources
          </a>
          <a href="/archive" className="text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-md px-3 py-2 transition-colors">
            Archive
          </a>
          <a href="/design-system" className="text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-md px-3 py-2 transition-colors">
            Design System
          </a>
        </nav>
        <a href="/settings" className="text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-md px-3 py-2 transition-colors border-t border-sidebar-border pt-3 mt-2">
          Settings
        </a>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
