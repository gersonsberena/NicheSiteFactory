"use client"
import { useState } from "react"
import type { CoachConfig } from "@/lib/useConfig"
import Ornament from "./Ornament"

export default function FAQ({ config }: { config: CoachConfig }) {
  const { faq } = config
  if (!faq?.length) return null
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-20 md:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>Chapter IX</div>
        <h2 className="font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--text)", fontSize: "clamp(32px,4vw,52px)" }}>Frequently Asked Questions</h2>
        <Ornament />
        <div className="max-w-[800px] mt-8 space-y-0">
          {faq.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(var(--accent-rgb),0.2)" }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-6 py-5 text-left">
                <span className="font-bold text-[17px] leading-snug" style={{ fontFamily: "Playfair Display, serif", color: open === i ? "var(--accent)" : "var(--text)" }}>{item.question}</span>
                <span className="flex-shrink-0 text-[20px] font-light transition-transform duration-200" style={{ color: "var(--accent)", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              <div className="overflow-hidden transition-[max-height] duration-300" style={{ maxHeight: open === i ? "400px" : "0" }}>
                <div className="pb-5 text-[16px] leading-[1.75]" style={{ color: "var(--text-muted)", fontFamily: "Source Sans 3, sans-serif" }}>{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
