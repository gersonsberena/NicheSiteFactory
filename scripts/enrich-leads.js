/**
 * enrich-leads.js
 *
 * Visits each coach's website from leads-raw.json to extract:
 *   - Email addresses
 *   - Instagram, Twitter/X, YouTube handles
 *
 * Usage:
 *   node scripts/enrich-leads.js
 *
 * Input:  data/leads-raw.json
 * Output: data/leads-enriched.json
 */

const fs = require("fs")
const path = require("path")
const https = require("https")
const http = require("http")

const RAW_FILE = path.join(__dirname, "../data/leads-raw.json")
const OUT_FILE = path.join(__dirname, "../data/leads-enriched.json")

// Domains to skip when extracting emails (false positives)
const EMAIL_BLOCKLIST = [
  "example.com", "sentry.io", "wixpress.com", "squarespace.com",
  "shopify.com", "amazonaws.com", "cloudflare.com", "google.com",
  "2x.png", "1x.png", ".jpg", ".png", ".gif",
]

function fetchHtml(url, timeoutMs = 10000) {
  return new Promise((resolve) => {
    const lib = url.startsWith("https") ? https : http
    const controller = { done: false }

    const req = lib.get(url, { timeout: timeoutMs }, (res) => {
      // Follow one redirect
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        if (controller.done) return
        controller.done = true
        fetchHtml(res.headers.location, timeoutMs).then(resolve)
        return
      }

      let html = ""
      res.on("data", (chunk) => {
        html += chunk
        if (html.length > 500_000) req.destroy() // don't download huge pages
      })
      res.on("end", () => {
        if (!controller.done) {
          controller.done = true
          resolve(html)
        }
      })
    })

    req.setTimeout(timeoutMs, () => {
      req.destroy()
      if (!controller.done) {
        controller.done = true
        resolve("")
      }
    })

    req.on("error", () => {
      if (!controller.done) {
        controller.done = true
        resolve("")
      }
    })
  })
}

function extractEmails(html) {
  const emailRegex = /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g
  const matches = html.match(emailRegex) || []
  return [
    ...new Set(
      matches.filter((e) => {
        const lower = e.toLowerCase()
        return !EMAIL_BLOCKLIST.some((blocked) => lower.includes(blocked))
      })
    ),
  ].slice(0, 3) // max 3 emails per site
}

function extractSocials(html) {
  const igMatch = html.match(/instagram\.com\/([A-Za-z0-9_.]{2,30})/)
  const twMatch = html.match(/(?:twitter\.com|x\.com)\/([A-Za-z0-9_]{1,30})/)
  const ytMatch = html.match(/youtube\.com\/(?:@([A-Za-z0-9_\-.]{2,30})|channel\/([A-Za-z0-9_\-]{10,40}))/)

  return {
    instagram_handle: igMatch ? igMatch[1] : null,
    twitter_handle: twMatch ? twMatch[1] : null,
    youtube_handle: ytMatch ? ytMatch[1] || ytMatch[2] : null,
  }
}

// Try to extract a person's name from business name
// "John Smith Football Training" → "John Smith"
// "Marcus QB Academy" → "Marcus"
function extractPersonName(businessName) {
  const stopWords = /\b(football|baseball|basketball|soccer|sports?|training|coach(ing)?|academy|elite|performance|athletics?|youth|florida|fl|llc|inc|the|and|of|&)\b/gi
  const cleaned = businessName.replace(stopWords, " ").replace(/\s+/g, " ").trim()
  const words = cleaned.split(" ").filter((w) => w.length > 1 && /^[A-Z]/.test(w))
  if (words.length >= 2) return words.slice(0, 2).join(" ")
  if (words.length === 1) return words[0]
  return businessName
}

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  if (!fs.existsSync(RAW_FILE)) {
    console.error("ERROR: data/leads-raw.json not found. Run scrape-leads.js first.")
    process.exit(1)
  }

  const raw = JSON.parse(fs.readFileSync(RAW_FILE, "utf8"))

  // Load existing enriched to resume
  let enriched = {}
  try {
    const existing = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"))
    enriched = Object.fromEntries(existing.map((l) => [l.place_id, l]))
    console.log(`Resuming — ${Object.keys(enriched).length} leads already enriched\n`)
  } catch {}

  let processed = 0
  let emailsFound = 0

  for (const lead of raw) {
    if (enriched[lead.place_id]) continue // already done

    const personName = extractPersonName(lead.name)
    const firstName = personName.split(" ")[0]
    const slug = toSlug(personName)

    const base = {
      ...lead,
      person_name: personName,
      first_name: firstName,
      slug,
      email: lead.email || null,
      emails_found: lead.emails_found || [],
      instagram_handle: null,
      twitter_handle: null,
      youtube_handle: null,
      enriched_at: new Date().toISOString(),
    }

    if (!lead.website) {
      enriched[lead.place_id] = base
      processed++
      continue
    }

    console.log(`Enriching: ${lead.name} → ${lead.website}`)

    const html = await fetchHtml(lead.website)

    if (html) {
      const emails = extractEmails(html)
      const socials = extractSocials(html)

      base.emails_found = emails
      base.email = emails[0] || null
      base.instagram_handle = socials.instagram_handle
      base.twitter_handle = socials.twitter_handle
      base.youtube_handle = socials.youtube_handle

      if (emails.length > 0) {
        emailsFound++
        console.log(`  ✓ email: ${emails[0]}`)
      } else {
        console.log(`  — no email found`)
      }
    } else {
      console.log(`  — site unreachable`)
    }

    enriched[lead.place_id] = base
    processed++

    // Save incrementally
    fs.writeFileSync(OUT_FILE, JSON.stringify(Object.values(enriched), null, 2))
    await delay(600) // be polite to websites
  }

  const total = Object.keys(enriched).length
  const withEmail = Object.values(enriched).filter((l) => l.email).length

  console.log(`\nDone — ${processed} leads processed`)
  console.log(`Emails found: ${emailsFound} new, ${withEmail} total`)
  console.log(`→ data/leads-enriched.json`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
