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

  const inp: React.CSSProperties = { background: "var(--bg)", border: "1px solid rgba(var(--accent-rgb),0.2)", color: "var(--text)", fontFamily: "DM Sans, sans-serif", fontSize: "14px", padding: "12px 14px", width: "100%", outline: "none" }

  return (
    <section id="contact" className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>
            <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
            Get Started
          </div>
          <h2 className="font-bold mb-6" style={{ fontFamily: "DM Sans, sans-serif", color: "var(--text)", fontSize: "clamp(28px,4vw,44px)" }}>
            {hero.cta_text || "Book a Session"}
          </h2>
          <div className="space-y-4 text-[15px] mb-8" style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>
            {contact.phone && <div className="flex items-center gap-3"><span style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace", fontSize: "12px" }}>TEL</span><a href={`tel:${contact.phone}`} style={{ color: "var(--text)" }}>{contact.phone}</a></div>}
            {contact.email && <div className="flex items-center gap-3"><span style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace", fontSize: "12px" }}>EMAIL</span><a href={`mailto:${contact.email}`} style={{ color: "var(--text)" }}>{contact.email}</a></div>}
            {about.city && <div className="flex items-center gap-3"><span style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace", fontSize: "12px" }}>LOC</span><span>{about.city}{about.state ? `, ${about.state}` : ""}</span></div>}
          </div>
          {contact.booking_url && (
            <a href={contact.booking_url} target="_blank" rel="noopener noreferrer"
              className="inline-block px-6 py-3 font-semibold text-[14px]"
              style={{ background: "var(--accent)", color: "white", fontFamily: "DM Sans, sans-serif" }}>
              Book Online →
            </a>
          )}
          {contact.google_maps_embed_url && (
            <div className="mt-6 overflow-hidden" style={{ height: "200px" }}>
              <iframe
                src={String(contact.google_maps_embed_url)}
                width="100%"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
            </div>
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
          <button type="submit" disabled={sending} className="w-full py-3.5 font-semibold text-[14px] disabled:opacity-50 transition-opacity"
            style={{ background: "var(--accent)", color: "white", fontFamily: "DM Sans, sans-serif" }}>
            {sending ? "Sending…" : "Send Message →"}
          </button>
        </form>
      </div>
      {contact.calendly_url && (
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 mt-10">
          <iframe
            src={(String(contact.calendly_url).startsWith("http") ? String(contact.calendly_url) : `https://calendly.com/${String(contact.calendly_url)}`) + "?hide_gdpr_banner=1"}
            width="100%"
            height="700"
            style={{ border: "none" }}
            title="Schedule a session"
          />
        </div>
      )}
    </section>
  )
}
