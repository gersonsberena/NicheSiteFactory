import baseConfig from "@/templates/football-coach/base.config.json"
import BackButton from "@/app/_back-button"

export const metadata = {
  title: "Terms & Conditions",
}

export default function TermsPage() {
  const bgClass = `bg-tone-${baseConfig.design?.background_tone ?? "pure-black"}`
  return (
    <div className={`min-h-screen ${bgClass} text-white px-5 sm:px-8 py-20`}>
      <div className="max-w-3xl mx-auto">
        <BackButton />
        <h1 className="font-bebas text-5xl tracking-tight mb-4">Terms &amp; Conditions</h1>
        <p className="text-white/50 text-sm mb-6">Last updated: {new Date().getFullYear()}</p>

        <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 mb-10">
          <p className="text-sm text-white/60">
            <span className="text-white font-semibold">Placeholder terms.</span>{" "}
            Upon onboarding, this page will be customized with the coach&apos;s specific session policies,
            cancellation terms, waivers, and payment details.
          </p>
        </div>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Agreement to Terms</h2>
            <p>
              By accessing this website and booking training sessions, you agree to be bound by these Terms &amp; Conditions.
              If you do not agree, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Assumption of Risk</h2>
            <p>
              Training and athletic activities are inherently risky. You acknowledge that participation in physical training
              may result in injury, and you voluntarily assume all risks associated with participation. The coach and
              any affiliated business are not liable for injuries, accidents, or adverse outcomes resulting from
              training sessions.
            </p>
          </section>

          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Medical Clearance</h2>
            <p>
              Content on this site is not medical advice. You are responsible for obtaining medical clearance from
              a licensed physician before beginning any training program. Results may vary and are not guaranteed.
            </p>
          </section>

          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Parental Consent</h2>
            <p>
              Athletes under 18 years of age must have a parent or legal guardian sign a written consent and waiver
              form before any sessions begin. The coach reserves the right to refuse service if proper consent is
              not on file.
            </p>
          </section>

          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Photo &amp; Video Release</h2>
            <p>
              By participating in training sessions, you grant permission for photos and videos taken during sessions
              to be used for promotional, educational, or marketing purposes. If you wish to opt out, notify the coach
              in writing before your first session.
            </p>
          </section>

          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Session Policies</h2>
            <p>
              Cancellation, rescheduling, and refund policies will be provided in your session agreement at the time
              of booking. These terms are specific to the coach and are customized upon onboarding.
            </p>
          </section>

          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Limitation of Liability</h2>
            <p>
              In no event shall the coach or any affiliated business be liable for any indirect, incidental, or
              consequential damages arising out of the use of this website or participation in training sessions.
              Total liability is limited to the amount paid for the session in question.
            </p>
          </section>

          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the State of Florida.
              Any disputes shall be subject to the exclusive jurisdiction of the courts in the county where
              training services are provided.
            </p>
          </section>

          <section>
            <h2 className="font-oswald uppercase tracking-[0.2em] text-white text-lg mb-3">Contact</h2>
            <p>
              Questions about these Terms &amp; Conditions may be directed to the coach via the contact form on
              the homepage.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
