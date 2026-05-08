/**
 * scrape-athletesuntapped.js
 *
 * Pulls football coach profiles from the Athletes Untapped public API
 * and generates prospects/configs/{slug}.json for each coach found.
 *
 * No API key required — uses the same public endpoint the AU website uses.
 *
 * Usage:
 *   node scripts/scrape-athletesuntapped.js            # all FL football coaches
 *   node scripts/scrape-athletesuntapped.js --limit=10 # test run, first 10
 *   node scripts/scrape-athletesuntapped.js --dry-run  # fetch only, skip writing configs
 *   node scripts/scrape-athletesuntapped.js --refresh  # re-fetch all, keep contacted state
 *
 * Output:
 *   data/au-leads.json        — coach data + contacted tracking
 *   prospects/configs/*.json  — one config per coach (unless --dry-run)
 */

const fs = require("fs")
const path = require("path")

const BASE_URL = "https://athletesuntapped.com"
const API_BASE = "https://api.athletesuntapped.com/api/v1"
const CDN_BASE = "https://d3kvhmcyaeni3o.cloudfront.net"
const DATA_DIR = path.join(__dirname, "../data")
const CONFIGS_DIR = path.join(__dirname, "../prospects/configs")
const AU_LEADS_FILE = path.join(DATA_DIR, "au-leads.json")

const DELAY_MS = 800

// Parse CLI args
const args = process.argv.slice(2)
const LIMIT = (() => {
  const flag = args.find((a) => a.startsWith("--limit="))
  return flag ? parseInt(flag.split("=")[1], 10) : Infinity
})()
const DRY_RUN = args.includes("--dry-run")
const DEBUG = args.includes("--debug")
const REFRESH = args.includes("--refresh")

// FL city search grid — 50-mile radius covers the whole state with these centers
const FL_SEARCH_CITIES = [
  { name: "Jacksonville", lat: 30.3322, lng: -81.6557 },
  { name: "Tampa",        lat: 27.9506, lng: -82.4572 },
  { name: "Orlando",      lat: 28.5383, lng: -81.3792 },
  { name: "Miami",        lat: 25.7617, lng: -80.1918 },
  { name: "Fort Myers",   lat: 26.6406, lng: -81.8723 },
  { name: "Pensacola",    lat: 30.4213, lng: -87.2169 },
  { name: "Gainesville",  lat: 29.6516, lng: -82.3248 },
  { name: "Daytona Beach",lat: 29.2108, lng: -81.0228 },
  // Gap-fill cities — confirmed new coaches found in manual searches
  { name: "Panama City",  lat: 30.1588, lng: -85.6602 },
  { name: "Ocala",        lat: 29.1872, lng: -82.1401 },
  { name: "Port St Lucie",lat: 27.2939, lng: -80.3503 },
  { name: "West Palm Beach", lat: 26.7153, lng: -80.0534 },
]

// Full Florida city → county map
const CITY_TO_COUNTY = {
  // NE Florida
  jacksonville: "Duval",
  "jacksonville beach": "Duval",
  "atlantic beach": "Duval",
  "neptune beach": "Duval",
  "fruit cove": "St. Johns",
  "st augustine": "St. Johns",
  "saint augustine": "St. Johns",
  "ponte vedra": "St. Johns",
  "ponte vedra beach": "St. Johns",
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
  // North Florida
  gainesville: "Alachua",
  tallahassee: "Leon",
  "lake city": "Columbia",
  pensacola: "Escambia",
  "panama city": "Bay",
  "fort walton beach": "Okaloosa",
  destin: "Okaloosa",
  niceville: "Okaloosa",
  // Central Florida
  orlando: "Orange",
  oviedo: "Seminole",
  "winter springs": "Seminole",
  sanford: "Seminole",
  kissimmee: "Osceola",
  deltona: "Volusia",
  "daytona beach": "Volusia",
  "new smyrna beach": "Volusia",
  lakeland: "Polk",
  "winter haven": "Polk",
  ocala: "Marion",
  "the villages": "Sumter",
  clermont: "Lake",
  eustis: "Lake",
  leesburg: "Lake",
  // Space Coast
  "palm bay": "Brevard",
  melbourne: "Brevard",
  titusville: "Brevard",
  rockledge: "Brevard",
  // Tampa Bay
  tampa: "Hillsborough",
  brandon: "Hillsborough",
  "plant city": "Hillsborough",
  "spring hill": "Hernando",
  "st petersburg": "Pinellas",
  "saint petersburg": "Pinellas",
  clearwater: "Pinellas",
  "indian rocks beach": "Pinellas",
  bradenton: "Manatee",
  sarasota: "Sarasota",
  zephyrhills: "Pasco",
  "new port richey": "Pasco",
  lithia: "Hillsborough",
  // Treasure Coast
  "port st lucie": "St. Lucie",
  "fort pierce": "St. Lucie",
  stuart: "Martin",
  "port saint lucie": "St. Lucie",
  // South Florida
  "west palm beach": "Palm Beach",
  "boca raton": "Palm Beach",
  "boynton beach": "Palm Beach",
  "delray beach": "Palm Beach",
  "fort lauderdale": "Broward",
  hollywood: "Broward",
  "pompano beach": "Broward",
  "coral springs": "Broward",
  "pembroke pines": "Broward",
  miramar: "Broward",
  miami: "Miami-Dade",
  hialeah: "Miami-Dade",
  "miami gardens": "Miami-Dade",
  homestead: "Miami-Dade",
  "coral gables": "Miami-Dade",
  // SW Florida
  "fort myers": "Lee",
  "cape coral": "Lee",
  "bonita springs": "Lee",
  naples: "Collier",
}

