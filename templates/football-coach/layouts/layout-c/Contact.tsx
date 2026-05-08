"use client"
import { useState, useEffect } from "react"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

export default function Contact({ config, openSignal }: { config: CoachConfig; openSignal?: number }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (openSignal && openSignal > 0) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    }
  }, [openSignal])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!config.contact.formspree_id) return
    setStatus("sending")
    try {
      const res = await fetch(`https://formspree.io/f/${config.contact.formspree_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  const replyTime = config.copy_variants?.c_contact_reply_time ?? "Direct reply within 24 hours."

  return (
    <section id="contact" className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Info col */}
          <div className="md:col-span-5 reveal">
            <span className="c-label text-[#6B7280] block mb-4">Get In Touch</span>
            <div className="c-rule-accent mb-6" />
            <h2 className="font-['Playfair_Display'] font-black text-4xl sm:text-5xl text-[#111827] leading-tight mb-6">
              Start Your Journey.
            </h2>
            <p className="text-[#6B7280] leading-relaxed mb-8">
              {config.copy_variants?.contact_offer ?? "Free 30-minute intro session. Bring your goals — leave with a plan."}
            </p>
            <p className="text-sm text-[#9CA3AF] italic mb-10">
              {config.copy_variants?.contact_urgency}
            </p>
            <div className="flex flex-col gap-5">
              {config.contact.phone && (
                <a href={`tel:${config.contact.phone}`} className="flex items-center gap-3 text-[#374151] hover:text-[var(--accent)] transition-colors group">
                  <Icons.Phone className="w-5 h-5 text-[var(--accent)]" />
                  <span className="font-medium">{config.contact.phone as string}</span>
                </a>
              )}
              {config.contact.email && (
                <a href={`mailto:${config.contact.email}`} className="flex items-center gap-3 text-[#374151] hover:text-[var(--accent)] transition-colors">
                  <Icons.Mail className="w-5 h-5 text-[var(--accent)]" />
                  <span className="font-medium">{config.contact.email as string}</span>
                </a>
              )}
              {config.about.city && (
                <div className="flex items-center gap-3 text-[#374151]">
                  <Icons.Pin className="w-5 h-5 text-[var(--accent)]" />
                  <span className="font-medium">{config.about.city}, {config.about.state}</span>
                </div>
              )}
            </div>
            <p className="mt-8 text-xs c-label text-[#9CA3AF]">{replyTime}</p>
          </div>

          {/* Form col */}
          <div className="md:col-span-7 reveal" style={{ transitionDelay: "100ms" }}>
            {status === "success" ? (
              <div className="h-full flex flex-col items-start justify-center py-12">
                <div className="c-rule-accent mb-6" />
                <h3 className="font-['Playfair_Display'] font-bold text-2xl text-[#111827] mb-3">Message received.</h3>
                <p className="text-[#6B7280]">{replyTime}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                  <label className="c-label text-[#6B7280] block mb-2 text-xs">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="c-input-line w-full"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="c-label text-[#6B7280] block mb-2 text-xs">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="c-input-line w-full"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="c-label text-[#6B7280] block mb-2 text-xs">Tell Us About Your Goals</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="c-input-line w-full resize-none"
                    placeholder="What are you looking to achieve?"
                  />
                </div>
                {status === "error" && (
                  <p className="text-sm text-red-600">Something went wrong. Please try again or email us directly.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="self-start inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white font-semibold px-8 py-3 transition-colors disabled:opacity-50"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                  {status !== "sending" && <Icons.Arrow className="w-4 h-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
