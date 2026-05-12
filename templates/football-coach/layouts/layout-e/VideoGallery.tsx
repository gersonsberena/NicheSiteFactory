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
    <section className="py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <div className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5" style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}>
            Film Room
          </div>
          <div className="h-px w-[60px] mb-6" style={{ background: "var(--accent)" }} />
          <h2
            className="font-extrabold text-[36px] md:text-[48px] leading-[1.05]"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em", color: "var(--text)" }}
          >
            Training Footage
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((v, i) => (
            <div key={i}>
              <div className="relative w-full" style={{ paddingBottom: "56.25%", background: "var(--bg2)", border: "1px solid rgba(var(--accent-rgb),0.2)" }}>
                <iframe
                  src={v.embedUrl!}
                  title={v.title ?? `Training video ${i + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: "none" }}
                />
              </div>
              {v.title && (
                <div className="mt-3 text-[13px] font-medium" style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
                  {v.title}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
