import type { CoachConfig } from "@/lib/useConfig"
import Ornament from "./Ornament"

export default function Testimonials({ config }: { config: CoachConfig }) {
  const { testimonials, copy_variants } = config
  if (!testimonials?.length) return null
  return (
    <section id="testimonials" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>Chapter VI</div>
        <h2 className="font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--text)", fontSize: "clamp(32px,4vw,52px)" }}>
          {copy_variants?.testimonials_tagline || "Voices from the Field"}
        </h2>
        <Ornament />
        <div className="space-y-10 mt-8 max-w-[800px]">
          {testimonials.map((t, i) => (
            <div key={i}>
              <p className="text-[19px] leading-[1.8] mb-4 italic" style={{ fontFamily: "Playfair Display, serif", color: "var(--text)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 max-w-[30px]" style={{ background: "rgba(var(--accent-rgb),0.4)" }} />
                <div>
                  <span className="font-semibold text-[14px]" style={{ color: "var(--text)", fontFamily: "Source Sans 3, sans-serif" }}>{t.name}</span>
                  {t.role && <span className="text-[13px] ml-2" style={{ color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>{t.role}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
