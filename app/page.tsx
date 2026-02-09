import { MorningBriefing } from "@/components/dashboard/morning-briefing"
import { ActiveSubmissions } from "@/components/dashboard/active-submissions"
import { AiChatPanel } from "@/components/dashboard/ai-chat-panel"

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col xl:flex-row">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="flex flex-col gap-8">
          <MorningBriefing />
          <ActiveSubmissions />
        </div>
      </div>

      {/* AI panel */}
      <div className="w-full border-t border-border xl:w-[380px] xl:border-l xl:border-t-0">
        <AiChatPanel />
      </div>
    </div>
  )
}
