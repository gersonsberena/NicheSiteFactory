import type { CoachConfig } from "@/lib/useConfig"

export default function Testimonials({ config }: { config: CoachConfig }) {
  const { testimonials, copy_variants } = config
  if (!testimonials?.length) return null

  return (
    <section className="py-24 md:py-32" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          {copy_variants?.testimonials_tagline && (
            <div className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
              {copy_variants.testimonials_tagline}
            </div>
          )}
          <div className="h-px w-[60px] mb-6" style={{ background: "var(--accent)" }} />
          <h2
            className="font-extrabold text-[36px] md:text-[48px] leading-[1.05]"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em", color: "var(--text)" }}
          >
            Athlete Results
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(var(--accent-rgb),0.15)",
                padding: "36px 32px",
              }}
            >
              <div
                className="font-extrabold text-[64px] leading-none mb-4 select-none"
                style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif", lineHeight: 0.8 }}
              >
                &ldquo;
              </div>
              <p
                className="text-[16px] leading-[1.75] flex-1"
                style={{ color: "var(--text)", fontFamily: "Inter, sans-serif" }}
              >
                {t.quote}
              </p>
              <div className="mt-8 pt-5" style={{ borderTop: "1px solid rgba(var(--accent-rgb),0.15)" }}>
                <div className="font-bold text-[14px]" style={{ color: "var(--text)", fontFamily: "Montserrat, sans-serif" }}>
                  {t.name}
                </div>
                <div className="text-[12px] mt-1 font-medium tracking-[0.1em] uppercase" style={{ color: "var(--accent)", fontFamily: "Inter, sans-serif" }}>
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
