import type { CoachConfig } from "@/lib/useConfig"

export default function Testimonials({ config }: { config: CoachConfig }) {
  const { testimonials, copy_variants } = config
  if (!testimonials?.length) return null
  return (
    <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>06 — Testimonials</div>
        <h2 className="font-bold mb-12" style={{ fontFamily: "DM Serif Display, serif", color: "white", fontSize: "clamp(28px,4vw,52px)" }}>
          {copy_variants?.testimonials_tagline || "What Athletes Say"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 border-l-2" style={{ background: "var(--bg-card)", borderColor: "rgba(var(--accent-rgb),0.3)" }}>
              <p className="text-[16px] italic leading-[1.8] mb-6" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "DM Serif Display, serif" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="text-[13px] font-semibold" style={{ color: "white", fontFamily: "DM Sans, sans-serif" }}>{t.name}</div>
                {t.role && <div className="text-[11px] mt-0.5 uppercase tracking-[0.15em]" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>{t.role}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
