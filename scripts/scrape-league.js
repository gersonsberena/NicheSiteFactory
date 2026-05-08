/**
 * scrape-league.js
 *
 * Imports coach contacts from youth sports league/association directory pages.
 * These coaches have emails listed publicly — no website crawling needed.
 * Outputs directly to data/leads-enriched.json (skips the enrich step).
 *
 * Usage:
 *   node scripts/scrape-league.js
 *
 * To add more leagues: add an entry to LEAGUES with its coaches array.
 *
 * Output: data/leads-enriched.json (merged with existing)
 */

const fs = require("fs")
const path = require("path")

const DATA_DIR = path.join(__dirname, "../data")
const OUT_FILE = path.join(DATA_DIR, "leads-enriched.json")

// ─── League directories ───────────────────────────────────────────────────────
// Each league has metadata + a coaches array extracted from the directory page.
// Coaches are deduped by email (a coach who runs two teams appears once).

const LEAGUES = [
  {
    source: "sjmsaa-football",
    sport: "Football",
    county: "St. Johns",
    city: "St. Augustine",
    coaches: [
      { name: "Andy Williams",      email: "fcafalconsfootball@gmail.com", phone: "904-654-7592" },
      { name: "Anthony Darring",    email: "hcahurricane@gmail.com",       phone: null },
      { name: "Andy McKrackin",     email: "coachmac5751@gmail.com",       phone: "347-306-0657" },
      { name: "Jimmy McClenahen",   email: "pvabobcatsfootball@gmail.com", phone: "408-314-6319" },
      { name: "Wes Keller",         email: "wesleykeller98@gmail.com",     phone: "904-678-8912" },
      { name: "Travis Houston",     email: "silverleafcoach@yahoo.com",    phone: "904-868-3700" },
      { name: "Wayne Smith",        email: "smitty_2288@yahoo.com",        phone: "904-742-4091" },
      { name: "Rick Williams",      email: "Rickwilliamscaaflag@gmail.com",phone: "850-591-8022" },
      { name: "Artis Rollins",      email: "Artisrollins1906@gmail.com",   phone: "972-748-1492" },
      { name: "Cory Felton",        email: "Mustangscoach2026@gmail.com",  phone: null },
      { name: "Leo Calderon",       email: "Leocalderon0012@gmail.com",    phone: "904-504-6367" },
      { name: "Jarrel Wadley",      email: "JarrellWadley@gmail.com",      phone: "803-354-1127" },
      { name: "Jason Costa",        email: "Spmsvarsityfootball@gmail.com",phone: "904-614-4332" },
      { name: "Cason Blanco",       email: "casonblanco5@gmail.com",       phone: "904-392-7032" },
      { name: "Keon Perry",         email: "perry.keon2@gmail.com",        phone: "912-270-6966" },
      { name: "Kevin Patrick",      email: "kpatrick@sjccrusaders.org",    phone: "904-466-8737" },
      { name: "Mike Beauregard",    email: "mbeauregard79@gmail.com",      phone: "321-403-6776" },
      { name: "Jason Cutler",       email: "cutler25092@gmail.com",        phone: "904-325-4567" },
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function buildLead(coach, league) {
  const slug = toSlug(coach.name)
  const firstName = coach.name.split(" ")[0]

  return {
    place_id:        `league-${league.source}-${slug}`,
    name:            coach.name,
    person_name:     coach.name,
    first_name:      firstName,
    slug,
    address:         `${league.city}, FL`,
    city:            league.city,
    county:          league.county,
    state:           "FL",
    phone:           coach.phone,
    website:         null,
    email:           coach.email.toLowerCase(),
    emails_found:    [coach.email.toLowerCase()],
    instagram_handle: null,
    twitter_handle:  null,
    youtube_handle:  null,
    rating:          null,
    sport:           league.sport,
    search_query:    league.source,
    source:          "league-directory",
    scraped_at:      new Date().toISOString(),
    enriched_at:     new Date().toISOString(),
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

  // Load existing enriched leads
  let enriched = {}
  try {
    const existing = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"))
    enriched = Object.fromEntries(existing.map((l) => [l.place_id, l]))
    console.log(`Existing enriched leads: ${Object.keys(enriched).length}\n`)
  } catch {}

  let newCount = 0
  let skipped = 0

  for (const league of LEAGUES) {
    console.log(`League: ${league.source} (${league.coaches.length} coaches)`)

    for (const coach of league.coaches) {
      const lead = buildLead(coach, league)

      if (enriched[lead.place_id]) {
        console.log(`  ⏭  ${coach.name} — already exists`)
        skipped++
        continue
      }

      enriched[lead.place_id] = lead
      console.log(`  ✨ ${coach.name} (${coach.email})`)
      newCount++
    }
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(Object.values(enriched), null, 2))

  console.log(`\nDone — ${newCount} new coaches added, ${skipped} skipped`)
  console.log(`→ data/leads-enriched.json`)
  console.log(`\nNext: node scripts/create-prospect-configs.js`)
}

main()
