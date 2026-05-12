"use client"
import { useEffect } from "react"

export default function Toast({ show, onDismiss }: { show: boolean; onDismiss: () => void }) {
  useEffect(() => { if (show) { const t = setTimeout(onDismiss, 4000); return () => clearTimeout(t) } }, [show, onDismiss])
  if (!show) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 px-6 py-4"
      style={{ background: "rgba(15,23,42,0.97)", border: "1px solid rgba(var(--accent-rgb),0.4)", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
      <div className="w-2 h-2 flex-shrink-0" style={{ background: "var(--accent)" }} />
      <p className="text-[13px] font-medium uppercase tracking-[0.1em]" style={{ color: "white", fontFamily: "Space Grotesk, sans-serif" }}>Message sent</p>
      <button onClick={onDismiss} className="text-[18px] leading-none" style={{ color: "rgba(255,255,255,0.4)" }}>×</button>
    </div>
  )
}
