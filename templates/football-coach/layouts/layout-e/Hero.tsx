"use client"
import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"

export default function Hero({ config, onCTA }: { config: CoachConfig; onCTA: () => void }) {
  const { about, hero, copy_variants, stats, design } = config
  const heroPhoto = hero.photo || `/stock/${sportToKey(about.sport ?? "football")}/hero.jpg`
  const credentials = about.credentials ?? []

  return (
    <section id="top" className="relative pt-[120px] md:pt-[140px] pb-20 md:pb-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left 60% */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {credentials.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2" style={{ color: "var(--accent)" }}>
              {credentials.map((c, i) => (
                <span key={i} className="flex items-center gap-4">
                  <span className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {c}
                  </span>
                  {i < credentials.length - 1 && <span style={{ color: "rgba(var(--accent-rgb),0.4)" }}>·</span>}
                </span>
              ))}
            </div>
          )}

          <div className="mt-7 h-px w-[60px]" style={{ background: "var(--accent)" }} />

          <h1
            className="font-extrabold text-[44px] md:text-[64px] lg:text-[76px] leading-[0.98] mt-7"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em", color: "var(--text)" }}
          >
            {hero.headline || (
              <>
                Elite {about.sport}<br />
                Coaching for<br />
                <span>Serious Athletes.</span>
              </>
            )}
          </h1>

          <p
            className="text-[18px] md:text-[20px] mt-7 italic font-semibold"
            style={{ fontFamily: "Montserrat, sans-serif", color: "var(--accent)", letterSpacing: "-0.01em" }}
          >
            {hero.subline || `Private ${about.sport?.toLowerCase() ?? "sports"} training in ${about.city}, ${about.state}.`}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              onClick={onCTA}
              className="inline-flex items-center gap-3 px-7 py-4 font-bold text-[12px] tracking-[0.22em] uppercase transition-colors"
              style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "Montserrat, sans-serif" }}
            >
              {hero.cta_text || "Request a Consultation"}
              <span className="block w-5 h-px" style={{ background: "var(--bg)" }} />
            </button>
            {(config.placements?.length ?? 0) > 0 && (
              <a
                href="#placements"
                className="text-[12px] tracking-[0.22em] uppercase transition-colors"
                style={{ color: "var(--text-muted)", fontFamily: "Montserrat, sans-serif" }}
              >
                View Placement Record →
              </a>
            )}
          </div>

          {stats.length > 0 && (
            <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
              {stats.slice(0, 3).map((s, i) => (
                <div key={i}>
                  <div className="text-[11px] font-medium tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
                    {s.label}
                  </div>
                  <div className="font-semibold text-[15px] mt-1.5 tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--text)" }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 40% portrait */}
        <div className="lg:col-span-5 relative">
          <div
            className="absolute -top-3 -left-3 w-16 h-16 border-l border-t hidden lg:block"
            style={{ borderColor: "var(--accent)" }}
          />
          <div
            className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b hidden lg:block"
            style={{ borderColor: "var(--accent)" }}
          />
          <div className="relative">
            {heroPhoto.startsWith("/stock/") && !hero.photo ? (
              <div
                className="w-full relative"
                style={{
                  aspectRatio: "3/4",
                  background: "var(--bg2)",
                  backgroundImage: `linear-gradient(135deg, rgba(var(--accent-rgb),0.08) 0%, rgba(var(--accent-rgb),0) 60%), repeating-linear-gradient(45deg, rgba(var(--accent-rgb),0.05) 0px, rgba(var(--accent-rgb),0.05) 1px, transparent 1px, transparent 14px)`,
                  border: "1px solid rgba(var(--accent-rgb),0.3)",
                }}
              >
                <div className="absolute bottom-4 left-4">
                  <div className="text-[10px] tracking-[0.08em]" style={{ color: "rgba(var(--accent-rgb),0.55)", fontFamily: "monospace" }}>
                    [ COACH PORTRAIT ]
                  </div>
                </div>
              </div>
            ) : (
              <img src={heroPhoto} alt={about.name} className="w-full object-cover" style={{ aspectRatio: "3/4" }} />
            )}
            <div
              className="absolute left-0 right-0 bottom-0 p-5"
              style={{ background: "linear-gradient(to top, var(--bg) 0%, rgba(var(--bg, 11,22,40),0.8) 50%, transparent 100%)" }}
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="font-bold text-[18px] tracking-wide" style={{ color: "var(--text)", fontFamily: "Montserrat, sans-serif" }}>
                    {about.name}
                  </div>
                  <div className="text-[11px] font-medium tracking-[0.2em] uppercase mt-1" style={{ color: "var(--accent)", fontFamily: "Inter, sans-serif" }}>
                    {about.title || "Head Coach"}
                  </div>
                </div>
                {(config.placements?.length ?? 0) > 0 && (
                  <div className="text-right">
                    <div className="font-extrabold text-[28px] leading-none" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
                      {config.placements!.length}+
                    </div>
                    <div className="text-[11px] font-medium tracking-[0.2em] uppercase mt-1" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
                      Placements
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
