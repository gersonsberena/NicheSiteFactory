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
    <div className="mt-10">
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white font-medium px-8 py-3 text-sm c-label transition-colors"
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
    <section id="availability" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="mb-12 reveal">
          <span className="c-label text-[#6B7280] block mb-3">Coach {coachName}&apos;s Schedule</span>
          <div className="c-rule-accent mb-4" />
          <h2 className="font-['Playfair_Display'] font-black text-3xl sm:text-4xl text-[#111827]">
            Weekly Availability
          </h2>
          {note && <p className="mt-3 text-[#6B7280] text-sm">{note}</p>}
        </div>

        {schedule.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 reveal">
            {schedule.map((day) => (
              <div
                key={day.day}
                className="border border-[#E5E7EB] p-4 hover:border-[var(--accent)] transition-colors"
              >
                <p className="c-label text-[var(--accent)] text-xs mb-3 border-b border-[#E5E7EB] pb-2">
                  {day.day.slice(0, 3)}
                </p>
                {day.slots.map((slot, i) => (
                  <p key={i} className="text-[#6B7280] text-xs leading-relaxed py-1">
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
