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

  const initials = config.about.name
    .replace(/^Coach\s+/i, "")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const links = [
    ["About", "#about"],
    ["Services", "#services"],
    ["Testimonials", "#testimonials"],
    ["Gallery", "#gallery"],
    ["Contact", "#contact"],
  ]

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-[0_1px_0_rgba(0,0,0,.04),0_6px_20px_rgba(0,0,0,.04)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl bg-[var(--b-primary-600)] text-white grid place-items-center font-poppins font-extrabold text-sm">
            {initials}
          </span>
          <span className="font-poppins font-extrabold text-[var(--b-primary-700)] text-lg tracking-tight hidden sm:block">
            {config.about.name}{" "}
            <span className="text-[var(--b-primary-600)]/70 font-semibold">{config.about.sport ?? "Football"}</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="px-3 py-2 text-sm font-medium text-[#1A1A1A]/80 hover:text-[var(--b-primary-700)] rounded-lg hover:bg-[var(--b-primary-50)] transition"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            onClick={onCTA}
            className="inline-flex items-center gap-2 bg-[var(--b-primary-600)] hover:bg-[var(--b-primary-700)] active:bg-[var(--b-primary-800)] text-white font-semibold px-5 py-2.5 rounded-xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all"
          >
            {config.hero.cta_text}
          </button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-[var(--b-primary-50)] text-[#1A1A1A]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <Icons.Close className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5 pt-2 border-t border-[var(--b-primary-50)] flex flex-col gap-1">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="py-3 px-2 text-base font-medium text-[#1A1A1A]/90 hover:text-[var(--b-primary-700)] border-b border-[var(--b-primary-50)] last:border-0"
            >
              {label}
            </a>
          ))}
          <button
            className="mt-3 w-full bg-[var(--b-primary-600)] hover:bg-[var(--b-primary-700)] text-white font-semibold py-3 px-5 rounded-xl transition"
            onClick={() => {
              setOpen(false)
              onCTA?.()
            }}
          >
            {config.hero.cta_text}
          </button>
        </div>
      </div>
    </header>
  )
}
