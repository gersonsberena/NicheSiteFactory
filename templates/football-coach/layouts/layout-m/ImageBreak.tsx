import type { CoachConfig } from "@/lib/useConfig"

export default function ImageBreak({ src, caption }: { src: string; caption?: string }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "320px" }}>
      <img src={src} alt={caption ?? ""} className="w-full h-full object-cover" style={{ filter: "brightness(0.6)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,11,9,0.6) 0%, transparent 40%, transparent 60%, rgba(13,11,9,0.6) 100%)" }} />
      {caption && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-6">
          <p className="text-[13px] italic" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "DM Sans, sans-serif", letterSpacing: "0.05em" }}>{caption}</p>
        </div>
      )}
    </div>
  )
}
