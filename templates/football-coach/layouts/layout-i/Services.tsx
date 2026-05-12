import type { CoachConfig } from "@/lib/useConfig"
import Ornament from "./Ornament"

const CHAPTER = ["III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]

export default function Services({ config }: { config: CoachConfig }) {
  const { services, copy_variants } = config
  if (!services?.length) return null
  return (
    <section id="services" className="py-20 md:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>Chapter III</div>
        <h2 className="font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--text)", fontSize: "clamp(32px,4vw,52px)" }}>
          {copy_variants?.services_tagline || "Training Programs"}
        </h2>
        <Ornament />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {services.map((s, i) => (
            <div key={i} style={{ borderTop: "2px solid rgba(var(--accent-rgb),0.2)", paddingTop: "24px" }}>
              <div className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>{CHAPTER[i] ?? `Ch. ${i + 3}`}</div>
              <h3 className="font-bold text-[20px] mb-3" style={{ fontFamily: "Playfair Display, serif", color: "var(--text)" }}>{s.title}</h3>
              <p className="text-[15px] leading-[1.75]" style={{ color: "var(--text-muted)", fontFamily: "Source Sans 3, sans-serif" }}>{s.description}</p>
              {s.price && <div className="mt-4 text-[14px] font-semibold" style={{ color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>{s.price}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
