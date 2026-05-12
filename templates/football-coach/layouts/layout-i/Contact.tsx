"use client"
import { useState } from "react"
import type { CoachConfig } from "@/lib/useConfig"
import Ornament from "./Ornament"

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

  const inp: React.CSSProperties = { background: "transparent", borderBottom: "1px solid rgba(var(--accent-rgb),0.3)", borderTop: "none", borderLeft: "none", borderRight: "none", color: "var(--text)", fontFamily: "Source Sans 3, sans-serif", fontSize: "16px", padding: "10px 0", width: "100%", outline: "none" }

  return (
    <section id="contact" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>Chapter X</div>
        <h2 className="font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--text)", fontSize: "clamp(32px,4vw,52px)" }}>
          {hero.cta_text || "Begin Your Story"}
        </h2>
        <Ornament />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-8">
          <div>
            <div className="space-y-4 text-[16px] mb-8" style={{ color: "var(--text-muted)", fontFamily: "Source Sans 3, sans-serif" }}>
              {contact.phone && <p>Phone: <a href={`tel:${contact.phone}`} style={{ color: "var(--text)" }}>{contact.phone}</a></p>}
              {contact.email && <p>Email: <a href={`mailto:${contact.email}`} style={{ color: "var(--text)" }}>{contact.email}</a></p>}
              {about.city && <p>Location: {about.city}{about.state ? `, ${about.state}` : ""}</p>}
            </div>
            {contact.booking_url && (
              <a href={contact.booking_url} target="_blank" rel="noopener noreferrer"
                className="inline-block px-6 py-3 font-semibold text-[15px]"
                style={{ border: "1px solid var(--accent)", color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>
                Book Online →
              </a>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" required placeholder="Name" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} style={inp} />
              <input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} style={inp} />
            </div>
            <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} style={inp} />
            <textarea rows={4} required placeholder="Your message" value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} style={{ ...inp, resize: "vertical" }} />
            <button type="submit" disabled={sending} className="px-8 py-4 font-semibold text-[15px] disabled:opacity-50 w-full"
              style={{ background: "var(--accent)", color: "white", fontFamily: "Source Sans 3, sans-serif" }}>
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
