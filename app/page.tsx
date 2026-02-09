import { PriorityCards } from "@/components/dashboard/priority-cards"
import { KanbanPipeline } from "@/components/dashboard/kanban-pipeline"
import { AiChatPanel } from "@/components/dashboard/ai-chat-panel"

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col xl:flex-row">
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">
            Good morning, Emily
          </h1>
          <p className="text-sm text-muted-foreground">
            {"Here's your command center for today. February 8, 2026."}
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <PriorityCards />
          <KanbanPipeline />
        </div>
      </div>
      <div className="w-full border-t border-border xl:w-96 xl:border-l xl:border-t-0">
        <AiChatPanel />
      </div>
    </div>
  )
}
