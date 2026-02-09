"use client"

import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import { submissions, type SubmissionStage, type RiskStatus } from "@/lib/data"
import { StatusBadge } from "@/components/status-badge"
import { cn } from "@/lib/utils"

/* ── Stage configuration ─────────────────────────────────────────── */

const stageConfig: Record<
  SubmissionStage,
  {
    label: string
    dotColor: string
    headerBar: string
    progressFill: string
    progressPct: number
  }
> = {
  intake: {
    label: "Intake",
    dotColor: "bg-[#6B7280]",
    headerBar: "bg-[#6B7280]",
    progressFill: "bg-[#6B7280]",
    progressPct: 25,
  },
  "uw-review": {
    label: "UW Review",
    dotColor: "bg-[#3B82F6]",
    headerBar: "bg-[#3B82F6]",
    progressFill: "bg-[#3B82F6]",
    progressPct: 50,
  },
  quote: {
    label: "Quote",
    dotColor: "bg-[#F59E0B]",
    headerBar: "bg-[#F59E0B]",
    progressFill: "bg-[#F59E0B]",
    progressPct: 75,
  },
  bind: {
    label: "Bind",
    dotColor: "bg-[#22C55E]",
    headerBar: "bg-[#22C55E]",
    progressFill: "bg-[#22C55E]",
    progressPct: 100,
  },
}

/* ── Left-border color keyed by risk status ──────────────────────── */

const borderByRisk: Record<RiskStatus, string> = {
  green: "border-l-[#22C55E]",
  yellow: "border-l-[#F59E0B]",
  red: "border-l-[#EF4444]",
}

/* ── Broker helpers ──────────────────────────────────────────────── */

const brokerColors: Record<string, string> = {
  "Tom Bradley": "bg-[#3B82F6]",
  "Sarah Kim": "bg-[#F59E0B]",
  "Jane Mitchell": "bg-[#8B5CF6]",
  "David Park": "bg-[#10B981]",
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

/* ── Time color coding ───────────────────────────────────────────── */

function timeColor(days: number) {
  if (days >= 8) return "text-[#DC2626]"
  if (days >= 4) return "text-[#D97706]"
  return "text-[#64748B]"
}

/* ── Tag classification ──────────────────────────────────────────── */

function tagClasses(flag: string) {
  const lower = flag.toLowerCase()
  if (
    lower.includes("missing") ||
    lower.includes("expir") ||
    lower.includes("delayed")
  )
    return "bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]"
  if (lower.includes("binding") || lower.includes("authority"))
    return "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]"
  return "bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]"
}

const stages: SubmissionStage[] = ["intake", "uw-review", "quote", "bind"]

/* ── Component ───────────────────────────────────────────────────── */

export function KanbanPipeline() {
  return (
    <section className="animate-fade-in-up stagger-3">
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

      {/* Board */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stages.map((stage, colIdx) => {
          const cfg = stageConfig[stage]
          const items = submissions.filter((s) => s.stage === stage)

          return (
            <div
              key={stage}
              className={cn(
                "flex flex-col rounded-xl bg-[#F8FAFC] p-3 animate-fade-in-up",
                `stagger-${colIdx + 1}`
              )}
            >
              {/* Column header */}
              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <span className={cn("h-2.5 w-2.5 rounded-full", cfg.dotColor)} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {cfg.label}
                  </span>
                  <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-muted-foreground shadow-sm">
                    {items.length}
                  </span>
                </div>
                <div className="mt-1.5 h-[2px] w-full rounded-full bg-slate-200">
                  <div
                    className={cn("h-full rounded-full", cfg.headerBar)}
                    style={{ width: `${cfg.progressPct}%` }}
                  />
                </div>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-3">
                {items.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-white p-8 text-center">
                    <p className="text-xs text-muted-foreground">No submissions</p>
                  </div>
                ) : (
                  items.map((sub, cardIdx) => (
                    <Link
                      key={sub.id}
                      href={`/submissions/${sub.id}`}
                      className={cn(
                        "group relative flex min-h-[180px] max-h-[200px] flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md",
                        "border-l-4",
                        borderByRisk[sub.riskStatus],
                        `stagger-${cardIdx + 1} animate-fade-in-up`
                      )}
                    >
                      <div className="flex flex-1 flex-col gap-2 p-4">
                        {/* Row 1: Title + Badge (min 48px) */}
                        <div className="flex min-h-[48px] items-start justify-between gap-2">
                          <h4 className="max-w-[65%] text-[15px] font-semibold leading-[1.3] text-foreground transition-colors group-hover:text-primary">
                            {sub.account}
                          </h4>
                          <StatusBadge status={sub.riskStatus} />
                        </div>

                        {/* Row 2: Broker (28px) */}
                        <div className="flex h-7 items-center gap-2">
                          <div
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white",
                              brokerColors[sub.broker] ?? "bg-slate-500"
                            )}
                          >
                            {initials(sub.broker)}
                          </div>
                          <span className="truncate text-[13px] text-[#374151]">
                            {sub.broker}
                          </span>
                        </div>

                        {/* Row 3: Time (24px) */}
                        <div className="flex h-6 items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-[#9CA3AF]" />
                          <span className={cn("text-[13px]", timeColor(sub.daysInStage))}>
                            {sub.daysInStage}d in stage
                          </span>
                        </div>

                        {/* Row 4: Next action (flex-1, 2 lines max) */}
                        <p className="flex-1 text-[13px] leading-[1.4] text-[#374151] line-clamp-2">
                          {sub.nextAction}
                        </p>

                        {/* Row 5: Tags (reserved min-h 28px) */}
                        <div className="mt-auto flex min-h-[28px] flex-wrap items-center gap-1.5">
                          {sub.riskFlags.slice(0, 2).map((flag) => (
                            <span
                              key={flag}
                              className={cn(
                                "inline-flex items-center rounded px-2 py-[2px] text-[11px] font-medium whitespace-nowrap",
                                tagClasses(flag)
                              )}
                            >
                              {flag}
                            </span>
                          ))}
                          {sub.riskFlags.length > 2 && (
                            <span className="text-[11px] font-medium text-muted-foreground">
                              +{sub.riskFlags.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Progress bar at bottom (3px) */}
                      <div className="h-[3px] w-full bg-[#E2E8F0]">
                        <div
                          className={cn("h-full transition-all", cfg.progressFill)}
                          style={{
                            width: `${Math.min(100, (sub.daysInStage / 10) * 100)}%`,
                            borderRadius: "0 0 0 8px",
                          }}
                        />
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
