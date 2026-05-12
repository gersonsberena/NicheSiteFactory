import type { CoachConfig } from "@/lib/useConfig"
import CountUp from "./CountUp"

export default function StatsBar({ config }: { config: CoachConfig }) {
  if (!config.stats?.length) return null
  return (
    <section
      className="py-14"
      style={{
        background: "var(--bg2)",
        clipPath: "polygon(0 8%, 100% 0%, 100% 92%, 0% 100%)",
        marginTop: "-2px",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-4 grid"
        style={{ gridTemplateColumns: `repeat(${Math.min(config.stats.length, 4)}, 1fr)` }}
      >
        {config.stats.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center px-4"
            style={{ borderLeft: i > 0 ? "1px solid rgba(var(--accent-rgb),0.15)" : "none" }}
          >
            <div
              className="font-black leading-none"
              style={{
                fontFamily: "Barlow Condensed, sans-serif",
                fontSize: "clamp(48px, 6vw, 80px)",
                letterSpacing: "-0.02em",
                color: "var(--accent)",
              }}
            >
              <CountUp target={s.value} />
            </div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase mt-3" style={{ color: "var(--text-muted)", fontFamily: "Barlow Condensed, sans-serif" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
