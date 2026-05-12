import type { CoachConfig } from "@/lib/useConfig"
import Eyebrow from "./Eyebrow"

export default function Services({ config }: { config: CoachConfig }) {
  const { services, copy_variants } = config
  if (!services?.length) return null

  return (
    <section id="services" className="py-24 md:py-32" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <Eyebrow>{copy_variants?.services_tagline || "Training Programs"}</Eyebrow>
          <h2
            className="font-black leading-[0.92]"
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              fontSize: "clamp(40px, 5vw, 64px)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "var(--text)",
            }}
          >
            The Programs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {services.map((s, i) => (
            <div
              key={i}
              className="relative overflow-hidden transition-all duration-300 group"
              style={{
                background: "var(--bg)",
                borderLeft: "3px solid transparent",
                padding: "32px 28px",
                border: "1px solid rgba(var(--accent-rgb),0.1)",
                marginTop: "-1px",
                marginLeft: "-1px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderLeftColor = "var(--accent)"
                el.style.paddingLeft = "32px"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderLeftColor = "transparent"
                el.style.paddingLeft = "28px"
              }}
            >
              <div
                className="absolute top-4 right-4 font-black text-[40px] leading-none select-none"
                style={{ fontFamily: "Barlow Condensed, sans-serif", color: "rgba(var(--accent-rgb),0.06)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                className="font-black text-[22px] leading-snug mb-4 uppercase"
                style={{ fontFamily: "Barlow Condensed, sans-serif", color: "var(--text)", letterSpacing: "-0.01em" }}
              >
                {s.title}
              </h3>
              <p className="text-[14px] leading-[1.7]" style={{ color: "var(--text-muted)", fontFamily: "Barlow, sans-serif" }}>
                {s.description}
              </p>
              {s.price && (
                <div className="mt-5 text-[13px] font-bold tracking-[0.15em] uppercase" style={{ color: "var(--accent)", fontFamily: "Barlow Condensed, sans-serif" }}>
                  {s.price}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
