import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"
import Ornament from "./Ornament"

export default function About({ config }: { config: CoachConfig }) {
  const { about, copy_variants } = config
  const photoSrc = about.photo || `/stock/${sportToKey(about.sport ?? "football")}/coach.jpg`
  const credentials = about.credentials ?? []
  const bio = about.bio ?? ""
  const [firstChar, restBio] = bio.length > 0 ? [bio[0], bio.slice(1)] : ["", ""]

  return (
    <section id="about" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>Chapter II</div>
        <h2 className="font-bold mb-2" style={{ fontFamily: "Playfair Display, serif", color: "var(--text)", fontSize: "clamp(32px,4vw,52px)" }}>
          {about.name}
        </h2>
        <p className="text-[14px] mb-8 uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "Source Sans 3, sans-serif" }}>{about.title}</p>
        <Ornament />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
          <div className="lg:col-span-1">
            <div className="aspect-[3/4] overflow-hidden mb-6" style={{ background: "rgba(var(--accent-rgb),0.05)" }}>
              {photoSrc ? (
                <img src={photoSrc} alt={about.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[13px]" style={{ background: "rgba(var(--accent-rgb),0.05)", color: "var(--text-muted)", fontFamily: "Source Sans 3, sans-serif" }}>[ photo ]</div>
              )}
            </div>
            {credentials.length > 0 && (
              <div>
                <div className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "var(--text-muted)", fontFamily: "Source Sans 3, sans-serif" }}>Credentials</div>
                <div className="space-y-2">
                  {credentials.map((c: string, i: number) => (
                    <div key={i} className="text-[14px]" style={{ color: "var(--text-muted)", fontFamily: "Source Sans 3, sans-serif", paddingLeft: "12px", borderLeft: "2px solid rgba(var(--accent-rgb),0.4)" }}>{c}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-2">
            {copy_variants?.about_tagline && (
              <p className="text-[20px] mb-6 italic leading-snug" style={{ color: "var(--accent)", fontFamily: "Playfair Display, serif" }}>"{copy_variants.about_tagline}"</p>
            )}
            <p className="text-[17px] leading-[1.8]" style={{ color: "var(--text)", fontFamily: "Source Sans 3, sans-serif" }}>
              {firstChar && (
                <span className="float-left mr-3 leading-[0.8] font-bold" style={{ fontFamily: "Playfair Display, serif", color: "var(--accent)", fontSize: "clamp(60px,8vw,90px)" }}>{firstChar}</span>
              )}
              {restBio}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
