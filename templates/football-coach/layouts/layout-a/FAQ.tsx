"use client"
import { useState } from "react"
import type { CoachConfig, FAQItem } from "@/lib/useConfig"

export default function FAQ({ config }: { config: CoachConfig }) {
  const items = config.faq as FAQItem[] | undefined
  if (!items?.length) return null

  return (
    <section id="faq" className="relative bg-ink py-24 sm:py-32 overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[rgba(var(--accent-rgb),0.06)] blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 text-[var(--accent)] mb-5">
            <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
            <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm opacity-90">Common Questions</span>
            <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight">
            <span className="text-white">FREQUENTLY </span>
            <span className="accent-grad">ASKED</span>
          </h2>
        </div>

        <div className="space-y-2 reveal">
          {items.map((item, i) => (
            <FAQAccordion key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-white/5 bg-smoke/40 hover:border-[rgba(var(--accent-rgb),0.25)] transition">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-oswald uppercase tracking-[0.15em] text-white text-base leading-tight">{item.question}</span>
        <span
          className={`shrink-0 w-6 h-6 border border-[rgba(var(--accent-rgb),0.4)] grid place-items-center text-[var(--accent)] transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          aria-hidden
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="px-6 pb-5">
          <p className="text-white/60 leading-relaxed text-base">{item.answer}</p>
        </div>
      )}
    </div>
  )
}
