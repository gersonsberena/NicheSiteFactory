"use client"
import { useState, useEffect } from "react"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

export default function Nav({ config, onCTA }: { config: CoachConfig; onCTA?: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const lastName = config.about.name.replace(/^Coach\s+/i, "").split(" ").slice(-1)[0]

  const links = [
    ["About", "#about"],
    ["Services", "#services"],
    ["Testimonials", "#testimonials"],
    ["Gallery", "#gallery"],
    ["Contact", "#contact"],
  ]

  return (
    <>
      <header className={`c-nav-shell sticky top-0 z-40 bg-white/95 backdrop-blur-sm transition-all ${scrolled ? "scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <span className="font-['Playfair_Display'] font-black text-xl tracking-tight text-[var(--accent)]">
              {lastName}
            </span>
            <span className="hidden sm:block text-xs c-label text-[#6B7280]">
              {config.about.city} · {config.about.sport ?? "Football"}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(([label, href]) => (
              <a key={label} href={href} className="c-nav-link px-3 py-2 text-sm font-medium text-[#374151] hover:text-[var(--accent)] transition-colors">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <button
              onClick={onCTA}
              className="c-text-link text-sm font-semibold text-[var(--accent)] px-4 py-2 transition-colors"
            >
              {config.hero.cta_text}
            </button>
          </div>

          <button
            className="md:hidden p-2 text-[#374151] hover:text-[var(--accent)] transition-colors"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Icons.Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      <div
        className={`fixed inset-0 z-50 bg-white flex flex-col transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#F3F4F6]">
          <span className="font-['Playfair_Display'] font-black text-xl text-[var(--accent)]">{lastName}</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 text-[#374151] hover:text-[var(--accent)]">
            <Icons.Close className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col px-8 py-12 gap-8">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="font-['Playfair_Display'] font-bold text-4xl text-[#111827] hover:text-[var(--accent)] transition-colors"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); onCTA?.() }}
            className="mt-4 text-left font-['Playfair_Display'] font-bold text-4xl text-[var(--accent)]"
          >
            {config.hero.cta_text}
          </button>
        </nav>
      </div>
    </>
  )
}
