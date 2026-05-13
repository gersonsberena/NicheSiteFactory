# NicheSiteFactory — Developer Reference

Single Next.js app serving multiple coach demo sites. Each coach has a slug-based URL and a JSON config. Config is deep-merged from `base.config.json` + a per-coach override JSON. The visual system uses CSS custom properties so every section picks up the right accent color automatically.

---

## How a Page Renders

```
/{slug}  (e.g. /john-smith)
  → app/[slug]/page.tsx reads params.slug
  → lib/useConfig.ts: getConfig("john-smith")
      → loads templates/football-coach/base.config.json (defaults)
      → deep merges prospects/configs/john-smith.json (overrides)
  → selects layout based on config.layout (A–M, defaults to A)
  → <LayoutA config={mergedConfig} /> (or B–M)
      → applies .theme-{accent_color} + .bg-tone-{background_tone} on wrapper div
      → renders sections in config.section_order order
  → wraps with DemoBanner + DemoCTA overlay (app/_demo-cta.tsx)
```

The old root page (`app/page.tsx`) still exists with a `?coach=` param for legacy use, but `/{slug}` is the primary URL pattern.

---

## Layouts

Twelve layouts exist in `templates/football-coach/layouts/`:

| Layout | Directory | Style |
|---|---|---|
| A | [layout-a/](templates/football-coach/layouts/layout-a/) | Dark Sports (reference implementation, most detailed) |
| B | [layout-b/](templates/football-coach/layouts/layout-b/) | Bold Dark |
| C | [layout-c/](templates/football-coach/layouts/layout-c/) | Clean Modern |
| D | [layout-d/](templates/football-coach/layouts/layout-d/) | Editorial Warm |
| E | [layout-e/](templates/football-coach/layouts/layout-e/) | Premium Elite |
| F | [layout-f/](templates/football-coach/layouts/layout-f/) | High Energy |
| G | [layout-g/](templates/football-coach/layouts/layout-g/) | Local Legend |
| H | [layout-h/](templates/football-coach/layouts/layout-h/) | Data Driven |
| I | [layout-i/](templates/football-coach/layouts/layout-i/) | Magazine Editorial |
| K | [layout-k/](templates/football-coach/layouts/layout-k/) | Precision |
| L | [layout-l/](templates/football-coach/layouts/layout-l/) | Glass Premium |
| M | [layout-m/](templates/football-coach/layouts/layout-m/) | Dark Editorial |

Selected by `config.layout` ("A"–"M", no "J"). Default is A. Routing is in [app/[slug]/page.tsx](app/[slug]/page.tsx).

---

## Component Map (Layout A — reference)

