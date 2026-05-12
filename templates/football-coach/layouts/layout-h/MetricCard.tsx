export default function MetricCard({ value, label, delta }: { value: string; label: string; delta?: string }) {
  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid rgba(var(--accent-rgb),0.15)", padding: "28px 24px" }}>
      <div className="text-[40px] font-bold leading-none mb-2" style={{ fontFamily: "DM Mono, monospace", color: "var(--accent)" }}>{value}</div>
      {delta && (
        <div className="text-[11px] font-semibold mb-3 px-2 py-0.5 inline-block" style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>↑ {delta}</div>
      )}
      <div className="text-[13px] font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>{label}</div>
    </div>
  )
}
