"use client"
import React, { useState, useCallback } from "react"
import type { CoachConfig } from "@/lib/useConfig"
import { isHexColor, hexToAccentVars } from "@/lib/accentVars"
import Nav from "./Nav"
import Hero from "./Hero"
import StatsBar from "./StatsBar"
import About from "./About"
import Services from "./Services"
import Packages from "./Packages"
import Testimonials from "./Testimonials"
import VideoGallery from "./VideoGallery"
import Gallery from "./Gallery"
import SuccessStories from "./SuccessStories"
import FAQ from "./FAQ"
import Contact from "./Contact"
import Footer from "./Footer"
import Toast from "./Toast"

const sectionMap = {
  hero: Hero,
  stats: StatsBar,
  about: About,
  services: Services,
  packages: Packages,
  testimonials: Testimonials,
  video_gallery: VideoGallery,
  gallery: Gallery,
  success_stories: SuccessStories,
  faq: FAQ,
  contact: Contact,
} as const

type SectionKey = keyof typeof sectionMap

export default function LayoutF({ config }: { config: CoachConfig }) {
  const order = (config.section_order ?? [
    "hero", "stats", "about", "services", "success_stories", "testimonials", "video_gallery", "gallery", "faq", "contact",
  ]) as SectionKey[]

  const [toast, setToast] = useState(false)

  const handleCTA = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const showToast = useCallback(() => {
    setToast(true)
    setTimeout(() => setToast(false), 4000)
  }, [])

  const rawFAccent = config.design?.f_accent_color ?? "teal"
  const fTheme = isHexColor(rawFAccent) ? "" : `f-theme-${rawFAccent}`
  const fAccentStyle = isHexColor(rawFAccent) ? hexToAccentVars(rawFAccent) : undefined
  const fBg    = `f-bg-${config.design?.f_bg_tone ?? "near-black"}`

  return (
    <div className={`layout-f ${fTheme} ${fBg}`} style={{ background: "var(--bg)", color: "var(--text)", ...fAccentStyle }}>
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
