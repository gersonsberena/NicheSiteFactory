"use client"

import { useState } from "react"
import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
  onSuccess: () => void
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function Contact({ config, onSuccess }: Props) {
  const { phone, email, formspree_id } = config.contact ?? {}
  const { city, county } = config.about ?? {}

  const [name, setName] = useState("")
  const [emailVal, setEmailVal] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  function validate(): boolean {
    const e: FormErrors = {}
    if (!name.trim()) e.name = "Please enter your name."
    if (!emailVal.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) e.email = "Please enter a valid email."
    if (message.trim().length < 10) e.message = "Please share a bit more detail (at least 10 characters)."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const endpoint = formspree_id
        ? `https://formspree.io/f/${formspree_id}`
        : "https://formspree.io/f/demo"
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email: emailVal, message }),
      })
      if (res.ok) {
        onSuccess()
        setName(""); setEmailVal(""); setMessage("")
      }
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = "w-full bg-d-warmwhite border border-d-navy/20 rounded-sm px-4 py-3 text-d-ink placeholder:text-d-ink/40 focus:outline-none focus:border-d-navy/60 transition-colors d-input"

  return (
    <section id="contact" className="bg-d-warmwhite py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="d-label-caps text-d-amber mb-3">Get in Touch</div>
          <h2 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-4xl md:text-5xl leading-[1.1] mb-4">
            Ready to Talk?
          </h2>
          <p className="text-d-ink/70 leading-relaxed mb-10">
            Fill out the form below and I&apos;ll follow up within 48 hours to schedule a free 30-minute intro call.
          </p>

          {/* Contact details */}
          {(phone || email || city) && (
            <div className="flex flex-wrap gap-6 mb-10 text-sm text-d-ink/60">
              {city && county && (
                <span>{city}, FL · {county} County</span>
              )}
              {phone && (
                <a href={`tel:${phone}`} className="hover:text-d-navy transition-colors">
                  {phone}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="hover:text-d-navy transition-colors">
                  {email}
                </a>
              )}
            </div>
          )}

          {/* Form card */}
          <div className="bg-d-cream p-8 md:p-10 rounded-sm">
            <form onSubmit={handleSubmit} noValidate className="space-y-5"
              suppressHydrationWarning>
              <div>
                <label htmlFor="d-name" className="d-label-caps text-d-navy text-[11px] mb-2 block">
                  Your Name
                </label>
                <input
                  id="d-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First and last name"
                  className={inputClass}
                  autoComplete="name"
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="d-email" className="d-label-caps text-d-navy text-[11px] mb-2 block">
                  Email Address
                </label>
                <input
                  id="d-email"
                  type="email"
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                  autoComplete="email"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="d-message" className="d-label-caps text-d-navy text-[11px] mb-2 block">
                  Tell Me About Your Athlete
                </label>
                <textarea
                  id="d-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Age, position, goals, schedule availability…"
                  className={`${inputClass} resize-none`}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-d-navy text-d-warmwhite d-label-caps rounded-sm hover:bg-d-amber transition-colors disabled:opacity-60 cursor-pointer"
              >
                {submitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
