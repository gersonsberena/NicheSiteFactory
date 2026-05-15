const fs = require("fs")
const path = require("path")

const IN_PATH = path.join(__dirname, "../prospects/cleaned-coaches.json")
const OUT_DIR = path.join(__dirname, "../prospects/configs")
const INDEX_PATH = path.join(__dirname, "../prospects/prospect-index.json")
const REGISTRY_PATH = path.join(__dirname, "../prospects/registry.json")

// --- Design variation pools (mirrors generate-configs.js) ---
const DESIGN_KEYS_POOL = {
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
  font_pair: ["bebas-inter", "oswald-inter", "bebas-poppins", "oswald-poppins", "bebas-roboto"],
}

// Layouts cycle in this order for variety; no J
const LAYOUTS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M"]

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickDesign() {
  const d = {}
  for (const [key, opts] of Object.entries(DESIGN_KEYS_POOL)) d[key] = randomPick(opts)
  return d
}

// --- State name lookup ---
const STATE_NAMES = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",
  CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",
  HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",
  KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",
  MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",
  MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",
  NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",
  OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",
  SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",
  VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming",
}

// --- Scheme short labels ---
function schemeShort(scheme) {
  if (!scheme) return "Multiple"
  const s = scheme.toLowerCase()
  if (s.includes("air raid") || s.includes("raid")) return "Air Raid"
  if (s.includes("wing") || s.includes("wing-t")) return "Wing-T"
  if (s.includes("spread")) return "Spread"
  if (s.includes("flexbone") || s.includes("flex")) return "Flexbone"
  if (s.includes("pro style") || s.includes("pro-style")) return "Pro Style"
  if (s.includes("triple option") || s.includes("option")) return "Option"
  if (s.includes("pistol")) return "Pistol"
  if (s.includes("rpo")) return "RPO"
  if (s.includes("4-2-5") || s.includes("425")) return "4-2-5"
  if (s.includes("3-4") || s.includes("34 ")) return "3-4"
  if (s.includes("4-3") || s.includes("43 ")) return "4-3"
  if (s.includes("3-3") || s.includes("33 ")) return "3-3-5"
  if (s.includes("multiple")) return "Multiple"
  return scheme.split(/[/,]/)[0].trim().slice(0, 12)
}

function sideLabel(source) {
  if (source === "both") return "FULL GAME"
  if (source === "defensive") return "DEFENSE"
  return "OFFENSE"
}

// --- Bio generation ---
function generateBio(coach) {
  const { first_name, last_name, full_name, state, school, position, scheme, scheme_defense, experience, source, levels } = coach
  const stateName = STATE_NAMES[state] || state || "the area"
  const xp = experience ? `${experience} years of` : "years of"
  const schoolStr = school ? ` at ${school}` : ` in ${stateName}`
  const levelsStr = levels && levels.length ? ` Works with athletes at the ${levels.join(", ")} level.` : ""
  const schemeOff = scheme ? schemeShort(scheme) : null
  const schemeDef = scheme_defense ? schemeShort(scheme_defense) : null

  if (source === "both") {
    const offStr = schemeOff ? ` with expertise in ${schemeOff} offensive systems` : ""
    const defStr = schemeDef ? ` and ${schemeDef} defensive principles` : ""
    return `Coach ${full_name} is a complete football mind with ${xp} experience on both sides of the ball${schoolStr}. A rare coaching profile, ${first_name} brings depth${offStr}${defStr} — giving athletes a holistic understanding of the game that most coaches simply can't offer.${levelsStr}\n\nWhether working with skill positions or defensive personnel, Coach ${last_name} brings an all-encompassing approach to player development that shows up on the scoreboard.`
  }

  if (source === "defensive") {
    const schemeStr = schemeDef ? `a proven ${schemeDef} specialist` : "a defensive football specialist"
    return `Coach ${full_name} is ${schemeStr} with ${xp} coaching experience${schoolStr}. Known for a disciplined, film-first approach, Coach ${last_name} develops intelligent, technically sound players who make an impact on every down.${levelsStr}\n\nIf you're looking to elevate your game on the defensive side of the ball and compete at the next level, Coach ${last_name}'s coaching is where that journey starts.`
  }

  // Offensive default
  const schemeStr = schemeOff ? `the ${schemeOff} system` : "a dynamic offensive system"
  return `Coach ${full_name} brings ${xp} experience running ${schemeStr}${schoolStr}. With a sharp offensive mind and a track record of developing athletes who perform at the next level, Coach ${last_name} is known for making practice reps count.${levelsStr}\n\nFrom route running to pre-snap reads to protection schemes — Coach ${last_name} delivers the kind of coaching that shows up in the box score.`
}

