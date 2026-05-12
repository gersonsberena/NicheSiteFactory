import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"

export default function Hero({ config, onCTA }: { config: CoachConfig; onCTA: () => void }) {
  const { about, hero, copy_variants } = config
  const tagline = copy_variants?.hero_tagline ?? "ELITE COACHING. ELITE RESULTS."
  const sportKey = sportToKey(about.sport ?? "football")
  const photoSrc = hero?.photo ?? `/stock/${sportKey}/hero.jpg`

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="absolute inset-0">
        <img src={photoSrc} alt={about.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.45)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,11,9,1) 0%, rgba(13,11,9,0.4) 50%, transparent 100%)" }} />
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 pb-20 w-full">
        <div className="max-w-[640px]">
          <div className="text-[11px] font-bold uppercase tracking-[0.35em] mb-6" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
            {String("01").padStart(2, "0")} — {about.sport ?? "Sports"} · {about.city}
          </div>
          <h1 className="font-bold leading-[1.05] mb-6"
            style={{ fontFamily: "DM Serif Display, serif", color: "white", fontSize: "clamp(42px,7vw,88px)" }}>
            {hero?.headline ?? about.name}
          </h1>
          <p className="text-[16px] italic leading-[1.6] mb-8" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "DM Serif Display, serif" }}>
            &ldquo;{tagline}&rdquo;
          </p>
          <p className="text-[15px] leading-[1.7] mb-10" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "DM Sans, sans-serif", maxWidth: "480px" }}>
            {hero?.subline ?? `${about.title ?? "Coach"} · ${about.specialty ?? "Player Development"}`}
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={onCTA}
              className="px-7 py-3.5 font-medium text-[14px] transition-all duration-200"
              style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "DM Sans, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}>
              {hero?.cta_text || "Start Training"}
            </button>
            <a href="#about"
              className="px-7 py-3.5 font-medium text-[14px] transition-all duration-200"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", fontFamily: "DM Sans, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.5)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.2)")}>
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
