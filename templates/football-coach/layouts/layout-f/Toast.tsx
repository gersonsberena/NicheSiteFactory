"use client"
import { useEffect } from "react"

export default function Toast({ show, onDismiss }: { show: boolean; onDismiss: () => void }) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onDismiss, 4000)
      return () => clearTimeout(t)
    }
  }, [show, onDismiss])

  if (!show) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-4 px-6 py-4"
      style={{ background: "var(--accent)", fontFamily: "Barlow Condensed, sans-serif" }}
    >
      <p className="text-[14px] font-bold uppercase tracking-wide" style={{ color: "var(--bg)" }}>
        Message sent — we&rsquo;ll be in touch!
      </p>
      <button onClick={onDismiss} className="font-black text-[20px] leading-none" style={{ color: "var(--bg)", opacity: 0.7 }}>×</button>
    </div>
  )
}
