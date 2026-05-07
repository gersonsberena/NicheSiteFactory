"use client"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

export default function Hero({ config, onCTA }: { config: CoachConfig; onCTA?: () => void }) {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src={config.hero.photo as string}
          alt=""
          className="w-full h-full object-cover object-center scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
        />
        <div className="absolute inset-0 bg-ink/30" />
      </div>

      {/* Layered overlays */}
      <div className="absolute inset-0 hero-vignette" />
      <div className="absolute inset-0 field-lines opacity-40 scan-anim" />
      <div className="absolute inset-0 scanlines pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      {/* Side label */}
      <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-center text-white/30 font-oswald uppercase tracking-[0.6em] text-xs">
        {config.about.county} County · {config.about.city}
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-40 sm:pt-48 pb-24 min-h-[100svh] flex flex-col justify-end">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-gold/90 mb-6">
            <span className="inline-block h-[2px] w-10 bg-gold" />
            <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm">
              Coach · {config.about.city}, FL
            </span>
          </div>

          {/* Name + headline */}
          <h1 className="font-bebas leading-[0.85] tracking-[0.01em] mb-6">
            <span className="block text-gold/95 text-5xl sm:text-7xl md:text-8xl drop-shadow-[0_4px_20px_rgba(245,158,11,0.35)]">
              {config.about.name.replace(/^Coach\s+/i, "").toUpperCase()}
            </span>
            <span className="block metallic text-[16vw] sm:text-[12vw] md:text-[9.5vw] leading-[0.85] mt-2">
              TRAIN HARD.
            </span>
            <span className="block metallic text-[16vw] sm:text-[12vw] md:text-[9.5vw] leading-[0.85]">
              PLAY HARD.
            </span>
            <span className="block gold-grad text-[16vw] sm:text-[12vw] md:text-[9.5vw] leading-[0.85]">
              WIN.
            </span>
          </h1>

          <p className="text-white/75 text-lg sm:text-xl max-w-xl mb-10">
            {config.hero.subline}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={onCTA}
              className="btn-gold inline-flex items-center gap-2 bg-gold hover:bg-goldhi text-ink font-oswald font-semibold uppercase tracking-[0.18em] px-7 py-4 text-sm"
            >
              {config.hero.cta_text} <Icons.Arrow className="w-4 h-4" />
            </button>
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-ghost inline-flex items-center gap-2 border border-white/30 text-white font-oswald font-semibold uppercase tracking-[0.18em] px-7 py-4 text-sm"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Bottom status */}
      <div className="absolute bottom-6 left-5 sm:left-8 right-5 sm:right-8 flex items-end justify-between text-white/40 font-oswald uppercase tracking-[0.3em] text-[10px] sm:text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          Off-Season Roster · Now Open
        </div>
        <div className="hidden sm:block">Scroll ↓</div>
      </div>
    </section>
  )
}
