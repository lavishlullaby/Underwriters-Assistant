"use client"

import { useState } from "react"
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

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Good morning, Emily! You have 4 priority items today. The ABC Corp quote is the most urgent -- loss runs are still missing and the quote expires Friday. Would you like me to draft a follow-up email to broker Jane Mitchell?",
  },
]

export function AiChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")

  function handleSend() {
    if (!input.trim()) return
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'm looking into that for you. Based on the current pipeline data, the Johnson Manufacturing file is blocked waiting on a Loss Control survey. The vendor has reported the insured isn't returning calls. Would you like me to draft an escalation email to the insured directly?",
      },
    ])
    setInput("")
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">
          AI Assistant
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "max-w-[90%] rounded-lg px-3 py-2 text-sm leading-relaxed",
              msg.role === "assistant"
                ? "self-start bg-ai-surface text-ai-surface-foreground"
                : "self-end bg-primary text-primary-foreground"
            )}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="border-t border-border px-3 py-2">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => setInput(action.label)}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <action.icon className="h-3 w-3" />
              {action.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about a submission..."
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
          />
          <button
            type="button"
            onClick={handleSend}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </div>
    </div>
  )
}
