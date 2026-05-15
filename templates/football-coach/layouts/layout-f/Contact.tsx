"use client"
import { useState } from "react"
import type { CoachConfig } from "@/lib/useConfig"
import Eyebrow from "./Eyebrow"

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
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      })
      setForm({ name: "", email: "", phone: "", message: "" })
      onSuccess()
    } finally {
      setSending(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    background: "var(--bg2)",
    border: "1px solid rgba(var(--accent-rgb),0.2)",
    color: "var(--text)",
    fontFamily: "Barlow, sans-serif",
    fontSize: "15px",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
  }

  return (
    <section id="contact" className="py-24 md:py-32" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
        <div>
          <Eyebrow>Get Started</Eyebrow>
          <h2
            className="font-black leading-[0.92] mb-8"
            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "clamp(40px, 5vw, 64px)", textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--text)" }}
          >
            {hero.cta_text || "Start Training"}
          </h2>
          <div className="space-y-4 text-[15px]" style={{ color: "var(--text-muted)", fontFamily: "Barlow, sans-serif" }}>
            {contact.phone && <p>📞 <a href={`tel:${contact.phone}`} style={{ color: "var(--text)" }}>{contact.phone}</a></p>}
            {contact.email && <p>✉ <a href={`mailto:${contact.email}`} style={{ color: "var(--text)" }}>{contact.email}</a></p>}
            {about.city && <p>📍 {about.city}{about.state ? `, ${about.state}` : ""}</p>}
          </div>
          {contact.booking_url && (
            <a
              href={contact.booking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 px-7 py-3 font-bold text-[13px] tracking-[0.2em] uppercase"
              style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "Barlow Condensed, sans-serif" }}
            >
              Book a Session →
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
            <input type="text" required placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} style={inputStyle} />
            <input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} style={inputStyle} />
          </div>
          <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} style={inputStyle} />
          <textarea rows={5} required placeholder="Tell us about your goals..." value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} style={{ ...inputStyle, resize: "vertical" }} />
          <button
            type="submit"
            disabled={sending}
            className="w-full py-4 font-black text-[14px] tracking-[0.2em] uppercase transition-opacity disabled:opacity-50"
            style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "Barlow Condensed, sans-serif" }}
          >
            {sending ? "Sending…" : "Send Message →"}
          </button>
        </form>
      </div>
      {contact.calendly_url && (
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 mt-10">
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
