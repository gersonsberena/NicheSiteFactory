"use client"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

export default function Hero({ config, onCTA }: { config: CoachConfig; onCTA?: () => void }) {
  const layout = config.design?.b_hero_layout ?? "split-left"
  const firstName = config.about.name.replace(/^Coach\s+/i, "").split(" ")[0]
  const trustStat = (config.stats as Array<{ value: string; label: string }>)?.[0]
  const photo = (config.hero.photo as string) || (config.about.photo as string)

  if (layout === "centered-overlay") return <HeroCenteredOverlay config={config} onCTA={onCTA} firstName={firstName} trustStat={trustStat} photo={photo} />
  if (layout === "full-bleed-text") return <HeroFullBleedText config={config} onCTA={onCTA} firstName={firstName} trustStat={trustStat} />
  return <HeroSplitLeft config={config} onCTA={onCTA} firstName={firstName} trustStat={trustStat} photo={photo} />
}

type SharedProps = {
  config: CoachConfig
  onCTA?: () => void
  firstName: string
  trustStat?: { value: string; label: string }
  photo?: string
}

/* ── Variant: split-left (default) ─────────────────────────── */
function HeroSplitLeft({ config, onCTA, firstName, trustStat, photo }: SharedProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Photo column */}
        <div className="relative order-1">
          <div className="absolute -inset-6 sm:-inset-10 -z-10">
            <div className="blob bg-[var(--b-primary-100)] w-full h-full" />
          </div>
          <div
            className="absolute -bottom-4 -right-2 w-24 h-24 rounded-full -z-10 hidden sm:block"
            style={{ background: "rgba(var(--b-accent-rgb),0.9)" }}
          />
          <div className="rounded-[28px] overflow-hidden shadow-[var(--shadow-card)] aspect-[4/5] bg-[var(--b-primary-600)]">
            <img
              src={photo}
              alt={config.about.name}
              className="w-full h-full object-cover"
              onError={(e) => { ;(e.target as HTMLImageElement).style.background = "var(--b-primary-600)" }}
            />
          </div>
          {trustStat && (
            <div className="absolute -bottom-5 left-4 sm:left-8 bg-white rounded-2xl shadow-[var(--shadow-card)] px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full grid place-items-center text-[var(--b-accent-dim)]" style={{ background: "rgba(var(--b-accent-rgb),0.15)" }}>
                <Icons.Star className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-poppins font-semibold text-[#1A1A1A] leading-tight">{trustStat.value} {trustStat.label}</div>
                <div className="text-xs text-[#1A1A1A]/60">in {config.about.county} County</div>
              </div>
            </div>
          )}
        </div>

        {/* Text column */}
        <div className="order-2 pt-6 md:pt-0">
          <div className="inline-flex items-center gap-2 text-[var(--b-primary-700)] bg-[var(--b-primary-50)] border border-[var(--b-primary-100)] px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
            <Icons.Pin className="w-4 h-4" />
            {config.about.city}, {config.about.state}
          </div>
          <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] mt-5 leading-[1.05] tracking-tight">
            {config.hero.headline.split(".")[0]}
            <br />
            <span className="text-[var(--b-primary-700)]">On and Off</span> the Field.
          </h1>
          <p className="mt-5 text-lg text-[#1A1A1A]/70 max-w-xl leading-relaxed">{config.hero.subline}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={onCTA}
              className="inline-flex items-center gap-2 bg-[var(--b-primary-600)] hover:bg-[var(--b-primary-700)] active:bg-[var(--b-primary-800)] text-white font-semibold px-5 py-3 rounded-xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all"
            >
              {config.hero.cta_text} <Icons.Arrow className="w-4 h-4" />
            </button>
            <a href="#about" className="inline-flex items-center gap-2 text-[var(--b-primary-700)] hover:text-[var(--b-primary-800)] font-semibold px-4 py-2 rounded-lg hover:bg-[var(--b-primary-50)] transition">
              Meet Coach {firstName}
            </a>
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm text-[#1A1A1A]/60">
            <div className="flex -space-x-2">
              {(["var(--b-primary-600)", "var(--b-primary-700)", "var(--b-accent)", "var(--b-primary-800)"] as string[]).map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full ring-2 ring-white" style={{ background: c }} />
              ))}
            </div>
            <span>{config.copy_variants?.hero_availability ?? "Sessions filling now"}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Variant: centered-overlay ──────────────────────────────── */
