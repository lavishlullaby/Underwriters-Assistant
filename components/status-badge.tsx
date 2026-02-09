import { cn } from "@/lib/utils"
import type { RiskStatus } from "@/lib/data"

const statusConfig: Record<
  RiskStatus,
  { bg: string; text: string; dot: string; label: string }
> = {
  green: {
    bg: "bg-[#DCFCE7]",
    text: "text-[#166534]",
    dot: "bg-[#22C55E]",
    label: "On Track",
  },
  yellow: {
    bg: "bg-[#FEF3C7]",
    text: "text-[#92400E]",
    dot: "bg-[#F59E0B]",
    label: "Attention",
  },
  red: {
    bg: "bg-[#FEE2E2]",
    text: "text-[#991B1B]",
    dot: "bg-[#EF4444]",
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
        "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-[3px] text-[11px] font-semibold uppercase leading-none whitespace-nowrap",
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
