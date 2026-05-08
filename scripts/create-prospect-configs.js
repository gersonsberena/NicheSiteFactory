/**
 * create-prospect-configs.js
 *
 * Takes enriched leads (with emails) and generates prospects/configs/{slug}.json
 * for each one — ready to use as a demo site via ?coach={slug}.
 *
 * Usage:
 *   node scripts/create-prospect-configs.js
 *
 * Input:  data/leads-enriched.json
 * Output: prospects/configs/{slug}.json
 *         data/prospects-created.json  (tracking which slugs were created)
 */

const fs = require("fs")
const path = require("path")

const ENRICHED_FILE = path.join(__dirname, "../data/leads-enriched.json")
const TRACKING_FILE = path.join(__dirname, "../data/prospects-created.json")
const CONFIGS_DIR = path.join(__dirname, "../prospects/configs")
const REGISTRY_PATH = path.join(__dirname, "../prospects/registry.json")

const HERO_PHOTOS = Array.from({ length: 10 }, (_, i) =>
  `/stock/football/hero/hero-${String(i + 1).padStart(2, "0")}.jpg`
)
const ABOUT_PHOTOS = Array.from({ length: 10 }, (_, i) =>
  `/stock/football/about/about-${String(i + 1).padStart(2, "0")}.jpg`
)

const VARIATION_POOLS = {
  accent_color:        ["gold", "red", "navy", "green", "purple", "teal", "pink"],
  background_tone:     ["pure-black", "navy-black", "slate-black", "charcoal"],
  card_border:         ["gold", "white", "accent", "none"],
  button_style:        ["solid", "ghost", "gradient"],
  hero_layout:         ["full-bleed", "split-right", "centered-overlay"],
  hero_overlay:        ["field-lines", "hex-grid", "dot-grid", "diagonal", "none"],
  stats_layout:        ["horizontal-strip", "grid-2x2", "centered-large"],
  photo_treatment:     ["grayscale-hover", "always-color", "duotone", "high-contrast"],
  gallery_layout:      ["grid-3col", "grid-2col", "grid-4col", "masonry"],
  services_layout:     ["cards-3col", "horizontal-icon-left", "featured-2small"],
  testimonials_layout: ["cards-2col", "single-large-quote", "stacked-compact"],
  about_frame:         ["bordered-offset", "minimal-frame", "full-bleed", "circular"],
  font_pair:           ["bebas-inter", "oswald-inter", "bebas-poppins", "oswald-poppins"],
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

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function assignVariations() {
  const design = {}
  for (const [key, opts] of Object.entries(VARIATION_POOLS)) design[key] = pick(opts)

  const copy_variants = {}
  for (const [key, opts] of Object.entries(COPY_POOLS)) copy_variants[key] = pick(opts)

  return { design, copy_variants }
}

const TESTIMONIAL_POOL = [
  [
    { quote: "Coach {last} changed the way I see the game. I went from second-string to starter in one season.", name: "Marcus T.", role: "High School Athlete", rating: 5 },
    { quote: "My son has trained with Coach {last} for two years. The improvement is night and day — and the character he builds is even better.", name: "Patricia L.", role: "Parent", rating: 5 },
  ],
  [
    { quote: "Coach {last} has a gift for breaking down the fundamentals. My kid went from nervous on the field to one of the most confident players on the team.", name: "Derrick M.", role: "Parent", rating: 5 },
    { quote: "I've had other coaches, but nobody pushes me the right way like Coach {last} does. Every session I leave better than I came.", name: "Jordan R.", role: "Youth Athlete", rating: 5 },
  ],
  [
    { quote: "Best investment we've made in our son's athletic career. Coach {last} is the real deal.", name: "Sandra K.", role: "Parent", rating: 5 },
    { quote: "Coach {last} doesn't just coach the sport — he coaches the whole athlete. That made all the difference for us.", name: "DeShawn F.", role: "Parent", rating: 5 },
  ],
]

function buildTestimonials(lastName, index) {
  const pool = TESTIMONIAL_POOL[index % TESTIMONIAL_POOL.length]
  return pool.map((t) => ({ ...t, quote: t.quote.replace("{last}", lastName) }))
}

function buildConfig(lead, photoIndex) {
  const { design, copy_variants } = assignVariations()
  const sport = lead.sport || "Football"
  const county = lead.county || "Unknown"
  const lastName = lead.person_name.split(" ").slice(-1)[0]
  const layout = pick(["A", "B"])

  return {
    meta: {
      title: `${lead.person_name} ${sport} Coaching — ${county} County, FL`,
      description: `Professional ${sport.toLowerCase()} coaching in ${lead.city || county}, FL. Training sessions for youth and high school athletes in Northeast Florida.`,
    },
    layout,
    about: {
      name: `Coach ${lead.person_name}`,
      city: lead.city || "",
      county,
      state: "FL",
      sport,
      bio: `Coach ${lead.person_name} is a dedicated ${sport.toLowerCase()} coach based in ${lead.city || county}, FL, committed to developing athletes of all levels.`,
    },
    hero: {
      headline: `${county} County's Premier ${sport} Coach`,
      subline: `Personalized ${sport.toLowerCase()} training that turns potential into performance.`,
      photo: HERO_PHOTOS[photoIndex % HERO_PHOTOS.length],
    },
    stats: [
      { value: "100+", label: "Athletes Trained" },
      { value: "NE FL", label: "Based In" },
      { value: sport.toUpperCase(), label: "Specialist" },
    ],
    testimonials: buildTestimonials(lastName, photoIndex),
    contact: {
      phone: lead.phone || null,
      email: lead.email || null,
      instagram: lead.instagram_handle ? `https://instagram.com/${lead.instagram_handle}` : null,
      twitter: lead.twitter_handle ? `https://x.com/${lead.twitter_handle}` : null,
      youtube: lead.youtube_handle ? `https://youtube.com/@${lead.youtube_handle}` : null,
    },
    about_photo: ABOUT_PHOTOS[photoIndex % ABOUT_PHOTOS.length],
    design,
    copy_variants,
  }
}

function updateRegistry(slug, county) {
  let registry = { counties: {} }
  try {
    registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"))
  } catch {}

  if (!registry.counties[county]) {
    registry.counties[county] = { used_combo_ids: [], assigned_combos: {} }
  }
  registry.counties[county].assigned_combos[slug] = {
    assigned_at: new Date().toISOString(),
    manually_tweaked: false,
    source: "scraped",
  }

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2))
}

