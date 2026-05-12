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
  const links = [
    ["About", "#about"],
    ["Training", "#services"],
    ["Results", "#success-stories"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(var(--accent-rgb),0.3)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span
            className="text-[22px] font-black tracking-[-0.03em] uppercase"
            style={{ fontFamily: "Barlow Condensed, sans-serif", color: "var(--accent)" }}
          >
            {name.split(" ").map(w => w[0]).join("")}
          </span>
          <span
            className="hidden sm:block text-[13px] font-semibold tracking-[0.15em] uppercase"
            style={{ fontFamily: "Barlow Condensed, sans-serif", color: "var(--text)", letterSpacing: "0.15em" }}
          >
            {name}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map(([t, h]) => (
            <a
              key={h}
              href={h}
              className="text-[13px] font-semibold tracking-[0.12em] uppercase transition-colors"
              style={{ color: "var(--text-muted)", fontFamily: "Barlow Condensed, sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {t}
            </a>
          ))}
        </nav>

        <button
          onClick={onCTA}
          className="hidden lg:block px-5 py-2 text-[12px] font-bold tracking-[0.2em] uppercase transition-colors"
          style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "Barlow Condensed, sans-serif" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        >
          {config.hero.cta_text || "Train Now"}
        </button>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="menu">
          <div className="w-6 flex flex-col gap-[5px]">
            <span className={`block h-[2px] transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} style={{ background: "var(--accent)" }} />
            <span className={`block h-[2px] ${open ? "opacity-0" : ""}`} style={{ background: "var(--accent)" }} />
            <span className={`block h-[2px] transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} style={{ background: "var(--accent)" }} />
          </div>
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"}`}
        style={{ background: "var(--bg2)" }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {links.map(([t, h]) => (
            <a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="text-[14px] font-semibold tracking-[0.12em] uppercase"
              style={{ color: "var(--text-muted)", fontFamily: "Barlow Condensed, sans-serif" }}
            >
              {t}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); onCTA() }}
            className="mt-2 py-3 text-[13px] font-bold tracking-[0.2em] uppercase"
            style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "Barlow Condensed, sans-serif" }}
          >
            {config.hero.cta_text || "Train Now"}
          </button>
        </div>
      </div>
    </header>
  )
}
