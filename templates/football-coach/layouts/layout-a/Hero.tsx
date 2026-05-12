"use client"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

const OVERLAY_CLASS: Record<string, string> = {
  "field-lines": "field-lines scan-anim",
  "hex-grid": "hex-grid",
  "dot-grid": "dot-grid",
  "diagonal": "diagonal-stripes",
  "none": "",
}

function getTaglineLines(tagline: string): string[] {
  const parts = tagline.split(/\.\s+/).filter(Boolean)
  if (parts.length > 1) {
    return parts.map((p, i) => (i < parts.length - 1 ? p + "." : p))
  }
  const lastSpace = tagline.lastIndexOf(" ")
  if (lastSpace === -1) return [tagline]
  return [tagline.slice(0, lastSpace), tagline.slice(lastSpace + 1)]
}

export default function Hero({ config, onCTA }: { config: CoachConfig; onCTA?: () => void }) {
  const layout = config.design?.hero_layout ?? "full-bleed"
  const overlayKey = config.design?.hero_overlay ?? "field-lines"
  const overlayClass = OVERLAY_CLASS[overlayKey] ?? ""
  const taglineLines = getTaglineLines(config.copy_variants?.hero_tagline ?? "TRAIN HARD. PLAY HARD. WIN.")
  const coachName = config.about.name.replace(/^Coach\s+/i, "").toUpperCase()

  const eyebrow = (
    <div className="flex items-center gap-3 text-[var(--accent)] mb-6">
      <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
      <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm opacity-90">
        Coach · {config.about.city}, {config.about.state}
      </span>
    </div>
  )

  const taglineBlock = (
    <h1 className="font-bebas leading-[0.85] tracking-[0.01em] mb-6">
      <span className="block text-[var(--accent)] text-5xl sm:text-7xl md:text-8xl drop-shadow-[0_4px_20px_rgba(245,158,11,0.35)] opacity-95">
        {coachName}
      </span>
      {taglineLines.map((line, i) => (
        <span
          key={i}
          className={`block text-[16vw] sm:text-[12vw] md:text-[9.5vw] leading-[0.85] mt-2 ${
            i === taglineLines.length - 1 ? "accent-grad" : "metallic"
          }`}
        >
          {line}
        </span>
      ))}
    </h1>
  )

  const ctaButtons = (
    <div className="flex flex-wrap gap-4 items-center">
      <button
        onClick={onCTA}
        className="btn-gold inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-ink font-oswald font-semibold uppercase tracking-[0.18em] px-7 py-4 text-sm"
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
  )

  const statusBar = (
    <div className="flex items-end justify-between text-white/40 font-oswald uppercase tracking-[0.3em] text-[10px] sm:text-xs">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
        {config.copy_variants?.hero_availability ?? "Off-Season Roster · Now Open"}
      </div>
      <div className="hidden sm:block">Scroll ↓</div>
    </div>
  )

  // ── split-right layout ──
  if (layout === "split-right") {
    return (
      <section id="top" className="relative min-h-[100svh] overflow-hidden">
        {/* Photo — full bg on mobile, right pane on desktop */}
        <div className="absolute inset-0 md:left-auto md:right-0 md:w-[45%]">
          <img
            src={config.hero.photo as string}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
          />
          <div className="absolute inset-0 bg-ink/70 md:hidden" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-coal to-transparent" />
        </div>

        {/* Content pane */}
        <div className="relative z-10 min-h-[100svh] md:w-[55%] flex flex-col justify-end md:justify-center
                        px-5 sm:px-8 md:px-16 pt-40 pb-24 md:py-32 md:bg-coal">
          {overlayClass && (
            <div className={`absolute inset-0 ${overlayClass} opacity-30 pointer-events-none`} />
          )}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
          <div className="relative">
            {eyebrow}
            {taglineBlock}
            {config.hero.subline && (
              <p className="text-white/75 text-lg sm:text-xl max-w-xl mb-10">{config.hero.subline}</p>
            )}
            {ctaButtons}
          </div>
          <div className="relative mt-16">{statusBar}</div>
        </div>

        <div className="hidden md:flex absolute right-[47%] top-1/2 -translate-y-1/2 rotate-90 origin-center text-white/30 font-oswald uppercase tracking-[0.6em] text-xs">
          {config.about.county} County · {config.about.city}
        </div>
      </section>
    )
  }

  // ── centered-overlay layout ──
  if (layout === "centered-overlay") {
    return (
      <section id="top" className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={config.hero.photo as string}
            alt=""
            className="w-full h-full object-cover scale-105"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
          />
          <div className="absolute inset-0 bg-ink/80" />
        </div>
        {overlayClass && (
          <div className={`absolute inset-0 ${overlayClass} opacity-25 pointer-events-none`} />
        )}
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center pt-32 pb-24 w-full">
          <div className="flex items-center justify-center gap-3 text-[var(--accent)] mb-6">
            <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
            <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm opacity-90">
              Coach · {config.about.city}, {config.about.state}
            </span>
            <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
          </div>
          <h1 className="font-bebas leading-[0.85] tracking-[0.01em] mb-6">
            <span className="block text-[var(--accent)] text-5xl sm:text-7xl md:text-8xl opacity-95">
              {coachName}
            </span>
            {taglineLines.map((line, i) => (
              <span
                key={i}
                className={`block text-[14vw] sm:text-[10vw] md:text-[8vw] leading-[0.85] mt-2 ${
                  i === taglineLines.length - 1 ? "accent-grad" : "metallic"
                }`}
              >
                {line}
              </span>
            ))}
          </h1>
          {config.hero.subline && (
            <p className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto mb-10">{config.hero.subline}</p>
          )}
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <button
              onClick={onCTA}
              className="btn-gold inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-ink font-oswald font-semibold uppercase tracking-[0.18em] px-7 py-4 text-sm"
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

        <div className="absolute bottom-6 left-5 sm:left-8 right-5 sm:right-8">
          {statusBar}
        </div>
      </section>
    )
  }

  // ── full-bleed (default) ──
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        {config.hero.photo && (
          <img
            src={config.hero.photo as string}
            alt=""
            className="w-full h-full object-cover object-center scale-105"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
          />
        )}
        <div className="absolute inset-0 bg-ink/30" />
      </div>

      <div className="absolute inset-0 hero-vignette" />
      {overlayClass && (
        <div className={`absolute inset-0 ${overlayClass} opacity-40`} />
      )}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-center text-white/30 font-oswald uppercase tracking-[0.6em] text-xs">
        {config.about.county} County · {config.about.city}
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-40 sm:pt-48 pb-24 min-h-[100svh] flex flex-col justify-end">
        <div className="max-w-4xl">
          {eyebrow}
          {taglineBlock}
          {config.hero.subline && (
            <p className="text-white/75 text-lg sm:text-xl max-w-xl mb-10">{config.hero.subline}</p>
          )}
          {ctaButtons}
        </div>
      </div>

      <div className="absolute bottom-6 left-5 sm:left-8 right-5 sm:right-8">
        {statusBar}
      </div>
    </section>
  )
}
