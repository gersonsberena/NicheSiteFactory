"use client"
import { useState } from "react"
import { useScrolled } from "@/lib/hooks"
import type { CoachConfig } from "@/lib/useConfig"

export default function Nav({ config, onCTA }: { config: CoachConfig; onCTA: () => void }) {
  const { about } = config
  const scrolled = useScrolled(20)
  const [open, setOpen] = useState(false)

  const links = [
    ["About", "#about"], ["Services", "#services"],
    ["Testimonials", "#testimonials"], ["Contact", "#contact"],
  ]

  const navBg = scrolled
    ? "rgba(9,9,11,0.9)"
    : "transparent"

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: navBg, backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#" className="font-bold text-[15px] tracking-tight" style={{ color: "white", fontFamily: "DM Sans, sans-serif" }}>
          {about.name}
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-[13px] font-medium transition-colors"
              style={{ color: "rgba(255,255,255,0.55)", fontFamily: "DM Sans, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "white")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}>{label}</a>
          ))}
          <button onClick={onCTA}
            className="px-5 py-2 text-[13px] font-semibold rounded-full transition-all duration-200"
            style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "DM Sans, sans-serif" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}>
            {config.hero?.cta_text || "Get Started"}
          </button>
        </div>
        <button className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5" onClick={() => setOpen(!open)}>
          <span className="block h-0.5 w-6 transition-all" style={{ background: "rgba(255,255,255,0.7)" }} />
          <span className="block h-0.5 w-4 transition-all" style={{ background: "rgba(255,255,255,0.7)" }} />
          <span className="block h-0.5 w-6 transition-all" style={{ background: "rgba(255,255,255,0.7)" }} />
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 pt-2"
          style={{ background: "rgba(9,9,11,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex flex-col gap-4">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                className="text-[15px] font-medium" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "DM Sans, sans-serif" }}>{label}</a>
            ))}
            <button onClick={() => { onCTA(); setOpen(false) }}
              className="mt-2 px-5 py-2.5 text-[13px] font-semibold rounded-full self-start"
              style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "DM Sans, sans-serif" }}>
              {config.hero?.cta_text || "Get Started"}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
