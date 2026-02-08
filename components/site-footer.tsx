import { Shield } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">
            Underwriter&apos;s Assistant
          </span>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Professional underwriting tools designed to help you make better,
          faster decisions with confidence.
        </p>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Underwriter&apos;s Assistant. All
          rights reserved.
        </p>
      </div>
    </footer>
  )
}
