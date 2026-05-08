/**
 * send-outreach.js
 *
 * Sends personalized outreach emails to coaches who have:
 *   1. An email address (from enrichment)
 *   2. A generated demo site config (from create-prospect-configs.js)
 *
 * Usage (PowerShell):
 *   $env:GMAIL_USER="gerson.s.berena@gmail.com"
 *   $env:GMAIL_APP_PASSWORD="your-app-password"
 *   $env:DEMO_BASE_URL="https://firstcoastspotlight.com"   # or http://localhost:3000 for testing
 *   node scripts/send-outreach.js --limit=5
 *
 * Gmail App Password setup:
 *   1. Go to myaccount.google.com → Security → 2-Step Verification (must be ON)
 *   2. Then: myaccount.google.com/apppasswords
 *   3. Create one for "NicheSiteFactory", copy the 16-char password
 *
 * Input:  data/prospects-created.json
 * Output: data/outreach-log.json
 */

const fs = require("fs")
const path = require("path")
const nodemailer = require("nodemailer")

const TRACKING_FILE = path.join(__dirname, "../data/prospects-created.json")
const LOG_FILE = path.join(__dirname, "../data/outreach-log.json")

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD
const DEMO_BASE_URL = process.env.DEMO_BASE_URL || "http://localhost:3000"

// How many to send per run (safe default for testing)
const args = process.argv.slice(2)
const limitArg = args.find((a) => a.startsWith("--limit="))
const LIMIT = limitArg ? parseInt(limitArg.split("=")[1]) : 5

function buildEmail(prospect) {
  const { first_name, person_name, city, sport, slug } = prospect
  const demoUrl = `${DEMO_BASE_URL}/?coach=${slug}`
  const sport_lower = (sport || "sports").toLowerCase()

  const subject = `I made a free demo site for ${first_name || person_name}'s coaching`

  const html = `
<p>Hi ${first_name || person_name},</p>

<p>I came across your ${sport_lower} coaching work in ${city || "your area"} and built you a personalized demo website — no cost, just wanted to show you what it looks like:</p>

<p><strong><a href="${demoUrl}">👉 View your demo site here</a></strong></p>

<p>It's already set up with your name, sport, and location. Takes about 30 seconds to look at.</p>

<p>I build websites for coaches in Northeast Florida. If you like what you see, I can customize it further and get it live at <strong>${slug}.firstcoastspotlight.com</strong> — usually within a week.</p>

<p>No pressure either way — I just thought you might find it useful.</p>

<p>
Gerson<br>
First Coast Spotlight<br>
${GMAIL_USER}
</p>

<hr style="border:none;border-top:1px solid #eee;margin:20px 0">
<p style="font-size:12px;color:#999">
  You're receiving this because your coaching business appeared in a local search.
  If you don't want to hear from me, just reply "no thanks" and I won't contact you again.
</p>
`

  const text = `
Hi ${first_name || person_name},

I came across your ${sport_lower} coaching work in ${city || "your area"} and built you a personalized demo website:

${demoUrl}

It's already set up with your name, sport, and location. Takes about 30 seconds to look at.

I build websites for coaches in Northeast Florida. If you like what you see, I can customize it and get it live at ${slug}.firstcoastspotlight.com — usually within a week.

No pressure at all.

Gerson
First Coast Spotlight
${GMAIL_USER}

---
You're receiving this because your coaching business appeared in a local search.
Reply "no thanks" to be removed.
`.trim()

  return { subject, html, text }
}

async function main() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("ERROR: Set GMAIL_USER and GMAIL_APP_PASSWORD environment variables")
    console.error("")
    console.error("  PowerShell:")
    console.error('  $env:GMAIL_USER="gerson.s.berena@gmail.com"')
    console.error('  $env:GMAIL_APP_PASSWORD="xxxx xxxx xxxx xxxx"')
    console.error('  $env:DEMO_BASE_URL="https://firstcoastspotlight.com"')
    console.error("")
    console.error("  Gmail App Password: myaccount.google.com/apppasswords")
    process.exit(1)
  }

  if (!fs.existsSync(TRACKING_FILE)) {
    console.error("ERROR: data/prospects-created.json not found. Run create-prospect-configs.js first.")
    process.exit(1)
  }

  const prospects = Object.values(JSON.parse(fs.readFileSync(TRACKING_FILE, "utf8")))

  // Load send log
  let log = {}
  try {
    log = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"))
  } catch {}

  // Filter to unsent prospects that have an email
  const pending = prospects.filter((p) => p.email && !log[p.slug])

  if (pending.length === 0) {
    console.log("No new prospects to email. Everyone has already been contacted.")
    return
  }

  const batch = pending.slice(0, LIMIT)
  console.log(`${pending.length} pending, sending to ${batch.length} (limit: ${LIMIT})\n`)

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  })

  // Verify credentials before sending
  try {
    await transporter.verify()
    console.log("Gmail connection verified ✓\n")
  } catch (err) {
    console.error("Gmail auth failed:", err.message)
    console.error("Check your App Password at: myaccount.google.com/apppasswords")
    process.exit(1)
  }

  let sent = 0
  let failed = 0

  for (const prospect of batch) {
    const { subject, html, text } = buildEmail(prospect)

    console.log(`Sending to ${prospect.email} (${prospect.person_name}, ${prospect.city})...`)

    try {
      await transporter.sendMail({
        from: `"Gerson @ First Coast Spotlight" <${GMAIL_USER}>`,
        to: prospect.email,
        subject,
        text,
        html,
      })

      log[prospect.slug] = {
        slug: prospect.slug,
        email: prospect.email,
        name: prospect.person_name,
        sent_at: new Date().toISOString(),
        status: "sent",
      }

      fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2))
      console.log(`  ✓ sent`)
      sent++

      // Small delay between sends to avoid triggering spam filters
      await new Promise((r) => setTimeout(r, 2000))
    } catch (err) {
      console.error(`  ✗ failed: ${err.message}`)

      log[prospect.slug] = {
        slug: prospect.slug,
        email: prospect.email,
        name: prospect.person_name,
        sent_at: new Date().toISOString(),
        status: "failed",
        error: err.message,
      }

      fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2))
      failed++
    }
  }

  console.log(`\nDone — ${sent} sent, ${failed} failed`)
  console.log(`Log saved → data/outreach-log.json`)

  const totalSent = Object.values(log).filter((l) => l.status === "sent").length
  console.log(`Total sent all-time: ${totalSent}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
