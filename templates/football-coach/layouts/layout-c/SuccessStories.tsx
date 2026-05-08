import type { CoachConfig, SuccessStory } from "@/lib/useConfig"

export default function SuccessStories({ config }: { config: CoachConfig }) {
  const stories = config.success_stories as SuccessStory[]
  if (!stories?.length) return null

  return (
    <section id="results" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-12 reveal">
          <span className="c-label text-[#6B7280] block mb-4">Athlete Results</span>
          <div className="c-rule-accent mb-6" />
          <h2 className="font-['Playfair_Display'] font-black text-4xl sm:text-5xl text-[#111827] leading-tight">
            Real Athletes. Real Outcomes.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 reveal">
          {stories.map((story, i) => (
            <div
              key={i}
              className="pl-6 border-l-2 border-[var(--accent)] py-2"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#111827] mb-1">
                {story.name}
              </h3>
              <p className="text-xs c-label text-[var(--accent)] mb-4">{story.role}</p>
              <p className="text-[#6B7280] leading-relaxed mb-5">{story.story}</p>
              <div className="inline-flex items-center gap-2 bg-[rgba(var(--accent-rgb),0.06)] border border-[rgba(var(--accent-rgb),0.2)] px-4 py-2">
                <span className="text-xs c-label text-[var(--accent)]">{story.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
