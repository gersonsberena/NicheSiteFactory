import baseConfig from "@/templates/football-coach/base.config.json"
import BackButton from "@/app/_back-button"

export const metadata = {
  title: "Privacy Policy",
}

export default function PrivacyPage() {
  const bgClass = `bg-tone-${baseConfig.design?.background_tone ?? "pure-black"}`
  return (
    <div className={`min-h-screen ${bgClass} text-white px-5 sm:px-8 py-20`}>
      <div className="max-w-3xl mx-auto">
        <BackButton />
        <h1 className="font-bebas text-5xl tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-white/50 text-sm mb-6">Last updated: {new Date().getFullYear()}</p>

        <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 mb-10">
          <p className="text-sm text-white/60">
            <span className="text-white font-semibold">Placeholder policy.</span>{" "}
            Upon onboarding, this page will be customized with the coach&apos;s specific data practices,
            third-party tools, and contact details.
          </p>
        </div>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Overview</h2>
            <p>
              This privacy policy describes how this website collects and uses information submitted through its contact form.
              This site is operated by the coach listed on the homepage.
            </p>
          </section>

          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Information Collected</h2>
            <p>
              When you submit the contact form, we collect your name, email address, and message. This information is used
              solely to respond to your inquiry. It is not sold, shared, or used for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Third-Party Services</h2>
            <p>
              This site uses Formspree to process contact form submissions. Submitted data is transmitted to Formspree&apos;s
              servers and is subject to their privacy policy at{" "}
              <a href="https://formspree.io/legal/privacy-policy" className="text-white underline" target="_blank" rel="noopener noreferrer">
                formspree.io
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Fitness Disclaimer</h2>
            <p>
              Results may vary. Content on this site is for informational purposes only and does not constitute medical advice.
              Consult a licensed physician before beginning any exercise program.
            </p>
          </section>

          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Contact</h2>
            <p>
              Questions about this privacy policy may be directed to the coach via the contact form on the homepage.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
