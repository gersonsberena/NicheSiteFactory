import type { CoachConfig } from "@/lib/useConfig"

export default function SuccessStories({ config }: { config: CoachConfig }) {
  const { success_stories } = config
  if (!success_stories?.length) return null
  return (
    <section id="success" className="py-20 md:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>
          <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
          Case Studies
        </div>
        <h2 className="font-bold mb-3" style={{ fontFamily: "DM Sans, sans-serif", color: "var(--text)", fontSize: "clamp(28px,4vw,44px)" }}>Athlete Results</h2>
        <div className="h-px mb-12 max-w-[60px]" style={{ background: "var(--accent)" }} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {success_stories.map((s, i) => (
            <div key={i} style={{ background: "var(--bg-card)", border: "1px solid rgba(var(--accent-rgb),0.1)", padding: "28px 24px" }}>
              {s.result && (
                <div className="text-[32px] font-bold mb-3 leading-none" style={{ fontFamily: "DM Mono, monospace", color: "var(--accent)" }}>{s.result}</div>
              )}
              <div className="font-bold text-[16px] mb-2" style={{ color: "var(--text)", fontFamily: "DM Sans, sans-serif" }}>{s.name}</div>
              <p className="text-[14px] leading-[1.7]" style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>{s.story}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
