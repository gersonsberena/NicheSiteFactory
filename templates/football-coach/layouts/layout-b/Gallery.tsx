import type { CoachConfig } from "@/lib/useConfig"

const CAPTIONS = [
  "Saturday Practice",
  "Team Huddle",
  "Camp Session",
  "Game Day",
  "Footwork Drills",
  "Awards Night",
]

export default function Gallery({ config }: { config: CoachConfig }) {
  const photos = (config.gallery?.photos ?? []) as string[]

  if (!photos.length) return null

  return (
    <section id="gallery" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-primary-700)]">
              Snapshots
            </div>
            <h2 className="font-poppins font-extrabold text-3xl md:text-5xl mt-3 tracking-tight text-[#1A1A1A]">
              On the Field
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.slice(0, 6).map((src, i) => (
            <div
              key={i}
              className={`gtile relative overflow-hidden rounded-xl bg-[var(--b-primary-600)] ${
                i === 0 ? "col-span-2 md:col-span-1 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
              }`}
            >
              <img
                src={src}
                alt={CAPTIONS[i] ?? `Photo ${i + 1}`}
                className="gimg w-full h-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = "none"
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/55 to-transparent">
                <div className="text-white text-sm font-medium">{CAPTIONS[i] ?? `Photo ${i + 1}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
