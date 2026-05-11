import Image from "next/image"
import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
}

function PhotoPlaceholder({ variant = 1 }: { variant?: number }) {
  const cls = variant === 2 ? "d-portrait-bg-2" : "d-portrait-bg"
  return (
    <div className={`relative overflow-hidden ${cls} w-full h-full`}>
      <div className="absolute inset-0 d-grain opacity-40" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[140%] h-[40%] rounded-t-[40%] bg-black/30" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[32%] w-[30%] aspect-square rounded-full bg-black/35" />
    </div>
  )
}

export default function About({ config }: Props) {
  const { name, bio, years_experience, specialty, photo } = config.about ?? {}
  const pullQuote = config.copy_variants?.about_quote

  const facts = [
    years_experience ? `${years_experience}+ Years Coaching` : null,
    specialty ?? null,
    config.about?.age_groups ?? null,
  ].filter(Boolean) as string[]

  return (
    <section id="about" className="bg-d-warmwhite py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">

          {/* Left: portrait */}
          <div className="md:col-span-5">
            <div className="relative">
              {/* Amber offset border */}
              <div className="absolute -top-3 -left-3 w-full h-full border-2 border-d-amber/60 rounded-sm" />
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                {photo ? (
                  <Image
                    src={photo}
                    alt={`Coach ${name ?? ""}`}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <PhotoPlaceholder variant={2} />
                )}
              </div>
              {/* Credential chip */}
              {facts[0] && (
                <div className="absolute -right-4 bottom-12 bg-d-amber text-d-warmwhite px-4 py-2 d-label-caps text-[10px] shadow-md">
                  {facts[0]}
                </div>
              )}
            </div>
          </div>

          {/* Right: bio */}
          <div className="md:col-span-7 md:pt-4">
            <div className="d-label-caps text-d-amber mb-4">The Coach</div>
            <h2 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-4xl md:text-5xl leading-[1.1] mb-8">
              {name ? `Meet Coach ${name.split(" ").pop()}.` : "Meet Your Coach."}
            </h2>

            {pullQuote && (
              <blockquote className="border-l-4 border-d-amber pl-5 mb-8">
                <p className="font-[family-name:var(--font-playfair)] italic text-d-navy text-xl md:text-2xl leading-relaxed">
                  &ldquo;{pullQuote}&rdquo;
                </p>
              </blockquote>
            )}

            {bio ? (
              <div className="space-y-4 text-d-ink/75 leading-relaxed">
                {bio.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : (
              <p className="text-d-ink/75 leading-relaxed">
                With over a decade working with athletes across every level — from youth development leagues to college-bound seniors — my approach has always been the same: build the person first, and the player follows.
              </p>
            )}

            {facts.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-3">
                {facts.map((fact) => (
                  <span
                    key={fact}
                    className="px-4 py-1.5 border border-d-navy/20 text-d-navy d-label-caps text-[11px] rounded-full"
                  >
                    {fact}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
