# AdaptivePopcorn — Niche Site Factory

## Context

The goal is a system for generating personalized, unique-looking websites for local solo practitioners (football coaches, real estate agents, etc.) at scale. Each site is driven by a JSON config so it can be customized without touching code. The pitch: show up with a working demo at `coachname.vercel.app` and say "I made this for you." The system must support 50+ prospects per niche, work across multiple niches, and scale via CSV automation.

---

## Architecture Overview

```
/niche-site-factory/
  /templates/
    /football-coach/
      /src/
        /components/     ← reusable section components
        /themes/         ← CSS theme files (4 variations)
        /layouts/        ← section layout variants per component
      base.config.json   ← default values / mock data for this niche
  /prospects/
    football-coaches.csv ← one row per prospect
  /generated/            ← output: one Next.js site per prospect
    /john-smith/
    /mike-jones/
  /scripts/
    generate.js          ← CSV → build per-coach site folder
    preview.js           ← local multi-coach preview server
    deploy.js            ← Vercel CLI deploy for a given coach
    deploy-all.js        ← batch deploy all generated sites
  /stock/
    /football/           ← free stock photos (Unsplash/Pexels)
```

---

## Config System

### Two-layer JSON merge (base + override)

```json
// templates/football-coach/base.config.json
{
  "niche": "football-coach",
  "theme": "dark-athletic",
  "layout": "split-hero",
  "fonts": { "heading": "Montserrat", "body": "Inter" },
  "hero": {
    "tagline": "Transforming Players. Building Champions.",
    "cta": "Book a Free Session"
  },
  "services": ["1-on-1 Training", "Group Sessions", "Game Film Review"],
  "testimonials": [
    { "text": "My son improved incredibly.", "author": "Parent, St. Johns" }
  ],
  "photos": {
    "hero": "/stock/football/action1.jpg",
    "about": "/stock/football/portrait1.jpg",
    "gallery": ["/stock/football/g1.jpg", "/stock/football/g2.jpg"]
  }
}
```

```json
// prospects/configs/john-smith.json  (override — only what changes)
{
  "name": "John Smith",
  "city": "St. Augustine",
  "county": "St. Johns County",
  "slug": "john-smith",
  "phone": "904-555-0100",
  "email": "john@example.com",
  "theme": "bold-gold",          ← override base theme
  "hero": {
    "tagline": "St. Johns County's Premier Football Coach"
  }
}
```

The build script deep-merges: base.config < coach-specific overrides. Any key in the override replaces the base. Everything else falls back to base.

### CSV columns
```
id, name, city, county, phone, email, theme, layout_variant, niche, exclusive
john-smith, John Smith, St. Augustine, St. Johns County, 904-555-0100, ..., bold-gold, v2, football-coach, true
```

`exclusive: true` = no more football coaches in this county.

---

## Variation System (no two sites look the same)

### Axis 1 — Color Themes (4 options in CSS)
| Theme | Feel |
|---|---|
| `dark-athletic` | Black + electric blue, aggressive/sporty |
| `bold-gold` | Navy + gold, prestige/championship |
| `green-community` | Forest green + white, approachable/youth |
| `minimal-clean` | Pure white + charcoal, professional/modern |

### Axis 2 — Hero Layout (3 options per component)
| Layout | Description |
|---|---|
| `split-hero` | Photo left, text right |
| `full-bleed` | Full-width photo with text overlay |
| `centered` | Centered text, photo behind gradient |

### Axis 3 — Font Pairings (4 options in config)
- `montserrat-inter` — bold headers, clean body
- `oswald-lato` — sports/editorial feel
- `raleway-opensans` — elegant, modern
- `bebas-roboto` — bold/aggressive

### Axis 4 — Section order (3 presets)
- `v1`: Hero → About → Services → Gallery → Testimonials → Contact
- `v2`: Hero → Services → About → Testimonials → Gallery → Contact
- `v3`: Hero → Testimonials (social proof first) → About → Services → Contact

With 4 themes × 3 hero layouts × 4 font pairs × 3 section orders = **144 combinations** before you touch content.

Assign variation axes in the CSV. Cycle through them so no two coaches share the same combo.

---

## Photo & Content Update Process (no code changes)