// --- Stats generation ---
function generateStats(coach) {
  const xp = coach.experience
  const scheme = coach.source === "defensive" ? coach.scheme_defense : coach.scheme
  const schemeLabel = schemeShort(scheme || "")
  const sideStr = coach.source === "defensive" ? "Defense" : coach.source === "both" ? "Full Game" : "Offense"
  const baseAthletes = xp ? Math.min(Math.max(xp * 15, 30), 500) : 100

  return [
    { value: xp ? `${xp}+` : "10+", label: "Years Coaching" },
    { value: schemeLabel, label: `${sideStr} System` },
    { value: `${baseAthletes}+`, label: "Athletes Coached" },
  ]
}

// --- Services generation ---
const PARENT_NAMES = ["Sandra","Marcus","David","Jennifer","Robert","Angela","Kevin","Denise","Brian","Cheryl"]
const ATHLETE_NAMES = ["Deon","Tyler","Marcus","Jaylen","Caleb","Devon","Isaiah","Malik","Jordan","Chase"]
const LAST_INITIALS = ["K","T","R","M","S","W","B","H","J","P","C"]

function fakeName(pool) {
  return `${pool[Math.floor(Math.random() * pool.length)]}. ${LAST_INITIALS[Math.floor(Math.random() * LAST_INITIALS.length)]}.`
}

function generateServices(coach) {
  const { source, scheme, scheme_defense, position } = coach
  const schOff = scheme ? schemeShort(scheme) : null
  const schDef = scheme_defense ? schemeShort(scheme_defense) : null

  if (source === "both") {
    return [
      { title: "Complete Football Development", description: `A full-game coaching program covering both offensive concepts${schOff ? ` (${schOff})` : ""} and defensive principles${schDef ? ` (${schDef})` : ""}. Perfect for athletes and coaches who want the complete picture.`, price: "Contact for pricing" },
      { title: "Film Study & Game Planning", description: "In-depth film breakdown on both sides of the ball — opponent tendencies, scheme adjustments, and game-week preparation.", price: "Contact for pricing" },
      { title: "Individual Skill Coaching", description: "One-on-one sessions targeting your specific position needs, from technique to football IQ and mental reps.", price: "Contact for pricing" },
    ]
  }

  if (source === "defensive") {
    const schemeLabel = schDef || "Multiple"
    const services = [
      { title: `${schemeLabel} Defense Installation`, description: `Full ${schemeLabel} system installation — formations, assignments, stunts, and blitz packages tailored to your personnel.`, price: "Contact for pricing" },
      { title: "Film & Opponent Scouting", description: "Tendency charting, defensive game-planning, and film breakdown sessions that give your defense the edge before kickoff.", price: "Contact for pricing" },
      { title: "Linebacker & Secondary Development", description: "Position-specific coaching for front-seven and DB players — gap control, coverage technique, communication, and tackling.", price: "Contact for pricing" },
    ]
    if (position && position.toUpperCase().includes("DL")) {
      services[2] = { title: "Defensive Line Technique", description: "Hand placement, leverage, pass rush moves, and gap discipline for DL players who want to dominate at the line of scrimmage.", price: "Contact for pricing" }
    }
    return services
  }

  // Offensive
  const schemeLabel = schOff || "Multiple"
  const services = [
    { title: `${schemeLabel} System Coaching`, description: `Installation and development of the ${schemeLabel} offense — from core concepts to advanced adjustments that put defenses in conflict.`, price: "Contact for pricing" },
    { title: "Skill Position Development", description: "Individual coaching for QBs, WRs, RBs, and TEs focused on technique, route running, footwork, and pre-snap reads.", price: "Contact for pricing" },
    { title: "Offensive Playbook & Film Study", description: "Playbook design tailored to your personnel, plus film sessions that sharpen in-game decision making for players and staff.", price: "Contact for pricing" },
  ]
  return services
}