function deriveCounty(city) {
  if (!city) return null
  return CITY_TO_COUNTY[city.toLowerCase().trim()] || null
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/^coach\s+/i, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

async function searchCoaches(city) {
  const url =
    `${API_BASE}/coaches?radius=50&page=0&sport=football` +
    `&lng=${city.lng}&lat=${city.lat}` +
    `&location=${encodeURIComponent(city.name)}&region=Florida&state=FL`

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "application/json",
      Referer: "https://athletesuntapped.com/",
      Origin: "https://athletesuntapped.com",
    },
  })

  if (!res.ok) throw new Error(`HTTP ${res.status} for ${city.name}`)
  const data = await res.json()
  return data.coaches || []
}

// Map API coach object → our lead format
function mapApiCoach(c) {
  const displayName = (c.firstName + " " + (c.lastName || "")).trim()
  const city = c.locationInfo?.city || c.city || null
  const state = c.locationInfo?.state || c.state || "FL"

  // Build bio: prefer elevPitch (longer), fall back to oneLiner
  const bio = c.elevPitch || c.oneLiner || null

  // Calculate years coaching from coachingExp array
  let years_experience = null
  if (Array.isArray(c.coachingExp) && c.coachingExp.length > 0) {
    const startYears = c.coachingExp
      .map((e) => parseInt(e.from, 10))
      .filter((y) => !isNaN(y))
    if (startYears.length > 0) {
      years_experience = new Date().getFullYear() - Math.min(...startYears)
    }
  }

  // Profile image hosted on CloudFront
  const imageKey = c.profileImageCropped || c.profileImage || null
  const profile_image = imageKey ? `${CDN_BASE}/${imageKey}` : null

  // Training locations — keep full objects for future use, derive city list for components
  const training_locations = (c.trainingLocations || []).filter((l) => l.city)
  const training_cities = training_locations.map((l) => l.city)

  return {
    name: displayName,
    city,
    state,
    bio,
    specialty: c.tags?.[0]?.replace(/_/g, " ") || null,
    years_experience,
    credentials: (c.tags || []).map((t) => t.replace(/_/g, " ")),
    lesson_count: c.lessonCount || 0,
    athletes_trained: c.totalAthletesTrained || 0,
    sports: Array.isArray(c.sport) ? c.sport : [c.sport].filter(Boolean),
    training_cities,
    training_locations,
    profile_image,
    profile_url: `${BASE_URL}/coach-profile/${c.customUrl}`,
    contacted: false,
    contact_notes: "",
    scraped_at: new Date().toISOString(),
  }
}

// ─── Design / copy variation pools ───────────────────────────────────────────

const VARIATION_POOLS = {
  accent_color: ["gold", "red", "navy", "green", "purple", "teal", "pink"],
  background_tone: ["pure-black", "navy-black", "slate-black", "charcoal"],
  card_border: ["gold", "white", "accent", "none"],
  button_style: ["solid", "ghost", "gradient"],
  hero_layout: ["full-bleed", "split-right", "centered-overlay"],
  hero_overlay: ["field-lines", "hex-grid", "dot-grid", "diagonal", "none"],
  stats_layout: ["horizontal-strip", "grid-2x2", "centered-large"],
  photo_treatment: ["grayscale-hover", "always-color", "duotone", "high-contrast"],
  gallery_layout: ["grid-3col", "grid-2col", "grid-4col", "masonry"],
  services_layout: ["cards-3col", "horizontal-icon-left", "featured-2small"],
  testimonials_layout: ["cards-2col", "single-large-quote", "stacked-compact"],
  about_frame: ["bordered-offset", "minimal-frame", "full-bleed", "circular"],
  font_pair: ["bebas-inter", "oswald-inter", "bebas-poppins", "oswald-poppins"],
}

