"use client"
import { useState, useCallback } from "react"
import { useReveal } from "@/lib/hooks"
import type { CoachConfig } from "@/lib/useConfig"
import { isHexColor, hexToAccentVars } from "@/lib/accentVars"
import Nav from "./Nav"
import Hero from "./Hero"
import StatsBar from "./StatsBar"
import About from "./About"
import Services from "./Services"
import Testimonials from "./Testimonials"
import Gallery from "./Gallery"
import Contact from "./Contact"
import Footer from "./Footer"
import Toast from "./Toast"
import SuccessStories from "./SuccessStories"
import FAQ from "./FAQ"
import VideoGallery from "./VideoGallery"
import CoachProfile from "./CoachProfile"
import Availability from "./Availability"
import TrainingLocations from "./TrainingLocations"
import Packages from "./Packages"
import FloatingCTA from "@/components/FloatingCTA"

const sectionMap = {
  hero: Hero,
  stats: StatsBar,
  about: About,
  coach_profile: CoachProfile,
  services: Services,
  packages: Packages,
  availability: Availability,
  training_locations: TrainingLocations,
  testimonials: Testimonials,
  gallery: Gallery,
  contact: Contact,
  success_stories: SuccessStories,
  faq: FAQ,
  video_gallery: VideoGallery,
} as const

type SectionKey = keyof typeof sectionMap

export default function LayoutA({ config }: { config: CoachConfig }) {
  const order = config.section_order as SectionKey[]
  const [toast, setToast] = useState(false)

  useReveal()

  const handleCTA = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleDismissToast = useCallback(() => setToast(false), [])

  const rawAccent = config.design?.accent_color ?? "gold"
  const themeClass = isHexColor(rawAccent) ? "" : `theme-${rawAccent}`
  const accentStyle = isHexColor(rawAccent) ? hexToAccentVars(rawAccent) : undefined
  const bgClass = `bg-tone-${config.design?.background_tone ?? "pure-black"}`

  return (
    <div className={`${themeClass} ${bgClass}`} style={accentStyle}>
      <Nav config={config} onCTA={handleCTA} />
      <main>
        {order.map((key) => {
          const Section = sectionMap[key]
          if (!Section) return null
          if (key === "hero") {
            const HeroSection = Section as typeof Hero
            return <HeroSection key={key} config={config} onCTA={handleCTA} />
          }
          return <Section key={key} config={config} />
        })}
      </main>
      <Footer config={config} />
      <Toast show={toast} onDismiss={handleDismissToast} />
      <FloatingCTA config={config} />
    </div>
  )
}
