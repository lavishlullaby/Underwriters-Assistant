"use client"

import Link from "next/link"
import { AlertTriangle, AlertCircle, BarChart3, ArrowRight } from "lucide-react"
import { priorities } from "@/lib/data"
import { cn } from "@/lib/utils"

const typeConfig = {
  urgent: {
    icon: AlertTriangle,
    border: "border-red-200",
    bg: "bg-red-50",
    iconColor: "text-red-500",
    label: "Urgent",
    labelBg: "bg-red-100 text-red-700",
  },
  warning: {
    icon: AlertCircle,
    border: "border-amber-200",
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
    label: "Warning",
    labelBg: "bg-amber-100 text-amber-700",
  },
  info: {
    icon: BarChart3,
    border: "border-blue-200",
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    label: "Info",
    labelBg: "bg-blue-100 text-blue-700",
  },
}

export function PriorityCards() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            {"Today's Priorities"}
          </h2>
          <p className="text-xs text-muted-foreground">
            AI-generated action items based on your active submissions
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {priorities.map((item) => {
          const config = typeConfig[item.type]
          const Icon = config.icon
          return (
            <div
              key={item.id}
              className={cn(
                "flex flex-col rounded-lg border p-4",
                config.border,
                config.bg
              )}
            >
              <div className="mb-2 flex items-start justify-between">
                <Icon className={cn("h-5 w-5 shrink-0", config.iconColor)} />
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    config.labelBg
                  )}
                >
                  {config.label}
                </span>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-foreground leading-snug">
                {item.title}
              </h3>
              <p className="mb-3 flex-1 text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              <Link
                href={item.action}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                {item.actionLabel}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
