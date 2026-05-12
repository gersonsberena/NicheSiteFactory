import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"

export default function About({ config }: { config: CoachConfig }) {
  const { about, copy_variants } = config
  const photo = about.photo || `/stock/${sportToKey(about.sport ?? "football")}/about.jpg`
  const credentials = about.credentials ?? []
  const paragraphs = about.bio ? about.bio.split("\n\n") : []

  return (
    <section id="about" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="mb-10">
          <h2 className="font-bold text-[36px] md:text-[48px] leading-tight" style={{ fontFamily: "Roboto Slab, serif", color: "var(--accent)", letterSpacing: "-0.02em" }}>
            {copy_variants?.about_tagline || `About ${about.name}`}
          </h2>
          <div className="mt-3 h-[2px] w-16" style={{ background: "var(--accent)" }} />
        </div>

        {/* Newspaper 3-col layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Col 1: Photo */}
          <div className="lg:w-[280px] flex-shrink-0">
            {photo.startsWith("/stock/") && !about.photo ? (
              <div className="w-full" style={{ aspectRatio: "3/4", background: "var(--bg2)", border: "1px solid rgba(var(--accent-rgb),0.2)" }}>
                <div className="flex items-center justify-center h-full text-[10px] font-mono" style={{ color: "rgba(var(--accent-rgb),0.4)" }}>
                  [ PHOTO ]
                </div>
              </div>
            ) : (
              <img src={photo} alt={about.name} className="w-full object-cover" style={{ aspectRatio: "3/4" }} />
            )}
            {credentials.length > 0 && (
              <div className="mt-4 space-y-2">
                {credentials.map((c, i) => (
                  <div key={i} className="text-[12px] font-medium py-2 px-3" style={{ borderLeft: "2px solid var(--accent)", color: "var(--text-muted)", fontFamily: "Roboto, sans-serif" }}>
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Col 2 + 3: Bio text in newspaper columns */}
          <div className="flex-1" style={{ columnCount: 2, columnGap: "2rem", columnRule: "1px solid rgba(var(--accent-rgb),0.2)" }}>
            <h3 className="font-bold text-[22px] mb-4" style={{ fontFamily: "Roboto Slab, serif", color: "var(--text)", columnSpan: "all" as const }}>
              {about.name}
              {about.title && <span className="block text-[16px] font-normal mt-1" style={{ color: "var(--accent)" }}>{about.title}</span>}
            </h3>
            {paragraphs.map((p, i) => (
              <p key={i} className={`text-[15px] leading-[1.7] mb-4 ${i === 0 ? "first-letter-large" : ""}`}
                style={{ fontFamily: "Roboto, sans-serif", color: "var(--text-muted)" }}>
                {p}
              </p>
            ))}
            {copy_variants?.about_quote && (
              <blockquote
                className="my-6 px-4 py-4 text-[18px] font-bold leading-snug"
                style={{ borderLeft: "3px solid var(--accent)", color: "var(--accent)", fontFamily: "Roboto Slab, serif", fontStyle: "italic", background: "rgba(var(--accent-rgb),0.06)" }}
              >
                &ldquo;{copy_variants.about_quote}&rdquo;
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
