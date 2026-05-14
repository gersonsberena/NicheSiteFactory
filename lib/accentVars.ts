import type React from "react"

export function isHexColor(value: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(value)
}

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

function toHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")
}

function lighten(r: number, g: number, b: number, a: number): string {
  return toHex(
    Math.min(255, Math.round(r + (255 - r) * a)),
    Math.min(255, Math.round(g + (255 - g) * a)),
    Math.min(255, Math.round(b + (255 - b) * a)),
  )
}

function darken(r: number, g: number, b: number, a: number): string {
  return toHex(
    Math.max(0, Math.round(r * (1 - a))),
    Math.max(0, Math.round(g * (1 - a))),
    Math.max(0, Math.round(b * (1 - a))),
  )
}

// For layouts A, C, E, F, G, H, I, K, L, M (all use --accent / --accent-hi / --accent-dim / --accent-rgb)
export function hexToAccentVars(hex: string): React.CSSProperties {
  const [r, g, b] = hexToRgb(hex)
  return {
    "--accent": hex,
    "--accent-hi": lighten(r, g, b, 0.2),
    "--accent-dim": darken(r, g, b, 0.25),
    "--accent-rgb": `${r},${g},${b}`,
  } as React.CSSProperties
}

// For layout D (uses --color-d-amber / --color-d-amberlight / --color-d-amber-rgb)
export function hexToDAccentVars(hex: string): React.CSSProperties {
  const [r, g, b] = hexToRgb(hex)
  return {
    "--color-d-amber": hex,
    "--color-d-amberlight": lighten(r, g, b, 0.15),
    "--color-d-amber-rgb": `${r},${g},${b}`,
  } as React.CSSProperties
}

// Named color → hex mapping for the admin color picker preview
export const NAMED_TO_HEX: Record<string, string> = {
  gold: "#F59E0B", red: "#EF4444", navy: "#3B82F6", green: "#10B981",
  purple: "#A855F7", teal: "#14B8A6", pink: "#EC4899", orange: "#F97316",
  cyan: "#06B6D4", lime: "#84CC16", amber: "#FBBF24", crimson: "#DC2626",
  silver: "#94A3B8", white: "#F1F5F9",
  "navy-dark": "#1E3A5F", rust: "#C0392B", forest: "#27AE60", burgundy: "#7D2A3A",
  blue: "#3B82F6", platinum: "#E5E4E2", slate: "#475569",
}
