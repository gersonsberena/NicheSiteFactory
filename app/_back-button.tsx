"use client"
import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-oswald uppercase tracking-[0.18em] transition mb-10"
    >
      ← Back
    </button>
  )
}
