"use client"

import { useState } from "react"
import { Icons } from "@/lib/icons"
import type { CoachConfig, FAQItem } from "@/lib/useConfig"

export default function FAQ({ config }: { config: CoachConfig }) {
  const items = (config.faq ?? []) as FAQItem[]
  const [open, setOpen] = useState<number | null>(0)

  if (!items.length) return null

  return (
    <section id="faq" className="py-20 md:py-28 bg-paper">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-primary-700)]">
            FAQ
          </div>
          <h2 className="font-poppins font-extrabold text-3xl md:text-5xl mt-3 tracking-tight text-[#1A1A1A]">
            Common questions.
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-[var(--shadow-card)] overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-poppins font-semibold text-[#1A1A1A] text-base sm:text-lg">
                    {item.question}
                  </span>
                  <Icons.Chevron
                    className={`chev w-5 h-5 text-[var(--b-primary-600)] shrink-0 ${isOpen ? "rotated" : ""}`}
                  />
                </button>
                <div className={`faq-body ${isOpen ? "open" : ""}`}>
                  <div>
                    <p className="px-6 pb-5 text-[#1A1A1A]/70 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
