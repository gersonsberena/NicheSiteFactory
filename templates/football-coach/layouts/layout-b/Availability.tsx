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
        className="inline-flex items-center gap-2 bg-[var(--b-accent)] hover:bg-[var(--b-accent-hi)] text-white font-poppins font-semibold px-8 py-4 rounded-xl text-sm transition-colors shadow-[var(--shadow-card)]"
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
    <section id="availability" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-primary-700)] mb-2">
            Coach {coachName}&apos;s Schedule
          </div>
          <h2 className="font-poppins font-extrabold text-3xl md:text-4xl tracking-tight text-[#1A1A1A]">
            Weekly Availability
          </h2>
          {note && <p className="mt-3 text-[#1A1A1A]/50 text-sm max-w-md mx-auto">{note}</p>}
        </div>

        {schedule.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {schedule.map((day) => (
              <div
                key={day.day}
                className="bg-[var(--b-primary-50)] border border-[var(--b-primary-100)] rounded-xl p-4 hover:shadow-[var(--shadow-card)] transition-shadow"
              >
                <p className="text-[var(--b-primary-700)] font-semibold text-xs uppercase tracking-widest mb-3 border-b border-[var(--b-primary-100)] pb-2">
                  {day.day.slice(0, 3)}
                </p>
                {day.slots.map((slot, i) => (
                  <p key={i} className="text-[#1A1A1A]/60 text-xs leading-relaxed py-1">
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
