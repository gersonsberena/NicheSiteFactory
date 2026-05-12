import type { CoachConfig } from "@/lib/useConfig"

export default function Footer({ config }: { config: CoachConfig }) {
  const { about, contact } = config
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: "var(--bg2)", borderTop: "1px solid rgba(var(--accent-rgb),0.2)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <a href="#top" className="flex items-center gap-3 mb-3">
            <div
              className="w-7 h-7 flex items-center justify-center text-[11px] font-extrabold tracking-widest"
              style={{ border: "1px solid var(--accent)", color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}
            >
              {about.name.charAt(0).toUpperCase()}
            </div>
            <span
              className="text-[13px] font-bold tracking-[0.18em] uppercase"
              style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}
            >
              {about.name}
            </span>
          </a>
          <p className="text-[12px]" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
            {about.sport ?? "Sports"} Coach · {about.city}{about.state ? `, ${about.state}` : ""}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {[["About", "#about"], ["Services", "#services"], ["FAQ", "#faq"], ["Contact", "#contact"]].map(([t, h]) => (
            <a
              key={h}
              href={h}
              className="text-[12px] tracking-wide transition-colors"
              style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
            >
              {t}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          {contact.instagram && (
            <a href={`https://instagram.com/${contact.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
              className="text-[12px] transition-colors" style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
            >
              IG
            </a>
          )}
          {contact.twitter && (
            <a href={`https://twitter.com/${contact.twitter.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
              className="text-[12px] transition-colors" style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
            >
              X
            </a>
          )}
          {contact.youtube && (
            <a href={contact.youtube} target="_blank" rel="noopener noreferrer"
              className="text-[12px] transition-colors" style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
            >
              YT
            </a>
          )}
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(var(--accent-rgb),0.1)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <p className="text-[11px]" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
            © {year} {about.name}. All rights reserved.
          </p>
          <p className="text-[11px]" style={{ color: "rgba(var(--accent-rgb),0.4)", fontFamily: "Inter, sans-serif" }}>
            Elite Coaching Services
          </p>
        </div>
      </div>
    </footer>
  )
}
