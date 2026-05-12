export default function Blob({ x, y, size, color }: { x: string; y: string; size: number; color: string }) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left: x, top: y,
        width: size, height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(80px)",
        opacity: 0.15,
        transform: "translate(-50%,-50%)",
      }}
    />
  )
}