1. **Stock photos** — Unsplash/Pexels (free commercial license) are defaults in base.config
2. **Client photos** — client emails/DMs you photos → you upload to [Cloudinary free tier](https://cloudinary.com) → get URL → update `photos` section in their JSON config → run deploy script
3. **Zero code change needed** — it's all config/URL swaps
4. **Mock testimonials & bio** — 100% acceptable for demo. Use realistic-sounding but fictional names. Label clearly in your own notes. Once they sign, replace with real content.

---

## Local Preview (no separate VS Code projects)

Single Next.js project. One dev server. Swap coaches via query param:

```
localhost:3000?coach=john-smith   ← John's site
localhost:3000?coach=mike-jones   ← Mike's site
```

The app reads `NEXT_PUBLIC_COACH_ID` or the query param, loads the merged config, renders accordingly. **One project, preview all 50 coaches.**

Alternatively, `preview.js` script spins up ports 3001–3050, one per coach (for side-by-side comparison).

---

## Vercel Deployment (automated)

Each coach gets a free unique URL: `john-smith-coaching.vercel.app`

```bash
# deploy one coach
node scripts/deploy.js --coach=john-smith
# → runs: vercel build --env COACH_ID=john-smith && vercel deploy --prebuilt --name john-smith-coaching

# deploy all at once
node scripts/deploy-all.js  # reads CSV, deploys each one
```

**No need to buy a domain for demos.** The `.vercel.app` link is the pitch URL.
When they sign: register `johnsmithcoaching.com`, point DNS to their Vercel project.

---

## Territory / Exclusivity Strategy

- One football coach per county (tracked in CSV column `exclusive`)
- This is actually a sales asset: *"I only partner with one coach per county — you'd be my exclusive football coach in St. Johns County."*
- You CAN serve multiple coaches in the same county in **different niches** (football coach + soccer coach in SJC = fine)
- Once a coach signs, you differentiate their site enough that it no longer resembles the template

---

## Claude Design Integration

Claude Design (Pro) is the source of truth for visual design. The workflow:

1. **Generate 3–4 layout designs** in Claude Design with prompts like:
   > "Design a modern, bold sports coaching website for a football coach. Color palette: navy + gold. Hero section is full-bleed action photo with large white headline. Sections: Hero, About, Services (3 cards), Testimonials (2 quotes), Contact form. Output as React components using Tailwind CSS."

2. Each Claude Design output becomes a **named layout variant** (split-hero, full-bleed, centered)

3. Claude Code (here) helps wire the components into the config-driven system

### Prompts for 10 variations in Claude Design:
```
Create 10 distinct landing page designs for a football coach website. Each variation must:
- Use a unique color palette (e.g., variation 1: navy+gold, 2: black+electric-blue, 3: forest-green+white, 4: red+charcoal, etc.)
- Use a different hero layout (1: full-bleed photo, 2: split-screen, 3: centered with overlay, 4: diagonal split, 5: video-style static frame)
- Include these sections in any order: Hero with CTA, About/Bio, Services/Programs (3 items), Testimonials (2 quotes), Contact
- Output each as a standalone React component with Tailwind CSS classes
- Make each feel visually distinct — not just a color swap, but different layout energy
Label each as Variation 1 through 10.
```

Run this once, you get 10 base designs. Map each to a theme name. Done.

---

## Niche Expansion Targets (after football coach)

Best niches: solo practitioners, local, static content, no e-commerce needed.

| Niche | Why It Works |
|---|---|
| Soccer coach / youth sports | Same playbook as football coach |
| Personal trainer | High personal brand, needs "trust" page |
| Martial arts instructor (BJJ/boxing/MMA) | Visual, action photos, local competition |
| Music teacher (piano, guitar) | Quiet niche, almost no one has a site |
| Dance studio instructor | Gallery-heavy, great for photo showcase |
| Real estate agent | Always looking for leads, retainer potential |
| Wedding photographer | Portfolio-heavy, high ticket, loves good design |
| Yoga / pilates instructor | Peaceful aesthetic, easy to differentiate |
| Private tutor / academic coach | Parents pay for trust signals |
| Local barber / hair stylist | Strong personal brand, gallery of cuts |
| Nutritionist / dietitian | Content-heavy, great for SEO upsell |

Create one `base.config.json` per niche. Reuse 80% of the same component library.

---

## Build Steps (Implementation Order)

1. **Phase 1**: Build `football-coach` template in Next.js + Tailwind
   - 4 color theme CSS files
   - All section components (Hero, About, Services, Gallery, Testimonials, Contact)
   - 3 layout variants for Hero
   - 3 section-order presets
   - Config-driven rendering (`useConfig()` hook reads merged JSON)

2. **Phase 2**: Local preview system
   - `?coach=SLUG` query param routing
   - Merge logic: `base.config.json` + `prospects/configs/[slug].json`

3. **Phase 3**: CSV → config generator script
   - `scripts/generate-configs.js` reads `prospects/football-coaches.csv`
   - Outputs one `prospects/configs/[slug].json` per row

4. **Phase 4**: Vercel deploy script
   - `scripts/deploy.js --coach=john-smith`
   - Uses Vercel CLI, names project `[slug]-coaching`

5. **Phase 5**: Batch deploy
   - `scripts/deploy-all.js` — reads CSV, deploys all undeployed coaches

6. **Phase 6**: Second niche (e.g., personal trainer)
   - New `base.config.json` in `/templates/personal-trainer/`
   - Reuse all components, new theme + stock photos

---

## Retainer Model (the end goal)

Demo site → "Want me to customize it with your real photos/bio?" →
- **One-time setup fee**: $300–600 (customization + domain + launch)
- **Monthly retainer**: $75–150/month (hosting, updates, 1hr of edits/month, monthly analytics report)
- Upsell: booking widget, Google Business Profile, Instagram feed embed

Lock-in factors:
- Next.js on YOUR Vercel account (they can't just download and host it)
- YOUR Cloudinary account holds their photos
- You own the domain management relationship
- Monthly report keeps you top of mind

---

## Verification

- Local: `npm run dev` → open `localhost:3000?coach=john-smith`, verify correct name/city/theme
- Multi-preview: open several `?coach=` params in different tabs, confirm zero overlap in appearance
- Deploy test: `node scripts/deploy.js --coach=test-coach` → confirm `.vercel.app` URL resolves
- Config override test: set `theme` in coach config, confirm it overrides base
- CSV pipeline test: add 1 row to CSV, run `generate-configs.js`, confirm new JSON appears
