import Link from "next/link"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

export default function Footer({ config }: { config: CoachConfig }) {
  const name = config.about?.name ?? "Coach"
  const initials = name
    .replace(/^Coach\s+/i, "")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
    { label: "Privacy Policy", href: config.legal?.privacy_policy_url ?? "/privacy" },
    { label: "Terms", href: config.legal?.terms_url ?? "/terms" },
  ]

  const socials: { icon: keyof typeof Icons; href: string | undefined; label: string }[] = [
    { icon: "Instagram", href: config.contact?.instagram, label: "Instagram" },
    { icon: "Facebook", href: config.contact?.facebook, label: "Facebook" },
    { icon: "XSocial", href: config.contact?.twitter, label: "X / Twitter" },
    { icon: "Youtube", href: config.contact?.youtube, label: "YouTube" },
  ].filter((s) => s.href) as typeof socials

  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--b-primary-700)] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--b-accent)] text-white font-poppins font-extrabold text-sm grid place-items-center shrink-0">
                {initials}
              </div>
              <div>
                <div className="font-poppins font-extrabold text-white leading-tight">{name}</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">
                  {config.about?.title ?? "Performance Coach"}
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Serving {config.about?.city ?? "the community"}{config.about?.county ? `, ${config.about.county} County` : ""}.
              Developing dedicated athletes one session at a time.
            </p>
            {socials.length > 0 && (
              <div className="flex gap-2 mt-6">
                {socials.map(({ icon, href, label }) => {
                  const Icon = Icons[icon] as React.ComponentType<React.SVGProps<SVGSVGElement>>
                  return (
                    <a
                      key={icon}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[var(--b-accent)] text-white grid place-items-center transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Nav */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-accent)] mb-4">
              Navigate
            </div>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("#") ? (
                    <a href={l.href} className="text-white/70 hover:text-[var(--b-accent-hi)] transition-colors text-sm font-medium">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-white/70 hover:text-[var(--b-accent-hi)] transition-colors text-sm font-medium">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-accent)] mb-4">
              Contact
            </div>
            <ul className="space-y-3">
              {config.contact?.phone && (
                <li>
                  <a
                    href={`tel:${config.contact.phone}`}
                    className="flex items-center gap-2 text-white/70 hover:text-[var(--b-accent-hi)] transition-colors text-sm"
                  >
                    <Icons.Phone className="w-4 h-4 shrink-0" />
                    {config.contact.phone}
                  </a>
                </li>
              )}
              {config.contact?.email && (
                <li>
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="flex items-center gap-2 text-white/70 hover:text-[var(--b-accent-hi)] transition-colors text-sm"
                  >
                    <Icons.Mail className="w-4 h-4 shrink-0" />
                    {config.contact.email}
                  </a>
                </li>
              )}
            </ul>
            {config.contact?.booking_url && (
              <a
                href={config.contact.booking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block bg-[var(--b-accent)] hover:bg-[var(--b-accent-hi)] text-white font-poppins font-semibold rounded-xl px-5 py-3 text-sm transition-colors"
              >
                Book a Free Call
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-1.5">
                Liability Disclaimer
              </p>
              <p className="text-xs text-white/40 leading-relaxed max-w-xl">
                Training involves vigorous physical activity and inherent risk of injury. By booking sessions, you assume all such risks.
                Consult a licensed physician before beginning any exercise program. Results may vary.
                {(config.legal?.minors_policy ?? true) && " Athletes under 18 require parental consent."}
                {(config.legal?.media_consent_notice ?? true) && " Photos or videos taken during sessions may be used for promotional purposes."}
              </p>
            </div>
            <p className="text-xs text-white/40 shrink-0">© {year} {name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
