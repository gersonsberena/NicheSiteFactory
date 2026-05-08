import type { SVGProps } from "react"

type P = SVGProps<SVGSVGElement>

export const Icons = {
  Menu: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Close: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  Arrow: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Helmet: (p: P) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M10 28c0-9 7-16 16-16s14 6 14 13v5h-4l-2 6H14l-2-6h-2z" />
      <path d="M14 28h22" />
      <circle cx="14" cy="32" r="2" fill="currentColor" />
    </svg>
  ),
  Lightning: (p: P) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M26 4L10 28h10l-4 16 18-26H22l4-14z" />
    </svg>
  ),
  Trophy: (p: P) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 6h20v10a10 10 0 01-20 0V6z" />
      <path d="M14 10H8a4 4 0 004 6M34 10h6a4 4 0 01-4 6" />
      <path d="M20 26v6h8v-6M16 38h16" />
    </svg>
  ),
  Phone: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
    </svg>
  ),
  Mail: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 4h16v16H4z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  Pin: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Instagram: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  XSocial: (p: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M17.5 3h3l-7.4 8.5L22 21h-6.4l-5-6.6L4.8 21H1.7l7.9-9L1.5 3h6.6l4.5 6 5-6zm-1.1 16h1.7L7.7 5H5.9l10.5 14z" />
    </svg>
  ),
  Youtube: (p: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M23 7.2s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.2-1C16.6 3.5 12 3.5 12 3.5s-4.6 0-7.9.4c-.4.1-1.4.1-2.2 1C1.2 5.6 1 7.2 1 7.2S.8 9.1.8 11v1.7c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.7.4 7.7.4s4.6 0 7.9-.4c.4-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 14.6V8.3l6 3.2-6 3.1z" />
    </svg>
  ),
  Quote: (p: P) => (
    <svg viewBox="0 0 48 48" fill="currentColor" {...p}>
      <path d="M14 10c-5 2-8 7-8 14v14h14V24h-7c0-5 2-8 6-10l-5-4zm20 0c-5 2-8 7-8 14v14h14V24h-7c0-5 2-8 6-10l-5-4z" />
    </svg>
  ),
  Star: (p: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z" />
    </svg>
  ),
  Check: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),
  Chevron: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Play: (p: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  ),
  Facebook: (p: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M13 22v-8h3l1-4h-4V7.5c0-1.2.4-2 2-2h2V2.2A26 26 0 0 0 14 2c-3 0-5 1.8-5 5v3H6v4h3v8h4Z" />
    </svg>
  ),
  Baseball: (p: P) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="24" cy="24" r="18" />
      <path d="M15 10c2 4 2 10 0 16s-2 12 0 16" />
      <path d="M33 10c-2 4-2 10 0 16s2 12 0 16" />
      <path d="M12 18h4M12 24h4M12 30h4M32 18h4M32 24h4M32 30h4" />
    </svg>
  ),
}
