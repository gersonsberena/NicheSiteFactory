import type { CoachConfig } from "@/lib/useConfig"

export default function StatsBar({ config }: { config: CoachConfig }) {
  const { stats } = config
  if (!stats?.length) return null
  return (
    <section style={{ background: "var(--bg2)", borderTop: "1px solid rgba(var(--accent-rgb),0.12)", borderBottom: "1px solid rgba(var(--accent-rgb),0.12)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-0">
        {stats.map((s, i) => (
          <div key={i} className="text-center py-4" style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(var(--accent-rgb),0.12)" : "none" }}>
            <div className="font-bold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif", color: "var(--accent)", fontSize: "clamp(24px,4vw,40px)" }}>{s.value}</div>
            <div className="text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
