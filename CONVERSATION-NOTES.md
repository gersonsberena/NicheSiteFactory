# NicheSiteFactory — Full Strategy Session Notes
> Session date: 2026-05-06. Everything discussed from zero to operational plan.

---

## Table of Contents
1. [CSV Column Additions](#1-csv-column-additions)
2. [Exclusivity Strategy — Drop It](#2-exclusivity-strategy--drop-it)
3. [Vercel Domain — No Domain Needed for Demos](#3-vercel-domain--no-domain-needed-for-demos)
4. [Updating Photos and Text After Launch](#4-updating-photos-and-text-after-launch)
5. [Outreach Tone and Two-Message Structure](#5-outreach-tone-and-two-message-structure)
6. [firstcoastspotlight.com — Repurpose as Agency Site](#6-firstcoastspotlightcom--repurpose-as-agency-site)
7. [Subdomains for Demo Sites](#7-subdomains-for-demo-sites)
8. [Niche Expansion — What Else to Target](#8-niche-expansion--what-else-to-target)
9. [Claude Design — Landing Page Strategy](#9-claude-design--landing-page-strategy)
10. [Images and Stock Photos](#10-images-and-stock-photos)
11. [Portfolio on firstcoastspotlight.com](#11-portfolio-on-firstcoastspotlightcom)
12. [Have You Done This Before? — The Objection](#12-have-you-done-this-before--the-objection)
13. [Master Roadmap Summary](#13-master-roadmap-summary)

---

## 1. CSV Column Additions

Drop `exclusive`. Add these fields:

```
id, slug, name, city, county, state, phone, email,
theme, layout_variant, font_pair, section_order, niche,
tagline_override, specialty, years_experience, age_groups_served,
instagram_handle, facebook_url, youtube_url, booking_url,
has_existing_site, source, status, deployed, deploy_url,
outreach_date, follow_up_date, response, notes,
hero_photo, about_photo
```

**Key columns explained:**

| Column | Purpose |
|---|---|
| `tagline_override` | Steal a great line from their Instagram bio |
| `specialty` | QB trainer vs. O-line vs. youth 7v7 — makes demo personal |
| `age_groups_served` | Youth / HS / Adult — changes copy tone |
| `instagram_handle` | Find real photos, embed feed later as upsell |
| `has_existing_site` | If yes, pivot pitch: "yours looks outdated" |
| `source` | Google Maps / Facebook / referral — track which channel works |
| `status` | `prospecting → demo_sent → interested → signed → declined` |
| `deployed` | `true/false` — deploy-all.js skips already-live sites |
| `deploy_url` | `johnsmith.firstcoastspotlight.com` |
| `hero_photo` | Which stock photo to use for hero (rotates through pool) |
| `about_photo` | Which stock photo for about section |

---

## 2. Exclusivity Strategy — Drop It

**Do NOT enforce exclusivity during prospecting.**

Send demos to 5 coaches in the same county if you want. The "exclusive county" pitch becomes a **closing tool**, not a prospecting constraint.

After they show interest, you say:
> *"By the way, I only take one football coach per county — if you want in, now's the time."*

First one who signs → politely decline others. Nobody gets offended by a rejection they never knew was coming. Real scarcity close, not artificial prospecting limit.

---

## 3. Vercel Domain — No Domain Needed for Demos

You do **not** need to buy a domain while prospecting.

- **Demo phase:** `johnsmith.firstcoastspotlight.com` (your subdomain — see Section 7)
- **When they sign:** Buy `johnsmithcoaching.com` on Namecheap (~$12/year), point DNS to Vercel. 5-minute process.
- **Who buys the domain:** Client buys it. You manage DNS as part of the retainer. Never put their domain in your account.

---

## 4. Updating Photos and Text After Launch

**Photos (no code change needed):**
1. Client texts/DMs you a new photo
2. Upload to Cloudinary (drag and drop, browser-based)
3. Copy the URL Cloudinary gives you
4. Open `prospects/configs/john-smith.json`
5. Paste URL into `photos.hero` or `photos.about`
6. Run: `node scripts/deploy.js --coach=john-smith`
7. Done in under 10 minutes

**Text updates (bio, services, tagline):**
Same process. Everything is a config key. Edit the JSON value, redeploy.

**Video:**
YouTube embed only. Client uploads to YouTube (even Unlisted), sends you the link. You paste it into the config. Never host raw video files.

**At scale (20+ clients):** Consider a simple Google Form → Sheet pipeline so clients can submit their own change requests without emailing you.

---

## 5. Outreach Tone and Two-Message Structure

### The Rule: No Link in Message 1

A cold DM with a link from a stranger reads as spam. The link is your most powerful asset — spend it after you have their attention.

### Message 1 — Get the door open (no link)

Goal: one reply. Nothing else.

```
Hey Coach [Last Name] — I saw your [team name / county / 
Instagram post about your 7v7 group]. I'm a web developer 
and I built something specifically for football coaches 
in [County]. Put together a quick site for you — took me 
a few hours. No sales pitch, just wanted to show you 
what it looks like. Worth a look?
```

### Message 2 — Only after they reply

```
Here you go: [johnsmith.firstcoastspotlight.com]

Used your name, city, and the [County] football scene 
as the base. Photos are stock for now — if you wanted 
your real ones in there I could swap them out. No 
obligation either way, just figured you'd want to see it.
```

### Tone Formula

| Do | Don't |
|---|---|
| Casual, peer-to-peer | "Dear Coach, I am reaching out to..." |
| Reference something specific about THEM | Generic "I build websites for coaches" |
| One clear ask | Listing 5 features in message 1 |
| Genuinely no-pressure | Fake no-pressure with pricing in the same message |
| 3–5 sentences max | Wall of text |

### The One Thing That Separates You

Reference something specific and real from their Instagram or Facebook in Message 1. One detail signals: *this person actually looked at me.* That is what makes them reply.

### Platform Notes

- **Instagram DM:** Shortest message wins. 2–3 sentences. Reference their IG content.
- **Facebook:** Slightly warmer. Mention mutual groups or their team page.
- **Email:** Can include the link in Message 1 (email links aren't as suspicious). Still keep it short.

---

## 6. firstcoastspotlight.com — Repurpose as Agency Site

**What you have:** Domain already owned. Built on Zyro (Hostinger Website Builder). Structure is already: hero, services, gallery, pricing, contact — exactly what an agency site needs.

**What to change:**

| Section | Current | New |
|---|---|---|
| Hero | "Reserve Now... Or Your Competition Will!" | "We Build Web Presence for Local Coaches and Small Businesses in NE Florida" |
| Services | 9x12 postcards | Website design, monthly updates, hosting, Google Business setup |
| Gallery/Portfolio | Postcard designs | Screenshots of showcase demo sites (see Section 11) |
| Pricing | Ad slot pricing | Setup fee + Monthly retainer packages |
| About | Co-op marketing concept | Who you are, why you focus on local practitioners |

**Don't change:** The domain. "First Coast" is the regional identity for NE Florida — coaches recognize it as local.

**The positioning line:**
> *"A small local studio that builds websites specifically for coaches and independent professionals in Northeast Florida."*

Small + local + specialized beats "full-service digital agency" every time with a solo football coach.

### Redesign Plan

Don't edit Zyro. Rebuild it completely:

1. Design in Claude Design (see prompt in Section 9 notes — adapt for agency site)
2. Build as Next.js site
3. Deploy to Vercel as separate project from NicheSiteFactory
4. Update DNS in Hostinger to point to Vercel:
   - Vercel → Settings → Domains → add `firstcoastspotlight.com`
   - Vercel gives you an A record and CNAME to add
   - Hostinger → hpanel → Domains → DNS Zone → replace old Zyro records

---

## 7. Subdomains for Demo Sites

**Instead of:** `john-smith-coaching.vercel.app`
**Use:** `johnsmith.firstcoastspotlight.com`

One change. Massively more professional. Looks like you built it for them, not a throwaway free URL.

### Option A — Per-coach subdomains (Free tier)

One CNAME record per coach in Hostinger DNS:
```
johnsmith    CNAME    cname.vercel-dns.com
mikejones    CNAME    cname.vercel-dns.com
```

In Vercel: each project → Settings → Domains → add their subdomain.

Your `deploy.js` script can automate the Vercel side:
```bash
vercel domains add johnsmith.firstcoastspotlight.com --project=john-smith
```

### Option B — Wildcard subdomain (Vercel Pro, $20/month)

One DNS record covers everyone:
```
*    CNAME    cname.vercel-dns.com
```

Single NicheSiteFactory app reads the subdomain from the request, loads the right coach config. Requires Vercel Pro. Worth it at 30+ active clients.

**Recommendation:** Start with Option A (free). Upgrade to Pro when you hit 20+ clients or when managing DNS records becomes genuinely painful.

### Subdomain Format

```
johnsmith.firstcoastspotlight.com      ✓ clean
coachjohnsmith.firstcoastspotlight.com ✓ if common names conflict
john-smith.firstcoastspotlight.com     ✗ hyphens in subdomains look odd
```

Map directly to the `slug` column in CSV — automatic.

### Bonus Effect

When a coach Googles their subdomain later, they find a page that says "Built by First Coast Spotlight." Every demo site is a passive ad for your agency.

### When They Sign

Buy `johnsmithcoaching.com` → add to their Vercel project → point DNS. Subdomain stays live or redirects. The `.firstcoastspotlight.com` subdomain can remain as a backup or be retired — your call.

---

## 8. Niche Expansion — What Else to Target

### The Right Framework (Not "What Niche" — "What Type of Person")

1. Solo practitioner (not employed by a gym/facility)
2. Already charging market rates (not a hobbyist)
3. No real website or a terrible one
4. Values personal brand and reputation
5. Makes enough that $100/month is negligible

### Niche Rankings

**Coaching Lane — Stay Here First**

| Niche | $100/month Pain | Notes |
|---|---|---|
| Football coach | Negligible | Your starting point |
| Personal trainer | Negligible | Easiest template reuse — almost identical to football coach |
| Soccer coach | Low | Massive youth sports market in FL |
| Martial arts (BJJ/boxing/MMA) | Negligible | Visual, passionate community, strong personal brand |
| Golf instructor | Negligible | Higher income demographic — could charge *more* |
| Tennis instructor | Low | Similar to soccer/football |
| Baseball/hitting coach | Low | Travel ball is huge in FL |
| Yoga/pilates instructor | Low | Different aesthetic — needs one new theme |
| Dance instructor | Medium | Photo-heavy. Watch for hobbyists with 3 students |

**Sleeper Niches — High Potential, Low Competition**

| Niche | Why It Works |
|---|---|
| Mobile dog groomer | Understands recurring revenue. Makes $300–900/day. $100/month = one appointment. Almost zero have a real site. |
| Dog trainer | Growing industry. Solo trainers everywhere. Dog owners pay well. |
| Music teacher | Quietest niche. Almost no agency competition. Parents pay for trust signals. |
| Private tutor / academic coach | Parents pay premium for trust. SAT/ACT coaches charge $100–200/hour. |

**Avoid For Now**

| Niche | Why |
|---|---|
| Electrician / plumber / HVAC | Heavily targeted by agencies. No advantage for you. |
| Real estate agent | Heavily targeted. They want IDX feeds, MLS integration — complexity nightmare. |
| Restaurant | Menus, reservations, online ordering — completely different product. |
| Barber / hair stylist | Booking integration is the whole value prop. Just send them to Square or Booksy. |

### Expansion Order

```
Month 1–2:  Football coach          ← prove the system works
Month 2–3:  Personal trainer        ← easiest reuse, huge market
Month 3–4:  Martial arts            ← different aesthetic, passionate buyers
Month 4–5:  Mobile dog groomer      ← sleeper niche, almost zero competition
Month 5+:   Soccer, golf, yoga      ← expand based on what's converting
```

### Adding a New Niche — What It Takes

```
/templates/personal-trainer/
  base.config.json    ← new default services, copy, stock photos
/prospects/
  personal-trainers.csv
/stock/
  /fitness/           ← new Unsplash photo set
```

Same scripts. Same deploy process. One afternoon of work per niche.

### On Price Sensitivity

Don't lower your prices. Coaches/trainers who push back on $75–100/month are:
- Hobbyists (3 students, $400/month revenue) — can't afford it and shouldn't
- Not serious about growing their business
- High-maintenance clients you don't want anyway

A football coach with 10 clients at $100/session makes $1,000 in a week. $100/month is 10% of one session. If they can't see the ROI, move on.

---

## 9. Claude Design — Landing Page Strategy

### The Problem With Pure Config Variations

144 combinations (4 themes × 3 layouts × 4 fonts × 3 section orders) differentiates sites, but they still share the same structural bones. What actually wows someone is an **architecturally different layout** — not just color swaps.

### The Approach

Generate **6–8 genuinely distinct master layouts** in Claude Design once. Let the config system differentiate the content. Result: 50 coaches, 50 sites that feel custom-built.

**Start with 4 layouts. Launch. Add more as you scale.**

### Claude Design Workflow

Run each prompt in a **fresh Claude Design session** so they don't bleed into each other stylistically.

---

**Layout A — Bold Athlete (aggressive/championship)**
```
Design and build a high-impact football coach landing page.

Project Name:
Layout A — Bold Athlete

Tech Stack:
- React
- Tailwind CSS
- Fully responsive
- Single-page architecture
- Production-quality component structure

Font Loading:
- Import Bebas Neue and Oswald from Google Fonts via a <link> tag in the HTML head
  or @import in the CSS. Apply Bebas Neue to all section headings and the coach name.
  Apply Oswald to subheadings and stats numbers. Fall back to Impact, then sans-serif.
- In Tailwind, extend the fontFamily config or use inline style where needed.

Visual Identity:
Championship energy.
The website should feel cinematic, intense, and performance-driven.

Core inspiration:
- Stadium atmosphere
- Friday night lights
- Elite athletic branding
- Motivational sports culture
- Modern ESPN / Nike energy

Color System:
- Background: Near-black / charcoal (#111111 or similar)
- Primary Accent: Electric gold (#F59E0B) or vivid orange
- Text: White and light gray
- Optional secondary accent: subtle metallic gradients on headings

Typography:
- Bebas Neue for coach name and hero headline
- Oswald for section headings and stats numbers
- Clean sans-serif (Inter or system font) for body text
- Oversized display sizes for hero
- Tight letter spacing on headings
- Strong visual hierarchy throughout

Design Style:
- Dark-mode aesthetic throughout
- Strong contrast
- Aggressive visual hierarchy
- Cinematic spacing
- Large imagery
- Sharp layouts with subtle gold glow accents on hover
- Minimal but powerful animations

Overall feeling:
"Elite coach preparing athletes for greatness."

Placeholder Content:
Use realistic placeholder content throughout — not lorem ipsum. Use:
- Coach name: Darius Carter
- City/region: Jacksonville, FL
- Headline: "Train Hard. Play Hard. Win."
- Subheadline: "Jacksonville's premier football performance coach"
- Stats: "500+ Athletes Trained", "12 Years Coaching", "3 County Championships"
- Bio: 2–3 sentences about a driven, results-focused football coach
- Services: Position Training, Speed & Agility, Recruiting Prep
- Testimonials: Athlete/parent quotes with first name + last initial + role
- Phone: (904) 555-0192 | Email: coach@dariuscarterfootball.com
- Use placeholder image URLs (e.g. https://placehold.co/1200x800/111111/ffffff)
  with dark backgrounds to match the aesthetic

Page Structure:
Create a single-page website with the following structure:
Navigation → Hero → Stats Bar → About → Services → Testimonials → Contact → Footer

-----------------------------------
0. NAVIGATION (STICKY)
-----------------------------------

Sticky top navigation bar.

Include:
- Left: Coach name or logo text in gold/orange accent color
- Center or Right: Nav links (About, Stats, Services, Testimonials, Contact)
- Right: CTA button ("Book a Free Session") in gold/orange with dark text
- Smooth scroll to section on link click
- Mobile: Hamburger menu that collapses nav links

Style:
- Dark background (matches page background)
- Subtle bottom border or glow on scroll
- Clean, minimal, athletic

-----------------------------------
1. HERO SECTION
-----------------------------------

Create a cinematic full-screen hero section.

Layout:
- Full-bleed football action image background
- Dark overlay for readability
- Left-aligned content block

Include:
- Massive coach name above headline (Bebas Neue, very large)
- Large bold white headline
- Supporting subheadline
- Gold/orange CTA button ("Book a Free Session")
- Optional secondary ghost button ("Learn More")

Style:
- Headline should dominate the screen
- CTA anchored lower-left
- Strong stadium atmosphere
- Subtle gradient overlays for depth

Mobile:
- Stack content cleanly
- Maintain headline impact on small screens

-----------------------------------
2. STATS BAR
-----------------------------------

Full-width horizontal stats section.

Display 3 large statistics:
- 500+ Athletes Trained
- 12 Years Coaching
- 3 County Championships

Style:
- Dark strip background (slightly lighter than page bg)
- Large Oswald numbers in gold accent
- White label text below each number
- Equal spacing between stats
- Subtle vertical separators between items

-----------------------------------
3. ABOUT SECTION
-----------------------------------

Two-column layout.

Left:
- Large portrait image

Right:
- Short gold accent line before heading
- Section heading in Oswald
- Bio text
- Optional short motivational pull quote in gold italics

Style:
- Strong alignment
- Spacious layout
- Editorial sports-magazine feel

-----------------------------------
4. SERVICES SECTION
-----------------------------------

Display 3 premium service cards.

Card Style:
- Dark elevated cards (slightly lighter than page bg)
- Gold/orange icon accents
- Subtle hover lift
- Gold border or glow transition on hover
- Rounded corners

Each card includes:
- Icon placeholder
- Title
- Short description

Services:
- Position Training
- Speed & Agility
- Recruiting Prep

-----------------------------------
5. TESTIMONIALS SECTION
-----------------------------------

Display 2 large testimonial cards side by side.

Style:
- Dark background cards
- Italicized quote text
- Large decorative gold quotation marks
- Strong contrast
- Athlete/parent attribution with role label

Tone:
Authentic, emotional, confidence-building.

-----------------------------------
6. CONTACT SECTION
-----------------------------------

High-conversion contact section with two parts:

Left column — contact info display:
- Phone number
- Email address
- Brief bold closing statement (e.g. "Ready to level up?")

Right column — contact form:
- Name input
- Email input
- Message textarea
- Large gold CTA button: "Book a Free Session"

Style:
- Dark section background
- Centered heading above the two columns
- Gold accent on inputs (focus border)
- Accessible and readable

-----------------------------------
7. FOOTER
-----------------------------------

Simple dark footer.

Include:
- Coach name or logo text (left or centered) in gold
- Quick nav links (About, Services, Contact)
- Social media icon placeholders (Instagram, Twitter/X, YouTube)
- Copyright line: "© 2025 Darius Carter Football. All rights reserved."

Style:
- Near-black background
- White/gray text with gold accents
- Clean and minimal

-----------------------------------
ADDITIONAL REQUIREMENTS
-----------------------------------

- Avoid generic template appearance
- Prioritize visual impact and emotional energy
- Use clean spacing and alignment consistency
- Add subtle motion and hover transitions (gold glow, lift effects)
- Maintain accessibility and readability despite dark theme
- Use semantic HTML
- Organize code into reusable React components
- Use Tailwind utility classes only
- Keep implementation clean and production-ready
- Navigation CTA and hero CTA should use the same action ("Book a Free Session")

Output:
Return complete React component code using Tailwind CSS. Name it Layout A — Bold Athlete.
```

---

**Layout B — Community Coach (approachable/youth-focused)**
```
Design and build a modern football coach landing page.

Project Name:
Layout B — Community Coach

Tech Stack:
- React
- Tailwind CSS
- Responsive design
- Single-page layout
- Clean component structure
- Production-quality UI

Brand Direction:
The visual identity should feel approachable, trustworthy, and community-rooted.

Style keywords:
- community leadership
- youth mentorship
- approachable professionalism
- modern athletic branding
- local hometown energy

Color Palette:
- Primary: Forest Green
- Background: White
- Accent: Warm Amber / Soft Yellow
- Text: Dark neutral gray

Typography:
- Headings: Bold display font (e.g. Inter Bold or similar heavy weight sans-serif)
- Body: Clean readable sans-serif (e.g. Inter Regular or similar)
- Hierarchy: Large display sizes for hero/section headings, comfortable body size for paragraphs
- Letter spacing: Slightly tight on headings, normal on body

Design Language:
- Friendly but professional
- Soft rounded corners
- Spacious layout
- Clean typography hierarchy
- Subtle shadows
- Modern card-based UI
- High readability
- Mobile-first responsive design

Overall vibe:
"Coach who genuinely shows up for the community."

Placeholder Content:
Use realistic placeholder content throughout — not lorem ipsum. Use:
- Coach name: Marcus Williams
- City/region: Jacksonville, FL
- Tagline examples: "Building Champions On and Off the Field"
- Bio: 2–3 sentences about a community-focused football coach with local roots
- Services: Youth Training, Private Coaching, Community Camps
- Testimonials: Parent and player quotes with first name + last initial
- Use placeholder image URLs (e.g. https://placehold.co/600x400) for all photos

Page Structure:
Create a single-page website with the following structure:
Navigation → Hero → About → Services → Testimonials → Gallery → Contact → Footer

-----------------------------------
0. NAVIGATION (STICKY)
-----------------------------------

Sticky top navigation bar.

Include:
- Left: Coach name or logo text in forest green
- Center or Right: Nav links (About, Services, Testimonials, Gallery, Contact)
- Right: CTA button ("Book Training") in forest green with white text
- Smooth scroll to section on link click
- Mobile: Hamburger menu that collapses nav links

Style:
- White background
- Subtle bottom border or shadow on scroll
- Clean and uncluttered

-----------------------------------
1. HERO SECTION
-----------------------------------

Layout:
- Two-column split-screen layout
- Left side: Coach image
- Right side: Content block

Left Side:
- Large rounded coach photo
- Organic forest-green background shape behind image

Right Side:
- White background
- Small coach name label above headline
- Large bold headline
- Supporting subheadline
- Primary CTA button in forest green ("Book Training")

Include:
- Strong spacing
- Visual balance
- Responsive stacking on mobile

-----------------------------------
2. ABOUT SECTION
-----------------------------------

Centered layout.

Structure:
- Circular portrait image centered at top
- Section heading below image
- Biography content below
- Two-column text layout on desktop
- Single-column on mobile

Tone:
Personal, welcoming, leadership-oriented.

-----------------------------------
3. SERVICES SECTION
-----------------------------------

Display 3 service cards.

Card Style:
- White background
- Forest green top border accent
- Rounded corners
- Subtle hover elevation
- Soft shadow transition

Each card includes:
- Icon placeholder
- Service title
- Short description

Services:
- Youth Training
- Private Coaching
- Community Camps

-----------------------------------
4. TESTIMONIALS SECTION
-----------------------------------

Three-column testimonial grid.

Each testimonial includes:
- Quote text
- Small avatar placeholder
- Author name (first name + last initial)
- Role label (e.g. "Parent" or "Player, age 14")

Style:
- Clean white cards
- Subtle shadows
- Warm and authentic presentation

-----------------------------------
5. GALLERY SECTION
-----------------------------------

Create a responsive 2-row image gallery.

Requirements:
- 6 image placeholders
- Consistent aspect ratios
- Rounded corners
- Subtle hover zoom effect

-----------------------------------
6. CONTACT SECTION
-----------------------------------

Centered contact form layout.

Include:
- Section heading ("Ready to Get Started?")
- Supportive subheadline
- Name input
- Email input
- Message textarea
- Forest green submit button ("Send Message")
- Below the form: repeat the CTA — a secondary line like "Or book directly →" 
  linking to the same booking action as the hero CTA

Style:
- Clean modern form styling
- Accessible spacing
- Visible focus states

-----------------------------------
7. FOOTER
-----------------------------------

Simple footer.

Include:
- Coach name or logo text (left or centered)
- Quick nav links (About, Services, Contact)
- Social media icon placeholders (Instagram, Facebook, Twitter/X)
- Copyright line: "© 2025 Marcus Williams Football. All rights reserved."

Style:
- Forest green background
- White text
- Clean and minimal

-----------------------------------
ADDITIONAL REQUIREMENTS
-----------------------------------

- Fully responsive across mobile, tablet, and desktop
- Use Tailwind utility classes only
- Use semantic HTML
- Maintain consistent spacing system
- Use reusable React components where appropriate
- Include subtle hover animations and transitions
- Prioritize readability and clean hierarchy
- Keep code organized and production-ready
- Navigation CTA and hero CTA should use the same action ("Book Training")

Output:
Return complete React component code using Tailwind CSS. Name it Layout B — Community Coach.
```

---

**Layout C — Modern Minimal (clean/professional)**
```
Design a football coach landing page. Single page, 6 sections.

Visual identity: Clean, modern, confident. White-dominant with 
charcoal text and a single bold accent (navy blue or deep red). 
No gradients, no textures — pure whitespace and typography hierarchy.

Hero: Asymmetric. Large coach name in massive light-weight type as 
a background watermark. Foreground: left-aligned headline (3 lines max), 
subline, CTA. Right side: tall portrait photo in a clean rectangular frame.

Sections after hero:
- Philosophy/About: Single wide column, centered, large quote or 
  philosophy statement in italic big type, small portrait beside bio below
- Services: Horizontal list — 3 items with thin top border, 
  number (01, 02, 03), title, 1-sentence description
- Testimonials: Large single testimonial full-width, centered, name below
- Gallery: Masonry-style 5-photo grid
- Contact: Two-column — left: bold headline + phone/email listed; 
  right: minimal form (name, email, message, button)

Output as React components with Tailwind CSS. Name it Layout C — Modern Minimal.
```

---

**Layout D — Story First (trust/credibility-led)**
```
Design a football coach landing page. Single page, 6 sections.

Visual identity: Warm, narrative-driven. Lead with trust and story 
before services. Navy + warm white. Serif or semi-serif headings 
(Playfair Display or Merriweather), clean sans for body.

Hero: Centered. Large coach photo (full-height, slight vignette), 
headline centered over it in white, small subline, two CTA buttons 
(primary: Book a Session, secondary: Read My Story).

Sections after hero:
- Testimonials FIRST (social proof before pitch): 
  3 quote cards on warm background strip
- About: Large heading, 2-paragraph bio with pull-quote in margin, 
  portrait photo floating right
- Services: Icon + title + 2-line description, 3 items in warm card row
- Gallery: Wide single-row horizontal scroll strip (5 photos)
- Contact: Warm-toned background, centered heading, simple 3-field form

Output as React components with Tailwind CSS. Name it Layout D — Story First.
```

---

### What Wows a Non-Tech Coach

They don't notice React or Tailwind. They notice:
- **Their name in big type** — first second they land on it
- **A photo that matches their sport** — action shots, not office stock
- **Their city/county called out** — "St. Johns County's Premier Football Coach" hits differently than a generic tagline
- **It looks like a real business** — testimonials, services listed, a way to contact
- **It's mobile-responsive** — they will check on their phone first, every time

### Integration Back Into the System

1. Drop each Claude Design output into `/templates/football-coach/layouts/layout-a/`, etc.
2. Add `layout_variant: A` (or B, C, D) to the CSV
3. `generate-configs.js` reads that key and points the coach to their layout folder
4. Config system populates name, city, services, photos inside whichever layout they're assigned
5. CSV rotates A → B → C → D → A → B → ... so no consecutive coaches share a layout

---

## 10. Images and Stock Photos

### Claude Design Placeholders

Claude Design outputs gray placeholder boxes where images go. In your Next.js component, placeholders become:
```jsx
<img src={config.photos.hero} alt="Coach hero" />
```

The config system fills in the actual photo URL. Claude Design gives you structure; your CSV gives you the photos.

### Building the Photo Pool

Go to [unsplash.com](https://unsplash.com) and search "football coach training." Download 20–30 free photos. Organize:

```
/stock/football/
  hero/       ← 10 different hero shots
  about/      ← 10 portrait/sideline shots  
  gallery/    ← 30 action shots
```

Add `hero_photo` and `about_photo` to the CSV. Rotate through the pool. Coach A gets photo set 1, Coach B gets photo set 2. All stock, but visually different.

### The Power Move

Before deploying a coach's demo, check their Instagram. If they have a good public action photo — use it. A publicly visible photo used in a private demo is fine. This changes the reaction from *"oh nice site"* to *"wait, how did you get my photo on there?"*

That moment closes deals.

---

## 11. Portfolio on firstcoastspotlight.com

### Never Show Real Prospect Demos in Your Portfolio

Two reasons:
1. If Coach A sees Coach B's site in your portfolio, they realize it's a template system — the "I built this for you specifically" magic evaporates
2. Privacy — you haven't asked permission from prospects to showcase their (fake) demos publicly

### What to Do Instead — Dedicated Showcase Demos

Create 3–4 dedicated sites using fictional but realistic coaches. These exist only for your portfolio:

```
showcase-bold.firstcoastspotlight.com
showcase-community.firstcoastspotlight.com
showcase-minimal.firstcoastspotlight.com
showcase-story.firstcoastspotlight.com
```

Use names like "Coach Marcus Webb — St. Johns County" or "Coach Rivera — Duval County." Realistic enough to look like real work. Never send these as actual prospect demos.

Portfolio section copy on firstcoastspotlight.com:
> *"Here are four recent designs built for coaches in Northeast Florida. Each site is fully customized to the coach's brand, location, and services."*

Nobody knows Marcus Webb is fictional.

---

## 12. Have You Done This Before? — The Objection

This will come up. Handle it without lying and without panicking.

### The Redirect Move (Use This First)

> *"Let me answer that by pointing you back to what you're looking at. That demo I built — does it look like I can do this? The quality you see there is exactly what you get. Have you seen a site that looks better than that built specifically for a football coach in [their county]?"*

Turn the question into a conversation about the work itself. The demo is sitting right there.

### If They Push for a Direct Answer

> *"Honest answer — I'm launching this specifically for coaches in Northeast Florida. I've built the demo sites you can see at firstcoastspotlight.com, but you'd be one of my first paying clients for this service. That means I have every incentive to make yours exceptional, because your result is my reputation. I'm not taking on 50 clients right now — I'm being selective about who I work with first."*

Why this works:
- Completely honest
- Reframes "no clients yet" as "you get extra attention and care"
- "Being selective" subtly flips the power dynamic

### What NOT to Say

- Don't fabricate clients — if they ask for a reference, you're done
- Don't panic and drop your price — it signals the objection worked
- Don't over-explain or get defensive — one confident answer, then pivot back to the demo

### The Truth

The demo IS your proof. A bad designer can't build what they're looking at. Keep redirecting back to it.

And this problem solves itself fast. Your second prospect conversation: *"I just launched one last week."* Your fifth: you have real names to drop.

---

## 13. Master Roadmap Summary

### Phase 0 — Foundation (This Week, Non-Negotiable Before Any Outreach)

| Priority | Task |
|---|---|
| 1 | Set up Stripe account — cannot collect payment without this |
| 2 | Redesign firstcoastspotlight.com (Claude Design → Next.js → Vercel → point DNS) |
| 3 | Build football coach template (Next.js + Tailwind, 1 layout) |
| 4 | Wire up `useConfig()` hook — config drives the site |
| 5 | Add all 4 Claude Design layouts |
| 6 | Build `generate-configs.js` (CSV → JSON per coach) |
| 7 | Build `deploy.js` (auto-adds subdomain to Vercel) |
| 8 | Create Calendly link for discovery calls |
| 9 | Write 2-message outreach DM script |
| 10 | Set up contract template (Bonsai / HelloSign / DocuSign free tier) |

### Phase 1 — Prospecting (Week 2–4)

- Build CSV with 30–50 football coaches (Google Maps, Facebook groups, Instagram)
- Generate 30–50 demo sites from CSV
- Deploy all to `[slug].firstcoastspotlight.com`
- Visual QA pass on 5–6 random demos
- Send Message 1 to first 15 coaches (no link)
- Track all responses in CSV `status` column
- Follow up after 3 days of no reply (once only)
- Send Message 2 with demo link to anyone who replies
- Send next 15 after reviewing results from first batch

### Phase 2 — First Client Close

```
1. Schedule 30-min discovery call (Calendly link)
2. On call: confirm scope, explain packages, close on setup fee
3. Send contract + invoice same day (do NOT start without both signed + paid)
4. Send onboarding questionnaire
5. Collect all assets: logo, photos, bio, testimonials (5-day deadline)
6. Build/customize site (5–7 business days from asset receipt)
7. Send preview link for review
8. One round of revisions (additional rounds: $50)
9. Buy their domain + point DNS
10. Launch
11. Set up recurring monthly billing in Stripe
12. Send welcome email with update request process
```

### Phase 3 — Ongoing Operations

| Task | Frequency |
|---|---|
| Process client update requests | As received (48hr turnaround) |
| Send monthly analytics report | 1st of each month |
| Follow up on failed payments | Day 8 |
| Prospect new coaches | When you have capacity for 1–2 more |
| Expand to second niche | After 5 stable retainer clients |

### Revenue Targets

| Clients | Avg Monthly Revenue | Monthly Time Estimate |
|---|---|---|
| 5 | ~$500–625 | 3–5 hrs |
| 10 | ~$1,000–1,250 | 6–10 hrs |
| 15 | ~$1,500–1,875 | 10–15 hrs |
| 20 | ~$2,000–2,500 | 15–20 hrs (upper limit solo) |

### First Action Today

**Set up your Stripe account.** Everything else depends on being able to collect payment when someone says yes. Don't let a "yes" catch you unprepared.
