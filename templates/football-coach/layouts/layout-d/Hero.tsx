import Image from "next/image"
import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
  onCTA: () => void
}

function PortraitPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden d-portrait-bg ${className}`}>
      <div className="absolute inset-0 d-grain opacity-40" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[140%] h-[42%] rounded-t-[40%] bg-black/30" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[35%] w-[34%] aspect-square rounded-full bg-black/35" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[58%] w-[42%] h-[5%] rounded-full bg-black/40" />
    </div>
  )
}

function PhotoBlock({ photo, name, layout, quote }: { photo?: string; name?: string; layout: string; quote?: string }) {
  const aspect = layout === "centered" ? "aspect-[3/2] md:aspect-[16/7]" : "aspect-[4/5] md:aspect-[3/4]"
  return (
    <div className="relative">
      {photo ? (
        <div className={`relative w-full ${aspect} overflow-hidden`}>
          <Image src={photo} alt={`Coach ${name ?? ""}`} fill className="object-cover object-top" priority />
          <div className="absolute inset-0 d-vignette" />
        </div>
      ) : (
        <div className="relative">
          <PortraitPlaceholder className={`w-full ${aspect}`} />
          <div className="absolute inset-0 d-vignette" />
        </div>
      )}
      <div className="absolute left-6 bottom-6 md:left-10 md:bottom-10 max-w-xs">
        <div className="d-label-caps text-d-warmwhite/80 mb-2">Coach {name ?? ""}</div>
        <div className="font-[family-name:var(--font-playfair)] italic text-d-warmwhite text-lg md:text-xl leading-snug">
          &ldquo;{quote ?? "Every athlete I work with leaves better than when they arrived."}&rdquo;
        </div>
      </div>
      <div className="absolute -left-3 top-12 hidden md:block">
        <div className="bg-d-amber text-d-warmwhite px-3 py-1.5 d-label-caps text-[10px]">
          PRIVATE COACHING
        </div>
      </div>
    </div>
  )
}

function HeroText({ config, onCTA }: { config: CoachConfig; onCTA: () => void }) {
  const { name, city, state } = config.about ?? {}
  const { headline, subline, cta_text } = config.hero ?? {}
  const location = [city, state].filter(Boolean).join(", ")
  return (
    <div className="pb-12 md:pb-24">
      <div className="d-label-caps text-d-amber mb-6">
        A Coach&apos;s Story{location ? ` · ${location}` : ""}
      </div>
      <h1 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy leading-[1.02] text-5xl md:text-6xl lg:text-7xl tracking-[-0.01em]">
        {headline ?? "The Coach Who Builds More Than Players."}
      </h1>
      <p className="mt-7 text-lg text-d-ink/70 max-w-md leading-relaxed">
        {subline ?? "Private coaching — personalized training built one athlete at a time."}
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <button
          onClick={onCTA}
          className="inline-flex items-center px-7 py-3.5 bg-d-navy text-d-warmwhite rounded-full d-label-caps hover:bg-d-navydeep transition-colors cursor-pointer"
        >
          {cta_text ?? "Book a Session"}
        </button>
        <a
          href="#about"
          className="inline-flex items-center px-7 py-3.5 border border-d-navy/30 text-d-navy rounded-full d-label-caps hover:border-d-navy transition-colors"
        >
          Read My Story
        </a>
      </div>
      <div className="mt-12 flex items-center gap-4 text-xs text-d-ink/50">
        <div className="h-px w-10 bg-d-ink/30" />
        <span className="font-mono tracking-widest">
          {config.about?.years_experience
            ? `${new Date().getFullYear() - config.about.years_experience}+`
            : "EST."}
          {" "}YEARS COACHING
        </span>
      </div>
    </div>
  )
}

export default function Hero({ config, onCTA }: Props) {
  const { name } = config.about ?? {}
  const { photo } = config.hero ?? {}
  const heroLayout = config.design?.d_hero_layout ?? "portrait-right"
  const aboutQuote = config.copy_variants?.about_quote

  if (heroLayout === "centered") {
    return (
      <section id="top" className="relative min-h-screen pt-16 md:pt-20 flex flex-col overflow-hidden bg-d-warmwhite">
        <div className="relative w-full max-w-4xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-12 text-center">
          <div className="d-label-caps text-d-amber mb-6">A Coach&apos;s Story</div>
          <h1 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy leading-[1.02] text-5xl md:text-6xl lg:text-7xl tracking-[-0.01em]">
            {config.hero?.headline ?? "The Coach Who Builds More Than Players."}
          </h1>
          <p className="mt-7 text-lg text-d-ink/70 max-w-xl mx-auto leading-relaxed">
            {config.hero?.subline ?? "Private coaching — personalized training built one athlete at a time."}
          </p>
          <div className="mt-9 flex flex-wrap gap-3 justify-center">
            <button
              onClick={onCTA}
              className="inline-flex items-center px-7 py-3.5 bg-d-navy text-d-warmwhite rounded-full d-label-caps hover:bg-d-navydeep transition-colors cursor-pointer"
            >
              {config.hero?.cta_text ?? "Book a Session"}
            </button>
            <a
              href="#about"
              className="inline-flex items-center px-7 py-3.5 border border-d-navy/30 text-d-navy rounded-full d-label-caps hover:border-d-navy transition-colors"
            >
              Read My Story
            </a>
          </div>
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-10 pb-0">
          <PhotoBlock photo={photo} name={name} layout="centered" quote={aboutQuote} />
        </div>
      </section>
    )
  }

  const isLeft = heroLayout === "portrait-left"

  return (
    <section id="top" className="relative min-h-screen pt-16 md:pt-20 flex items-end overflow-hidden bg-d-warmwhite">
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-0">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className={`md:col-span-5 ${isLeft ? "md:order-last" : ""}`}>
            <HeroText config={config} onCTA={onCTA} />
          </div>
          <div className={`md:col-span-7 relative ${isLeft ? "md:order-first" : ""}`}>
            <PhotoBlock photo={photo} name={name} layout="portrait" quote={aboutQuote} />
          </div>
        </div>
      </div>
    </section>
  )
}
