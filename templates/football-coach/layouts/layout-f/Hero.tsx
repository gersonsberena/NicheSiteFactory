"use client"
import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"

export default function Hero({ config, onCTA }: { config: CoachConfig; onCTA: () => void }) {
  const { about, hero, copy_variants, stats } = config
  const heroPhoto = hero.photo || `/stock/${sportToKey(about.sport ?? "football")}/hero.jpg`
  const ghostWord = copy_variants?.ghost_word ?? about.sport?.toUpperCase().split(" ")[0] ?? "VELOCITY"

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-[68px]">
      {/* Background image */}
      <div className="absolute inset-0">
        {heroPhoto.startsWith("/stock/") && !hero.photo ? (
          <div
            className="w-full h-full"
            style={{
              background: "var(--bg2)",
              backgroundImage: `repeating-linear-gradient(45deg, rgba(var(--accent-rgb),0.03) 0px, rgba(var(--accent-rgb),0.03) 1px, transparent 1px, transparent 20px)`,
            }}
          />
        ) : (
          <img src={heroPhoto} alt={about.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.3)" }} />
        )}
      </div>

      {/* Ghost word */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        style={{
          fontFamily: "Barlow Condensed, sans-serif",
          fontSize: "clamp(120px, 18vw, 280px)",
          fontWeight: 900,
          letterSpacing: "-0.05em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(var(--accent-rgb),0.08)",
          textTransform: "uppercase",
          lineHeight: 0.9,
          paddingRight: "2vw",
        }}
      >
        {ghostWord}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 py-24">
        <div className="max-w-[700px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
            <span
              className="text-[11px] font-bold tracking-[0.3em] uppercase"
              style={{ color: "var(--accent)", fontFamily: "Barlow Condensed, sans-serif" }}
            >
              {copy_variants?.hero_tagline || `${about.sport ?? "Sports"} Performance Coach`}
            </span>
          </div>

          <h1
            className="font-black leading-[0.92] mb-8"
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              fontSize: "clamp(64px, 10vw, 120px)",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "var(--text)",
            }}
          >
            {hero.headline || (
              <>
                Train Like<br />
                <span style={{ color: "var(--accent)" }}>A Pro.</span>
              </>
            )}
          </h1>

          <p
            className="text-[18px] md:text-[20px] mb-10 max-w-[50ch]"
            style={{ color: "var(--text-muted)", fontFamily: "Barlow, sans-serif", lineHeight: 1.6 }}
          >
            {hero.subline || `Elite ${about.sport?.toLowerCase() ?? "sports"} training in ${about.city}, ${about.state}.`}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onCTA}
              className="px-8 py-4 text-[13px] font-bold tracking-[0.2em] uppercase transition-opacity"
              style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "Barlow Condensed, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            >
              {hero.cta_text || "Start Training"}
            </button>
            <a
              href="#about"
              className="text-[13px] font-semibold tracking-[0.2em] uppercase transition-colors"
              style={{ color: "var(--text-muted)", fontFamily: "Barlow Condensed, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
            >
              Learn More ↓
            </a>
          </div>

          {stats.length > 0 && (
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-md" style={{ borderTop: "1px solid rgba(var(--accent-rgb),0.2)", paddingTop: "32px" }}>
              {stats.slice(0, 3).map((s, i) => (
                <div key={i}>
                  <div
                    className="font-black text-[36px] leading-none"
                    style={{ fontFamily: "Barlow Condensed, sans-serif", color: "var(--accent)", letterSpacing: "-0.02em" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[11px] font-semibold tracking-[0.15em] uppercase mt-2" style={{ color: "var(--text-muted)", fontFamily: "Barlow Condensed, sans-serif" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Marquee strip */}
      {copy_variants?.marquee_text && (
        <div
          className="absolute bottom-0 left-0 right-0 overflow-hidden py-2"
          style={{ background: "var(--accent)", color: "var(--bg)" }}
        >
          <div
            className="flex gap-8 whitespace-nowrap text-[11px] font-black tracking-[0.25em] uppercase"
            style={{ fontFamily: "Barlow Condensed, sans-serif", animation: "marquee 20s linear infinite" }}
          >
            {Array(6).fill(copy_variants.marquee_text).map((text, i) => (
              <span key={i}>{text} ★</span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
