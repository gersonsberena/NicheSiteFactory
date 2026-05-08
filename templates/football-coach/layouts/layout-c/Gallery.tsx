import type { CoachConfig } from "@/lib/useConfig"

export default function Gallery({ config }: { config: CoachConfig }) {
  const layout = config.design?.c_gallery_layout ?? "asymmetric"
  const photos = config.gallery?.photos as string[]
  if (!photos?.length) return null

  const label = config.copy_variants?.gallery_label ?? "In Action"

  return (
    <section id="gallery" className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-12 reveal">
          <span className="c-label text-[#6B7280] block mb-4">{label}</span>
          <div className="c-rule-accent mb-6" />
          <h2 className="font-['Playfair_Display'] font-black text-4xl sm:text-5xl text-[#111827] leading-tight">
            On the Field.
          </h2>
        </div>

        {layout === "asymmetric" ? (
          <AsymmetricGallery photos={photos} />
        ) : (
          <GridGallery photos={photos} />
        )}
      </div>
    </section>
  )
}

function AsymmetricGallery({ photos }: { photos: string[] }) {
  const cycle = (i: number) => photos[i % photos.length]

  return (
    <div className="grid grid-cols-12 gap-3 reveal">
      {/* Tile 1 — tall left */}
      <div className="col-span-12 md:col-span-5 c-gallery-tile aspect-[4/5] overflow-hidden relative group">
        <img src={cycle(0)} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(var(--accent-rgb),0.15)" }} />
      </div>

      {/* Tiles 2 + 3 — two stacked on right top */}
      <div className="col-span-12 md:col-span-7 grid grid-cols-2 gap-3">
        <div className="c-gallery-tile aspect-square overflow-hidden relative group">
          <img src={cycle(1)} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(var(--accent-rgb),0.15)" }} />
        </div>
        <div className="c-gallery-tile aspect-square overflow-hidden relative group">
          <img src={cycle(2)} alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(var(--accent-rgb),0.15)" }} />
        </div>

        {/* Tile 4 — wide bottom left of right col */}
        <div className="c-gallery-tile col-span-1 aspect-[4/3] overflow-hidden relative group">
          <img src={cycle(3)} alt="Gallery 4" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(var(--accent-rgb),0.15)" }} />
        </div>

        {/* Tile 5 — bottom right of right col */}
        <div className="c-gallery-tile col-span-1 aspect-[4/3] overflow-hidden relative group">
          <img src={cycle(4)} alt="Gallery 5" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(var(--accent-rgb),0.15)" }} />
        </div>
      </div>
    </div>
  )
}

function GridGallery({ photos }: { photos: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 reveal">
      {photos.map((src, i) => (
        <div key={i} className="c-gallery-tile aspect-square overflow-hidden relative group">
          <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(var(--accent-rgb),0.15)" }} />
        </div>
      ))}
    </div>
  )
}
