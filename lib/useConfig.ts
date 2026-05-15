import fs from "fs"
import path from "path"
import baseConfig from "@/templates/football-coach/base.config.json"
import { sportToKey } from "@/lib/sportToKey"

export type Stat = { value: string; label: string }
export type Service = { title: string; description: string; price?: string }
export type Testimonial = { quote: string; name: string; role: string; rating?: number; photo?: string }
export type SuccessStory = { name: string; role: string; story: string; result: string; athlete?: string; position?: string }
export type FAQItem = { question: string; answer: string }
export type Video = { title: string; youtube_url: string; description?: string }
export type Package = {
  title: string
  description: string
  duration?: string
  sessions_per_week?: number
  price?: string
  highlight?: boolean
}

export type Placement = {
  name: string
  school: string
  year: string
  position?: string
  scholarship?: string
}

export type DesignConfig = {
  accent_color?: string
  background_tone?: string
  card_border?: string
  button_style?: string
  hero_layout?: string
  hero_overlay?: string
  stats_layout?: string
  photo_treatment?: string
  gallery_layout?: string
  services_layout?: string
  testimonials_layout?: string
  about_frame?: string
  font_pair?: string
  b_palette?: string
  b_hero_layout?: string
  b_stats_layout?: string
  b_gallery_layout?: string
  b_services_layout?: string
  b_testimonials_layout?: string
  b_about_layout?: string
  c_hero_layout?: string
  c_about_layout?: string
  c_services_layout?: string
  c_testimonials_layout?: string
  c_gallery_layout?: string
  d_accent_color?: string
  d_bg_tone?: string
  d_hero_layout?: string
  d_services_layout?: string
  d_testimonials_layout?: string
  d_gallery_layout?: string
  d_about_layout?: string
  e_accent_color?: string
  e_bg_tone?: string
  e_hero_layout?: string
  e_services_layout?: string
  e_gallery_layout?: string
  e_about_layout?: string
  f_accent_color?: string
  f_bg_tone?: string
  f_hero_layout?: string
  f_services_layout?: string
  f_ghost_word?: string
  g_accent_color?: string
  g_bg_tone?: string
  g_hero_layout?: string
  g_about_layout?: string
  h_accent_color?: string
  h_bg_tone?: string
  h_hero_layout?: string
  h_stats_style?: string
  i_accent_color?: string
  i_bg_tone?: string
  i_hero_layout?: string
  i_about_layout?: string
  k_accent_color?: string
  k_bg_tone?: string
  k_hero_layout?: string
  k_ghost_numbers?: string
  l_accent_color?: string
  l_bg_tone?: string
  l_hero_layout?: string
  l_glass_intensity?: string
  m_accent_color?: string
  m_bg_tone?: string
  m_hero_layout?: string
  m_image_breaks?: string
}

export type CopyVariants = {
  hero_tagline?: string
  hero_availability?: string
  about_tagline?: string
  about_quote?: string
  services_tagline?: string
  services_subline?: string
  testimonials_tagline?: string
  testimonials_eyebrow?: string
  contact_offer?: string
  contact_urgency?: string
  contact_subline?: string
  gallery_label?: string
  marquee_text?: string
  c_hero_watermark_text?: string
  c_contact_reply_time?: string
  c_film_label?: string
  ghost_word?: string
  est_year?: string
}

export type AvailabilitySlot = { day: string; slots: string[] }
export type AvailabilityConfig = {
  note?: string
  schedule?: AvailabilitySlot[]
}

export type LegalConfig = {
  privacy_policy_url?: string
  terms_url?: string
  minors_policy?: boolean
  media_consent_notice?: boolean
}

export type CoachConfig = {
  meta: { title: string; description: string; favicon_url: string; [key: string]: unknown }
  theme: string
  layout: string
  font_pair: string
  section_order: string[]
  about: {
    name: string
    title: string
    city: string
    county: string
    state: string
    bio: string
    years_experience: number
    specialty: string
    age_groups: string
    photo: string
    credentials: string[]
    sport: string
    [key: string]: unknown
  }
  hero: {
    headline: string
    subline: string
    photo: string
    cta_text: string
    cta_url: string
    [key: string]: unknown
  }
  stats: Stat[]
  services: Service[]
  packages?: Package[]
  placements?: Placement[]
  testimonials: Testimonial[]
  gallery: { photos: string[] }
  contact: {
    phone: string
    email: string
    booking_url: string
    calendly_url?: string | null
    whatsapp?: string
    google_maps_embed_url?: string
    formspree_id: string
    business_hours: string[]
    instagram?: string
    twitter?: string
    youtube?: string
    [key: string]: unknown
  }
  legal?: LegalConfig
  availability?: AvailabilityConfig
  training_cities?: string[]
  success_stories?: SuccessStory[]
  faq?: FAQItem[]
  videos?: Video[]
  design: DesignConfig
  copy_variants: CopyVariants
}

export { sportToKey } from "@/lib/sportToKey"

function deepMerge<T extends object>(base: T, override: Partial<T>): T {
  const result = { ...base }
  for (const key in override) {
    const val = override[key]
    if (val && typeof val === "object" && !Array.isArray(val) && key in base) {
      result[key] = deepMerge(base[key] as object, val as object) as T[typeof key]
    } else if (val !== undefined) {
      result[key] = val as T[typeof key]
    }
  }
  return result
}

export function getConfig(slug: string): CoachConfig {
  let override: Partial<CoachConfig> = {}
  try {
    const configPath = path.join(process.cwd(), "prospects", "configs", `${slug}.json`)
    override = JSON.parse(fs.readFileSync(configPath, "utf8"))
  } catch {
    // no override file — use base + sport template defaults
  }

  const sport = sportToKey(
    (override.about as Record<string, unknown>)?.sport as string ?? "Football"
  )

  let sportTemplate: Partial<CoachConfig> = {}
  try {
    const sportPath = path.join(
      process.cwd(),
      "templates",
      "football-coach",
      "sport-templates",
      `${sport}.json`
    )
    sportTemplate = JSON.parse(fs.readFileSync(sportPath, "utf8"))
  } catch {
    // unrecognized sport — skip sport template layer
  }

  const withSport = deepMerge(baseConfig as unknown as CoachConfig, sportTemplate as Partial<CoachConfig>)
  return deepMerge(withSport, override)
}
