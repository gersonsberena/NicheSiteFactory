"use client"

import { useState } from "react"
import type { CoachConfig } from "@/lib/useConfig"

interface Props {
  config: CoachConfig
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function VideoGallery({ config }: Props) {
  const [playing, setPlaying] = useState(false)
  const videos = config.videos ?? []
  const featured = videos[0]

  if (!featured) return null

  const ytId = featured.youtube_url ? getYouTubeId(featured.youtube_url) : null
  const thumbUrl = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null

  return (
    <section id="video_gallery" className="bg-d-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-10 md:mb-14">
          <div className="d-label-caps text-d-amber mb-3">Watch the Work</div>
          <h2 className="font-[family-name:var(--font-playfair)] font-bold text-d-navy text-4xl md:text-5xl leading-[1.1]">
            {featured.title ?? "Coaching in Action."}
          </h2>
          {featured.description && (
            <p className="mt-4 text-d-ink/70 max-w-xl leading-relaxed">
              {featured.description}
            </p>
          )}
        </div>

        <div className="mx-auto max-w-3xl">
          {playing && ytId ? (
            <div className="relative aspect-video rounded-sm overflow-hidden shadow-xl">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                title={featured.title ?? "Coaching video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group relative w-full aspect-video rounded-sm overflow-hidden shadow-xl focus:outline-none cursor-pointer"
              aria-label={`Play video: ${featured.title ?? "Coaching video"}`}
            >
              {thumbUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={thumbUrl}
                  alt={featured.title ?? "Video thumbnail"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full d-portrait-bg" />
              )}
              <div className="absolute inset-0 bg-d-navy/40 group-hover:bg-d-navy/30 transition-colors" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-d-warmwhite/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-d-navy translate-x-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
