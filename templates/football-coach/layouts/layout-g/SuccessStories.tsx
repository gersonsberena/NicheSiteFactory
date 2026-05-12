import type { CoachConfig } from "@/lib/useConfig"

export default function SuccessStories({ config }: { config: CoachConfig }) {
  const stories = config.success_stories
  if (!stories?.length) return null
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <h2 className="font-bold text-[36px] md:text-[44px] mb-3 leading-tight" style={{ fontFamily: "Roboto Slab, serif", color: "var(--accent)", letterSpacing: "-0.02em" }}>Success Stories</h2>
        <div className="h-[2px] w-16 mb-12" style={{ background: "var(--accent)" }} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <div key={i} style={{ background: "var(--bg)", border: "1px solid rgba(var(--accent-rgb),0.15)", padding: "24px" }}>
              <div className="font-bold text-[17px] mb-2" style={{ fontFamily: "Roboto Slab, serif", color: "var(--text)" }}>{s.name}</div>
              {s.result && <div className="text-[14px] font-semibold mb-3" style={{ color: "var(--accent)", fontFamily: "Roboto, sans-serif" }}>{s.result}</div>}
              {s.story && <p className="text-[14px] leading-[1.7]" style={{ color: "var(--text-muted)", fontFamily: "Roboto, sans-serif" }}>{s.story}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
