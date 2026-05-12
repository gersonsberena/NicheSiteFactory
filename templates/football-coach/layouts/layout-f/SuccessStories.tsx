import type { CoachConfig } from "@/lib/useConfig"
import Eyebrow from "./Eyebrow"

export default function SuccessStories({ config }: { config: CoachConfig }) {
  const stories = config.success_stories
  if (!stories?.length) return null

  return (
    <section id="success-stories" className="py-24 md:py-32" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <Eyebrow>Proof of Performance</Eyebrow>
          <h2
            className="font-black leading-[0.92]"
            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "clamp(40px, 5vw, 64px)", textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--text)" }}
          >
            Athlete Results
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stories.map((s, i) => (
            <div
              key={i}
              style={{ background: "var(--bg)", border: "1px solid rgba(var(--accent-rgb),0.1)", padding: "28px 24px", borderLeft: "3px solid var(--accent)" }}
            >
              <div className="font-black text-[18px] uppercase mb-2" style={{ fontFamily: "Barlow Condensed, sans-serif", color: "var(--text)" }}>
                {s.name}
              </div>
              {s.result && (
                <div className="text-[24px] font-black uppercase mb-4" style={{ fontFamily: "Barlow Condensed, sans-serif", color: "var(--accent)", letterSpacing: "-0.01em" }}>
                  {s.result}
                </div>
              )}
              {s.story && (
                <p className="text-[14px] leading-[1.7]" style={{ color: "var(--text-muted)", fontFamily: "Barlow, sans-serif" }}>
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
