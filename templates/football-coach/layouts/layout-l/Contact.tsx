"use client"
import { useState } from "react"
import type { CoachConfig } from "@/lib/useConfig"

export default function Contact({ config, onSuccess }: { config: CoachConfig; onSuccess: () => void }) {
  const { contact, about, hero } = config
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!contact.formspree_id) return
    setSending(true)
    try {
      await fetch(`https://formspree.io/f/${contact.formspree_id}`, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      })
      setForm({ name: "", email: "", phone: "", message: "" })
      onSuccess()
    } finally { setSending(false) }
  }

  const inp: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    color: "white",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "14px",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
  }

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div>
          <div className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] mb-6"
            style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.2)", color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
            Contact
          </div>
          <h2 className="font-bold mb-8" style={{ fontFamily: "DM Sans, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>
            {hero.cta_text || "Get Started"}
          </h2>
          <div className="space-y-4 mb-8">
            {contact.phone && (
              <div className="flex items-center gap-3 text-[14px]">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>Tel</span>
                <a href={`tel:${contact.phone}`} style={{ color: "rgba(255,255,255,0.65)", fontFamily: "DM Sans, sans-serif" }}>{contact.phone}</a>
              </div>
            )}
            {contact.email && (
              <div className="flex items-center gap-3 text-[14px]">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>Email</span>
                <a href={`mailto:${contact.email}`} style={{ color: "rgba(255,255,255,0.65)", fontFamily: "DM Sans, sans-serif" }}>{contact.email}</a>
              </div>
            )}
            {about.city && (
              <div className="flex items-center gap-3 text-[14px]">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>Loc</span>
                <span style={{ color: "rgba(255,255,255,0.65)", fontFamily: "DM Sans, sans-serif" }}>{about.city}{about.state ? `, ${about.state}` : ""}</span>
              </div>
            )}
          </div>
          {contact.booking_url && (
            <a href={contact.booking_url} target="_blank" rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-full font-semibold text-[13px]"
              style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "DM Sans, sans-serif" }}>
              Book Online →
            </a>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4"
              suppressHydrationWarning>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" required placeholder="Name" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} style={inp} />
            <input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} style={inp} />
          </div>
          <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} style={inp} />
          <textarea rows={5} required placeholder="Message" value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} style={{ ...inp, resize: "vertical" }} />
          <button type="submit" disabled={sending} className="w-full py-3.5 rounded-full font-semibold text-[14px] disabled:opacity-50 transition-all duration-200"
            style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "DM Sans, sans-serif" }}>
            {sending ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  )
}
