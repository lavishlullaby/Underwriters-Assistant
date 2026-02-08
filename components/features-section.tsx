import { FileSearch, ShieldCheck, BarChart3 } from "lucide-react"

const features = [
  {
    icon: FileSearch,
    title: "Application Review",
    description:
      "Automatically parse and analyze insurance applications. Surface key risk indicators and missing information before you begin your assessment.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Assessment",
    description:
      "Evaluate risk factors with data-driven insights. Compare applicant profiles against historical data to identify potential concerns.",
  },
  {
    icon: BarChart3,
    title: "Decision Analytics",
    description:
      "Track your underwriting decisions with comprehensive analytics. Identify patterns, improve accuracy, and maintain compliance.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">
            Core Capabilities
          </p>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Everything You Need to Underwrite with Confidence
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-8 transition-colors hover:border-primary/30"
            >
              <div className="mb-5 inline-flex rounded-lg bg-primary/10 p-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
