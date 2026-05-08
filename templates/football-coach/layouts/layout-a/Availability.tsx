"use client"
import { useEffect } from "react"
import type { CoachConfig, AvailabilityConfig } from "@/lib/useConfig"

function useCalendlyPopup() {
  useEffect(() => {
    const cssId = "calendly-widget-css"
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link")
      link.id = cssId
      link.rel = "stylesheet"
      link.href = "https://assets.calendly.com/assets/external/widget.css"
      document.head.appendChild(link)
    }
    const src = "https://assets.calendly.com/assets/external/widget.js"
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script")
      script.src = src
      script.async = true
      document.body.appendChild(script)
    }
  }, [])
}

function CalendlyButton({ url, coachName }: { url: string; coachName: string }) {
  useCalendlyPopup()
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).Calendly) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).Calendly.initPopupWidget({ url })
    }
  }
  return (
    <div className="mt-10 text-center">
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-black font-bold px-8 py-4 rounded-full text-sm tracking-wide transition-colors"
      >
        Book a Free Session with Coach {coachName}
      </button>
    </div>
  )
}

export default function Availability({ config }: { config: CoachConfig }) {
  const avail = config.availability as AvailabilityConfig | undefined
  const schedule = avail?.schedule ?? []
  const note = avail?.note
  const calendlyUrl = config.contact?.calendly_url as string | null | undefined
  const rawName = config.about?.name ?? ""
  const coachName = rawName.replace(/^Coach\s+/i, "").split(" ")[0]

  if (!schedule.length && !calendlyUrl) return null

  return (
    <section id="availability" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <p className="text-[var(--accent)] text-xs font-bold tracking-widest uppercase mb-2">Coach {coachName}&apos;s Schedule</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Weekly Availability</h2>
          {note && <p className="mt-3 text-zinc-500 text-sm max-w-md mx-auto">{note}</p>}
        </div>

        {schedule.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 reveal">
            {schedule.map((day) => (
              <div
                key={day.day}
                className="border border-[rgba(var(--accent-rgb),0.15)] rounded-xl p-4 bg-[rgba(var(--accent-rgb),0.04)]"
              >
                <p className="text-[var(--accent)] font-bold text-xs uppercase tracking-widest mb-3 border-b border-[rgba(var(--accent-rgb),0.2)] pb-2">
                  {day.day.slice(0, 3)}
                </p>
                {day.slots.map((slot, i) => (
                  <p key={i} className="text-zinc-400 text-xs leading-relaxed py-1">
                    {slot}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {calendlyUrl && <CalendlyButton url={calendlyUrl} coachName={coachName} />}
      </div>
    </section>
  )
}
