import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"
import Blob from "./Blob"

export default function Hero({ config, onCTA }: { config: CoachConfig; onCTA: () => void }) {
  const { about, hero, copy_variants } = config
  const tagline = copy_variants?.hero_tagline ?? "ELITE COACHING. ELITE RESULTS."
  const sportKey = sportToKey(about.sport ?? "football")
  const photoSrc = hero?.photo ?? `/stock/${sportKey}/hero.jpg`

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--bg)" }}>
      <Blob x="20%" y="30%" size={600} color="var(--accent)" />
      <Blob x="80%" y="60%" size={500} color="rgba(99,102,241,0.8)" />
      <Blob x="50%" y="85%" size={400} color="rgba(var(--accent-rgb),0.6)" />

      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(var(--accent-rgb),0.08) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.2)" }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
              {copy_variants?.hero_availability ?? "Now Accepting Athletes"}
            </span>
          </div>
          <h1 className="font-bold leading-[1.05] mb-4"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(40px,6vw,76px)" }}>
            <span style={{ background: "linear-gradient(135deg, white 0%, rgba(255,255,255,0.7) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {hero?.headline ?? about.name}
            </span>
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] mb-6"
            style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
            {tagline}
          </p>
          <p className="text-[16px] leading-[1.7] mb-10" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "DM Sans, sans-serif", maxWidth: "480px" }}>
            {hero?.subline ?? `${about.title ?? "Coach"} · ${about.specialty ?? "Player Development"}`}
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={onCTA}
              className="px-7 py-3.5 font-semibold text-[14px] rounded-full transition-all duration-200"
              style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "DM Sans, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "none")}>
              {hero?.cta_text || "Start Training"}
            </button>
            <a href="#about"
              className="px-7 py-3.5 font-semibold text-[14px] rounded-full transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontFamily: "DM Sans, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)")}>
              Learn More
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(var(--accent-rgb),0.2), 0 30px 60px rgba(0,0,0,0.5)" }}>
            <img src={photoSrc} alt={about.name} className="w-full object-cover" style={{ aspectRatio: "4/5", filter: "brightness(0.9)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(9,9,11,0.6) 0%, transparent 50%)" }} />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-xl px-5 py-3"
            style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-[22px] font-bold" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>{about.years_experience ?? "10"}+</div>
            <div className="text-[11px] uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "DM Sans, sans-serif" }}>Years Coaching</div>
          </div>
          <div className="absolute top-6 -right-4 rounded-xl px-5 py-3"
            style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-[22px] font-bold" style={{ color: "white", fontFamily: "DM Sans, sans-serif" }}>{about.city}</div>
            <div className="text-[11px] uppercase tracking-[0.15em]" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>{about.sport ?? "Sports"}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
