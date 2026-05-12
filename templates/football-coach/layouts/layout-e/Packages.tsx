import type { CoachConfig } from "@/lib/useConfig"

export default function Packages({ config }: { config: CoachConfig }) {
  const { packages } = config
  if (!packages?.length) return null

  return (
    <section id="packages" className="py-24 md:py-32" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <div className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
            Training Packages
          </div>
          <div className="h-px w-[60px] mb-6" style={{ background: "var(--accent)" }} />
          <h2
            className="font-extrabold text-[36px] md:text-[48px] leading-[1.05]"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em", color: "var(--text)" }}
          >
            Choose Your Program
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="flex flex-col transition-all duration-300"
              style={{
                background: pkg.highlight ? "var(--bg-card)" : "var(--bg)",
                border: pkg.highlight
                  ? "1px solid rgba(var(--accent-rgb),0.5)"
                  : "1px solid rgba(var(--accent-rgb),0.15)",
                borderTop: pkg.highlight ? "2px solid var(--accent)" : "1px solid rgba(var(--accent-rgb),0.15)",
                padding: "32px 28px",
                boxShadow: pkg.highlight ? "0 0 40px rgba(var(--accent-rgb),0.12)" : "none",
              }}
            >
              {pkg.highlight && (
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
                  Most Popular
                </div>
              )}

              <h3
                className="font-bold text-[22px] leading-snug mb-3"
                style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.02em", color: "var(--text)" }}
              >
                {pkg.title}
              </h3>

              {pkg.duration && (
                <div className="text-[12px] font-semibold tracking-[0.15em] uppercase mb-5" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
                  {pkg.duration}{pkg.sessions_per_week ? ` · ${pkg.sessions_per_week}×/wk` : ""}
                </div>
              )}

              <p className="text-[14px] leading-[1.7] flex-1" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
                {pkg.description}
              </p>

              {pkg.price && (
                <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(var(--accent-rgb),0.15)" }}>
                  <div className="font-extrabold text-[28px]" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--text)", letterSpacing: "-0.02em" }}>
                    {pkg.price}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
