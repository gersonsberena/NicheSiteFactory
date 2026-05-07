import { Icons } from "@/lib/icons"
import type { CoachConfig, Testimonial } from "@/lib/useConfig"

function getInitials(name: string) {
  return name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
}

export default function Testimonials({ config }: { config: CoachConfig }) {
  const layout = config.design?.b_testimonials_layout ?? "cards-3col"
  const items = (config.testimonials ?? []) as Testimonial[]

  if (layout === "single-quote") return <TestimonialsSingleQuote config={config} items={items} />
  if (layout === "stacked") return <TestimonialsStacked config={config} items={items} />
  return <TestimonialsCards3Col config={config} items={items} />
}

function SectionHeader({ config, centered }: { config: CoachConfig; centered?: boolean }) {
  return (
    <div className={centered ? "text-center" : ""}>
      <div className={`text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-primary-700)] ${centered ? "" : ""}`}>
        {config.copy_variants?.testimonials_eyebrow ?? "From Our Families"}
      </div>
      <h2 className="font-poppins font-extrabold text-3xl md:text-5xl mt-3 tracking-tight text-[#1A1A1A]">
        {config.copy_variants?.testimonials_tagline ?? "Words from parents and players."}
      </h2>
    </div>
  )
}

/* ── Variant: cards-3col (default) ─────────────────────────── */
function TestimonialsCards3Col({ config, items }: { config: CoachConfig; items: Testimonial[] }) {
  return (
    <section id="testimonials" className="bg-paper py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <SectionHeader config={config} />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <article key={i} className="bg-white rounded-2xl p-7 shadow-[var(--shadow-card)] lift hover:shadow-[var(--shadow-card-hover)]">
              <div className="flex gap-1 text-[var(--b-accent)]">
                {Array.from({ length: t.rating ?? 5 }).map((_, j) => (
                  <Icons.Star key={j} className="w-4 h-4" />
                ))}
              </div>
              <p className="mt-4 text-[#1A1A1A]/80 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 pt-5 border-t border-[var(--b-primary-50)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--b-primary-600)] text-white grid place-items-center font-poppins font-semibold text-sm shrink-0">
                  {getInitials(t.name)}
                </div>
                <div>
                  <div className="font-semibold text-[#1A1A1A]">{t.name}</div>
                  <div className="text-sm text-[#1A1A1A]/60">{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Variant: single-quote ──────────────────────────────────── */
function TestimonialsSingleQuote({ config, items }: { config: CoachConfig; items: Testimonial[] }) {
  const featured = items[0]
  const rest = items.slice(1, 4)

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[var(--b-primary-700)]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "var(--b-accent)" }}>
            {config.copy_variants?.testimonials_eyebrow ?? "From Our Families"}
          </div>
          <h2 className="font-poppins font-extrabold text-3xl md:text-5xl tracking-tight text-white">
            {config.copy_variants?.testimonials_tagline ?? "Words from parents and players."}
          </h2>
        </div>

        {featured && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl p-8 sm:p-12 text-center">
            <Icons.Quote className="w-10 h-10 mx-auto mb-6 opacity-50" style={{ color: "var(--b-accent)" }} />
            <blockquote className="font-poppins font-semibold text-xl sm:text-2xl md:text-3xl text-white leading-relaxed max-w-3xl mx-auto">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 text-white grid place-items-center font-poppins font-semibold shrink-0">
                {getInitials(featured.name)}
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">{featured.name}</div>
                <div className="text-sm text-white/60">{featured.role}</div>
              </div>
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {rest.map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex gap-1 mb-3" style={{ color: "var(--b-accent)" }}>
                  {Array.from({ length: t.rating ?? 5 }).map((_, j) => (
                    <Icons.Star key={j} className="w-3.5 h-3.5" />
                  ))}
                </div>
                <p className="text-white/75 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 text-white grid place-items-center text-xs font-semibold shrink-0">
                    {getInitials(t.name)}
                  </div>
                  <div className="text-white/60 text-xs">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ── Variant: stacked ───────────────────────────────────────── */
function TestimonialsStacked({ config, items }: { config: CoachConfig; items: Testimonial[] }) {
  return (
    <section id="testimonials" className="bg-paper py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="mb-12">
          <SectionHeader config={config} />
        </div>
        <div className="space-y-4">
          {items.map((t, i) => (
            <article
              key={i}
              className="bg-white rounded-2xl shadow-[var(--shadow-card)] p-6 sm:p-8 flex gap-6 items-start"
            >
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-full bg-[var(--b-primary-600)] text-white grid place-items-center font-poppins font-semibold text-lg">
                  {getInitials(t.name)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="font-semibold text-[#1A1A1A]">{t.name}</div>
                    <div className="text-sm text-[#1A1A1A]/60">{t.role}</div>
                  </div>
                  <div className="flex gap-1 text-[var(--b-accent)] shrink-0">
                    {Array.from({ length: t.rating ?? 5 }).map((_, j) => (
                      <Icons.Star key={j} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-[#1A1A1A]/75 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
