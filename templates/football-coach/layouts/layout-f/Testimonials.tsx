import type { CoachConfig } from "@/lib/useConfig"
import Eyebrow from "./Eyebrow"

export default function Testimonials({ config }: { config: CoachConfig }) {
  const { testimonials, copy_variants } = config
  if (!testimonials?.length) return null

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <Eyebrow>{copy_variants?.testimonials_tagline || "Athlete Feedback"}</Eyebrow>
          <h2
            className="font-black leading-[0.92]"
            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "clamp(40px, 5vw, 64px)", textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--text)" }}
          >
            What They Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{ background: "var(--bg2)", border: "1px solid rgba(var(--accent-rgb),0.1)", padding: "32px 28px" }}
            >
              <div className="font-black text-[48px] leading-none mb-4 select-none" style={{ color: "var(--accent)", fontFamily: "Barlow Condensed, sans-serif" }}>
                "
              </div>
              <p className="text-[16px] leading-[1.75] mb-8" style={{ color: "var(--text)", fontFamily: "Barlow, sans-serif" }}>
                {t.quote}
              </p>
              <div>
                <div className="font-bold text-[14px] uppercase tracking-wide" style={{ color: "var(--text)", fontFamily: "Barlow Condensed, sans-serif" }}>
                  {t.name}
                </div>
                <div className="text-[12px] mt-1" style={{ color: "var(--accent)", fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.1em" }}>
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
