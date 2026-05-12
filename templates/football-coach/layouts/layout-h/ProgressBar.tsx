"use client"
import { useEffect, useRef, useState } from "react"

export default function ProgressBar({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setAnimated(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const pct = Math.min(100, (value / max) * 100)

  return (
    <div ref={ref} className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[14px] font-medium" style={{ color: "var(--text)", fontFamily: "DM Sans, sans-serif" }}>{label}</span>
        <span className="text-[13px] font-bold" style={{ fontFamily: "DM Mono, monospace", color: "var(--accent)" }}>{value}%</span>
      </div>
      <div className="h-[6px] w-full" style={{ background: "rgba(var(--accent-rgb),0.12)" }}>
        <div className="h-full transition-all duration-1000 ease-out" style={{ width: animated ? `${pct}%` : "0%", background: "var(--accent)" }} />
      </div>
    </div>
  )
}
