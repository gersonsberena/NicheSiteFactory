import type { CoachConfig } from "@/lib/useConfig"
import Eyebrow from "./Eyebrow"

export default function Gallery({ config }: { config: CoachConfig }) {
  const photos = config.gallery?.photos
  if (!photos?.length) return null

  return (
    <section className="py-24 md:py-32" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="mb-10">
          <Eyebrow>Gallery</Eyebrow>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {photos.map((src, i) => (
            <div key={i} className="relative overflow-hidden group" style={{ aspectRatio: "1" }}>
              <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(var(--accent-rgb),0.2)" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
