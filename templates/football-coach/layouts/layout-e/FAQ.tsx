"use client"
import { useState } from "react"
import type { CoachConfig } from "@/lib/useConfig"

export default function FAQ({ config }: { config: CoachConfig }) {
  const { faq } = config
  if (!faq?.length) return null

  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 md:py-32" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <div className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
            Common Questions
          </div>
          <div className="h-px w-[60px] mb-6" style={{ background: "var(--accent)" }} />
          <h2
            className="font-extrabold text-[36px] md:text-[48px] leading-[1.05]"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em", color: "var(--text)" }}
          >
            FAQ
          </h2>
        </div>

        <div className="max-w-[860px] space-y-0">
          {faq.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(var(--accent-rgb),0.15)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-6 text-left transition-colors"
              >
                <div className="flex items-start gap-5">
                  <span
                    className="text-[11px] font-bold flex-shrink-0 mt-0.5"
                    style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif", letterSpacing: "0.1em" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-semibold text-[16px] leading-snug"
                    style={{ color: open === i ? "var(--accent)" : "var(--text)", fontFamily: "Montserrat, sans-serif", transition: "color 0.2s" }}
                  >
                    {item.question}
                  </span>
                </div>
                <span
                  className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-[18px] font-light leading-none"
                  style={{ color: "var(--accent)", transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-300"
                style={{ maxHeight: open === i ? "400px" : "0" }}
              >
                <div className="pl-10 pb-6 text-[15px] leading-[1.75]" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
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
