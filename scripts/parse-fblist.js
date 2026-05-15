const XLSX = require("xlsx")
const fs = require("fs")
const path = require("path")

const EXCEL_PATH = path.join(__dirname, "../prospects/FBList.xlsx")
const OUT_PATH = path.join(__dirname, "../prospects/cleaned-coaches.json")

const US_STATES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
])

function isStateCode(val) {
  return typeof val === "string" && US_STATES.has(val.trim().toUpperCase())
}

function normalizeEmail(val) {
  if (!val || typeof val !== "string") return null
  const trimmed = val.trim().toLowerCase()
  return trimmed.includes("@") && trimmed.includes(".") ? trimmed : null
}

function normalizeCell(val) {
  if (!val) return null
  const str = String(val).trim()
  // Reject if it's clearly not a phone (OFF, DEF, ST, etc.)
  if (/^(off|def|st|n\/a|na)$/i.test(str)) return null
  const digits = str.replace(/\D/g, "")
  if (digits.length === 10)
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  if (digits.length === 11 && digits[0] === "1")
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  return null
}

function parseExperience(val) {
  if (val === null || val === undefined || val === "") return null
  // Numeric from XLSX — valid range 1–50 years, reject Excel date serials
  if (typeof val === "number") return val >= 1 && val <= 50 ? Math.round(val) : null
  const str = String(val).trim()
  // Looks like a date string (YYYY-MM-DD) — reject
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) return null
  // Extract leading number
  const match = str.match(/^(\d+)/)
  if (match) {
    const n = parseInt(match[1])
    return n >= 1 && n <= 50 ? n : null
  }
  return null
}

function extractTwitter(notes) {
  if (!notes) return null
  const match = String(notes).match(/[Xx]:\s*@?(\w+)/)
  return match ? `@${match[1]}` : null
}

function titleCase(str) {
  if (!str || typeof str !== "string") return ""
  return str
    .trim()
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())
}

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

// --- Load workbook ---
if (!fs.existsSync(EXCEL_PATH)) {
  console.error(`File not found: ${EXCEL_PATH}`)
  process.exit(1)
}

const wb = XLSX.readFile(EXCEL_PATH)
const offSheet = wb.Sheets["offensive"]
const defSheet = wb.Sheets["defensive"]

if (!offSheet || !defSheet) {
  console.error('Could not find "offensive" and "defensive" tabs. Found:', wb.SheetNames)
  process.exit(1)
}

const offRows = XLSX.utils.sheet_to_json(offSheet, { defval: null })
const defRows = XLSX.utils.sheet_to_json(defSheet, { defval: null })

console.log(`Offensive tab: ${offRows.length} raw rows`)
console.log(`Defensive tab: ${defRows.length} raw rows`)

// --- Parse offensive rows ---
// Two formats exist in this tab:
//   Format A: t=STATE | Name of coach=Full Name | School | Position | Email | Cell | ...
//   Format B: t=FirstName | Name=LastName | School=StateCode | Position=City | Email | Cell=OFF/DEF | ...
function parseOffensiveRow(row) {
  const email = normalizeEmail(row["Email address"])
  if (!email) return null

  const colT = row["t"] != null ? String(row["t"]).trim() : null
  let state, firstName, lastName, school, position, cell

  if (colT && isStateCode(colT)) {
    // Format A
    state = colT.toUpperCase()
    const nameRaw = row["Name of coach"] ? String(row["Name of coach"]).trim() : ""
    const parts = nameRaw.split(/\s+/)
    firstName = titleCase(parts[0] || "")
    lastName = titleCase(parts.slice(1).join(" ") || "")
    school = row["School"] ? String(row["School"]).trim() : null
    position = row["Position you coach"] ? String(row["Position you coach"]).trim() : null
    cell = normalizeCell(row["Cell"])
  } else if (colT) {
    // Format B — first name is in "t", last name in "Name of coach", state in "School"
    firstName = titleCase(colT)
    lastName = titleCase(row["Name of coach"] ? String(row["Name of coach"]).trim() : "")
    const schoolVal = row["School"] ? String(row["School"]).trim() : ""
    state = isStateCode(schoolVal) ? schoolVal.toUpperCase() : null
    school = null // Position column has city in Format B, not a school name
    position = row["Other notes"] ? String(row["Other notes"]).trim() : null
    cell = null // Cell column has OFF/DEF in Format B
  } else {
    return null
  }

  if (!firstName && !lastName) return null

  // Level columns (offensive tab only)
  const levels = []
  if (row["COLLEGE"]) levels.push("College")
  if (row["VARSITY"]) levels.push("Varsity")
  if (row["JV/FROSH"]) levels.push("JV/Frosh")
  if (row["MID-SCHOOL"]) levels.push("Middle School")
  if (row["YOUTH (AGE)"]) levels.push("Youth")

  return {
    first_name: firstName,
    last_name: lastName,
    full_name: `${firstName} ${lastName}`.trim(),
    state: state || null,
    school: school || null,
    position: position || null,
    email,
    cell,
    scheme: row["Type of offense"] ? String(row["Type of offense"]).trim() : null,
    experience: parseExperience(row["Experience"]),
    twitter: extractTwitter(row["Other notes"]),
    levels: levels.length ? levels : null,
    source: "offensive",
    scheme_defense: null,
  }
}

