"use client"
import { useState } from "react"
import type { CoachConfig } from "@/lib/useConfig"

export default function FAQ({ config }: { config: CoachConfig }) {
  const { faq } = config
  if (!faq?.length) return null
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <h2 className="font-bold text-[36px] md:text-[44px] mb-3 leading-tight" style={{ fontFamily: "Roboto Slab, serif", color: "var(--accent)", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
        <div className="h-[2px] w-16 mb-12" style={{ background: "var(--accent)" }} />
        <div className="max-w-[800px] space-y-0">
          {faq.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(var(--accent-rgb),0.2)" }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-6 py-5 text-left">
                <span className="font-semibold text-[16px] leading-snug" style={{ fontFamily: "Roboto Slab, serif", color: open === i ? "var(--accent)" : "var(--text)" }}>{item.question}</span>
                <span className="flex-shrink-0 text-[20px] font-bold" style={{ color: "var(--accent)", transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              <div className="overflow-hidden transition-[max-height] duration-300" style={{ maxHeight: open === i ? "400px" : "0" }}>
                <div className="pb-5 text-[15px] leading-[1.7]" style={{ color: "var(--text-muted)", fontFamily: "Roboto, sans-serif" }}>{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
