import Image from "next/image"
import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
}

function GalleryHeader({ label, heading }: { label: string; heading: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="d-label-caps text-d-amber mb-3">{label}</div>
      <h2 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-4xl md:text-5xl leading-[1.1]">
        {heading}
      </h2>
    </div>
  )
}

export default function Gallery({ config }: Props) {
  const photos = config.gallery?.photos ?? []
  const layout = config.design?.d_gallery_layout ?? "scroll-strip"
  const label = config.copy_variants?.gallery_label ?? "In Action"
  const heading = "Behind the Reps."

  if (photos.length === 0) return null

  if (layout === "grid-2col") {
    return (
      <section id="gallery" className="bg-d-warmwhite py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <GalleryHeader label={label} heading={heading} />
          <div className="grid grid-cols-2 gap-4">
            {photos.map((src, i) => (
              <div key={i} className="d-photo-tile aspect-square rounded-sm overflow-hidden">
                <Image src={src} alt={`Training photo ${i + 1}`} width={600} height={600} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (layout === "grid-3col") {
    return (
      <section id="gallery" className="bg-d-warmwhite py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <GalleryHeader label={label} heading={heading} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((src, i) => (
              <div key={i} className="d-photo-tile aspect-[4/5] rounded-sm overflow-hidden">
                <Image src={src} alt={`Training photo ${i + 1}`} width={400} height={500} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // default: scroll-strip — mobile horizontal scroll, desktop 5-col grid
  return (
    <section id="gallery" className="bg-d-warmwhite py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <GalleryHeader label={label} heading={heading} />
        <div className="flex gap-3 overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-5 md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none">
          {photos.map((src, i) => (
            <div key={i} className="d-photo-tile flex-none w-48 md:w-auto aspect-[3/4] rounded-sm overflow-hidden snap-start">
              <Image src={src} alt={`Training photo ${i + 1}`} width={300} height={400} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
