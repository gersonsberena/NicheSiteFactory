import type { CoachConfig } from "@/lib/useConfig"

export default function FAQ({ config }: { config: CoachConfig }) {
  const { faq } = config
  if (!faq?.length) return null
  return (
    <section id="faq" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>09 — FAQ</div>
        <h2 className="font-bold mb-12" style={{ fontFamily: "DM Serif Display, serif", color: "white", fontSize: "clamp(28px,4vw,52px)" }}>
          Frequently Asked Questions
        </h2>
        <div className="max-w-[800px] grid grid-cols-1 md:grid-cols-2 gap-8">
          {faq.map((item, i) => (
            <div key={i} className="border-t pt-6" style={{ borderColor: "rgba(var(--accent-rgb),0.15)" }}>
              <h3 className="font-bold text-[16px] mb-3" style={{ color: "white", fontFamily: "DM Serif Display, serif" }}>{item.question}</h3>
              <p className="text-[14px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "DM Sans, sans-serif" }}>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
