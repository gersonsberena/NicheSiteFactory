"use client"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"
import type { ComponentType, SVGProps } from "react"

type IconComp = ComponentType<SVGProps<SVGSVGElement>>
const SERVICE_ICONS: IconComp[] = [Icons.Helmet, Icons.Lightning, Icons.Trophy]

function splitTagline(tagline: string): [string, string] {
  const i = tagline.lastIndexOf(" ")
  if (i === -1) return ["", tagline]
  return [tagline.slice(0, i + 1), tagline.slice(i + 1)]
}

export default function Services({ config }: { config: CoachConfig }) {
  const layout = config.design?.services_layout ?? "cards-3col"
  const rawTagline = config.copy_variants?.services_tagline ?? "TRAINING THAT DELIVERS."
  const [taglineStart, taglineEnd] = splitTagline(rawTagline)

  const header = (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 reveal">
      <div>
        <div className="flex items-center gap-3 text-[var(--accent)] mb-5">
          <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
          <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm opacity-90">The Program</span>
        </div>
        <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight">
          <span className="text-white">{taglineStart}</span>
          <span className="accent-grad">{taglineEnd}</span>
        </h2>
      </div>
      <p className="text-white/65 max-w-md text-lg">
        {config.copy_variants?.services_subline ?? "Three pillars. One mission — make you the most prepared athlete on the field, every single rep."}
      </p>
    </div>
  )

  // horizontal-icon-left layout
  if (layout === "horizontal-icon-left") {
    return (
      <section id="services" className="relative bg-coal py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--accent-rgb),0.4)] to-transparent" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {header}
          <div className="flex flex-col gap-6">
            {config.services.map((s, i) => {
              const IconComp = SERVICE_ICONS[i % SERVICE_ICONS.length]
              return (
                <div
                  key={i}
                  className="card-glow reveal relative bg-smoke border border-white/5 p-8 sm:p-10 flex items-start gap-8 group"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-sm bg-[rgba(var(--accent-rgb),0.1)] border border-[rgba(var(--accent-rgb),0.3)] grid place-items-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-ink transition-colors duration-300">
                    <IconComp className="w-10 h-10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-bebas text-3xl sm:text-4xl tracking-wide text-white mb-3">{s.title}</h3>
                      <span className="font-bebas text-white/10 text-4xl leading-none flex-shrink-0">0{i + 1}</span>
                    </div>
                    <p className="text-white/65 leading-relaxed mb-4">{s.description}</p>
                    {s.price && (
                      <div className="font-bebas text-2xl tracking-wide text-[var(--accent)] mb-4">{s.price}</div>
                    )}
                    <button
                      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                      className="inline-flex items-center gap-2 text-[var(--accent)] font-oswald uppercase tracking-[0.22em] text-sm group/link"
                    >
                      Get Started <Icons.Arrow className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // featured-2small layout
  if (layout === "featured-2small") {
    const [featured, ...rest] = config.services
    const FeaturedIcon = SERVICE_ICONS[0]
    return (
      <section id="services" className="relative bg-coal py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--accent-rgb),0.4)] to-transparent" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {header}
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 card-glow reveal relative bg-smoke border border-white/5 p-10 sm:p-14 group">
              <div className="absolute top-8 right-8 font-bebas text-white/10 text-7xl leading-none">01</div>
              <div className="w-16 h-16 rounded-sm bg-[rgba(var(--accent-rgb),0.1)] border border-[rgba(var(--accent-rgb),0.3)] grid place-items-center text-[var(--accent)] mb-8 group-hover:bg-[var(--accent)] group-hover:text-ink transition-colors duration-300">
                <FeaturedIcon className="w-10 h-10" />
              </div>
              <h3 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mb-5">{featured?.title}</h3>
              <p className="text-white/65 leading-relaxed text-lg mb-6 max-w-lg">{featured?.description}</p>
              {featured?.price && (
                <div className="font-bebas text-3xl tracking-wide text-[var(--accent)] mb-6">{featured.price}</div>
              )}
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 text-[var(--accent)] font-oswald uppercase tracking-[0.22em] text-sm group/link"
              >
                Get Started <Icons.Arrow className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </button>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-6">
              {rest.map((s, i) => {
                const IconComp = SERVICE_ICONS[(i + 1) % SERVICE_ICONS.length]
                return (
                  <div
                    key={i}
                    className="card-glow reveal relative bg-smoke border border-white/5 p-8 group flex-1"
                    style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                  >
                    <div className="absolute top-6 right-6 font-bebas text-white/10 text-4xl leading-none">0{i + 2}</div>
                    <div className="w-12 h-12 rounded-sm bg-[rgba(var(--accent-rgb),0.1)] border border-[rgba(var(--accent-rgb),0.3)] grid place-items-center text-[var(--accent)] mb-5 group-hover:bg-[var(--accent)] group-hover:text-ink transition-colors duration-300">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <h3 className="font-bebas text-3xl tracking-wide text-white mb-3">{s.title}</h3>
                    <p className="text-white/65 leading-relaxed mb-4">{s.description}</p>
                    {s.price && (
                      <div className="font-bebas text-2xl tracking-wide text-[var(--accent)] mb-4">{s.price}</div>
                    )}
                    <button
                      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                      className="inline-flex items-center gap-2 text-[var(--accent)] font-oswald uppercase tracking-[0.22em] text-sm group/link"
                    >
                      Get Started <Icons.Arrow className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // cards-3col (default)
  return (
    <section id="services" className="relative bg-coal py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--accent-rgb),0.4)] to-transparent" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {header}
        <div className="grid md:grid-cols-3 gap-6">
          {config.services.map((s, i) => {
            const IconComp = SERVICE_ICONS[i % SERVICE_ICONS.length]
            return (
              <div
                key={i}
                className="card-glow reveal relative bg-smoke border border-white/5 p-8 sm:p-10 group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-6 right-6 font-bebas text-white/10 text-5xl leading-none">
                  0{i + 1}
                </div>
                <div className="w-14 h-14 rounded-sm bg-[rgba(var(--accent-rgb),0.1)] border border-[rgba(var(--accent-rgb),0.3)] grid place-items-center text-[var(--accent)] mb-7 group-hover:bg-[var(--accent)] group-hover:text-ink transition-colors duration-300">
                  <IconComp className="w-9 h-9" />
                </div>
                <h3 className="font-bebas text-3xl sm:text-4xl tracking-wide text-white mb-4">{s.title}</h3>
                <p className="text-white/65 leading-relaxed mb-4">{s.description}</p>
                {s.price && (
                  <div className="font-bebas text-2xl tracking-wide text-[var(--accent)] mb-4">{s.price}</div>
                )}
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 text-[var(--accent)] font-oswald uppercase tracking-[0.22em] text-sm group/link"
                >
                  Get Started <Icons.Arrow className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