const COPY_POOLS = {
  hero_tagline: [
    "TRAIN HARD. PLAY HARD. WIN.",
    "ELEVATE YOUR GAME.",
    "BUILT FOR CHAMPIONS.",
    "YOUR EDGE STARTS HERE.",
    "EXCELLENCE STARTS NOW.",
  ],
  about_tagline: [
    "BUILT IN THE TRENCHES. FORGED FOR THE SPOTLIGHT.",
    "CHAMPIONS ARE MADE IN THE DETAILS.",
    "WHERE POTENTIAL MEETS PERFORMANCE.",
    "PROVEN METHODS. REAL RESULTS.",
  ],
  services_tagline: [
    "TRAINING THAT DELIVERS.",
    "PRECISION. PASSION. PERFORMANCE.",
    "YOUR BLUEPRINT FOR SUCCESS.",
    "STRUCTURED EXCELLENCE.",
  ],
  testimonials_tagline: [
    "RESULTS YOU CAN FEEL.",
    "PROOF ON THE FIELD.",
    "ATHLETES SPEAK.",
    "THE EVIDENCE SPEAKS.",
  ],
}

const HERO_PHOTOS = Array.from(
  { length: 10 },
  (_, i) => `/stock/football/hero/hero-${String(i + 1).padStart(2, "0")}.jpg`
)
const ABOUT_PHOTOS = Array.from(
  { length: 10 },
  (_, i) => `/stock/football/about/about-${String(i + 1).padStart(2, "0")}.jpg`
)

const TESTIMONIAL_POOL = [
  [
    {
      quote:
        "Coach {last} changed the way I see the game. I went from second-string to starter in one season.",
      name: "Marcus T.",
      role: "High School Athlete",
      rating: 5,
    },
    {
      quote:
        "My son has trained with Coach {last} for two years. The improvement is night and day.",
      name: "Patricia L.",
      role: "Parent",
      rating: 5,
    },
  ],
  [
    {
      quote:
        "Coach {last} has a gift for breaking down the fundamentals. My kid went from nervous on the field to one of the most confident players on the team.",
      name: "Derrick M.",
      role: "Parent",
      rating: 5,
    },
    {
      quote:
        "Nobody pushes me the right way like Coach {last} does. Every session I leave better than I came.",
      name: "Jordan R.",
      role: "Youth Athlete",
      rating: 5,
    },
  ],
  [
    {
      quote:
        "Best investment we've made in our son's athletic career. Coach {last} is the real deal.",
      name: "Sandra K.",
      role: "Parent",
      rating: 5,
    },
    {
      quote:
        "Coach {last} doesn't just coach the sport — he coaches the whole athlete. That made all the difference.",
      name: "DeShawn F.",
      role: "Parent",
      rating: 5,
    },
  ],
]

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function buildTestimonials(lastName, index) {
  return TESTIMONIAL_POOL[index % TESTIMONIAL_POOL.length].map((t) => ({
    ...t,
    quote: t.quote.replace("{last}", lastName),
  }))
}

