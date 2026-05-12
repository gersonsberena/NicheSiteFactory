import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"
import ProgressBar from "./ProgressBar"

export default function About({ config }: { config: CoachConfig }) {
  const { about, copy_variants } = config
  const photoSrc = about.photo || `/stock/${sportToKey(about.sport ?? "football")}/coach.jpg`
  const credentials = about.credentials ?? []

  return (
    <section id="about" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>
            <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
            Coaching Profile
          </div>
          <h2 className="font-bold mb-2" style={{ fontFamily: "DM Sans, sans-serif", color: "var(--text)", fontSize: "clamp(28px,4vw,44px)" }}>
            {about.name}
          </h2>
          <p className="text-[14px] font-semibold mb-6 uppercase tracking-wider" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>{about.title}</p>
          {copy_variants?.about_tagline && (
            <p className="text-[15px] mb-6 font-medium italic" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>"{copy_variants.about_tagline}"</p>
          )}
          <p className="text-[16px] leading-[1.75] mb-8" style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>{about.bio}</p>
          {credentials.length > 0 && (
            <div className="mb-8">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "var(--text-muted)", fontFamily: "DM Mono, monospace" }}>Credentials</div>
              <div className="space-y-2">
                {credentials.map((c: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-[14px]" style={{ color: "var(--text)", fontFamily: "DM Sans, sans-serif" }}>
                    <div className="w-1.5 h-1.5 flex-shrink-0" style={{ background: "var(--accent)" }} />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="aspect-[4/5] overflow-hidden mb-10" style={{ background: "rgba(var(--accent-rgb),0.05)" }}>
            {photoSrc ? (
              <img src={photoSrc} alt={about.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(var(--accent-rgb),0.06)", fontFamily: "DM Mono, monospace", color: "var(--text-muted)", fontSize: "13px" }}>[ photo ]</div>
            )}
          </div>
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase mb-6" style={{ color: "var(--text-muted)", fontFamily: "DM Mono, monospace" }}>Athlete Improvement Rates</div>
            <ProgressBar label="Speed & Agility" value={87} />
            <ProgressBar label="Technique" value={92} />
            <ProgressBar label="Game IQ" value={78} />
            <ProgressBar label="College Placement" value={65} />
          </div>
        </div>
      </div>
    </section>
  )
}