// --- Testimonials (plausible placeholders) ---
function generateTestimonials(coach) {
  const { last_name, scheme, scheme_defense, source } = coach
  const schStr = source === "defensive"
    ? (scheme_defense ? schemeShort(scheme_defense) : "defensive")
    : (scheme ? schemeShort(scheme) : "offensive")

  return [
    {
      quote: `Coach ${last_name} changed the way my son sees the game. His knowledge of the ${schStr} system is the real deal.`,
      name: fakeName(PARENT_NAMES),
      role: "Parent",
      rating: 5,
    },
    {
      quote: `Playing for Coach ${last_name} was the best development I've had. He doesn't just teach plays — he teaches the game.`,
      name: fakeName(ATHLETE_NAMES),
      role: "Former Player",
      rating: 5,
    },
  ]
}

// --- Copy variants with state flavor ---
const COPY_VARIANTS_BY_REGION = {
  SEC: {
    states: ["AL","GA","MS","TN","KY","SC","AR","LA"],
    marquee: "TRAIN HARD ★ SEC COUNTRY ★ WIN ★ ",
    hero_tagline: "BUILT IN SEC COUNTRY.",
    about_tagline: "WHERE FOOTBALL IS A WAY OF LIFE.",
  },
  FNL: {
    states: ["TX","OK"],
    marquee: "FRIDAY NIGHTS ★ CHAMPIONSHIP CULTURE ★ WIN ★ ",
    hero_tagline: "WHERE FRIDAY NIGHTS MEAN EVERYTHING.",
    about_tagline: "CHAMPIONS ARE BUILT HERE.",
  },
  FL: {
    states: ["FL"],
    marquee: "SUNSHINE STATE FOOTBALL ★ YEAR-ROUND GRIND ★ ",
    hero_tagline: "YEAR-ROUND FOOTBALL WEATHER.",
    about_tagline: "THE SUNSHINE STATE'S FINEST COACHING.",
  },
  RUST: {
    states: ["OH","MI","PA","IN","WV"],
    marquee: "RUST BELT TOUGH ★ TRAIN HARD ★ WIN ★ ",
    hero_tagline: "WHERE THE GAME WAS BUILT.",
    about_tagline: "BLUE-COLLAR COACHING. CHAMPIONSHIP RESULTS.",
  },
  WEST: {
    states: ["CA","OR","WA","AZ","NV"],
    marquee: "WEST COAST FOOTBALL ★ YEAR-ROUND SEASON ★ WIN ★ ",
    hero_tagline: "YEAR-ROUND TRAINING SEASON.",
    about_tagline: "ELITE COACHING ON THE WEST COAST.",
  },
  MIDWEST: {
    states: ["IL","MO","KS","MN","IA","WI","NE","ND","SD"],
    marquee: "MIDWEST TOUGH ★ TRAIN HARD ★ WIN ★ ",
    hero_tagline: "BLUE-COLLAR FOOTBALL COUNTRY.",
    about_tagline: "HARD WORK BEATS TALENT WHEN TALENT DOESN'T WORK HARD.",
  },
  DEFAULT: {
    states: [],
    marquee: "TRAIN HARD ★ PLAY HARD ★ WIN ★ ",
    hero_tagline: "ELEVATE YOUR GAME.",
    about_tagline: "CHAMPIONS ARE MADE IN THE DETAILS.",
  },
}

