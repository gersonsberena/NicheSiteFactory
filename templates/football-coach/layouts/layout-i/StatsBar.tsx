import type { CoachConfig } from "@/lib/useConfig"

export default function StatsBar({ config }: { config: CoachConfig }) {
  const { stats } = config
  if (!stats?.length) return null
  return (
    <section style={{ background: "var(--accent)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="font-bold mb-1" style={{ fontFamily: "Playfair Display, serif", color: "white", fontSize: "clamp(28px,4vw,44px)" }}>{s.value}</div>
            <div className="text-[12px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Source Sans 3, sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
