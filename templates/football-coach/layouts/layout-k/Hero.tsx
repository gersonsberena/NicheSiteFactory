import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"

export default function Hero({ config, onCTA }: { config: CoachConfig; onCTA: () => void }) {
  const { hero, about, copy_variants } = config
  const photoSrc = hero.photo || `/stock/${sportToKey(about.sport ?? "football")}/hero.jpg`

  return (
    <section id="top" className="relative min-h-screen flex items-center" style={{ background: "var(--bg)" }}>
      {/* Dot grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(var(--accent-rgb),0.12) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-16 py-24">
        <div>
          <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6 flex items-center gap-3" style={{ color: "rgba(var(--accent-rgb),0.7)", fontFamily: "Space Grotesk, sans-serif" }}>
            <div className="w-1 h-1" style={{ background: "var(--accent)" }} />
            {about.sport ?? "Sports"} · {about.city}
          </div>
          <h1 className="font-bold mb-6 leading-[1.05]" style={{ fontFamily: "Space Grotesk, sans-serif", color: "white", fontSize: "clamp(36px,5vw,64px)" }}>
            {hero.headline || about.name}
          </h1>
          {copy_variants?.hero_tagline && (
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5 inline-block px-3 py-1" style={{ border: "1px solid rgba(var(--accent-rgb),0.4)", color: "var(--accent)", fontFamily: "Space Grotesk, sans-serif" }}>
              {copy_variants.hero_tagline}
            </div>
          )}
          <p className="text-[16px] leading-[1.7] mb-8" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}>
            {hero.subline || `Precision ${(about.sport ?? "sports").toLowerCase()} coaching in ${about.city}.`}
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={onCTA} className="px-8 py-3.5 font-semibold text-[13px] uppercase tracking-[0.1em]" style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "Space Grotesk, sans-serif" }}>
              {hero.cta_text || "Book Now"}
            </button>
            <a href="#about" className="px-8 py-3.5 font-semibold text-[13px] uppercase tracking-[0.1em]" style={{ border: "1px solid rgba(var(--accent-rgb),0.3)", color: "rgba(255,255,255,0.7)", fontFamily: "Space Grotesk, sans-serif" }}>
              Learn More
            </a>
          </div>
        </div>
        <div className="relative">
          {/* Corner ticks */}
          <div className="absolute -top-3 -left-3 w-6 h-6" style={{ borderTop: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)" }} />
          <div className="absolute -top-3 -right-3 w-6 h-6" style={{ borderTop: "2px solid var(--accent)", borderRight: "2px solid var(--accent)" }} />
          <div className="absolute -bottom-3 -left-3 w-6 h-6" style={{ borderBottom: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)" }} />
          <div className="absolute -bottom-3 -right-3 w-6 h-6" style={{ borderBottom: "2px solid var(--accent)", borderRight: "2px solid var(--accent)" }} />
          <div className="aspect-[3/4] overflow-hidden" style={{ background: "rgba(var(--accent-rgb),0.05)" }}>
            {photoSrc ? (
              <img src={photoSrc} alt={about.name} className="w-full h-full object-cover" style={{ filter: "grayscale(20%)" }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[12px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk, sans-serif" }}>[ photo ]</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
