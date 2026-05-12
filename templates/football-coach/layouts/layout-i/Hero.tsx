import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"

export default function Hero({ config, onCTA }: { config: CoachConfig; onCTA: () => void }) {
  const { hero, about, copy_variants } = config
  const photoSrc = hero.photo || `/stock/${sportToKey(about.sport ?? "football")}/hero.jpg`

  return (
    <section id="top" className="relative min-h-screen flex items-end" style={{ background: "var(--bg)" }}>
      <div className="absolute inset-0">
        {photoSrc && <img src={photoSrc} alt={about.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.45)" }} />}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(var(--bg-rgb,10,8,6),0.9) 0%, rgba(var(--bg-rgb,10,8,6),0.3) 60%, transparent 100%)" }} />
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 w-full pb-20 md:pb-28">
        <div className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-6" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Source Sans 3, sans-serif" }}>
          Chapter I — {about.sport ?? "Sports"} · {about.city}
        </div>
        <h1 className="font-bold mb-6 leading-[1.05]" style={{ fontFamily: "Playfair Display, serif", color: "white", fontSize: "clamp(40px,6vw,80px)", maxWidth: "900px" }}>
          {hero.headline || about.name}
        </h1>
        {copy_variants?.hero_tagline && (
          <p className="text-[16px] mb-4 italic" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Playfair Display, serif", maxWidth: "600px" }}>
            "{copy_variants.hero_tagline}"
          </p>
        )}
        <p className="text-[17px] mb-10 leading-[1.7]" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Source Sans 3, sans-serif", maxWidth: "600px" }}>
          {hero.subline || `Elite ${(about.sport ?? "sports").toLowerCase()} coaching in ${about.city}.`}
        </p>
        <button onClick={onCTA} className="px-8 py-4 font-semibold text-[15px]" style={{ background: "var(--accent)", color: "white", fontFamily: "Source Sans 3, sans-serif" }}>
          {hero.cta_text || "Begin Training"}
        </button>
      </div>
    </section>
  )
}
