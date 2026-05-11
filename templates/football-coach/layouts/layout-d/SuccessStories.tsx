import Image from "next/image"
import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
}

function StoryPlaceholder({ variant = 1 }: { variant?: number }) {
  return (
    <div className={`relative overflow-hidden w-full h-full ${variant % 2 === 0 ? "d-portrait-bg-3" : "d-portrait-bg-2"}`}>
      <div className="absolute inset-0 d-grain opacity-30" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[120%] h-[38%] rounded-t-[40%] bg-black/25" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[30%] w-[28%] aspect-square rounded-full bg-black/30" />
    </div>
  )
}

export default function SuccessStories({ config }: Props) {
  const stories = config.success_stories ?? []

  if (stories.length === 0) return null

  return (
    <section id="success_stories" className="bg-d-warmwhite py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          <div className="d-label-caps text-d-amber mb-3">Athlete Results</div>
          <h2 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-4xl md:text-5xl leading-[1.1]">
            Real Work. Real Outcomes.
          </h2>
        </div>

        <div className="space-y-16">
          {stories.map((story, i) => {
            const isEven = i % 2 === 0
            return (
              <div
                key={i}
                className={`grid md:grid-cols-12 gap-8 md:gap-12 items-center ${
                  isEven ? "" : "md:[direction:rtl]"
                }`}
              >
                {/* Portrait */}
                <div className={`md:col-span-5 ${isEven ? "" : "md:[direction:ltr]"}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                    {"photo" in story && story.photo ? (
                      <Image
                        src={story.photo as string}
                        alt={story.name}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <StoryPlaceholder variant={i} />
                    )}
                  </div>
                </div>

                {/* Story text */}
                <div className={`md:col-span-7 ${isEven ? "" : "md:[direction:ltr]"}`}>
                  {/* Navy left accent line */}
                  <div className="border-l-4 border-d-navy pl-6">
                    <div className="d-label-caps text-d-amber mb-2">{story.role}</div>
                    <h3 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-2xl md:text-3xl mb-5">
                      {story.name}
                    </h3>
                    <p className="text-d-ink/75 leading-relaxed">
                      {story.story}
                    </p>
                    {story.result && (
                      <div className="mt-6 inline-block bg-d-cream px-5 py-3 rounded-sm">
                        <span className="d-label-caps text-d-amber text-[11px]">Outcome · </span>
                        <span className="text-d-navy font-semibold text-sm">{story.result}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
