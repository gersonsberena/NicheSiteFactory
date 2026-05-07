#!/usr/bin/env node
/**
 * deploy.js — prints the manual steps to deploy a coach demo to Vercel.
 * Usage: node scripts/deploy.js --slug=john-smith
 *
 * Automated Vercel CLI deployment is deferred to post-MVP.
 */

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=")
    return [k, v]
  })
)

const slug = args.slug
if (!slug) {
  console.error("Usage: node scripts/deploy.js --slug=<coach-slug>")
  process.exit(1)
}

const subdomain = slug.replace(/-/g, "")
const projectName = slug

console.log(`
============================================================
  Deploy checklist for: ${slug}
  Subdomain: ${subdomain}.firstcoastspotlight.com
============================================================

1. VERCEL — Create project (if first time for this coach)
   ─────────────────────────────────────────────────────
   a. Go to vercel.com/new → Import Git Repository → NicheSiteFactory
   b. Project name: ${projectName}
   c. Root directory: (leave blank — project root)
   d. Add environment variable:
        COACH_SLUG = ${slug}
   e. Deploy

2. VERCEL — Add custom domain
   ─────────────────────────────────────────────────────
   a. Open project → Settings → Domains
   b. Add: ${subdomain}.firstcoastspotlight.com
   c. Vercel will show you a CNAME record to add

3. HOSTINGER — Add DNS record
   ─────────────────────────────────────────────────────
   a. Login to hpanel.hostinger.com
   b. Domains → firstcoastspotlight.com → DNS Zone
   c. Add record:
        Type:  CNAME
        Name:  ${subdomain}
        Value: cname.vercel-dns.com
        TTL:   3600
   d. Save — DNS propagates in 5–30 minutes

4. VERIFY
   ─────────────────────────────────────────────────────
   Open: https://${subdomain}.firstcoastspotlight.com
   Should render Coach ${slug}'s demo site.

============================================================
`)
