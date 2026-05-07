"use client"
import type { CoachConfig } from "@/lib/useConfig"

export default function Gallery({ config }: { config: CoachConfig }) {
  return (
    <section id="gallery" className="bg-ink py-24 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 text-gold/90 mb-6 reveal">
          <span className="inline-block h-[2px] w-10 bg-gold" />
          <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm">On the Field</span>
        </div>
        <h2 className="font-bebas text-5xl md:text-6xl tracking-tight text-white mb-12 reveal">
          IN ACTION.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {config.gallery.photos.map((src, i) => (
            <div key={i} className="aspect-square bg-white/5 overflow-hidden reveal">
              <img
                src={src}
                alt={`Training photo ${i + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).parentElement!.style.background = "#1a1a1a"
                  ;(e.target as HTMLImageElement).style.display = "none"
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
