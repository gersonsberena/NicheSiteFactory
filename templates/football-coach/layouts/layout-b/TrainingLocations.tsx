import type { CoachConfig } from "@/lib/useConfig"
import { Icons } from "@/lib/icons"

export default function TrainingLocations({ config }: { config: CoachConfig }) {
  const cities = (config.training_cities ?? []) as string[]
  const fallback = config.about?.city as string | undefined
  const state = (config.about?.state as string) ?? "FL"
  const displayCities = cities.length > 0 ? cities : fallback ? [fallback] : []
  const firstName = (config.about?.name as string || "Coach").split(" ").find((w) => w !== "Coach") ?? "Coach"

  if (!displayCities.length) return null

  return (
    <section id="training_locations" className="py-20 md:py-28 bg-[var(--b-primary-50)]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-primary-700)] mb-2">
            Training Locations
          </div>
          <h2 className="font-poppins font-extrabold text-3xl md:text-4xl tracking-tight text-[#1A1A1A]">
            Where Coach {firstName} Trains
          </h2>
          <p className="mt-3 text-[#1A1A1A]/50 text-sm max-w-md mx-auto">
            Don&apos;t see your area? Reach out — more locations may be available.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {displayCities.map((city, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 bg-white border border-[var(--b-primary-100)] rounded-full px-5 py-2.5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
            >
              <Icons.Pin className="w-3.5 h-3.5 text-[var(--b-accent)] flex-shrink-0" />
              <span className="text-[#1A1A1A] text-sm font-medium">
                {city}, {state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
