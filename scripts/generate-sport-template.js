#!/usr/bin/env node
/**
 * Usage:
 *   node scripts/generate-sport-template.js \
 *     --sport="Pickleball" \
 *     --category="individual_sport" \
 *     --specialty="Net Play & Serve Development" \
 *     --title="Head Pickleball Coach" \
 *     --tagline="SERVE HARD. PLAY SMART. WIN."
 *
 * Categories: team_sport | individual_sport | fitness_trainer
 * Output: templates/football-coach/sport-templates/{key}.json
 */

const fs = require("fs")
const path = require("path")

// ── Arg parsing ────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, "").split("=")
    return [k, v.join("=")]
  })
)

const sport    = args.sport
const category = args.category || "individual_sport"   // team_sport | individual_sport | fitness_trainer
const specialty = args.specialty || `${sport} Training`
const title    = args.title || `Head ${sport} Coach`
const tagline  = args.tagline || `TRAIN HARD. COMPETE HARDER. WIN.`
const credential = args.credential || `${sport} Coach`

if (!sport) {
  console.error("Error: --sport is required\n")
  console.error("Usage: node scripts/generate-sport-template.js --sport=\"Pickleball\" --category=\"individual_sport\" --specialty=\"Net Play & Serve Development\" --title=\"Head Pickleball Coach\" --tagline=\"SERVE HARD. PLAY SMART. WIN.\"")
  process.exit(1)
}

