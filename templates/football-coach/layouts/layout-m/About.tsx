import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"
import ImageBreak from "./ImageBreak"
import PullQuote from "./PullQuote"

export default function About({ config }: { config: CoachConfig }) {
  const { about, copy_variants } = config
  const sportKey = sportToKey(about.sport ?? "football")
  const photoSrc = about.photo ?? `/stock/${sportKey}/about.jpg`
  const credentials = about.credentials ?? []

  return (
    <section id="about" className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="py-20 md:py-28 max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>02 — About</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1">
            <img src={photoSrc} alt={about.name} className="w-full object-cover" style={{ aspectRatio: "3/4", filter: "brightness(0.9)" }} />
            {credentials.length > 0 && (
              <div className="mt-6 space-y-2">
                {credentials.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1 h-1 flex-shrink-0" style={{ background: "var(--accent)" }} />
                    <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "DM Sans, sans-serif" }}>{c}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-2">
            <h2 className="font-bold mb-2" style={{ fontFamily: "DM Serif Display, serif", color: "white", fontSize: "clamp(32px,4vw,56px)" }}>
              {about.name}
            </h2>
            <div className="text-[13px] mb-8" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif", letterSpacing: "0.1em" }}>
              {about.title ?? "Coach"} · {about.specialty ?? about.sport ?? "Athletics"} · {about.city}
            </div>
            {copy_variants?.about_tagline && (
              <PullQuote text={copy_variants.about_tagline} attribution={about.name} />
            )}
            <p className="text-[15px] leading-[1.9]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "DM Sans, sans-serif" }}>
              {about.bio}
            </p>
          </div>
        </div>
      </div>
      <ImageBreak src={`/stock/${sportKey}/gallery-1.jpg`} caption={`${about.name} · ${about.sport ?? "Sports"} Coach`} />
    </section>
  )
}
