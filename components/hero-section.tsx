import { Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-24 text-center md:py-32 lg:py-40">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
        <span className="h-2 w-2 rounded-full bg-accent" />
        Built for Insurance Professionals
      </div>
      <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
        Smarter Underwriting,
        <br />
        Better Decisions
      </h1>
      <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
        Streamline your risk assessment workflow with intelligent analysis
        tools. Review applications, evaluate risk factors, and make confident
        underwriting decisions faster.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="#features"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="#how-it-works"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Learn More
        </Link>
      </div>
    </section>
  )
}
