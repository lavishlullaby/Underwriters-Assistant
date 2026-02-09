"use client"

import { useState } from "react"
import {
  FileText,
  X,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Bell,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { QuotePackageData } from "@/lib/submission-actions-data"

interface GenerateQuoteModalProps {
  open: boolean
  onClose: () => void
  accountName: string
  data: QuotePackageData
}

export function GenerateQuoteModal({
  open,
  onClose,
  accountName,
  data,
}: GenerateQuoteModalProps) {
  const [checkedComponents, setCheckedComponents] = useState<Record<string, boolean>>(
    () => {
      const map: Record<string, boolean> = {}
      data.components?.forEach((c) => {
        map[c.label] = c.checked
      })
      return map
    }
  )
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  if (!open) return null

  const statusConfig = {
    ready: {
      bg: "bg-emerald-50 border-emerald-200",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
      iconColor: "text-emerald-700",
    },
    warning: {
      bg: "bg-amber-50 border-amber-200",
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      iconColor: "text-amber-700",
    },
    blocked: {
      bg: "bg-red-50 border-red-200",
      icon: <XCircle className="h-5 w-5 text-red-600" />,
      iconColor: "text-red-700",
    },
  }

  const config = statusConfig[data.status]
  const preCheckIconMap = {
    check: <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />,
    warning: <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />,
    error: <XCircle className="h-4 w-4 shrink-0 text-red-500" />,
  }

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
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Generate Quote Package -- {accountName}
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
                <p className="text-sm font-medium text-foreground">Generating quote package...</p>
                <div className="h-2 w-48 overflow-hidden rounded-full bg-muted">
                  <div className="h-full animate-pulse rounded-full bg-primary" style={{ width: "60%" }} />
                </div>
              </>
            )}
            {sent && (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-sm font-medium text-foreground">Quote package generated and sent!</p>
                {data.delivery && (
                  <p className="text-xs text-muted-foreground">Sent to {data.delivery.to}</p>
                )}
              </>
            )}
          </div>
        )}

        {/* Body */}
        {!sending && !sent && (
          <div className="max-h-[65vh] overflow-y-auto px-6 py-4">
            <div className="flex flex-col gap-4">
              {/* Status panel */}
              <div className={cn("rounded-lg border p-4", config.bg)}>
                <div className="mb-2 flex items-center gap-2">
                  {config.icon}
                  <p className={cn("text-sm font-semibold", config.iconColor)}>
                    {data.statusMessage}
                  </p>
                </div>
                {data.preCheckItems && (
                  <ul className="flex flex-col gap-1.5 pl-7">
                    {data.preCheckItems.map((item) => (
                      <li key={item.text} className="flex items-start gap-2 text-sm text-foreground">
                        {preCheckIconMap[item.icon]}
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* AI Recommendation */}
              {data.recommendation && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="mb-1 text-xs font-semibold text-blue-700">AI Recommendation</p>
                  <p className="whitespace-pre-line text-sm text-blue-800">
                    {data.recommendation}
                  </p>
                </div>
              )}

              {/* Alternative actions for blocked/warning */}
              {data.alternativeActions && (
                <div className="flex flex-wrap gap-2">
                  {data.alternativeActions.map((action) => (
                    <button
                      key={action.action}
                      type="button"
                      className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {action.label} &rarr;
                    </button>
                  ))}
                </div>
              )}

              {/* Notify option */}
              {data.notifyOption && (
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 self-start rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Bell className="h-3.5 w-3.5" />
                  Notify me when ready
                </button>
              )}

              {/* Package components */}
              {data.components && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-foreground">Package Components</p>
                  <div className="flex flex-col gap-1.5">
                    {data.components.map((comp) => (
                      <label
                        key={comp.label}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                          comp.disabled
                            ? "cursor-not-allowed text-muted-foreground opacity-60"
                            : "cursor-pointer text-foreground hover:bg-muted"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={comp.disabled ? false : (checkedComponents[comp.label] ?? false)}
                          disabled={comp.disabled}
                          onChange={(e) =>
                            setCheckedComponents((prev) => ({
                              ...prev,
                              [comp.label]: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-border accent-primary"
                        />
                        <span>{comp.label}</span>
                        {comp.disabled && comp.disabledReason && (
                          <span className="text-xs italic text-muted-foreground">
                            -- {comp.disabledReason}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Cover letter */}
              {data.coverLetter && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-foreground">AI-Generated Cover Letter</p>
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
                      {data.coverLetter}
                    </pre>
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {data.suggestions && data.suggestions.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-foreground">AI Suggestions</p>
                  <div className="flex flex-wrap gap-2">
                    {data.suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-700 transition-colors hover:bg-blue-100"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery settings */}
              {data.delivery && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-foreground">Delivery Settings</p>
                  <div className="rounded-lg border border-border bg-muted/30 p-3">
                    <div className="flex flex-col gap-1.5 text-sm">
                      <div className="flex gap-2">
                        <span className="w-16 shrink-0 font-medium text-muted-foreground">To:</span>
                        <span className="text-foreground">{data.delivery.to}</span>
                      </div>
                      {data.delivery.cc && (
                        <div className="flex gap-2">
                          <span className="w-16 shrink-0 font-medium text-muted-foreground">CC:</span>
                          <span className="text-foreground">
                            {data.delivery.cc}
                            {data.delivery.ccNote && (
                              <span className="ml-1 text-xs italic text-muted-foreground">
                                ({data.delivery.ccNote})
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <span className="w-16 shrink-0 font-medium text-muted-foreground">Subject:</span>
                        <span className="text-foreground">{data.delivery.subject}</span>
                      </div>
                    </div>
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
              {data.status === "blocked" ? "Close" : "Cancel"}
            </button>
            {data.coverLetter && (
              <button
                type="button"
                className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Preview PDF
              </button>
            )}
            {data.status !== "blocked" && data.components && (
              <button
                type="button"
                onClick={handleSend}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Generate & Send
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
