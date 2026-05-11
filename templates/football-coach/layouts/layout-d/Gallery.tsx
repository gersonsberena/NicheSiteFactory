import Image from "next/image"
import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
}

export default function Gallery({ config }: Props) {
  const photos = config.gallery?.photos ?? []

  if (photos.length === 0) return null

  return (
    <section id="gallery" className="bg-d-warmwhite py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-10 md:mb-14">
          <div className="d-label-caps text-d-amber mb-3">On the Field</div>
          <h2 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-4xl md:text-5xl leading-[1.1]">
            Behind the Reps.
          </h2>
        </div>

        {/* Mobile: horizontal scroll; Desktop: 5-col grid */}
        <div className="flex gap-3 overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-5 md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none">
          {photos.map((src, i) => (
            <div
              key={i}
              className="d-photo-tile flex-none w-48 md:w-auto aspect-[3/4] rounded-sm overflow-hidden snap-start"
            >
              <Image
                src={src}
                alt={`Training photo ${i + 1}`}
                width={300}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
