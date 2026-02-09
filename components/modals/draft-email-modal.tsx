"use client"

import { useState } from "react"
import {
  Mail,
  X,
  CheckCircle2,
  Loader2,
  Lightbulb,
  Phone,
  Copy,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { BrokerEmailData } from "@/lib/submission-actions-data"

interface DraftEmailModalProps {
  open: boolean
  onClose: () => void
  accountName: string
  data: BrokerEmailData
}

export function DraftEmailModal({
  open,
  onClose,
  accountName,
  data,
}: DraftEmailModalProps) {
  const [selectedType, setSelectedType] = useState(data.selectedType)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  if (!open) return null

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
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Draft Email to Broker -- {accountName}
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
                <p className="text-sm font-medium text-foreground">Sending email...</p>
              </>
            )}
            {sent && (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-sm font-medium text-foreground">Email sent successfully!</p>
              </>
            )}
          </div>
        )}

        {/* Body */}
        {!sending && !sent && (
          <div className="max-h-[65vh] overflow-y-auto px-6 py-4">
            <div className="flex flex-col gap-4">
              {/* AI Context panel */}
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="mb-2 text-xs font-semibold text-blue-700">AI Context</p>
                <ul className="flex flex-col gap-1">
                  {data.contextItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-blue-800">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email type selector tabs */}
              <div>
                <p className="mb-2 text-xs font-semibold text-foreground">Email Type</p>
                <div className="flex flex-wrap gap-1.5">
                  {data.emailTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={cn(
                        "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                        selectedType === type
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-card text-foreground hover:bg-muted"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generated email */}
              <div>
                <p className="mb-2 text-xs font-semibold text-foreground">AI-Generated Email</p>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Subject: {data.generatedEmail.subject}
                  </p>
                  <div className="border-t border-border pt-3">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
                      {data.generatedEmail.body}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Subjectivity checklist */}
              {data.subjectivityChecklist && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-foreground">Subjectivity Checklist</p>
                  <div className="flex flex-col gap-1.5">
                    {data.subjectivityChecklist.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm"
                      >
                        {item.complete ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                        ) : (
                          <div className="h-4 w-4 shrink-0 rounded border-2 border-muted-foreground" />
                        )}
                        <span className={cn(item.complete ? "text-muted-foreground" : "text-foreground")}>
                          {item.label}
                        </span>
                        {item.detail && (
                          <span className="text-xs text-muted-foreground">-- {item.detail}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Suggestions */}
              {data.suggestions && data.suggestions.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-foreground">AI Suggestions</p>
                  <div className="flex flex-col gap-1.5">
                    {data.suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-left text-xs text-blue-700 transition-colors hover:bg-blue-100"
                      >
                        <Lightbulb className="h-3.5 w-3.5 shrink-0" />
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Insight */}
              {data.aiInsight && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <p className="flex items-start gap-2 text-xs text-amber-700">
                    <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {data.aiInsight}
                  </p>
                </div>
              )}

              {/* Quick actions */}
              {data.quickActions && data.quickActions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.quickActions.map((qa) => (
                    <button
                      key={qa.action}
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {qa.action === "call" && <Phone className="h-3.5 w-3.5" />}
                      {qa.action === "copy" && <Copy className="h-3.5 w-3.5" />}
                      {qa.label}
                    </button>
                  ))}
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
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={handleSend}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Send Email
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
