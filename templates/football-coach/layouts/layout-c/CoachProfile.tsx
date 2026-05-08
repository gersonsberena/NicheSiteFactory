import type { CoachConfig } from "@/lib/useConfig"

const PLACEHOLDER_QA = [
  {
    question: "What does a typical training session look like?",
    answer:
      "Sessions start with a dynamic warm-up, move into position-specific drills, and finish with competitive reps and film-level feedback. Every session is structured, intentional, and tailored to where you are right now.",
  },
  {
    question: "What age groups do you work with?",
    answer:
      "Athletes from middle school through college level. Sessions are built around where the athlete is — not a one-size-fits-all curriculum.",
  },
  {
    question: "What's your coaching philosophy?",
    answer:
      "Fundamentals win games. Every drill has a purpose, every rep has a standard. I coach the whole athlete — mindset, mechanics, and effort — because that's what separates good from great.",
  },
  {
    question: "What should athletes bring to their first session?",
    answer:
      "Cleats, water, and a coachable attitude. All training equipment is provided. Come ready to work and willing to be challenged.",
  },
]

function parseQA(bio: string): { question: string; answer: string }[] | null {
  const lines = bio.split(/\n+/).map((l) => l.trim()).filter(Boolean)
  const pairs: { question: string; answer: string }[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (/[?:]$/.test(line) && i + 1 < lines.length) {
      pairs.push({ question: line.replace(/:$/, ""), answer: lines[i + 1] })
      i += 2
    } else {
      i++
    }
  }
  return pairs.length >= 2 ? pairs : null
}

export default function CoachProfile({ config }: { config: CoachConfig }) {
  const bio = config.about?.bio as string | undefined
  const firstName = (config.about?.name as string || "Coach").split(" ").find((w) => w !== "Coach") ?? "Coach"

  let mode: "structured" | "prose" | "placeholder" = "placeholder"
  let qaPairs: { question: string; answer: string }[] = PLACEHOLDER_QA
  let proseText = ""

  if (bio) {
    const parsed = parseQA(bio)
    if (parsed) {
      mode = "structured"
      qaPairs = parsed
    } else {
      mode = "prose"
      proseText = bio
    }
  }

  return (
    <section id="coach-profile" className="py-20 bg-[#F9FAFB]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="mb-12 reveal">
          <span className="c-label text-[#6B7280] block mb-3">Get to Know Coach {firstName}</span>
          <div className="c-rule-accent mb-4" />
          <h2 className="font-['Playfair_Display'] font-black text-3xl sm:text-4xl text-[#111827]">
            Coach {firstName}
          </h2>
        </div>

        {mode === "prose" ? (
          <div className="reveal bg-white border-l-2 border-[var(--accent)] pl-8 py-6 pr-6">
            <div className="font-['Playfair_Display'] italic text-4xl text-[var(--accent)] opacity-40 mb-4">&ldquo;</div>
            {proseText.split(/\n+/).map((para, i) => (
              <p key={i} className="text-[#4B5563] leading-relaxed mb-4 last:mb-0">
                {para}
              </p>
            ))}
          </div>
        ) : (
          <div className="grid gap-3">
            {qaPairs.map((item, i) => (
              <div
                key={i}
                className="reveal bg-white border border-[#E5E7EB] p-6 hover:border-[var(--accent)] transition-colors"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <p className="c-label text-[var(--accent)] text-xs mb-2">{item.question}</p>
                <p className="text-[#4B5563] text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