| File | Section | Config fields read | Design variants | Hardcoded strings (watch for sport-specific) |
|---|---|---|---|---|
| [LayoutA.tsx](templates/football-coach/layouts/layout-a/LayoutA.tsx) | Root wrapper | `design.accent_color`, `design.background_tone`, `section_order` | `.theme-*` / `.bg-tone-*` CSS classes | — |
| [Nav.tsx](templates/football-coach/layouts/layout-a/Nav.tsx) | Top navigation | `about.name`, `about.city`, `hero.cta_text` | Scroll-spy on: about, stats, services, testimonials, contact | `"Football · {city}"` |
| [Hero.tsx](templates/football-coach/layouts/layout-a/Hero.tsx) | Hero section | `hero.*`, `copy_variants.hero_tagline`, `design.hero_layout`, `design.hero_overlay`, `design.photo_treatment` | `full-bleed` / `split-right` / `centered-overlay`; overlays: `field-lines`, `hex-grid`, `dot-grid`, `diagonal`, `none` | `"Off-Season Roster · Now Open"`, `"Coach · {city}, FL"` |
| [StatsBar.tsx](templates/football-coach/layouts/layout-a/StatsBar.tsx) | Stats bar | `stats[]` | `horizontal-strip` / `grid-2x2` / `centered-large` | — |
| [About.tsx](templates/football-coach/layouts/layout-a/About.tsx) | Coach bio | `about.*`, `copy_variants.about_tagline`, `design.about_frame`, `design.photo_treatment` | `bordered-offset` / `minimal-frame` / `full-bleed` / `circular`; photo: `grayscale-hover`, `always-color`, `duotone`, `high-contrast` | `"NFCA Certified"`, `"Former D1 Athlete"`, hardcoded inspirational quote |
| [Services.tsx](templates/football-coach/layouts/layout-a/Services.tsx) | Services | `services[]`, `copy_variants.services_tagline`, `design.services_layout` | `cards-3col` / `horizontal-icon-left` / `featured-2small` | `"The Program"`, `"Three pillars…"`, icon pool is only 3 icons (cycles on 4+ services) |
| [Testimonials.tsx](templates/football-coach/layouts/layout-a/Testimonials.tsx) | Testimonials | `testimonials[]`, `copy_variants.testimonials_tagline`, `design.testimonials_layout` | `cards-2col` / `single-large-quote` / `stacked-compact` | 5-star rating is hardcoded, `"Voices From The Field"` |
| [Gallery.tsx](templates/football-coach/layouts/layout-a/Gallery.tsx) | Photo gallery | `gallery.photos[]`, `design.gallery_layout`, `design.photo_treatment` | `grid-3col` / `grid-2col` / `grid-4col` / `masonry` | `"On the Field"`, `"IN ACTION."` |
| [Contact.tsx](templates/football-coach/layouts/layout-a/Contact.tsx) | Contact form | `contact.*`, `about.city`, `about.county`, `hero.cta_text` | — (accent-aware, no layout variants) | `"Free 30-minute intro session"`, `"Roster spots fill fast in the off-season"` |
| [Footer.tsx](templates/football-coach/layouts/layout-a/Footer.tsx) | Footer | `about.name`, `about.city`, `about.county`, `contact.phone`, `contact.email`, `contact.instagram`, `contact.twitter`, `contact.youtube` | — (accent-aware, no layout variants) | Marquee: `"TRAIN HARD ★ PLAY HARD ★ WIN"`, `"Elite football training in {city}, FL"`, `"Performance Coaching"` |
| [Toast.tsx](templates/football-coach/layouts/layout-a/Toast.tsx) | Submit feedback | — | — | `"Message sent! We'll be in touch."` |

---

## Config System

### Files
| File | Purpose |
|---|---|
| [templates/football-coach/base.config.json](templates/football-coach/base.config.json) | Default values for every field — all coaches inherit this |
| `prospects/configs/{slug}.json` | Per-coach overrides — deep merged on top of base |
| [lib/useConfig.ts](lib/useConfig.ts) | `getConfig(slug)` function + `CoachConfig`, `DesignConfig`, `CopyVariants` types |
| `templates/football-coach/sport-templates/{sport}.json` | Per-sport defaults (services, copy, stats, FAQ) — 24 sports available |

### Sport templates (24 available)
`football` `soccer` `basketball` `baseball` `softball` `volleyball` `lacrosse` `cheerleading-tumbling`
`tennis` `golf` `swimming` `track-and-field` `cross-country` `wrestling` `gymnastics` `martial-arts`
`personal-trainer` `strength-and-conditioning` `speed-and-agility` `sports-performance`
`crossfit` `yoga` `pilates` `running-coach`

