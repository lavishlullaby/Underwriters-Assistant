import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import { submissions } from "@/lib/data"
import { StatusBadge } from "@/components/status-badge"

const stageLabel: Record<string, string> = {
  intake: "Intake",
  "uw-review": "UW Review",
  quote: "Quote",
  bind: "Bind",
}

const stageColor: Record<string, string> = {
  intake: "bg-slate-100 text-slate-700",
  "uw-review": "bg-blue-100 text-blue-700",
  quote: "bg-amber-100 text-amber-700",
  bind: "bg-emerald-100 text-emerald-700",
}

const statusOrder: Record<string, number> = {
  red: 0,     // At Risk first
  yellow: 1,  // Attention second
  green: 2,   // On Track last
}

const sortedSubmissions = [...submissions].sort(
  (a, b) => (statusOrder[a.riskStatus] ?? 3) - (statusOrder[b.riskStatus] ?? 3)
)

export default function SubmissionsPage() {
  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">My Submissions</h1>
        <p className="text-sm text-muted-foreground">
          All active submissions across the pipeline
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Account
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Broker
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                UW
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Stage
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Days
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Next Action
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {sortedSubmissions.map((sub) => (
              <tr
                key={sub.id}
                className="border-b border-border last:border-b-0 hover:bg-muted/30"
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  {sub.account}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {sub.broker}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {sub.uwAssigned}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${stageColor[sub.stage]}`}
                  >
                    {stageLabel[sub.stage]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {sub.daysInPipeline}d
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={sub.riskStatus} />
                </td>
                <td className="max-w-[200px] px-4 py-3 text-xs text-muted-foreground">
                  {sub.nextAction}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/submissions/${sub.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    View <ArrowRight className="h-3 w-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
