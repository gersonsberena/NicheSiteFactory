import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"

export default function About({ config }: { config: CoachConfig }) {
  const { about, copy_variants } = config
  const photoSrc = about.photo || `/stock/${sportToKey(about.sport ?? "football")}/coach.jpg`
  const credentials = about.credentials ?? []

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="absolute right-8 top-8 select-none pointer-events-none text-[160px] font-bold leading-none" style={{ color: "rgba(var(--accent-rgb),0.04)", fontFamily: "Space Grotesk, sans-serif" }}>01</div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="relative">
          <div className="absolute -top-3 -left-3 w-6 h-6" style={{ borderTop: "1px solid rgba(var(--accent-rgb),0.4)", borderLeft: "1px solid rgba(var(--accent-rgb),0.4)" }} />
          <div className="aspect-[4/5] overflow-hidden" style={{ background: "rgba(var(--accent-rgb),0.05)" }}>
            {photoSrc ? (
              <img src={photoSrc} alt={about.name} className="w-full h-full object-cover" style={{ filter: "grayscale(20%)" }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[12px]" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk, sans-serif" }}>[ photo ]</div>
            )}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-2" style={{ color: "rgba(var(--accent-rgb),0.7)", fontFamily: "Space Grotesk, sans-serif" }}>
            <div className="w-1 h-1" style={{ background: "var(--accent)" }} /> Coaching Profile
          </div>
          <h2 className="font-bold mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>{about.name}</h2>
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] mb-6" style={{ color: "var(--accent)", fontFamily: "Inter, sans-serif" }}>{about.title}</p>
          {copy_variants?.about_tagline && (
            <p className="text-[16px] mb-6 italic" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif" }}>"{copy_variants.about_tagline}"</p>
          )}
          <p className="text-[15px] leading-[1.75] mb-8" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}>{about.bio}</p>
          {credentials.length > 0 && (
            <div className="space-y-2">
              {credentials.map((c: string, i: number) => (
                <div key={i} className="flex items-center gap-3 text-[13px]" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif" }}>
                  <div className="w-1 h-1 flex-shrink-0" style={{ background: "var(--accent)" }} />
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
