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
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
        {/* Left: info */}
        <div className="lg:col-span-5">
          <div className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
            Get In Touch
          </div>
          <div className="h-px w-[60px] mb-6" style={{ background: "var(--accent)" }} />
          <h2
            className="font-extrabold text-[36px] md:text-[48px] leading-[1.05] mb-8"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em", color: "var(--text)" }}
          >
            {hero.cta_text || "Request a Consultation"}
          </h2>

          <div className="space-y-5 text-[15px]" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
            {contact.phone && (
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(var(--accent-rgb),0.3)" }}>
                  <span style={{ color: "var(--accent)", fontSize: "12px" }}>✆</span>
                </div>
                <a href={`tel:${contact.phone}`} style={{ color: "var(--text)" }}>{contact.phone}</a>
              </div>
            )}
            {contact.email && (
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(var(--accent-rgb),0.3)" }}>
                  <span style={{ color: "var(--accent)", fontSize: "11px" }}>@</span>
                </div>
                <a href={`mailto:${contact.email}`} style={{ color: "var(--text)" }}>{contact.email}</a>
              </div>
            )}
            {about.city && (
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(var(--accent-rgb),0.3)" }}>
                  <span style={{ color: "var(--accent)", fontSize: "11px" }}>◈</span>
                </div>
                <span>{about.city}{about.state ? `, ${about.state}` : ""}</span>
              </div>
            )}
          </div>

          {contact.booking_url && (
            <a
              href={contact.booking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-10 px-7 py-4 font-bold text-[12px] tracking-[0.22em] uppercase transition-colors"
              style={{ border: "1px solid var(--accent)", color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "var(--accent)"; el.style.color = "var(--bg)" }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "var(--accent)" }}
            >
              Book a Session →
            </a>
          )}
        </div>

        {/* Right: form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-4"
              suppressHydrationWarning>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.15em] uppercase mb-2" style={{ color: "var(--text-muted)", fontFamily: "Montserrat, sans-serif" }}>
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(var(--accent-rgb),0.6)")}
                  onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(var(--accent-rgb),0.2)")}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.15em] uppercase mb-2" style={{ color: "var(--text-muted)", fontFamily: "Montserrat, sans-serif" }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(var(--accent-rgb),0.6)")}
                  onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(var(--accent-rgb),0.2)")}
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.15em] uppercase mb-2" style={{ color: "var(--text-muted)", fontFamily: "Montserrat, sans-serif" }}>
                Phone (optional)
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                style={inputStyle}
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(var(--accent-rgb),0.6)")}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(var(--accent-rgb),0.2)")}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.15em] uppercase mb-2" style={{ color: "var(--text-muted)", fontFamily: "Montserrat, sans-serif" }}>
                Message
              </label>
              <textarea
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(var(--accent-rgb),0.6)")}
                onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(var(--accent-rgb),0.2)")}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-3 px-8 py-4 font-bold text-[12px] tracking-[0.22em] uppercase transition-colors disabled:opacity-50"
              style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "Montserrat, sans-serif" }}
            >
              {sending ? "Sending…" : "Send Message"}
              {!sending && <span className="block w-5 h-px" style={{ background: "var(--bg)" }} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
