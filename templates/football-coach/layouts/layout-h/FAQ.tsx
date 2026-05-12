"use client"
import { useState } from "react"
import type { CoachConfig } from "@/lib/useConfig"

export default function FAQ({ config }: { config: CoachConfig }) {
  const { faq } = config
  if (!faq?.length) return null
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-20 md:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>
          <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
          Data FAQ
        </div>
        <h2 className="font-bold mb-3" style={{ fontFamily: "DM Sans, sans-serif", color: "var(--text)", fontSize: "clamp(28px,4vw,44px)" }}>Frequently Asked Questions</h2>
        <div className="h-px mb-12 max-w-[60px]" style={{ background: "var(--accent)" }} />
        <div className="max-w-[800px] space-y-0">
          {faq.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(var(--accent-rgb),0.15)" }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-6 py-5 text-left">
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-bold flex-shrink-0" style={{ fontFamily: "DM Mono, monospace", color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-semibold text-[16px]" style={{ color: open === i ? "var(--accent)" : "var(--text)", fontFamily: "DM Sans, sans-serif" }}>{item.question}</span>
                </div>
                <span className="flex-shrink-0 text-[20px] font-bold transition-transform duration-200" style={{ color: "var(--accent)", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              <div className="overflow-hidden transition-[max-height] duration-300" style={{ maxHeight: open === i ? "400px" : "0" }}>
                <div className="pb-5 text-[15px] leading-[1.7] pl-10" style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
