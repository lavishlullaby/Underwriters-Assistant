import {
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Clock,
  Users,
  FileText,
  BarChart3,
} from "lucide-react"
import { AiInsightCard } from "@/components/ai-insight-card"
import { cn } from "@/lib/utils"

const insights = [
  {
    id: "i1",
    category: "Pipeline Health",
    icon: TrendingUp,
    color: "text-emerald-600",
    items: [
      "Your average pipeline cycle time is 15.2 days -- 8% faster than last month.",
      "Bind-stage files are moving 2 days faster on average since the new checklist was implemented.",
      "6 active submissions with a combined projected premium of $1.67M.",
    ],
  },
  {
    id: "i2",
    category: "Risk Alerts",
    icon: AlertTriangle,
    color: "text-red-600",
    items: [
      "ABC Corporation quote expires Friday -- loss runs still missing. This is the highest-risk item in the pipeline.",
      "Johnson Mfg LC survey is stuck at 4 days. Historical data shows surveys stalling beyond 5 days have a 40% chance of requiring reassignment.",
      "Compliance backlog is averaging 3-day delays this week -- 50% above normal.",
    ],
  },
  {
    id: "i3",
    category: "Recommendations",
    icon: Lightbulb,
    color: "text-amber-600",
    items: [
      "Consider proactively requesting loss runs from Jane Mitchell at intake -- her submissions miss them 60% of the time.",
      "Robert Chen is at 70% capacity. With 2 files in quoting, consider holding the next intake assignment for Maria Lopez.",
      "Westfield Props is ready for binding -- prioritize UW sign-off to close before authority expiration on Wednesday.",
    ],
  },
]

const metrics = [
  {
    label: "Avg. Cycle Time",
    value: "15.2 days",
    change: "-8%",
    changeType: "positive" as const,
    icon: Clock,
  },
  {
    label: "Active Submissions",
    value: "6",
    change: "+2",
    changeType: "neutral" as const,
    icon: FileText,
  },
  {
    label: "Broker Win Rate",
    value: "66%",
    change: "+3%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    label: "Projected Premium",
    value: "$1.67M",
    change: "+$210K",
    changeType: "positive" as const,
    icon: BarChart3,
  },
]

export default function AiInsightsPage() {
  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">AI Insights</h1>
        <p className="text-sm text-muted-foreground">
          AI-powered analysis of your pipeline, risks, and optimization
          opportunities
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-border bg-card px-4 py-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{m.label}</span>
              <m.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-foreground">
                {m.value}
              </span>
              <span
                className={cn(
                  "mb-1 text-xs font-medium",
                  m.changeType === "positive"
                    ? "text-emerald-600"
                    : "text-muted-foreground"
                )}
              >
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {insights.map((group) => (
          <div key={group.id}>
            <div className="mb-3 flex items-center gap-2">
              <group.icon className={cn("h-4 w-4", group.color)} />
              <h2 className="text-sm font-semibold text-foreground">
                {group.category}
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              {group.items.map((item) => (
                <AiInsightCard key={item}>
                  {item}
                </AiInsightCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
