import type { CoachConfig, Video } from "@/lib/useConfig"

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)
  return match ? match[1] : null
}

export default function VideoSection({ config }: { config: CoachConfig }) {
  const videos = config.videos as Video[]
  if (!videos?.length) return null

  const filmLabel = config.copy_variants?.c_film_label ?? "Session 01 · Film Study"

  return (
    <section id="video_gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-12 reveal">
          <span className="c-label text-[#6B7280] block mb-4">{filmLabel}</span>
          <div className="c-rule-accent mb-6" />
          <h2 className="font-['Playfair_Display'] font-black text-4xl sm:text-5xl text-[#111827] leading-tight">
            See the Work in Action.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 reveal">
          {videos.map((video, i) => {
            const videoId = getYouTubeId(video.youtube_url)
            return (
              <div key={i}>
                <div className="border-4 border-[var(--accent)] overflow-hidden aspect-video bg-[#F3F4F6]">
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#9CA3AF] c-label text-xs">
                      Video unavailable
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-['Playfair_Display'] font-bold text-lg text-[#111827]">{video.title}</h3>
                  {video.description && (
                    <p className="mt-1 text-sm text-[#6B7280]">{video.description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