### Deep merge behavior
- Objects are merged recursively (coach's `about.name` overrides base `about.name`)
- Arrays are replaced entirely (coach's `services[]` replaces base `services[]`)
- Missing fields fall back to base config values silently

### Config schema (top-level keys)
```
meta: { title, description, favicon_url }
layout ("A"–"M"), section_order
about: { name, title, city, county, state, sport, bio, years_experience, specialty,
         age_groups, credentials, photo }
hero: { headline, subline, photo, cta_text, cta_url }
stats: [{ value, label }]
services: [{ title, description, price }]
packages: [{ title, description, duration, sessions_per_week, price, highlight }]
testimonials: [{ quote, name, role }]
gallery: { photos: [] }
contact: { phone, email, booking_url, calendly_url, formspree_id, business_hours,
           instagram, twitter, youtube }
design: { accent_color, background_tone, hero_layout, hero_overlay, stats_layout,
          photo_treatment, gallery_layout, services_layout, testimonials_layout,
          about_frame, font_pair, … layout-specific keys for B–M }
copy_variants: { hero_tagline, about_tagline, services_tagline, testimonials_tagline,
                 contact_offer, contact_urgency, marquee_text, … }
availability: [{ day, slots }]
faq: [{ question, answer }]
success_stories: [{ name, role, story, result }]
videos: [{ title, youtube_url, description }]
placements: [{ name, school, year, position, scholarship }]
```

---

## CSS Variable / Theme System

All accent color references in components use CSS custom properties — **never hardcode `gold` or `#F59E0B`**.

```css
/* Set by .theme-{color} class on LayoutA wrapper */
--accent        primary accent color
--accent-hi     lighter hover variant
--accent-dim    darker muted variant
--accent-rgb    RGB values only (e.g., 245,158,11) — for rgba() with opacity

/* Usage patterns */
text-[var(--accent)]                    solid accent text
bg-[var(--accent)]                      solid accent fill
bg-[rgba(var(--accent-rgb),0.1)]        10% opacity fill (cards, backgrounds)
border-[rgba(var(--accent-rgb),0.3)]    30% opacity border
hover:bg-[var(--accent)]                hover fill
hover:text-[var(--accent-hi)]           hover text
```

### Available themes
`gold` `red` `navy` `green` `purple` `teal` `pink`

### Available background tones
`pure-black` `navy-black` `slate-black` `charcoal`

### Key utility classes (globals.css)
| Class | Use |
|---|---|
| `.accent-grad` | Accent color gradient text |
| `.card-glow` | Hover lift + accent border glow |
| `.btn-gold` | Primary CTA button |
| `.btn-ghost` | Outlined button variant |
| `.reveal` | Fade-in on scroll (powered by `useReveal()` in LayoutA) |
| `.field-lines` | Vertical grid line pattern overlay |
| `.hex-grid` | Hexagon pattern overlay |
| `.dot-grid` | Dot grid overlay |
| `.stadium-bg` | Warm radial glow background (Contact section) |
| `.photo-duotone` | Duotone photo filter |
| `.photo-high-contrast` | High contrast photo filter |
| `.font-pair-*` | Font pair switching (bebas-inter, oswald-inter, bebas-poppins, etc.) |

---

## Hooks (`lib/hooks.ts`)

| Hook | Used in | Does |
|---|---|---|
| `useScrollSpy(ids, offset=120)` | Nav.tsx | Returns ID of currently visible section |
| `useScrolled(threshold=20)` | Nav.tsx | Returns true when page scrolled past threshold (triggers header blur) |
| `useReveal()` | LayoutA.tsx | Adds `.visible` class to all `.reveal` elements when 12% in viewport |

---

## Icons (`lib/icons.tsx`)

`Icons.Menu` `Icons.Close` `Icons.Arrow` `Icons.Helmet` `Icons.Lightning` `Icons.Trophy`
`Icons.Phone` `Icons.Mail` `Icons.Pin` `Icons.Instagram` `Icons.XSocial` `Icons.Youtube`
`Icons.Quote` `Icons.Star` `Icons.Check`

All use `currentColor` — color them with a Tailwind text class.

---

## Admin UI (`/admin`)

Full config editor at [app/admin/AdminClient.tsx](app/admin/AdminClient.tsx) (client component) backed by server actions in [app/admin/actions.ts](app/admin/actions.ts).

### Two tabs
| Tab | Purpose |
|---|---|
| **Quick Demo** | Minimal form — name, sport, layout, city, county, phone, email. Sport template auto-fills services, copy, stats, FAQ. Generates slug from name. |
| **Full Config** | Complete field editor for all config keys across all layouts. Load existing coach from dropdown or start new. |

### Key actions (actions.ts)
- `listCoaches()` — reads filenames from `prospects/configs/`
- `loadCoach(slug)` — reads and returns raw JSON for a slug
- `saveCoach(slug, payload)` — writes `prospects/configs/{slug}.json`; if `GITHUB_TOKEN` env var is set, also pushes to GitHub (triggering Vercel auto-deploy)

### Preview panel
Click **Show Preview** in the admin header to open a split-panel iframe showing `/{slug}`. After clicking **Save**, the iframe auto-reloads. The **Preview ↗** link always opens a new tab.

---

## Automation Scripts

```bash
# Generate per-coach JSON configs from CSV + assign unique variation combos
node scripts/generate-configs.js

# Print deployment checklist for one coach
node scripts/deploy.js --slug=john-smith
```

**Registry** (`prospects/registry.json`) — tracks which variation combos are already used per county, preventing two coaches in the same county from getting identical designs. Set `manually_tweaked: true` on a registry entry to prevent the script from overwriting manual edits.

---

## Common Debug Scenarios

**Section shows wrong accent color (still gold when coach should be red)**
→ Check that the component uses `var(--accent)` not `text-gold` or `#F59E0B`
→ Check that the layout's root wrapper is applying `.theme-{accent_color}` on the wrapper div

**Design variation not applying (e.g., hero is always full-bleed)**
→ Open `prospects/configs/{slug}.json`, confirm `design.hero_layout` exists and matches exactly one of: `full-bleed`, `split-right`, `centered-overlay`
→ Check the component for its `?? "default-value"` fallback

**Coach site not loading / 404**
→ Check URL: `localhost:3000/{slug}` (e.g. `localhost:3000/john-smith`)
→ Confirm `prospects/configs/{slug}.json` exists and filename matches slug exactly

**TypeScript errors after editing config or components**
```bash
npx tsc --noEmit
```

**Formspree form not submitting**
→ Check `contact.formspree_id` in the coach's config — must be a valid Formspree form ID
→ The form POST goes to `https://formspree.io/f/{formspree_id}`

**Image not loading**
→ Remote images must be from `res.cloudinary.com` or `images.unsplash.com` (enforced in `next.config.ts`)
→ Local images must be in `/public/` and referenced as `/stock/football/...`

---

## Known Gaps

| Gap | Where it's missing | Priority |
|---|---|---|
| Booking link/widget rendering | `contact.booking_url` + `contact.calendly_url` are in config/admin but may not render in all layout sections | High |
| Configurable credentials rendering | `about.credentials` field exists in config/admin — verify About.tsx in each layout actually reads it (Layout A may still hardcode "NFCA Certified") | High |
| Fitness/medical disclaimer | No footer line — needed for production sites | Medium |
| Client photo in Testimonials | Shows initials only; no photo field in testimonial config | Low |
| Footer links to privacy/terms | `app/privacy/` and `app/terms/` pages exist but footer may not link to them | Low |

---

## Multi-Sport

Multi-sport is **already implemented**. The admin supports 24 sports via sport templates that auto-fill services, copy, stats, and FAQ. `config.about.sport` is a first-class field.

**What remains sport-specific in Layout A (hardcoded strings to watch):**
- `Nav.tsx`: `"Football · {city}"` — should use `config.about.sport`
- `Hero.tsx`: `"Off-Season Roster · Now Open"` — football-specific
- `Footer.tsx`: `"Elite football training in {city}, FL"` — football-specific
- `About.tsx`: `"NFCA Certified"`, `"Former D1 Athlete"` — need to read `config.about.credentials[]`

These are the remaining items to make Layout A fully sport-agnostic. Layouts B–M may have their own hardcoded sport strings — check each one when adapting for non-football sports.
