import fs from "fs"
import path from "path"
import PreviewClient from "./PreviewClient"

export type ProspectRow = {
  slug: string
  firstName: string
  lastName: string
  state: string
  sport: string
  email: string
  phone: string
}

export default function PreviewPage() {
  const configsDir = path.join(process.cwd(), "prospects", "configs")
  let prospects: ProspectRow[] = []

  try {
    const files = fs.readdirSync(configsDir).filter((f) => f.endsWith(".json"))
    prospects = files
      .map((file) => {
        const slug = file.replace(".json", "")
        try {
          const config = JSON.parse(fs.readFileSync(path.join(configsDir, file), "utf8"))
          const rawName = (config.about?.name ?? "").replace(/^Coach\s+/i, "").trim()
          const parts = rawName.split(/\s+/)
          return {
            slug,
            firstName: parts[0] ?? "",
            lastName: parts.slice(1).join(" ") ?? "",
            state: config.about?.state ?? "",
            sport: config.about?.sport ?? "Football",
            email: config.contact?.email ?? "",
            phone: config.contact?.phone ?? "",
          }
        } catch {
          return { slug, firstName: slug, lastName: "", state: "", sport: "", email: "", phone: "" }
        }
      })
      .sort((a, b) => a.lastName.localeCompare(b.lastName))
  } catch {
    // configs dir missing — show empty state
  }

  return <PreviewClient prospects={prospects} />
}
