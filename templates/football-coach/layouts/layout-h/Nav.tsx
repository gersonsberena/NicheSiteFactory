"use client"
import { useState, useEffect } from "react"
import type { CoachConfig } from "@/lib/useConfig"

export default function Nav({ config, onCTA }: { config: CoachConfig; onCTA: () => void }) {
  const { about, hero } = config
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const links = [["About", "#about"], ["Data", "#stats"], ["Services", "#services"], ["Results", "#success"], ["Contact", "#contact"]]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{ background: scrolled ? "rgba(255,255,255,0.97)" : "transparent", boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "none", backdropFilter: scrolled ? "blur(8px)" : "none" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center text-[13px] font-bold" style={{ background: "var(--accent)", color: "white", fontFamily: "DM Mono, monospace" }}>
            {about.name.split(" ").map((w: string) => w[0]).join("").slice(0,2)}
          </div>
          <span className="font-bold text-[15px]" style={{ color: "var(--text)", fontFamily: "DM Sans, sans-serif" }}>{about.name}</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(([t, h]) => (
            <a key={h} href={h} className="text-[13px] font-medium transition-colors" style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}>{t}</a>
          ))}
          <button onClick={onCTA} className="text-[13px] font-semibold px-5 py-2 transition-colors"
            style={{ background: "var(--accent)", color: "white", fontFamily: "DM Sans, sans-serif" }}>
            {hero.cta_text || "Book Now"}
          </button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: "var(--text)" }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 space-y-4" style={{ background: "white", borderTop: "1px solid rgba(var(--accent-rgb),0.1)" }}>
          {links.map(([t, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="block text-[14px] font-medium py-2" style={{ color: "var(--text)", fontFamily: "DM Sans, sans-serif" }}>{t}</a>)}
          <button onClick={() => { onCTA(); setOpen(false) }} className="w-full py-3 font-semibold text-[14px]" style={{ background: "var(--accent)", color: "white", fontFamily: "DM Sans, sans-serif" }}>{hero.cta_text || "Book Now"}</button>
        </div>
      )}
    </nav>
  )
}
