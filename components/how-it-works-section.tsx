const steps = [
  {
    step: "01",
    title: "Upload Application",
    description:
      "Import insurance applications directly from your existing systems or upload documents manually.",
  },
  {
    step: "02",
    title: "Analyze Risk Factors",
    description:
      "Our engine evaluates key risk indicators, flags anomalies, and provides a comprehensive risk profile.",
  },
  {
    step: "03",
    title: "Make Your Decision",
    description:
      "Review the analysis, add your professional judgment, and approve, decline, or request additional information.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-t border-border bg-card px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">
            Workflow
          </p>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Simple, Streamlined Process
          </h2>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="flex flex-col items-center text-center">
              <span className="mb-4 font-mono text-5xl font-bold text-primary/20">
                {item.step}
              </span>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
