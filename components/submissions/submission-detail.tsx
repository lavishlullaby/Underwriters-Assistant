"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  User,
  Building2,
  FileText,
  Database,
  Activity,
  Sparkles,
  CheckCircle2,
  Circle,
  XCircle,
  Loader2,
  AlertTriangle,
  Mail,
  ArrowUpRight,
  CheckCheck,
} from "lucide-react"
import type { Submission } from "@/lib/data"
import { StatusBadge } from "@/components/status-badge"
import { AiInsightCard } from "@/components/ai-insight-card"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "overview", label: "Overview", icon: FileText },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "data-orders", label: "Data Orders", icon: Database },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "ai-summary", label: "AI Summary", icon: Sparkles },
] as const

type TabId = (typeof tabs)[number]["id"]

const docStatusIcon = {
  complete: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  pending: <Loader2 className="h-4 w-4 text-amber-500" />,
  missing: <XCircle className="h-4 w-4 text-red-500" />,
}

const docStatusLabel = {
  complete: "Complete",
  pending: "Pending",
  missing: "Missing",
}

const dataOrderStatusConfig = {
  complete: { icon: CheckCircle2, color: "text-emerald-500", label: "Complete" },
  "in-progress": { icon: Loader2, color: "text-blue-500", label: "In Progress" },
  pending: { icon: Circle, color: "text-muted-foreground", label: "Pending" },
  error: { icon: XCircle, color: "text-red-500", label: "Error" },
}

export function SubmissionDetail({ submission }: { submission: Submission }) {
  const [activeTab, setActiveTab] = useState<TabId>("overview")

  const stageLabels: Record<string, string> = {
    intake: "Intake",
    "uw-review": "UW Review",
    quote: "Quote",
    bind: "Bind",
  }

  return (
    <div className="px-6 py-6">
      {/* Back link */}
      <Link
        href="/submissions"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Submissions
      </Link>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-3">
            <h1 className="text-xl font-bold text-foreground">
              {submission.account}
            </h1>
            <StatusBadge status={submission.riskStatus} />
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              {submission.broker} &middot; {submission.brokerFirm}
            </span>
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              UW: {submission.uwAssigned}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {submission.daysInPipeline} days in pipeline
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
          Stage: {stageLabels[submission.stage]}
          {submission.premium && (
            <span className="ml-2 text-foreground">
              {submission.premium}
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            )}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Key Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Stage</p>
                  <p className="text-sm font-medium text-foreground">
                    {stageLabels[submission.stage]}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Days in Stage
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {submission.daysInStage}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Premium</p>
                  <p className="text-sm font-medium text-foreground">
                    {submission.premium || "TBD"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pipeline Days</p>
                  <p className="text-sm font-medium text-foreground">
                    {submission.daysInPipeline}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                Next Action
              </h3>
              <p className="text-sm text-muted-foreground">
                {submission.nextAction}
              </p>
            </div>
            {submission.riskFlags.length > 0 && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-red-700">
                  <AlertTriangle className="h-4 w-4" />
                  Risk Flags
                </h3>
                <ul className="flex flex-col gap-1">
                  {submission.riskFlags.map((flag) => (
                    <li
                      key={flag}
                      className="text-sm text-red-600"
                    >
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <AiInsightCard>
              <p className="mb-2">{submission.aiSummary}</p>
              {submission.aiAnomalies.length > 0 && (
                <div className="mt-3 border-t border-blue-200 pt-3">
                  <p className="mb-1 text-xs font-semibold">Anomalies Detected:</p>
                  <ul className="flex flex-col gap-1">
                    {submission.aiAnomalies.map((anomaly) => (
                      <li key={anomaly} className="text-xs">
                        {anomaly}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </AiInsightCard>
          </div>
        </div>
      )}

      {activeTab === "documents" && (
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold text-foreground">
              Document Checklist
            </h3>
          </div>
          <div className="divide-y divide-border">
            {submission.documents.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  {docStatusIcon[doc.status]}
                  <span className="text-sm text-foreground">{doc.name}</span>
                </div>
                <span
                  className={cn(
                    "text-xs font-medium",
                    doc.status === "complete" && "text-emerald-600",
                    doc.status === "pending" && "text-amber-600",
                    doc.status === "missing" && "text-red-600"
                  )}
                >
                  {docStatusLabel[doc.status]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "data-orders" && (
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold text-foreground">
              Data Orders Status
            </h3>
          </div>
          <div className="divide-y divide-border">
            {submission.dataOrders.map((order) => {
              const config = dataOrderStatusConfig[order.status]
              const Icon = config.icon
              return (
                <div
                  key={order.type}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("h-4 w-4", config.color)} />
                    <span className="text-sm text-foreground">
                      {order.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">
                      {order.lastUpdated}
                    </span>
                    <span
                      className={cn("text-xs font-medium", config.color)}
                    >
                      {config.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-4 text-sm font-semibold text-foreground">
            Activity Timeline
          </h3>
          <div className="relative flex flex-col gap-0">
            {submission.activity.map((item, i) => (
              <div key={`${item.date}-${i}`} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  {i < submission.activity.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-sm text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.date} &middot; {item.by}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "ai-summary" && (
        <div className="flex flex-col gap-4">
          <AiInsightCard>
            <h3 className="mb-2 text-sm font-semibold">
              Pre-Analysis Summary
            </h3>
            <p>{submission.aiSummary}</p>
          </AiInsightCard>
          {submission.aiAnomalies.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-amber-700">
                <AlertTriangle className="h-4 w-4" />
                Flagged Anomalies
              </h3>
              <ul className="flex flex-col gap-2">
                {submission.aiAnomalies.map((anomaly) => (
                  <li
                    key={anomaly}
                    className="rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-800"
                  >
                    {anomaly}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {submission.aiAnomalies.length === 0 && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <p className="flex items-center gap-1.5 text-sm text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                No anomalies detected in this submission.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Action Bar */}
      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-4">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <FileText className="h-4 w-4" />
          Generate Quote Package
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Mail className="h-4 w-4" />
          Draft Broker Email
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <ArrowUpRight className="h-4 w-4" />
          Escalate to UW
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <CheckCheck className="h-4 w-4" />
          Mark Complete
        </button>
      </div>
    </div>
  )
}
