import type { CoachConfig } from "@/lib/useConfig"
import { sportToKey } from "@/lib/sportToKey"
import Blob from "./Blob"

export default function About({ config }: { config: CoachConfig }) {
  const { about, copy_variants } = config
  const sportKey = sportToKey(about.sport ?? "football")
  const photoSrc = about.photo ?? `/stock/${sportKey}/about.jpg`
  const credentials = about.credentials ?? []

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <Blob x="10%" y="50%" size={400} color="var(--accent)" />
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="relative">
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            <img src={photoSrc} alt={about.name} className="w-full object-cover" style={{ aspectRatio: "4/5" }} />
          </div>
          {credentials.length > 0 && (
            <div className="absolute -bottom-6 -right-4 rounded-xl p-5 max-w-[220px]"
              style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>Credentials</div>
              {credentials.map((c, i) => (
                <div key={i} className="flex items-center gap-2 mb-2 last:mb-0">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                  <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "DM Sans, sans-serif" }}>{c}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] mb-6"
            style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.2)", color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
            About
          </div>
          <h2 className="font-bold mb-4" style={{ fontFamily: "DM Sans, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>
            {about.name}
          </h2>
          <div className="text-[13px] font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
            {about.title ?? "Coach"} · {about.specialty ?? about.sport ?? "Athletics"}
          </div>
          {copy_variants?.about_tagline && (
            <p className="text-[18px] font-semibold mb-6 leading-[1.4]"
              style={{ background: "linear-gradient(135deg, white 0%, rgba(255,255,255,0.6) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "DM Sans, sans-serif" }}>
              {copy_variants.about_tagline}
            </p>
          )}
          <p className="text-[15px] leading-[1.8] mb-8" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "DM Sans, sans-serif" }}>
            {about.bio}
          </p>
          <div className="flex flex-wrap gap-3">
            {[`${about.years_experience ?? "10"}+ Years`, about.age_groups ?? "Youth & Teens", about.city].filter(Boolean).map((tag, i) => (
              <span key={i} className="px-4 py-2 rounded-full text-[12px] font-medium"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontFamily: "DM Sans, sans-serif" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
