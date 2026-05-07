"use client"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

export default function About({ config }: { config: CoachConfig }) {
  return (
    <section id="about" className="relative bg-ink py-24 sm:py-32 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

        {/* Portrait */}
        <div className="lg:col-span-5 reveal">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 group">
            <div className="absolute -inset-2 border border-gold/30 -translate-x-3 -translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
            <div className="relative w-full h-full overflow-hidden bg-smoke">
              <img
                src={config.about.photo}
                alt={config.about.name}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition duration-700"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="font-bebas text-3xl tracking-wide text-white leading-none">
                    {config.about.name.toUpperCase()}
                  </div>
                  <div className="font-oswald uppercase tracking-[0.3em] text-gold text-[10px] mt-1">
                    {config.about.title ?? "Head Performance Coach"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-7 reveal">
          <div className="flex items-center gap-3 text-gold/90 mb-5">
            <span className="inline-block h-[2px] w-10 bg-gold" />
            <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm">About the Coach</span>
          </div>

          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight text-white mb-6">
            BUILT IN THE <span className="gold-grad">TRENCHES.</span>
            <br />
            FORGED FOR THE <span className="gold-grad">SPOTLIGHT.</span>
          </h2>

          <div className="space-y-5 text-white/75 text-lg leading-relaxed max-w-2xl">
            <p>{config.about.bio}</p>
          </div>

          <blockquote className="mt-10 border-l-2 border-gold pl-6 py-2 font-oswald italic text-gold text-xl sm:text-2xl tracking-wide max-w-xl">
            "Champions aren't made on Friday nights. They're made every single day before."
          </blockquote>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm font-oswald uppercase tracking-[0.22em] text-white/70">
            <div className="flex items-center gap-2">
              <Icons.Check className="w-4 h-4 text-gold" /> NFCA Certified
            </div>
            <div className="flex items-center gap-2">
              <Icons.Check className="w-4 h-4 text-gold" /> Former D1 Athlete
            </div>
            <div className="flex items-center gap-2">
              <Icons.Check className="w-4 h-4 text-gold" /> {config.about.years_experience} Years Coaching
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
