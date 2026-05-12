import type { CoachConfig } from "@/lib/useConfig"

export default function VideoGallery({ config }: { config: CoachConfig }) {
  const videos = config.videos
  if (!videos?.length) return null
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <h2 className="font-bold text-[36px] md:text-[44px] mb-3 leading-tight" style={{ fontFamily: "Roboto Slab, serif", color: "var(--accent)", letterSpacing: "-0.02em" }}>Training Footage</h2>
        <div className="h-[2px] w-16 mb-12" style={{ background: "var(--accent)" }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((v, i) => (
            <div key={i}>
              <div className="relative w-full" style={{ paddingBottom: "56.25%", background: "var(--bg2)", border: "1px solid rgba(var(--accent-rgb),0.15)" }}>
                <iframe src={v.youtube_url} title={v.title ?? `Video ${i + 1}`} allowFullScreen className="absolute inset-0 w-full h-full" style={{ border: "none" }} />
              </div>
              {v.title && <div className="mt-2 text-[13px]" style={{ color: "var(--text-muted)", fontFamily: "Roboto, sans-serif" }}>{v.title}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
