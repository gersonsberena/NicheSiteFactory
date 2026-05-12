import type { CoachConfig } from "@/lib/useConfig"

export default function Gallery({ config }: { config: CoachConfig }) {
  const photos = config.gallery?.photos
  if (!photos?.length) return null
  return (
    <section id="gallery" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="absolute right-8 top-8 select-none pointer-events-none text-[160px] font-bold leading-none" style={{ color: "rgba(var(--accent-rgb),0.04)", fontFamily: "Space Grotesk, sans-serif" }}>07</div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-2" style={{ color: "rgba(var(--accent-rgb),0.7)", fontFamily: "Space Grotesk, sans-serif" }}>
          <div className="w-1 h-1" style={{ background: "var(--accent)" }} /> Visual
        </div>
        <h2 className="font-bold mb-10" style={{ fontFamily: "Space Grotesk, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>In Action</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {photos.map((src, i) => (
            <div key={i} className="overflow-hidden group" style={{ aspectRatio: "1" }}>
              <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" style={{ filter: "grayscale(20%)" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
