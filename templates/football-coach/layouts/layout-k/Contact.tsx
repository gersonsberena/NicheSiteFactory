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

  const inp: React.CSSProperties = { background: "rgba(var(--accent-rgb),0.03)", border: "1px solid rgba(var(--accent-rgb),0.15)", color: "white", fontFamily: "Inter, sans-serif", fontSize: "14px", padding: "12px 14px", width: "100%", outline: "none" }

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="absolute right-8 top-8 select-none pointer-events-none text-[160px] font-bold leading-none" style={{ color: "rgba(var(--accent-rgb),0.04)", fontFamily: "Space Grotesk, sans-serif" }}>09</div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div>
          <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-2" style={{ color: "rgba(var(--accent-rgb),0.7)", fontFamily: "Space Grotesk, sans-serif" }}>
            <div className="w-1 h-1" style={{ background: "var(--accent)" }} /> Contact
          </div>
          <h2 className="font-bold mb-8" style={{ fontFamily: "Space Grotesk, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>
            {hero.cta_text || "Get Started"}
          </h2>
          <div className="space-y-4 text-[14px] mb-8" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>
            {contact.phone && <div className="flex items-center gap-3"><span style={{ color: "var(--accent)", fontSize: "11px", fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.2em" }}>TEL</span><a href={`tel:${contact.phone}`} style={{ color: "rgba(255,255,255,0.7)" }}>{contact.phone}</a></div>}
            {contact.email && <div className="flex items-center gap-3"><span style={{ color: "var(--accent)", fontSize: "11px", fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.2em" }}>EMAIL</span><a href={`mailto:${contact.email}`} style={{ color: "rgba(255,255,255,0.7)" }}>{contact.email}</a></div>}
            {about.city && <div className="flex items-center gap-3"><span style={{ color: "var(--accent)", fontSize: "11px", fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.2em" }}>LOC</span><span>{about.city}{about.state ? `, ${about.state}` : ""}</span></div>}
          </div>
          {contact.booking_url && (
            <a href={contact.booking_url} target="_blank" rel="noopener noreferrer"
              className="inline-block px-6 py-3 font-semibold text-[13px] uppercase tracking-[0.1em]"
              style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "Space Grotesk, sans-serif" }}>
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
          <button type="submit" disabled={sending} className="w-full py-3.5 font-semibold text-[13px] uppercase tracking-[0.1em] disabled:opacity-50"
            style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "Space Grotesk, sans-serif" }}>
            {sending ? "Sending…" : "Send Message"}
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
