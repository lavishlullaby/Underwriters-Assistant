"use client"

import Link from "next/link"
import { ArrowRight, BarChart3, AlertTriangle, CircleAlert, User, FileText } from "lucide-react"
import { submissions } from "@/lib/data"

/* ── Compute stats from real data ─────────────────────────────────── */

const totalOpen = submissions.length
const needAttention = submissions.filter((s) => s.riskStatus === "yellow").length
const atRisk = submissions.filter((s) => s.riskStatus === "red").length

/* ── Briefing items ───────────────────────────────────────────────── */

interface BriefingItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  text: string
  actionLabel: string
  actionHref: string
}

const briefingItems: BriefingItem[] = [
  {
    id: "b1",
    icon: BarChart3,
    iconColor: "text-blue-500",
    text: `You have ${totalOpen} open cases \u2014 ${needAttention} need attention, ${atRisk} are at risk`,
    actionLabel: "View cases needing attention",
    actionHref: "/submissions",
  },
  {
    id: "b2",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    text: "ABC Corporation quote expires Friday. Loss runs still missing.",
    actionLabel: "Call broker Jane Mitchell",
    actionHref: "/submissions/s1",
  },
  {
    id: "b3",
    icon: CircleAlert,
    iconColor: "text-red-500",
    text: "2 files blocked in Loss Control \u2014 both waiting on insured callbacks. Mike Reynolds is at capacity. Consider reassigning.",
    actionLabel: "View LC queue",
    actionHref: "/queue",
  },
  {
    id: "b4",
    icon: User,
    iconColor: "text-amber-500",
    text: "You haven't connected with Rachel Kim (Brown & Brown) in 14 days. She has 2 active files with you.",
    actionLabel: "Send a check-in",
    actionHref: "/brokers",
  },
  {
    id: "b5",
    icon: FileText,
    iconColor: "text-amber-500",
    text: "Westfield Props needs UW sign-off by Wednesday or binding authority expires.",
    actionLabel: "Escalate to Robert Chen",
    actionHref: "/submissions/s4",
  },
]

/* ── Component ────────────────────────────────────────────────────── */

export function MorningBriefing() {
  return (
    <section className="animate-fade-in-up">
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Good morning, Emily
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {"Here\u2019s your operational summary for today, February 8, 2026"}
          </p>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-[#E5E7EB]" />

        {/* Briefing items */}
        <div className="flex flex-col gap-4">
          {briefingItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.id} className="flex gap-3">
                <Icon className={`mt-0.5 h-[18px] w-[18px] shrink-0 ${item.iconColor}`} />
                <div className="flex-1">
                  <p className="text-[14px] leading-relaxed text-foreground">
                    {item.text}
                  </p>
                  <Link
                    href={item.actionHref}
                    className="group mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    {item.actionLabel}
                    <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
