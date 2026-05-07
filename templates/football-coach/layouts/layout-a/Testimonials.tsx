"use client"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

export default function Testimonials({ config }: { config: CoachConfig }) {
  return (
    <section id="testimonials" className="relative stadium-bg py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 noise pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 text-gold/90 mb-5">
            <span className="inline-block h-[2px] w-10 bg-gold" />
            <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm">Voices From The Field</span>
            <span className="inline-block h-[2px] w-10 bg-gold" />
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight">
            <span className="text-white">RESULTS YOU CAN </span>
            <span className="gold-grad">FEEL.</span>
          </h2>
        </div>

        {/* Cards */}
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
                {Array.from({ length: 5 }).map((_, k) => (
                  <Icons.Star key={k} className="w-4 h-4 text-gold" />
                ))}
              </div>
              <figcaption className="flex items-center gap-4 pt-5 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-golddim grid place-items-center font-bebas text-ink text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-oswald uppercase tracking-[0.2em] text-white text-sm">{t.name}</div>
                  <div className="text-gold font-oswald uppercase tracking-[0.2em] text-[11px]">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
