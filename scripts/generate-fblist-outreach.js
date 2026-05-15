/**
 * generate-fblist-outreach.js
 *
 * Reads prospects/cleaned-coaches.json + prospects/prospect-index.json
 * and produces prospects/fblist-outreach.csv - the mail-merge spreadsheet
 * for the FBList prospecting campaign.
 *
 * Run order:
 *   1. node scripts/parse-fblist.js
 *   2. node scripts/generate-prospect-configs.js
 *   3. node scripts/generate-fblist-outreach.js
 */

const fs = require("fs")
const path = require("path")

const COACHES_PATH = path.join(__dirname, "../prospects/cleaned-coaches.json")
const INDEX_PATH = path.join(__dirname, "../prospects/prospect-index.json")
const OUT_PATH = path.join(__dirname, "../prospects/fblist-outreach.csv")

const SITE_BASE_URL = process.env.SITE_URL || "https://coachsites.vercel.app"

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

// Personalized regional opener lines (May / off-season context)
const REGIONAL_LINES = [
  {
    states: ["AL","GA","MS","TN","KY","SC","AR","LA"],
    line: (s) => `Hope things are going strong in ${STATE_NAMES[s] || s} - great football country out there, and I know coaches like you are already deep in summer prep mode.`,
  },
  {
    states: ["TX","OK"],
    line: (s) => `Hope everything is going well out in ${STATE_NAMES[s] || s} - you know better than most how serious football is there, and I'm sure the camp calendar is already packed.`,
  },
  {
    states: ["FL"],
    line: (s) => `Hope the Florida weather is treating you well - one of the perks of coaching in the Sunshine State is the year-round training season, and I know you take full advantage.`,
  },
  {
    states: ["OH","MI","PA","IN","WV"],
    line: (s) => `Hope the spring is treating you well in ${STATE_NAMES[s] || s} - football roots run deep out there and I know coaches like you don't really have an off-season.`,
  },
  {
    states: ["CA","OR","WA","AZ","NV"],
    line: (s) => `Hope training is going well out in ${STATE_NAMES[s] || s} - year-round football weather definitely has its advantages and I'm sure you're making the most of the spring window.`,
  },
  {
    states: ["IL","MO","KS","MN","IA","WI","NE","ND","SD"],
    line: (s) => `Hope the spring season is going well in ${STATE_NAMES[s] || s} - Midwest football is the real deal and I know coaches like you are already building toward fall.`,
  },
  {
    states: ["NY","NJ","MD","VA","CT","MA","RI","NH","VT","ME","DE"],
    line: (s) => `Hope things are going well in ${STATE_NAMES[s] || s} - spring ball is a great time to build, and I know coaches out there keep grinding between seasons.`,
  },
  {
    states: ["CO","ID","WY","MT","UT","NM"],
    line: (s) => `Hope the spring weather in ${STATE_NAMES[s] || s} is cooperating for outdoor work - nothing beats getting football reps in when the season opens up.`,
  },
]

function getRegionalLine(state) {
  for (const region of REGIONAL_LINES) {
    if (region.states.includes(state)) return region.line(state)
  }
  return `Hope all is well and the spring football prep is going smoothly - this is where real development happens.`
}

function schemeShort(scheme) {
  if (!scheme) return null
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
  if (s.includes("3-4")) return "3-4"
  if (s.includes("4-3")) return "4-3"
  if (s.includes("3-3")) return "3-3-5"
  if (s.includes("multiple")) return "Multiple"
  return scheme.split(/[/,]/)[0].trim().slice(0, 15)
}

function getSchemeDisplay(coach) {
  if (coach.source === "both") {
    const off = schemeShort(coach.scheme)
    const def = schemeShort(coach.scheme_defense)
    if (off && def) return `${off} offense / ${def} defense`
    return off || def || "both offense and defense"
  }
  if (coach.source === "defensive") return (schemeShort(coach.scheme_defense) || "defensive") + " football"
  return (schemeShort(coach.scheme) || "offensive") + " football"
}

function getSideBlurb(source) {
  if (source === "both") return "on both sides of the ball"
  if (source === "defensive") return "on the defensive side of the ball"
  return "on the offensive side of the ball"
}

