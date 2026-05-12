import type { CoachConfig } from "@/lib/useConfig"

export default function SuccessStories({ config }: { config: CoachConfig }) {
  const stories = config.success_stories
  if (!stories?.length) return null

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <div className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
            Athlete Success
          </div>
          <div className="h-px w-[60px] mb-6" style={{ background: "var(--accent)" }} />
          <h2
            className="font-extrabold text-[36px] md:text-[48px] leading-[1.05]"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em", color: "var(--text)" }}
          >
            Success Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(var(--accent-rgb),0.15)",
                padding: "28px 24px",
              }}
            >
              <div className="font-bold text-[18px] mb-2" style={{ color: "var(--text)", fontFamily: "Montserrat, sans-serif" }}>
                {s.name}
              </div>
              {s.result && (
                <div className="text-[12px] font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
                  {s.result}
                </div>
              )}
              {s.story && (
                <p className="text-[14px] leading-[1.7]" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
                  {s.story}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
