"use client"
import { useState } from "react"
import type { CoachConfig } from "@/lib/useConfig"

export default function FAQ({ config }: { config: CoachConfig }) {
  const { faq } = config
  if (!faq?.length) return null
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.2)", color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
          FAQ
        </div>
        <h2 className="font-bold mb-12" style={{ fontFamily: "DM Sans, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>
          Frequently Asked Questions
        </h2>
        <div className="max-w-[800px] space-y-3">
          {faq.map((item, i) => (
            <div key={i} className="rounded-xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", border: open === i ? "1px solid rgba(var(--accent-rgb),0.3)" : "1px solid rgba(255,255,255,0.08)" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left">
                <span className="font-semibold text-[15px]" style={{ color: open === i ? "var(--accent)" : "white", fontFamily: "DM Sans, sans-serif" }}>{item.question}</span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[18px] font-light transition-transform duration-200"
                  style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              <div className="overflow-hidden transition-[max-height] duration-300" style={{ maxHeight: open === i ? "400px" : "0" }}>
                <div className="px-6 pb-5 text-[14px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "DM Sans, sans-serif" }}>{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
