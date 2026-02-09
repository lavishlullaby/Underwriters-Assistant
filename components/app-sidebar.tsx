"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  ListChecks,
  Users,
  UserCog,
  Sparkles,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "My Submissions", href: "/submissions", icon: FileText },
  { label: "Queue Monitor", href: "/queue", icon: ListChecks },
  { label: "Broker Hub", href: "/brokers", icon: Users },
  { label: "UW Preferences", href: "/uw-preferences", icon: UserCog },
  { label: "AI Insights", href: "/ai-insights", icon: Sparkles },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-card">
      <div className="flex items-center gap-2 border-b border-sidebar-border px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Shield className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground leading-tight">
            UWA Agent
          </span>
          <span className="text-xs text-muted-foreground leading-tight">
            Underwriting Assistant
          </span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            ER
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground leading-tight">
              Emily Rodriguez
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              Underwriting Assistant
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
