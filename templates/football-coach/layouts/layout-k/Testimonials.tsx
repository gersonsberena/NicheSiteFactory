import type { CoachConfig } from "@/lib/useConfig"

export default function Testimonials({ config }: { config: CoachConfig }) {
  const { testimonials, copy_variants } = config
  if (!testimonials?.length) return null
  return (
    <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="absolute right-8 top-8 select-none pointer-events-none text-[160px] font-bold leading-none" style={{ color: "rgba(var(--accent-rgb),0.04)", fontFamily: "Space Grotesk, sans-serif" }}>05</div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-2" style={{ color: "rgba(var(--accent-rgb),0.7)", fontFamily: "Space Grotesk, sans-serif" }}>
          <div className="w-1 h-1" style={{ background: "var(--accent)" }} /> Feedback
        </div>
        <h2 className="font-bold mb-12" style={{ fontFamily: "Space Grotesk, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>
          {copy_variants?.testimonials_tagline || "What Athletes Say"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: "rgba(var(--accent-rgb),0.03)", border: "1px solid rgba(var(--accent-rgb),0.1)", padding: "32px 28px" }}>
              <p className="text-[15px] leading-[1.75] mb-6" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif" }}>"{t.quote}"</p>
              <div style={{ borderTop: "1px solid rgba(var(--accent-rgb),0.15)", paddingTop: "16px" }}>
                <div className="font-semibold text-[14px]" style={{ color: "white", fontFamily: "Space Grotesk, sans-serif" }}>{t.name}</div>
                {t.role && <div className="text-[12px] mt-0.5 uppercase tracking-[0.1em]" style={{ color: "var(--accent)", fontFamily: "Inter, sans-serif" }}>{t.role}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
