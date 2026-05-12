import type { CoachConfig } from "@/lib/useConfig"

export default function SuccessStories({ config }: { config: CoachConfig }) {
  const stories = config.success_stories
  if (!stories?.length) return null
  return (
    <section id="success-stories" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>05 — Results</div>
        <h2 className="font-bold mb-12" style={{ fontFamily: "DM Serif Display, serif", color: "white", fontSize: "clamp(28px,4vw,52px)" }}>
          Athlete Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((s, i) => (
            <div key={i} className="border-t pt-8" style={{ borderColor: "rgba(var(--accent-rgb),0.2)" }}>
              <div className="text-[13px] font-bold mb-3" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>{s.athlete}</div>
              {s.result && (
                <div className="text-[20px] font-bold mb-3" style={{ color: "white", fontFamily: "DM Serif Display, serif" }}>{s.result}</div>
              )}
              {s.story && (
                <p className="text-[13px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "DM Sans, sans-serif" }}>{s.story}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
