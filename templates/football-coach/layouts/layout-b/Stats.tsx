import type { CoachConfig, Stat } from "@/lib/useConfig"

export default function Stats({ config }: { config: CoachConfig }) {
  const stats = (config.stats ?? []) as Stat[]
  const layout = config.design?.b_stats_layout ?? "accent-bar"

  if (layout === "primary-fill") {
    return (
      <section className="bg-[var(--b-primary-700)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`text-center py-5 sm:py-0 ${
                i < stats.length - 1
                  ? "border-b border-white/20 sm:border-b-0 sm:border-r sm:border-white/20"
                  : ""
              }`}
            >
              <div className="font-poppins font-extrabold text-5xl md:text-6xl text-white leading-none">
                {s.value}
              </div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-[var(--b-accent)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (layout === "centered-large") {
    return (
      <section className="bg-white border-y border-[var(--b-primary-100)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-poppins font-extrabold text-7xl md:text-8xl text-[var(--b-accent)] leading-none">
                {s.value}
              </div>
              <div className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--b-primary-700)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // accent-bar (default)
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
