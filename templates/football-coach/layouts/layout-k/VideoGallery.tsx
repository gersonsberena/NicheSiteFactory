import type { CoachConfig } from "@/lib/useConfig"

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (!match) return null
  return `https://www.youtube.com/embed/${match[1]}`
}

export default function VideoGallery({ config }: { config: CoachConfig }) {
  const raw = config.videos
  if (!raw?.length) return null
  const videos = raw.map((v) => ({ ...v, embedUrl: getYouTubeEmbedUrl(v.youtube_url) })).filter((v) => v.embedUrl)
  if (!videos.length) return null
  return (
    <section id="videos" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="absolute right-8 top-8 select-none pointer-events-none text-[160px] font-bold leading-none" style={{ color: "rgba(var(--accent-rgb),0.04)", fontFamily: "Space Grotesk, sans-serif" }}>06</div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-2" style={{ color: "rgba(var(--accent-rgb),0.7)", fontFamily: "Space Grotesk, sans-serif" }}>
          <div className="w-1 h-1" style={{ background: "var(--accent)" }} /> Footage
        </div>
        <h2 className="font-bold mb-10" style={{ fontFamily: "Space Grotesk, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>Training Film</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((v, i) => (
            <div key={i} className="relative overflow-hidden" style={{ paddingBottom: "56.25%", background: "rgba(var(--accent-rgb),0.05)" }}>
              <iframe src={v.embedUrl!} title={v.title ?? `Video ${i + 1}`} className="absolute inset-0 w-full h-full" allowFullScreen />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
