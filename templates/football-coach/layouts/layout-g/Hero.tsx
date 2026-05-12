"use client"
import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"

export default function Hero({ config, onCTA }: { config: CoachConfig; onCTA: () => void }) {
  const { about, hero, copy_variants } = config
  const heroPhoto = hero.photo || `/stock/${sportToKey(about.sport ?? "football")}/hero.jpg`
  const credentials = about.credentials ?? []

  return (
    <section id="top" className="pt-[68px]">
      <div className="relative min-h-[600px] flex items-end">
        {heroPhoto.startsWith("/stock/") && !hero.photo ? (
          <div className="absolute inset-0" style={{ background: "var(--bg2)" }} />
        ) : (
          <img src={heroPhoto} alt={about.name} className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.5)" }} />
        )}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 py-16 w-full">
          {/* EST. stamp */}
          <div
            className="absolute top-8 right-8 w-24 h-24 flex flex-col items-center justify-center hidden md:flex"
            style={{
              border: "2px solid rgba(var(--accent-rgb),0.7)",
              transform: "rotate(-15deg)",
              color: "rgba(var(--accent-rgb),0.7)",
            }}
          >
            <div className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ fontFamily: "Roboto Slab, serif" }}>EST.</div>
            <div className="text-[22px] font-bold" style={{ fontFamily: "Roboto Slab, serif" }}>
              {copy_variants?.est_year ?? new Date().getFullYear()}
            </div>
          </div>

          {credentials.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {credentials.map((c, i) => (
                <span key={i} className="px-3 py-1 text-[11px] font-semibold" style={{ background: "rgba(var(--accent-rgb),0.9)", color: "white", fontFamily: "Roboto, sans-serif", letterSpacing: "0.08em" }}>
                  {c}
                </span>
              ))}
            </div>
          )}
          <h1
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: "Roboto Slab, serif",
              fontSize: "clamp(36px, 6vw, 72px)",
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            {hero.headline || (
              <>{about.sport ?? "Sports"} Coaching<br />You Can Trust.</>
            )}
          </h1>
          <p className="text-[18px] mb-8 max-w-[50ch]" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Roboto, sans-serif", lineHeight: 1.6 }}>
            {hero.subline || `Private coaching in ${about.city}, ${about.state}. Building champions since day one.`}
          </p>
          <button onClick={onCTA} className="px-7 py-3.5 font-semibold text-[14px] transition-opacity"
            style={{ background: "var(--accent)", color: "white", fontFamily: "Roboto Slab, serif" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
          >
            {hero.cta_text || "Book a Free Consultation"}
          </button>
        </div>
      </div>
    </section>
  )
}
