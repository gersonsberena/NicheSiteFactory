#!/usr/bin/env node
/**
 * Creates a new coach demo site config from the Aaron template.
 *
 * Usage:
 *   node scripts/new-fb-coach.js --name="Marcus Williams"
 *   node scripts/new-fb-coach.js --name="Marcus Williams" --city="Jacksonville" --sport=soccer
 *   node scripts/new-fb-coach.js --name="Marcus Williams" --image="https://example.com/photo.jpg"
 */

const fs = require("fs");
const path = require("path");

// --- Parse args ---
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);

if (!args.name) {
  console.error("❌  --name is required. Example: --name=\"Marcus Williams\"");
  process.exit(1);
}

// --- Helpers ---
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/^coach\s+/i, "")        // strip leading "Coach " if present
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toCoachName(name) {
  const stripped = name.replace(/^coach\s+/i, "").trim();
  return `Coach ${stripped}`;
}

function firstName(coachName) {
  // "Coach Marcus Williams" → "Marcus"
  const parts = coachName.replace(/^Coach\s+/i, "").split(" ");
  return parts[0];
}

// --- Paths ---
const TEMPLATE_PATH = path.join(__dirname, "../prospects/configs/aaron.json");
const CONFIGS_DIR = path.join(__dirname, "../prospects/configs");

const coachName = toCoachName(args.name);
const slug = toSlug(args.name);
const outPath = path.join(CONFIGS_DIR, `${slug}.json`);

// --- Duplicate guard ---
if (fs.existsSync(outPath)) {
  console.warn(`⚠️  Already exists: prospects/configs/${slug}.json`);
  console.warn(`   Preview: http://localhost:3000/?coach=${slug}`);
  process.exit(0);
}

// --- Load template ---
const template = JSON.parse(fs.readFileSync(TEMPLATE_PATH, "utf8"));
const first = firstName(coachName);
const city = args.city ?? "Your Area";

// --- Build config ---
const config = {
  ...template,
  meta: {
    title: `${coachName} | Sports Performance Training`,
    description: `Professional sports coaching for youth and high school athletes. Personalized sessions focused on fundamentals, fitness, and game awareness.`,
  },
  about: {
    ...template.about,
    name: coachName,
    city,
    county: args.city ? "" : "Your County",
  },
  hero: {
    ...template.hero,
    headline: `${city}'s Premier Football Coach`,
    ...(args.image ? { photo: args.image } : {}),
  },
  testimonials: template.testimonials.map((t) => ({
    ...t,
    quote: t.quote.replace(/Coach Aaron/g, coachName).replace(/\bAaron\b/g, first),
  })),
  ...(args.image ? { about_photo: args.image } : {}),
  _source: {
    platform: "facebook",
    created_at: new Date().toISOString(),
  },
};

// Sport override: swap to generic sport copy when --sport provided
if (args.sport) {
  config.about.sport = args.sport.charAt(0).toUpperCase() + args.sport.slice(1);
}

// --- Write ---
fs.writeFileSync(outPath, JSON.stringify(config, null, 2));

console.log(`✅  Created: prospects/configs/${slug}.json`);
console.log(`   Coach:   ${coachName}`);
console.log(`   City:    ${city}`);
console.log(`   Preview: http://localhost:3000/${slug}`);
console.log();
console.log(`📋  Suggested DM:`);
console.log(`   "Hey ${first}! I put together a quick demo of what your coaching site`);
console.log(`   could look like — took me about 5 minutes. Check it out:`);
console.log(`   https://coachsites.vercel.app/${slug}`);
console.log(`   Happy to customize it with your info if you're interested."`);
