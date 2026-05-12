import type { CoachConfig } from "@/lib/useConfig"

export default function Gallery({ config }: { config: CoachConfig }) {
  const photos = config.gallery?.photos
  if (!photos?.length) return null
  return (
    <section id="gallery" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>
          <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
          Visual Data
        </div>
        <h2 className="font-bold mb-3" style={{ fontFamily: "DM Sans, sans-serif", color: "var(--text)", fontSize: "clamp(28px,4vw,44px)" }}>In Action</h2>
        <div className="h-px mb-12 max-w-[60px]" style={{ background: "var(--accent)" }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {photos.map((src, i) => (
            <div key={i} className="overflow-hidden group" style={{ aspectRatio: "1" }}>
              <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
