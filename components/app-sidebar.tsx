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
  LogOut,
  Settings,
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
    <aside
      className="flex h-screen w-60 shrink-0 flex-col"
      style={{
        background: "linear-gradient(180deg, #1e3a5f 0%, #0f172a 100%)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
          <Shield className="h-4 w-4 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white leading-tight">
            UWA Agent
          </span>
          <span className="text-[11px] text-slate-400 leading-tight">
            Underwriting Assistant
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-3">
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
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "border-l-[3px] border-indigo-400 bg-white/10 text-white"
                  : "border-l-[3px] border-transparent text-slate-400 hover:bg-white/[0.06] hover:text-slate-200"
              )}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5",
                  isActive ? "text-indigo-300" : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User profile */}
      <div className="border-t border-white/10 px-4 py-3">
        <div className="group flex items-center gap-3 rounded-lg px-1 py-1 transition-colors hover:bg-white/[0.06]">
          <div className="relative">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold text-white">
              ER
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0f172a] bg-emerald-400" />
          </div>
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-medium text-slate-200 leading-tight">
              Emily Rodriguez
            </span>
            <span className="text-[11px] text-slate-500 leading-tight">
              Underwriting Assistant
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
