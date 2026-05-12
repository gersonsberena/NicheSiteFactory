const fs = require("fs")
const path = require("path")
const csv = require("csv-parser")

// Accept --csv=<filename> CLI arg (filename only, resolved inside prospects/)
const csvArg = process.argv.find((a) => a.startsWith("--csv="))
const csvFile = csvArg ? csvArg.split("=")[1] : "football-coaches.csv"
const CSV_PATH = path.join(__dirname, "../prospects", csvFile)
const OUT_DIR = path.join(__dirname, "../prospects/configs")
const REGISTRY_PATH = path.join(__dirname, "../prospects/registry.json")

function sportToKey(s) {
  return s.toLowerCase()
    .replace(/&/g, "and").replace(/\//g, "-")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function getPhotoPool(sport, type) {
  const key = sportToKey(sport)
  const folder = type === "hero" ? "hero" : "about"
  return Array.from({ length: 10 }, (_, i) =>
    `/stock/${key}/${folder}/${folder}-${String(i + 1).padStart(2, "0")}.jpg`
  )
}

// Sport-agnostic design options
const DESIGN_VARIATION_OPTIONS = {
  accent_color: ["gold", "red", "navy", "green", "purple", "teal", "pink", "orange", "cyan", "lime", "amber", "crimson"],
  background_tone: ["pure-black", "navy-black", "slate-black", "charcoal", "dark-brown", "forest-black", "deep-purple", "warm-dark"],
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
  font_pair: ["bebas-inter", "oswald-inter", "bebas-poppins", "oswald-poppins", "bebas-roboto"],
}

// Sport-specific copy pools — add a new sport key to support new niches
const COPY_POOLS = {
  Football: {
    hero_tagline: [
      "TRAIN HARD. PLAY HARD. WIN.",
      "ELEVATE YOUR GAME.",
      "BUILT FOR CHAMPIONS.",
      "YOUR EDGE STARTS HERE.",
      "EXCELLENCE STARTS NOW.",
    ],
    hero_availability: [
      "Off-Season Roster · Now Open",
      "Summer Training · Spots Available",
      "Fall Prep · Booking Now",
      "Limited Spots · Enroll Today",
      "Spring Sessions · Now Enrolling",
    ],
    about_tagline: [
      "BUILT IN THE TRENCHES. FORGED FOR THE SPOTLIGHT.",
      "CHAMPIONS ARE MADE IN THE DETAILS.",
      "WHERE POTENTIAL MEETS PERFORMANCE.",
      "PROVEN METHODS. REAL RESULTS.",
    ],
    about_quote: [
      "Champions aren't made on Friday nights. They're made every single day before.",
      "Hard work beats talent when talent doesn't work hard.",
      "The scoreboard doesn't lie. Neither does the practice field.",
      "Every rep in practice is a rep toward the person you're becoming.",
      "The game is won or lost long before kickoff.",
    ],
    services_tagline: [
      "TRAINING THAT DELIVERS.",
      "PRECISION. PASSION. PERFORMANCE.",
      "YOUR BLUEPRINT FOR SUCCESS.",
      "STRUCTURED EXCELLENCE.",
    ],
    services_subline: [
      "Three pillars. One mission — make you the most prepared athlete on the field, every single rep.",
      "Focused training. Real development. Every athlete leaves better than they arrived.",
      "From fundamentals to film — everything your athlete needs to compete at the next level.",
      "Individual attention. Proven systems. Championship habits.",
    ],
    testimonials_tagline: [
      "RESULTS YOU CAN FEEL.",
      "PROOF ON THE FIELD.",
      "ATHLETES SPEAK.",
      "THE EVIDENCE SPEAKS.",
    ],
    testimonials_eyebrow: [
      "Voices From The Field",
      "What Athletes Are Saying",
      "Real Results, Real Athletes",
      "From Our Athletes",
      "Athlete Spotlight",
    ],
    contact_offer: [
      "Free 30-minute intro session. Bring your goals — leave with a plan.",
      "No commitment required — just show up ready to work.",
      "First session consultation is on us. Let's build your game plan.",
      "Schedule your intro call. Zero obligation. Maximum value.",
    ],
    contact_urgency: [
      "Roster spots fill fast in the off-season. Reach out today and lock in your training slot.",
      "Limited spots available each month. Don't wait until the season starts.",
      "Training slots book out weeks in advance. Reach out now to get on the schedule.",
      "Early enrollees get priority scheduling. Lock in your spot before the off-season rush.",
    ],
    gallery_label: [
      "On the Field",
      "In Action",
      "At Practice",
      "Game Day",
    ],
    marquee_text: [
      "TRAIN HARD ★ PLAY HARD ★ WIN ★ ",
      "REPS BUILD CHAMPIONS ★ SHOW UP EVERY DAY ★ ",
      "COMMIT TO THE PROCESS ★ TRUST THE WORK ★ ",
      "ELITE MINDSET ★ ELITE RESULTS ★ ",
    ],
  },

  Baseball: {
    hero_tagline: [
      "DIAMOND READY. GAME READY.",
      "BUILT IN THE CAGE.",
      "YOUR SWING STARTS HERE.",
      "TRAIN LIKE A PRO.",
      "EXCELLENCE EVERY AT-BAT.",
    ],
    hero_availability: [
      "Fall Ball Prep · Now Enrolling",
      "Off-Season Training · Spots Available",
      "Spring Season Prep · Booking Now",
      "Limited Roster · Claim Your Spot",
      "Summer Camp · Now Open",
    ],
    about_tagline: [
      "BUILT IN THE CAGE. PROVEN ON THE DIAMOND.",
      "MECHANICS WIN GAMES. DETAILS WIN SEASONS.",
      "WHERE POTENTIAL MEETS THE PLATE.",
      "PROVEN COACHING. REAL RESULTS.",
    ],
    about_quote: [
      "Baseball is a game of failure. The best hitters fail 7 out of 10 times. We train to handle that.",
      "Every rep in the cage is a deposit. Every at-bat is a withdrawal. Make more deposits.",
      "The game slows down when your mechanics are right. That's what we build.",
      "Talent gets you noticed. Consistency gets you recruited.",
      "The diamond doesn't care about your last game. Neither do we. Today's work is what matters.",
    ],
    services_tagline: [
      "TRAINING THAT SHOWS UP IN THE BOX SCORE.",
      "MECHANICS. MENTAL GAME. MASTERY.",
      "YOUR PATH TO THE NEXT LEVEL.",
      "PRECISION COACHING. REAL RESULTS.",
    ],
    services_subline: [
      "Hitting mechanics, pitching development, and fielding fundamentals — the full package for serious players.",
      "Every session is focused, filmed, and built around what your athlete needs most.",
      "From Little League to high school — we meet athletes where they are and push them further.",
      "Individual attention. Video analysis. Championship-level habits.",
    ],
    testimonials_tagline: [
      "RESULTS IN THE BOX SCORE.",
      "PROOF ON THE DIAMOND.",
      "PLAYERS SPEAK.",
      "THE STATS DON'T LIE.",
    ],
    testimonials_eyebrow: [
      "From the Diamond",
      "What Players Are Saying",
      "Real Results, Real Athletes",
      "From Our Players",
      "Player Spotlight",
    ],
    contact_offer: [
      "Free evaluation session. We'll identify exactly what to work on first.",
      "First session free. No commitment — just come throw, hit, or field.",
      "Intro lesson on us. See the difference before you commit.",
      "Start with a free skills assessment. Know where you stand.",
    ],
    contact_urgency: [
      "Training slots fill fast before the season. Reach out now to lock in your schedule.",
      "Limited spots each month. Don't wait until tryout season.",
      "Sessions book out weeks in advance. Get on the schedule now.",
      "Early fall enrollees get first pick of time slots. Don't miss the window.",
    ],
    gallery_label: [
      "On the Diamond",
      "In the Cage",
      "At Practice",
      "On the Mound",
    ],
    marquee_text: [
      "TRAIN ★ HIT ★ THROW ★ WIN ★ ",
      "REPS IN THE CAGE ★ RESULTS ON THE FIELD ★ ",
      "MECHANICS FIRST ★ RESULTS FOLLOW ★ ",
      "COMMIT TO THE CRAFT ★ TRUST THE PROCESS ★ ",
    ],
  },
}

// Fallback to Football pools for unknown sports
function getCopyPool(sport) {
  return COPY_POOLS[sport] ?? COPY_POOLS.Football
}

// Combined options object used for design keys (sport-agnostic)
const VARIATION_OPTIONS = {
  ...DESIGN_VARIATION_OPTIONS,
  // Use Football as the reference pool for combo ID index computation
  ...COPY_POOLS.Football,
}

// Layout B specific variation pools
const B_VARIATION_OPTIONS = {
  b_palette: ["forest-amber", "navy-gold", "slate-orange", "teal-gold", "burgundy-gold"],
  b_hero_layout: ["split-left", "centered-overlay", "full-bleed-text"],
  b_services_layout: ["cards-3col", "icon-left-list", "featured-large"],
  b_testimonials_layout: ["cards-3col", "single-quote", "stacked"],
  b_about_layout: ["centered-stack", "photo-left", "photo-right"],
}
const B_DESIGN_KEYS = Object.keys(B_VARIATION_OPTIONS)

const COPY_KEYS = [
  "hero_tagline", "hero_availability",
  "about_tagline", "about_quote",
  "services_tagline", "services_subline",
  "testimonials_tagline", "testimonials_eyebrow",
  "contact_offer", "contact_urgency",
  "gallery_label", "marquee_text",
]
const DESIGN_KEYS = Object.keys(VARIATION_OPTIONS).filter((k) => !COPY_KEYS.includes(k))

function generateComboId(design, copyVariants, layout) {
  const combined = { ...design, ...copyVariants }
  const baseId = [...DESIGN_KEYS, ...COPY_KEYS].map((k) => VARIATION_OPTIONS[k]?.indexOf(combined[k]) ?? -1).join("-")
  if (layout === "B") {
    const bId = B_DESIGN_KEYS.map((k) => B_VARIATION_OPTIONS[k].indexOf(combined[k])).join("-")
    return `B:${baseId}:${bId}`
  }
  return baseId
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function findUnusedCombo(county, registry, layout, sport = "Football") {
  const usedIds = new Set(registry.counties?.[county]?.used_combo_ids ?? [])
  const copyPool = getCopyPool(sport)
  for (let attempt = 0; attempt < 1000; attempt++) {
    const design = {}
    for (const key of DESIGN_KEYS) design[key] = randomPick(VARIATION_OPTIONS[key])
    if (layout === "B") {
      for (const key of B_DESIGN_KEYS) design[key] = randomPick(B_VARIATION_OPTIONS[key])
    }
    const copyVariants = {}
    for (const key of COPY_KEYS) copyVariants[key] = randomPick(copyPool[key] ?? VARIATION_OPTIONS[key] ?? [undefined])
    const comboId = generateComboId(design, copyVariants, layout)
    if (!usedIds.has(comboId)) return { design, copyVariants, comboId }
  }
  throw new Error(`No unique combo found for county "${county}" after 1000 attempts`)
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

let registry = { counties: {} }
try {
  registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"))
} catch {}

const rows = []
fs.createReadStream(CSV_PATH)
  .pipe(csv())
  .on("data", (row) => rows.push(row))
  .on("end", () => {
    let count = 0
    for (const row of rows) {
      const slug = row.slug?.trim()
      if (!slug) continue

      const county = row.county?.trim() || "Unknown"
      const existingPath = path.join(OUT_DIR, `${slug}.json`)
      let existing = {}
      try {
        existing = JSON.parse(fs.readFileSync(existingPath, "utf8"))
      } catch {}

      if (!registry.counties[county]) {
        registry.counties[county] = { used_combo_ids: [], assigned_combos: {} }
      }
      const countyReg = registry.counties[county]
      const existingAssignment = countyReg.assigned_combos?.[slug]

      let design, copyVariants

      const layoutType = (row.layout || "A").trim().toUpperCase()
      const sport = row.sport?.trim() || "Football"

      if (existingAssignment?.manually_tweaked) {
        design = existing.design ?? {}
        copyVariants = existing.copy_variants ?? {}
        console.log(`⏭  ${slug}.json — manually tweaked, skipping`)
      } else if (existingAssignment) {
        design = existing.design
        copyVariants = existing.copy_variants
        // Backfill from registry if config was cleared
        if (!design || !Object.keys(design).length) {
          const vars = existingAssignment.variations ?? {}
          const allDesignKeys = layoutType === "B" ? [...DESIGN_KEYS, ...B_DESIGN_KEYS] : DESIGN_KEYS
          design = Object.fromEntries(allDesignKeys.filter((k) => vars[k] !== undefined).map((k) => [k, vars[k]]))
          copyVariants = Object.fromEntries(COPY_KEYS.filter((k) => vars[k] !== undefined).map((k) => [k, vars[k]]))
        }
        console.log(`♻  ${slug}.json — reusing registered combo`)
      } else {
        const result = findUnusedCombo(county, registry, layoutType, sport)
        design = result.design
        copyVariants = result.copyVariants
        countyReg.used_combo_ids.push(result.comboId)
        countyReg.assigned_combos[slug] = {
          combo_id: result.comboId,
          assigned_at: new Date().toISOString(),
          manually_tweaked: false,
          variations: { ...design, ...copyVariants },
        }
        console.log(`✨ ${slug}.json — new combo assigned (${county} County, sport: ${sport}, layout: ${layoutType}, accent: ${design.accent_color}${layoutType === "B" ? `, palette: ${design.b_palette}` : ""})`)
      }

      const heroPool = getPhotoPool(sport, "hero")
      const aboutPool = getPhotoPool(sport, "about")
      const heroPhoto = row.hero_photo || heroPool[count % heroPool.length]
      const aboutPhoto = row.about_photo || aboutPool[count % aboutPool.length]

      const config = {
        meta: {
          title: `${row.name} ${sport} Coaching — ${county} County, FL`,
          description: `Professional ${sport.toLowerCase()} coaching in ${row.city || county}, FL. ${row.specialty || "Skills training, group camps, and game planning for youth and high school athletes."}`,
        },
        layout: row.layout || "A",
        about: {
          name: `Coach ${row.name}`,
          city: row.city,
          county,
          sport,
          specialty: row.specialty || undefined,
          years_experience: row.years_experience ? parseInt(row.years_experience) : undefined,
          age_groups: row.age_groups || undefined,
          photo: aboutPhoto,
        },
        hero: {
          headline: row.tagline_override || `${county} County's Premier ${sport} Coach`,
          photo: heroPhoto,
        },
        contact: {
          phone: row.phone || undefined,
          email: row.email || undefined,
          booking_url: row.booking_url || "#contact",
        },
        ...existing,
        design,
        copy_variants: copyVariants,
      }

      fs.writeFileSync(existingPath, JSON.stringify(JSON.parse(JSON.stringify(config)), null, 2))
      count++
    }

    fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2))
    console.log(`\nDone — ${count} config(s) written`)
  })
