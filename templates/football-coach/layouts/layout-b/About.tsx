import type { CoachConfig } from "@/lib/useConfig"

function Credentials({ config }: { config: CoachConfig }) {
  const creds = (config.about.credentials as string[] | undefined) ?? []
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {creds.map((c: string, i: number) => (
        <span key={i} className="inline-flex items-center gap-1.5 bg-[var(--b-primary-50)] text-[var(--b-primary-800)] text-sm font-semibold px-3 py-1.5 rounded-full border border-[var(--b-primary-100)]">
          {c}
        </span>
      ))}
      {config.about.years_experience && (
        <span className="inline-flex items-center gap-1.5 bg-[var(--b-primary-50)] text-[var(--b-primary-800)] text-sm font-semibold px-3 py-1.5 rounded-full border border-[var(--b-primary-100)]">
          {config.about.years_experience}+ Years Experience
        </span>
      )}
    </div>
  )
}

function splitBio(bio: string): [string, string] {
  const mid = Math.floor(bio.length / 2)
  const breakAt = bio.indexOf(" ", mid)
  return breakAt > 0 ? [bio.slice(0, breakAt), bio.slice(breakAt + 1)] : [bio, ""]
}

export default function About({ config }: { config: CoachConfig }) {
  const layout = config.design?.b_about_layout ?? "centered-stack"

  if (layout === "photo-left") return <AboutPhotoSide config={config} photoSide="left" />
  if (layout === "photo-right") return <AboutPhotoSide config={config} photoSide="right" />
  return <AboutCenteredStack config={config} />
}

/* ── Variant: centered-stack (default) ─────────────────────── */
function AboutCenteredStack({ config }: { config: CoachConfig }) {
  const bio = config.about.bio ?? ""
  const [bioPart1, bioPart2] = splitBio(bio)
  const quote =
    (config.copy_variants?.about_tagline as string | undefined) ??
    `"I'm not raising ${(config.about.sport ?? "football").toLowerCase()} players. I'm raising young people who happen to play."`

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <div className="mx-auto w-[150px] h-[150px] rounded-full overflow-hidden ring-4 ring-[var(--b-primary-50)] shadow-[var(--shadow-card)]">
          <img
            src={config.about.photo as string}
            alt={config.about.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const el = e.target as HTMLImageElement
              el.style.display = "none"
              el.parentElement!.style.background = "var(--b-primary-600)"
            }}
          />
        </div>
        <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-primary-700)]">
          Meet Your Coach
        </div>
        <h2 className="font-poppins font-extrabold text-3xl md:text-5xl mt-3 tracking-tight leading-tight text-[#1A1A1A]">
          Coaching the athlete first,<br className="hidden sm:block" /> the player second.
        </h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8 text-left text-[#1A1A1A]/75 leading-relaxed">
          <p>{bioPart1}</p>
          {bioPart2 && <p>{bioPart2}</p>}
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-0">
          <Credentials config={config} />
        </div>
        <p className="mt-8 italic text-[var(--b-primary-700)] font-poppins font-semibold text-lg">
          {quote}
        </p>
      </div>
    </section>
  )
}

/* ── Variant: photo-left / photo-right ──────────────────────── */
function AboutPhotoSide({ config, photoSide }: { config: CoachConfig; photoSide: "left" | "right" }) {
  const bio = config.about.bio ?? ""
  const [bioPart1, bioPart2] = splitBio(bio)
  const quote =
    (config.copy_variants?.about_tagline as string | undefined) ??
    `"I'm not raising ${(config.about.sport ?? "football").toLowerCase()} players. I'm raising young people who happen to play."`

  const photoCol = (
    <div className="relative">
      <div className="rounded-3xl overflow-hidden aspect-[3/4] bg-[var(--b-primary-600)] shadow-[var(--shadow-card-hover)]">
        <img
          src={config.about.photo as string}
          alt={config.about.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const el = e.target as HTMLImageElement
            el.style.display = "none"
            el.parentElement!.style.background = "var(--b-primary-600)"
          }}
        />
      </div>
      {/* Accent block behind photo */}
      <div
        className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl -z-10"
        style={{ background: "rgba(var(--b-accent-rgb),0.15)" }}
      />
    </div>
  )

  const textCol = (
    <div className="flex flex-col justify-center">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-primary-700)]">
        Meet Your Coach
      </div>
      <h2 className="font-poppins font-extrabold text-3xl md:text-4xl lg:text-5xl mt-3 tracking-tight leading-tight text-[#1A1A1A]">
        {config.about.name}
      </h2>
      {config.about.title && (
        <div className="mt-2 text-[var(--b-primary-600)] font-semibold">{config.about.title as string}</div>
      )}
      <p className="mt-6 text-[#1A1A1A]/75 leading-relaxed">{bioPart1}</p>
      {bioPart2 && <p className="mt-4 text-[#1A1A1A]/75 leading-relaxed">{bioPart2}</p>}
      <Credentials config={config} />
      <blockquote className="mt-8 pl-5 border-l-4 border-[var(--b-accent)] italic text-[var(--b-primary-700)] font-poppins font-semibold text-lg leading-relaxed">
        {quote}
      </blockquote>
    </div>
  )

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {photoSide === "left" ? (
            <>
              {photoCol}
              {textCol}
            </>
          ) : (
            <>
              <div className="order-2 md:order-1">{textCol}</div>
              <div className="order-1 md:order-2">{photoCol}</div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
