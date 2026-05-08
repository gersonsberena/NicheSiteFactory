/**
 * scrape-leads.js
 *
 * Finds football coaches, baseball coaches, and sports trainers in NE Florida
 * using the Google Places Text Search API.
 *
 * Usage:
 *   $env:GOOGLE_PLACES_API_KEY="YOUR_KEY"
 *   node scripts/scrape-leads.js
 *
 * Output: data/leads-raw.json
 * Cost: ~$10-15 of your free $200/month Google credit
 */

const fs = require("fs")
const path = require("path")

const API_KEY = process.env.GOOGLE_PLACES_API_KEY
const DATA_DIR = path.join(__dirname, "../data")
const OUT_FILE = path.join(DATA_DIR, "leads-raw.json")

// NE Florida cities to search in
const CITIES = [
  "Jacksonville FL",
  "St Augustine FL",
  "Orange Park FL",
  "Ponte Vedra FL",
  "Fernandina Beach FL",
  "Palatka FL",
  "Palm Coast FL",
  "Fleming Island FL",
  "Green Cove Springs FL",
  "Yulee FL",
]

// Search queries — each × each city = total API calls
const QUERIES = [
  "football coach",
  "football trainer",
  "youth football training",
  "baseball coach",
  "baseball trainer",
  "youth baseball training",
  "sports performance trainer",
]

// Map city name (lowercase) → county
const CITY_TO_COUNTY = {
  jacksonville: "Duval",
  "st augustine": "St. Johns",
  "saint augustine": "St. Johns",
  "ponte vedra": "St. Johns",
  "ponte vedra beach": "St. Johns",
  "jacksonville beach": "Duval",
  "atlantic beach": "Duval",
  "neptune beach": "Duval",
  "orange park": "Clay",
  "fleming island": "Clay",
  "green cove springs": "Clay",
  middleburg: "Clay",
  "fernandina beach": "Nassau",
  yulee: "Nassau",
  callahan: "Nassau",
  palatka: "Putnam",
  "palm coast": "Flagler",
  "flagler beach": "Flagler",
  macclenny: "Baker",
}

function deriveCounty(address) {
  const lower = (address || "").toLowerCase()
  for (const [city, county] of Object.entries(CITY_TO_COUNTY)) {
    if (lower.includes(city)) return county
  }
  return "Unknown"
}

function extractCity(formattedAddress) {
  // "123 Main St, Jacksonville, FL 32205, USA" → "Jacksonville"
  const parts = formattedAddress.split(",").map((p) => p.trim())
  // City is usually the second-to-last part before "USA", minus the state+zip part
  for (let i = parts.length - 1; i >= 0; i--) {
    if (/^FL\s?\d{5}/.test(parts[i])) return parts[i - 1] || ""
    if (/^FL$/.test(parts[i])) return parts[i - 1] || ""
  }
  return parts[1] || ""
}

function detectSport(query, businessName) {
  const text = (query + " " + businessName).toLowerCase()
  if (text.includes("baseball")) return "Baseball"
  if (text.includes("football")) return "Football"
  return "Sports"
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

async function textSearch(query, city) {
  const q = encodeURIComponent(`${query} ${city}`)
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${q}&key=${API_KEY}`
  const res = await fetch(url)
  const data = await res.json()
  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    console.warn(`  [WARN] ${data.status} for "${query} ${city}"`)
  }
  return data.results || []
}

async function placeDetails(placeId) {
  const fields = "name,formatted_phone_number,website,formatted_address"
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`
  const res = await fetch(url)
  const data = await res.json()
  return data.result || {}
}

async function main() {
  if (!API_KEY) {
    console.error("ERROR: Set GOOGLE_PLACES_API_KEY environment variable first")
    console.error("  PowerShell: $env:GOOGLE_PLACES_API_KEY='your-key-here'")
    process.exit(1)
  }

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

  // Load existing results so we can resume without re-fetching
  let leads = {}
  try {
    const existing = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"))
    leads = Object.fromEntries(existing.map((l) => [l.place_id, l]))
    console.log(`Resuming — ${Object.keys(leads).length} leads already saved\n`)
  } catch {}

  let newCount = 0
  let totalSearches = 0

  for (const city of CITIES) {
    for (const query of QUERIES) {
      console.log(`Searching: "${query}" in ${city}`)
      totalSearches++

      let results
      try {
        results = await textSearch(query, city)
      } catch (err) {
        console.warn(`  [SKIP] fetch failed: ${err.message}`)
        continue
      }

      for (const place of results) {
        if (leads[place.place_id]) continue // already have it

        await delay(120) // stay under rate limits

        let details = {}
        try {
          details = await placeDetails(place.place_id)
        } catch (err) {
          console.warn(`  [SKIP] details failed for ${place.name}: ${err.message}`)
        }

        const address = details.formatted_address || place.formatted_address || ""
        const city_name = extractCity(address)

        leads[place.place_id] = {
          place_id: place.place_id,
          name: details.name || place.name,
          address,
          city: city_name,
          county: deriveCounty(address),
          state: "FL",
          phone: details.formatted_phone_number || null,
          website: details.website || null,
          rating: place.rating || null,
          sport: detectSport(query, details.name || place.name),
          search_query: query,
          scraped_at: new Date().toISOString(),
        }

        newCount++
        console.log(`  + ${leads[place.place_id].name} (${city_name})`)
      }

      // Save after each query so progress isn't lost if interrupted
      fs.writeFileSync(OUT_FILE, JSON.stringify(Object.values(leads), null, 2))
      await delay(400)
    }
  }

  const total = Object.keys(leads).length
  console.log(`\nDone — ${newCount} new leads found across ${totalSearches} searches`)
  console.log(`Total unique leads: ${total} → data/leads-raw.json`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
