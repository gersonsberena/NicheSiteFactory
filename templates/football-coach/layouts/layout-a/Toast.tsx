"use client"
import { useEffect, useState } from "react"
import { Icons } from "@/lib/icons"

interface ToastProps {
  show: boolean
  message?: string
  onDismiss: () => void
}

export default function Toast({ show, message = "Message sent! We'll be in touch.", onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const t = setTimeout(() => {
        setVisible(false)
        setTimeout(onDismiss, 300)
      }, 3500)
      return () => clearTimeout(t)
    }
  }, [show, onDismiss])

  if (!show && !visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 z-[200] flex items-center gap-3 px-6 py-4 bg-gold text-ink font-oswald uppercase tracking-[0.2em] text-sm shadow-goldglow transition-all duration-300
        ${visible ? "opacity-100 -translate-x-1/2 translate-y-0" : "opacity-0 -translate-x-1/2 translate-y-4 pointer-events-none"}`}
    >
      <Icons.Check className="w-5 h-5 shrink-0" />
      {message}
    </div>
  )
}
