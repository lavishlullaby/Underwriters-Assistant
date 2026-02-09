"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, ChevronDown, ArrowRight, Clock } from "lucide-react"
import { submissions, type SubmissionStage, type RiskStatus } from "@/lib/data"
import { cn } from "@/lib/utils"

/* ── Stage config ────────────────────────────────────────────────── */

const stageOrder: SubmissionStage[] = ["intake", "uw-review", "quote", "bind"]

const stageConfig: Record<
  SubmissionStage,
  { label: string; dotColor: string }
> = {
  intake: { label: "Intake", dotColor: "bg-[#6B7280]" },
  "uw-review": { label: "UW Review", dotColor: "bg-[#3B82F6]" },
  quote: { label: "Quote", dotColor: "bg-[#F59E0B]" },
  bind: { label: "Bind", dotColor: "bg-[#22C55E]" },
}

/* ── Badge styles ────────────────────────────────────────────────── */

const badgeStyles: Record<RiskStatus, { bg: string; text: string; dot: string; label: string }> = {
  green: { bg: "bg-[#DCFCE7]", text: "text-[#166534]", dot: "bg-[#22C55E]", label: "On Track" },
  yellow: { bg: "bg-[#FEF3C7]", text: "text-[#92400E]", dot: "bg-[#F59E0B]", label: "Attention" },
  red: { bg: "bg-[#FEE2E2]", text: "text-[#991B1B]", dot: "bg-[#EF4444]", label: "At Risk" },
}

/* ── Broker colors ───────────────────────────────────────────────── */

const brokerColors: Record<string, string> = {
  "Tom Bradley": "bg-[#3B82F6]",
  "Sarah Kim": "bg-[#F59E0B]",
  "Jane Mitchell": "bg-[#8B5CF6]",
  "David Park": "bg-[#10B981]",
  "Rachel Kim": "bg-[#EC4899]",
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function timeColor(days: number) {
  if (days >= 8) return "text-[#DC2626]"
  if (days >= 4) return "text-[#D97706]"
  return "text-[#64748B]"
}

/* ── Component ───────────────────────────────────────────────────── */

export function ActiveSubmissions() {
  const [expanded, setExpanded] = useState<SubmissionStage | null>(null)

  function toggle(stage: SubmissionStage) {
    setExpanded((prev) => (prev === stage ? null : stage))
  }

  return (
    <section className="animate-fade-in-up stagger-2">
      {/* Section header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.05em] text-muted-foreground">
          Active Submissions
        </h2>
        <Link
          href="/submissions"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Accordion columns */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stageOrder.map((stage) => {
          const cfg = stageConfig[stage]
          const items = submissions.filter((s) => s.stage === stage)
          const isOpen = expanded === stage

          return (
            <div key={stage} className="flex flex-col">
              {/* Header bar */}
              <button
                onClick={() => toggle(stage)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 shadow-sm transition-colors hover:bg-[#F8FAFC]",
                  isOpen && "rounded-b-none border-b-0"
                )}
              >
                <span className={cn("h-2 w-2 shrink-0 rounded-full", cfg.dotColor)} />
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {cfg.label}
                </span>
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                    {items.length}
                  </span>
                  {isOpen ? (
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </span>
              </button>

              {/* Expanded cards */}
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-2.5 rounded-b-lg border border-t-0 border-[#E5E7EB] bg-[#F8FAFC] p-2.5">
                    {items.map((sub) => {
                      const badge = badgeStyles[sub.riskStatus]
                      return (
                        <Link
                          key={sub.id}
                          href={`/submissions/${sub.id}`}
                          className="group flex flex-col gap-1.5 rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
                        >
                          {/* Title + badge */}
                          <div className="flex items-start justify-between gap-1.5">
                            <h4 className="text-[13px] font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                              {sub.account}
                            </h4>
                            <span
                              className={cn(
                                "inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase whitespace-nowrap",
                                badge.bg,
                                badge.text
                              )}
                            >
                              <span className={cn("h-1 w-1 rounded-full", badge.dot)} />
                              {badge.label}
                            </span>
                          </div>

                          {/* Broker + time */}
                          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                            <div
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-semibold text-white",
                                brokerColors[sub.broker] ?? "bg-slate-500"
                              )}
                            >
                              {initials(sub.broker)}
                            </div>
                            <span className="truncate">{sub.broker}</span>
                            <span className="text-[#D1D5DB]">|</span>
                            <Clock className="h-3 w-3 shrink-0" />
                            <span className={timeColor(sub.daysInStage)}>
                              {sub.daysInStage}d
                            </span>
                          </div>

                          {/* Next action */}
                          <p className="text-[12px] leading-snug text-[#374151] line-clamp-2">
                            {sub.nextAction}
                          </p>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
