import type { CoachConfig, Service } from "@/lib/useConfig"
import { Icons } from "@/lib/icons"

export default function Services({ config }: { config: CoachConfig }) {
  const layout = config.design?.c_services_layout ?? "numbered-rows"
  const services = config.services as Service[]

  return (
    <section id="services" className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-12 reveal">
          <span className="c-label text-[#6B7280] block mb-4">What We Offer</span>
          <div className="c-rule-accent mb-6" />
          <h2 className="font-['Playfair_Display'] font-black text-4xl sm:text-5xl text-[#111827] leading-tight">
            {config.copy_variants?.services_tagline ?? "Training That Delivers."}
          </h2>
          {config.copy_variants?.services_subline && (
            <p className="mt-4 text-[#6B7280] max-w-2xl">{config.copy_variants.services_subline}</p>
          )}
        </div>

        {layout === "card-grid" ? (
          <ServicesCardGrid services={services} />
        ) : (
          <ServicesNumberedRows services={services} />
        )}
      </div>
    </section>
  )
}

function ServicesNumberedRows({ services }: { services: Service[] }) {
  return (
    <div className="border-t border-[#E5E7EB] reveal">
      {services.map((svc, i) => (
        <div
          key={i}
          className="group grid grid-cols-12 gap-4 md:gap-8 py-8 border-b border-[#E5E7EB] items-start hover:bg-[rgba(var(--accent-rgb),0.02)] transition-colors"
        >
          <div className="col-span-2 md:col-span-1">
            <span className="c-svc-number font-['Playfair_Display'] font-black text-3xl">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="col-span-10 md:col-span-8">
            <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#111827] mb-2 group-hover:text-[var(--accent)] transition-colors">
              {svc.title}
            </h3>
            <p className="text-[#6B7280] leading-relaxed">{svc.description}</p>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:flex-col md:items-end gap-4">
            {svc.price && (
              <span className="font-semibold text-[#111827]">{svc.price}</span>
            )}
            <a href="#contact" className="c-text-link text-sm font-semibold text-[var(--accent)] inline-flex items-center gap-1">
              Inquire <Icons.Arrow className="w-3 h-3" />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

function ServicesCardGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 reveal">
      {services.map((svc, i) => (
        <div key={i} className="border border-[#E5E7EB] p-8 hover:border-[var(--accent)] transition-colors group">
          <div className="c-svc-number font-['Playfair_Display'] font-black text-4xl mb-6">
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#111827] mb-3 group-hover:text-[var(--accent)] transition-colors">
            {svc.title}
          </h3>
          <p className="text-[#6B7280] leading-relaxed mb-6">{svc.description}</p>
          <div className="flex items-center justify-between">
            {svc.price && <span className="font-semibold text-[#111827]">{svc.price}</span>}
            <a href="#contact" className="c-text-link text-sm font-semibold text-[var(--accent)]">
              Inquire →
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
