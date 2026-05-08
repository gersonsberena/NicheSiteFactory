"use client"
import { useState, useEffect } from "react"

const CALENDLY_URL = "https://calendly.com/gerson-s-berena/30min?hide_event_type_details=1&hide_gdpr_banner=1"
const FORMSPREE_ID = "mvzlwpja"

function useCalendlyPopup() {
  useEffect(() => {
    const cssId = "calendly-widget-css"
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link")
      link.id = cssId
      link.rel = "stylesheet"
      link.href = "https://assets.calendly.com/assets/external/widget.css"
      document.head.appendChild(link)
    }
    const src = "https://assets.calendly.com/assets/external/widget.js"
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script")
      script.src = src
      script.async = true
      document.body.appendChild(script)
    }
  }, [])
}

export default function DemoCTA() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [sent, setSent] = useState(false)
  useCalendlyPopup()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formEl = e.target as HTMLFormElement
    fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      body: new FormData(formEl),
      headers: { Accept: "application/json" },
    }).catch(() => {})
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: "", email: "", phone: "", message: "" })
    }, 4000)
  }

  const handleCalendly = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).Calendly) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).Calendly.initPopupWidget({ url: CALENDLY_URL })
    }
  }

  return (
    <div style={{ zIndex: 9998 }} className="fixed bottom-5 right-5 flex flex-col items-end gap-2">
      {open && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 shadow-2xl w-72">
          <p className="font-semibold text-white text-sm mb-1">Like what you see? Let&apos;s build yours.</p>
          <p className="text-zinc-400 text-xs mb-4 leading-relaxed">
            Questions? Ready to move forward? Either way — drop a message or hop on a quick call. I&apos;ll get back to you fast.
          </p>

          {sent ? (
            <p className="text-green-400 text-sm font-medium py-3 text-center">
              Got it! I&apos;ll reach out within 24 hours. ✓
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                name="name"
                type="text"
                placeholder="Your name"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400"
              />
              <input
                name="email"
                type="email"
                placeholder="Your email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Your phone (optional)"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400"
              />
              <textarea
                name="message"
                placeholder="Any questions or notes? (optional)"
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 resize-none"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-semibold text-xs px-4 py-2 rounded-lg transition-colors mt-1"
              >
                Send me a note →
              </button>
            </form>
          )}

          <div className="flex items-center gap-3 my-4">
            <span className="flex-1 h-px bg-zinc-700" />
            <span className="text-zinc-500 text-xs">or</span>
            <span className="flex-1 h-px bg-zinc-700" />
          </div>

          <button
            onClick={handleCalendly}
            className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 hover:border-yellow-400/50 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            Book a quick 15-min call →
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-semibold text-xs px-4 py-2 rounded-full shadow-lg transition-all"
      >
        {open ? "✕ Close" : "Want a site like this?"}
      </button>
    </div>
  )
}
