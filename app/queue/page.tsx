import {
  ShieldCheck,
  HardHat,
  FileCheck,
  Clock,
  AlertTriangle,
} from "lucide-react"
import { queueItems } from "@/lib/data"
import { AiInsightCard } from "@/components/ai-insight-card"
import { cn } from "@/lib/utils"
import type { QueueItem } from "@/lib/data"

const columns = [
  {
    title: "Loss Control",
    icon: HardHat,
    items: queueItems.lossControl,
    color: "bg-amber-500",
  },
  {
    title: "Compliance / Filing",
    icon: ShieldCheck,
    items: queueItems.compliance,
    color: "bg-blue-500",
  },
  {
    title: "Policy Issuance",
    icon: FileCheck,
    items: queueItems.policyIssuance,
    color: "bg-emerald-500",
  },
]

function getStatusColor(status: string) {
  const s = status.toLowerCase()
  if (s.includes("complete") || s.includes("rating complete")) return "text-emerald-600 bg-emerald-50"
  if (s.includes("progress") || s.includes("scheduled")) return "text-blue-600 bg-blue-50"
  if (s.includes("pending") || s.includes("queued")) return "text-amber-600 bg-amber-50"
  return "text-muted-foreground bg-muted"
}

function QueueCard({ item }: { item: QueueItem }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-foreground">
          {item.fileName}
        </h4>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
            getStatusColor(item.status)
          )}
        >
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
        <div className="mt-2 flex items-start gap-1.5 rounded-md bg-red-50 px-2 py-1.5">
          <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-red-500" />
          <span className="text-xs text-red-600">{item.blocker}</span>
        </div>
      )}
    </div>
  )
}

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
          Sarah (LC Coordinator) is OOO until Thursday -- 3 files may need
          reassignment. Compliance queue has a 3-day average delay this week.
          Consider flagging urgent files for priority review.
        </AiInsightCard>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {columns.map((col) => (
          <div key={col.title}>
            <div className="mb-3 flex items-center gap-2">
              <span
                className={cn("h-2 w-2 rounded-full", col.color)}
              />
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
          </div>
        ))}
      </div>
    </div>
  )
}
