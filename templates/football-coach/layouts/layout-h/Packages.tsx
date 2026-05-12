import type { CoachConfig } from "@/lib/useConfig"

export default function Packages({ config }: { config: CoachConfig }) {
  const { packages } = config
  if (!packages?.length) return null
  return (
    <section id="packages" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>
          <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
          Programs
        </div>
        <h2 className="font-bold mb-3" style={{ fontFamily: "DM Sans, sans-serif", color: "var(--text)", fontSize: "clamp(28px,4vw,44px)" }}>Training Packages</h2>
        <div className="h-px mb-12 max-w-[60px]" style={{ background: "var(--accent)" }} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div key={i} style={{
              background: "var(--bg-card)",
              border: pkg.highlight ? "1px solid rgba(var(--accent-rgb),0.5)" : "1px solid rgba(var(--accent-rgb),0.12)",
              padding: "32px 28px",
              boxShadow: pkg.highlight ? "0 0 40px rgba(var(--accent-rgb),0.08)" : "none",
              position: "relative",
            }}>
              {pkg.highlight && (
                <div className="absolute -top-3 left-6 text-[10px] font-bold px-3 py-1 uppercase tracking-widest" style={{ background: "var(--accent)", color: "white", fontFamily: "DM Mono, monospace" }}>Recommended</div>
              )}
              <h3 className="font-bold text-[18px] mb-2" style={{ color: "var(--text)", fontFamily: "DM Sans, sans-serif" }}>{pkg.title}</h3>
              {pkg.duration && <div className="text-[12px] font-bold mb-4 uppercase tracking-wider" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>{pkg.duration}</div>}
              <p className="text-[14px] leading-[1.7] mb-6" style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>{pkg.description}</p>
              {pkg.price && <div className="text-[20px] font-bold" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>{pkg.price}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
