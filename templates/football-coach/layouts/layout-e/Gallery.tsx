import type { CoachConfig } from "@/lib/useConfig"

export default function Gallery({ config }: { config: CoachConfig }) {
  const photos = config.gallery?.photos
  if (!photos?.length) return null

  return (
    <section className="py-24 md:py-32" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <div className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
            In Action
          </div>
          <div className="h-px w-[60px]" style={{ background: "var(--accent)" }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {photos.map((src, i) => (
            <div key={i} className="relative overflow-hidden group" style={{ aspectRatio: "1" }}>
              <img
                src={src}
                alt={`Gallery photo ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(var(--accent-rgb),0.25)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
