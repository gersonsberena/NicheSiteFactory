"use client"

import { useState } from "react"
import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b d-hairline">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-[family-name:var(--font-playfair)] text-d-navy text-lg leading-snug">
          {question}
        </span>
        {/* Amber chevron */}
        <span
          className={`flex-none text-d-amber transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      {/* CSS grid-rows animation */}
      <div
        className="grid transition-[grid-template-rows] duration-300"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-d-ink/70 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ({ config }: Props) {
  const faqs = config.faq ?? []

  if (faqs.length === 0) return null

  return (
    <section id="faq" className="bg-d-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="d-label-caps text-d-amber mb-3">Questions</div>
          <h2 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-4xl md:text-5xl leading-[1.1] mb-12">
            Good Questions Deserve Straight Answers.
          </h2>

          <div>
            {faqs.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
