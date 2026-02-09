import { cn } from "@/lib/utils"
import type { RiskStatus } from "@/lib/data"

const statusConfig: Record<
  RiskStatus,
  { bg: string; text: string; dot: string; label: string }
> = {
  green: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    label: "On Track",
  },
  yellow: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    label: "Attention",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
    label: "At Risk",
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
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  )
}
