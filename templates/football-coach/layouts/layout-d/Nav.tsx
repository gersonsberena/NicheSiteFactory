"use client"
import { useState, useEffect } from "react"
import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
  onCTA: () => void
}

export default function Nav({ config, onCTA }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const name = config.about?.name ?? "Coach"

  const links: [string, string][] = [
    ["Story", "#about"],
    ["Services", "#services"],
    ["Results", "#success_stories"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 d-nav-blur transition-all duration-300 ${
        scrolled ? "border-b d-hairline" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          className="font-[family-name:var(--font-playfair)] text-d-navy text-xl md:text-2xl tracking-tight"
        >
          {name}
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="d-label-caps text-d-ink/70 hover:text-d-navy d-underline-grow pb-1 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onCTA}
            className="hidden md:inline-flex items-center px-5 py-2.5 border border-d-navy text-d-navy rounded-full d-label-caps hover:bg-d-navy hover:text-d-warmwhite transition-colors cursor-pointer"
          >
            Book a Session
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-6 bg-d-navy transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-d-navy transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-d-navy transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 bg-d-warmwhite border-b d-hairline ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="d-label-caps text-d-ink/70"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); onCTA() }}
            className="mt-2 inline-flex items-center justify-center px-5 py-3 border border-d-navy text-d-navy rounded-full d-label-caps cursor-pointer"
          >
            Book a Session
          </button>
        </div>
      </div>
    </header>
  )
}
