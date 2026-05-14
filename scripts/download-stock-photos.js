#!/usr/bin/env node
/**
 * Download stock photos from Pexels for one or more sports.
 *
 * Usage:
 *   node scripts/download-stock-photos.js --sports="Soccer,Basketball" --key="YOUR_PEXELS_KEY"
 *
 * Or set PEXELS_API_KEY env var once and omit --key:
 *   $env:PEXELS_API_KEY="YOUR_KEY"
 *   node scripts/download-stock-photos.js --sports="Soccer,Basketball,Baseball"
 *
 * Downloads per sport:
 *   public/stock/{key}/hero/     — 3 landscape  → hero-01.jpg … hero-03.jpg
 *   public/stock/{key}/about/    — 3 portrait   → about-01.jpg … about-03.jpg
 *   public/stock/{key}/gallery/  — 6 any orient → gallery-01.jpg … gallery-06.jpg
 *
 * Existing files are overwritten. No extra npm packages needed.
 * Free Pexels API key: https://www.pexels.com/api/
 */

const fs    = require("fs")
const path  = require("path")
const https = require("https")

// ── Args ──────────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, "").split("=")
    return [k, v.join("=")]
  })
)

const API_KEY   = args.key || process.env.PEXELS_API_KEY
const sportsArg = args.sports || ""

if (!API_KEY) {
  console.error("Error: Pexels API key required.\n")
  console.error("  Pass --key=\"YOUR_KEY\"  or  set PEXELS_API_KEY env var")
  console.error("\nGet a free key at: https://www.pexels.com/api/")
  process.exit(1)
}
if (!sportsArg) {
  console.error("Error: --sports is required.\n")
  console.error('  Example: --sports="Soccer,Basketball,Baseball"')
  process.exit(1)
}

const sports = sportsArg.split(",").map(s => s.trim()).filter(Boolean)

// ── Helpers ───────────────────────────────────────────────────────────────────
function sportToKey(s) {
  return s.toLowerCase()
    .replace(/&/g, "and").replace(/\//g, "-")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function pad(n) { return String(n).padStart(2, "0") }

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

// Follow redirects and return parsed JSON
function apiGet(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { Authorization: API_KEY } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        apiGet(res.headers.location).then(resolve).catch(reject)
        return
      }
      if (res.statusCode !== 200) {
        let body = ""
        res.on("data", c => { body += c })
        res.on("end", () => reject(new Error(`Pexels API ${res.statusCode}: ${body}`)))
        return
      }
      let data = ""
      res.on("data", chunk => { data += chunk })
      res.on("end", () => {
        try { resolve(JSON.parse(data)) }
        catch { reject(new Error("Invalid JSON from Pexels API")) }
      })
    })
    req.on("error", reject)
  })
}

// Download a binary file, following redirects
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const follow = (u) => {
      https.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          follow(res.headers.location)
          return
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Download failed ${res.statusCode}: ${u}`))
          return
        }
        const file = fs.createWriteStream(destPath)
        res.pipe(file)
        file.on("finish", () => { file.close(); resolve() })
        file.on("error", (e) => { fs.unlink(destPath, () => {}); reject(e) })
      }).on("error", reject)
    }
    follow(url)
  })
}

async function fetchPhotos(query, orientation, count) {
  const params = new URLSearchParams({ query, per_page: String(count) })
  if (orientation) params.set("orientation", orientation)
  const data = await apiGet(`https://api.pexels.com/v1/search?${params}`)
  if (!data.photos || data.photos.length === 0) {
    throw new Error(`No results for "${query}" (orientation: ${orientation || "any"})`)
  }
  return data.photos
}

function pickSrc(photo, type) {
  const s = photo.src || {}
  if (type === "hero")    return s.large2x || s.large || s.original
  if (type === "about")   return s.portrait || s.large2x || s.large || s.original
  return s.large || s.large2x || s.original
}

// ── Per-sport logic ───────────────────────────────────────────────────────────
const ROOT = path.join(__dirname, "..", "public", "stock")

async function processSport(sport) {
  const key = sportToKey(sport)
  const dirs = {
    hero:    path.join(ROOT, key, "hero"),
    about:   path.join(ROOT, key, "about"),
    gallery: path.join(ROOT, key, "gallery"),
  }
  Object.values(dirs).forEach(ensureDir)

  console.log(`\n→ ${sport}`)

  // Hero — 3 landscape
  process.stdout.write("  hero     ")
  const heroPhotos = await fetchPhotos(`${sport} game competition`, "landscape", 3)
  for (let i = 0; i < Math.min(3, heroPhotos.length); i++) {
    const filename = `hero-${pad(i + 1)}.jpg`
    await downloadFile(pickSrc(heroPhotos[i], "hero"), path.join(dirs.hero, filename))
    process.stdout.write(`${filename} ✓  `)
  }
  console.log()

  // About — 3 portrait
  process.stdout.write("  about    ")
  const aboutPhotos = await fetchPhotos(`${sport} coach portrait`, "portrait", 3)
  for (let i = 0; i < Math.min(3, aboutPhotos.length); i++) {
    const filename = `about-${pad(i + 1)}.jpg`
    await downloadFile(pickSrc(aboutPhotos[i], "about"), path.join(dirs.about, filename))
    process.stdout.write(`${filename} ✓  `)
  }
  console.log()

  // Gallery — 6 any orientation
  process.stdout.write("  gallery  ")
  const galleryPhotos = await fetchPhotos(`${sport} player training`, null, 6)
  for (let i = 0; i < Math.min(6, galleryPhotos.length); i++) {
    const filename = `gallery-${pad(i + 1)}.jpg`
    await downloadFile(pickSrc(galleryPhotos[i], "gallery"), path.join(dirs.gallery, filename))
    process.stdout.write(`${filename} ✓  `)
  }
  console.log()
}

// ── Entry point ───────────────────────────────────────────────────────────────
;(async () => {
  console.log(`Sports: ${sports.join(", ")}`)
  for (const sport of sports) {
    await processSport(sport)
  }
  console.log("\nDone.")
})().catch((err) => {
  console.error("\nFailed:", err.message)
  process.exit(1)
})
