"use client"
import { useState } from "react"
import type { CoachConfig } from "@/lib/useConfig"
import Eyebrow from "./Eyebrow"

export default function FAQ({ config }: { config: CoachConfig }) {
  const { faq } = config
  if (!faq?.length) return null
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <Eyebrow>Questions</Eyebrow>
          <h2
            className="font-black leading-[0.92]"
            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "clamp(40px, 5vw, 64px)", textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--text)" }}
          >
            FAQ
          </h2>
        </div>
        <div className="max-w-[860px] space-y-0">
          {faq.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(var(--accent-rgb),0.15)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-5 text-left"
              >
                <span
                  className="font-bold text-[17px] uppercase tracking-wide leading-snug"
                  style={{ color: open === i ? "var(--accent)" : "var(--text)", fontFamily: "Barlow Condensed, sans-serif", transition: "color 0.2s" }}
                >
                  {item.question}
                </span>
                <span className="flex-shrink-0 font-black text-[22px] leading-none" style={{ color: "var(--accent)", transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>
                  +
                </span>
              </button>
              <div className="overflow-hidden transition-[max-height] duration-300" style={{ maxHeight: open === i ? "400px" : "0" }}>
                <div className="pb-5 text-[15px] leading-[1.7]" style={{ color: "var(--text-muted)", fontFamily: "Barlow, sans-serif" }}>
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
