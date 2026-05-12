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
      style={{
        background: "var(--bg2)",
        border: "1px solid rgba(var(--accent-rgb),0.4)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
      <p className="text-[14px]" style={{ color: "var(--text)" }}>
        Message sent — we&rsquo;ll be in touch.
      </p>
      <button
        onClick={onDismiss}
        className="ml-2 text-[18px] leading-none"
        style={{ color: "var(--text-muted)" }}
      >
        ×
      </button>
    </div>
  )
}
