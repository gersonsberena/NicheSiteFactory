"use client"
import React, { useState, useCallback } from "react"
import type { CoachConfig } from "@/lib/useConfig"
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

const sectionMap = {
  hero: Hero,
  stats: StatsBar,
  about: About,
  services: Services,
  testimonials: Testimonials,
  gallery: Gallery,
  contact: Contact,
  success_stories: SuccessStories,
  faq: FAQ,
  video_gallery: VideoGallery,
} as const

type SectionKey = keyof typeof sectionMap

export default function LayoutD({ config }: { config: CoachConfig }) {
  const order = (config.section_order ?? [
    "hero", "stats", "testimonials", "about", "services",
    "success_stories", "video_gallery", "gallery", "faq", "contact",
  ]) as SectionKey[]

  const [toast, setToast] = useState(false)

  const handleCTA = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const showToast = useCallback(() => {
    setToast(true)
    setTimeout(() => setToast(false), 4000)
  }, [])

  return (
    <div className="layout-d">
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
            return <ContactSection key={key} config={config} onSuccess={showToast} />
          }
          const SectionComponent = Section as React.ComponentType<{ config: CoachConfig }>
          return <SectionComponent key={key} config={config} />
        })}
      </main>
      <Footer config={config} />
      <Toast show={toast} onDismiss={() => setToast(false)} />
    </div>
  )
}