// Three personal subject variants rotated by index — no school name (avoids "school should pay for this" flag)
const SUBJECTS = [
  (coach) => `Coach ${coach.last_name} - I built something for you`,
  (coach) => `${coach.first_name}, your coaching profile is ready`,
  (coach) => `I made a free coaching site for you, Coach ${coach.last_name}`,
]

function getSubject(coach, idx) {
  return SUBJECTS[idx % SUBJECTS.length](coach)
}

function buildEmailBody(coach, siteUrl) {
  const { first_name, last_name, state, school, source, experience } = coach
  const stateName = STATE_NAMES[state] || state || "your area"
  const greeting = getRegionalLine(state)
  const xp = experience ? `your ${experience}-year background in` : "your background in"
  const scheme = getSchemeDisplay(coach)
  const atSchool = school ? ` at ${school}` : ` in ${stateName}`
  const lastNameClean = last_name.toLowerCase().replace(/[^a-z]/g, "")

  return `Hi Coach ${first_name},

${greeting}

My name is Gerson, and I'm a web developer from Jacksonville, FL. I came across ${xp} ${scheme}${atSchool} and put together a free demo site for you.

I put your name right in the link so you know it was built specifically for you:

${siteUrl}

It's a demo, so the photos, write-up, and colors are placeholders - but the layout is built around your coaching profile so you can see what a real version would look like.

If you want to move forward, I'll build the real version with your own branding, your actual photos, and your bio in your own words. All you'd need is a domain - something like "coach${lastNameClean}.com" or whatever you prefer, as long as it's available. I'll handle the monthly maintenance, hosting, and updates so you can stay focused on your coaching.

I'm also waiving the setup fee since I'm still building my portfolio. My goal is to make sure you're completely satisfied with how the site looks and works before we make it live.

If you're interested and want to know more, just reply and maybe we can set up a quick discovery call to get started.

No pressure - just thought you'd enjoy seeing it.

Best,
Gerson Berena
(651) 955-9126
gerson.s.berena@gmail.com`
}

// CSV escaping (RFC 4180)
function csvCell(val) {
  const str = String(val === null || val === undefined ? "" : val)
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

// --- Main ---
if (!fs.existsSync(COACHES_PATH)) {
  console.error(`Run parse-fblist.js first - ${COACHES_PATH} not found`)
  process.exit(1)
}
if (!fs.existsSync(INDEX_PATH)) {
  console.error(`Run generate-prospect-configs.js first - ${INDEX_PATH} not found`)
  process.exit(1)
}

const coaches = JSON.parse(fs.readFileSync(COACHES_PATH, "utf8"))
const index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"))

const HEADERS = [
  "first_name","last_name","email","cell","state","school",
  "position","scheme","source","slug","mock_site_url",
  "email_subject","email_body","email_sent",
]

const lines = [HEADERS.join(",")]
let count = 0

for (let i = 0; i < coaches.length; i++) {
  const coach = coaches[i]
  const slug = index[coach.email] || coach.slug
  if (!slug) continue

  const siteUrl = `${SITE_BASE_URL}/${slug}`
  const subject = getSubject(coach, i)
  const body = buildEmailBody(coach, siteUrl)
  const scheme = coach.source === "defensive" ? coach.scheme_defense : coach.scheme

  lines.push([
    coach.first_name,
    coach.last_name,
    coach.email,
    coach.cell || "",
    coach.state || "",
    coach.school || "",
    coach.position || "",
    scheme || "",
    coach.source,
    slug,
    siteUrl,
    subject,
    body,
    "false",
  ].map(csvCell).join(","))
  count++
}

fs.writeFileSync(OUT_PATH, lines.join("\n"), "utf8")
console.log(`Done - ${count} rows written to: ${OUT_PATH}`)

// Print a few sample URLs
console.log("\nSample entries:")
const samples = coaches.slice(0, 3).map((c) => {
  const slug = index[c.email] || c.slug
  return `  ${c.first_name} ${c.last_name} (${c.state}) → ${SITE_BASE_URL}/${slug}`
})
samples.forEach((s) => console.log(s))
