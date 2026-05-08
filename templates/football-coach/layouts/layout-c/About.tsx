import type { CoachConfig } from "@/lib/useConfig"
import { Icons } from "@/lib/icons"

export default function About({ config }: { config: CoachConfig }) {
  const layout = config.design?.c_about_layout ?? "photo-left"
  const photoCol = (
    <div className="md:col-span-5 reveal">
      <div className="c-photo-frame aspect-[4/5] overflow-hidden">
        <img
          src={config.about.photo as string}
          alt={config.about.name}
          className="w-full h-full object-cover object-top"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
        />
      </div>
    </div>
  )

  const credentials = (config.about.credentials as string[] | undefined) ?? []
  const firstName = (config.about?.name as string || "Coach").split(" ").find((w) => w !== "Coach") ?? "Coach"

  const textCol = (
    <div className="md:col-span-7 reveal" style={{ transitionDelay: "120ms" }}>
      <span className="c-label text-[#6B7280] block mb-4">About Coach {firstName}</span>
      <div className="c-rule-accent mb-6" />
      <blockquote className="font-['Playfair_Display'] italic text-xl sm:text-2xl text-[#374151] leading-relaxed mb-8 border-l-2 border-[var(--accent)] pl-6">
        &ldquo;{config.copy_variants?.about_quote ?? "Champions are made every single day before Friday night."}&rdquo;
      </blockquote>
      <h2 className="font-['Playfair_Display'] font-black text-3xl sm:text-4xl text-[#111827] leading-tight mb-4">
        {config.about.name}
      </h2>
      <p className="text-xs c-label text-[var(--accent)] mb-6">
        {config.about.title} · {config.about.city}, {config.about.state}
      </p>
      <p className="text-[#4B5563] leading-relaxed mb-8">{config.about.bio}</p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <div className="text-xs c-label text-[#9CA3AF] mb-1">Experience</div>
          <div className="font-semibold text-[#111827]">{config.about.years_experience} Years</div>
        </div>
        <div>
          <div className="text-xs c-label text-[#9CA3AF] mb-1">Athletes</div>
          <div className="font-semibold text-[#111827]">{config.about.age_groups}</div>
        </div>
        <div>
          <div className="text-xs c-label text-[#9CA3AF] mb-1">Specialty</div>
          <div className="font-semibold text-[#111827]">{config.about.specialty}</div>
        </div>
      </div>
      {credentials.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {credentials.map((cred, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 border border-[var(--accent)] text-[var(--accent)] px-3 py-1 text-xs c-label">
              <Icons.Check className="w-3 h-3" />
              {cred}
            </span>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {layout === "photo-right" ? (
            <>{textCol}{photoCol}</>
          ) : (
            <>{photoCol}{textCol}</>
          )}
        </div>
      </div>
    </section>
  )
}
