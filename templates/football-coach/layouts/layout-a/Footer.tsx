"use client"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "/privacy" },
]

const MARQUEE_TEXT = "TRAIN HARD ★ PLAY HARD ★ WIN ★ TRAIN HARD ★ PLAY HARD ★ WIN ★ TRAIN HARD ★ PLAY HARD ★ WIN ★ TRAIN HARD ★ PLAY HARD ★ WIN ★"

export default function Footer({ config }: { config: CoachConfig }) {
  const phone = config.contact.phone as string | undefined
  const email = config.contact.email as string | undefined
  const instagram = (config.contact as Record<string, unknown>).instagram as string | undefined
  const twitter = (config.contact as Record<string, unknown>).twitter as string | undefined
  const youtube = (config.contact as Record<string, unknown>).youtube as string | undefined

  const initials = config.about.name
    .split(" ")
    .filter((w) => w.toLowerCase() !== "coach")
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("")

  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink border-t border-white/5">
      {/* Marquee strip */}
      <div className="bg-[var(--accent)] overflow-hidden py-3">
        <div className="marquee-track font-bebas text-ink text-sm tracking-[0.25em] whitespace-nowrap">
          <span>{MARQUEE_TEXT}&nbsp;&nbsp;&nbsp;</span>
          <span aria-hidden>{MARQUEE_TEXT}&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-12 gap-10">

        {/* Brand column */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[var(--accent)] grid place-items-center font-bebas text-ink text-lg leading-none">
              {initials}
            </div>
            <div>
              <div className="font-bebas text-xl tracking-wide text-white leading-none">{config.about.name.toUpperCase()}</div>
              <div className="font-oswald text-[10px] uppercase tracking-[0.3em] text-[var(--accent-dim)]">{config.about.sport} Coaching</div>
            </div>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Elite {config.about.sport.toLowerCase()} training in {config.about.city}, {config.about.state}. Developing champions one rep at a time.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3 mt-6">
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 grid place-items-center text-white/40 hover:border-[var(--accent)] hover:text-[var(--accent)] transition">
                <Icons.Instagram className="w-4 h-4" />
              </a>
            )}
            {twitter && (
              <a href={twitter} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 grid place-items-center text-white/40 hover:border-[var(--accent)] hover:text-[var(--accent)] transition">
                <Icons.XSocial className="w-4 h-4" />
              </a>
            )}
            {youtube && (
              <a href={youtube} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 grid place-items-center text-white/40 hover:border-[var(--accent)] hover:text-[var(--accent)] transition">
                <Icons.Youtube className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="md:col-span-3">
          <div className="font-oswald uppercase tracking-[0.25em] text-white/40 text-[10px] mb-5">Quick Links</div>
          <nav className="space-y-3">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="block font-oswald uppercase tracking-[0.2em] text-sm text-white/55 hover:text-[var(--accent)] transition"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="block font-oswald uppercase tracking-[0.2em] text-sm text-white/55 hover:text-[var(--accent)] transition"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>

        {/* Contact info */}
        <div className="md:col-span-4">
          <div className="font-oswald uppercase tracking-[0.25em] text-white/40 text-[10px] mb-5">Contact</div>
          <div className="space-y-4">
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-3 text-white/55 hover:text-[var(--accent)] transition group">
                <Icons.Phone className="w-4 h-4 text-[rgba(var(--accent-rgb),0.5)] group-hover:text-[var(--accent)] shrink-0" />
                <span className="font-oswald tracking-wide text-sm">{phone}</span>
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-white/55 hover:text-[var(--accent)] transition group">
                <Icons.Mail className="w-4 h-4 text-[rgba(var(--accent-rgb),0.5)] group-hover:text-[var(--accent)] shrink-0" />
                <span className="font-oswald tracking-wide text-sm break-all">{email}</span>
              </a>
            )}
            <div className="flex items-start gap-3 text-white/40">
              <Icons.Pin className="w-4 h-4 text-[rgba(var(--accent-rgb),0.5)] shrink-0 mt-0.5" />
              <span className="font-oswald tracking-wide text-sm">
                {config.about.city}, {config.about.county} County, {config.about.state}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-5 sm:px-8 py-5 max-w-7xl mx-auto flex flex-col items-center gap-3 text-center">
        <p className="text-white/20 font-oswald uppercase tracking-[0.12em] text-[10px] max-w-2xl">
          Results may vary. This site does not provide medical advice. Consult a physician before beginning any exercise program.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2">
          <p className="text-white/25 font-oswald uppercase tracking-[0.2em] text-[10px]">
            © {year} {config.about.name}. All rights reserved.
          </p>
          <p className="text-white/20 font-oswald uppercase tracking-[0.15em] text-[10px]">
            Powered by First Coast Spotlight
          </p>
        </div>
      </div>
    </footer>
  )
}