function getCopyVariants(coach) {
  const { state, source, scheme, scheme_defense, experience } = coach
  let region = COPY_VARIANTS_BY_REGION.DEFAULT
  for (const [key, r] of Object.entries(COPY_VARIANTS_BY_REGION)) {
    if (key === "DEFAULT") continue
    if (r.states.includes(state)) { region = r; break }
  }

  const schStr = source === "defensive"
    ? (scheme_defense ? schemeShort(scheme_defense) : "Football")
    : (scheme ? schemeShort(scheme) : "Football")
  const xpStr = experience ? `${experience} years` : "over a decade"

  return {
    hero_tagline: region.hero_tagline,
    hero_availability: "Training Slots · Now Open",
    about_tagline: region.about_tagline,
    about_quote: `The game is won or lost long before kickoff. ${xpStr} of coaching ${schStr} taught me that.`,
    services_tagline: "TRAINING THAT DELIVERS.",
    services_subline: "Focused coaching. Real development. Every athlete leaves better than they arrived.",
    testimonials_tagline: "PROOF ON THE FIELD.",
    testimonials_eyebrow: "What Athletes Are Saying",
    contact_offer: "Free 30-minute intro session. Bring your goals — leave with a plan.",
    contact_urgency: "Training slots fill fast. Reach out today and lock in your slot.",
    gallery_label: "On the Field",
    marquee_text: region.marquee,
  }
}

// --- Cloudinary photo pool (football stock) ---
function heroPhoto(idx) {
  const n = String((idx % 10) + 1).padStart(2, "0")
  return `https://res.cloudinary.com/dpoxuerjj/image/upload/nsf/stock/football/hero/hero-${n}.jpg`
}
function aboutPhoto(idx) {
  const n = String((idx % 10) + 1).padStart(2, "0")
  return `https://res.cloudinary.com/dpoxuerjj/image/upload/nsf/stock/football/about/about-${n}.jpg`
}
function galleryPhotos(idx) {
  // 6 photos alternating about/hero pools, offset +1 so they differ from the hero/about images
  const photos = []
  for (let j = 0; j < 6; j++) {
    const n = String(((idx + j + 1) % 10) + 1).padStart(2, "0")
    const folder = j % 2 === 0 ? "about" : "hero"
    photos.push(`https://res.cloudinary.com/dpoxuerjj/image/upload/nsf/stock/football/${folder}/${folder}-${n}.jpg`)
  }
  return photos
}

// --- Main ---
if (!fs.existsSync(IN_PATH)) {
  console.error(`Run parse-fblist.js first: ${IN_PATH} not found`)
  process.exit(1)
}
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

