import type { CoachConfig } from "@/lib/useConfig"

export default function Testimonials({ config }: { config: CoachConfig }) {
  const { testimonials, copy_variants } = config
  if (!testimonials?.length) return null
  return (
    <section id="testimonials" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>
          <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
          Feedback
        </div>
        <h2 className="font-bold mb-3" style={{ fontFamily: "DM Sans, sans-serif", color: "var(--text)", fontSize: "clamp(28px,4vw,44px)" }}>
          {copy_variants?.testimonials_tagline || "What Athletes Say"}
        </h2>
        <div className="h-px mb-12 max-w-[60px]" style={{ background: "var(--accent)" }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: "var(--bg-card)", border: "1px solid rgba(var(--accent-rgb),0.1)", padding: "32px 28px" }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                ))}
              </div>
              <p className="text-[15px] leading-[1.75] mb-6" style={{ color: "var(--text)", fontFamily: "DM Sans, sans-serif" }}>"{t.quote}"</p>
              <div style={{ borderTop: "1px solid rgba(var(--accent-rgb),0.1)", paddingTop: "16px" }}>
                <div className="font-bold text-[14px]" style={{ color: "var(--text)", fontFamily: "DM Sans, sans-serif" }}>{t.name}</div>
                {t.role && <div className="text-[12px] font-medium mt-0.5" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>{t.role}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
