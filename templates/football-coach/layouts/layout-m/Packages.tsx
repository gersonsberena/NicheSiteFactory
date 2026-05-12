import type { CoachConfig } from "@/lib/useConfig"

export default function Packages({ config }: { config: CoachConfig }) {
  const pkgs = config.packages
  if (!pkgs || pkgs.length === 0) return null
  return (
    <section id="packages" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>Programs</div>
        <h2 className="font-bold mb-12" style={{ fontFamily: "DM Serif Display, serif", color: "white", fontSize: "clamp(28px,4vw,52px)" }}>
          {config.copy_variants?.services_tagline || "Training Packages"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pkgs.map((pkg, i) => (
            <div key={i} className="relative flex flex-col p-8 transition-colors duration-200"
              style={{
                background: pkg.highlight ? "rgba(var(--accent-rgb),0.06)" : "var(--bg2)",
                border: pkg.highlight ? "1px solid rgba(var(--accent-rgb),0.35)" : "1px solid rgba(255,255,255,0.06)",
              }}>
              {pkg.highlight && (
                <div className="absolute -top-3 left-6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em]"
                  style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "DM Sans, sans-serif" }}>
                  Most Popular
                </div>
              )}
              <div className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-bold text-[22px] mb-2" style={{ color: "white", fontFamily: "DM Serif Display, serif" }}>{pkg.title}</h3>
              <div className="text-[12px] mb-5" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "DM Sans, sans-serif" }}>
                {[pkg.duration, pkg.sessions_per_week ? `${pkg.sessions_per_week}x/week` : null].filter(Boolean).join(" · ")}
              </div>
              <p className="text-[14px] leading-[1.8] flex-1 mb-6" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "DM Sans, sans-serif" }}>{pkg.description}</p>
              {pkg.price && (
                <div className="text-[28px] font-bold mb-5" style={{ color: "var(--accent)", fontFamily: "DM Serif Display, serif" }}>{pkg.price}</div>
              )}
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-3 text-[13px] font-medium transition-colors duration-200"
                style={{ background: pkg.highlight ? "var(--accent)" : "transparent", color: pkg.highlight ? "var(--bg)" : "rgba(255,255,255,0.5)", border: pkg.highlight ? "none" : "1px solid rgba(255,255,255,0.15)", fontFamily: "DM Sans, sans-serif" }}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
