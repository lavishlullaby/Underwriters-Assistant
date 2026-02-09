"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Sparkles,
  Send,
  FileSearch,
  Mail,
  ListChecks,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ── Types ───────────────────────────────────────────────────────── */

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  /** If present, renders inline confirm / cancel buttons */
  confirmable?: {
    onConfirm: string   // user-visible text when they click Confirm
    onCancel: string     // user-visible text when they click Cancel
    confirmLabel?: string
    cancelLabel?: string
  }
  confirmed?: "yes" | "no" | null
}

/* ── Flow definitions ────────────────────────────────────────────── */

interface FlowStep {
  role: "assistant"
  content: string
  /** If true, render confirm/cancel buttons instead of waiting for typed input */
  awaitConfirm?: boolean
  /** Responses after user confirms or cancels */
  onConfirm?: string
  onCancel?: string
}

type FlowKey = "draft_chase_email" | "order_prometrix" | "check_queue_status"

const flows: Record<FlowKey, FlowStep[]> = {
  draft_chase_email: [
    {
      role: "assistant",
      content: `Here's a draft email for broker Jane Mitchell regarding the ABC Corporation file:\n\n---\n\nSubject: ABC Corporation -- Loss Runs Needed by Friday\n\nHi Jane,\n\nHope you're doing well! Quick heads-up: the ABC Corporation quote expires this Friday and we're still missing the loss runs. Could you send those over when you get a chance so we can keep things moving?\n\nHappy to help with anything else in the meantime.\n\nBest,\nEmily\n\n---\n\nWould you like me to send this?`,
      awaitConfirm: true,
      onConfirm:
        "Done! Email sent to Jane Mitchell (jane.mitchell@brownbrown.com). I'll flag the file if we don't hear back by Thursday.",
      onCancel:
        "No problem -- draft discarded. Let me know if you'd like to try a different approach.",
    },
  ],
  order_prometrix: [
    {
      role: "assistant",
      content: `I'll prepare a ProMetrix order for the Pacific Retail Group submission. Here are the details:\n\n---\n\nReport Type: ProMetrix Property Report\nInsured: Pacific Retail Group\nAddress: 1420 Pacific Ave, San Francisco, CA 94109\nRequested by: Emily Richardson\nPriority: Standard (48-hour turnaround)\n\n---\n\nShall I submit this order?`,
      awaitConfirm: true,
      onConfirm:
        "Order submitted! ProMetrix report for Pacific Retail Group is now in the queue. Expected delivery by Monday. I'll notify you when it arrives.",
      onCancel:
        "Order cancelled. Let me know if you need to adjust any details before resubmitting.",
    },
  ],
  check_queue_status: [
    {
      role: "assistant",
      content: `Here's your current queue snapshot:\n\n-- Loss Control Queue --\n2 surveys pending (Johnson Mfg, Summit Logistics)\nMike Reynolds is assigned to both -- he's at capacity\n\n-- UW Review Queue --\n5 files in review, 2 nearing SLA (Greenleaf Hosp, Precision Auto)\n\n-- Binding Queue --\n3 files ready: Westfield Props, Maple Grove Schools, Coastal Condo\nCoastal Condo payment confirmed this morning\n\nWould you like me to flag the overdue items to the team?`,
      awaitConfirm: true,
      onConfirm:
        "Done! I've sent a status nudge to Mike Reynolds on the LC surveys and flagged the two SLA-approaching UW files to Robert Chen. You'll see updates in your notifications.",
      onCancel:
        "Got it -- no flags sent. The queue info is here if you need to reference it later.",
    },
  ],
}

/* ── Quick actions ───────────────────────────────────────────────── */

const quickActions: { label: string; icon: typeof FileSearch; flowKey: FlowKey }[] = [
  { label: "Order ProMetrix", icon: FileSearch, flowKey: "order_prometrix" },
  { label: "Draft chase email", icon: Mail, flowKey: "draft_chase_email" },
  { label: "Check queue status", icon: ListChecks, flowKey: "check_queue_status" },
]

/* ── Placeholders ────────────────────────────────────────────────── */

const placeholders = [
  "Ask about a submission...",
  "Draft an email...",
  "Check queue status...",
]

/* ── Initial messages ────────────────────────────────────────────── */

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Good morning, Emily! You have 4 priority items today. The ABC Corporation quote is the most urgent -- loss runs are still missing and the quote expires Friday. Would you like me to draft a follow-up email to broker Jane Mitchell?",
  },
]

/* ── Subcomponents ───────────────────────────────────────────────── */

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 self-start rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-bounce-dot"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

function AnimatedPlaceholder() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % placeholders.length)
        setVisible(true)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={cn(
        "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground/50 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      {placeholders[index]}
    </span>
  )
}

/* ── Main component ──────────────────────────────────────────────── */

