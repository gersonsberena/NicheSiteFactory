import type { CoachConfig } from "@/lib/useConfig"

export default function Services({ config }: { config: CoachConfig }) {
  const { services, copy_variants } = config
  if (!services?.length) return null
  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="absolute right-8 top-8 select-none pointer-events-none text-[160px] font-bold leading-none" style={{ color: "rgba(var(--accent-rgb),0.04)", fontFamily: "Space Grotesk, sans-serif" }}>02</div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-2" style={{ color: "rgba(var(--accent-rgb),0.7)", fontFamily: "Space Grotesk, sans-serif" }}>
          <div className="w-1 h-1" style={{ background: "var(--accent)" }} /> Training Systems
        </div>
        <h2 className="font-bold mb-12" style={{ fontFamily: "Space Grotesk, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>
          {copy_variants?.services_tagline || "Programs"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} style={{ background: "rgba(var(--accent-rgb),0.03)", border: "1px solid rgba(var(--accent-rgb),0.12)", padding: "32px 28px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(var(--accent-rgb),0.4)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(var(--accent-rgb),0.12)" }}>
              <div className="text-[11px] font-bold mb-4 uppercase tracking-[0.2em]" style={{ color: "var(--accent)", fontFamily: "Space Grotesk, sans-serif" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-bold text-[18px] mb-3" style={{ color: "white", fontFamily: "Space Grotesk, sans-serif" }}>{s.title}</h3>
              <p className="text-[14px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>{s.description}</p>
              {s.price && <div className="mt-4 text-[13px] font-bold" style={{ color: "var(--accent)", fontFamily: "Space Grotesk, sans-serif" }}>{s.price}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