const coaches = JSON.parse(fs.readFileSync(IN_PATH, "utf8"))
let registry = { counties: {} }
try { registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8")) } catch {}

const prospectIndex = {} // email → slug
let written = 0, skipped = 0

for (let i = 0; i < coaches.length; i++) {
  const coach = coaches[i]
  const { slug, email, state, school, full_name } = coach
  const outPath = path.join(OUT_DIR, `${slug}.json`)

  // Don't overwrite manually tweaked configs
  if (fs.existsSync(outPath)) {
    let existing = {}
    try { existing = JSON.parse(fs.readFileSync(outPath, "utf8")) } catch {}
    if (existing._source?.manually_tweaked) {
      console.log(`⏭  ${slug}.json — manually tweaked, skipping`)
      prospectIndex[email] = slug
      skipped++
      continue
    }
  }

  const stateKey = `prospect-${state || "XX"}`
  if (!registry.counties[stateKey]) registry.counties[stateKey] = { used_combo_ids: [], assigned_combos: {} }

  const layout = "A"
  const design = pickDesign()
  design.stats_layout = "compact"
  const copyVariants = getCopyVariants(coach)
  const stateName = STATE_NAMES[state] || state || "the area"
  const city = school || stateName

  const config = {
    meta: {
      title: `Coach ${full_name} | Football Coaching — ${stateName}`,
      description: `Professional football coaching${school ? ` at ${school}` : ` in ${stateName}`}. ${coach.source === "defensive" ? "Defensive" : "Offensive"} expertise, personalized training, and real results.`,
    },
    layout,
    about: {
      name: `Coach ${full_name}`,
      title: coach.position || (coach.source === "defensive" ? "Defensive Coordinator" : "Offensive Coordinator"),
      city: city,
      county: "",
      state: state || "",
      sport: "Football",
      specialty: coach.source === "both"
        ? "Offense & Defense"
        : coach.source === "defensive"
          ? `${schemeShort(coach.scheme_defense) || "Defensive"} Coordinator`
          : `${schemeShort(coach.scheme) || "Offensive"} Coordinator`,
      years_experience: coach.experience || null,
      age_groups: coach.levels ? coach.levels.join(", ") : "Youth, High School",
      photo: aboutPhoto(i),
      credentials: coach.position ? [coach.position] : [],
      bio: generateBio(coach),
    },
    hero: {
      headline: school
        ? `${school}'s Football Coach`
        : `${stateName} Football Coach`,
      subline: `Personalized ${coach.source === "defensive" ? "defensive" : "offensive"} football coaching that turns potential into performance.`,
      photo: heroPhoto(i),
      cta_text: "Book a Free Session",
      cta_url: "#contact",
    },
    stats: generateStats(coach),
    services: generateServices(coach),
    testimonials: generateTestimonials(coach),
    gallery: { photos: galleryPhotos(i) },
    contact: {
      phone: coach.cell || null,
      email: coach.email,
      instagram: null,
      twitter: coach.twitter || null,
      youtube: null,
    },
    design,
    copy_variants: copyVariants,
    _source: {
      platform: "fblist",
      source_tab: coach.source,
      created_at: new Date().toISOString(),
      manually_tweaked: false,
    },
  }

  fs.writeFileSync(outPath, JSON.stringify(config, null, 2))
  prospectIndex[email] = slug
  written++

  const schemeDisplay = coach.source === "defensive" ? coach.scheme_defense : coach.scheme
  console.log(`✨ ${slug}.json — ${state || "??"} | ${coach.source} | ${schemeDisplay || "multiple"} | layout ${layout}`)
}

fs.writeFileSync(INDEX_PATH, JSON.stringify(prospectIndex, null, 2))
fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2))

console.log(`\nDone — ${written} configs written, ${skipped} skipped`)
console.log(`Index written to: ${INDEX_PATH}`)

function schemeShort(scheme) {
  if (!scheme) return "Multiple"
  const s = scheme.toLowerCase()
  if (s.includes("air raid") || s.includes("raid")) return "Air Raid"
  if (s.includes("wing") || s.includes("wing-t")) return "Wing-T"
  if (s.includes("spread")) return "Spread"
  if (s.includes("flexbone") || s.includes("flex")) return "Flexbone"
  if (s.includes("pro style") || s.includes("pro-style")) return "Pro Style"
  if (s.includes("triple option") || s.includes("option")) return "Option"
  if (s.includes("pistol")) return "Pistol"
  if (s.includes("rpo")) return "RPO"
  if (s.includes("4-2-5") || s.includes("425")) return "4-2-5"
  if (s.includes("3-4") || s.includes("34 ")) return "3-4"
  if (s.includes("4-3") || s.includes("43 ")) return "4-3"
  if (s.includes("3-3") || s.includes("33 ")) return "3-3-5"
  if (s.includes("multiple")) return "Multiple"
  return scheme.split(/[/,]/)[0].trim().slice(0, 12)
}
