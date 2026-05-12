import type { CoachConfig } from "@/lib/useConfig"

export default function Packages({ config }: { config: CoachConfig }) {
  const { packages } = config
  if (!packages?.length) return null
  return (
    <section id="packages" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="absolute right-8 top-8 select-none pointer-events-none text-[160px] font-bold leading-none" style={{ color: "rgba(var(--accent-rgb),0.04)", fontFamily: "Space Grotesk, sans-serif" }}>03</div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-2" style={{ color: "rgba(var(--accent-rgb),0.7)", fontFamily: "Space Grotesk, sans-serif" }}>
          <div className="w-1 h-1" style={{ background: "var(--accent)" }} /> Programs
        </div>
        <h2 className="font-bold mb-12" style={{ fontFamily: "Space Grotesk, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>Training Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div key={i} style={{
              background: "rgba(var(--accent-rgb),0.03)",
              border: pkg.highlight ? "1px solid rgba(var(--accent-rgb),0.5)" : "1px solid rgba(var(--accent-rgb),0.12)",
              padding: "32px 28px", position: "relative",
            }}>
              {pkg.highlight && <div className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-1" style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "Space Grotesk, sans-serif" }}>Top Pick</div>}
              <h3 className="font-bold text-[18px] mb-2" style={{ color: "white", fontFamily: "Space Grotesk, sans-serif" }}>{pkg.title}</h3>
              {pkg.duration && <div className="text-[11px] font-bold mb-4 uppercase tracking-[0.15em]" style={{ color: "var(--accent)", fontFamily: "Space Grotesk, sans-serif" }}>{pkg.duration}</div>}
              <p className="text-[14px] leading-[1.7] mb-6" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>{pkg.description}</p>
              {pkg.price && <div className="text-[20px] font-bold" style={{ color: "var(--accent)", fontFamily: "Space Grotesk, sans-serif" }}>{pkg.price}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
