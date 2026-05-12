import type { CoachConfig } from "@/lib/useConfig"

export default function StatsBar({ config }: { config: CoachConfig }) {
  if (!config.stats?.length) return null
  return (
    <section style={{ background: "var(--bg2)", borderTop: "1px solid rgba(var(--accent-rgb),0.2)", borderBottom: "1px solid rgba(var(--accent-rgb),0.2)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-14 md:py-16 grid"
        style={{ gridTemplateColumns: `repeat(${Math.min(config.stats.length, 4)}, 1fr)` }}
      >
        {config.stats.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center py-6 md:py-2"
            style={{ borderLeft: i > 0 ? "1px solid rgba(var(--accent-rgb),0.2)" : "none" }}
          >
            <div
              className="font-extrabold text-[64px] md:text-[80px] leading-none"
              style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em", color: "var(--accent)" }}
            >
              {s.value}
            </div>
            <div className="text-[11px] font-medium tracking-[0.2em] uppercase mt-4" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