// --- Parse defensive rows ---
function parseDefensiveRow(row) {
  const email = normalizeEmail(row["Email address"])
  if (!email) return null

  const stateVal = row["State"] ? String(row["State"]).trim() : null
  const state = stateVal && isStateCode(stateVal) ? stateVal.toUpperCase() : null

  const nameRaw = row["Name of coach"] ? String(row["Name of coach"]).trim() : ""
  const parts = nameRaw.split(/\s+/)
  const firstName = titleCase(parts[0] || "")
  const lastName = titleCase(parts.slice(1).join(" ") || "")

  if (!firstName && !lastName) return null

  return {
    first_name: firstName,
    last_name: lastName,
    full_name: `${firstName} ${lastName}`.trim(),
    state: state || null,
    school: row["School"] ? String(row["School"]).trim() : null,
    position: row["Position you coach"] ? String(row["Position you coach"]).trim() : null,
    email,
    cell: normalizeCell(row["Cell"]),
    scheme: null,
    scheme_defense: row["Type of defense"] ? String(row["Type of defense"]).trim() : null,
    experience: parseExperience(row["Experience"]),
    twitter: extractTwitter(row["Other notes"]),
    levels: null,
    source: "defensive",
  }
}

// --- Build deduped map keyed by email ---
const emailMap = new Map()
let offParsed = 0, defParsed = 0, intraTabDups = 0, crossTabMerges = 0

for (const row of offRows) {
  const coach = parseOffensiveRow(row)
  if (!coach) continue
  if (emailMap.has(coach.email)) {
    intraTabDups++
    continue
  }
  emailMap.set(coach.email, coach)
  offParsed++
}

for (const row of defRows) {
  const coach = parseDefensiveRow(row)
  if (!coach) continue
  if (emailMap.has(coach.email)) {
    const existing = emailMap.get(coach.email)
    if (existing.source === "offensive") {
      // Merge: this coach coaches both sides
      existing.source = "both"
      existing.scheme_defense = coach.scheme_defense || existing.scheme_defense
      if (!existing.state && coach.state) existing.state = coach.state
      if (!existing.school && coach.school) existing.school = coach.school
      if (!existing.cell && coach.cell) existing.cell = coach.cell
      crossTabMerges++
    } else {
      intraTabDups++
    }
    continue
  }
  emailMap.set(coach.email, coach)
  defParsed++
}

// --- Assign slugs, handle collisions ---
const slugSet = new Set()
// Pre-populate with existing configs to avoid collisions
const configsDir = path.join(__dirname, "../prospects/configs")
if (fs.existsSync(configsDir)) {
  for (const f of fs.readdirSync(configsDir)) {
    if (f.endsWith(".json")) slugSet.add(f.replace(".json", ""))
  }
}

const coaches = Array.from(emailMap.values())
for (const coach of coaches) {
  let base = toSlug(`${coach.first_name}-${coach.last_name}`)
  if (!base || base === "-") base = toSlug(coach.email.split("@")[0])
  let slug = base
  if (slugSet.has(slug)) {
    // Try appending state
    const withState = `${base}-${(coach.state || "xx").toLowerCase()}`
    slug = withState
    if (slugSet.has(slug)) {
      let i = 2
      while (slugSet.has(`${base}-${i}`)) i++
      slug = `${base}-${i}`
    }
  }
  slugSet.add(slug)
  coach.slug = slug
}

fs.writeFileSync(OUT_PATH, JSON.stringify(coaches, null, 2))

console.log("\n--- Results ---")
console.log(`  Offensive-only:    ${offParsed}`)
console.log(`  Defensive-only:    ${defParsed}`)
console.log(`  Both tabs (merged): ${crossTabMerges}`)
console.log(`  Duplicates skipped: ${intraTabDups}`)
console.log(`  Total usable coaches: ${coaches.length}`)
console.log(`  No state data:     ${coaches.filter((c) => !c.state).length}`)
console.log(`\nOutput written to: ${OUT_PATH}`)
