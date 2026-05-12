import type { CoachConfig } from "@/lib/useConfig"
import MetricCard from "./MetricCard"

export default function StatsBar({ config }: { config: CoachConfig }) {
  const { stats } = config
  if (!stats?.length) return null
  return (
    <section id="stats" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-8 flex items-center gap-3" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>
          <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
          Performance Metrics
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <MetricCard key={i} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
