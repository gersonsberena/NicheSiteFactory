"use client"
import type { CoachConfig, Video } from "@/lib/useConfig"

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (!match) return null
  return `https://www.youtube.com/embed/${match[1]}`
}

export default function VideoGallery({ config }: { config: CoachConfig }) {
  const videos = config.videos as Video[] | undefined
  if (!videos?.length) return null

  const validVideos = videos.map((v) => ({ ...v, embedUrl: getYouTubeEmbedUrl(v.youtube_url) })).filter((v) => v.embedUrl)
  if (!validVideos.length) return null

  return (
    <section id="video_gallery" className="relative bg-smoke py-24 sm:py-32 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[rgba(var(--accent-rgb),0.06)] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 text-[var(--accent)] mb-5">
            <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
            <span className="font-oswald uppercase tracking-[0.3em] text-xs sm:text-sm opacity-90">Watch & Learn</span>
            <span className="inline-block h-[2px] w-10 bg-[var(--accent)]" />
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight">
            <span className="text-white">VIDEO </span>
            <span className="accent-grad">GALLERY</span>
          </h2>
        </div>

        <div className={`grid gap-8 reveal ${validVideos.length === 1 ? "max-w-3xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {validVideos.map((video, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="relative w-full aspect-video bg-ink border border-white/5 overflow-hidden">
                <iframe
                  src={video.embedUrl!}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div>
                <div className="font-bebas text-xl tracking-wide text-white leading-tight">{video.title}</div>
                {video.description && (
                  <p className="mt-1 text-white/55 text-sm leading-relaxed">{video.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