export function AiChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeFlow, setActiveFlow] = useState<{ key: FlowKey; stepIndex: number } | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  /* ── Queue an assistant message with simulated typing delay ────── */
  const queueAssistant = useCallback(
    (content: string, opts?: { confirmable?: Message["confirmable"] }) => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content,
            confirmable: opts?.confirmable,
            confirmed: opts?.confirmable ? null : undefined,
          },
        ])
      }, 1400)
    },
    []
  )

  /* ── Start a quick-action flow ─────────────────────────────────── */
  function startFlow(flowKey: FlowKey) {
    const step = flows[flowKey][0]
    setActiveFlow({ key: flowKey, stepIndex: 0 })

    const confirmable = step.awaitConfirm
      ? {
          onConfirm: step.onConfirm!,
          onCancel: step.onCancel!,
          confirmLabel: "Yes, send it",
          cancelLabel: "Cancel",
        }
      : undefined

    queueAssistant(step.content, { confirmable })
  }

  /* ── Handle confirm / cancel on a confirmable message ──────────── */
  function handleConfirm(msgId: string, choice: "yes" | "no") {
    let response = ""

    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId && m.confirmable && m.confirmed === null) {
          response = choice === "yes" ? m.confirmable!.onConfirm : m.confirmable!.onCancel
          return { ...m, confirmed: choice }
        }
        return m
      })
    )

    if (response) {
      setActiveFlow(null)
      queueAssistant(response)
    }
  }

  /* ── Handle free-text send ─────────────────────────────────────── */
  function handleSend() {
    if (!input.trim()) return
    const userText = input.trim()
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    // Check if user typed something that matches a flow
    const matchedFlow = quickActions.find(
      (a) => userText.toLowerCase().includes(a.label.toLowerCase())
    )

    if (matchedFlow) {
      startFlow(matchedFlow.flowKey)
      return
    }

    // Check if user is responding affirmatively to the last confirmable message
    const lastConfirmable = [...messages].reverse().find(
      (m) => m.confirmable && m.confirmed === null
    )
    if (lastConfirmable) {
      const affirmatives = ["yes", "sure", "ok", "go ahead", "send", "send it", "confirm", "do it", "please", "yep", "yeah", "submit"]
      const negatives = ["no", "cancel", "stop", "don't", "nah", "nevermind", "never mind", "discard"]
      const lower = userText.toLowerCase()

      if (affirmatives.some((a) => lower.includes(a))) {
        handleConfirm(lastConfirmable.id, "yes")
        return
      }
      if (negatives.some((n) => lower.includes(n))) {
        handleConfirm(lastConfirmable.id, "no")
        return
      }
    }

    // Default fallback response
    queueAssistant(
      "I'm looking into that for you. Based on the current pipeline data, the Johnson Mfg file is blocked waiting on a Loss Control survey. The vendor has reported the insured isn't returning calls. Would you like me to draft an escalation email to the insured directly?"
    )
  }

  /* ── Quick action click ────────────────────────────────────────── */
  function handleQuickAction(flowKey: FlowKey, label: string) {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: label,
    }
    setMessages((prev) => [...prev, userMsg])
    startFlow(flowKey)
  }

  return (
    <div className="glass-panel flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-white/30 px-4 py-3.5">
        <div className="relative">
          <Sparkles className="h-4.5 w-4.5 text-violet-500" />
        </div>
        <span className="ai-gradient-text text-sm font-bold">
          AI Assistant
        </span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[9px] font-semibold text-violet-500 uppercase tracking-wide">
          Powered by AI
        </span>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "max-w-[90%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed animate-slide-in-right",
              msg.role === "assistant"
                ? "self-start bg-gradient-to-br from-violet-50 to-indigo-50 text-foreground shadow-sm"
                : "self-end bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md"
            )}
          >
            {msg.role === "assistant" && (
              <span className="mb-1 inline-flex items-center gap-1 text-[9px] font-semibold text-violet-400 uppercase tracking-wide">
                <Sparkles className="h-2.5 w-2.5" />
                AI
              </span>
            )}
            <p className="whitespace-pre-line">{msg.content}</p>

            {/* Confirm / Cancel buttons */}
            {msg.confirmable && msg.confirmed === null && (
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleConfirm(msg.id, "yes")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-[0.97]"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {msg.confirmable.confirmLabel || "Confirm"}
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirm(msg.id, "no")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-all hover:bg-muted active:scale-[0.97]"
                >
                  {msg.confirmable.cancelLabel || "Cancel"}
                </button>
              </div>
            )}

            {/* Confirmed / Cancelled indicator */}
            {msg.confirmable && msg.confirmed === "yes" && (
              <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                <CheckCircle2 className="h-3 w-3" />
                Confirmed
              </div>
            )}
            {msg.confirmable && msg.confirmed === "no" && (
              <div className="mt-2 text-[10px] font-medium text-muted-foreground">
                Cancelled
              </div>
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-white/30 px-3 py-3">
        {/* Quick actions */}
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => handleQuickAction(action.flowKey, action.label)}
              className="group/btn inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white px-3 py-1.5 text-[11px] font-medium text-violet-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-violet-500 hover:text-white hover:border-transparent hover:shadow-md active:scale-[0.98]"
            >
              <action.icon className="h-3 w-3" />
              {action.label}
            </button>
          ))}
        </div>

        {/* Input field */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-foreground transition-all duration-200 placeholder:text-transparent focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:shadow-ai-glow"
            />
            {!input && <AnimatedPlaceholder />}
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md transition-all duration-200 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </div>
    </div>
  )
}
