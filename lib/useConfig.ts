import fs from "fs"
import path from "path"
import baseConfig from "@/templates/football-coach/base.config.json"

export type Stat = { value: string; label: string }
export type Service = { title: string; description: string }
export type Testimonial = { quote: string; name: string; role: string }

export type CoachConfig = typeof baseConfig & {
  about: typeof baseConfig.about & { [key: string]: unknown }
  hero: typeof baseConfig.hero & { [key: string]: unknown }
  contact: typeof baseConfig.contact & { [key: string]: unknown }
  meta: typeof baseConfig.meta & { [key: string]: unknown }
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
