"use client"

import Link from "next/link"
import { AlertTriangle, AlertCircle, BarChart3, ArrowRight, Sparkles } from "lucide-react"
import { priorities } from "@/lib/data"
import { cn } from "@/lib/utils"

const typeConfig = {
  urgent: {
    icon: AlertTriangle,
    iconColor: "text-red-500",
    label: "Urgent",
    labelBg: "bg-[#FEE2E2] text-[#DC2626]",
    pulse: true,
    confidence: "High confidence",
  },
  warning: {
    icon: AlertCircle,
    iconColor: "text-amber-500",
    label: "Warning",
    labelBg: "bg-[#FEF3C7] text-[#D97706]",
    pulse: false,
    confidence: "Review recommended",
  },
  info: {
    icon: BarChart3,
    iconColor: "text-blue-500",
    label: "Info",
    labelBg: "bg-[#DBEAFE] text-[#2563EB]",
    pulse: false,
    confidence: "AI detected",
  },
}

export function PriorityCards() {
  return (
    <section className="animate-fade-in-up">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.05em] text-muted-foreground">
            {"Today's Priorities"}
          </h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-600">
            <Sparkles className="h-2.5 w-2.5" />
            AI
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          AI-generated action items
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {priorities.map((item, idx) => {
          const config = typeConfig[item.type]
          const Icon = config.icon
          return (
            <div
              key={item.id}
              className={cn(
                "card-hover group flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm",
                `stagger-${idx + 1} animate-fade-in-up`
              )}
            >
              <div className="mb-2.5 flex items-start justify-between">
                <div className="relative">
                  <Icon className={cn("h-5 w-5 shrink-0", config.iconColor)} />
                  {config.pulse && (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500 animate-pulse-dot" />
                  )}
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    config.labelBg
                  )}
                >
                  {config.label}
                </span>
              </div>
              <h3 className="mb-1 text-[15px] font-semibold text-foreground leading-snug">
                {item.title}
              </h3>
              <p className="mb-1 text-[11px] text-muted-foreground/70 italic">
                {config.confidence}
              </p>
              <p className="mb-3 flex-1 text-[13px] text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              <Link
                href={item.action}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
              >
                {item.actionLabel}
                <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
