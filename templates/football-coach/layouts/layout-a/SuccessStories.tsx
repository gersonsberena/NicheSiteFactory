"use client"
import type { CoachConfig, SuccessStory } from "@/lib/useConfig"

export default function SuccessStories({ config }: { config: CoachConfig }) {
  const stories = config.success_stories as SuccessStory[] | undefined
  if (!stories?.length) return null

  return (
    <section id="success_stories" className="relative bg-smoke py-24 sm:py-32 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[rgba(var(--accent-rgb),0.06)] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 text-[var(--accent)] mb-5">
            <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
            <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm opacity-90">Athlete Journeys</span>
            <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight">
            <span className="text-white">SUCCESS </span>
            <span className="accent-grad">STORIES</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {stories.map((story, i) => (
            <div
              key={i}
              className="reveal card-glow bg-ink border border-white/5 p-8 flex flex-col gap-5"
            >
              <div>
                <div className="font-bebas text-2xl tracking-wide text-white leading-none">{story.name}</div>
                <div className="font-oswald uppercase tracking-[0.25em] text-[var(--accent)] text-[10px] mt-1">{story.role}</div>
              </div>

              <p className="text-white/65 leading-relaxed text-base flex-1">{story.story}</p>

              <div className="border-t border-[rgba(var(--accent-rgb),0.2)] pt-5">
                <div className="font-oswald uppercase tracking-[0.2em] text-[var(--accent)] text-xs mb-1">Result</div>
                <div className="font-bebas text-xl tracking-wide text-white">{story.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
