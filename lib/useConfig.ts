import fs from "fs"
import path from "path"
import baseConfig from "@/templates/football-coach/base.config.json"

export type Stat = { value: string; label: string }
export type Service = { title: string; description: string; price?: string }
export type Testimonial = { quote: string; name: string; role: string; rating?: number; photo?: string }
export type SuccessStory = { name: string; role: string; story: string; result: string }
export type FAQItem = { question: string; answer: string }
export type Video = { title: string; youtube_url: string; description?: string }

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
  b_services_layout?: string
  b_testimonials_layout?: string
  b_about_layout?: string
  c_hero_layout?: string
  c_about_layout?: string
  c_services_layout?: string
  c_testimonials_layout?: string
  c_gallery_layout?: string
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

export type CoachConfig = typeof baseConfig & {
  about: typeof baseConfig.about & { credentials?: string[]; [key: string]: unknown }
  hero: typeof baseConfig.hero & { [key: string]: unknown }
  contact: typeof baseConfig.contact & { calendly_url?: string | null; [key: string]: unknown }
  meta: typeof baseConfig.meta & { [key: string]: unknown }
  design: DesignConfig
  copy_variants: CopyVariants
  availability?: AvailabilityConfig
  training_cities?: string[]
  legal?: LegalConfig
}

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
    // no override file — use base defaults
  }
  return deepMerge(baseConfig as CoachConfig, override)
}
