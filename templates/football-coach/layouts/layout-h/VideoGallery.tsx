import type { CoachConfig } from "@/lib/useConfig"

export default function VideoGallery({ config }: { config: CoachConfig }) {
  const { videos } = config
  if (!videos?.length) return null
  return (
    <section id="videos" className="py-20 md:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3" style={{ color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>
          <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
          Film Room
        </div>
        <h2 className="font-bold mb-3" style={{ fontFamily: "DM Sans, sans-serif", color: "var(--text)", fontSize: "clamp(28px,4vw,44px)" }}>Training Footage</h2>
        <div className="h-px mb-12 max-w-[60px]" style={{ background: "var(--accent)" }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((v, i) => (
            <div key={i} className="relative overflow-hidden" style={{ paddingBottom: "56.25%", background: "var(--bg-card)" }}>
              <iframe src={v.youtube_url} title={v.title ?? `Video ${i + 1}`} className="absolute inset-0 w-full h-full" allowFullScreen />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
