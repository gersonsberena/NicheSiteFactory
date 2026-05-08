import Link from "next/link"
import { Icons } from "@/lib/icons"
import type { CoachConfig } from "@/lib/useConfig"

export default function Footer({ config }: { config: CoachConfig }) {
  const year = new Date().getFullYear()
  const lastName = config.about.name.replace(/^Coach\s+/i, "").split(" ").slice(-1)[0]

  const navLinks = [
    ["About", "#about"],
    ["Services", "#services"],
    ["Testimonials", "#testimonials"],
    ["Gallery", "#gallery"],
    ["Contact", "#contact"],
    ["Privacy Policy", config.legal?.privacy_policy_url ?? "/privacy"],
    ["Terms", config.legal?.terms_url ?? "/terms"],
  ]

  return (
    <footer className="bg-[#111827] text-white py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="font-['Playfair_Display'] font-black text-2xl text-[var(--accent)] mb-3">
              {lastName}
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {config.about.specialty} · {config.about.city}, {config.about.state}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="c-label text-white/40 text-xs mb-4">Navigation</p>
            <nav className="flex flex-col gap-2">
              {navLinks.map(([label, href]) =>
                href.startsWith("#") ? (
                  <a key={label} href={href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {label}
                  </a>
                ) : (
                  <Link key={label} href={href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="c-label text-white/40 text-xs mb-4">Connect</p>
            <div className="flex flex-col gap-3">
              {(config.contact.instagram as string | undefined) && (
                <a
                  href={config.contact.instagram as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
                >
                  <Icons.Instagram className="w-4 h-4" /> Instagram
                </a>
              )}
              {(config.contact.twitter as string | undefined) && (
                <a
                  href={config.contact.twitter as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
                >
                  <Icons.XSocial className="w-4 h-4" /> Twitter / X
                </a>
              )}
              {(config.contact.youtube as string | undefined) && (
                <a
                  href={config.contact.youtube as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
                >
                  <Icons.Youtube className="w-4 h-4" /> YouTube
                </a>
              )}
              {config.contact.phone && (
                <a href={`tel:${config.contact.phone}`} className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                  <Icons.Phone className="w-4 h-4" /> {config.contact.phone as string}
                </a>
              )}
              {config.contact.email && (
                <a href={`mailto:${config.contact.email}`} className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                  <Icons.Mail className="w-4 h-4" /> {config.contact.email as string}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              &copy; {year} {config.about.name}. All rights reserved.
            </p>
            <p className="text-white/20 text-xs">
              {config.about.city}, {config.about.state} · {config.about.sport ?? "Football"} Coaching
            </p>
          </div>
          <p className="text-white/20 text-[10px] leading-relaxed max-w-3xl">
            Training involves physical risk. Consult a licensed physician before beginning any exercise program. Results may vary.
            {(config.legal?.minors_policy ?? true) && " Athletes under 18 require parental consent."}
            {(config.legal?.media_consent_notice ?? true) && " Session photos or videos may be used for marketing purposes."}
          </p>
        </div>
      </div>
    </footer>
  )
}
