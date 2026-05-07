"use client"
import { useState } from "react"
import { useScrollSpy, useScrolled } from "@/lib/hooks"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

const NAV_IDS = ["about", "stats", "services", "testimonials", "contact"]
const NAV_LABELS: Record<string, string> = {
  about: "About",
  stats: "Stats",
  services: "Services",
  testimonials: "Testimonials",
  contact: "Contact",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((w) => w.toLowerCase() !== "coach")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
}

export default function Nav({ config, onCTA }: { config: CoachConfig; onCTA: () => void }) {
  const active = useScrollSpy(NAV_IDS)
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)

  const initials = getInitials(config.about.name)
  const displayName = config.about.name.replace(/^Coach\s+/i, "").toUpperCase()

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-ink/85 border-b border-[rgba(var(--accent-rgb),0.2)] shadow-[0_8px_30px_-12px_rgba(var(--accent-rgb),0.25)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("top")}
          className="flex items-center gap-3 group"
        >
          <span className="w-9 h-9 rounded-sm border border-[rgba(var(--accent-rgb),0.6)] grid place-items-center text-[var(--accent)] font-bebas text-xl tracking-wider group-hover:bg-[var(--accent)] group-hover:text-ink transition">
            {initials}
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-bebas text-xl tracking-[0.2em] text-white">{displayName}</span>
            <span className="font-oswald text-[10px] tracking-[0.4em] text-[var(--accent)] uppercase mt-0.5">
              {config.about.sport} · {config.about.city}
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_IDS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`nav-link font-oswald uppercase tracking-[0.22em] text-sm ${
                active === id ? "text-[var(--accent)] active" : "text-white/80 hover:text-white"
              }`}
            >
              {NAV_LABELS[id]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onCTA}
            className="btn-gold hidden sm:inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-ink font-oswald font-semibold uppercase tracking-[0.18em] px-5 py-3 text-xs"
          >
            {config.hero.cta_text} <Icons.Arrow className="w-4 h-4" />
          </button>
          <button
            className="lg:hidden text-white p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <Icons.Close className="w-7 h-7" /> : <Icons.Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-[480px]" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-6 pt-2 bg-ink/95 backdrop-blur-md border-t border-white/5">
          <div className="flex flex-col">
            {NAV_IDS.map((id) => (
              <button
                key={id}
                onClick={() => { scrollTo(id); setOpen(false) }}
                className={`py-3 text-left font-oswald uppercase tracking-[0.22em] text-sm border-b border-white/5 ${
                  active === id ? "text-[var(--accent)]" : "text-white/80"
                }`}
              >
                {NAV_LABELS[id]}
              </button>
            ))}
            <button
              onClick={() => { setOpen(false); onCTA() }}
              className="btn-gold mt-5 w-full flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-ink font-oswald font-semibold uppercase tracking-[0.18em] px-7 py-4 text-sm"
            >
              {config.hero.cta_text}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
