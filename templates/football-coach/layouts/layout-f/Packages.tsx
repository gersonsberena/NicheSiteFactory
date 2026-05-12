import type { CoachConfig } from "@/lib/useConfig"
import Eyebrow from "./Eyebrow"

export default function Packages({ config }: { config: CoachConfig }) {
  const { packages } = config
  if (!packages?.length) return null

  return (
    <section id="packages" className="py-24 md:py-32" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <Eyebrow>Training Packages</Eyebrow>
          <h2
            className="font-black leading-[0.92]"
            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "clamp(40px, 5vw, 64px)", textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--text)" }}
          >
            Choose Your Program
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((pkg, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg)",
                border: pkg.highlight ? "1px solid rgba(var(--accent-rgb),0.5)" : "1px solid rgba(var(--accent-rgb),0.1)",
                borderTop: pkg.highlight ? "3px solid var(--accent)" : "3px solid transparent",
                padding: "28px 24px",
              }}
            >
              {pkg.highlight && (
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "var(--accent)", fontFamily: "Barlow Condensed, sans-serif" }}>
                  Most Popular
                </div>
              )}
              <h3 className="font-black text-[22px] uppercase mb-2" style={{ fontFamily: "Barlow Condensed, sans-serif", color: "var(--text)" }}>
                {pkg.title}
              </h3>
              {pkg.duration && (
                <div className="text-[12px] font-bold tracking-[0.12em] uppercase mb-4" style={{ color: "var(--accent)", fontFamily: "Barlow Condensed, sans-serif" }}>
                  {pkg.duration}
                </div>
              )}
              <p className="text-[14px] leading-[1.7]" style={{ color: "var(--text-muted)", fontFamily: "Barlow, sans-serif" }}>
                {pkg.description}
              </p>
              {pkg.price && (
                <div className="mt-5 font-black text-[28px]" style={{ fontFamily: "Barlow Condensed, sans-serif", color: "var(--text)" }}>
                  {pkg.price}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
