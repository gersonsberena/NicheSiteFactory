import type { CoachConfig } from "@/lib/useConfig"
import Ornament from "./Ornament"

export default function Packages({ config }: { config: CoachConfig }) {
  const { packages } = config
  if (!packages?.length) return null
  return (
    <section id="packages" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>Chapter IV</div>
        <h2 className="font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--text)", fontSize: "clamp(32px,4vw,52px)" }}>Programs & Packages</h2>
        <Ornament />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {packages.map((pkg, i) => (
            <div key={i} style={{
              borderTop: pkg.highlight ? "2px solid var(--accent)" : "2px solid rgba(var(--accent-rgb),0.2)",
              paddingTop: "24px", position: "relative",
            }}>
              {pkg.highlight && <div className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>Most Popular</div>}
              <h3 className="font-bold text-[20px] mb-2" style={{ fontFamily: "Playfair Display, serif", color: "var(--text)" }}>{pkg.title}</h3>
              {pkg.duration && <div className="text-[12px] mb-3 italic" style={{ color: "var(--text-muted)", fontFamily: "Playfair Display, serif" }}>{pkg.duration}</div>}
              <p className="text-[15px] leading-[1.75] mb-4" style={{ color: "var(--text-muted)", fontFamily: "Source Sans 3, sans-serif" }}>{pkg.description}</p>
              {pkg.price && <div className="text-[18px] font-bold" style={{ color: "var(--accent)", fontFamily: "Playfair Display, serif" }}>{pkg.price}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
