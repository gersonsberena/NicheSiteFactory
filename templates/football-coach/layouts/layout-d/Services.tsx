import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
}

const ICONS = [
  <svg key="qb" viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden>
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 28 C14 18 26 14 28 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="20" cy="20" r="3" fill="currentColor" />
  </svg>,
  <svg key="film" viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden>
    <rect x="6" y="10" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 16 L26 20 L16 24 Z" fill="currentColor" />
  </svg>,
  <svg key="camp" viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden>
    <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="26" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 34 C6 26 10 22 14 22 C18 22 22 22 26 22 C30 22 34 26 34 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
]

function SectionHeader({ tagline }: { tagline?: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="d-label-caps text-d-amber mb-3">What I Offer</div>
      <h2 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-4xl md:text-5xl leading-[1.1]">
        {tagline ?? "Programs Built Around Your Athlete."}
      </h2>
    </div>
  )
}

function InquireLink() {
  return (
    <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 d-label-caps text-d-amber text-[11px] d-underline-grow pb-0.5 self-start">
      Inquire <span aria-hidden>→</span>
    </a>
  )
}

export default function Services({ config }: Props) {
  const services = config.services ?? []
  const tagline = config.copy_variants?.services_tagline
  const layout = config.design?.d_services_layout ?? "cards-3col"

  if (services.length === 0) return null

  if (layout === "list-rows") {
    return (
      <section id="services" className="bg-d-warmwhite py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader tagline={tagline} />
          <div className="flex flex-col divide-y divide-d-navy/10">
            {services.map((svc, i) => (
              <div key={i} className="flex items-start gap-6 py-8">
                <div className="text-d-amber shrink-0 mt-1">{ICONS[i % ICONS.length]}</div>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-xl mb-2">{svc.title}</h3>
                  <p className="text-d-ink/70 leading-relaxed text-sm">{svc.description}</p>
                  {"price" in svc && svc.price && (
                    <div className="mt-2 font-semibold text-d-navy text-sm">{svc.price as string}</div>
                  )}
                </div>
                <InquireLink />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (layout === "featured-large") {
    const [first, ...rest] = services
    return (
      <section id="services" className="bg-d-warmwhite py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader tagline={tagline} />
          <div className="grid md:grid-cols-3 gap-6">
            {/* Featured card spans 2 cols */}
            <div className="md:col-span-2 group bg-d-cream rounded-sm overflow-hidden d-lift flex flex-col">
              <div className="h-1.5 bg-d-navy" />
              <div className="p-10 flex flex-col flex-1">
                <div className="text-d-amber mb-5">{ICONS[0]}</div>
                <h3 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-2xl md:text-3xl mb-4">{first.title}</h3>
                <p className="text-d-ink/70 leading-relaxed flex-1">{first.description}</p>
                {"price" in first && first.price && (
                  <div className="mt-4 font-semibold text-d-navy">{first.price as string}</div>
                )}
                <InquireLink />
              </div>
            </div>
            {/* Remaining cards stacked */}
            <div className="flex flex-col gap-6">
              {rest.slice(0, 2).map((svc, i) => (
                <div key={i} className="group bg-d-cream rounded-sm overflow-hidden d-lift flex flex-col flex-1">
                  <div className="h-1.5 bg-d-navy" />
                  <div className="p-8 flex flex-col flex-1">
                    <div className="text-d-amber mb-4">{ICONS[(i + 1) % ICONS.length]}</div>
                    <h3 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-lg mb-2">{svc.title}</h3>
                    <p className="text-d-ink/70 leading-relaxed text-sm flex-1">{svc.description}</p>
                    {"price" in svc && svc.price && (
                      <div className="mt-3 font-semibold text-d-navy text-sm">{svc.price as string}</div>
                    )}
                    <InquireLink />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // default: cards-3col
  return (
    <section id="services" className="bg-d-warmwhite py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader tagline={tagline} />
        <div className="grid md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((svc, i) => (
            <div key={i} className="group bg-d-cream rounded-sm overflow-hidden d-lift flex flex-col">
              <div className="h-1.5 bg-d-navy" />
              <div className="p-8 flex flex-col flex-1">
                <div className="text-d-amber mb-5">{ICONS[i % ICONS.length]}</div>
                <h3 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-xl mb-3">{svc.title}</h3>
                <p className="text-d-ink/70 leading-relaxed text-sm flex-1">{svc.description}</p>
                {"price" in svc && svc.price && (
                  <div className="mt-4 font-semibold text-d-navy text-sm">{svc.price as string}</div>
                )}
                <InquireLink />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
