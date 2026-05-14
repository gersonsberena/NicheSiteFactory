#!/usr/bin/env node
/**
 * One-time migration: upload /public/stock/ images to Cloudinary,
 * then update all prospect configs to use Cloudinary URLs.
 *
 * Usage:
 *   node scripts/migrate-to-cloudinary.js          # live run
 *   node scripts/migrate-to-cloudinary.js --dry    # preview only, no uploads or file writes
 *
 * Requires in .env.local:
 *   CLOUDINARY_CLOUD_NAME=...
 *   CLOUDINARY_API_KEY=...
 *   CLOUDINARY_API_SECRET=...
 */

const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const path = require("path");

// Load .env.local manually (no dotenv dependency needed)
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .forEach((line) => {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    });
}

const DRY = process.argv.includes("--dry");
const STOCK_DIR = path.join(__dirname, "../public/stock");
const CONFIGS_DIR = path.join(__dirname, "../prospects/configs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.error("ERROR: CLOUDINARY_CLOUD_NAME not set. Check .env.local");
  process.exit(1);
}

// Recursively collect all image files under a directory
function collectImages(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectImages(fullPath));
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

// Convert absolute local path to public URL path: /stock/football/hero/hero-01.jpg
function toPublicPath(absPath) {
  return "/" + path.relative(path.join(__dirname, "../public"), absPath).replace(/\\/g, "/");
}

// Convert public path to Cloudinary public_id: nsf/stock/football/hero/hero-01
function toPublicId(publicPath) {
  const noLeadingSlash = publicPath.replace(/^\//, "");
  const noExt = noLeadingSlash.replace(/\.[^.]+$/, "");
  return "nsf/" + noExt;
}

async function uploadImage(absPath, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      absPath,
      { public_id: publicId, overwrite: false, resource_type: "image" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result.secure_url);
      }
    );
  });
}

async function main() {
  console.log(DRY ? "DRY RUN — no uploads or file writes\n" : "LIVE RUN\n");

  // Step 1: collect all stock images
  if (!fs.existsSync(STOCK_DIR)) {
    console.error(`ERROR: ${STOCK_DIR} does not exist`);
    process.exit(1);
  }
  const images = collectImages(STOCK_DIR);
  console.log(`Found ${images.length} images in /public/stock/\n`);

  // Step 2: upload each and build mapping
  const mapping = {}; // publicPath → cloudinaryUrl
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const absPath of images) {
    const publicPath = toPublicPath(absPath);
    const publicId = toPublicId(publicPath);

    if (DRY) {
      console.log(`  [dry] ${publicPath} → ${publicId}`);
      mapping[publicPath] = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
      uploaded++;
      continue;
    }

    try {
      const url = await uploadImage(absPath, publicId);
      mapping[publicPath] = url;
      uploaded++;
      process.stdout.write(`  ✓ ${publicPath}\n`);
    } catch (err) {
      // "already exists" error means overwrite:false worked — fetch existing URL
      if (err.http_code === 409 || (err.message && err.message.includes("already exists"))) {
        mapping[publicPath] = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
        skipped++;
        process.stdout.write(`  – ${publicPath} (already exists, skipped)\n`);
      } else {
        console.error(`  ✗ ${publicPath}: ${err.message}`);
        failed++;
      }
    }
  }

  console.log(`\nUpload complete: ${uploaded} uploaded, ${skipped} skipped, ${failed} failed`);

  if (failed > 0) {
    console.error("Some uploads failed — fix errors above before updating configs.");
    process.exit(1);
  }

  // Step 3: update all prospect configs
  const configFiles = fs.readdirSync(CONFIGS_DIR).filter((f) => f.endsWith(".json"));
  let configsUpdated = 0;
  let replacementsTotal = 0;

  for (const file of configFiles) {
    const filePath = path.join(CONFIGS_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    let content = raw;
    let replacements = 0;

    for (const [localPath, cloudUrl] of Object.entries(mapping)) {
      // Match both the exact path and with/without leading slash
      const escaped = localPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "g");
      const before = content;
      content = content.replace(regex, cloudUrl);
      if (content !== before) replacements++;
    }

    if (replacements > 0) {
      configsUpdated++;
      replacementsTotal += replacements;
      if (!DRY) {
        fs.writeFileSync(filePath, content, "utf8");
      }
      console.log(`  ${DRY ? "[dry] " : ""}Updated ${file} (${replacements} replacement${replacements > 1 ? "s" : ""})`);
    }
  }

  console.log(`\nConfigs updated: ${configsUpdated}/${configFiles.length} files, ${replacementsTotal} total replacements`);

  if (!DRY) {
    console.log("\nDone! Next steps:");
    console.log("  1. Verify coach sites load photos from Cloudinary");
    console.log("  2. Delete /public/stock/ to free Vercel deployment space");
    console.log("     → rm -rf public/stock   (or delete manually)");
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
