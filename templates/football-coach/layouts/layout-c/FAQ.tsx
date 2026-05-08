"use client"
import { useState } from "react"
import type { CoachConfig, FAQItem } from "@/lib/useConfig"

export default function FAQ({ config }: { config: CoachConfig }) {
  const faqs = config.faq as FAQItem[]
  const firstName = (config.about?.name as string || "Coach").split(" ").find((w) => w !== "Coach") ?? "Coach"
  if (!faqs?.length) return null

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 reveal">
            <span className="c-label text-[#6B7280] block mb-4">Coach {firstName}&apos;s FAQ</span>
            <div className="c-rule-accent mb-6" />
            <h2 className="font-['Playfair_Display'] font-black text-4xl sm:text-5xl text-[#111827] leading-tight">
              Common Questions.
            </h2>
            <p className="mt-4 text-[#6B7280] leading-relaxed">
              Everything you need to know before getting started.
            </p>
          </div>
          <div className="md:col-span-8 reveal" style={{ transitionDelay: "80ms" }}>
            <div className="border-t border-[#E5E7EB]">
              {faqs.map((item, i) => (
                <FAQAccordion key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#E5E7EB]">
      <button
        className="w-full flex items-start justify-between gap-4 py-6 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-['Playfair_Display'] font-bold text-lg text-[#111827] leading-snug">
          {item.question}
        </span>
        <span className="c-label text-[var(--accent)] shrink-0 mt-0.5 text-xs">
          {open ? "[ close ]" : "[ open ]"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <p className="pb-6 text-[#6B7280] leading-relaxed">{item.answer}</p>
      </div>
    </div>
  )
}
