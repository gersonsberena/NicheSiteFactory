import type { CoachConfig } from "@/lib/useConfig"

export default function Packages({ config }: { config: CoachConfig }) {
  const pkgs = config.packages
  if (!pkgs || pkgs.length === 0) return null
  return (
    <section id="packages" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.2)", color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
          Programs
        </div>
        <h2 className="font-bold mb-12" style={{ fontFamily: "DM Sans, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>
          {config.copy_variants?.services_tagline || "Training Packages"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pkgs.map((pkg, i) => (
            <div key={i} className="rounded-2xl p-8 relative flex flex-col transition-all duration-300"
              style={{
                background: pkg.highlight ? "rgba(var(--accent-rgb),0.08)" : "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                border: pkg.highlight ? "1px solid rgba(var(--accent-rgb),0.4)" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: pkg.highlight ? "0 0 40px rgba(var(--accent-rgb),0.12)" : "none",
              }}>
              {pkg.highlight && (
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em]"
                  style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "DM Sans, sans-serif" }}>
                  Most Popular
                </div>
              )}
              <h3 className="font-bold text-[20px] mb-2" style={{ color: "white", fontFamily: "DM Sans, sans-serif" }}>{pkg.title}</h3>
              <div className="flex gap-3 mb-5 flex-wrap">
                {pkg.duration && (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>{pkg.duration}</span>
                )}
                {pkg.sessions_per_week != null && (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "DM Sans, sans-serif" }}>{pkg.sessions_per_week}x/week</span>
                )}
              </div>
              <p className="text-[14px] leading-[1.7] flex-1 mb-6" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "DM Sans, sans-serif" }}>{pkg.description}</p>
              {pkg.price && (
                <div className="text-[26px] font-bold mb-5" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>{pkg.price}</div>
              )}
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-3 rounded-full text-[13px] font-semibold transition-all duration-200"
                style={{ background: pkg.highlight ? "var(--accent)" : "rgba(255,255,255,0.06)", color: pkg.highlight ? "var(--bg)" : "rgba(255,255,255,0.7)", border: pkg.highlight ? "none" : "1px solid rgba(255,255,255,0.1)", fontFamily: "DM Sans, sans-serif" }}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
