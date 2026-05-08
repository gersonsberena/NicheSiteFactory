"use client"
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
    <section id="coach-profile" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 reveal">
          <p className="text-[var(--accent)] text-xs font-bold tracking-widest uppercase mb-2">Get to Know Coach {firstName}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Coach {firstName}</h2>
        </div>

        {mode === "prose" ? (
          <div className="reveal">
            <div className="border border-[rgba(var(--accent-rgb),0.2)] rounded-2xl p-8 bg-[rgba(var(--accent-rgb),0.04)]">
              <div className="text-[var(--accent)] text-4xl mb-4 opacity-40">&ldquo;</div>
              {proseText.split(/\n+/).map((para, i) => (
                <p key={i} className="text-zinc-300 leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {qaPairs.map((item, i) => (
              <div
                key={i}
                className="reveal border border-[rgba(var(--accent-rgb),0.15)] rounded-xl p-6 bg-[rgba(var(--accent-rgb),0.04)] hover:border-[rgba(var(--accent-rgb),0.35)] transition-colors"
              >
                <p className="text-[var(--accent)] font-semibold text-sm mb-2">{item.question}</p>
                <p className="text-zinc-300 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
