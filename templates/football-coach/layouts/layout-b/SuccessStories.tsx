import { Icons } from "@/lib/icons"
import type { CoachConfig, SuccessStory } from "@/lib/useConfig"

export default function SuccessStories({ config }: { config: CoachConfig }) {
  const stories = (config.success_stories ?? []) as SuccessStory[]

  if (!stories.length) return null

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-primary-700)]">
              Success Stories
            </div>
            <h2 className="font-poppins font-extrabold text-3xl md:text-5xl mt-3 tracking-tight text-[#1A1A1A]">
              The growth happens off the field, too.
            </h2>
          </div>
          <p className="text-[#1A1A1A]/60 max-w-sm">
            Real athletes. Real results. These are the wins that matter most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((s, i) => {
            const initials = s.name
              .split(" ")
              .map((w: string) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()

            return (
              <article
                key={i}
                className="bg-white rounded-2xl shadow-[var(--shadow-card)] p-7 sm:p-9 border-l-4 border-[var(--b-primary-600)] lift hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--b-primary-100)] text-[var(--b-primary-700)] grid place-items-center font-poppins font-extrabold text-xl shrink-0">
                    {initials}
                  </div>
                  <div>
                    <div className="font-poppins font-semibold text-xl text-[#1A1A1A]">{s.name}</div>
                    <div className="text-xs uppercase tracking-[0.16em] text-[var(--b-primary-700)] font-semibold mt-0.5">
                      {s.role}
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-[#1A1A1A]/75 leading-relaxed text-[17px]">{s.story}</p>
                <div className="mt-6 inline-flex bg-[var(--b-primary-50)] text-[var(--b-primary-800)] font-semibold rounded-full px-4 py-2 text-sm items-center gap-2">
                  <Icons.Check className="w-4 h-4 text-[var(--b-primary-600)]" /> {s.result}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
