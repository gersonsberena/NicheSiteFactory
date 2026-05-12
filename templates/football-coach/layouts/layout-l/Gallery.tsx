import type { CoachConfig } from "@/lib/useConfig"

export default function Gallery({ config }: { config: CoachConfig }) {
  const photos = config.gallery?.photos
  if (!photos?.length) return null
  return (
    <section id="gallery" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.2)", color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
          Gallery
        </div>
        <h2 className="font-bold mb-10" style={{ fontFamily: "DM Sans, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>
          In Action
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ gridAutoRows: "200px" }}>
          {photos.map((src, i) => (
            <div key={i} className={`overflow-hidden rounded-xl ${i === 0 || i === 5 ? "row-span-2" : ""}`}>
              <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover transition-all duration-500"
                style={{ filter: "brightness(0.85)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.filter = "brightness(1) scale(1.03)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.filter = "brightness(0.85) scale(1)")} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
