"use client"
import { useEffect } from "react"

export default function Toast({ show, onDismiss }: { show: boolean; onDismiss: () => void }) {
  useEffect(() => { if (show) { const t = setTimeout(onDismiss, 4000); return () => clearTimeout(t) } }, [show, onDismiss])
  if (!show) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 px-6 py-4 rounded-xl"
      style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", border: "1px solid rgba(var(--accent-rgb),0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
      <p className="text-[13px] font-medium" style={{ color: "white", fontFamily: "DM Sans, sans-serif" }}>Message sent</p>
      <button onClick={onDismiss} className="text-[18px] leading-none" style={{ color: "rgba(255,255,255,0.4)" }}>×</button>
    </div>
  )
}
