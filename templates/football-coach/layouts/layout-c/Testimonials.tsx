import type { CoachConfig, Testimonial } from "@/lib/useConfig"

export default function Testimonials({ config }: { config: CoachConfig }) {
  const layout = config.design?.c_testimonials_layout ?? "centered-quote"
  const testimonials = config.testimonials as Testimonial[]
  if (!testimonials?.length) return null

  return (
    <section id="testimonials" className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-12 reveal text-center">
          <span className="c-label text-[#6B7280] block mb-4">
            {config.copy_variants?.testimonials_eyebrow ?? "Voices From The Field"}
          </span>
          <div className="c-rule-accent mx-auto mb-6" />
          <h2 className="font-['Playfair_Display'] font-black text-4xl sm:text-5xl text-[#111827] leading-tight">
            {config.copy_variants?.testimonials_tagline ?? "Results You Can Feel."}
          </h2>
        </div>

        {layout === "card-grid" ? (
          <TestimonialsCards testimonials={testimonials} />
        ) : (
          <TestimonialsCenteredQuote testimonials={testimonials} />
        )}
      </div>
    </section>
  )
}

function TestimonialsCenteredQuote({ testimonials }: { testimonials: Testimonial[] }) {
  const featured = testimonials[0]
  return (
    <div className="max-w-3xl mx-auto text-center reveal">
      <div className="c-quote-mark font-['Playfair_Display'] text-[8rem] leading-none text-[var(--accent)] select-none mb-2">
        &ldquo;
      </div>
      <blockquote className="font-['Playfair_Display'] italic text-2xl sm:text-3xl text-[#111827] leading-relaxed mb-8">
        {featured.quote}
      </blockquote>
      <div className="c-rule-accent mx-auto mb-6" />
      <p className="font-semibold text-[#111827]">{featured.name}</p>
      <p className="text-xs c-label text-[#6B7280] mt-1">{featured.role}</p>

      {testimonials.length > 1 && (
        <div className="mt-16 grid sm:grid-cols-2 gap-6 text-left">
          {testimonials.slice(1).map((t, i) => (
            <div key={i} className="border border-[#E5E7EB] p-6 hover:border-[var(--accent)] transition-colors">
              <p className="text-[#374151] italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-semibold text-[#111827] text-sm">{t.name}</p>
              <p className="text-xs c-label text-[#9CA3AF] mt-0.5">{t.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TestimonialsCards({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
      {testimonials.map((t, i) => (
        <div key={i} className="border border-[#E5E7EB] p-8 hover:border-[var(--accent)] transition-colors" style={{ transitionDelay: `${i * 60}ms` }}>
          <p className="font-['Playfair_Display'] italic text-lg text-[#374151] leading-relaxed mb-6">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="border-t border-[#F3F4F6] pt-5">
            <p className="font-semibold text-[#111827]">{t.name}</p>
            <p className="text-xs c-label text-[#9CA3AF] mt-0.5">{t.role}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
