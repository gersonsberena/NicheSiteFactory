import type { CoachConfig } from "@/lib/useConfig"

export default function Placements({ config }: { config: CoachConfig }) {
  const { placements } = config
  if (!placements?.length) return null

  return (
    <section id="placements" className="py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <div className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
            Placement Record
          </div>
          <div className="h-px w-[60px] mb-6" style={{ background: "var(--accent)" }} />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-extrabold text-[36px] md:text-[48px] leading-[1.05]"
              style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em", color: "var(--text)" }}
            >
              College Placements
            </h2>
            <div
              className="font-extrabold text-[48px] md:text-[64px] leading-none"
              style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.04em", color: "var(--accent)" }}
            >
              {placements.length}+
            </div>
          </div>
        </div>

        <div className="space-y-0">
          {placements.map((p, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-5 transition-all duration-200"
              style={{
                borderBottom: "1px solid rgba(var(--accent-rgb),0.15)",
                borderLeft: "2px solid transparent",
                paddingLeft: "16px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderLeftColor = "var(--accent)"
                el.style.paddingLeft = "24px"
                el.style.background = "rgba(var(--accent-rgb),0.03)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderLeftColor = "transparent"
                el.style.paddingLeft = "16px"
                el.style.background = "transparent"
              }}
            >
              <div className="flex items-center gap-6">
                <div
                  className="text-[11px] font-bold w-10 flex-shrink-0"
                  style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif", letterSpacing: "0.1em" }}
                >
                  {p.year}
                </div>
                <div>
                  <div className="font-semibold text-[16px]" style={{ color: "var(--text)", fontFamily: "Montserrat, sans-serif" }}>
                    {p.name}
                  </div>
                  {p.position && (
                    <div className="text-[12px] mt-0.5" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
                      {p.position}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-2 sm:mt-0 sm:text-right pl-16 sm:pl-0">
                <div className="font-semibold text-[15px]" style={{ color: "var(--text)", fontFamily: "Montserrat, sans-serif" }}>
                  {p.school}
                </div>
                {p.scholarship && (
                  <div className="text-[11px] font-semibold tracking-[0.15em] uppercase mt-0.5" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
                    {p.scholarship}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
