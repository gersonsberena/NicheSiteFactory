import type { CoachConfig } from "@/lib/useConfig"

export default function Services({ config }: { config: CoachConfig }) {
  const { services, copy_variants } = config
  if (!services?.length) return null
  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] mb-5"
              style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.2)", color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
              Services
            </div>
            <h2 className="font-bold" style={{ fontFamily: "DM Sans, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>
              {copy_variants?.services_tagline || "Training Programs"}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={i} className="rounded-xl p-7 transition-all duration-300 group"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(var(--accent-rgb),0.3)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(var(--accent-rgb),0.06)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)" }}>
              <div className="text-[11px] font-bold mb-5 uppercase tracking-[0.25em]" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-bold text-[18px] mb-3" style={{ color: "white", fontFamily: "DM Sans, sans-serif" }}>{s.title}</h3>
              <p className="text-[14px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "DM Sans, sans-serif" }}>{s.description}</p>
              {s.price && <div className="mt-5 text-[14px] font-semibold" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>{s.price}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
