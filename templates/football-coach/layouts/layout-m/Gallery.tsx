import type { CoachConfig } from "@/lib/useConfig"

export default function Gallery({ config }: { config: CoachConfig }) {
  const photos = config.gallery?.photos
  if (!photos?.length) return null
  return (
    <section id="gallery" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>08 — Gallery</div>
        <h2 className="font-bold mb-10" style={{ fontFamily: "DM Serif Display, serif", color: "white", fontSize: "clamp(28px,4vw,52px)" }}>
          In Action
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {photos.map((src, i) => (
            <figure key={i} className="overflow-hidden group m-0">
              <img src={src} alt={`Photo ${i + 1}`} className="w-full object-cover transition-all duration-500 group-hover:scale-105"
                style={{ aspectRatio: "1", filter: "grayscale(20%) brightness(0.85)" }} />
              <figcaption className="text-[10px] uppercase tracking-[0.15em] mt-2" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "DM Sans, sans-serif" }}>
                {String(i + 1).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
