"use client"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

function splitTagline(tagline: string): [string, string] {
  const i = tagline.lastIndexOf(" ")
  if (i === -1) return ["", tagline]
  return [tagline.slice(0, i + 1), tagline.slice(i + 1)]
}

export default function Testimonials({ config }: { config: CoachConfig }) {
  const layout = config.design?.testimonials_layout ?? "cards-2col"
  const rawTagline = config.copy_variants?.testimonials_tagline ?? "RESULTS YOU CAN FEEL."
  const [taglineStart, taglineEnd] = splitTagline(rawTagline)

  function sectionHeader(centered: boolean) {
    return (
      <div className={`${centered ? "text-center" : ""} mb-14 reveal`}>
        <div className={`flex items-center ${centered ? "justify-center" : ""} gap-3 text-[var(--accent)] mb-5`}>
          <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
          <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm opacity-90">{config.copy_variants?.testimonials_eyebrow ?? "Voices From The Field"}</span>
          {centered && <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />}
        </div>
        <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight">
          <span className="text-white">{taglineStart}</span>
          <span className="accent-grad">{taglineEnd}</span>
        </h2>
      </div>
    )
  }

  // single-large-quote layout
  if (layout === "single-large-quote") {
    const [featured, ...rest] = config.testimonials
    return (
      <section id="testimonials" className="relative stadium-bg py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 noise pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          {sectionHeader(true)}
          {featured && (
            <figure className="reveal relative bg-smoke/80 backdrop-blur border border-white/5 p-10 sm:p-16 mb-6">
              <Icons.Quote className="absolute -top-6 left-10 w-20 h-20 quote-mark" />
              <blockquote className="font-oswald italic text-white/90 text-2xl sm:text-3xl md:text-4xl leading-relaxed mb-10 mt-6 max-w-4xl">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: featured.rating ?? 5 }).map((_, k) => (
                  <Icons.Star key={k} className="w-5 h-5 text-[var(--accent)]" />
                ))}
              </div>
              <figcaption className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] grid place-items-center font-bebas text-ink text-2xl shrink-0">
                  {featured.photo ? (
                    <img src={featured.photo} alt={featured.name} className="w-full h-full object-cover" />
                  ) : featured.name.charAt(0)}
                </div>
                <div>
                  <div className="font-oswald uppercase tracking-[0.2em] text-white">{featured.name}</div>
                  <div className="text-[var(--accent)] font-oswald uppercase tracking-[0.2em] text-[11px]">{featured.role}</div>
                </div>
              </figcaption>
            </figure>
          )}
          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {rest.map((t, i) => (
                <figure key={i} className="card-glow reveal bg-smoke/60 backdrop-blur border border-white/5 p-8">
                  <blockquote className="font-oswald italic text-white/80 text-lg leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] grid place-items-center font-bebas text-ink text-lg shrink-0">
                      {t.photo ? (
                        <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                      ) : t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-oswald uppercase tracking-[0.2em] text-white text-sm">{t.name}</div>
                      <div className="text-[var(--accent)] font-oswald uppercase tracking-[0.2em] text-[11px]">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  // stacked-compact layout
  if (layout === "stacked-compact") {
    return (
      <section id="testimonials" className="relative stadium-bg py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 noise pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8">
          {sectionHeader(false)}
          <div className="flex flex-col gap-4">
            {config.testimonials.map((t, i) => (
              <figure
                key={i}
                className="reveal bg-smoke/80 backdrop-blur border border-white/5 p-6 sm:p-8 flex gap-6 items-start"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] grid place-items-center font-bebas text-ink text-xl">
                  {t.photo ? (
                    <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                  ) : t.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating ?? 5 }).map((_, k) => (
                      <Icons.Star key={k} className="w-3.5 h-3.5 text-[var(--accent)]" />
                    ))}
                  </div>
                  <blockquote className="font-oswald italic text-white/85 text-lg leading-relaxed mb-3">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption>
                    <div className="font-oswald uppercase tracking-[0.2em] text-white text-sm">{t.name}</div>
                    <div className="text-[var(--accent)] font-oswald uppercase tracking-[0.2em] text-[11px]">{t.role}</div>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // cards-2col (default)
  return (
    <section id="testimonials" className="relative stadium-bg py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 noise pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {sectionHeader(true)}
        <div className="grid md:grid-cols-2 gap-6">
          {config.testimonials.map((t, i) => (
            <figure
              key={i}
              className="card-glow reveal relative bg-smoke/80 backdrop-blur border border-white/5 p-8 sm:p-12"
            >
              <Icons.Quote className="absolute -top-4 left-8 w-16 h-16 quote-mark" />
              <blockquote className="font-oswald italic text-white/90 text-xl sm:text-2xl leading-relaxed mb-8 mt-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating ?? 5 }).map((_, k) => (
                  <Icons.Star key={k} className="w-4 h-4 text-[var(--accent)]" />
                ))}
              </div>
              <figcaption className="flex items-center gap-4 pt-5 border-t border-white/10">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] grid place-items-center font-bebas text-ink text-xl shrink-0">
                  {t.photo ? (
                    <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                  ) : t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-oswald uppercase tracking-[0.2em] text-white text-sm">{t.name}</div>
                  <div className="text-[var(--accent)] font-oswald uppercase tracking-[0.2em] text-[11px]">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
