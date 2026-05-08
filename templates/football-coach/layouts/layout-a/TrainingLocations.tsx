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
    <section id="training_locations" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <p className="text-[var(--accent)] text-xs font-bold tracking-widest uppercase mb-2">Training Locations</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Where Coach {firstName} Trains</h2>
          <p className="mt-3 text-zinc-500 text-sm max-w-md mx-auto">
            Don&apos;t see your area? Reach out — more locations may be available.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 reveal">
          {displayCities.map((city, i) => (
            <div
              key={i}
              className="flex items-center gap-2 border border-[rgba(var(--accent-rgb),0.25)] rounded-full px-5 py-2.5 bg-[rgba(var(--accent-rgb),0.06)] hover:border-[rgba(var(--accent-rgb),0.5)] transition-colors"
            >
              <Icons.Pin className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0" />
              <span className="text-zinc-200 text-sm font-medium">
                {city}, {state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
