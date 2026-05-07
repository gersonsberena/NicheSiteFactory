"use client"
import { useState } from "react"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

export default function Contact({ config }: { config: CoachConfig }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const er: Record<string, string> = {}
    if (!form.name.trim()) er.name = "Name required"
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) er.email = "Valid email required"
    if (form.message.trim().length < 10) er.message = "Tell us a bit more (10+ chars)"
    setErrors(er)
    if (Object.keys(er).length === 0) {
      const formEl = e.target as HTMLFormElement
      fetch(formEl.action, {
        method: "POST",
        body: new FormData(formEl),
        headers: { Accept: "application/json" },
      }).catch(() => {})
      setSent(true)
      setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }) }, 4000)
    }
  }

  const phone = config.contact.phone as string | undefined
  const email = config.contact.email as string | undefined

  return (
    <section id="contact" className="relative bg-ink py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 stadium-bg opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 text-gold/90 mb-5">
            <span className="inline-block h-[2px] w-10 bg-gold" />
            <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm">Get In Touch</span>
            <span className="inline-block h-[2px] w-10 bg-gold" />
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight">
            <span className="text-white">READY TO </span>
            <span className="gold-grad">LEVEL UP?</span>
          </h2>
          <p className="mt-5 text-white/65 max-w-xl mx-auto text-lg">
            Free 30-minute intro session. Bring your goals — leave with a plan.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Info column */}
          <div className="lg:col-span-5 reveal space-y-8">
            <div>
              <h3 className="font-bebas text-3xl tracking-wide text-white mb-2">CONTACT THE COACH</h3>
              <p className="text-white/60 leading-relaxed">
                Roster spots fill fast in the off-season. Reach out today and lock in your training slot.
              </p>
            </div>

            <div className="space-y-5">
              {phone && (
                <a href={`tel:${phone}`} className="group flex items-center gap-5 p-5 bg-smoke/60 border border-white/5 hover:border-gold/40 transition">
                  <div className="w-12 h-12 grid place-items-center bg-gold/10 border border-gold/30 text-gold group-hover:bg-gold group-hover:text-ink transition">
                    <Icons.Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-oswald uppercase tracking-[0.25em] text-white/50 text-[10px]">Phone</div>
                    <div className="font-oswald text-xl text-white tracking-wide">{phone}</div>
                  </div>
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="group flex items-center gap-5 p-5 bg-smoke/60 border border-white/5 hover:border-gold/40 transition">
                  <div className="w-12 h-12 grid place-items-center bg-gold/10 border border-gold/30 text-gold group-hover:bg-gold group-hover:text-ink transition">
                    <Icons.Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-oswald uppercase tracking-[0.25em] text-white/50 text-[10px]">Email</div>
                    <div className="font-oswald text-base text-white tracking-wide break-all">{email}</div>
                  </div>
                </a>
              )}
              <div className="flex items-center gap-5 p-5 bg-smoke/60 border border-white/5">
                <div className="w-12 h-12 grid place-items-center bg-gold/10 border border-gold/30 text-gold">
                  <Icons.Pin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-oswald uppercase tracking-[0.25em] text-white/50 text-[10px]">Location</div>
                  <div className="font-oswald text-xl text-white tracking-wide">
                    {config.about.city}, {config.about.county} County, FL
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-gold pl-5 py-2">
              <div className="font-bebas text-3xl tracking-wide text-white leading-none">READY TO LEVEL UP?</div>
              <div className="font-oswald uppercase tracking-[0.25em] text-gold text-xs mt-2">Let&apos;s build a champion.</div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 reveal">
            <form
              action={`https://formspree.io/f/${config.contact.formspree_id}`}
              onSubmit={submit}
              className="bg-smoke/60 border border-white/5 p-7 sm:p-10 space-y-6"
            >
              <div>
                <label className="font-oswald uppercase tracking-[0.25em] text-white/60 text-xs mb-2 block">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="John Smith"
                  className="input-dark w-full px-5 py-4 text-white placeholder:text-white/30"
                />
                {errors.name && <p className="mt-2 text-red-400 text-xs font-oswald uppercase tracking-wider">{errors.name}</p>}
              </div>
              <div>
                <label className="font-oswald uppercase tracking-[0.25em] text-white/60 text-xs mb-2 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className="input-dark w-full px-5 py-4 text-white placeholder:text-white/30"
                />
                {errors.email && <p className="mt-2 text-red-400 text-xs font-oswald uppercase tracking-wider">{errors.email}</p>}
              </div>
              <div>
                <label className="font-oswald uppercase tracking-[0.25em] text-white/60 text-xs mb-2 block">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={update("message")}
                  rows={5}
                  placeholder="Tell me about your athlete and goals..."
                  className="input-dark w-full px-5 py-4 text-white placeholder:text-white/30 resize-none"
                />
                {errors.message && <p className="mt-2 text-red-400 text-xs font-oswald uppercase tracking-wider">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="btn-gold w-full flex items-center justify-center gap-2 bg-gold hover:bg-goldhi text-ink font-oswald font-semibold uppercase tracking-[0.18em] py-5 text-base"
              >
                {sent ? (
                  <><Icons.Check className="w-5 h-5" /> Message Sent — We&apos;ll Be In Touch</>
                ) : (
                  <>{config.hero.cta_text} <Icons.Arrow className="w-4 h-4" /></>
                )}
              </button>
              <p className="text-white/40 text-xs text-center font-oswald uppercase tracking-[0.2em]">
                No spam. Direct reply within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
