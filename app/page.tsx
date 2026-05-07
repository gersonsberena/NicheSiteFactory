import type { Metadata } from "next"
import { getConfig } from "@/lib/useConfig"
import LayoutA from "@/templates/football-coach/layouts/layout-a/LayoutA"
import LayoutB from "@/templates/football-coach/layouts/layout-b/LayoutB"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ coach?: string }>
}): Promise<Metadata> {
  const params = await searchParams
  const slug = params.coach ?? "john-smith"
  const config = getConfig(slug)
  const faviconUrl = config.meta.favicon_url
  return {
    title: config.meta.title,
    description: config.meta.description,
    ...(faviconUrl ? { icons: { icon: faviconUrl } } : {}),
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ coach?: string; layout?: string }>
}) {
  const params = await searchParams
  const slug = params.coach ?? "john-smith"
  const config = getConfig(slug)

  if (config.layout === "B") return <LayoutB config={config} />
  return <LayoutA config={config} />
}
