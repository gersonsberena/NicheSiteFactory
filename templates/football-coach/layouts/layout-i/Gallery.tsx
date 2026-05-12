import type { CoachConfig } from "@/lib/useConfig"

export default function Gallery({ config }: { config: CoachConfig }) {
  const photos = config.gallery?.photos
  if (!photos?.length) return null
  return (
    <section id="gallery" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>Chapter VIII</div>
        <h2 className="font-bold mb-10" style={{ fontFamily: "Playfair Display, serif", color: "var(--text)", fontSize: "clamp(32px,4vw,52px)" }}>Gallery</h2>
        <div className="columns-2 md:columns-4 gap-2 space-y-2">
          {photos.map((src, i) => (
            <div key={i} className="overflow-hidden break-inside-avoid">
              <img src={src} alt={`Photo ${i + 1}`} className="w-full object-cover transition-opacity duration-300 hover:opacity-90" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
