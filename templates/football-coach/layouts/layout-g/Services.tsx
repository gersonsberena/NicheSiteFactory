import type { CoachConfig } from "@/lib/useConfig"

export default function Services({ config }: { config: CoachConfig }) {
  const { services, copy_variants } = config
  if (!services?.length) return null
  return (
    <section id="services" className="py-20 md:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <h2 className="font-bold text-[36px] md:text-[44px] mb-3 leading-tight" style={{ fontFamily: "Roboto Slab, serif", color: "var(--accent)", letterSpacing: "-0.02em" }}>
          {copy_variants?.services_tagline || "Training Programs"}
        </h2>
        <div className="h-[2px] w-16 mb-12" style={{ background: "var(--accent)" }} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} style={{ background: "var(--bg)", border: "1px solid rgba(var(--accent-rgb),0.15)", padding: "28px 24px" }}>
              <div className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4" style={{ color: "var(--accent)", fontFamily: "Roboto, sans-serif" }}>
                Program {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-bold text-[20px] mb-3 leading-snug" style={{ fontFamily: "Roboto Slab, serif", color: "var(--text)" }}>{s.title}</h3>
              <p className="text-[14px] leading-[1.7]" style={{ color: "var(--text-muted)", fontFamily: "Roboto, sans-serif" }}>{s.description}</p>
              {s.price && <div className="mt-4 text-[13px] font-semibold" style={{ color: "var(--accent)", fontFamily: "Roboto, sans-serif" }}>{s.price}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
