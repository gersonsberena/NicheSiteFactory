import type { CoachConfig } from "@/lib/useConfig"

export default function SuccessStories({ config }: { config: CoachConfig }) {
  const { success_stories } = config
  if (!success_stories?.length) return null
  return (
    <section id="success" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="absolute right-8 top-8 select-none pointer-events-none text-[160px] font-bold leading-none" style={{ color: "rgba(var(--accent-rgb),0.04)", fontFamily: "Space Grotesk, sans-serif" }}>04</div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-2" style={{ color: "rgba(var(--accent-rgb),0.7)", fontFamily: "Space Grotesk, sans-serif" }}>
          <div className="w-1 h-1" style={{ background: "var(--accent)" }} /> Outcomes
        </div>
        <h2 className="font-bold mb-12" style={{ fontFamily: "Space Grotesk, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>Athlete Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {success_stories.map((s, i) => (
            <div key={i} style={{ borderTop: "1px solid rgba(var(--accent-rgb),0.2)", paddingTop: "24px" }}>
              {s.result && <div className="text-[36px] font-bold mb-2 leading-none" style={{ fontFamily: "Space Grotesk, sans-serif", color: "var(--accent)" }}>{s.result}</div>}
              <div className="font-semibold text-[15px] mb-3" style={{ color: "white", fontFamily: "Space Grotesk, sans-serif" }}>{s.name}</div>
              <p className="text-[14px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>{s.story}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