function main() {
  if (!fs.existsSync(ENRICHED_FILE)) {
    console.error("ERROR: data/leads-enriched.json not found. Run enrich-leads.js first.")
    process.exit(1)
  }

  const leads = JSON.parse(fs.readFileSync(ENRICHED_FILE, "utf8"))

  // Load tracking to avoid overwriting existing configs
  let created = {}
  try {
    created = JSON.parse(fs.readFileSync(TRACKING_FILE, "utf8"))
  } catch {}

  // Only process leads that have an email
  const actionable = leads.filter((l) => l.email && l.slug)
  console.log(`${actionable.length} leads with emails out of ${leads.length} total\n`)

  let count = 0

  for (const lead of actionable) {
    const configPath = path.join(CONFIGS_DIR, `${lead.slug}.json`)

    if (created[lead.slug] || fs.existsSync(configPath)) {
      console.log(`⏭  ${lead.slug}.json — already exists, skipping`)
      continue
    }

    const config = buildConfig(lead, count)
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))

    created[lead.slug] = {
      slug: lead.slug,
      name: lead.person_name,
      email: lead.email,
      city: lead.city,
      county: lead.county,
      sport: lead.sport,
      place_id: lead.place_id,
      config_created_at: new Date().toISOString(),
    }

    updateRegistry(lead.slug, lead.county || "Unknown")
    fs.writeFileSync(TRACKING_FILE, JSON.stringify(created, null, 2))

    console.log(`✨ ${lead.slug}.json — ${lead.person_name}, ${lead.city} (${lead.sport})`)
    count++
  }

  console.log(`\nDone — ${count} configs created → prospects/configs/`)
  console.log(`Preview any at: http://localhost:3000/?coach={slug}`)
}

main()
