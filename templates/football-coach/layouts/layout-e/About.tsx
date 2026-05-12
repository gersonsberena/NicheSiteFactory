import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"

export default function About({ config }: { config: CoachConfig }) {
  const { about, copy_variants } = config
  const photo = about.photo || `/stock/${sportToKey(about.sport ?? "football")}/about.jpg`
  const credentials = about.credentials ?? []

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          {photo.startsWith("/stock/") && !about.photo ? (
            <div
              style={{
                aspectRatio: "4/5",
                background: "var(--bg2)",
                backgroundImage: `linear-gradient(135deg, rgba(var(--accent-rgb),0.08) 0%, rgba(var(--accent-rgb),0) 60%), repeating-linear-gradient(45deg, rgba(var(--accent-rgb),0.05) 0px, rgba(var(--accent-rgb),0.05) 1px, transparent 1px, transparent 14px)`,
                border: "1px solid rgba(var(--accent-rgb),0.3)",
                position: "relative",
              }}
            >
              <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.08em]" style={{ color: "rgba(var(--accent-rgb),0.55)", fontFamily: "monospace" }}>
                [ COACH PHOTO ]
              </div>
            </div>
          ) : (
            <img src={photo} alt={about.name} className="w-full object-cover" style={{ aspectRatio: "4/5", border: "1px solid rgba(var(--accent-rgb),0.3)" }} />
          )}
          {credentials.length > 0 && (
            <div className="mt-6 grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(credentials.length, 3)}, 1fr)` }}>
              {credentials.map((c, i) => (
                <div
                  key={i}
                  className="px-3 py-3 text-center"
                  style={{ border: "1px solid rgba(var(--accent-rgb),0.2)" }}
                >
                  <div className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
                    {c}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          {copy_variants?.about_tagline && (
            <div className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
              {copy_variants.about_tagline}
            </div>
          )}
          <div className="h-px w-[60px]" style={{ background: "var(--accent)" }} />
          <h2
            className="font-extrabold text-[36px] md:text-[52px] leading-[1.05] mt-6"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em", color: "var(--text)" }}
          >
            {about.name}
            {about.title && (
              <><br /><span className="text-[28px] md:text-[36px]" style={{ color: "var(--accent)" }}>{about.title}</span></>
            )}
          </h2>

          {about.bio && (
            <div className="mt-8 space-y-5 text-[15px] leading-[1.75]" style={{ color: "rgba(var(--text-rgb,232,232,232),0.8)" }}>
              {about.bio.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
            </div>
          )}

          {copy_variants?.about_quote && (
            <div className="mt-10 pl-6" style={{ borderLeft: "1px solid var(--accent)" }}>
              <p
                className="italic font-semibold text-[20px] md:text-[24px] leading-snug max-w-[40ch]"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--accent)", letterSpacing: "-0.01em" }}
              >
                &ldquo;{copy_variants.about_quote}&rdquo;
              </p>
              <div className="text-[11px] font-medium tracking-[0.2em] uppercase mt-4" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
                — {about.name}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
