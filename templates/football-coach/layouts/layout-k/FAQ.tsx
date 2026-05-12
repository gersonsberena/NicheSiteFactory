"use client"
import { useState } from "react"
import type { CoachConfig } from "@/lib/useConfig"

export default function FAQ({ config }: { config: CoachConfig }) {
  const { faq } = config
  if (!faq?.length) return null
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="absolute right-8 top-8 select-none pointer-events-none text-[160px] font-bold leading-none" style={{ color: "rgba(var(--accent-rgb),0.04)", fontFamily: "Space Grotesk, sans-serif" }}>08</div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-2" style={{ color: "rgba(var(--accent-rgb),0.7)", fontFamily: "Space Grotesk, sans-serif" }}>
          <div className="w-1 h-1" style={{ background: "var(--accent)" }} /> Info
        </div>
        <h2 className="font-bold mb-10" style={{ fontFamily: "Space Grotesk, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>Frequently Asked Questions</h2>
        <div className="max-w-[800px] space-y-0">
          {faq.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(var(--accent-rgb),0.12)" }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-6 py-5 text-left">
                <span className="font-semibold text-[16px]" style={{ color: open === i ? "var(--accent)" : "white", fontFamily: "Space Grotesk, sans-serif" }}>{item.question}</span>
                <span className="flex-shrink-0 text-[20px] font-light transition-transform duration-200" style={{ color: "var(--accent)", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              <div className="overflow-hidden transition-[max-height] duration-300" style={{ maxHeight: open === i ? "400px" : "0" }}>
                <div className="pb-5 text-[15px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
