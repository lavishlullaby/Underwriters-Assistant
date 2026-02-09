import { cn } from "@/lib/utils"
import type { RiskStatus } from "@/lib/data"

const statusConfig: Record<
  RiskStatus,
  { gradient: string; text: string; label: string; pulse?: boolean }
> = {
  green: {
    gradient: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    text: "text-white",
    label: "On Track",
  },
  yellow: {
    gradient: "bg-gradient-to-r from-amber-400 to-amber-500",
    text: "text-white",
    label: "Attention",
  },
  red: {
    gradient: "bg-gradient-to-r from-red-500 to-red-600",
    text: "text-white",
    label: "At Risk",
    pulse: true,
  },
}

export function StatusBadge({
  status,
  className,
}: {
  status: RiskStatus
  className?: string
}) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold shadow-sm",
        config.gradient,
        config.text,
        config.pulse && "animate-pulse",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
      {config.label}
    </span>
  )
}
