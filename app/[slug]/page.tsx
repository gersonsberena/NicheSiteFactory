import type { Metadata } from "next"
import type React from "react"
import { getConfig } from "@/lib/useConfig"
import LayoutA from "@/templates/football-coach/layouts/layout-a/LayoutA"
import LayoutB from "@/templates/football-coach/layouts/layout-b/LayoutB"
import LayoutC from "@/templates/football-coach/layouts/layout-c/LayoutC"
import LayoutD from "@/templates/football-coach/layouts/layout-d/LayoutD"
import LayoutE from "@/templates/football-coach/layouts/layout-e/LayoutE"
import LayoutF from "@/templates/football-coach/layouts/layout-f/LayoutF"
import LayoutG from "@/templates/football-coach/layouts/layout-g/LayoutG"
import LayoutH from "@/templates/football-coach/layouts/layout-h/LayoutH"
import LayoutI from "@/templates/football-coach/layouts/layout-i/LayoutI"
import LayoutK from "@/templates/football-coach/layouts/layout-k/LayoutK"
import LayoutL from "@/templates/football-coach/layouts/layout-l/LayoutL"
import LayoutM from "@/templates/football-coach/layouts/layout-m/LayoutM"
import DemoCTA from "@/app/_demo-cta"

const BANNER_H = 58

function DemoBanner({ name }: { name: string }) {
  return (
    <div
      style={{ zIndex: 9999, height: BANNER_H }}
      className="fixed top-0 left-0 right-0 bg-zinc-900 border-b border-zinc-700 px-4 flex flex-col items-center justify-center text-center"
    >
      <p className="text-xs text-zinc-300">
        <span className="text-yellow-400 font-bold tracking-wide">DEMO SITE</span>
        <span className="text-zinc-600 mx-2">·</span>
        Built for <span className="text-white font-medium">{name}</span>
      </p>
      <p className="text-[10px] text-zinc-500 mt-0.5">
        Photos, bio, branding &amp; colors are placeholders — everything is customized to reflect your brand after onboarding.
      </p>
      <p className="text-[10px] text-zinc-400 mt-0.5">
        Interested? Contact Gerson:
        <span className="text-yellow-400 mx-1">gerson.s.berena@gmail.com</span>
        <span className="text-zinc-600 mx-1">·</span>
        <span className="text-yellow-400">651-955-9126</span>
      </p>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getConfig(slug)
  const faviconUrl = config.meta.favicon_url
  return {
    title: config.meta.title,
    description: config.meta.description,
    ...(faviconUrl ? { icons: { icon: faviconUrl } } : {}),
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getConfig(slug)

  const overlay = (
    <>
      <DemoBanner name={config.about?.name ?? "Coach"} />
      <DemoCTA />
    </>
  )

  const wrapperStyle = { "--demo-banner-h": `${BANNER_H}px` } as React.CSSProperties
  if (config.layout === "B") return <div style={wrapperStyle}>{overlay}<div style={{ paddingTop: BANNER_H }}><LayoutB config={config} /></div></div>
  if (config.layout === "C") return <div style={wrapperStyle}>{overlay}<div style={{ paddingTop: BANNER_H }}><LayoutC config={config} /></div></div>
  if (config.layout === "D") return <div style={wrapperStyle}>{overlay}<div style={{ paddingTop: BANNER_H }}><LayoutD config={config} /></div></div>
  if (config.layout === "E") return <div style={wrapperStyle}>{overlay}<div style={{ paddingTop: BANNER_H }}><LayoutE config={config} /></div></div>
  if (config.layout === "F") return <div style={wrapperStyle}>{overlay}<div style={{ paddingTop: BANNER_H }}><LayoutF config={config} /></div></div>
  if (config.layout === "G") return <div style={wrapperStyle}>{overlay}<div style={{ paddingTop: BANNER_H }}><LayoutG config={config} /></div></div>
  if (config.layout === "H") return <div style={wrapperStyle}>{overlay}<div style={{ paddingTop: BANNER_H }}><LayoutH config={config} /></div></div>
  if (config.layout === "I") return <div style={wrapperStyle}>{overlay}<div style={{ paddingTop: BANNER_H }}><LayoutI config={config} /></div></div>
  if (config.layout === "K") return <div style={wrapperStyle}>{overlay}<div style={{ paddingTop: BANNER_H }}><LayoutK config={config} /></div></div>
  if (config.layout === "L") return <div style={wrapperStyle}>{overlay}<div style={{ paddingTop: BANNER_H }}><LayoutL config={config} /></div></div>
  if (config.layout === "M") return <div style={wrapperStyle}>{overlay}<div style={{ paddingTop: BANNER_H }}><LayoutM config={config} /></div></div>
  return <div style={wrapperStyle}>{overlay}<div style={{ paddingTop: BANNER_H }}><LayoutA config={config} /></div></div>
}
