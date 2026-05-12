import type { CoachConfig } from "@/lib/useConfig"

export default function Services({ config }: { config: CoachConfig }) {
  const { services, copy_variants } = config
  if (!services?.length) return null

  return (
    <section id="services" className="py-24 md:py-32" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            {copy_variants?.services_tagline && (
              <div className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
                {copy_variants.services_tagline}
              </div>
            )}
            <div className="h-px w-[60px] mb-6" style={{ background: "var(--accent)" }} />
            <h2
              className="font-extrabold text-[36px] md:text-[48px] leading-[1.05]"
              style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em", color: "var(--text)" }}
            >
              The Programs
            </h2>
          </div>
          {copy_variants?.services_subline && (
            <p className="text-[15px] max-w-[38ch] md:text-right" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
              {copy_variants.services_subline}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="relative flex flex-col transition-all duration-300"
              style={{
                background: "var(--bg-card)",
                borderTop: "2px solid var(--accent)",
                padding: "32px 28px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 1px rgba(var(--accent-rgb),0.25), 0 16px 40px rgba(var(--accent-rgb),0.1)"
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none"
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className="text-[11px] font-bold tracking-[0.18em]"
                  style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-3 h-3 flex-shrink-0" style={{ background: "var(--accent)" }} />
              </div>

              <h3
                className="font-bold text-[20px] leading-snug mb-4"
                style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.02em", color: "var(--text)" }}
              >
                {s.title}
              </h3>

              <p className="text-[14px] leading-[1.7] flex-1" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
                {s.description}
              </p>

              {s.price && (
                <>
                  <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(var(--accent-rgb),0.15)" }}>
                    <span className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
                      {s.price}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
