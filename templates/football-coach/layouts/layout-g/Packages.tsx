import type { CoachConfig } from "@/lib/useConfig"

export default function Packages({ config }: { config: CoachConfig }) {
  const { packages } = config
  if (!packages?.length) return null
  return (
    <section id="packages" className="py-20 md:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <h2 className="font-bold text-[36px] md:text-[44px] mb-3 leading-tight" style={{ fontFamily: "Roboto Slab, serif", color: "var(--accent)", letterSpacing: "-0.02em" }}>Training Packages</h2>
        <div className="h-[2px] w-16 mb-12" style={{ background: "var(--accent)" }} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div key={i} style={{ background: "var(--bg)", border: pkg.highlight ? "1px solid rgba(var(--accent-rgb),0.5)" : "1px solid rgba(var(--accent-rgb),0.15)", padding: "28px 24px", borderTop: pkg.highlight ? "3px solid var(--accent)" : undefined }}>
              {pkg.highlight && <div className="text-[10px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "var(--accent)", fontFamily: "Roboto, sans-serif" }}>Popular</div>}
              <h3 className="font-bold text-[20px] mb-2" style={{ fontFamily: "Roboto Slab, serif", color: "var(--text)" }}>{pkg.title}</h3>
              {pkg.duration && <div className="text-[12px] font-semibold mb-4" style={{ color: "var(--accent)", fontFamily: "Roboto, sans-serif" }}>{pkg.duration}</div>}
              <p className="text-[14px] leading-[1.7]" style={{ color: "var(--text-muted)", fontFamily: "Roboto, sans-serif" }}>{pkg.description}</p>
              {pkg.price && <div className="mt-4 font-bold text-[24px]" style={{ fontFamily: "Roboto Slab, serif", color: "var(--text)" }}>{pkg.price}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
