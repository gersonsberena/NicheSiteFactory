const fs = require('fs');
const path = require('path');

const VERCEL_DOMAIN = 'YOUR_DOMAIN_HERE.vercel.app'; // <-- fill in after deploying to Vercel
const CONFIGS_DIR = path.join(__dirname, '../prospects/configs');
const AU_LEADS_FILE = path.join(__dirname, '../data/au-leads.json');
const OUTPUT_FILE = path.join(__dirname, '../prospects/outreach.csv');

function buildMessage(name, city, websiteUrl) {
  const firstName = name.replace(/^coach\s+/i, '').split(' ')[0];
  return (
    `Hey ${firstName}!\n\n` +
    `I saw you're coaching football in ${city} — I went ahead and built a free website mockup with your name on it. ` +
    `Totally personalized to you: your stats, your coaching story, your brand.\n\n` +
    `Take a look: ${websiteUrl}\n\n` +
    `If you like it and want to turn it into a real site, just reply:\n` +
    `→ "Interested" — we'll hop on a quick call\n` +
    `→ "Tell me more" — I'll send over details\n` +
    `→ "No thanks" — totally fine, no pressure at all\n\n` +
    `— Gerson\n` +
    `📧 gerson.s.berena@gmail.com`
  );
}

// Build profile_url → slug map from coach configs
const profileToSlug = {};
for (const file of fs.readdirSync(CONFIGS_DIR).filter(f => f.endsWith('.json'))) {
  const config = JSON.parse(fs.readFileSync(path.join(CONFIGS_DIR, file), 'utf8'));
  const url = config._source?.profile_url;
  if (url) profileToSlug[url] = file.replace('.json', '');
}

// Iterate AU leads and generate rows
const leads = JSON.parse(fs.readFileSync(AU_LEADS_FILE, 'utf8'));
const rows = [['au_link', 'website_link', 'message']];

for (const lead of leads) {
  const slug = profileToSlug[lead.profile_url];
  if (!slug) continue; // no config built yet for this lead — skip
  const websiteUrl = `https://${VERCEL_DOMAIN}/?coach=${slug}`;
  const city = lead.city || 'your area';
  const message = buildMessage(lead.name, city, websiteUrl);
  rows.push([
    lead.profile_url,
    websiteUrl,
    `"${message.replace(/"/g, '""')}"`,
  ]);
}

const csv = rows.map(r => r.join(',')).join('\n');
fs.writeFileSync(OUTPUT_FILE, csv, 'utf8');
console.log(`✅ Generated ${rows.length - 1} outreach rows → prospects/outreach.csv`);
