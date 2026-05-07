import { getConfig } from "@/lib/useConfig"
import LayoutA from "@/templates/football-coach/layouts/layout-a/LayoutA"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ coach?: string; layout?: string }>
}) {
  const params = await searchParams
  const slug = params.coach ?? "john-smith"
  const config = getConfig(slug)

  return <LayoutA config={config} />
}
