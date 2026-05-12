import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"
import Eyebrow from "./Eyebrow"

export default function About({ config }: { config: CoachConfig }) {
  const { about, copy_variants } = config
  const photo = about.photo || `/stock/${sportToKey(about.sport ?? "football")}/about.jpg`
  const credentials = about.credentials ?? []

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div className="relative">
          {photo.startsWith("/stock/") && !about.photo ? (
            <div
              className="w-full"
              style={{
                aspectRatio: "4/5",
                background: "var(--bg2)",
                backgroundImage: `repeating-linear-gradient(45deg, rgba(var(--accent-rgb),0.04) 0px, rgba(var(--accent-rgb),0.04) 1px, transparent 1px, transparent 20px)`,
                border: "1px solid rgba(var(--accent-rgb),0.15)",
              }}
            >
              <div className="absolute bottom-4 left-4 text-[10px] font-mono" style={{ color: "rgba(var(--accent-rgb),0.4)" }}>
                [ COACH PHOTO ]
              </div>
            </div>
          ) : (
            <img src={photo} alt={about.name} className="w-full object-cover" style={{ aspectRatio: "4/5" }} />
          )}
          <div
            className="absolute -bottom-4 -right-4 px-5 py-4 hidden md:block"
            style={{ background: "var(--accent)" }}
          >
            <div className="font-black text-[32px] leading-none" style={{ fontFamily: "Barlow Condensed, sans-serif", color: "var(--bg)" }}>
              {about.years_experience ?? "10"}+
            </div>
            <div className="text-[10px] font-bold tracking-[0.15em] uppercase mt-1" style={{ color: "var(--bg)", fontFamily: "Barlow Condensed, sans-serif", opacity: 0.8 }}>
              Years Exp.
            </div>
          </div>
        </div>

        <div>
          <Eyebrow>{copy_variants?.about_tagline || "About the Coach"}</Eyebrow>
          <h2
            className="font-black leading-[0.92] mb-8"
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              fontSize: "clamp(40px, 5vw, 64px)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "var(--text)",
            }}
          >
            {about.name}
            {about.title && (
              <><br /><span style={{ color: "var(--accent)", fontSize: "0.65em" }}>{about.title}</span></>
            )}
          </h2>

          {credentials.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {credentials.map((c, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-[11px] font-bold tracking-[0.15em] uppercase"
                  style={{ border: "1px solid rgba(var(--accent-rgb),0.4)", color: "var(--accent)", fontFamily: "Barlow Condensed, sans-serif" }}
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          {about.bio && (
            <div className="space-y-4 text-[16px] leading-[1.7]" style={{ color: "var(--text-muted)", fontFamily: "Barlow, sans-serif" }}>
              {about.bio.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
            </div>
          )}

          {copy_variants?.about_quote && (
            <blockquote
              className="mt-10 pl-5 text-[20px] font-black leading-snug uppercase"
              style={{ borderLeft: "3px solid var(--accent)", fontFamily: "Barlow Condensed, sans-serif", color: "var(--text)", letterSpacing: "-0.01em" }}
            >
              &ldquo;{copy_variants.about_quote}&rdquo;
            </blockquote>
          )}
        </div>
      </div>
    </section>
  )
}