function buildConfig(coach, photoIndex) {
  const design = {}
  for (const [key, opts] of Object.entries(VARIATION_POOLS)) design[key] = pick(opts)
  const copy_variants = {}
  for (const [key, opts] of Object.entries(COPY_POOLS)) copy_variants[key] = pick(opts)

  const displayName = coach.name.replace(/^Coach\s+/i, "").trim()
  const lastName = displayName.split(" ").slice(-1)[0]
  const city = coach.city || ""
  const county = deriveCounty(city) || "FL"
  const layout = pick(["A", "B"])

  const bio =
    coach.bio ||
    `Coach ${displayName} is a dedicated football coach based in ${city || "Florida"}, committed to developing athletes at every level.`

  // Use real lesson count / athletes trained if available
  const lessonsValue =
    coach.lesson_count > 0 ? `${coach.lesson_count}+` : coach.athletes_trained > 0 ? `${coach.athletes_trained}+` : "50+"
  const statsLabel = coach.lesson_count > 0 ? "Sessions Completed" : "Athletes Trained"

  return {
    meta: {
      title: `${displayName} Football Coaching — ${county} County, FL`,
      description: `Professional football coaching in ${city || county}, FL. Training sessions for youth and high school athletes.`,
    },
    layout,
    about: {
      name: `Coach ${displayName}`,
      city,
      county,
      state: "FL",
      sport: "Football",
      specialty: coach.specialty || "Skills & Fundamentals",
      years_experience: coach.years_experience || null,
      bio,
    },
    hero: {
      headline: `${county} County's Premier Football Coach`,
      subline: "Personalized football training that turns potential into performance.",
      photo: HERO_PHOTOS[photoIndex % HERO_PHOTOS.length],
    },
    stats: [
      {
        value: coach.years_experience ? `${coach.years_experience}+` : "5+",
        label: "Years Coaching",
      },
      { value: lessonsValue, label: statsLabel },
      { value: "FOOTBALL", label: "Specialist" },
    ],
    testimonials: buildTestimonials(lastName, photoIndex),
    contact: {
      phone: null,
      email: null,
      instagram: null,
      twitter: null,
      youtube: null,
    },
    training_cities: coach.training_cities || [],
    about_photo: ABOUT_PHOTOS[photoIndex % ABOUT_PHOTOS.length],
    design,
    copy_variants,
    _source: {
      platform: "athletesuntapped",
      profile_url: coach.profile_url,
      scraped_at: coach.scraped_at,
    },
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

  // Load existing leads (keyed by profile_url)
  let auLeads = {}
  try {
    const existing = JSON.parse(fs.readFileSync(AU_LEADS_FILE, "utf8"))
    auLeads = Object.fromEntries(
      existing.map((l) => [
        l.profile_url,
        REFRESH
          ? { profile_url: l.profile_url, contacted: l.contacted, contact_notes: l.contact_notes }
          : l,
      ])
    )
    const cached = Object.keys(auLeads).length
    console.log(
      `${REFRESH ? "Refresh mode — re-fetching" : "Resuming —"} ${cached} leads already cached\n`
    )
  } catch {
    // no existing file, start fresh
  }

  // ── Step 1: Collect coaches from all FL cities ────────────────────────────
  console.log(`Searching ${FL_SEARCH_CITIES.length} FL city regions for football coaches...\n`)

  let newCount = 0
  let dupeCount = 0
  let done = false

  for (const city of FL_SEARCH_CITIES) {
    if (done) break

    let coaches
    try {
      coaches = await searchCoaches(city)
    } catch (err) {
      console.warn(`  [SKIP] ${city.name}: ${err.message}`)
      await delay(DELAY_MS)
      continue
    }

    console.log(`${city.name}: ${coaches.length} coaches found`)

    for (const apiCoach of coaches) {
      if (!apiCoach.customUrl) {
        if (DEBUG) console.log(`  [SKIP] no customUrl for ${apiCoach.firstName}`)
        continue
      }

      const profileUrl = `${BASE_URL}/coach-profile/${apiCoach.customUrl}`

      if (auLeads[profileUrl]?.name && !REFRESH) {
        dupeCount++
        continue
      }

      const lead = mapApiCoach(apiCoach)
      auLeads[profileUrl] = lead
      newCount++

      if (DEBUG) {
        console.log(`  + ${lead.name} (${lead.city}) — ${lead.bio?.slice(0, 60)}`)
      }

      if (newCount >= LIMIT) {
        done = true
        break
      }
    }

    fs.writeFileSync(AU_LEADS_FILE, JSON.stringify(Object.values(auLeads), null, 2))
    await delay(DELAY_MS)
  }

  const allLeads = Object.values(auLeads)
  console.log(
    `\nFetch complete — ${newCount} new, ${dupeCount} duplicates skipped, ${allLeads.length} total in au-leads.json`
  )

  if (DRY_RUN) {
    console.log("\n--dry-run: skipping config generation.")
    console.log("\nCoaches found:")
    allLeads.forEach((l) =>
      console.log(`  ${l.name} | ${l.city} | ${l.years_experience || "?"}yr | ${l.profile_url}`)
    )
    return
  }

  // ── Step 2: Write prospect configs ───────────────────────────────────────
  console.log(`\nGenerating configs for ${allLeads.length} coaches...`)
  let created = 0
  let alreadyExists = 0

  for (let i = 0; i < allLeads.length; i++) {
    const coach = allLeads[i]
    if (!coach.name) continue

    const slug = slugify(coach.name)
    if (!slug) continue

    const configPath = path.join(CONFIGS_DIR, `${slug}.json`)

    if (fs.existsSync(configPath)) {
      alreadyExists++
      continue
    }

    const config = buildConfig(coach, i)
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    console.log(`  ✨ ${slug}.json — ${coach.name}, ${coach.city || "?"}`)
    created++
  }

  console.log(`\nDone — ${created} configs created, ${alreadyExists} already existed`)
  console.log(`Preview any at: http://localhost:3000/?coach={slug}`)
  console.log(`Track outreach in: data/au-leads.json  (set "contacted": true when you message them)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
