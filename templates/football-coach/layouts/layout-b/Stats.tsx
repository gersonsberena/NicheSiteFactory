import type { CoachConfig, Stat } from "@/lib/useConfig"

export default function Stats({ config }: { config: CoachConfig }) {
  const stats = (config.stats ?? []) as Stat[]

  return (
    <section className="bg-[var(--b-primary-50)] border-y border-[var(--b-primary-100)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 md:py-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="text-center pb-5 sm:pb-0 border-b border-[var(--b-primary-100)] sm:border-b-0 last:border-0"
          >
            <div className="font-poppins font-extrabold text-5xl md:text-6xl text-[var(--b-primary-700)] leading-none">
              {s.value}
            </div>
            <div className="mt-2 text-sm font-medium uppercase tracking-wider text-[#1A1A1A]/60">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
