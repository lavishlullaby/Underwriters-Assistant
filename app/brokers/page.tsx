"use client"

import { useState } from "react"
import {
  Phone,
  Mail,
  History,
  ChevronDown,
  ChevronUp,
  FileText,
  Star,
} from "lucide-react"
import { brokers } from "@/lib/data"
import { AiInsightCard } from "@/components/ai-insight-card"
import { cn } from "@/lib/utils"

function scoreColor(score: number) {
  if (score >= 85) return "text-emerald-600 bg-emerald-50"
  if (score >= 70) return "text-amber-600 bg-amber-50"
  return "text-red-600 bg-red-50"
}

export default function BrokerHubPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Broker Hub</h1>
        <p className="text-sm text-muted-foreground">
          Manage broker relationships, preferences, and submission history
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {brokers.map((broker) => {
          const isExpanded = expandedId === broker.id
          return (
            <div
              key={broker.id}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedId(isExpanded ? null : broker.id)
                }
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {broker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {broker.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {broker.firm}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {broker.activeSubmissions} active
                    </span>
                    <span>Last contact: {broker.lastContact}</span>
                  </div>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    scoreColor(broker.relationshipScore)
                  )}
                >
                  <Star className="h-3 w-3" />
                  {broker.relationshipScore}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted"
                    title="Call"
                  >
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted"
                    title="Email"
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted"
                    title="History"
                  >
                    <History className="h-3.5 w-3.5" />
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-border px-5 py-4">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Preferences
                      </h4>
                      <div className="flex flex-col gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Communication
                          </p>
                          <p className="text-sm text-foreground">
                            {broker.preferences.communicationStyle}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            CC List
                          </p>
                          <p className="text-sm text-foreground">
                            {broker.preferences.ccList}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Typical Gaps
                          </p>
                          <p className="text-sm text-foreground">
                            {broker.preferences.typicalGaps}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Submission History
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-lg bg-muted p-3 text-center">
                          <p className="text-lg font-bold text-foreground">
                            {broker.history.totalSubmissions}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Total
                          </p>
                        </div>
                        <div className="rounded-lg bg-muted p-3 text-center">
                          <p className="text-lg font-bold text-foreground">
                            {broker.history.winRate}%
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Win Rate
                          </p>
                        </div>
                        <div className="rounded-lg bg-muted p-3 text-center">
                          <p className="text-lg font-bold text-foreground">
                            {broker.history.avgCycleTime}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Avg Cycle
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <AiInsightCard>{broker.aiNote}</AiInsightCard>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
