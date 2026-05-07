"use client"
import { useRef, useState, useEffect } from "react"
import type { CoachConfig } from "@/lib/useConfig"

export default function StatsBar({ config }: { config: CoachConfig }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const layout = config.design?.stats_layout ?? "horizontal-strip"

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.3 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  // grid-2x2 layout
  if (layout === "grid-2x2") {
    return (
      <section id="stats" ref={ref} className="relative bg-coal border-y border-white/5">
        <div className="absolute inset-0 diag-stripe opacity-60 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-14 sm:py-20 grid grid-cols-2 gap-0">
          {config.stats.slice(0, 4).map((s, i) => (
            <div
              key={s.label}
              className={`relative px-8 py-10 text-center border-white/10 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t" : ""} ${visible ? "pop-in" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="font-oswald font-bold text-[var(--accent)] text-6xl sm:text-7xl leading-none tracking-tight">
                {s.value}
              </div>
              <div className="mt-3 font-oswald uppercase tracking-[0.3em] text-white/80 text-xs sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // centered-large layout
  if (layout === "centered-large") {
    return (
      <section id="stats" ref={ref} className="relative bg-coal border-y border-white/5">
        <div className="absolute inset-0 diag-stripe opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0">
          {config.stats.map((s, i) => (
            <div
              key={s.label}
              className={`relative px-4 sm:px-8 text-center ${i > 0 ? "sm:border-l sm:border-white/10" : ""} ${visible ? "pop-in" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="font-oswald font-bold text-[var(--accent)] text-7xl sm:text-8xl md:text-9xl leading-none tracking-tight">
                {s.value}
              </div>
              <div className="mt-4 font-oswald uppercase tracking-[0.4em] text-white/80 text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // horizontal-strip (default)
  return (
    <section id="stats" ref={ref} className="relative bg-coal border-y border-white/5">
      <div className="absolute inset-0 diag-stripe opacity-60 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0">
        {config.stats.map((s, i) => (
          <div
            key={s.label}
            className={`relative px-4 sm:px-8 text-center sm:text-left ${i > 0 ? "sm:border-l sm:border-white/10" : ""} ${visible ? "pop-in" : "opacity-0"}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="font-oswald font-bold text-[var(--accent)] text-6xl sm:text-7xl md:text-8xl leading-none tracking-tight">
              {s.value}
            </div>
            <div className="mt-3 font-oswald uppercase tracking-[0.3em] text-white/80 text-xs sm:text-sm">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
