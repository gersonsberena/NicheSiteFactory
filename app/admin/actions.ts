"use server"
import fs from "fs"
import path from "path"

const CONFIGS_DIR = path.join(process.cwd(), "prospects", "configs")

export async function listCoaches(): Promise<{ slug: string; sport: string; layout: string }[]> {
  try {
    return fs.readdirSync(CONFIGS_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => {
        const slug = f.replace(".json", "")
        try {
          const raw = JSON.parse(fs.readFileSync(path.join(CONFIGS_DIR, f), "utf8"))
          const sport = (raw.about?.sport as string | undefined) ?? ""
          const layout = (raw.layout as string | undefined) ?? ""
          return { slug, sport, layout }
        } catch {
          return { slug, sport: "", layout: "" }
        }
      })
      .sort((a, b) => a.slug.localeCompare(b.slug))
  } catch {
    return []
  }
}

export async function loadCoach(slug: string): Promise<Record<string, unknown> | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  try {
    const data = fs.readFileSync(path.join(CONFIGS_DIR, `${slug}.json`), "utf8")
    return JSON.parse(data) as Record<string, unknown>
  } catch {
    return null
  }
}

async function pushToGitHub(slug: string, content: string): Promise<void> {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH ?? "main"

  if (!token || !owner || !repo) return

  const filePath = `prospects/configs/${slug}.json`
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`

  // Get current SHA if file exists (required for updates)
  let sha: string | undefined
  try {
    const getRes = await fetch(`${apiUrl}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    })
    if (getRes.ok) {
      const data = (await getRes.json()) as { sha: string }
      sha = data.sha
    }
  } catch {
    // file doesn't exist yet — sha stays undefined
  }

  const body: Record<string, unknown> = {
    message: `coach: update ${slug}`,
    content: Buffer.from(content).toString("base64"),
    branch,
  }
  if (sha) body.sha = sha

  const res = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = (await res.json()) as { message?: string }
    throw new Error(`GitHub API error: ${err.message ?? res.status}`)
  }
}

export async function deleteCoach(
  slug: string
): Promise<{ ok: boolean; error?: string }> {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { ok: false, error: "Invalid slug." }
  }
  try {
    fs.unlinkSync(path.join(CONFIGS_DIR, `${slug}.json`))
    return { ok: true }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
}

export async function saveCoach(
  slug: string,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; error?: string; deployed?: boolean }> {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { ok: false, error: "Invalid slug — use lowercase letters, numbers, and hyphens only." }
  }
  try {
    const content = JSON.stringify(payload, null, 2)
    fs.writeFileSync(path.join(CONFIGS_DIR, `${slug}.json`), content, "utf8")

    let deployed = false
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO) {
      await pushToGitHub(slug, content)
      deployed = true
    }

    return { ok: true, deployed }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
}
