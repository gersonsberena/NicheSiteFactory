import type { CoachConfig } from "@/lib/useConfig"

export default function Gallery({ config }: { config: CoachConfig }) {
  const photos = config.gallery?.photos
  if (!photos?.length) return null
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <h2 className="font-bold text-[36px] mb-3" style={{ fontFamily: "Roboto Slab, serif", color: "var(--accent)", letterSpacing: "-0.02em" }}>In Action</h2>
        <div className="h-[2px] w-16 mb-10" style={{ background: "var(--accent)" }} />
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
