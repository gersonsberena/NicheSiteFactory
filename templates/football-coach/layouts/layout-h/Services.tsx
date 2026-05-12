import type { CoachConfig } from "@/lib/useConfig"

export default function Services({ config }: { config: CoachConfig }) {
  const { services, copy_variants } = config
  if (!services?.length) return null
  return (
    <section id="services" className="py-20 md:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>
          <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
          Training Programs
        </div>
        <h2 className="font-bold mb-3" style={{ fontFamily: "DM Sans, sans-serif", color: "var(--text)", fontSize: "clamp(28px,4vw,44px)" }}>
          {copy_variants?.services_tagline || "Services"}
        </h2>
        <div className="h-px mb-12 max-w-[60px]" style={{ background: "var(--accent)" }} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} style={{ background: "var(--bg-card)", border: "1px solid rgba(var(--accent-rgb),0.1)", padding: "32px 28px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(var(--accent-rgb),0.4)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(var(--accent-rgb),0.1)" }}>
              <div className="text-[12px] font-bold mb-4" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-bold text-[18px] mb-3" style={{ color: "var(--text)", fontFamily: "DM Sans, sans-serif" }}>{s.title}</h3>
              <p className="text-[14px] leading-[1.7]" style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>{s.description}</p>
              {s.price && (
                <div className="mt-4 pt-4 text-[13px] font-bold" style={{ borderTop: "1px solid rgba(var(--accent-rgb),0.1)", color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>{s.price}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
