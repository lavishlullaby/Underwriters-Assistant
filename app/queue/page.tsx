"use client"

import {
  ShieldCheck,
  HardHat,
  FileCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  User2,
  Palmtree,
} from "lucide-react"
import { queueItems } from "@/lib/data"
import { AiInsightCard } from "@/components/ai-insight-card"
import { cn } from "@/lib/utils"
import type { QueueItem } from "@/lib/data"

/* ── Column config ─────────────────────────────────────────────── */

const columns = [
  {
    title: "Loss Control",
    icon: HardHat,
    items: queueItems.lossControl,
    color: "bg-amber-500",
    accentBorder: "border-amber-200",
  },
  {
    title: "Compliance / Filing",
    icon: ShieldCheck,
    items: queueItems.compliance,
    color: "bg-blue-500",
    accentBorder: "border-blue-200",
  },
  {
    title: "Policy Issuance",
    icon: FileCheck,
    items: queueItems.policyIssuance,
    color: "bg-emerald-500",
    accentBorder: "border-emerald-200",
  },
]

/* ── Team status data ──────────────────────────────────────────── */

interface TeamMember {
  name: string
  fileCount: number
  blocked: number
  note?: string
  ooo?: string
  statusColor: string
}

const teamLossControl: TeamMember[] = [
  {
    name: "Mike Reynolds",
    fileCount: 4,
    blocked: 2,
    statusColor: "text-amber-600",
  },
  {
    name: "Sarah Lin",
    fileCount: 3,
    blocked: 0,
    ooo: "OOO Feb 13-14",
    statusColor: "text-emerald-600",
  },
]

const teamCompliance: TeamMember[] = [
  {
    name: "Mike Davis",
    fileCount: 3,
    blocked: 0,
    note: "Slight backlog",
    statusColor: "text-amber-600",
  },
  {
    name: "Jennifer Wu",
    fileCount: 2,
    blocked: 0,
    note: "Both approved",
    statusColor: "text-emerald-600",
  },
  {
    name: "Tom Baker",
    fileCount: 0,
    blocked: 0,
    ooo: "OOO until Feb 12",
    statusColor: "text-muted-foreground",
  },
]

const teamIssuance: TeamMember[] = [
  {
    name: "Amy Chen",
    fileCount: 2,
    blocked: 0,
    note: "In progress",
    statusColor: "text-emerald-600",
  },
  {
    name: "Bob Martinez",
    fileCount: 2,
    blocked: 0,
    note: "Pending external docs",
    statusColor: "text-amber-600",
  },
]

const teamsByColumn: Record<string, TeamMember[]> = {
  "Loss Control": teamLossControl,
  "Compliance / Filing": teamCompliance,
  "Policy Issuance": teamIssuance,
}

/* ── Status helpers ────────────────────────────────────────────── */

function getStatusColor(status: string) {
  const s = status.toLowerCase()
  if (s.includes("blocked")) return "text-red-600 bg-red-50 border-red-200"
  if (s.includes("complete") || s.includes("approved"))
    return "text-emerald-600 bg-emerald-50 border-emerald-200"
  if (s.includes("progress") || s.includes("scheduled"))
    return "text-blue-600 bg-blue-50 border-blue-200"
  if (s.includes("pending") || s.includes("review"))
    return "text-amber-600 bg-amber-50 border-amber-200"
  return "text-muted-foreground bg-muted border-border"
}

function getStatusIcon(status: string) {
  const s = status.toLowerCase()
  if (s.includes("blocked")) return "bg-red-500"
  if (s.includes("complete") || s.includes("approved")) return "bg-emerald-500"
  if (s.includes("progress") || s.includes("scheduled")) return "bg-blue-500"
  if (s.includes("pending") || s.includes("review")) return "bg-amber-500"
  return "bg-muted-foreground"
}

/* ── Queue card ────────────────────────────────────────────────── */

