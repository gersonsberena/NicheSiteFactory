const fs = require("fs")
const path = require("path")
const csv = require("csv-parser")

const CSV_PATH = path.join(__dirname, "../prospects/football-coaches.csv")
const OUT_DIR = path.join(__dirname, "../prospects/configs")

const HERO_PHOTOS = Array.from({ length: 10 }, (_, i) => `/stock/football/hero/hero-${String(i + 1).padStart(2, "0")}.jpg`)
const ABOUT_PHOTOS = Array.from({ length: 10 }, (_, i) => `/stock/football/about/about-${String(i + 1).padStart(2, "0")}.jpg`)

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

let rowIndex = 0

fs.createReadStream(CSV_PATH)
  .pipe(csv())
  .on("data", (row) => {
    const slug = row.slug?.trim()
    if (!slug) return

    const existingPath = path.join(OUT_DIR, `${slug}.json`)
    let existing = {}
    if (fs.existsSync(existingPath)) {
      try { existing = JSON.parse(fs.readFileSync(existingPath, "utf8")) } catch {}
    }

    const heroPhoto = row.hero_photo || HERO_PHOTOS[rowIndex % HERO_PHOTOS.length]
    const aboutPhoto = row.about_photo || ABOUT_PHOTOS[rowIndex % ABOUT_PHOTOS.length]

    const config = {
      meta: {
        title: `${row.name} Football Coaching — ${row.county} County, FL`,
      },
      layout: row.layout || "A",
      about: {
        name: `Coach ${row.name}`,
        city: row.city,
        county: row.county,
        specialty: row.specialty || undefined,
        years_experience: row.years_experience ? parseInt(row.years_experience) : undefined,
        age_groups: row.age_groups || undefined,
        photo: aboutPhoto,
      },
      hero: {
        headline: row.tagline_override || `${row.county} County's Premier Football Coach`,
        photo: heroPhoto,
      },
      contact: {
        phone: row.phone || undefined,
        email: row.email || undefined,
        booking_url: row.booking_url || "#contact",
      },
      ...existing,
    }

    // strip undefined values
    const clean = JSON.parse(JSON.stringify(config))

    fs.writeFileSync(existingPath, JSON.stringify(clean, null, 2))
    console.log(`✓ ${slug}.json`)
    rowIndex++
  })
  .on("end", () => {
    console.log(`\nDone — ${rowIndex} config(s) written to ${OUT_DIR}`)
  })
