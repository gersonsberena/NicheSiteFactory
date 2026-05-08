import { Icons } from "@/lib/icons"
import type { CoachConfig, Video } from "@/lib/useConfig"

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

export default function VideoSection({ config }: { config: CoachConfig }) {
  const videos = (config.videos ?? []) as Video[]
  const video = videos[0]

  if (!video) return null

  const ytId = video.youtube_url ? getYouTubeId(video.youtube_url) : null
  const thumbUrl = ytId
    ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
    : null

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--b-primary-700)]">
            In Action
          </div>
          <h2 className="font-poppins font-extrabold text-3xl md:text-5xl mt-3 tracking-tight text-[#1A1A1A]">
            {video.title}
          </h2>
          {video.description && (
            <p className="mt-4 text-[#1A1A1A]/70">{video.description}</p>
          )}
        </div>

        <div className="mt-10 rounded-2xl overflow-hidden shadow-[var(--shadow-card)] border-t-4 border-[var(--b-primary-600)] bg-paper">
          {ytId ? (
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="aspect-video bg-[var(--b-primary-700)] relative grid place-items-center">
              {thumbUrl && (
                <img src={thumbUrl} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
              )}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,.12),transparent_60%)]" />
              <a
                href={video.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 w-20 h-20 rounded-full bg-white/95 hover:bg-white text-[var(--b-primary-700)] grid place-items-center shadow-[var(--shadow-card-hover)] transition-transform hover:scale-105"
              >
                <Icons.Play className="w-8 h-8 ml-1" />
              </a>
            </div>
          )}
          <div className="p-6 sm:p-7 bg-white">
            <h3 className="font-poppins font-semibold text-xl text-[#1A1A1A]">{video.title}</h3>
            {video.description && (
              <p className="text-[#1A1A1A]/65 mt-1 text-sm">{video.description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
