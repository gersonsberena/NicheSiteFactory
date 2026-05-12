import type { CoachConfig } from "@/lib/useConfig"

export default function VideoGallery({ config }: { config: CoachConfig }) {
  const { videos } = config
  if (!videos?.length) return null
  return (
    <section id="videos" className="py-20 md:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent)", fontFamily: "Source Sans 3, sans-serif" }}>Chapter VII</div>
        <h2 className="font-bold mb-10" style={{ fontFamily: "Playfair Display, serif", color: "var(--text)", fontSize: "clamp(32px,4vw,52px)" }}>Training Footage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((v, i) => (
            <div key={i} className="relative overflow-hidden" style={{ paddingBottom: "56.25%", background: "rgba(var(--accent-rgb),0.05)" }}>
              <iframe src={v.youtube_url} title={v.title ?? `Video ${i + 1}`} className="absolute inset-0 w-full h-full" allowFullScreen />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
