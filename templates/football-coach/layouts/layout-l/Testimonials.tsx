import type { CoachConfig } from "@/lib/useConfig"

export default function Testimonials({ config }: { config: CoachConfig }) {
  const { testimonials, copy_variants } = config
  if (!testimonials?.length) return null
  return (
    <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.2)", color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
          Testimonials
        </div>
        <h2 className="font-bold mb-12" style={{ fontFamily: "DM Sans, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>
          {copy_variants?.testimonials_tagline || "What Athletes Say"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-xl p-7 flex flex-col"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1l1.3 2.7L10 4.2l-2 1.9.5 2.9L6 7.5l-2.5 1.5.5-2.9L2 4.2l2.7-.5L6 1z" fill="var(--accent)" />
                  </svg>
                ))}
              </div>
              <p className="text-[14px] leading-[1.8] flex-1 mb-6" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="text-[13px] font-semibold" style={{ color: "white", fontFamily: "DM Sans, sans-serif" }}>{t.name}</div>
                {t.role && <div className="text-[11px] mt-0.5" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>{t.role}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
