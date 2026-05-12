export default function PullQuote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <div className="my-10 px-8 md:px-16 py-8 relative" style={{ borderLeft: "3px solid var(--accent)" }}>
      <p className="text-[20px] md:text-[24px] italic leading-[1.5]"
        style={{ color: "rgba(255,255,255,0.8)", fontFamily: "DM Serif Display, serif" }}>
        &ldquo;{text}&rdquo;
      </p>
      {attribution && (
        <p className="mt-4 text-[12px] uppercase tracking-[0.2em]" style={{ color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}>
          — {attribution}
        </p>
      )}
    </div>
  )
}
