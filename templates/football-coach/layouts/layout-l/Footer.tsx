import type { CoachConfig } from "@/lib/useConfig"

export default function Footer({ config }: { config: CoachConfig }) {
  const { about } = config
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-bold text-[16px] mb-1" style={{ fontFamily: "DM Sans, sans-serif", color: "white" }}>{about.name}</div>
          <div className="text-[12px]" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>{about.sport ?? "Sports"} Coach · {about.city}</div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[["About", "#about"], ["Services", "#services"], ["Testimonials", "#testimonials"], ["Contact", "#contact"]].map(([t, h]) => (
            <a key={h} href={h} className="text-[12px] transition-colors" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "DM Sans, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "white")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)")}>{t}</a>
          ))}
        </div>
        <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "DM Sans, sans-serif" }}>© {year} {about.name}</p>
      </div>
    </footer>
  )
}
