import type { CoachConfig } from "@/lib/useConfig"

export default function VideoGallery({ config }: { config: CoachConfig }) {
  const vids = config.videos
  if (!vids?.length) return null
  return (
    <section id="video-gallery" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.2)", color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
          Film Room
        </div>
        <h2 className="font-bold mb-10" style={{ fontFamily: "DM Sans, sans-serif", color: "white", fontSize: "clamp(28px,4vw,48px)" }}>
          Training Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vids.map((v, i) => (
            <div key={i} className="rounded-xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ position: "relative", paddingBottom: "56.25%" }}>
                <iframe
                  src={v.youtube_url}
                  title={v.title ?? `Video ${i + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
              {v.title && (
                <div className="px-5 py-4">
                  <div className="text-[13px] font-semibold" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "DM Sans, sans-serif" }}>{v.title}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
