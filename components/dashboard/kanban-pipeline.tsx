"use client"

import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import { submissions, type SubmissionStage } from "@/lib/data"
import { StatusBadge } from "@/components/status-badge"
import { cn } from "@/lib/utils"

const stageConfig: Record<
  SubmissionStage,
  { label: string; dotColor: string; borderColor: string; barColor: string; progress: number }
> = {
  intake: {
    label: "Intake",
    dotColor: "bg-slate-400",
    borderColor: "border-l-slate-400",
    barColor: "bg-slate-400",
    progress: 25,
  },
  "uw-review": {
    label: "UW Review",
    dotColor: "bg-blue-500",
    borderColor: "border-l-blue-500",
    barColor: "bg-blue-500",
    progress: 50,
  },
  quote: {
    label: "Quote",
    dotColor: "bg-amber-500",
    borderColor: "border-l-amber-500",
    barColor: "bg-amber-500",
    progress: 75,
  },
  bind: {
    label: "Bind",
    dotColor: "bg-emerald-500",
    borderColor: "border-l-emerald-500",
    barColor: "bg-emerald-500",
    progress: 100,
  },
}

const stages: SubmissionStage[] = ["intake", "uw-review", "quote", "bind"]

function brokerInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function brokerColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const colors = [
    "bg-indigo-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-violet-500",
    "bg-orange-500",
    "bg-teal-500",
  ]
  return colors[Math.abs(hash) % colors.length]
}

export function KanbanPipeline() {
  return (
    <section className="animate-fade-in-up stagger-3">
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stages.map((stage, colIdx) => {
          const config = stageConfig[stage]
          const stageSubmissions = submissions.filter(
            (s) => s.stage === stage
          )
          return (
            <div key={stage} className={cn("flex flex-col animate-fade-in-up", `stagger-${colIdx + 1}`)}>
              {/* Column header */}
              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={cn("h-2.5 w-2.5 rounded-full", config.dotColor)}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {config.label}
                  </span>
                  <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {stageSubmissions.length}
                  </span>
                </div>
                <div className="mt-1.5 h-[2px] w-full rounded-full bg-slate-100">
                  <div
                    className={cn("h-full rounded-full", config.barColor)}
                    style={{ width: `${config.progress}%` }}
                  />
                </div>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2.5">
                {stageSubmissions.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border p-8 text-center">
                    <p className="text-xs text-muted-foreground">
                      No submissions in this stage
                    </p>
                  </div>
                ) : (
                  stageSubmissions.map((sub, cardIdx) => (
                    <Link
                      key={sub.id}
                      href={`/submissions/${sub.id}`}
                      className={cn(
                        "card-hover group rounded-xl border border-border bg-card shadow-card-sm",
                        "border-l-4",
                        config.borderColor,
                        `stagger-${cardIdx + 1} animate-fade-in-up`
                      )}
                    >
                      <div className="p-3.5">
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <h4 className="text-[15px] font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                            {sub.account}
                          </h4>
                          <StatusBadge status={sub.riskStatus} />
                        </div>

                        {/* Broker row */}
                        <div className="mb-2.5 flex items-center gap-2">
                          <div
                            className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold text-white",
                              brokerColor(sub.broker)
                            )}
                          >
                            {brokerInitials(sub.broker)}
                          </div>
                          <span className="text-[13px] text-muted-foreground">
                            {sub.broker}
                          </span>
                        </div>

                        <div className="mb-2 flex items-center gap-1 text-[13px] text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{sub.daysInStage}d in stage</span>
                        </div>

                        <p className="text-[13px] font-medium text-foreground">
                          {sub.nextAction}
                        </p>

                        {/* Risk flags */}
                        {sub.riskFlags.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap gap-1">
                            {sub.riskFlags.map((flag) => {
                              const isRed =
                                flag.toLowerCase().includes("missing") ||
                                flag.toLowerCase().includes("expir")
                              return (
                                <span
                                  key={flag}
                                  className={cn(
                                    "rounded-full px-2 py-0.5 text-[10px] font-medium",
                                    isRed
                                      ? "bg-red-50 text-red-600"
                                      : "bg-amber-50 text-amber-700"
                                  )}
                                >
                                  {flag}
                                </span>
                              )
                            })}
                          </div>
                        )}
                      </div>

                      {/* Progress bar at bottom */}
                      <div className="h-[3px] w-full overflow-hidden rounded-b-xl bg-slate-100">
                        <div
                          className={cn("h-full rounded-r-full transition-all", config.barColor)}
                          style={{
                            width: `${Math.min(100, (sub.daysInStage / 10) * 100)}%`,
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
