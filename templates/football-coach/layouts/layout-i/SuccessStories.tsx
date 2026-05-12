import type { CoachConfig } from "@/lib/useConfig"
import Ornament from "./Ornament"

export default function SuccessStories({ config }: { config: CoachConfig }) {
  const { success_stories } = config
  if (!success_stories?.length) return null
  return (
    <section id="success" className="py-20 md:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>Chapter V</div>
        <h2 className="font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--text)", fontSize: "clamp(32px,4vw,52px)" }}>Success Stories</h2>
        <Ornament />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {success_stories.map((s, i) => (
            <div key={i} style={{ borderTop: "1px solid rgba(var(--accent-rgb),0.2)", paddingTop: "24px" }}>
              {s.result && <div className="text-[28px] font-bold mb-2" style={{ fontFamily: "Playfair Display, serif", color: "var(--accent)" }}>{s.result}</div>}
              <div className="font-bold text-[16px] mb-3" style={{ color: "var(--text)", fontFamily: "Playfair Display, serif" }}>{s.name}</div>
              <p className="text-[15px] leading-[1.75]" style={{ color: "var(--text-muted)", fontFamily: "Source Sans 3, sans-serif" }}>{s.story}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
