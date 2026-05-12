"use client"
import { useEffect } from "react"

export default function Toast({ show, onDismiss }: { show: boolean; onDismiss: () => void }) {
  useEffect(() => { if (show) { const t = setTimeout(onDismiss, 4000); return () => clearTimeout(t) } }, [show, onDismiss])
  if (!show) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 px-6 py-4"
      style={{ background: "var(--accent)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
      <p className="text-[14px] font-semibold" style={{ color: "white", fontFamily: "Roboto Slab, serif" }}>Message sent — we&rsquo;ll be in touch.</p>
      <button onClick={onDismiss} className="text-[20px] leading-none font-bold" style={{ color: "white", opacity: 0.7 }}>×</button>
    </div>
  )
}
