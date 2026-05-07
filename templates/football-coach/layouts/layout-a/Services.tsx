"use client"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"
import type { ComponentType, SVGProps } from "react"

type IconComp = ComponentType<SVGProps<SVGSVGElement>>
const SERVICE_ICONS: IconComp[] = [Icons.Helmet, Icons.Lightning, Icons.Trophy]

export default function Services({ config }: { config: CoachConfig }) {
  return (
    <section id="services" className="relative bg-coal py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 reveal">
          <div>
            <div className="flex items-center gap-3 text-gold/90 mb-5">
              <span className="inline-block h-[2px] w-10 bg-gold" />
              <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm">The Program</span>
            </div>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight">
              <span className="text-white">TRAINING THAT </span>
              <span className="gold-grad">DELIVERS.</span>
            </h2>
          </div>
          <p className="text-white/65 max-w-md text-lg">
            Three pillars. One mission — make you the most prepared athlete on the field, every single rep.
          </p>
        </div>

        {/* Cards */}
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
                <div className="w-14 h-14 rounded-sm bg-gold/10 border border-gold/30 grid place-items-center text-gold mb-7 group-hover:bg-gold group-hover:text-ink transition-colors duration-300">
                  <IconComp className="w-9 h-9" />
                </div>
                <h3 className="font-bebas text-3xl sm:text-4xl tracking-wide text-white mb-4">{s.title}</h3>
                <p className="text-white/65 leading-relaxed mb-6">{s.description}</p>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 text-gold font-oswald uppercase tracking-[0.22em] text-sm group/link"
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
