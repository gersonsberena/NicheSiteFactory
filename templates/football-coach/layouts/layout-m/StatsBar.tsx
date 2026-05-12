import type { CoachConfig } from "@/lib/useConfig"

export default function StatsBar({ config }: { config: CoachConfig }) {
  const { stats } = config
  if (!stats?.length) return null
  return (
    <section className="py-12 relative" style={{ background: "var(--bg2)", borderTop: "1px solid rgba(var(--accent-rgb),0.1)", borderBottom: "1px solid rgba(var(--accent-rgb),0.1)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-bold mb-1" style={{ fontFamily: "DM Serif Display, serif", color: "var(--accent)", fontSize: "clamp(32px,3.5vw,48px)" }}>{s.value}</div>
              <div className="text-[11px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "DM Sans, sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
