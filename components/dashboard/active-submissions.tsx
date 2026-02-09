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
  { label: string; dotColor: string; tint: string; tintBorder: string }
> = {
  intake: {
    label: "Intake",
    dotColor: "bg-[#78716C]",
    tint: "bg-stone-50",
    tintBorder: "border-stone-200",
  },
  "uw-review": {
    label: "UW Review",
    dotColor: "bg-primary",
    tint: "bg-indigo-50/60",
    tintBorder: "border-indigo-200/60",
  },
  quote: {
    label: "Quote",
    dotColor: "bg-amber-500",
    tint: "bg-amber-50/60",
    tintBorder: "border-amber-200/60",
  },
  bind: {
    label: "Bind",
    dotColor: "bg-emerald-500",
    tint: "bg-emerald-50/60",
    tintBorder: "border-emerald-200/60",
  },
}

/* ── Badge styles ────────────────────────────────────────────────── */

const badgeStyles: Record<
  RiskStatus,
  { bg: string; text: string; dot: string; label: string }
> = {
  green: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    label: "On Track",
  },
  yellow: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    label: "Attention",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
    label: "At Risk",
  },
}

/* ── Broker colors ───────────────────────────────────────────────── */

const brokerColors: Record<string, string> = {
  "Tom Bradley": "bg-primary",
  "Sarah Kim": "bg-amber-500",
  "Jane Mitchell": "bg-violet-500",
  "David Park": "bg-emerald-500",
  "Rachel Kim": "bg-pink-500",
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
  if (days >= 8) return "text-red-500"
  if (days >= 4) return "text-amber-600"
  return "text-muted-foreground"
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
          className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
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
                  "flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 shadow-card-sm transition-all hover:shadow-warm",
                  isOpen && "rounded-b-none border-b-0"
                )}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-full",
                    cfg.dotColor
                  )}
                />
                <span className="text-sm font-semibold text-foreground">
                  {cfg.label}
                </span>
                <span className="ml-auto flex items-center gap-2">
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                    {items.length}
                  </span>
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
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
                  <div
                    className={cn(
                      "flex flex-col gap-3 rounded-b-2xl border border-t-0 border-border p-3",
                      cfg.tint
                    )}
                  >
                    {items.map((sub) => {
                      const badge = badgeStyles[sub.riskStatus]
                      return (
                        <Link
                          key={sub.id}
                          href={`/submissions/${sub.id}`}
                          className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-3.5 shadow-card-sm transition-all hover:shadow-warm"
                        >
                          {/* Title + badge */}
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-[13px] font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                              {sub.account}
                            </h4>
                            <span
                              className={cn(
                                "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase whitespace-nowrap",
                                badge.bg,
                                badge.text
                              )}
                            >
                              <span
                                className={cn(
                                  "h-1.5 w-1.5 rounded-full",
                                  badge.dot
                                )}
                              />
                              {badge.label}
                            </span>
                          </div>

                          {/* Broker + time */}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold text-white",
                                brokerColors[sub.broker] ?? "bg-stone-500"
                              )}
                            >
                              {initials(sub.broker)}
                            </div>
                            <span className="truncate">{sub.broker}</span>
                            <span className="text-border">|</span>
                            <Clock className="h-3.5 w-3.5 shrink-0" />
                            <span className={timeColor(sub.daysInStage)}>
                              {sub.daysInStage}d
                            </span>
                          </div>

                          {/* Next action */}
                          <p className="text-xs leading-snug text-muted-foreground line-clamp-2">
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
