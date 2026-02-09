import {
  User,
  Target,
  FileType,
  Presentation,
  AlertOctagon,
  BarChart3,
} from "lucide-react"
import { uwProfiles } from "@/lib/data"
import { cn } from "@/lib/utils"

function workloadColor(current: number, max: number) {
  const pct = current / max
  if (pct >= 0.85) return "bg-red-500"
  if (pct >= 0.6) return "bg-amber-500"
  return "bg-emerald-500"
}

export default function UWPreferencesPage() {
  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">
          UW Preferences
        </h1>
        <p className="text-sm text-muted-foreground">
          Know your underwriters -- their preferences, pet peeves, and
          workload
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {uwProfiles.map((uw) => (
          <div
            key={uw.id}
            className="rounded-lg border border-border bg-card"
          >
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-border px-5 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {uw.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground">
                  {uw.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {uw.portfolioFocus}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {uw.currentWorkload}/{uw.maxWorkload}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Active Files
                </p>
              </div>
            </div>

            {/* Workload Bar */}
            <div className="px-5 pt-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <BarChart3 className="h-3 w-3" />
                  Workload
                </span>
                <span className="text-xs text-muted-foreground">
                  {Math.round((uw.currentWorkload / uw.maxWorkload) * 100)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    workloadColor(uw.currentWorkload, uw.maxWorkload)
                  )}
                  style={{
                    width: `${(uw.currentWorkload / uw.maxWorkload) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4 px-5 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Target className="h-3 w-3" />
                    Risk Appetite
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {uw.riskAppetite}
                  </p>
                </div>
                <div>
                  <p className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <FileType className="h-3 w-3" />
                    Preferred Format
                  </p>
                  <p className="text-sm text-foreground">
                    {uw.preferredFormat}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Presentation className="h-3 w-3" />
                  Presentation Style
                </p>
                <p className="text-sm text-foreground">
                  {uw.presentationStyle}
                </p>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <AlertOctagon className="h-3 w-3" />
                  Pet Peeves & Preferences
                </p>
                <ul className="flex flex-col gap-1.5">
                  {uw.petPeeves.map((peeve) => (
                    <li
                      key={peeve}
                      className="rounded-md bg-amber-50 px-3 py-1.5 text-xs text-amber-800"
                    >
                      {peeve}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
