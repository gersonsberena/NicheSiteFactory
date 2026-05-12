"use client"
import { useEffect } from "react"

export default function Toast({ show, onDismiss }: { show: boolean; onDismiss: () => void }) {
  useEffect(() => { if (show) { const t = setTimeout(onDismiss, 4000); return () => clearTimeout(t) } }, [show, onDismiss])
  if (!show) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 px-6 py-4"
      style={{ background: "rgba(13,11,9,0.97)", border: "1px solid rgba(var(--accent-rgb),0.3)", boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
      <div className="w-1.5 h-1.5 flex-shrink-0" style={{ background: "var(--accent)" }} />
      <p className="text-[13px] italic" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "DM Serif Display, serif" }}>Message sent</p>
      <button onClick={onDismiss} className="text-[18px] leading-none" style={{ color: "rgba(255,255,255,0.35)" }}>×</button>
    </div>
  )
}
