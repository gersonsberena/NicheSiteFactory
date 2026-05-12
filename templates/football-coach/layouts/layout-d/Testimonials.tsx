import Image from "next/image"
import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
}

function QuoteMark() {
  return (
    <div className="font-[family-name:var(--font-playfair)] text-d-amber text-5xl leading-none mb-4 select-none">
      &ldquo;
    </div>
  )
}

function Attribution({ name, role }: { name: string; role: string }) {
  return (
    <div className="mt-6 pt-6 border-t d-hairline">
      <div className="font-semibold text-d-navy text-sm">{name}</div>
      <div className="d-label-caps text-d-amber text-[11px] mt-0.5">{role}</div>
    </div>
  )
}

export default function Testimonials({ config }: Props) {
  const testimonials = config.testimonials ?? []
  const tagline = config.copy_variants?.testimonials_tagline
  const layout = config.design?.d_testimonials_layout ?? "cards-3col"

  if (testimonials.length === 0) return null

  const header = (
    <div className="mb-12 md:mb-16">
      <div className="d-label-caps text-d-amber mb-3">What Families Say</div>
      <h2 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-4xl md:text-5xl leading-[1.1]">
        {tagline ?? "Trusted by the Families Who Matter Most."}
      </h2>
    </div>
  )

  if (layout === "single-large") {
    const t = testimonials[0]
    return (
      <section id="testimonials" className="bg-d-cream py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          {header}
          <div className="font-[family-name:var(--font-playfair)] text-d-amber text-7xl leading-none mb-6 select-none">&ldquo;</div>
          <p className="font-[family-name:var(--font-playfair)] italic text-d-navy text-2xl md:text-3xl leading-relaxed">
            {t.quote}
          </p>
          <div className="mt-10 flex flex-col items-center gap-1">
            <div className="font-semibold text-d-navy">{t.name}</div>
            <div className="d-label-caps text-d-amber text-[11px]">{t.role}</div>
          </div>
        </div>
      </section>
    )
  }

  if (layout === "alternating") {
    return (
      <section id="testimonials" className="bg-d-cream py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {header}
          <div className="flex flex-col gap-12">
            {testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                {t.photo ? (
                  <div className="w-full md:w-64 shrink-0">
                    <div className="relative aspect-square overflow-hidden rounded-sm">
                      <Image src={t.photo} alt={t.name} fill className="object-cover" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full md:w-64 shrink-0">
                    <div className="aspect-square bg-d-warmwhite rounded-sm flex items-center justify-center">
                      <span className="font-[family-name:var(--font-playfair)] text-d-navy/30 text-5xl font-bold">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex-1 bg-d-warmwhite p-8 rounded-sm">
                  <QuoteMark />
                  <p className="font-[family-name:var(--font-playfair)] italic text-d-navy text-lg leading-relaxed">
                    {t.quote}
                  </p>
                  <Attribution name={t.name} role={t.role} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // default: cards-3col
  return (
    <section id="testimonials" className="bg-d-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {header}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <div key={i} className="bg-d-warmwhite p-8 rounded-sm d-lift flex flex-col">
              <QuoteMark />
              <p className="font-[family-name:var(--font-playfair)] italic text-d-navy text-lg leading-relaxed flex-1">
                {t.quote}
              </p>
              <Attribution name={t.name} role={t.role} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
