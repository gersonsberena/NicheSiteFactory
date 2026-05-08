const fs = require("fs")
const path = require("path")
const XLSX = require("xlsx")

const coaches = [
  { display: "Coach Aaron",           slug: "aaron" },
  { display: "Coach Alex",            slug: "alex" },
  { display: "Coach Andrew",          slug: "andrew" },
  { display: "Coach Andy McKrackin",  slug: "andy-mckrackin" },
  { display: "Coach Andy Williams",   slug: "andy-williams" },
  { display: "Coach Anthony Darring", slug: "anthony-darring" },
  { display: "Coach Anthony",         slug: "anthony" },
  { display: "Coach Artis Rollins",   slug: "artis-rollins" },
  { display: "Coach Benedy",          slug: "benedy" },
  { display: "Coach Brian",           slug: "brian" },
  { display: "Coach Cason Blanco",    slug: "cason-blanco" },
  { display: "Coach Christen",        slug: "christen" },
  { display: "Coach Christian",       slug: "christian" },
  { display: "Coach Cory Felton",     slug: "cory-felton" },
  { display: "Coach Dave",            slug: "dave" },
  { display: "Coach Dennis",          slug: "dennis" },
  { display: "Coach Donnell",         slug: "donnell" },
  { display: "Coach Eddie",           slug: "eddie" },
  { display: "Coach Elisha",          slug: "elisha" },
  { display: "Coach Gerald",          slug: "gerald" },
  { display: "Coach Jackson",         slug: "jackson" },
  { display: "Coach James",           slug: "james" },
  { display: "Coach Jarrel Wadley",   slug: "jarrel-wadley" },
  { display: "Coach Jason Costa",     slug: "jason-costa" },
  { display: "Coach Jason Cutler",    slug: "jason-cutler" },
  { display: "Coach Javier",          slug: "javier" },
  { display: "Coach JeVar",           slug: "jevar" },
  { display: "Coach Jimmy McClenahen",slug: "jimmy-mcclenahen" },
  { display: "Coach John Smith",      slug: "john-smith" },
  { display: "Coach John",            slug: "john" },
  { display: "Coach Johnny",          slug: "johnny" },
  { display: "Coach Jonathan",        slug: "jonathan" },
  { display: "Coach KEATON",          slug: "keaton" },
  { display: "Coach Kenneth",         slug: "kenneth" },
  { display: "Coach Keon Perry",      slug: "keon-perry" },
  { display: "Coach Kevin Patrick",   slug: "kevin-patrick" },
  { display: "Coach Kevin",           slug: "kevin" },
  { display: "Coach Larry",           slug: "larry" },
  { display: "Coach Leo Calderon",    slug: "leo-calderon" },
  { display: "Coach Lucas",           slug: "lucas" },
  { display: "Coach Marc-Antony",     slug: "marc-antony" },
  { display: "Coach Marsela",         slug: "marsela" },
  { display: "Coach Michael",         slug: "michael" },
  { display: "Coach Mike Beauregard", slug: "mike-beauregard" },
  { display: "Coach Noah",            slug: "noah" },
  { display: "Coach Rick Williams",   slug: "rick-williams" },
  { display: "Coach Rob",             slug: "rob" },
  { display: "Coach Robert",          slug: "robert" },
  { display: "Coach Roger",           slug: "roger" },
  { display: "Coach Rommel",          slug: "rommel" },
  { display: "Coach Scott",           slug: "scott" },
  { display: "Coach Stephen",         slug: "stephen" },
  { display: "Coach Rivera",          slug: "test-baseball" },
  { display: "Coach Torrance",        slug: "torrance" },
  { display: "Coach Travis Houston",  slug: "travis-houston" },
  { display: "Coach True",            slug: "true" },
  { display: "Coach Wayne Smith",     slug: "wayne-smith" },
  { display: "Coach Wes Keller",      slug: "wes-keller" },
  { display: "Coach William",         slug: "william" },
]

function getFirstName(display) {
  // "Coach Aaron" -> "Aaron", "Coach Andy McKrackin" -> "Andy"
  return display.replace(/^Coach\s+/i, "").split(/[\s-]/)[0]
}

function getMessage(firstName, vercelLink) {
  return `Hey ${firstName}, I'm Gerson — a web developer based in St. Augustine, FL. I build coaching sites specifically for football coaches in NE Florida and I put together a demo for you using your AU profile.

Check it out: ${vercelLink}

Everything on it is editable — your bio, services, photos, contact info. From start to finish, we can have you live on your own domain in 5 days.

Would love to hear what you think:
A) Interested — let's talk
B) Tell me more
C) No thanks

Either way, no pressure. — Gerson
gerson.s.berena@gmail.com`
}

const configDir = path.join(__dirname, "../prospects/configs")
const rows = coaches.map((c) => {
  const configPath = path.join(configDir, c.slug + ".json")
  let auLink = ""
  if (fs.existsSync(configPath)) {
    try {
      const d = JSON.parse(fs.readFileSync(configPath, "utf8"))
      auLink = d._source?.profile_url ?? ""
    } catch (_) {}
  }
  const vercelLink = `http://coachsites.vercel.app/${c.slug}`
  const firstName = getFirstName(c.display)
  return {
    "AU Profile Link": auLink,
    "Demo Site Link": vercelLink,
    "Outreach Message": getMessage(firstName, vercelLink),
  }
})

const wb = XLSX.utils.book_new()
const ws = XLSX.utils.json_to_sheet(rows)

// Column widths
ws["!cols"] = [
  { wch: 60 },  // AU link
  { wch: 55 },  // demo link
  { wch: 90 },  // message
]

XLSX.utils.book_append_sheet(wb, ws, "Outreach")

const outPath = path.join(__dirname, "../prospects/outreach.xlsx")
XLSX.writeFile(wb, outPath)
console.log("Written:", outPath)
console.log("Rows:", rows.length)
