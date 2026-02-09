"use client"

import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import { submissions, type SubmissionStage } from "@/lib/data"
import { StatusBadge } from "@/components/status-badge"
import { cn } from "@/lib/utils"

const stageConfig: Record<
  SubmissionStage,
  { label: string; color: string }
> = {
  intake: { label: "Intake", color: "bg-slate-400" },
  "uw-review": { label: "UW Review", color: "bg-blue-500" },
  quote: { label: "Quote", color: "bg-amber-500" },
  bind: { label: "Bind", color: "bg-emerald-500" },
}

const stages: SubmissionStage[] = ["intake", "uw-review", "quote", "bind"]

export function KanbanPipeline() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Active Submissions
          </h2>
          <p className="text-xs text-muted-foreground">
            Pipeline view of all current submissions
          </p>
        </div>
        <Link
          href="/submissions"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stages.map((stage) => {
          const config = stageConfig[stage]
          const stageSubmissions = submissions.filter(
            (s) => s.stage === stage
          )
          return (
            <div key={stage} className="flex flex-col">
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={cn("h-2 w-2 rounded-full", config.color)}
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {config.label}
                </span>
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {stageSubmissions.length}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {stageSubmissions.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                    No submissions
                  </div>
                ) : (
                  stageSubmissions.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/submissions/${sub.id}`}
                      className="group rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-md"
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary">
                          {sub.account}
                        </h4>
                        <StatusBadge status={sub.riskStatus} />
                      </div>
                      <p className="mb-2 text-xs text-muted-foreground">
                        {sub.broker} &middot; {sub.brokerFirm}
                      </p>
                      <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{sub.daysInStage}d in stage</span>
                      </div>
                      <p className="text-xs font-medium text-foreground">
                        {sub.nextAction}
                      </p>
                      {sub.riskFlags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {sub.riskFlags.map((flag) => (
                            <span
                              key={flag}
                              className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-medium text-red-600"
                            >
                              {flag}
                            </span>
                          ))}
                        </div>
                      )}
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
