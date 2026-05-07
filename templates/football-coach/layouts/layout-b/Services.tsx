import { Icons } from "@/lib/icons"
import type { CoachConfig, Service } from "@/lib/useConfig"

const SERVICE_ICONS = [Icons.Helmet, Icons.Trophy, Icons.Lightning]

function SectionHeader({ config }: { config: CoachConfig }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-primary-700)]">
        {config.copy_variants?.services_tagline ?? "What I Offer"}
      </div>
      <h2 className="font-poppins font-extrabold text-3xl md:text-5xl mt-3 tracking-tight text-[#1A1A1A]">
        Training programs for every athlete.
      </h2>
      <p className="mt-4 text-[#1A1A1A]/70 text-lg">
        {config.copy_variants?.services_subline ??
          "Every program builds the same foundation — discipline, fundamentals, and a family-friendly schedule."}
      </p>
    </div>
  )
}

export default function Services({ config }: { config: CoachConfig }) {
  const layout = config.design?.b_services_layout ?? "cards-3col"
  const services = (config.services ?? []) as Service[]

  if (layout === "icon-left-list") return <ServicesIconList config={config} services={services} />
  if (layout === "featured-large") return <ServicesFeatured config={config} services={services} />
  return <ServicesCards3Col config={config} services={services} />
}

/* ── Variant: cards-3col (default) ─────────────────────────── */
function ServicesCards3Col({ config, services }: { config: CoachConfig; services: Service[] }) {
  return (
    <section id="services" className="bg-paper py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionHeader config={config} />
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const ServiceIcon = SERVICE_ICONS[i % SERVICE_ICONS.length]
            return (
              <article
                key={i}
                className="group bg-white rounded-2xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] lift border-t-4 border-[var(--b-primary-600)] p-7 flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-[rgba(var(--b-accent-rgb),0.1)] text-[var(--b-accent-dim)] grid place-items-center group-hover:bg-[var(--b-accent)] group-hover:text-white transition-colors">
                  <ServiceIcon className="w-7 h-7" />
                </div>
                <h3 className="font-poppins font-semibold text-2xl mt-5 text-[#1A1A1A]">{svc.title}</h3>
                <p className="text-[#1A1A1A]/70 mt-2 leading-relaxed flex-1">{svc.description}</p>
                <div className="mt-5 pt-5 border-t border-[var(--b-primary-50)] flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--b-primary-700)]">
                    {svc.price ?? "Contact for pricing"}
                  </span>
                  <a href="#contact" className="text-[var(--b-accent-dim)] font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Learn more <Icons.Arrow className="w-4 h-4" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Variant: icon-left-list ────────────────────────────────── */
function ServicesIconList({ config, services }: { config: CoachConfig; services: Service[] }) {
  return (
    <section id="services" className="bg-paper py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="md:sticky md:top-24">
            <SectionHeader config={config} />
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 bg-[var(--b-primary-600)] hover:bg-[var(--b-primary-700)] text-white font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              Get started <Icons.Arrow className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-0 divide-y divide-[var(--b-primary-50)]">
            {services.map((svc, i) => {
              const ServiceIcon = SERVICE_ICONS[i % SERVICE_ICONS.length]
              return (
                <div key={i} className="flex gap-5 py-8 first:pt-0 last:pb-0 group">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(var(--b-accent-rgb),0.1)] text-[var(--b-accent-dim)] grid place-items-center shrink-0 mt-1 group-hover:bg-[var(--b-accent)] group-hover:text-white transition-colors">
                    <ServiceIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-poppins font-semibold text-xl text-[#1A1A1A]">{svc.title}</h3>
                    <p className="text-[#1A1A1A]/70 mt-1.5 leading-relaxed">{svc.description}</p>
                    {svc.price && (
                      <span className="inline-block mt-3 text-xs font-semibold uppercase tracking-wider text-[var(--b-primary-700)] bg-[var(--b-primary-50)] px-2.5 py-1 rounded-full border border-[var(--b-primary-100)]">
                        {svc.price}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Variant: featured-large ────────────────────────────────── */
function ServicesFeatured({ config, services }: { config: CoachConfig; services: Service[] }) {
  const [featured, ...rest] = services
  const FeaturedIcon = SERVICE_ICONS[0]

  return (
    <section id="services" className="bg-paper py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <SectionHeader config={config} />
        </div>

        {/* Featured card */}
        {featured && (
          <div className="rounded-3xl overflow-hidden bg-[var(--b-primary-700)] text-white p-8 sm:p-12 grid md:grid-cols-2 gap-8 items-center mb-6">
            <div>
              <div className="w-16 h-16 rounded-2xl grid place-items-center mb-6" style={{ background: "rgba(var(--b-accent-rgb),0.2)" }}>
                <FeaturedIcon className="w-8 h-8" style={{ color: "var(--b-accent)" }} />
              </div>
              <h3 className="font-poppins font-extrabold text-3xl md:text-4xl text-white">{featured.title}</h3>
              <p className="mt-4 text-white/75 text-lg leading-relaxed">{featured.description}</p>
              {featured.price && (
                <div className="mt-4 inline-block text-sm font-semibold px-3 py-1.5 rounded-full border border-white/25 text-white/80">
                  {featured.price}
                </div>
              )}
            </div>
            <div className="flex flex-col items-start md:items-end gap-6">
              <div className="bg-white/10 rounded-2xl p-6 border border-white/15 w-full md:w-auto">
                <div className="font-poppins font-semibold text-white text-lg mb-1">Flagship Program</div>
                <p className="text-white/60 text-sm">Most popular · Best results</p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-semibold px-5 py-3 rounded-xl transition-all"
                style={{ background: "var(--b-accent)", color: "white" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--b-accent-hi)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--b-accent)")}
              >
                Enroll now <Icons.Arrow className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Remaining services */}
        {rest.length > 0 && (
          <div className={`grid gap-6 ${rest.length === 1 ? "" : "md:grid-cols-2"}`}>
            {rest.map((svc, i) => {
              const ServiceIcon = SERVICE_ICONS[(i + 1) % SERVICE_ICONS.length]
              return (
                <article
                  key={i}
                  className="group bg-white rounded-2xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] lift border-l-4 border-[var(--b-primary-600)] p-7 flex gap-5 items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-[rgba(var(--b-accent-rgb),0.1)] text-[var(--b-accent-dim)] grid place-items-center shrink-0 group-hover:bg-[var(--b-accent)] group-hover:text-white transition-colors">
                    <ServiceIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-poppins font-semibold text-xl text-[#1A1A1A]">{svc.title}</h3>
                    <p className="text-[#1A1A1A]/70 mt-1.5 leading-relaxed">{svc.description}</p>
                    {svc.price && (
                      <span className="inline-block mt-3 text-xs font-semibold uppercase tracking-wider text-[var(--b-primary-700)]">
                        {svc.price}
                      </span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
