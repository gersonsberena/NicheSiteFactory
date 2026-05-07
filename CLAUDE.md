# NicheSiteFactory — Developer Reference

Single Next.js app serving multiple coach demo sites. Each coach is identified by a `?coach=[slug]` URL param. Config is deep-merged from `base.config.json` + a per-coach override JSON. The visual system uses CSS custom properties so every section picks up the right accent color automatically.

---

## How a Page Renders

```
?coach=john-smith
  → app/page.tsx reads searchParams.coach (default: "john-smith")
  → lib/useConfig.ts: getConfig("john-smith")
      → loads templates/football-coach/base.config.json (defaults)
      → deep merges prospects/configs/john-smith.json (overrides)
  → <LayoutA config={mergedConfig} />
      → applies .theme-{accent_color} + .bg-tone-{background_tone} on wrapper div
      → renders sections in config.section_order order
```

---

## Component Map

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

### Deep merge behavior
- Objects are merged recursively (coach's `about.name` overrides base `about.name`)
- Arrays are replaced entirely (coach's `services[]` replaces base `services[]`)
- Missing fields fall back to base config values silently

### Config schema (top-level keys)
```
meta, theme, layout, font_pair, section_order
about: { name, title, city, county, state, bio, years_experience, specialty, age_groups, photo }
hero: { headline, subline, photo, cta_text, cta_url }
stats: [{ value, label }]
services: [{ title, description }]
testimonials: [{ quote, name, role }]
gallery: { photos: [] }
contact: { phone, email, booking_url, formspree_id, instagram, twitter, youtube }
design: { accent_color, background_tone, card_border, button_style, hero_layout, hero_overlay,
          stats_layout, photo_treatment, gallery_layout, services_layout, testimonials_layout,
          about_frame, font_pair }
copy_variants: { hero_tagline, about_tagline, services_tagline, testimonials_tagline }
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
→ Check that `LayoutA.tsx` is applying `.theme-{accent_color}` on the wrapper div

**Design variation not applying (e.g., hero is always full-bleed)**
→ Open `prospects/configs/{slug}.json`, confirm `design.hero_layout` exists and matches exactly one of: `full-bleed`, `split-right`, `centered-overlay`
→ Check the component for its `?? "default-value"` fallback

**Coach site not loading / shows default john-smith**
→ Check URL: `localhost:3000/?coach=slug-here`
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

## Known Gaps (not yet implemented)

| Gap | Where it's missing | Priority |
|---|---|---|
| Booking link/widget | `contact.booking_url` is in every config but renders nowhere on the site | High |
| Configurable credentials | "NFCA Certified", "Former D1 Athlete" are hardcoded in About.tsx — wrong for non-football sports | High |
| Privacy Policy page + footer link | No page, no link anywhere | Medium |
| Fitness/medical disclaimer | No footer line — needed for production sites | Medium |
| Pricing in Services | No pricing field in config or UI | Medium |
| Per-coach favicon | All sites share the default Next.js favicon | Low |
| Client photo in Testimonials | Shows initials only; no photo field in testimonial config | Low |
| Business hours in Contact | No field in config or Contact section | Low |
| Dynamic page metadata | `app/layout.tsx` has hardcoded title "First Coast Spotlight — Football Coach Demo" | Low |

---

## Multi-Sport Expansion

The visual system is sport-agnostic. To adapt for soccer, basketball, etc.:
1. Add `config.about.sport` field (e.g., `"Soccer"`)
2. Replace hardcoded sport strings in Nav (`"Football · {city}"`), Footer (`"Elite football training"`), Hero (`"Off-Season Roster · Now Open"`) with `config.about.sport`
3. Move About credentials to a `config.about.credentials: string[]` array
4. Replace football-specific copy in Contact and Services with generic or config-driven versions
5. Create a new `templates/sports-coach/` directory and point stock photos at the right sport's folder
