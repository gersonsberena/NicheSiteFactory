import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
}

export default function Testimonials({ config }: Props) {
  const testimonials = config.testimonials ?? []
  const tagline = config.copy_variants?.testimonials_tagline

  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="bg-d-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          <div className="d-label-caps text-d-amber mb-3">What Families Say</div>
          <h2 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-4xl md:text-5xl leading-[1.1]">
            {tagline ?? "Trusted by the Families Who Matter Most."}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className="bg-d-warmwhite p-8 rounded-sm d-lift flex flex-col"
            >
              {/* Amber opening quote mark */}
              <div className="font-[family-name:var(--font-playfair)] text-d-amber text-5xl leading-none mb-4 select-none">
                &ldquo;
              </div>
              <p className="font-[family-name:var(--font-playfair)] italic text-d-navy text-lg leading-relaxed flex-1">
                {t.quote}
              </p>
              <div className="mt-6 pt-6 border-t d-hairline">
                <div className="font-semibold text-d-navy text-sm">{t.name}</div>
                <div className="d-label-caps text-d-amber text-[11px] mt-0.5">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
