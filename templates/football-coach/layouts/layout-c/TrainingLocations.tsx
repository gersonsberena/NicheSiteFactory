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
    <section id="training_locations" className="py-20 bg-[#F9FAFB]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="mb-12 reveal">
          <span className="c-label text-[#6B7280] block mb-3">Training Locations</span>
          <div className="c-rule-accent mb-4" />
          <h2 className="font-['Playfair_Display'] font-black text-3xl sm:text-4xl text-[#111827]">
            Where Coach {firstName} Trains
          </h2>
          <p className="mt-3 text-[#6B7280] text-sm">
            Don&apos;t see your area? Reach out — more locations may be available.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 reveal">
          {displayCities.map((city, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 bg-white border border-[#E5E7EB] px-5 py-2.5 hover:border-[var(--accent)] transition-colors"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <Icons.Pin className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0" />
              <span className="text-[#374151] text-sm font-medium c-label">
                {city}, {state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
