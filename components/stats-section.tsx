const stats = [
  { value: "40%", label: "Faster Review Time" },
  { value: "99.2%", label: "Accuracy Rate" },
  { value: "10K+", label: "Applications Processed" },
  { value: "250+", label: "Underwriters Trust Us" },
]

export function StatsSection() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 px-6 py-10">
            <span className="text-3xl font-bold text-foreground md:text-4xl">
              {stat.value}
            </span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
