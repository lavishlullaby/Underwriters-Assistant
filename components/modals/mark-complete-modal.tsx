"use client"

import { useState } from "react"
import {
  CheckCheck,
  X,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Lightbulb,
  PartyPopper,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { MarkCompleteData } from "@/lib/submission-actions-data"

interface MarkCompleteModalProps {
  open: boolean
  onClose: () => void
  accountName: string
  data: MarkCompleteData
}

export function MarkCompleteModal({
  open,
  onClose,
  accountName,
  data,
}: MarkCompleteModalProps) {
  const [selectedReason, setSelectedReason] = useState(data.defaultReason || "")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  if (!open) return null

  const showLostFields = selectedReason === "lost" && data.lostCompetitorFields
  const showBoundFields = selectedReason === "bound" && data.boundFields

  function handleSubmit() {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setTimeout(onClose, 3000)
    }, 2000)
  }

  const statusConfig = {
    allowed: {
      bg: "bg-blue-50 border-blue-200",
      icon: <CheckCircle2 className="h-5 w-5 text-blue-600" />,
      textColor: "text-blue-700",
    },
    warning: {
      bg: "bg-amber-50 border-amber-200",
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      textColor: "text-amber-700",
    },
    blocked: {
      bg: "bg-red-50 border-red-200",
      icon: <XCircle className="h-5 w-5 text-red-600" />,
      textColor: "text-red-700",
    },
  }

  const config = statusConfig[data.status]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-[5vh]">
      <div className="relative w-full max-w-2xl rounded-xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <CheckCheck className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Mark Complete -- {accountName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sending / Sent states */}
        {(sending || sent) && (
          <div className="flex flex-col items-center gap-3 px-6 py-12">
            {sending && (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-medium text-foreground">Processing...</p>
              </>
            )}
            {sent && (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  {accountName} marked as complete
                </p>
                {data.aiCelebration && selectedReason === "bound" && (
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <PartyPopper className="h-5 w-5 text-emerald-600" />
                    <p className="text-sm text-emerald-700">{data.aiCelebration}</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Body */}
        {!sending && !sent && (
          <div className="max-h-[65vh] overflow-y-auto px-6 py-4">
            <div className="flex flex-col gap-4">
              {/* Status / Warning */}
              {data.warningMessage && (
                <div className={cn("rounded-lg border p-4", config.bg)}>
                  <div className="flex items-center gap-2">
                    {config.icon}
                    <p className={cn("text-sm font-semibold", config.textColor)}>
                      {data.warningMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Open items */}
              {data.openItems && data.openItems.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-semibold text-foreground">Open Items</p>
                  {data.openItems.map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-sm">
                      {item.icon === "error" ? (
                        <XCircle className="h-4 w-4 shrink-0 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                      )}
                      <span className="text-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* File status for blocked */}
              {data.fileStatus && (
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="mb-2 text-xs font-semibold text-foreground">File Status</p>
                  <div className="flex flex-col gap-1.5">
                    {data.fileStatus.map((item) => (
                      <div key={item.label} className="flex gap-2 text-sm">
                        <span className="w-28 shrink-0 font-medium text-muted-foreground">
                          {item.label}:
                        </span>
                        <span className="text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completion reasons */}
              {data.reasons.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-foreground">
                    Completion Reason {data.status !== "allowed" ? "(required)" : ""}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {data.reasons.map((reason) => (
                      <label
                        key={reason.value}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                          selectedReason === reason.value
                            ? "bg-primary/10 text-foreground"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        <input
                          type="radio"
                          name="completion-reason"
                          value={reason.value}
                          checked={selectedReason === reason.value}
                          onChange={(e) => setSelectedReason(e.target.value)}
                          className="h-4 w-4 accent-primary"
                        />
                        {reason.label}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Lost to competitor fields */}
              {showLostFields && (
                <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-foreground">
                      Competitor
                    </label>
                    <select className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground">
                      <option value="">Select...</option>
                      <option value="travelers">Travelers</option>
                      <option value="chubb">Chubb</option>
                      <option value="hartford">Hartford</option>
                      <option value="liberty">Liberty</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-foreground">
                      Reason lost
                    </label>
                    <select className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground">
                      <option value="">Select...</option>
                      <option value="price">Price</option>
                      <option value="coverage">Coverage</option>
                      <option value="relationship">Relationship</option>
                      <option value="timing">Timing</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-foreground">
                      Competitor premium (if known)
                    </label>
                    <input
                      type="text"
                      placeholder="$"
                      className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              )}

              {/* Bound fields */}
              {showBoundFields && (
                <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-xs font-semibold text-foreground">Bind Details</p>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-foreground">
                      Policy number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter policy number"
                      className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-foreground">
                      Effective date
                    </label>
                    <input
                      type="date"
                      defaultValue="2025-03-01"
                      className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-foreground">
                      Premium
                    </label>
                    <input
                      type="text"
                      defaultValue="$250,000"
                      className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-foreground">
                      Bound by
                    </label>
                    <select className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground">
                      <option value="robert-chen">Robert Chen</option>
                      <option value="maria-lopez">Maria Lopez</option>
                    </select>
                  </div>
                </div>
              )}

              {/* AI Insight */}
              {data.aiInsight && selectedReason === "lost" && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <p className="flex items-start gap-2 text-xs text-amber-700">
                    <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {data.aiInsight}
                  </p>
                </div>
              )}

              {/* Alternative actions for blocked */}
              {data.alternativeActions && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-foreground">Did you mean to:</p>
                  <div className="flex flex-wrap gap-2">
                    {data.alternativeActions.map((action) => (
                      <button
                        key={action.action}
                        type="button"
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        {!sending && !sent && (
          <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            {data.status === "blocked" ? (
              <>
                {data.alternativeActions?.map((action) => (
                  <button
                    key={action.action}
                    type="button"
                    className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {action.action === "archive" ? "Archive" : "Decline"}
                  </button>
                ))}
              </>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedReason}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  selectedReason
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "cursor-not-allowed bg-muted text-muted-foreground"
                )}
              >
                {selectedReason === "bound" ? "Mark Bound" : selectedReason === "lost" ? "Mark Lost" : "Mark Complete"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
