High demand / local market fit

Soccer — youth and travel team coaches, skill trainers
Basketball — shooting coaches, skills trainers (huge in FL)
Baseball / Softball — hitting coaches, pitching coaches (very popular in FL year-round)
Track & Field — speed/sprint coaches (overlaps heavily with football trainers)
Wrestling — club coaches, technique specialists
Strong individual coaching market

Tennis — private lesson coaches, very common in FL
Golf — swing coaches, short game specialists (massive in FL)
Swimming — stroke coaches, competitive prep
Volleyball — skills trainers, club coaches
Emerging / niche

Lacrosse — growing fast in FL suburbs
Boxing / MMA — personal trainers, fight camps
Gymnastics — private skills coaches


Notes, if you want to hide something "section_order": ["hero", "stats", "about", "services", "testimonials", "gallery", "contact"], 
update the client json file


accent_color	gold red navy green purple teal pink
background_tone	pure-black navy-black slate-black charcoal
card_border	gold accent (any accent color name)
button_style	solid ghost
hero_layout	full-bleed split-right centered-overlay
hero_overlay	field-lines hex-grid dot-grid diagonal none
stats_layout	horizontal-strip grid-2x2 centered-large
photo_treatment	grayscale-hover always-color duotone high-contrast
gallery_layout	grid-3col grid-2col grid-4col masonry
services_layout	cards-3col horizontal-icon-left featured-2small
testimonials_layout	cards-2col single-large-quote stacked-compact
about_frame	bordered-offset minimal-frame full-bleed circular
font_pair	bebas-inter oswald-inter bebas-poppins


# Step 1 — import the 18 SJMSAA coaches into leads-enriched.json
node scripts/scrape-league.js

# Step 2 — generate their demo site configs
node scripts/create-prospect-configs.js

# Step 3 — send the first batch (5 at a time)
$env:GMAIL_USER="gerson.s.berena@gmail.com"
$env:GMAIL_APP_PASSWORD="your-app-password"
$env:DEMO_BASE_URL="https://firstcoastspotlight.com"
node scripts/send-outreach.js --limit=5