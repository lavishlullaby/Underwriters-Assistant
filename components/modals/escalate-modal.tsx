"use client"

import { useState } from "react"
import {
  ArrowUpRight,
  X,
  CheckCircle2,
  Loader2,
  Bot,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { EscalateData } from "@/lib/submission-actions-data"

interface EscalateModalProps {
  open: boolean
  onClose: () => void
  accountName: string
  data: EscalateData
}

export function EscalateModal({
  open,
  onClose,
  accountName,
  data,
}: EscalateModalProps) {
  const [selectedReason, setSelectedReason] = useState(data.defaultReason || "")
  const [customMessage, setCustomMessage] = useState(data.prefilledMessage || "")
  const [showFileContext, setShowFileContext] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  if (!open) return null

  const additionalFields = selectedReason && data.additionalFieldsOnReason?.[selectedReason]

  function handleSend() {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setTimeout(onClose, 3000)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-[5vh]">
      <div className="relative w-full max-w-2xl rounded-xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Escalate to Underwriter -- {accountName}
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
                <p className="text-sm font-medium text-foreground">Sending to {data.currentUW}...</p>
              </>
            )}
            {sent && (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Escalation sent to {data.currentUW}
                </p>
                <p className="text-xs text-muted-foreground">Activity logged in file timeline</p>
              </>
            )}
          </div>
        )}

        {/* Body */}
        {!sending && !sent && (
          <div className="max-h-[65vh] overflow-y-auto px-6 py-4">
            <div className="flex flex-col gap-4">
              {/* Current UW */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Current UW:</span>
                {data.currentUW}
              </div>

              {/* AI Analysis */}
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-2">
                  <Bot className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <p className="text-sm text-blue-800">{data.aiAnalysis}</p>
                </div>
              </div>

              {/* Escalation reasons */}
              <div>
                <p className="mb-2 text-xs font-semibold text-foreground">Escalation Reason</p>
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
                        name="escalation-reason"
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

              {/* Additional fields based on reason */}
              {additionalFields && (
                <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-4">
                  {additionalFields.fields.map((field) => (
                    <div key={field.label}>
                      <label className="mb-1 block text-xs font-medium text-foreground">
                        {field.label}
                      </label>
                      {field.type === "dropdown" && (
                        <select className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground">
                          <option value="">Select...</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}
                      {field.type === "text" && (
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                        />
                      )}
                      {field.type === "textarea" && (
                        <textarea
                          placeholder={field.placeholder}
                          rows={3}
                          className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Message */}
              {(selectedReason === "custom" || data.prefilledMessage) && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-foreground">Message</p>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={8}
                    className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground"
                    placeholder="Describe what you need..."
                  />
                </div>
              )}

              {/* File context (collapsible) */}
              {data.fileContext && (
                <div className="rounded-lg border border-border">
                  <button
                    type="button"
                    onClick={() => setShowFileContext(!showFileContext)}
                    className="flex w-full items-center justify-between px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    <span>File Context (auto-included)</span>
                    {showFileContext ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {showFileContext && (
                    <div className="border-t border-border px-4 py-3">
                      <div className="flex flex-col gap-1.5">
                        {data.fileContext.map((item) => (
                          <div key={item.label} className="flex gap-2 text-sm">
                            <span className="w-40 shrink-0 font-medium text-muted-foreground">
                              {item.label}:
                            </span>
                            <span className="text-foreground">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Notification preview */}
              {data.notificationPreview && (
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">{data.notificationPreview}</p>
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
            <button
              type="button"
              onClick={handleSend}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Send to {data.currentUW}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
