import type { CoachConfig } from "@/lib/useConfig"

export default function StatsBar({ config }: { config: CoachConfig }) {
  const { stats } = config
  if (!stats?.length) return null
  return (
    <section className="py-10 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center rounded-xl py-6 px-4"
              style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="font-bold mb-1" style={{ fontFamily: "DM Sans, sans-serif", color: "var(--accent)", fontSize: "clamp(28px,3vw,40px)" }}>{s.value}</div>
              <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "DM Sans, sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
