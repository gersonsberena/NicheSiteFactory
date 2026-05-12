import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"

export default function Hero({ config, onCTA }: { config: CoachConfig; onCTA: () => void }) {
  const { hero, about, copy_variants } = config
  const photoSrc = hero.photo || `/stock/${sportToKey(about.sport ?? "football")}/hero.jpg`

  return (
    <section id="top" className="pt-16 min-h-[90vh] flex flex-col" style={{ background: "var(--bg)" }}>
      <div className="flex-1 max-w-[1200px] mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 md:py-24">
        <div>
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>
            <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
            {about.sport ?? "Sports"} · {about.city}
          </div>
          <h1 className="font-bold leading-[1.1] mb-6" style={{ fontFamily: "DM Sans, sans-serif", color: "var(--text)", fontSize: "clamp(36px,5vw,60px)" }}>
            {hero.headline || `${about.name}`}
          </h1>
          {copy_variants?.hero_tagline && (
            <div className="text-[12px] font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 inline-block" style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>
              {copy_variants.hero_tagline}
            </div>
          )}
          <p className="text-[17px] leading-[1.7] mb-8" style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>
            {hero.subline || `Data-driven ${(about.sport ?? "sports").toLowerCase()} coaching in ${about.city}.`}
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={onCTA} className="px-8 py-3.5 font-semibold text-[14px]" style={{ background: "var(--accent)", color: "white", fontFamily: "DM Sans, sans-serif" }}>
              {hero.cta_text || "Book a Session"}
            </button>
            <a href="#about" className="px-8 py-3.5 font-semibold text-[14px] transition-colors" style={{ border: "1px solid rgba(var(--accent-rgb),0.3)", color: "var(--text)", fontFamily: "DM Sans, sans-serif" }}>
              View Data →
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden" style={{ background: "rgba(var(--accent-rgb),0.05)" }}>
            {photoSrc ? (
              <img src={photoSrc} alt={about.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(var(--accent-rgb),0.06)", fontFamily: "DM Mono, monospace", color: "var(--text-muted)", fontSize: "13px" }}>
                [ coach photo ]
              </div>
            )}
          </div>
          <div className="absolute bottom-6 right-6 px-4 py-3" style={{ background: "var(--accent)", color: "white" }}>
            <div className="text-[28px] font-bold leading-none" style={{ fontFamily: "DM Mono, monospace" }}>{about.years_experience ?? "10"}+</div>
            <div className="text-[10px] uppercase tracking-widest mt-1" style={{ fontFamily: "DM Sans, sans-serif" }}>Years Data</div>
          </div>
        </div>
      </div>
    </section>
  )
}
