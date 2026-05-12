import type { CoachConfig } from "@/lib/useConfig"

export default function SuccessStories({ config }: { config: CoachConfig }) {
  const stories = config.success_stories
  if (!stories?.length) return null
  return (
    <section id="success-stories" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.2)", color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
          Results
        </div>
        <h2 className="font-bold mb-12" style={{ fontFamily: "DM Sans, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>
          Athlete Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stories.map((s, i) => (
            <div key={i} className="rounded-xl p-7"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-[13px] font-bold mb-2" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>{s.athlete}</div>
              {s.result && (
                <div className="text-[22px] font-bold mb-3" style={{ color: "white", fontFamily: "DM Sans, sans-serif" }}>{s.result}</div>
              )}
              {s.story && (
                <p className="text-[13px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "DM Sans, sans-serif" }}>{s.story}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
