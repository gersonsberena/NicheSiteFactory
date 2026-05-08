import type { CoachConfig } from "@/lib/useConfig"

export default function StatsBar({ config }: { config: CoachConfig }) {
  const stats = config.stats as Array<{ value: string; label: string }>

  return (
    <section id="stats" className="border-t-2 border-b-2 border-[var(--accent)] py-10 bg-white reveal">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="font-['Playfair_Display'] font-black text-4xl sm:text-5xl text-[var(--accent)] leading-none tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-xs c-label text-[#6B7280]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
