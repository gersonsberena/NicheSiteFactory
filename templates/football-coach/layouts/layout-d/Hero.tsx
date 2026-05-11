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

export default function Hero({ config, onCTA }: Props) {
  const { name, city, state } = config.about ?? {}
  const { headline, subline, cta_text, photo } = config.hero ?? {}

  const location = [city, state].filter(Boolean).join(", ")

  return (
    <section id="top" className="relative min-h-screen pt-16 md:pt-20 flex items-end overflow-hidden bg-d-warmwhite">
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-0">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          {/* Left: editorial intro */}
          <div className="md:col-span-5 pb-12 md:pb-24">
            <div className="d-label-caps text-d-amber mb-6">
              A Coach&apos;s Story{location ? ` · ${location}` : ""}
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy leading-[1.02] text-5xl md:text-6xl lg:text-7xl tracking-[-0.01em]">
              {headline ?? "The Coach Who Builds More Than Players."}
            </h1>
            <p className="mt-7 text-lg text-d-ink/70 max-w-md leading-relaxed">
              {subline ?? "Private football coaching — quarterback development, recruiting prep, and film study built one athlete at a time."}
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

          {/* Right: hero portrait */}
          <div className="md:col-span-7 relative">
            <div className="relative">
              {photo ? (
                <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                  <Image
                    src={photo}
                    alt={`Coach ${name ?? ""}`}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 d-vignette" />
                </div>
              ) : (
                <div className="relative">
                  <PortraitPlaceholder className="w-full aspect-[4/5] md:aspect-[3/4]" />
                  <div className="absolute inset-0 d-vignette" />
                </div>
              )}

              {/* Caption overlay */}
              <div className="absolute left-6 bottom-6 md:left-10 md:bottom-10 max-w-xs">
                <div className="d-label-caps text-d-warmwhite/80 mb-2">Coach {name ?? ""}</div>
                <div className="font-[family-name:var(--font-playfair)] italic text-d-warmwhite text-lg md:text-xl leading-snug">
                  &ldquo;Every athlete I work with leaves the field a more thoughtful person than when they arrived.&rdquo;
                </div>
              </div>

              {/* Amber tab */}
              <div className="absolute -left-3 top-12 hidden md:block">
                <div className="bg-d-amber text-d-warmwhite px-3 py-1.5 d-label-caps text-[10px]">
                  PRIVATE COACHING
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
