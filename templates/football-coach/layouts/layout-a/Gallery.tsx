"use client"
import type { CoachConfig } from "@/lib/useConfig"

const PHOTO_CLASS: Record<string, string> = {
  "grayscale-hover": "photo-grayscale",
  "always-color": "photo-color",
  "duotone": "photo-duotone",
  "high-contrast": "photo-high-contrast",
}

const GALLERY_CLASS: Record<string, string> = {
  "grid-3col": "gallery-grid-3col",
  "grid-2col": "gallery-grid-2col",
  "grid-4col": "gallery-grid-4col",
  "masonry": "gallery-masonry",
}

export default function Gallery({ config }: { config: CoachConfig }) {
  const galleryLayout = config.design?.gallery_layout ?? "grid-3col"
  const photoTreatment = config.design?.photo_treatment ?? "grayscale-hover"
  const galleryClass = GALLERY_CLASS[galleryLayout] ?? "gallery-grid-3col"
  const photoClass = PHOTO_CLASS[photoTreatment] ?? "photo-grayscale"
  const isMasonry = galleryLayout === "masonry"

  return (
    <section id="gallery" className="bg-ink py-24 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 text-[var(--accent)] mb-6 reveal">
          <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
          <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm opacity-90">{config.copy_variants?.gallery_label ?? "In Action"}</span>
        </div>
        <h2 className="font-bebas text-5xl md:text-6xl tracking-tight text-white mb-12 reveal">
          IN ACTION.
        </h2>

        <div className={galleryClass}>
          {config.gallery.photos.map((src, i) => (
            <div
              key={i}
              className={`bg-white/5 overflow-hidden reveal ${isMasonry ? "" : "aspect-square"}`}
            >
              <img
                src={src}
                alt={`Training photo ${i + 1}`}
                className={`w-full h-full object-cover ${photoClass}`}
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
