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

  const links = [["About", "#about"], ["Services", "#services"], ["FAQ", "#faq"], ["Contact", "#contact"]]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(var(--bg-rgb,245,240,232),0.97)" : "rgba(var(--bg-rgb,245,240,232),0.95)",
        backdropFilter: "blur(6px)",
        borderBottom: scrolled ? "1px solid rgba(var(--accent-rgb),0.3)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
        <a href="#top" className="font-bold text-[18px]" style={{ fontFamily: "Roboto Slab, serif", color: "var(--accent)", letterSpacing: "-0.01em" }}>
          {config.about.name}
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(([t, h]) => (
            <a key={h} href={h} className="text-[14px] transition-colors" style={{ fontFamily: "Roboto, sans-serif", color: "var(--text-muted)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
            >
              {t}
            </a>
          ))}
        </nav>
        <button onClick={onCTA} className="hidden lg:block px-5 py-2.5 text-[13px] font-semibold transition-colors"
          style={{ border: "1px solid var(--accent)", color: "var(--accent)", fontFamily: "Roboto Slab, serif" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "var(--accent)"; el.style.color = "white" }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "transparent"; el.style.color = "var(--accent)" }}
        >
          {config.hero.cta_text || "Book a Session"}
        </button>
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="menu">
          <div className="w-6 flex flex-col gap-[5px]">
            <span className={`block h-px transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} style={{ background: "var(--accent)" }} />
            <span className={`block h-px ${open ? "opacity-0" : ""}`} style={{ background: "var(--accent)" }} />
            <span className={`block h-px transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} style={{ background: "var(--accent)" }} />
          </div>
        </button>
      </div>
      <div className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-72" : "max-h-0"}`}
        style={{ borderTop: "1px solid rgba(var(--accent-rgb),0.2)" }}>
        <div className="px-6 py-5 flex flex-col gap-4">
          {links.map(([t, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="text-[14px]" style={{ color: "var(--text-muted)", fontFamily: "Roboto, sans-serif" }}>{t}</a>
          ))}
          <button onClick={() => { setOpen(false); onCTA() }} className="mt-2 py-3 text-[13px] font-semibold" style={{ border: "1px solid var(--accent)", color: "var(--accent)", fontFamily: "Roboto Slab, serif" }}>
            {config.hero.cta_text || "Book a Session"}
          </button>
        </div>
      </div>
    </header>
  )
}
