export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-px" style={{ background: "var(--accent)" }} />
      <span
        className="text-[11px] font-bold tracking-[0.28em] uppercase"
        style={{ color: "var(--accent)", fontFamily: "Barlow Condensed, sans-serif" }}
      >
        {children}
      </span>
    </div>
  )
}
