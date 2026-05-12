"use client"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

function splitTagline(tagline: string): [string, string] {
  const i = tagline.lastIndexOf(" ")
  if (i === -1) return ["", tagline]
  return [tagline.slice(0, i + 1), tagline.slice(i + 1)]
}

export default function Packages({ config }: { config: CoachConfig }) {
  const pkgs = config.packages
  if (!pkgs || pkgs.length === 0) return null

  const rawTagline = config.copy_variants?.services_tagline ?? "PROGRAMS BUILT FOR YOUR GOALS."
  const [taglineStart, taglineEnd] = splitTagline(rawTagline)
  const subline = config.copy_variants?.services_subline ?? "Choose the program that fits your goals and schedule."

  return (
    <section id="packages" className="relative bg-coal py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--accent-rgb),0.4)] to-transparent" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 reveal">
          <div>
            <div className="flex items-center gap-3 text-[var(--accent)] mb-5">
              <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
              <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm opacity-90">Training Programs</span>
            </div>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight">
              <span className="text-white">{taglineStart}</span>
              <span className="accent-grad">{taglineEnd}</span>
            </h2>
          </div>
          <p className="text-white/65 max-w-md text-lg">{subline}</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {pkgs.map((pkg, i) => (
            <div
              key={i}
              className={`reveal relative flex flex-col p-8 sm:p-10 group transition-all duration-300 ${
                pkg.highlight
                  ? "bg-smoke border-2 border-[rgba(var(--accent-rgb),0.6)] shadow-[0_0_32px_rgba(var(--accent-rgb),0.15)]"
                  : "card-glow bg-smoke border border-white/5"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-[var(--accent)] text-ink font-oswald text-xs uppercase tracking-[0.2em] px-3 py-1">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="absolute top-6 right-6 font-bebas text-white/10 text-5xl leading-none">
                0{i + 1}
              </div>

              <h3 className="font-bebas text-3xl sm:text-4xl tracking-wide text-white mb-3 mt-2">{pkg.title}</h3>

              <div className="flex flex-wrap gap-4 mb-5">
                {pkg.duration && (
                  <span className="inline-flex items-center gap-1.5 text-[var(--accent)] font-oswald text-xs uppercase tracking-[0.18em]">
                    <span className="inline-block w-1 h-1 rounded-full bg-[var(--accent)]" />
                    {pkg.duration}
                  </span>
                )}
                {pkg.sessions_per_week != null && (
                  <span className="inline-flex items-center gap-1.5 text-white/50 font-oswald text-xs uppercase tracking-[0.18em]">
                    <span className="inline-block w-1 h-1 rounded-full bg-white/30" />
                    {pkg.sessions_per_week}x / week
                  </span>
                )}
              </div>

              <p className="text-white/65 leading-relaxed mb-6 flex-1">{pkg.description}</p>

              {pkg.price && (
                <div className="font-bebas text-3xl sm:text-4xl tracking-wide text-[var(--accent)] mb-6">
                  {pkg.price}
                </div>
              )}

              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className={`inline-flex items-center gap-2 font-oswald uppercase tracking-[0.22em] text-sm group/link mt-auto ${
                  pkg.highlight
                    ? "text-[var(--accent)]"
                    : "text-[var(--accent)]"
                }`}
              >
                Get Started <Icons.Arrow className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
