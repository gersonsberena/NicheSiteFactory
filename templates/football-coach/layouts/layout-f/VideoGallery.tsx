import type { CoachConfig } from "@/lib/useConfig"
import Eyebrow from "./Eyebrow"

export default function VideoGallery({ config }: { config: CoachConfig }) {
  const videos = config.videos
  if (!videos?.length) return null

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <Eyebrow>Film Room</Eyebrow>
          <h2
            className="font-black leading-[0.92]"
            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "clamp(40px, 5vw, 64px)", textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--text)" }}
          >
            Training Footage
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {videos.map((v, i) => (
            <div key={i}>
              <div className="relative w-full" style={{ paddingBottom: "56.25%", background: "var(--bg2)", border: "1px solid rgba(var(--accent-rgb),0.15)" }}>
                <iframe src={v.youtube_url} title={v.title ?? `Video ${i + 1}`} allowFullScreen className="absolute inset-0 w-full h-full" style={{ border: "none" }} />
              </div>
              {v.title && <div className="mt-2 text-[13px]" style={{ color: "var(--text-muted)", fontFamily: "Barlow, sans-serif" }}>{v.title}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