// ── Key normalization ──────────────────────────────────────────────────────────
function sportToKey(s) {
  return s.toLowerCase()
    .replace(/&/g, "and").replace(/\//g, "-")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

const key = sportToKey(sport)

// ── Template generation ────────────────────────────────────────────────────────
const isFitness = category === "fitness_trainer"

const stockBase = `/stock/${key}`

const sectionOrder = isFitness
  ? ["hero", "stats", "about", "packages", "testimonials", "gallery", "faq", "contact"]
  : ["hero", "stats", "about", "services", "testimonials", "gallery", "faq", "contact"]

const services = isFitness ? [] : [
  {
    title: `${sport} Fundamentals`,
    description: `Individual skill development session covering the core fundamentals of ${sport}. Personalized to your current level and goals.`,
  },
  {
    title: "Advanced Training",
    description: `Intermediate to advanced training focusing on competitive skills, decision-making, and performance under pressure.`,
  },
  {
    title: "Competition Prep",
    description: `Pre-season and competition preparation — strategy, film review, and conditioning to peak at the right time.`,
  },
]

const packages = isFitness ? [
  {
    title: "Starter Program",
    description: `4-week introductory program — assessment, goal setting, and foundational training tailored to your starting point.`,
    duration: "4 Weeks",
    sessions_per_week: 2,
    price: "$199",
    highlight: false,
  },
  {
    title: "Transformation Program",
    description: `12-week comprehensive program — progressive training, weekly check-ins, and structured progression toward your goals.`,
    duration: "12 Weeks",
    sessions_per_week: 3,
    price: "$449",
    highlight: true,
  },
  {
    title: "Ongoing Sessions",
    description: `Flexible monthly coaching — great for clients who want consistent accountability and individualized programming without a fixed program end date.`,
    duration: "Monthly",
    sessions_per_week: 2,
    price: "$199/mo",
    highlight: false,
  },
] : []

const template = {
  about: {
    title,
    bio: `I specialize in ${specialty.toLowerCase()} and work with athletes at every level — from beginners to competitive competitors. My coaching focuses on building the fundamentals, developing game intelligence, and giving athletes the skills and confidence to succeed.`,
    years_experience: 8,
    specialty,
    age_groups: "Youth · Teens · Adults",
    photo: `${stockBase}/about/about-01.jpg`,
    credentials: [credential, "CPR/AED Certified"],
    sport,
  },

  hero: {
    headline: `${sport} Coaching Built for Results.`,
    subline: `Private ${sport.toLowerCase()} coaching — skills development, competition prep, and personalized training for athletes ready to level up.`,
    photo: `${stockBase}/hero/hero-01.jpg`,
    cta_text: "Book a Free Consult",
  },

  stats: [
    { value: "100+", label: "Athletes Coached" },
    { value: "8", label: "Years Coaching" },
    { value: "4.9", label: "Avg Review" },
  ],

  ...(services.length ? { services } : { services: [] }),
  ...(packages.length ? { packages } : {}),

  section_order: sectionOrder,

  testimonials: [
    {
      quote: `The coaching made a real difference — I improved faster in a few weeks than I had in the past year on my own.`,
      name: "Alex R.",
      role: `${sport} Athlete`,
      rating: 5,
      photo: "",
    },
    {
      quote: `Great attention to detail, clear communication, and sessions that are challenging but totally doable. I highly recommend it.`,
      name: "Jordan M.",
      role: "Competitive Athlete",
      rating: 5,
      photo: "",
    },
  ],

  gallery: {
    photos: Array.from({ length: 6 }, (_, i) => `${stockBase}/gallery/gallery-0${i + 1}.jpg`),
  },

  success_stories: [
    {
      name: "Taylor S.",
      role: `${sport} Athlete`,
      story: `Taylor came in with raw talent but no structured training. We built a foundation, worked on the key skills, and prepared them for competition.`,
      result: "Significant Skill Improvement · Competition Ready · Ongoing Client",
    },
  ],

  faq: [
    {
      question: `Do I need prior experience to work with you?`,
      answer: `No — I coach all levels from beginners to competitive athletes. Every program starts with an assessment of where you are now.`,
    },
    {
      question: "Are sessions in-person or remote?",
      answer: "Both options are available. In-person sessions are held locally; remote coaching includes video analysis and weekly check-ins.",
    },
    {
      question: "How do I get started?",
      answer: "Reach out via the contact form for a free consultation. We'll talk about your goals and I'll recommend the best program for you.",
    },
    {
      question: "What equipment do I need?",
      answer: "I'll send a full equipment list after your initial consultation. Most athletes already have what they need.",
    },
  ],

  videos: [],

  copy_variants: {
    hero_tagline: tagline,
    hero_availability: "Coaching Spots · Now Available",
    about_tagline: `BUILT ON ${sport.toUpperCase()}. PROVEN IN COMPETITION.`,
    about_quote: `Every athlete has more in them than they think — the right coaching unlocks it.`,
    services_tagline: `${isFitness ? "PROGRAMS" : "TRAINING"} BUILT FOR YOUR GOALS.`,
    services_subline: `${isFitness ? "Choose the program that fits your goals and schedule." : `Focused ${sport.toLowerCase()} training tailored to your level and ambitions.`}`,
    testimonials_tagline: "ATHLETES WHO REACHED THEIR GOALS.",
    testimonials_eyebrow: "Athlete Stories",
    contact_offer: "Free 30-minute consult. Talk goals — leave with a plan.",
    contact_urgency: "Coaching spots are limited. Reach out today to get started.",
    gallery_label: "In Action",
    marquee_text: `${sport.toUpperCase()} ★ TRAIN HARD ★ COMPETE ★ WIN ★ `,
    c_hero_watermark_text: "",
    c_contact_reply_time: "Direct reply within 24 hours.",
    c_film_label: "Session 01 · Skills Review",
  },
}

// ── Write output ───────────────────────────────────────────────────────────────
const outDir = path.join(__dirname, "..", "templates", "football-coach", "sport-templates")
const outPath = path.join(outDir, `${key}.json`)

if (fs.existsSync(outPath)) {
  console.error(`Error: ${outPath} already exists. Delete it first if you want to regenerate.`)
  process.exit(1)
}

fs.writeFileSync(outPath, JSON.stringify(template, null, 2) + "\n")
console.log(`✓ Created ${outPath}`)
console.log(`\nNext steps:`)
console.log(`  1. Review and customize the content in sport-templates/${key}.json`)
console.log(`  2. Add import to app/admin/AdminClient.tsx`)
console.log(`  3. Add entry to SPORT_TEMPLATES map in AdminClient.tsx`)
console.log(`  4. Copy stock photos to public/stock/${key}/`)
