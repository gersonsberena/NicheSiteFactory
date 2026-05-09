#!/usr/bin/env node
/**
 * Syncs prospects/fb-coaches.csv with the coach config system.
 *
 * Workflow:
 *   1. Read fb-coaches.csv and find rows with first_name + last_name but no json_generated
 *   2. Create prospects/configs/{first-last}.json from the Aaron template
 *   3. Write back: json_generated date, demo_site_link, outreach_message
 *
 * Usage:
 *   node scripts/sync-fb-coaches.js           # process all pending rows
 *   node scripts/sync-fb-coaches.js --init    # create the CSV if it doesn't exist
 */

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const CSV_PATH = path.join(__dirname, "../prospects/fb-coaches.csv");
const CONFIGS_DIR = path.join(__dirname, "../prospects/configs");
const TEMPLATE_PATH = path.join(__dirname, "../prospects/configs/aaron.json");
const DEMO_BASE_URL = "https://coachsites.vercel.app";

const COLUMNS = [
  "facebook group",
  "facebook link",
  "first_name",
  "last_name",
  "city",
  "json_generated",
  "demo_site_link",
  "outreach_message",
  "message_sent",
  "results",
];

// --- CSV helpers ---

function quoteCsvField(val) {
  const s = String(val ?? "");
  // Quote if the value contains comma, newline, or double-quote
  if (s.includes(",") || s.includes("\n") || s.includes('"')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function rowToCsvLine(row) {
  return COLUMNS.map((col) => quoteCsvField(row[col] ?? "")).join(",");
}

function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

function writeCsv(filePath, rows) {
  const header = COLUMNS.join(",");
  const lines = rows.map(rowToCsvLine);
  fs.writeFileSync(filePath, [header, ...lines].join("\n") + "\n", "utf8");
}

// --- Business logic ---

function buildOutreachMessage(firstName, link) {
  return (
    `Hey Coach ${firstName}! \n\n` +
    `I build websites for football coaches and put together a quick demo of what yours could look like — ` +
    `with your programs, photos/videos, and a way for new clients to find and contact you. ` +
    `Take a look: ${link}. \n\n` +
    `Everything on it is editable — your bio, services, color, branding, photos, contact info. ` +
    `From start to finish, we can have you live on your own domain in 5 days.\n\n` +
    `Would love to hear what you think:\n` +
    `A) Interested — let's talk\n` +
    `B) Tell me more\n` +
    `C) No thanks\n\n` +
    `No pressure at all, but if you like it and want to talk, I'm here to help!\n` +
    `Gerson Berena\n` +
    `651 955 9126`
  );
}

function toSlug(first, last) {
  return `${first} ${last}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toCoachName(first, last) {
  return `Coach ${first} ${last}`.trim();
}

// --- Main ---

async function main() {
  const initOnly = process.argv.includes("--init");

  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, COLUMNS.join(",") + "\n", "utf8");
    console.log("📄  Created: prospects/fb-coaches.csv");
    if (initOnly) {
      console.log("✅  Add rows (first_name, last_name, optional city) then run without --init.");
    }
  } else if (initOnly) {
    console.log("✅  prospects/fb-coaches.csv already exists.");
  }

  if (initOnly) return;

  const rows = await readCsv(CSV_PATH);

  if (rows.length === 0) {
    console.log("ℹ️  No rows found. Add first_name + last_name to fb-coaches.csv and re-run.");
    return;
  }

  const template = JSON.parse(fs.readFileSync(TEMPLATE_PATH, "utf8"));
  let created = 0;
  let skipped = 0;
  let alreadyDone = 0;

  const updatedRows = rows.map((row) => {
    const first = (row.first_name ?? "").trim();
    const last = (row.last_name ?? "").trim();

    if (!first || !last) {
      skipped++;
      return row;
    }

    if (row.json_generated) {
      alreadyDone++;
      return row;
    }

    const slug = toSlug(first, last);
    const coachName = toCoachName(first, last);
    const city = (row.city ?? "").trim() || "Your Area";
    const configPath = path.join(CONFIGS_DIR, `${slug}.json`);
    const demoUrl = `${DEMO_BASE_URL}/${slug}`;

    if (!fs.existsSync(configPath)) {
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
          county: city === "Your Area" ? "Your County" : "",
        },
        hero: {
          ...template.hero,
          headline: `${city}'s Premier Football Coach`,
        },
        testimonials: template.testimonials.map((t) => ({
          ...t,
          quote: t.quote
            .replace(/Coach Aaron/g, coachName)
            .replace(/\bAaron\b/g, first),
        })),
        _source: {
          platform: "facebook",
          created_at: new Date().toISOString(),
        },
      };
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log(`  ✅  ${coachName}  →  ${demoUrl}`);
    } else {
      console.log(`  ⚠️  Config exists for ${slug} — updating CSV row only`);
    }

    created++;
    return {
      ...row,
      json_generated: new Date().toLocaleDateString("en-US"),
      demo_site_link: demoUrl,
      outreach_message: buildOutreachMessage(first, demoUrl),
    };
  });

  writeCsv(CSV_PATH, updatedRows);

  console.log();
  console.log(
    `📊  Done — ${created} created, ${alreadyDone} already done, ${skipped} skipped (missing name)`
  );
  console.log(`📄  Updated: prospects/fb-coaches.csv`);
}

main().catch((err) => {
  console.error("❌ ", err.message);
  process.exit(1);
});
