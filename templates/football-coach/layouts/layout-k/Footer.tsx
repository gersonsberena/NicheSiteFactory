import type { CoachConfig } from "@/lib/useConfig"

export default function Footer({ config }: { config: CoachConfig }) {
  const { about } = config
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid rgba(var(--accent-rgb),0.12)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-bold text-[16px] uppercase tracking-[0.15em] mb-1" style={{ fontFamily: "Space Grotesk, sans-serif", color: "white" }}>{about.name}</div>
          <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--accent)", fontFamily: "Inter, sans-serif" }}>{about.sport ?? "Sports"} Coach · {about.city}</div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[["About", "#about"], ["Services", "#services"], ["FAQ", "#faq"], ["Contact", "#contact"]].map(([t, h]) => (
            <a key={h} href={h} className="text-[11px] uppercase tracking-[0.15em] transition-colors" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)")}>{t}</a>
          ))}
        </div>
        <p className="text-[11px] uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Inter, sans-serif" }}>© {year} {about.name}</p>
      </div>
    </footer>
  )
}
