"use client"

import { useState, useRef, useEffect } from "react"
import {
  Sparkles,
  Send,
  FileSearch,
  Mail,
  ListChecks,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const quickActions = [
  { label: "Order ProMetrix", icon: FileSearch },
  { label: "Draft chase email", icon: Mail },
  { label: "Check queue status", icon: ListChecks },
]

const placeholders = [
  "Ask about a submission...",
  "Draft an email...",
  "Check queue status...",
]

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Good morning, Emily! You have 4 priority items today. The ABC Corporation quote is the most urgent -- loss runs are still missing and the quote expires Friday. Would you like me to draft a follow-up email to broker Jane Mitchell?",
  },
]

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

export function AiChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  function handleSend() {
    if (!input.trim()) return
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I'm looking into that for you. Based on the current pipeline data, the Johnson Mfg file is blocked waiting on a Loss Control survey. The vendor has reported the insured isn't returning calls. Would you like me to draft an escalation email to the insured directly?",
        },
      ])
    }, 1800)
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
            <p>{msg.content}</p>
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
              onClick={() => setInput(action.label)}
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
