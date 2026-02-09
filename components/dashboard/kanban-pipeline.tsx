"use client"

import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import { submissions, type SubmissionStage, type RiskStatus } from "@/lib/data"
import { cn } from "@/lib/utils"

/* ── Stage config ────────────────────────────────────────────────── */

const stageConfig: Record<
  SubmissionStage,
  { label: string; dotColor: string; headerBar: string; progressFill: string }
> = {
  intake: {
    label: "Intake",
    dotColor: "bg-[#6B7280]",
    headerBar: "bg-[#6B7280]",
    progressFill: "bg-[#6B7280]",
  },
  "uw-review": {
    label: "UW Review",
    dotColor: "bg-[#3B82F6]",
    headerBar: "bg-[#3B82F6]",
    progressFill: "bg-[#3B82F6]",
  },
  quote: {
    label: "Quote",
    dotColor: "bg-[#F59E0B]",
    headerBar: "bg-[#F59E0B]",
    progressFill: "bg-[#F59E0B]",
  },
  bind: {
    label: "Bind",
    dotColor: "bg-[#22C55E]",
    headerBar: "bg-[#22C55E]",
    progressFill: "bg-[#22C55E]",
  },
}

/* ── Left border color by risk status ────────────────────────────── */

const borderByRisk: Record<RiskStatus, string> = {
  green: "border-l-[#22C55E]",
  yellow: "border-l-[#F59E0B]",
  red: "border-l-[#EF4444]",
}

/* ── Status badge styles ─────────────────────────────────────────── */

const badgeStyles: Record<RiskStatus, { bg: string; text: string; dot: string; label: string }> = {
  green: { bg: "bg-[#DCFCE7]", text: "text-[#166534]", dot: "bg-[#22C55E]", label: "On Track" },
  yellow: { bg: "bg-[#FEF3C7]", text: "text-[#92400E]", dot: "bg-[#F59E0B]", label: "Attention" },
  red: { bg: "bg-[#FEE2E2]", text: "text-[#991B1B]", dot: "bg-[#EF4444]", label: "At Risk" },
}

/* ── Broker avatar colors ────────────────────────────────────────── */

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
    lower.includes("delayed") ||
    lower.includes("loss")
  )
    return "bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]"
  if (lower.includes("binding") || lower.includes("authority"))
    return "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]"
  return "bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]"
}

/** Shorten long tags so two fit on one row */
function shortenTag(flag: string) {
  if (flag.length > 20) {
    return flag.replace("expiring", "exp").replace("Friday", "Fri")
  }
  return flag
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

      {/* Board — 4 equal columns, 16px gap */}
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
                <div className={cn("mt-1.5 h-[2px] w-full rounded-full", cfg.headerBar)} />
              </div>

              {/* Cards — 12px gap between cards */}
              <div className="flex flex-col gap-3">
                {items.length === 0 ? (
                  <div className="flex h-[220px] items-center justify-center rounded-xl border border-dashed border-border bg-white">
                    <p className="text-xs text-muted-foreground">No submissions</p>
                  </div>
                ) : (
                  items.map((sub, cardIdx) => {
                    const badge = badgeStyles[sub.riskStatus]
                    return (
                      <Link
                        key={sub.id}
                        href={`/submissions/${sub.id}`}
                        className={cn(
                          "group relative flex h-[220px] flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md",
                          "border-l-4",
                          borderByRisk[sub.riskStatus],
                          `stagger-${cardIdx + 1} animate-fade-in-up`
                        )}
                      >
                        {/* Card body */}
                        <div className="flex flex-1 flex-col gap-2 p-4">
                          {/* Row 1 — Title + Badge (52px) */}
                          <div className="flex h-[52px] shrink-0 items-start justify-between gap-2">
                            <h4 className="max-w-[60%] text-[15px] font-semibold leading-[1.3] text-foreground transition-colors group-hover:text-primary">
                              {sub.account}
                            </h4>
                            <span
                              className={cn(
                                "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase whitespace-nowrap",
                                badge.bg,
                                badge.text
                              )}
                            >
                              <span className={cn("h-1.5 w-1.5 rounded-full", badge.dot)} />
                              {badge.label}
                            </span>
                          </div>

                          {/* Row 2 — Broker (32px) */}
                          <div className="flex h-8 shrink-0 items-center gap-2">
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

                          {/* Row 3 — Time (28px) */}
                          <div className="flex h-7 shrink-0 items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 shrink-0 text-[#9CA3AF]" />
                            <span className={cn("text-[13px]", timeColor(sub.daysInStage))}>
                              {sub.daysInStage}d in stage
                            </span>
                          </div>

                          {/* Row 4 — Next action (flex-1, 2 lines max) */}
                          <p className="flex-1 text-[13px] leading-[1.4] text-[#374151] line-clamp-2">
                            {sub.nextAction}
                          </p>

                          {/* Row 5 — Tags (36px reserved, pushed to bottom) */}
                          <div className="flex h-9 shrink-0 flex-wrap items-center gap-1.5">
                            {sub.riskFlags.slice(0, 2).map((flag) => (
                              <span
                                key={flag}
                                className={cn(
                                  "inline-flex max-w-[140px] items-center truncate rounded px-2 py-[2px] text-[11px] font-medium whitespace-nowrap",
                                  tagClasses(flag)
                                )}
                              >
                                {shortenTag(flag)}
                              </span>
                            ))}
                            {sub.riskFlags.length > 2 && (
                              <span className="text-[11px] font-medium text-muted-foreground">
                                +{sub.riskFlags.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Progress bar — 3px at very bottom */}
                        <div className="h-[3px] w-full shrink-0 bg-[#E2E8F0]">
                          <div
                            className={cn("h-full rounded-bl-xl", cfg.progressFill)}
                            style={{
                              width: `${Math.min(100, (sub.daysInStage / 7) * 100)}%`,
                            }}
                          />
                        </div>
                      </Link>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
