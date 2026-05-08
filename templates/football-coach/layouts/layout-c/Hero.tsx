"use client"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

export default function Hero({ config, onCTA }: { config: CoachConfig; onCTA?: () => void }) {
  const photo = (config.hero.photo as string) || (config.about.photo as string)
  const nameParts = config.about.name.replace(/^Coach\s+/i, "").split(" ")
  const lastName = nameParts[nameParts.length - 1]
  const watermarkText = config.copy_variants?.c_hero_watermark_text || lastName

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* Watermark */}
      <div
        aria-hidden
        className="c-watermark absolute inset-0 flex items-center justify-center text-[20vw] leading-none pointer-events-none select-none z-0"
      >
        {watermarkText.toUpperCase()}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-24 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        {/* Text col — 7 of 12 */}
        <div className="md:col-span-7 reveal">
          <span className="c-label text-[#6B7280] block mb-4">
            {config.about.city}, {config.about.state} · {config.about.specialty}
          </span>
          <div className="c-rule-accent mb-6" />
          <h1 className="font-['Playfair_Display'] font-black text-5xl sm:text-6xl lg:text-7xl text-[#111827] leading-[1.0] tracking-tight">
            {config.hero.headline}
          </h1>
          <p className="mt-6 text-lg text-[#4B5563] max-w-xl leading-relaxed">
            {config.hero.subline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onCTA}
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white font-semibold px-6 py-3 transition-colors"
            >
              {config.hero.cta_text} <Icons.Arrow className="w-4 h-4" />
            </button>
            <a href="#about" className="c-text-link text-sm font-semibold text-[var(--accent)]">
              Learn about Coach {nameParts[0]}
            </a>
          </div>
          <div className="mt-10 flex items-center gap-2 text-xs c-label text-[#9CA3AF]">
            <Icons.Pin className="w-3 h-3" />
            {config.copy_variants?.hero_availability ?? "Sessions available now"}
          </div>
        </div>

        {/* Photo col — 5 of 12 */}
        <div className="md:col-span-5 reveal" style={{ transitionDelay: "120ms" }}>
          <div className="c-photo-frame aspect-[4/5] overflow-hidden">
            <img
              src={photo}
              alt={config.about.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs c-label text-[#6B7280]">
            <span>{config.about.title}</span>
            <span>Est. {new Date().getFullYear() - (config.about.years_experience ?? 0)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
