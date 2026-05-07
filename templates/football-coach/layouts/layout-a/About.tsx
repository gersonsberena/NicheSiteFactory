"use client"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

const PHOTO_CLASS: Record<string, string> = {
  "grayscale-hover": "grayscale-[20%] group-hover:grayscale-0 transition duration-700",
  "always-color": "",
  "duotone": "photo-duotone",
  "high-contrast": "photo-high-contrast",
}

function renderTagline(tagline: string) {
  const parts = tagline.split(/\.\s+/).filter(Boolean)
  if (parts.length > 1) {
    const lines = parts.map((p, i) => (i < parts.length - 1 ? p + "." : p))
    return (
      <>
        {lines.map((line, i) => (
          <span key={i} className={i === lines.length - 1 ? "accent-grad" : "text-white"}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </>
    )
  }
  const lastSpace = tagline.lastIndexOf(" ")
  if (lastSpace === -1) return <span className="accent-grad">{tagline}</span>
  return (
    <>
      <span className="text-white">{tagline.slice(0, lastSpace + 1)}</span>
      <span className="accent-grad">{tagline.slice(lastSpace + 1)}</span>
    </>
  )
}

export default function About({ config }: { config: CoachConfig }) {
  const frame = config.design?.about_frame ?? "bordered-offset"
  const photoTreatment = config.design?.photo_treatment ?? "grayscale-hover"
  const photoClass = PHOTO_CLASS[photoTreatment] ?? ""
  const rawTagline = config.copy_variants?.about_tagline ?? "BUILT IN THE TRENCHES. FORGED FOR THE SPOTLIGHT."

  const copyBlock = (
    <div className="lg:col-span-7 reveal">
      <div className="flex items-center gap-3 text-[var(--accent)] mb-5">
        <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
        <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm opacity-90">About the Coach</span>
      </div>

      <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight mb-6">
        {renderTagline(rawTagline)}
      </h2>

      <div className="space-y-5 text-white/75 text-lg leading-relaxed max-w-2xl">
        <p>{config.about.bio}</p>
      </div>

      <blockquote className="mt-10 border-l-2 border-[var(--accent)] pl-6 py-2 font-oswald italic text-[var(--accent)] text-xl sm:text-2xl tracking-wide max-w-xl">
        &ldquo;Champions aren't made on Friday nights. They're made every single day before.&rdquo;
      </blockquote>

      <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm font-oswald uppercase tracking-[0.22em] text-white/70">
        {(config.about.credentials as string[] | undefined ?? []).map((cred, i) => (
          <div key={i} className="flex items-center gap-2">
            <Icons.Check className="w-4 h-4 text-[var(--accent)]" /> {cred}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Icons.Check className="w-4 h-4 text-[var(--accent)]" /> {config.about.years_experience} Years Coaching
        </div>
      </div>
    </div>
  )

  // minimal-frame
  if (frame === "minimal-frame") {
    return (
      <section id="about" className="relative bg-ink py-24 sm:py-32 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[rgba(var(--accent-rgb),0.08)] blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 reveal">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0">
              <div className="absolute bottom-0 left-0 w-1 h-3/4 bg-[var(--accent)]" />
              <div className="absolute bottom-0 left-0 w-3/4 h-1 bg-[var(--accent)]" />
              <div className="relative w-full h-full overflow-hidden bg-smoke ml-3 mb-3 group">
                <img
                  src={config.about.photo}
                  alt={config.about.name}
                  className={`w-full h-full object-cover ${photoClass}`}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-bebas text-3xl tracking-wide text-white leading-none">
                    {config.about.name.toUpperCase()}
                  </div>
                  <div className="font-oswald uppercase tracking-[0.3em] text-[var(--accent)] text-[10px] mt-1">
                    {config.about.title ?? "Head Performance Coach"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {copyBlock}
        </div>
      </section>
    )
  }

  // full-bleed
  if (frame === "full-bleed") {
    return (
      <section id="about" className="relative bg-ink py-24 sm:py-32 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[rgba(var(--accent-rgb),0.08)] blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 reveal">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden bg-smoke group">
              <img
                src={config.about.photo}
                alt={config.about.name}
                className={`w-full h-full object-cover ${photoClass}`}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
                <div className="font-bebas text-3xl tracking-wide text-white leading-none">
                  {config.about.name.toUpperCase()}
                </div>
                <div className="font-oswald uppercase tracking-[0.3em] text-[var(--accent)] text-[10px] mt-1">
                  {config.about.title ?? "Head Performance Coach"}
                </div>
              </div>
            </div>
          </div>
          {copyBlock}
        </div>
      </section>
    )
  }

  // circular
  if (frame === "circular") {
    return (
      <section id="about" className="relative bg-ink py-24 sm:py-32 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[rgba(var(--accent-rgb),0.08)] blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 reveal flex flex-col items-center lg:items-start gap-6">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              <div className="absolute -inset-3 rounded-full border border-[rgba(var(--accent-rgb),0.3)]" />
              <div className="w-full h-full rounded-full overflow-hidden bg-smoke ring-2 ring-[var(--accent)] ring-offset-4 ring-offset-ink group">
                <img
                  src={config.about.photo}
                  alt={config.about.name}
                  className={`w-full h-full object-cover object-top ${photoClass}`}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                />
              </div>
            </div>
            <div className="text-center lg:text-left">
              <div className="font-bebas text-3xl tracking-wide text-white leading-none">
                {config.about.name.toUpperCase()}
              </div>
              <div className="font-oswald uppercase tracking-[0.3em] text-[var(--accent)] text-[10px] mt-1">
                {config.about.title ?? "Head Performance Coach"}
              </div>
            </div>
          </div>
          {copyBlock}
        </div>
      </section>
    )
  }

  // bordered-offset (default)
  return (
    <section id="about" className="relative bg-ink py-24 sm:py-32 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[rgba(var(--accent-rgb),0.08)] blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5 reveal">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 group">
            <div className="absolute -inset-2 border border-[rgba(var(--accent-rgb),0.3)] -translate-x-3 -translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
            <div className="relative w-full h-full overflow-hidden bg-smoke">
              <img
                src={config.about.photo}
                alt={config.about.name}
                className={`w-full h-full object-cover ${photoClass}`}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="font-bebas text-3xl tracking-wide text-white leading-none">
                    {config.about.name.toUpperCase()}
                  </div>
                  <div className="font-oswald uppercase tracking-[0.3em] text-[var(--accent)] text-[10px] mt-1">
                    {config.about.title ?? "Head Performance Coach"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {copyBlock}
      </div>
    </section>
  )
}
