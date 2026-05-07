"use client"

import { useEffect, useRef, useState } from "react"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
  openSignal?: number
}

export default function Contact({ config, openSignal }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  useEffect(() => {
    if (openSignal && openSignal > 0) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [openSignal])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const id = config.contact?.formspree_id
    if (!id) return
    setStatus("sending")
    try {
      const res = await fetch(`https://formspree.io/f/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus("sent")
        setName("")
        setEmail("")
        setMessage("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const firstName = config.about?.name?.replace(/^Coach\s+/i, "").split(" ")[0] ?? "Coach"

  return (
    <section id="contact" ref={ref} className="py-20 md:py-28 bg-[var(--b-primary-700)]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: info */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-accent)]">
              Get In Touch
            </div>
            <h2 className="font-poppins font-extrabold text-3xl md:text-5xl mt-3 tracking-tight text-white">
              Ready to start training?
            </h2>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">
              {config.copy_variants?.contact_subline ??
                `Reach out to Coach ${firstName} today. Spots are limited — don't wait.`}
            </p>

            <div className="mt-10 space-y-4">
              {config.contact?.phone && (
                <a
                  href={`tel:${config.contact.phone}`}
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/15 rounded-xl px-5 py-4 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--b-accent)] text-white grid place-items-center shrink-0">
                    <Icons.Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-wider font-semibold">Phone</div>
                    <div className="text-white font-semibold group-hover:text-[var(--b-accent-hi)] transition-colors">
                      {config.contact.phone}
                    </div>
                  </div>
                </a>
              )}
              {config.contact?.email && (
                <a
                  href={`mailto:${config.contact.email}`}
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/15 rounded-xl px-5 py-4 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--b-accent)] text-white grid place-items-center shrink-0">
                    <Icons.Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-wider font-semibold">Email</div>
                    <div className="text-white font-semibold group-hover:text-[var(--b-accent-hi)] transition-colors">
                      {config.contact.email}
                    </div>
                  </div>
                </a>
              )}
              {(config.about?.city || config.about?.county) && (
                <div className="flex items-center gap-4 bg-white/10 rounded-xl px-5 py-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--b-accent)] text-white grid place-items-center shrink-0">
                    <Icons.Pin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-wider font-semibold">Location</div>
                    <div className="text-white font-semibold">
                      {[config.about.city, config.about.county && `${config.about.county} County`]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl shadow-[var(--shadow-card-hover)] p-7 sm:p-9">
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--b-primary-100)] text-[var(--b-primary-600)] grid place-items-center">
                  <Icons.Check className="w-7 h-7" />
                </div>
                <h3 className="font-poppins font-semibold text-xl text-[#1A1A1A]">Message sent!</h3>
                <p className="text-[#1A1A1A]/60">
                  Coach {firstName} will be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full rounded-lg border border-[var(--b-primary-100)] bg-paper px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:ring-2 focus:ring-[var(--b-primary-600)] transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-[var(--b-primary-100)] bg-paper px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:ring-2 focus:ring-[var(--b-primary-600)] transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Tell Coach ${firstName} about your athlete and what you're looking for…`}
                    className="w-full rounded-lg border border-[var(--b-primary-100)] bg-paper px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:ring-2 focus:ring-[var(--b-primary-600)] transition resize-none"
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-[var(--b-primary-600)] hover:bg-[var(--b-primary-700)] disabled:opacity-60 text-white font-poppins font-semibold rounded-xl px-6 py-4 transition-colors"
                >
                  {status === "sending" ? "Sending…" : `Message Coach ${firstName}`}
                </button>
                <p className="text-center text-xs text-[#1A1A1A]/40">
                  Free intro call · No commitment required
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
