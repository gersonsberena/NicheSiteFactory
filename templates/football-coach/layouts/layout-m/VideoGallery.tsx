import type { CoachConfig } from "@/lib/useConfig"

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (!match) return null
  return `https://www.youtube.com/embed/${match[1]}`
}

export default function VideoGallery({ config }: { config: CoachConfig }) {
  const raw = config.videos
  if (!raw?.length) return null
  const vids = raw.map((v) => ({ ...v, embedUrl: getYouTubeEmbedUrl(v.youtube_url) })).filter((v) => v.embedUrl)
  if (!vids.length) return null
  return (
    <section id="video-gallery" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>07 — Film Room</div>
        <h2 className="font-bold mb-10" style={{ fontFamily: "DM Serif Display, serif", color: "white", fontSize: "clamp(28px,4vw,52px)" }}>
          Training Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vids.map((v, i) => (
            <div key={i} style={{ border: "1px solid rgba(var(--accent-rgb),0.1)" }}>
              <div style={{ position: "relative", paddingBottom: "56.25%" }}>
                <iframe
                  src={v.embedUrl!}
                  title={v.title ?? `Video ${i + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
              {v.title && (
                <div className="px-5 py-4" style={{ borderTop: "1px solid rgba(var(--accent-rgb),0.1)" }}>
                  <div className="text-[13px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "DM Sans, sans-serif" }}>{v.title}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
