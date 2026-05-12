export default function Ornament() {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="h-px flex-1 max-w-[80px]" style={{ background: "rgba(var(--accent-rgb),0.3)" }} />
      <span className="text-[14px]" style={{ color: "var(--accent)", fontFamily: "Playfair Display, serif" }}>§</span>
      <div className="h-px flex-1 max-w-[80px]" style={{ background: "rgba(var(--accent-rgb),0.3)" }} />
    </div>
  )
}
