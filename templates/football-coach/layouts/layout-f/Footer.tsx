import type { CoachConfig } from "@/lib/useConfig"

export default function Footer({ config }: { config: CoachConfig }) {
  const { about, contact } = config
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid rgba(var(--accent-rgb),0.15)" }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <a href="#top" className="font-black text-[20px] uppercase tracking-[-0.01em]" style={{ fontFamily: "Barlow Condensed, sans-serif", color: "var(--accent)" }}>
            {about.name}
          </a>
          <p className="text-[12px] mt-1" style={{ color: "var(--text-muted)", fontFamily: "Barlow, sans-serif" }}>
            {about.sport ?? "Sports"} Coach · {about.city}{about.state ? `, ${about.state}` : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[["About", "#about"], ["Training", "#services"], ["FAQ", "#faq"], ["Contact", "#contact"]].map(([t, h]) => (
            <a key={h} href={h} className="text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors"
              style={{ color: "var(--text-muted)", fontFamily: "Barlow Condensed, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
            >
              {t}
            </a>
          ))}
        </div>
        <p className="text-[11px]" style={{ color: "var(--text-muted)", fontFamily: "Barlow, sans-serif" }}>
          © {year} {about.name}
        </p>
      </div>
    </footer>
  )
}
