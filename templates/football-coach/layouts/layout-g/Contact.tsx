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

  const inp: React.CSSProperties = { background: "var(--bg)", border: "1px solid rgba(var(--accent-rgb),0.25)", color: "var(--text)", fontFamily: "Roboto, sans-serif", fontSize: "15px", padding: "11px 14px", width: "100%", outline: "none" }

  return (
    <section id="contact" className="py-20 md:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14">
        <div>
          <h2 className="font-bold text-[36px] md:text-[44px] mb-3 leading-tight" style={{ fontFamily: "Roboto Slab, serif", color: "var(--accent)", letterSpacing: "-0.02em" }}>
            {hero.cta_text || "Book a Session"}
          </h2>
          <div className="h-[2px] w-16 mb-8" style={{ background: "var(--accent)" }} />
          <div className="space-y-3 text-[15px]" style={{ color: "var(--text-muted)", fontFamily: "Roboto, sans-serif" }}>
            {contact.phone && <p>Phone: <a href={`tel:${contact.phone}`} style={{ color: "var(--text)" }}>{contact.phone}</a></p>}
            {contact.email && <p>Email: <a href={`mailto:${contact.email}`} style={{ color: "var(--text)" }}>{contact.email}</a></p>}
            {about.city && <p>Location: {about.city}{about.state ? `, ${about.state}` : ""}</p>}
          </div>
          {contact.booking_url && (
            <a href={contact.booking_url} target="_blank" rel="noopener noreferrer"
              className="inline-block mt-8 px-6 py-3 font-semibold text-[14px]"
              style={{ background: "var(--accent)", color: "white", fontFamily: "Roboto Slab, serif" }}>
              Book Online →
            </a>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" required placeholder="Name" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} style={inp} />
            <input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} style={inp} />
          </div>
          <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} style={inp} />
          <textarea rows={5} required placeholder="Message" value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} style={{ ...inp, resize: "vertical" }} />
          <button type="submit" disabled={sending} className="w-full py-3 font-semibold text-[14px] disabled:opacity-50"
            style={{ background: "var(--accent)", color: "white", fontFamily: "Roboto Slab, serif" }}>
            {sending ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  )
}
