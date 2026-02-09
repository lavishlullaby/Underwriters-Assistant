import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function AiInsightCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-blue-200 bg-ai-surface px-4 py-3",
        className
      )}
    >
      <div className="mb-1.5 flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-ai-surface-foreground" />
        <span className="text-xs font-semibold text-ai-surface-foreground">
          AI Insight
        </span>
      </div>
      <div className="text-sm text-ai-surface-foreground leading-relaxed">
        {children}
      </div>
    </div>
  )
}
