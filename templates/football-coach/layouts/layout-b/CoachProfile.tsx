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
    <section id="coach-profile" className="py-20 md:py-28 bg-[var(--b-primary-50)]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-primary-700)] mb-2">
            Get to Know Coach {firstName}
          </div>
          <h2 className="font-poppins font-extrabold text-3xl md:text-4xl tracking-tight text-[#1A1A1A]">
            Coach {firstName}
          </h2>
        </div>

        {mode === "prose" ? (
          <div className="bg-white rounded-2xl p-8 shadow-[var(--shadow-card)] border border-[var(--b-primary-100)]">
            <div className="text-[var(--b-accent)] text-4xl mb-4 font-serif opacity-40">&ldquo;</div>
            {proseText.split(/\n+/).map((para, i) => (
              <p key={i} className="text-[#1A1A1A]/75 leading-relaxed mb-4 last:mb-0">
                {para}
              </p>
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {qaPairs.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-[var(--shadow-card)] border border-[var(--b-primary-100)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
              >
                <p className="text-[var(--b-primary-700)] font-semibold text-sm mb-2">{item.question}</p>
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