function HeroCenteredOverlay({ config, onCTA, firstName, trustStat, photo }: SharedProps) {
  return (
    <section id="top" className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src={photo}
          alt={config.about.name}
          className="w-full h-full object-cover object-top"
          onError={(e) => { ;(e.target as HTMLImageElement).style.display = "none" }}
        />
        <div className="absolute inset-0 bg-[var(--b-primary-800)] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--b-primary-800)] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-6">
          <Icons.Pin className="w-4 h-4" />
          {config.about.city}, {config.about.state}
        </div>
        <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.05] tracking-tight">
          {config.hero.headline.split(".")[0]}.
          <br />
          <span style={{ color: "var(--b-accent)" }}>Here for your family.</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
          {config.hero.subline}
        </p>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
          <button
            onClick={onCTA}
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg transition-all"
            style={{ background: "var(--b-accent)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--b-accent-hi)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--b-accent)")}
          >
            {config.hero.cta_text} <Icons.Arrow className="w-4 h-4" />
          </button>
          <a href="#about" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold px-5 py-3 rounded-xl border border-white/30 hover:border-white/60 transition-colors">
            Meet Coach {firstName}
          </a>
        </div>

        {trustStat && (
          <div className="mt-12 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3">
            <div className="w-9 h-9 rounded-full grid place-items-center" style={{ background: "rgba(var(--b-accent-rgb),0.25)" }}>
              <Icons.Trophy className="w-5 h-5" style={{ color: "var(--b-accent)" }} />
            </div>
            <span className="text-white font-semibold">{trustStat.value} {trustStat.label}</span>
            <span className="text-white/50 text-sm">· {config.about.county} County</span>
          </div>
        )}
      </div>
    </section>
  )
}

/* ── Variant: full-bleed-text ───────────────────────────────── */
function HeroFullBleedText({ config, onCTA, firstName, trustStat }: SharedProps) {
  return (
    <section id="top" className="relative overflow-hidden bg-[var(--b-primary-700)]">
      {/* Dot-grid pattern */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      {/* Accent blob */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: "var(--b-accent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-24 md:py-36">
        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-8">
          <Icons.Pin className="w-4 h-4" />
          {config.about.city}, {config.about.state}
        </div>
        <h1 className="font-poppins font-extrabold text-5xl sm:text-6xl lg:text-8xl text-white leading-[1.0] tracking-tight max-w-4xl">
          {config.hero.headline.split(".")[0]}.
          <br />
          <span style={{ color: "var(--b-accent)" }}>Your community.</span>
        </h1>
        <p className="mt-8 text-xl text-white/70 max-w-xl leading-relaxed">
          {config.hero.subline}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={onCTA}
            className="inline-flex items-center gap-2 bg-white text-[var(--b-primary-700)] font-poppins font-semibold px-6 py-3.5 rounded-xl hover:bg-white/90 shadow-lg transition-all"
          >
            {config.hero.cta_text} <Icons.Arrow className="w-4 h-4" />
          </button>
          <a href="#about" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold px-5 py-3 rounded-xl border border-white/30 hover:border-white/60 transition-colors">
            Meet Coach {firstName}
          </a>
        </div>

        {trustStat && (
          <div className="mt-16 flex flex-wrap gap-8">
            <div>
              <div className="font-poppins font-extrabold text-4xl" style={{ color: "var(--b-accent)" }}>{trustStat.value}</div>
              <div className="text-white/60 text-sm mt-1">{trustStat.label}</div>
            </div>
            {(config.stats as Array<{ value: string; label: string }>)?.slice(1, 3).map((s, i) => (
              <div key={i}>
                <div className="font-poppins font-extrabold text-4xl" style={{ color: "var(--b-accent)" }}>{s.value}</div>
                <div className="text-white/60 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