function QueueCard({ item }: { item: QueueItem }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-foreground">
          {item.fileName}
        </h4>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
            getStatusColor(item.status)
          )}
        >
          <span
            className={cn("h-1.5 w-1.5 rounded-full", getStatusIcon(item.status))}
          />
          {item.status}
        </span>
      </div>
      <p className="mb-1 text-xs text-muted-foreground">{item.owner}</p>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>
          {item.daysInQueue === 0
            ? "Today"
            : `${item.daysInQueue}d in queue`}
        </span>
      </div>
      {item.blocker && (
        <div
          className={cn(
            "mt-2 flex items-start gap-1.5 rounded-md px-2 py-1.5",
            item.status.toLowerCase().includes("blocked")
              ? "bg-red-50"
              : item.status.toLowerCase().includes("complete") ||
                  item.status.toLowerCase().includes("approved")
                ? "bg-emerald-50"
                : "bg-amber-50"
          )}
        >
          {item.status.toLowerCase().includes("complete") ||
          item.status.toLowerCase().includes("approved") ? (
            <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
          ) : (
            <AlertTriangle
              className={cn(
                "mt-0.5 h-3 w-3 shrink-0",
                item.status.toLowerCase().includes("blocked")
                  ? "text-red-500"
                  : "text-amber-500"
              )}
            />
          )}
          <span
            className={cn(
              "text-xs",
              item.status.toLowerCase().includes("blocked")
                ? "text-red-600"
                : item.status.toLowerCase().includes("complete") ||
                    item.status.toLowerCase().includes("approved")
                  ? "text-emerald-600"
                  : "text-amber-600"
            )}
          >
            {item.blocker}
          </span>
        </div>
      )}
    </div>
  )
}

/* ── Team status panel ─────────────────────────────────────────── */

function TeamPanel({ members }: { members: TeamMember[] }) {
  return (
    <div className="mt-3 rounded-lg border border-dashed border-border bg-muted/30 p-3">
      <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Team Status
      </h4>
      <div className="flex flex-col gap-1.5">
        {members.map((m) => (
          <div
            key={m.name}
            className="flex items-center gap-2 text-xs"
          >
            <User2 className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span className="font-medium text-foreground">{m.name}</span>
            <span className="text-muted-foreground">
              {m.fileCount} {m.fileCount === 1 ? "file" : "files"}
            </span>
            {m.blocked > 0 && (
              <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-600">
                {m.blocked} blocked
              </span>
            )}
            {m.blocked === 0 && m.fileCount > 0 && !m.note && (
              <span className={cn("text-[10px] font-medium", m.statusColor)}>
                0 blocked
              </span>
            )}
            {m.note && (
              <span className={cn("text-[10px] font-medium", m.statusColor)}>
                {m.note}
              </span>
            )}
            {m.ooo && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                <Palmtree className="h-2.5 w-2.5" />
                {m.ooo}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────── */

export default function QueueMonitorPage() {
  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Queue Monitor</h1>
        <p className="text-sm text-muted-foreground">
          Track internal team queues for Loss Control, Compliance, and Policy
          Issuance
        </p>
      </div>

      <div className="mb-6">
        <AiInsightCard>
          2 files blocked in Loss Control -- both waiting on insured callbacks.
          Mike Reynolds has 4 files (2 blocked). Sarah Lin OOO Feb 13-14 --
          consider reassigning her 3 files. Compliance queue has 3-day average
          delay this week.
        </AiInsightCard>
      </div>

      {/* Summary bar */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {columns.map((col) => {
          const blockedCount = col.items.filter((i) =>
            i.status.toLowerCase().includes("blocked")
          ).length
          return (
            <div
              key={col.title}
              className={cn(
                "flex items-center gap-3 rounded-lg border bg-card p-3",
                col.accentBorder
              )}
            >
              <span className={cn("h-2.5 w-2.5 rounded-full", col.color)} />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground">
                  {col.title}
                </p>
                <p className="text-lg font-bold text-foreground">
                  {col.items.length}
                </p>
              </div>
              {blockedCount > 0 && (
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-600">
                  {blockedCount} blocked
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {columns.map((col) => (
          <div key={col.title}>
            <div className="mb-3 flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", col.color)} />
              <col.icon className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">
                {col.title}
              </h2>
              <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {col.items.length}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {col.items.map((item) => (
                <QueueCard key={item.id} item={item} />
              ))}
            </div>
            {/* Team status */}
            {teamsByColumn[col.title] && (
              <TeamPanel members={teamsByColumn[col.title]} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
