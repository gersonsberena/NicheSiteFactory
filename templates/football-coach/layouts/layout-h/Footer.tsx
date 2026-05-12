import type { CoachConfig } from "@/lib/useConfig"

export default function Footer({ config }: { config: CoachConfig }) {
  const { about, contact } = config
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid rgba(var(--accent-rgb),0.15)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-bold text-[18px] mb-1" style={{ fontFamily: "DM Sans, sans-serif", color: "var(--text)" }}>{about.name}</div>
          <div className="text-[12px]" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>{about.sport ?? "Sports"} Coach · {about.city}{about.state ? `, ${about.state}` : ""}</div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[["About", "#about"], ["Services", "#services"], ["FAQ", "#faq"], ["Contact", "#contact"]].map(([t, h]) => (
            <a key={h} href={h} className="text-[13px] transition-colors" style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}>{t}</a>
          ))}
        </div>
        <p className="text-[11px]" style={{ color: "var(--text-muted)", fontFamily: "DM Mono, monospace" }}>© {year} {about.name}</p>
      </div>
    </footer>
  )
}
