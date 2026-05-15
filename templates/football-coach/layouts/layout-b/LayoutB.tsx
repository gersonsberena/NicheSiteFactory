"use client"
import { useState, useCallback } from "react"
import type { CoachConfig } from "@/lib/useConfig"
import Nav from "./Nav"
import Hero from "./Hero"
import Stats from "./Stats"
import About from "./About"
import Services from "./Services"
import SuccessStories from "./SuccessStories"
import Testimonials from "./Testimonials"
import VideoSection from "./VideoSection"
import Gallery from "./Gallery"
import FAQ from "./FAQ"
import Contact from "./Contact"
import Footer from "./Footer"
import CoachProfile from "./CoachProfile"
import Availability from "./Availability"
import TrainingLocations from "./TrainingLocations"
import FloatingCTA from "@/components/FloatingCTA"

const sectionMap = {
  hero: Hero,
  stats: Stats,
  about: About,
  coach_profile: CoachProfile,
  services: Services,
  availability: Availability,
  training_locations: TrainingLocations,
  success_stories: SuccessStories,
  testimonials: Testimonials,
  video_gallery: VideoSection,
  gallery: Gallery,
  faq: FAQ,
  contact: Contact,
} as const

type SectionKey = keyof typeof sectionMap

const ACCENT_TO_PALETTE: Record<string, string> = {
  gold:   "forest-amber",
  green:  "forest-amber",
  navy:   "navy-gold",
  teal:   "teal-gold",
  red:    "red-gold",
  purple: "purple-gold",
  pink:   "burgundy-gold",
}

export default function LayoutB({ config }: { config: CoachConfig }) {
  const order = (config.section_order ?? Object.keys(sectionMap)) as SectionKey[]
  const [contactSignal, setContactSignal] = useState(0)

  const handleCTA = useCallback(() => {
    setContactSignal((s) => s + 1)
  }, [])

  const palette =
    config.design?.b_palette ??
    ACCENT_TO_PALETTE[config.design?.accent_color ?? ""] ??
    "forest-amber"

  return (
    <div className={`layout-b bg-white text-[#1A1A1A] b-palette-${palette}`}>
      <Nav config={config} onCTA={handleCTA} />
      <main>
        {order.map((key) => {
          const Section = sectionMap[key]
          if (!Section) return null
          if (key === "hero") {
            const HeroSection = Section as typeof Hero
            return <HeroSection key={key} config={config} onCTA={handleCTA} />
          }
          if (key === "contact") {
            const ContactSection = Section as typeof Contact
            return <ContactSection key={key} config={config} openSignal={contactSignal} />
          }
          return <Section key={key} config={config} />
        })}
      </main>
      <Footer config={config} />
      <FloatingCTA config={config} />
    </div>
  )
}
