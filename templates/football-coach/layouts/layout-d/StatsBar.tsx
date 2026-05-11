import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
}

export default function StatsBar({ config }: Props) {
  const stats = config.stats ?? []

  return (
    <section className="bg-d-cream border-y d-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {stats.slice(0, 3).map((stat, i) => (
            <div
              key={i}
              className={`flex md:flex-col items-baseline md:items-start gap-4 md:gap-2 ${
                i > 0 ? "md:pl-12 md:border-l d-hairline" : ""
              }`}
            >
              <div className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-5xl md:text-6xl leading-none tracking-tight">
                {stat.value}
              </div>
              <div className="d-label-caps text-d-amber">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
