import type { CoachConfig } from "@/lib/useConfig"

export default function Testimonials({ config }: { config: CoachConfig }) {
  const { testimonials, copy_variants } = config
  if (!testimonials?.length) return null
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <h2 className="font-bold text-[36px] md:text-[44px] mb-3 leading-tight" style={{ fontFamily: "Roboto Slab, serif", color: "var(--accent)", letterSpacing: "-0.02em" }}>
          {copy_variants?.testimonials_tagline || "What Athletes Say"}
        </h2>
        <div className="h-[2px] w-16 mb-12" style={{ background: "var(--accent)" }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <blockquote key={i} style={{ borderLeft: "3px solid var(--accent)", padding: "20px 24px", background: "var(--bg2)" }}>
              <p className="text-[16px] leading-[1.75] italic mb-5" style={{ fontFamily: "Roboto, sans-serif", color: "var(--text)" }}>&ldquo;{t.quote}&rdquo;</p>
              <footer>
                <div className="font-bold text-[14px]" style={{ fontFamily: "Roboto Slab, serif", color: "var(--accent)" }}>{t.name}</div>
                <div className="text-[12px] mt-1" style={{ fontFamily: "Roboto, sans-serif", color: "var(--text-muted)" }}>{t.role}</div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
