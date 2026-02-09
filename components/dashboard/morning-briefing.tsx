"use client"

import Link from "next/link"
import { ArrowRight, BarChart3, PartyPopper, CheckCircle2, CalendarDays, User, Wrench, ClipboardList } from "lucide-react"
import { submissions } from "@/lib/data"

/* ── Compute stats from real data ─────────────────────────────────── */

const totalOpen = submissions.length
const onTrack = submissions.filter((s) => s.riskStatus === "green").length
const needsAttention = totalOpen - onTrack

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
    iconColor: "text-primary",
    text: `You have ${totalOpen} open cases \u2014 ${onTrack} are on track, ${needsAttention} could use your attention`,
    actionLabel: "View full pipeline",
    actionHref: "/submissions",
  },
  {
    id: "b2",
    icon: PartyPopper,
    iconColor: "text-emerald-500",
    text: "Coastal Condo is ready to bind! Payment received this morning.",
    actionLabel: "Complete binding",
    actionHref: "/submissions/s10",
  },
  {
    id: "b3",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    text: "Greenleaf Hosp LC survey came back clean \u2014 no deficiencies. File is ready for UW final review.",
    actionLabel: "View file",
    actionHref: "/submissions/s5",
  },
  {
    id: "b4",
    icon: CalendarDays,
    iconColor: "text-primary",
    text: "ABC Corporation quote expires Friday \u2014 maybe a quick check-in with Jane Mitchell?",
    actionLabel: "Draft a friendly nudge",
    actionHref: "/submissions/s3",
  },
  {
    id: "b5",
    icon: User,
    iconColor: "text-primary",
    text: "It\u2019s been a couple weeks since you caught up with Rachel Kim \u2014 she always brings good intel. Worth checking in?",
    actionLabel: "Say hello",
    actionHref: "/brokers",
  },
  {
    id: "b6",
    icon: Wrench,
    iconColor: "text-amber-500",
    text: "Mike Reynolds is juggling a few things and 2 files in Loss Control are waiting callbacks \u2014 should follow up so we are top of mind",
    actionLabel: "View LC queue",
    actionHref: "/queue",
  },
  {
    id: "b7",
    icon: ClipboardList,
    iconColor: "text-primary",
    text: "Westfield Props is almost there \u2014 just needs Robert Chen\u2019s sign-off by Wednesday to lock in the bind.",
    actionLabel: "Send Robert a reminder",
    actionHref: "/submissions/s4",
  },
]

/* ── Component ────────────────────────────────────────────────────── */

export function MorningBriefing() {
  return (
    <section className="animate-fade-in-up">
      <div className="rounded-2xl border border-border bg-card p-7 shadow-warm">
        {/* Header with avatar */}
        <div className="flex items-center gap-4 mb-1">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            ER
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Good morning, Emily
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {"Here\u2019s your operational summary for today, February 8, 2026"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-border" />

        {/* Briefing items */}
        <div className="flex flex-col gap-5">
          {briefingItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.id} className="flex gap-3.5">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Icon className={`h-[18px] w-[18px] ${item.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] leading-relaxed text-foreground">
                    {item.text}
                  </p>
                  <Link
                    href={item.actionHref}
                    className="group mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[13px] font-medium text-primary transition-colors hover:bg-primary/10"
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
