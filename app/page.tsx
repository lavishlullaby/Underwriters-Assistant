import { PriorityCards } from "@/components/dashboard/priority-cards"
import { KanbanPipeline } from "@/components/dashboard/kanban-pipeline"
import { AiChatPanel } from "@/components/dashboard/ai-chat-panel"

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col xl:flex-row">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
            Good morning, Emily
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {"Here's your command center for today. February 8, 2026."}
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          <PriorityCards />
          <KanbanPipeline />
        </div>
      </div>

      {/* AI panel */}
      <div className="w-full border-t border-border xl:w-[380px] xl:border-l xl:border-t-0">
        <AiChatPanel />
      </div>
    </div>
  )
}
