import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
}

export default function Footer({ config }: Props) {
  const { name, city, county } = config.about ?? {}
  const { phone, email, instagram, twitter, youtube } = config.contact ?? {}

  const socials: { label: string; href: string | null | undefined }[] = [
    { label: "IG", href: instagram ? `https://instagram.com/${instagram.replace("@", "")}` : null },
    { label: "YT", href: youtube ?? null },
    { label: "TW", href: twitter ? `https://twitter.com/${twitter.replace("@", "")}` : null },
  ].filter((s) => s.href)

  return (
    <footer className="bg-d-cream border-t d-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="font-[family-name:var(--font-playfair)] text-d-navy text-3xl">
              {name ?? "Coach"}
            </div>
            <p className="mt-4 text-d-ink/70 max-w-sm leading-relaxed">
              Private coaching for athletes who want the slow road — and the families who&apos;ll walk it with them.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="d-label-caps text-d-navy mb-4">Explore</div>
            <ul className="space-y-2.5 text-d-ink/70">
              {[
                ["Story", "#about"],
                ["Services", "#services"],
                ["Results", "#success_stories"],
                ["FAQ", "#faq"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="d-underline-grow pb-0.5">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="d-label-caps text-d-navy mb-4">Find Me</div>
            {socials.length > 0 && (
              <div className="flex gap-3 mb-5">
                {socials.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-d-navy/30 flex items-center justify-center d-label-caps text-d-navy hover:bg-d-navy hover:text-d-warmwhite transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
            <div className="text-sm text-d-ink/60 leading-relaxed">
              {city && county ? `${city}, FL · ${county} County` : city ?? ""}
              {phone && (
                <>
                  <br />
                  {phone}
                </>
              )}
              {email && (
                <>
                  <br />
                  <a href={`mailto:${email}`} className="hover:text-d-navy transition-colors">
                    {email}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t d-hairline flex flex-col md:flex-row justify-between gap-4 text-xs text-d-ink/50">
          <div>© {new Date().getFullYear()} {name ?? "Coach"}. All rights reserved.</div>
          <div className="italic">
            Results may vary. Consult a physician before beginning any exercise program.
          </div>
        </div>
      </div>
    </footer>
  )
}
