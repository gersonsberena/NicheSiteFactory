"use client"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
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
      <div className="bg-gold overflow-hidden py-3">
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
            <div className="w-10 h-10 bg-gold grid place-items-center font-bebas text-ink text-lg leading-none">
              {initials}
            </div>
            <div>
              <div className="font-bebas text-xl tracking-wide text-white leading-none">{config.about.name.toUpperCase()}</div>
              <div className="font-oswald text-[10px] uppercase tracking-[0.3em] text-gold/70">Performance Coaching</div>
            </div>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Elite football training in {config.about.city}, FL. Developing champions one rep at a time.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3 mt-6">
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 grid place-items-center text-white/40 hover:border-gold hover:text-gold transition">
                <Icons.Instagram className="w-4 h-4" />
              </a>
            )}
            {twitter && (
              <a href={twitter} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 grid place-items-center text-white/40 hover:border-gold hover:text-gold transition">
                <Icons.XSocial className="w-4 h-4" />
              </a>
            )}
            {youtube && (
              <a href={youtube} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 grid place-items-center text-white/40 hover:border-gold hover:text-gold transition">
                <Icons.Youtube className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="md:col-span-3">
          <div className="font-oswald uppercase tracking-[0.25em] text-white/40 text-[10px] mb-5">Quick Links</div>
          <nav className="space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })
                }}
                className="block font-oswald uppercase tracking-[0.2em] text-sm text-white/55 hover:text-gold transition"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact info */}
        <div className="md:col-span-4">
          <div className="font-oswald uppercase tracking-[0.25em] text-white/40 text-[10px] mb-5">Contact</div>
          <div className="space-y-4">
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-3 text-white/55 hover:text-gold transition group">
                <Icons.Phone className="w-4 h-4 text-gold/50 group-hover:text-gold shrink-0" />
                <span className="font-oswald tracking-wide text-sm">{phone}</span>
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-white/55 hover:text-gold transition group">
                <Icons.Mail className="w-4 h-4 text-gold/50 group-hover:text-gold shrink-0" />
                <span className="font-oswald tracking-wide text-sm break-all">{email}</span>
              </a>
            )}
            <div className="flex items-start gap-3 text-white/40">
              <Icons.Pin className="w-4 h-4 text-gold/50 shrink-0 mt-0.5" />
              <span className="font-oswald tracking-wide text-sm">
                {config.about.city}, {config.about.county} County, FL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-5 sm:px-8 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/25 font-oswald uppercase tracking-[0.2em] text-[10px]">
          © {year} {config.about.name}. All rights reserved.
        </p>
        <p className="text-white/20 font-oswald uppercase tracking-[0.15em] text-[10px]">
          Powered by First Coast Spotlight
        </p>
      </div>
    </footer>
  )
}
