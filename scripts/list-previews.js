/**
 * list-previews.js
 *
 * Prints clickable localhost links for every coach config.
 *
 * Usage:
 *   node scripts/list-previews.js 3000
 *   node scripts/list-previews.js 3001
 */

const fs = require("fs")
const path = require("path")

const port = process.argv[2]
if (!port || isNaN(port)) {
  console.error("Usage: node scripts/list-previews.js <port>")
  console.error("Example: node scripts/list-previews.js 3000")
  process.exit(1)
}

const CONFIGS_DIR = path.join(__dirname, "../prospects/configs")
const files = fs.readdirSync(CONFIGS_DIR).filter((f) => f.endsWith(".json")).sort()

if (files.length === 0) {
  console.log("No configs found in prospects/configs/")
  process.exit(0)
}

console.log(`\n${files.length} coach sites — http://localhost:${port}\n`)
console.log("─".repeat(60))

files.forEach((file, i) => {
  const slug = file.replace(".json", "")
  let name = slug
  try {
    const config = JSON.parse(fs.readFileSync(path.join(CONFIGS_DIR, file), "utf8"))
    name = config.about?.name || slug
  } catch {}

  const num = String(i + 1).padStart(2, " ")
  console.log(`${num}. ${name.padEnd(32)} http://localhost:${port}/?coach=${slug}`)
})

console.log("─".repeat(60))
console.log(`\nTotal: ${files.length} sites\n`)
