"use client"

interface Props {
  show: boolean
  onDismiss: () => void
}

export default function Toast({ show, onDismiss }: Props) {
  if (!show) return null
  return (
    <div
      role="alert"
      className="fixed bottom-6 right-6 z-50 max-w-sm bg-d-warmwhite border border-d-navy/20 shadow-lg px-6 py-4 rounded-sm"
    >
      <div className="d-label-caps text-d-amber mb-1">Message Received</div>
      <p className="font-[family-name:var(--font-playfair)] italic text-d-navy">
        Thank you. I&apos;ll be in touch within 48 hours.
      </p>
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 text-d-ink/40 hover:text-d-ink text-lg leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  )
}
