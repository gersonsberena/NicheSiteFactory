import type { CoachConfig } from "@/lib/useConfig"

export default function StatsBar({ config }: { config: CoachConfig }) {
  if (!config.stats?.length) return null
  return (
    <section style={{ background: "var(--accent)", color: "white" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 grid"
        style={{ gridTemplateColumns: `repeat(${Math.min(config.stats.length, 4)}, 1fr)` }}>
        {config.stats.map((s, i) => (
          <div key={i} className="text-center py-4" style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.3)" : "none" }}>
            <div className="font-bold text-[52px] leading-none" style={{ fontFamily: "Roboto Slab, serif" }}>{s.value}</div>
            <div className="text-[12px] font-medium uppercase tracking-wider mt-2 opacity-80" style={{ fontFamily: "Roboto, sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
