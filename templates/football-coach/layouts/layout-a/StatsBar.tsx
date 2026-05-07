"use client"
import { useRef, useState, useEffect } from "react"
import type { CoachConfig } from "@/lib/useConfig"

export default function StatsBar({ config }: { config: CoachConfig }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.3 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

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
            <div className="font-oswald font-bold text-gold text-6xl sm:text-7xl md:text-8xl leading-none tracking-tight">
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
