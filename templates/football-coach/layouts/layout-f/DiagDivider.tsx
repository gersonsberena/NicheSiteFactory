export default function DiagDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className="relative h-12 overflow-hidden" style={{ background: "var(--bg)" }}>
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ transform: flip ? "scaleY(-1)" : "none" }}
      >
        <polygon points="0,0 1440,48 1440,0" fill="var(--bg2)" />
      </svg>
    </div>
  )
}
