"use client"

/*
 * Sidebar — Sift's primary navigation shell.
 * A 240px slate panel with a 1px right hairline. Collapses to a 56px
 * icon-only rail at <=768px. The active item is driven by the current
 * route via usePathname and marked with aria-current, an elevated
 * surface, and a 2px indigo edge bar.
 */

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Archive, Component, LayoutList, Radio, Settings } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Digest", icon: LayoutList },
  { href: "/sources", label: "Sources", icon: Radio },
  { href: "/archive", label: "Archive", icon: Archive },
]

// Meta surfaces — internal/dev tooling and settings, grouped in the footer
// away from the content-triage nav above.
const FOOTER_ITEMS: NavItem[] = [
  { href: "/design-system", label: "Design System", icon: Component },
  { href: "/settings", label: "Settings", icon: Settings },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      aria-label={item.label}
      title={item.label}
      className={cn(
        "relative flex items-center gap-2.5 rounded-md px-4 py-2 text-sm font-medium transition-colors select-none",
        "max-md:justify-center max-md:px-2.5",
        active
          ? "bg-sidebar-accent text-sidebar-foreground before:absolute before:top-1/2 before:left-0 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-r-full before:bg-primary"
          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
      )}
    >
      <Icon
        className={cn(
          "size-4 shrink-0 transition-opacity",
          active ? "opacity-100" : "opacity-60"
        )}
      />
      <span className="max-md:hidden">{item.label}</span>
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-60 min-w-60 flex-col border-r border-sidebar-border bg-sidebar py-4 max-md:w-14 max-md:min-w-14">
      <Link
        href="/"
        aria-label="Sift — go to Digest"
        className="flex items-center gap-2 px-4 pb-5 max-md:justify-center max-md:px-2"
      >
        <span className="size-2 shrink-0 rounded-full bg-primary" />
        <span className="text-sm font-semibold tracking-tight text-sidebar-foreground max-md:hidden">
          Sift
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-0.5 px-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={isActive(pathname, item.href)}
          />
        ))}
      </nav>

      <div className="mt-2 flex flex-col gap-0.5 border-t border-sidebar-border px-2 pt-3">
        {FOOTER_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={isActive(pathname, item.href)}
          />
        ))}
      </div>
    </aside>
  )
}
