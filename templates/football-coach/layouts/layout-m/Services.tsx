import type { CoachConfig } from "@/lib/useConfig"

export default function Services({ config }: { config: CoachConfig }) {
  const { services, copy_variants } = config
  if (!services?.length) return null
  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>03 — Services</div>
        <h2 className="font-bold mb-12" style={{ fontFamily: "DM Serif Display, serif", color: "white", fontSize: "clamp(28px,4vw,52px)" }}>
          {copy_variants?.services_tagline || "Training Programs"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(var(--accent-rgb),0.08)" }}>
          {services.map((s, i) => (
            <div key={i} className="p-8 transition-colors duration-200" style={{ background: "var(--bg2)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--bg-card)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--bg2)" }}>
              <div className="text-[11px] font-bold uppercase tracking-[0.25em] mb-6" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-bold text-[20px] mb-3" style={{ color: "white", fontFamily: "DM Serif Display, serif" }}>{s.title}</h3>
              <p className="text-[14px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "DM Sans, sans-serif" }}>{s.description}</p>
              {s.price && <div className="mt-5 text-[14px] font-semibold" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>{s.price}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
