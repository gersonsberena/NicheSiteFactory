"use client"
import { useState, useEffect } from "react"
import type { CoachConfig } from "@/lib/useConfig"

export default function Nav({ config, onCTA }: { config: CoachConfig; onCTA: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const name = config.about.name
  const initial = name.charAt(0).toUpperCase()
  const links = [
    ["About", "#about"],
    ["Services", "#services"],
    ["Placements", "#placements"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "rgba(var(--bg, 11,22,40),0.96)",
        backdropFilter: "blur(8px)",
        borderBottom: scrolled ? "1px solid rgba(var(--accent-rgb),0.35)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <div
            className="w-7 h-7 flex items-center justify-center text-[11px] font-extrabold tracking-widest"
            style={{ border: "1px solid var(--accent)", color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}
          >
            {initial}
          </div>
          <span
            className="text-[14px] font-bold tracking-[0.18em] uppercase"
            style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}
          >
            {name}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map(([t, h]) => (
            <a
              key={h}
              href={h}
              className="text-[13px] tracking-wide transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {t}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={onCTA}
            className="px-5 py-2.5 text-[12px] font-semibold tracking-[0.18em] uppercase transition-colors"
            style={{
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              fontFamily: "Montserrat, sans-serif",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.background = "var(--accent)"
              el.style.color = "var(--bg)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.background = "transparent"
              el.style.color = "var(--accent)"
            }}
          >
            {config.hero.cta_text || "Request Consultation"}
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="menu" style={{ color: "var(--accent)" }}>
          <div className="w-6 flex flex-col gap-[5px]">
            <span className={`block h-px transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} style={{ background: "var(--accent)" }} />
            <span className={`block h-px ${open ? "opacity-0" : ""}`} style={{ background: "var(--accent)" }} />
            <span className={`block h-px transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} style={{ background: "var(--accent)" }} />
          </div>
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"}`}
        style={{ background: "var(--bg2)", borderTop: "1px solid rgba(var(--accent-rgb),0.2)" }}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {links.map(([t, h]) => (
            <a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="text-sm tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {t}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); onCTA() }}
            className="mt-2 px-5 py-3 text-[12px] tracking-[0.18em] uppercase font-semibold text-center"
            style={{ border: "1px solid var(--accent)", color: "var(--accent)" }}
          >
            {config.hero.cta_text || "Request Consultation"}
          </button>
        </div>
      </div>
    </header>
  )
}
