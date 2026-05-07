"use client"
import { useState, useCallback } from "react"
import { useReveal } from "@/lib/hooks"
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

const sectionMap = {
  hero: Hero,
  stats: StatsBar,
  about: About,
  services: Services,
  testimonials: Testimonials,
  gallery: Gallery,
  contact: Contact,
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

  return (
    <>
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
    </>
  )
}
