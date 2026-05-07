# NicheSiteFactory — Layout Design Prompts

10 distinct layout prompts for Claude Design. Each prompt is self-contained — paste into a **fresh Claude Design session** so layouts don't bleed into each other stylistically.

After generation: adapt components to the config system (CSS custom properties, `CoachConfig` types, `section_order` array). Replace hardcoded colors with `var(--accent)`, `var(--accent-rgb)`, etc.

---

## Section Order (Standard)

All layouts follow this section order unless noted:

```
Nav → Hero → Stats → About → Services → SuccessStories → Testimonials → VideoGallery → Gallery → FAQ → Contact → Footer
```

**Exception — Layout D (Story First):**
```
Nav → Hero → Stats → Testimonials → About → Services → SuccessStories → VideoGallery → Gallery → FAQ → Contact → Footer
```
Testimonials appear before About/Services — trust-before-pitch is an intentional structural decision.

---

## Table of Contents

- [Layout A — Bold Athlete](#layout-a--bold-athlete)
- [Layout B — Community Coach](#layout-b--community-coach)
- [Layout C — Modern Minimal](#layout-c--modern-minimal)
- [Layout D — Story First](#layout-d--story-first)
- [Layout E — Premium Elite](#layout-e--premium-elite)
- [Layout F — High Energy](#layout-f--high-energy)
- [Layout G — Local Legend](#layout-g--local-legend)
- [Layout H — Data Driven](#layout-h--data-driven)
- [Layout I — Magazine Editorial](#layout-i--magazine-editorial)
- [Layout J — Camp & Clinic](#layout-j--camp--clinic)

---

## Layout A — Bold Athlete

**Identity:** Championship energy. Dark-mode, near-black backgrounds, electric gold accent, cinematic spacing. Bebas Neue headlines, Oswald stats. Designed to feel like elite athletic branding — ESPN/Nike meets Friday Night Lights. The coach is a gladiator, every section is a stage.

> **Note:** Layout A was originally generated with sections 0–7 only (no SuccessStories, VideoGallery, or FAQ). Those three sections were added directly in code after generation. The prompt below is the **complete updated version** with all 12 sections — use this if re-generating.

---

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
- Success stories: Two athletes — Tyler R. (WR, went from backup to starter) and Marcus D. (LB, made All-County)
- Testimonials: Athlete/parent quotes with first name + last initial + role
- Videos: One embed placeholder titled "Route Running Fundamentals"
- FAQ: 4–5 questions about age groups, session location, duration, what to bring
- Phone: (904) 555-0192 | Email: coach@dariuscarterfootball.com
- Use placeholder image URLs (e.g. https://placehold.co/1200x800/111111/ffffff)
  with dark backgrounds to match the aesthetic

Page Structure:
Navigation → Hero → Stats Bar → About → Services → Success Stories →
Testimonials → Video Gallery → Photo Gallery → FAQ → Contact → Footer

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
5. SUCCESS STORIES SECTION
-----------------------------------

Showcase 2 in-depth athlete transformation stories.

Layout:
- Two-column card grid on desktop, stacked on mobile
- Dark cards, slightly lighter than page background

Each card includes:
- Athlete name (large, Bebas Neue)
- Role / position label (e.g. "Wide Receiver, Ponte Vedra High") in gold accent, small caps
- Story paragraph (2–3 sentences, italic, white/80 opacity)
- Result badge: bold result line in a gold-bordered pill or callout bar at the bottom
  (e.g. "Starting WR · 42 receptions as a Junior")

Style:
- Gold left border accent or top bar on each card
- Subtle card-glow effect on hover
- Quote atmosphere — feels like a scouting report

-----------------------------------
6. TESTIMONIALS SECTION
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
7. VIDEO GALLERY SECTION
-----------------------------------

Showcase one coaching video embed.

Layout:
- Centered single-video layout (or 2-column if 2+ videos)
- Dark section background matching the page

Each video:
- YouTube iframe embed (16:9 aspect ratio, responsive)
- Title in Bebas Neue above embed
- Short description text below in small white/65 text
- Gold accent bar or border framing the embed

Style:
- Section heading: "ON FILM" or similar
- Cinematic feel — video as premium content
- Subtle shadow under embeds

-----------------------------------
8. PHOTO GALLERY SECTION
-----------------------------------

Responsive 3-column photo grid.

Requirements:
- 6 image placeholders
- Consistent aspect ratios
- No rounded corners (sharp, athletic)
- Subtle hover overlay with gold tint

Style:
- Section heading: "ON THE FIELD" in Bebas Neue
- Tight grid gap
- Dark section background

-----------------------------------
9. FAQ SECTION
-----------------------------------

Answer 4–5 common questions about the coaching program.

Layout:
- Stacked accordion or clean Q&A list
- Dark section background

Questions to include:
- What age groups do you train?
- Where do sessions take place?
- How long are sessions?
- What should my athlete bring?
- Do you offer online or remote coaching?

Style:
- Question text: Oswald uppercase, white or gold accent
- Answer text: body font, white/75
- Subtle separator lines between items
- Gold chevron or expand icon on each item

-----------------------------------
10. CONTACT SECTION
-----------------------------------

High-conversion contact section with two parts.

Left column — contact info display:
- Phone number
- Email address
- Location (city, county)
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
11. FOOTER
-----------------------------------

Simple dark footer.

Include:
- Coach name or logo text (left or centered) in gold
- Quick nav links (About, Services, Contact)
- Social media icon placeholders (Instagram, Twitter/X, YouTube)
- Copyright line: "© 2025 Darius Carter Football. All rights reserved."
- Disclaimer line: "Results may vary. Consult a physician before beginning any exercise program."

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

## Layout B — Community Coach

**Identity:** Approachable, trustworthy, community-rooted. Light background, forest green + warm amber accent, rounded corners everywhere, card-based UI. Designed to feel like a coach who genuinely shows up for the community — youth parents are the primary audience. Everything signals "safe, local, invested."

---

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

Font Loading:
- Import Inter and Poppins from Google Fonts. Apply Poppins Bold/ExtraBold to
  section headings. Apply Inter to body text and labels. Fall back to system sans-serif.
- Large display sizes for hero/section headings, comfortable body size for paragraphs.
- Slightly tight tracking on headings, normal on body.

Visual Identity:
Community leadership energy.
The website should feel welcoming, professional, and locally rooted.

Core inspiration:
- Youth sports mentorship
- Hometown pride
- Trusted local professional
- Coach who knows parents by name
- School athletics program energy

Color System:
- Primary: Forest Green (#2D6A4F or similar)
- Background: White (#FFFFFF) and very light gray (#F9F9F9)
- Accent: Warm Amber (#F59E0B) for highlights and hover states
- Text: Dark neutral gray (#1A1A1A)
- Card backgrounds: White with subtle shadows

Typography:
- Poppins ExtraBold for section headings and hero headline
- Poppins SemiBold for card titles and subheadings
- Inter for body text and descriptions
- Clean modern hierarchy

Design Style:
- Light-mode aesthetic throughout
- Friendly but professional
- Soft rounded corners (8px–16px)
- Spacious layout with generous padding
- Subtle drop shadows on cards
- Smooth hover elevation transitions
- Mobile-first responsive

Overall feeling:
"Coach who genuinely shows up for the community."

Placeholder Content:
Use realistic placeholder content throughout — not lorem ipsum. Use:
- Coach name: Marcus Williams
- City/region: Jacksonville, FL
- Headline: "Building Champions On and Off the Field"
- Subheadline: "Jacksonville's most trusted youth football coach"
- Stats: "300+ Athletes Trained", "8 Years Coaching", "2 Regional Champions"
- Bio: 2–3 sentences about a community-focused football coach with local roots
- Services: Youth Training, Private Coaching, Community Camps
- Success stories: Two athletes — Jaylen M. (QB, grew from nervous 9-year-old to team leader)
  and Destiny P. (Parent story — son's confidence transformation)
- Testimonials: Three parent and player quotes with first name + last initial
- Videos: One embed placeholder titled "Building Confidence in Young Athletes"
- FAQ: 4–5 questions about age groups, location, session length, what to bring, group sizes
- Phone: (904) 555-0177 | Email: coach@marcuswilliamsfootball.com
- Use placeholder image URLs (e.g. https://placehold.co/600x400/2D6A4F/ffffff)
  with green backgrounds to match the brand

Page Structure:
Navigation → Hero → Stats Bar → About → Services → Success Stories →
Testimonials → Video Gallery → Photo Gallery → FAQ → Contact → Footer

-----------------------------------
0. NAVIGATION (STICKY)
-----------------------------------

Sticky top navigation bar.

Include:
- Left: Coach name or logo text in forest green
- Center or Right: Nav links (About, Services, Testimonials, Gallery, Contact)
- Right: CTA button ("Book Training") in forest green with white text, rounded corners
- Smooth scroll to section on link click
- Mobile: Hamburger menu that collapses nav links

Style:
- White background
- Subtle bottom shadow on scroll
- Clean and uncluttered

-----------------------------------
1. HERO SECTION
-----------------------------------

Two-column split-screen layout.

Left Side:
- Large coach photo with a soft rounded corner frame
- Organic forest-green background shape behind image (blob or rounded square)

Right Side:
- White background
- Small location label above headline: "Jacksonville, FL"
- Large bold headline in Poppins ExtraBold
- Supporting subheadline
- Primary CTA button: "Book Training" (forest green, rounded, white text)

Style:
- Warm, welcoming energy
- Balanced visual weight
- Responsive stacking on mobile with photo above content

-----------------------------------
2. STATS BAR
-----------------------------------

Full-width horizontal stats strip.

Display 3 statistics:
- 300+ Athletes Trained
- 8 Years Coaching
- 2 Regional Champions

Style:
- Light green background or white with green top/bottom borders
- Large Poppins numbers in forest green
- Gray label text below each number
- Clean and readable — community feel, not aggressive

-----------------------------------
3. ABOUT SECTION
-----------------------------------

Centered layout.

Structure:
- Circular portrait image centered at top (150px)
- Section heading below image
- Biography paragraph below
- Two-column text layout on desktop, single column on mobile
- Optional: short personal statement in green italics

Tone:
Personal, welcoming, leadership-oriented.

-----------------------------------
4. SERVICES SECTION
-----------------------------------

Display 3 service cards in a grid.

Card Style:
- White background
- Forest green top border accent (4px)
- Rounded corners (12px)
- Subtle hover elevation (shadow deepens)
- Warm amber icon accent

Each card includes:
- Icon placeholder in green/amber
- Service title
- Short description

Services:
- Youth Training
- Private Coaching
- Community Camps

-----------------------------------
5. SUCCESS STORIES SECTION
-----------------------------------

Showcase 2 athlete or parent transformation stories.

Layout:
- Two-column card grid on desktop, stacked on mobile
- White cards with green left border accent

Each card includes:
- Athlete/parent name (bold, Poppins)
- Role label (e.g. "Quarterback, age 12") in forest green, small caps
- Story paragraph (warm, narrative — 2–3 sentences)
- Result badge: green pill with bold result text at the bottom

Style:
- Warm and personal — reads like a parent testimonial, not a scouting report
- Subtle rounded corners matching card system
- Light green background behind result badge

-----------------------------------
6. TESTIMONIALS SECTION
-----------------------------------

Three-column testimonial grid.

Each testimonial includes:
- Quote text
- Small avatar placeholder (circular)
- Author name (first name + last initial)
- Role label (e.g. "Parent" or "Player, age 14")

Style:
- Clean white cards with subtle green shadow on hover
- Star rating (5 stars) in amber
- Warm and authentic presentation

-----------------------------------
7. VIDEO GALLERY SECTION
-----------------------------------

Showcase one coaching video embed.

Layout:
- Centered layout with the embed taking 70% of page width
- Light section background (#F9F9F9)

Each video:
- YouTube iframe embed (16:9, responsive)
- Title in Poppins SemiBold above
- Short description below in body text
- Forest green top border accent on the embed frame

Style:
- Section heading: "Watch Coach Williams in Action"
- Approachable, not cinematic — this is about showing real coaching style
- Subtle rounded corners on embed container

-----------------------------------
8. PHOTO GALLERY SECTION
-----------------------------------

Responsive 2-row image gallery.

Requirements:
- 6 image placeholders
- Consistent aspect ratios
- Rounded corners (8px)
- Subtle hover zoom effect

Style:
- Section heading: "On the Field"
- White section background
- Small grid gap

-----------------------------------
9. FAQ SECTION
-----------------------------------

Answer 4–5 common questions about the coaching program.

Layout:
- Accordion with gentle expand animation
- Light section background

Questions to include:
- What age groups do you train?
- Where do sessions take place?
- How many athletes are in each group session?
- How long are sessions?
- What should my athlete bring to their first session?

Style:
- Question text: Poppins SemiBold, dark charcoal
- Answer text: Inter, dark gray
- Forest green icon/indicator on expanded item
- Rounded card container for each item

-----------------------------------
10. CONTACT SECTION
-----------------------------------

Centered contact form layout.

Include:
- Section heading: "Ready to Get Started?"
- Supportive subheadline
- Name input
- Email input
- Message textarea
- Forest green submit button ("Send Message")
- Below form: "Or book directly →" linking to the booking CTA

Style:
- Clean modern form styling
- Accessible spacing
- Rounded inputs with green focus states

-----------------------------------
11. FOOTER
-----------------------------------

Simple footer.

Include:
- Coach name or logo text (centered)
- Quick nav links (About, Services, Contact)
- Social media icon placeholders (Instagram, Facebook, Twitter/X)
- Copyright line: "© 2025 Marcus Williams Football. All rights reserved."
- Disclaimer: "Results may vary. Consult a physician before beginning any exercise program."

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

## Layout C — Modern Minimal

**Identity:** Confident, editorial, white-dominant. This is the "understated excellence" layout — no dark drama, no loud color. Huge whitespace, oversized typography, a single navy accent color used sparingly. Services are a typographic numbered list, not cards. Inspired by high-end architecture firm and design studio websites applied to athletics. The coach is quietly powerful, not loud.

---

```
Design and build a clean, editorial football coach landing page.

Project Name:
Layout C — Modern Minimal

Tech Stack:
- React
- Tailwind CSS
- Fully responsive
- Single-page architecture
- Production-quality component structure

Font Loading:
- Import Playfair Display and Inter from Google Fonts. Use Playfair Display Bold/Black
  for section headings and the hero watermark. Use Inter for all body text, labels,
  and navigation. Fall back to Georgia, then serif for headings; system sans for body.
- Oversized display sizing throughout. Comfortable body size for paragraphs.

Visual Identity:
Quiet authority.
This site should feel like it was designed by an architecture studio for a top-tier coach.
Less is deliberately more — every element earns its place.

Core inspiration:
- Modern design studio websites
- Editorial sports photography books
- High-end personal brand portfolios
- Architecture and luxury brand aesthetics applied to athletics

Color System:
- Background: White (#FFFFFF) and near-white (#FAFAFA)
- Text: Near-black charcoal (#111827)
- Primary Accent: Deep Navy (#1B2B5E)
- Secondary: Medium gray (#6B7280) for labels and secondary text
- No gradients. No textures. No dark overlays.

Typography:
- Playfair Display Black for section headings (large, tight line-height)
- Playfair Display Regular in very large size for the hero watermark
- Inter SemiBold for nav and labels
- Inter Regular for body text
- Tight letter-spacing on large headings, wide letter-spacing on small labels

Design Style:
- White-dominant layout throughout
- Generous whitespace — breathing room is the design element
- Thin horizontal rules as section dividers
- Photos in clean, sharp rectangular frames (no rounded corners)
- Numbered list aesthetic for services (01, 02, 03)
- Minimal motion: thin underline slides on hover for links
- Navy used sparingly — only for key accents, not backgrounds

Overall feeling:
"A serious professional who doesn't need to shout."

Placeholder Content:
Use realistic placeholder content throughout — not lorem ipsum. Use:
- Coach name: Jordan Hayes
- City/region: Orange Park, FL
- Headline: "Precision Training. Proven Results."
- Subheadline: "Private football coaching in Orange Park, FL"
- Stats: "250+ Athletes Coached", "10 Years Experience", "QB Specialist"
- Bio: 2–3 sentences in a measured, confident tone — no hype, just facts and results
- Philosophy statement: A single powerful sentence in large italic type, e.g.
  "Every rep is either building a champion or building a habit you'll have to break."
- Services: Quarterback Development, Offensive Line Mechanics, Film & Strategy
- Success stories: Two athletes with precise, understated language — numbers and outcomes,
  not emotion. E.g. "Devon A. — 3.4 QBR to 7.1 QBR in a single off-season."
- Testimonials: One featured large quote, clean and measured in tone
- Videos: One embed placeholder, title "Film Session: Reading the Defense"
- FAQ: 5 questions, answers short and direct — no warm preamble
- Phone: (904) 555-0165 | Email: coach@jordanhayesfootball.com
- Use placeholder image URLs (e.g. https://placehold.co/800x1000/1B2B5E/ffffff)
  with navy or charcoal backgrounds for portrait, white/gray for gallery

Page Structure:
Navigation → Hero → Stats Bar → About → Services → Success Stories →
Testimonials → Video Gallery → Photo Gallery → FAQ → Contact → Footer

-----------------------------------
0. NAVIGATION (STICKY)
-----------------------------------

Minimalist sticky top navigation.

Include:
- Left: "Jordan Hayes" in Playfair Display, navy
- Right: Nav links in Inter small caps, tracking-widest, dark charcoal
- Far right: CTA "Book a Consult" as a thin navy underline or minimal text link — not a pill button
- Mobile: Clean slide-in menu, white background

Style:
- White background, no shadow until scrolled
- Single thin bottom border in light gray on scroll
- Utterly clean — no backgrounds, no box shadows in initial state

-----------------------------------
1. HERO SECTION
-----------------------------------

Asymmetric editorial hero.

Layout:
- Left 55%: Content block, top-aligned
- Right 45%: Portrait photo in sharp rectangular frame with thin navy border

Background element:
- Coach's last name ("HAYES") as a massive watermark in Playfair Display, very light
  gray opacity (#F3F4F6), spanning full hero width behind all content

Content block:
- Small label at top: "ORANGE PARK, FL" in Inter uppercase, navy, tracking-widest
- Thin navy horizontal rule (2px, 40px wide) below label
- Large bold headline in Playfair Display, 3 lines max
- Subheadline in Inter Regular, gray
- Primary CTA: "Schedule a Consult" — navy text with animated underline, or minimal outline button

Style:
- No dark overlays
- Clean whitespace dominates
- Photo is color, rectangular, no filter

Mobile:
- Stack: photo above content
- Remove watermark on small screens

-----------------------------------
2. STATS BAR
-----------------------------------

Understated stats row.

Display 3 statistics:
- 250+ Athletes Coached
- 10 Years Experience
- QB Specialist

Style:
- White background with thin navy top and bottom borders
- Numbers in Playfair Display, large, navy
- Labels in Inter uppercase, small, gray
- Equal spacing, no background fills on cells
- Optional: thin vertical separators in light gray

-----------------------------------
3. ABOUT SECTION
-----------------------------------

Single-column editorial layout.

Structure:
- Thin navy section label at top left: "ABOUT THE COACH" in Inter uppercase
- Large philosophy statement in Playfair Display Italic, centered, very large (2–3 lines)
  — this is the visual centerpiece of the section
- Below: two-column layout
  - Left: small portrait photo in clean rectangular frame
  - Right: bio paragraphs in Inter Regular

Style:
- Measured, confident tone
- Philosophy quote visually dominant — about 48–64px on desktop

-----------------------------------
4. SERVICES SECTION
-----------------------------------

Typographic numbered list layout — NOT cards.

Structure:
- Three list items, each spanning full width
- Separated by thin horizontal rules

Each item includes:
- Large number (01, 02, 03) in Playfair Display, navy, very large, left-aligned
- Service title in Inter SemiBold, uppercase
- One-sentence description in Inter Regular, gray
- Optional: thin right-aligned price or duration label

Services:
- 01 — Quarterback Development
- 02 — Offensive Line Mechanics
- 03 — Film & Strategy

Style:
- No card backgrounds
- Pure typography — the layout IS the design element
- Numbers are very large (80–100px) acting as visual anchors

-----------------------------------
5. SUCCESS STORIES SECTION
-----------------------------------

Two outcome-focused athlete stories, editorial style.

Layout:
- Two columns on desktop, stacked on mobile
- No card backgrounds — just content with thin left border in navy

Each story includes:
- Athlete name in Playfair Display, large
- Role/position in Inter uppercase, navy, tracking-wide
- Story in Inter Regular (2 sentences, precise and factual)
- Result in Inter SemiBold on its own line: one sentence, e.g.
  "Devon A. — QB Rating improved from 3.4 to 7.1 in a single off-season."

Style:
- Thin navy left border (3px) on each story block
- No fills, no pill badges — understated
- Section label: "RESULTS" in small caps above

-----------------------------------
6. TESTIMONIALS SECTION
-----------------------------------

Single large featured testimonial, full-width centered.

Layout:
- Full section width, centered
- White background

Include:
- Large decorative opening quotation mark in navy (very large, Playfair Display)
- Quote in Playfair Display Italic, large (32–40px)
- Attribution: name in Inter SemiBold, role in Inter Regular gray
- No avatar, no stars — clean attribution line only

Style:
- Restrained, literary feel
- Quote as the only visual element on the page for this section

-----------------------------------
7. VIDEO GALLERY SECTION
-----------------------------------

One clean video embed.

Layout:
- Centered, 70% page width on desktop
- White section background

Each video:
- YouTube iframe, 16:9, responsive
- Title in Inter SemiBold, dark, above embed
- Short description in Inter Regular, gray, below embed
- Thin navy border frame around embed (4px)

Style:
- No background fills
- Section label: "ON FILM" in small caps
- Clean, understated — video as a document, not spectacle

-----------------------------------
8. PHOTO GALLERY SECTION
-----------------------------------

Masonry-style 5-photo grid.

Requirements:
- 5 image placeholders in varied heights
- No rounded corners (sharp, editorial)
- Subtle hover: navy overlay at 20% opacity
- Tight gap between photos

Style:
- Section label: "IN THE FIELD" in small caps above
- White background

-----------------------------------
9. FAQ SECTION
-----------------------------------

Direct Q&A list — no accordion needed, just stacked items.

Layout:
- Single column, constrained width (max 800px, centered)

Questions to include:
- What age groups do you train?
- Where do sessions take place?
- How long are sessions?
- What does a typical session look like?
- Do you accept athletes of all experience levels?

Style:
- Question in Inter SemiBold, dark charcoal
- Answer in Inter Regular, gray
- Thin horizontal rule between items
- No backgrounds, no icons — pure typography

-----------------------------------
10. CONTACT SECTION
-----------------------------------

Two-column minimal contact layout.

Left column:
- Large heading: "LET'S TALK." in Playfair Display
- Phone in Inter Medium, large
- Email in Inter Medium
- Short statement: "Direct reply within 24 hours."

Right column — minimal form:
- Name input (borderless bottom-border style)
- Email input
- Message textarea
- Navy text "Send Message →" as submit — styled as a text link, not a button

Style:
- White section background
- Inputs use subtle bottom-border-only style, no box borders
- No decorative elements — just the content

-----------------------------------
11. FOOTER
-----------------------------------

Ultra-minimal footer.

Include:
- Left: "Jordan Hayes Football" in Inter small caps, gray
- Center: nav links in Inter, small, gray
- Right: social icon placeholders
- Copyright line in very small gray text
- Disclaimer: "Results may vary. Consult a physician before beginning any exercise program."

Style:
- White background
- Single thin top border
- No colored backgrounds

-----------------------------------
ADDITIONAL REQUIREMENTS
-----------------------------------

- Prioritize whitespace over decoration
- Never use colored backgrounds except navy for isolated accent elements
- All motion should be subtle: underlines sliding in, opacity transitions — nothing bouncy
- Use semantic HTML
- Organize code into reusable React components
- Tailwind utility classes only
- Keep implementation clean and production-ready

Output:
Return complete React component code using Tailwind CSS. Name it Layout C — Modern Minimal.
```

---

## Layout D — Story First

**Identity:** Warm, narrative, trust-led. Navy + warm white + serif headings (Playfair Display). This layout intentionally places Testimonials immediately after the Stats Bar — before About and Services. The philosophy: visitors need to see proof of results before they're ready to hear the pitch. Everything is editorial, personal, like a long-form magazine profile.

> **Note:** Section order deviation — Testimonials appear at position 3, before About (4) and Services (5). This is an intentional structural decision.

---

```
Design and build a warm, story-driven football coach landing page.

Project Name:
Layout D — Story First

Tech Stack:
- React
- Tailwind CSS
- Fully responsive
- Single-page architecture
- Production-quality component structure

Font Loading:
- Import Playfair Display and Lato from Google Fonts. Use Playfair Display Bold for
  section headings and the hero headline. Use Playfair Display Italic for pull quotes
  and testimonial text. Use Lato for all body text, nav, and labels.
  Fall back to Georgia, serif for headings; system sans-serif for body.

Visual Identity:
Trust through story.
Lead with social proof and human narrative before services and pitch.
The visitor should feel the weight of Coach Torres's track record before they see a single service listed.

Core inspiration:
- Long-form editorial profiles
- Sports documentary aesthetics
- Player development stories in print
- The Sunday magazine feel — but warm and accessible, not cold

Color System:
- Background: Warm white (#FFFEF8 or #FAF9F6)
- Primary: Deep Navy (#1E3A5F)
- Secondary accent: Warm amber (#D97706) for subtle highlights
- Text: Dark charcoal (#1A1A2E)
- Card backgrounds: Very light warm cream (#F5F0E8)

Typography:
- Playfair Display Bold for headings
- Playfair Display Italic for testimonials and pull quotes
- Lato Regular/SemiBold for body, labels, and nav
- Warm, editorial hierarchy

Design Style:
- Light-mode throughout
- Warm tones — not clinical white
- Portrait-style photography (tall, close, personal)
- Generous margins
- Pull quotes in Playfair Italic, large
- Understated but warm hover states

Overall feeling:
"You can trust this coach before you finish reading the first section."

Placeholder Content:
Use realistic placeholder content throughout — not lorem ipsum. Use:
- Coach name: Michael Torres
- City/region: Fleming Island, FL
- Headline: "The Coach Who Builds More Than Players."
- Subheadline: "Private football coaching in Clay County, FL"
- Stats: "180+ Athletes Coached", "7 Years Coaching", "Offensive Specialist"
- Testimonials (shown FIRST): 3 quotes — make them specific, emotional, credible
  (parent, former player, and current player perspective)
- Bio: 2 paragraphs — origin story + coaching philosophy
- Pull quote from bio: One sentence in Playfair Italic to feature
- Services: QB & Skill Position Training, Camp Prep & Recruiting, Film Study & Gameplanning
- Success stories: Two athletes — detailed, warm narratives, 3–4 sentences each
- Videos: One embed placeholder titled "Coach Torres — Player Development Philosophy"
- FAQ: 5 questions about training philosophy, commitment expected, age groups,
  session structure, and how he works with parents
- Phone: (904) 555-0143 | Email: coach@michaeltorresfootball.com
- Use placeholder image URLs (e.g. https://placehold.co/800x1200/1E3A5F/FFFEF8)
  with navy and warm backgrounds

Page Structure:
Navigation → Hero → Stats Bar → Testimonials → About → Services →
Success Stories → Video Gallery → Photo Gallery → FAQ → Contact → Footer

NOTE: Testimonials appear at position 3 — before About and Services.
This trust-first ordering is the defining structural feature of Layout D.

-----------------------------------
0. NAVIGATION (STICKY)
-----------------------------------

Warm sticky navigation bar.

Include:
- Left: "Michael Torres" in Playfair Display, navy
- Right: Nav links in Lato, small caps
- Far right: "Book a Session" — navy outlined button, warm rounded corners
- Mobile: Clean hamburger with slide-down nav, warm white background

Style:
- Warm white background
- Thin bottom border in light warm gray on scroll
- Welcoming, not aggressive

-----------------------------------
1. HERO SECTION
-----------------------------------

Centered full-screen hero with large portrait.

Layout:
- Full-height hero area
- Large coach photo (tall, portrait-style), centered or slightly right-of-center
- Photo has a very subtle dark vignette at bottom
- Centered text overlay on lower portion of photo

Content:
- Headline centered over photo in Playfair Display Bold, white, large
- Subheadline in Lato, white/80
- Two CTA buttons below:
  - Primary: "Book a Session" — navy fill
  - Secondary: "Read My Story" — white ghost button with thin border

Style:
- Photo is warm, personal — coach should look approachable
- Text overlay uses gradient from transparent to dark navy at bottom

-----------------------------------
2. STATS BAR
-----------------------------------

Warm stats strip, immediately below hero.

Display 3 statistics:
- 180+ Athletes Coached
- 7 Years Coaching
- Offensive Specialist

Style:
- Warm cream background (#F5F0E8)
- Numbers in Playfair Display, large, navy
- Labels in Lato uppercase, amber or dark gray
- Clean horizontal strip, full width

-----------------------------------
3. TESTIMONIALS SECTION
-----------------------------------

POSITION: Immediately after Stats Bar — before About and Services.
This is the trust-first anchor. Visitors see proof before they see the pitch.

Display 3 testimonial cards on a warm-toned background strip.

Layout:
- Three-column card row on desktop, stacked on mobile

Each card:
- Soft cream card background (#F5F0E8)
- Large Playfair Display Italic quote text (18–22px)
- Attribution: name in Lato SemiBold, role in Lato Regular, amber accent
- Optional: small avatar circle (initials if no photo)

Style:
- Warm, not clinical
- Subtle drop shadow on cards
- Section heading: "WHAT FAMILIES ARE SAYING" in Lato uppercase, navy

-----------------------------------
4. ABOUT SECTION
-----------------------------------

Two-column narrative layout.

Left column:
- Large portrait photo with warm amber border offset (subtle design detail)
- Below photo: small "EST. 2017" badge in Lato, amber

Right column:
- Section label: "ABOUT COACH TORRES" in Lato uppercase, navy
- Heading: "Football Coaching as a Calling, Not a Career." in Playfair Display
- Two paragraphs of bio
- Pull quote in Playfair Display Italic, large (one sentence floated in the margin or
  displayed as a full-width callout between paragraphs), in navy

Style:
- Generous whitespace
- Personal and readable — not a resume, a story

-----------------------------------
5. SERVICES SECTION
-----------------------------------

Three warm service cards.

Card Style:
- Cream background (#F5F0E8)
- Navy top accent bar (4px)
- Rounded corners (12px)
- Amber icon accent
- Subtle hover lift

Each card includes:
- Icon in amber
- Title in Playfair Display SemiBold
- 2-line description in Lato
- Optional: small price label in gray

Services:
- QB & Skill Position Training
- Camp Prep & Recruiting
- Film Study & Gameplanning

-----------------------------------
6. SUCCESS STORIES SECTION
-----------------------------------

Two athlete transformation narratives — longer, warmer, more story than stats.

Layout:
- Alternating layout: first story left-text / right-image, second story right-text / left-image
- Or two full-width warm cards stacked

Each story:
- Athlete name in Playfair Display, large
- Role/team label in Lato, amber
- Story paragraph (3–4 sentences — warm, personal, narrative)
- Result line in Lato SemiBold, navy: key measurable outcome

Style:
- Warm cream card background
- Navy left border accent
- No stat badges — let the narrative carry weight

-----------------------------------
7. VIDEO GALLERY SECTION
-----------------------------------

One coaching philosophy video embed.

Layout:
- Centered, 65% page width on desktop
- Warm cream section background

Each video:
- YouTube iframe (16:9, responsive)
- Title in Playfair Display above
- Short description in Lato below
- Navy thin border frame on embed

Style:
- Warm section background to match the page tone
- Section heading: "IN COACH'S OWN WORDS" in Lato uppercase

-----------------------------------
8. PHOTO GALLERY SECTION
-----------------------------------

Wide single-row horizontal photo strip.

Requirements:
- 5 photos in a horizontal scrollable row (or fixed row that wraps on mobile)
- Consistent tall aspect ratio (portrait-style)
- Subtle hover: warm amber tint at 15% opacity
- Soft rounded corners (4px)

Style:
- Warm white background
- Section label: "ON THE FIELD" in Lato small caps

-----------------------------------
9. FAQ SECTION
-----------------------------------

Warm, coach-voice Q&A accordion.

Layout:
- Single column, constrained to ~720px, centered
- Warm cream background

Questions to include:
- What is your coaching philosophy?
- How much commitment is expected from my athlete?
- What age groups do you train?
- What does a typical session look like?
- How do you work with parents?

Style:
- Question in Playfair Display SemiBold
- Answer in Lato Regular, warm charcoal
- Amber chevron indicator on open item
- Warm cream background on expanded item

-----------------------------------
10. CONTACT SECTION
-----------------------------------

Warm-toned contact form, centered layout.

Include:
- Section heading in Playfair Display: "Let's Talk About Your Athlete."
- Supportive subheadline in Lato
- Three-field form: Name, Email, Message
- Navy submit button with warm hover: "Send a Message"
- Below form: phone and email as plain text links

Style:
- Warm cream section background
- Rounded form inputs with navy focus border
- No cold-sale energy — this is a conversation opener

-----------------------------------
11. FOOTER
-----------------------------------

Warm footer.

Include:
- "Michael Torres Football" in Playfair Display, navy
- Quick nav links in Lato
- Social icons: Instagram, Facebook, YouTube
- Copyright line: "© 2025 Michael Torres Football. All rights reserved."
- Disclaimer: "Results may vary. Consult a physician before beginning any exercise program."

Style:
- Warm cream or light navy background
- Matches the warm page tone

-----------------------------------
ADDITIONAL REQUIREMENTS
-----------------------------------

- Never use harsh whites or aggressive dark mode
- The pace of the page should feel deliberate — section to section builds a relationship
- All copy is specific, warm, and personal — no generic marketing language
- Use semantic HTML
- Organize code into reusable React components
- Tailwind utility classes only
- Keep implementation clean and production-ready

Output:
Return complete React component code using Tailwind CSS. Name it Layout D — Story First.
```

---

## Layout E — Premium Elite

**Identity:** Luxury recruiting aesthetic. Deep navy background (#0B1628), champagne gold (#C9A84C), sharp geometry, credentials front and center. This layout targets the high-achieving athlete or well-resourced family who wants to see proof of pedigree and selectivity before anything else. Feels like a prep school admissions page crossed with D1 recruiting materials.

---

```
Design and build a premium, credentials-forward football coach landing page.

Project Name:
Layout E — Premium Elite

Tech Stack:
- React
- Tailwind CSS
- Fully responsive
- Single-page architecture
- Production-quality component structure

Font Loading:
- Import Montserrat and Inter from Google Fonts. Use Montserrat Bold/ExtraBold
  for headings — with selective use of italic. Use Inter for body text and labels.
  Fall back to Helvetica Neue, Arial, sans-serif.
- Track headings tightly. Use all-caps Montserrat for section labels and eyebrows.

Visual Identity:
Premium recruiting.
This site should feel like the coach's resume and credentials are the product — not just his personality.
Athletes and parents who come here are evaluating: can this coach take my player to the next level?

Core inspiration:
- D1 college recruiting materials
- Prestige prep school branding
- Executive search firm aesthetics applied to sports
- Understated luxury — dark materials, gold edges

Color System:
- Background: Deep navy (#0B1628 or #0D1B2A)
- Primary Accent: Champagne gold (#C9A84C)
- Text: White and light silver (#E8E8E8)
- Card backgrounds: Slightly lighter navy (#132038)
- Borders: Champagne gold at 30% opacity or thin solid lines

Typography:
- Montserrat ExtraBold for large headings
- Montserrat SemiBold Italic for feature callouts and pull lines
- Inter for body text and descriptions
- All-caps Montserrat for section labels and eyebrows
- Generous letter-spacing on labels

Design Style:
- Dark luxury throughout — navy, not black
- Champagne gold replaces electric gold — no neon, no glow
- Subtle horizontal rules in gold
- Photography: portrait, formal, lit
- Precise alignment — nothing feels loose
- Credentials badges and certification labels as visual elements
- No rounded corners on major elements — sharp, precise geometry

Overall feeling:
"This is where serious athletes come to get serious results."

Placeholder Content:
Use realistic placeholder content throughout — not lorem ipsum. Use:
- Coach name: Brandon Hughes
- City/region: Fernandina Beach, FL
- Headline: "Development Coaching for Athletes Who Mean Business."
- Subheadline: "Private football training in Nassau County, FL"
- Credentials to display: "NFCA Certified", "Former D1 Athlete", "10-Year Coaching Record",
  "35+ College Placements"
- Stats: "35+ College Placements", "10 Years Coaching", "D1 Alumni Coach"
- Bio: Measured, professional, credential-forward — emphasizes outcomes and elite experience
- Services: Individual Position Coaching, Recruiting & Film Package, Elite Skills Camp
- Success stories: Two athletes placed in college programs — specific, outcome-focused,
  institution names included
- Testimonials: Two quotes from parents and athletes — formal but genuine
- Videos: One embed placeholder titled "Brandon Hughes — Coaching Philosophy & Method"
- FAQ: 5 questions focused on commitment, outcomes, college placement, what differentiates this
  program from camps, and cost/value
- Phone: (904) 555-0121 | Email: coach@brandonhugheselite.com
- Use placeholder image URLs (e.g. https://placehold.co/800x1000/0B1628/C9A84C)
  with deep navy backgrounds

Page Structure:
Navigation → Hero → Stats Bar → About → Services → Success Stories →
Testimonials → Video Gallery → Photo Gallery → FAQ → Contact → Footer

-----------------------------------
0. NAVIGATION (STICKY)
-----------------------------------

Precise, minimal sticky navigation.

Include:
- Left: "Hughes Elite Football" in Montserrat, champagne gold
- Right: Nav links in Inter, small, white
- Far right: "Request Consultation" — champagne gold outlined button, no rounded corners
- Mobile: Minimal hamburger, dark navy slide-in panel

Style:
- Deep navy background matching page
- Thin champagne gold bottom border on scroll
- Formal and precise

-----------------------------------
1. HERO SECTION
-----------------------------------

Split layout — controlled, prestigious.

Layout:
- Left 60%: Content block
- Right 40%: Coach portrait in a tall rectangular frame with thin champagne gold border

Content block:
- Credential badge row at the top: small pill tags — "NFCA CERTIFIED · D1 ALUMNI · 10 YEARS"
  displayed in a horizontal row using small champagne gold text on navy
- Horizontal rule in champagne gold (thin, 60px)
- Large headline in Montserrat ExtraBold, white
- Subheadline in Montserrat SemiBold Italic, champagne gold
- CTA: "Request a Consultation" — champagne gold fill, dark navy text, no rounded corners

Style:
- Very precise layout — aligned to a grid
- No overlapping elements, no messy layering
- Portrait is sharp, formal, well-lit
- Champagne gold used for 3 elements only: rule, italic subheadline, CTA button

-----------------------------------
2. STATS BAR
-----------------------------------

Prestige stats strip.

Display 3 statistics:
- 35+ College Placements
- 10 Years Coaching
- D1 Alumni Coach

Style:
- Dark navy background (slightly lighter than page)
- Numbers in Montserrat ExtraBold, champagne gold, large
- Labels in Inter uppercase, silver/gray
- Thin champagne gold separators between stats
- No fills on cells — clean float in dark

-----------------------------------
3. ABOUT SECTION
-----------------------------------

Two-column professional profile layout.

Left:
- Portrait photo with thin champagne gold border frame
- Below: credentials row (badges or tag list — "NFCA Certified", "Former D1 Athlete",
  "10-Year Record") in small champagne gold type

Right:
- Section label: "ABOUT COACH HUGHES" in Montserrat uppercase, champagne gold
- Heading in Montserrat ExtraBold, white
- Bio paragraphs in Inter, white/80
- One pull quote in Montserrat SemiBold Italic, champagne gold

Style:
- Credentials are visible design elements — not buried in text
- Professional magazine profile energy

-----------------------------------
4. SERVICES SECTION
-----------------------------------

Three premium service cards.

Card Style:
- Dark navy card backgrounds (#132038)
- Thin champagne gold top border (2px)
- No rounded corners
- Subtle hover: gold border glow

Each card includes:
- Service title in Montserrat SemiBold
- 2-sentence description in Inter, white/75
- Optional bottom right: "Learn More →" in champagne gold

Services:
- Individual Position Coaching
- Recruiting & Film Package
- Elite Skills Camp

-----------------------------------
5. SUCCESS STORIES SECTION
-----------------------------------

Two college placement outcomes — outcomes and institutions featured.

Layout:
- Two-column grid, dark navy cards with champagne gold left accent

Each story:
- Athlete name in Montserrat ExtraBold, white
- Placement result as the PRIMARY visual element — large, gold text:
  e.g. "Signed: University of North Florida — Full Scholarship"
- Role/program in Inter, silver
- Story paragraph in Inter, white/75 (precise, outcome-focused language)

Style:
- Result line is larger than the athlete name — the outcome leads
- Section label: "PLACEMENT RECORD" in Montserrat uppercase, champagne gold

-----------------------------------
6. TESTIMONIALS SECTION
-----------------------------------

Two formal testimonial cards.

Layout:
- Side by side on desktop, stacked on mobile
- Dark navy cards, champagne gold quotation marks

Each card:
- Playfair Display Italic quote text OR Montserrat Regular Italic
- Attribution: name in Montserrat SemiBold, role in Inter, silver

Style:
- Measured, serious tone — not hype
- No stars, no emoji — straightforward credibility signals

-----------------------------------
7. VIDEO GALLERY SECTION
-----------------------------------

One professional video embed — framed as a content piece, not marketing.

Layout:
- Centered, 65% width on desktop
- Dark navy section background

Each video:
- YouTube iframe (16:9, responsive)
- Title in Montserrat SemiBold, white, above
- Short description in Inter, silver, below
- Thin champagne gold border frame on embed

Style:
- Section label: "THE METHOD" in small caps, champagne gold

-----------------------------------
8. PHOTO GALLERY SECTION
-----------------------------------

Precise 4-column photo grid.

Requirements:
- 8 photos in a 4-column grid (2 rows)
- Sharp rectangular crops
- Hover: champagne gold overlay at 15%
- No rounded corners

Style:
- Section heading: "PROGRAM GALLERY" in Montserrat uppercase
- Dark section background

-----------------------------------
9. FAQ SECTION
-----------------------------------

Formal Q&A accordion focused on program commitment and outcomes.

Questions to include:
- What differentiates your program from a standard skills camp?
- What level of commitment is expected from athlete and family?
- Do you assist with college recruiting outreach?
- What age groups and positions do you work with?
- What is the cost and what does it include?

Style:
- Question in Montserrat SemiBold, white
- Answer in Inter, white/75
- Champagne gold expand icon
- Thin champagne gold separator lines

-----------------------------------
10. CONTACT SECTION
-----------------------------------

Formal inquiry form — premium, not mass-market.

Left column:
- Heading: "REQUEST A CONSULTATION" in Montserrat ExtraBold
- Subline: "Roster is selective. Limited spots per quarter." (creates appropriate
  sense of exclusivity without being off-putting)
- Phone and email

Right column:
- Name input
- Email input
- Athlete's position and age (textarea or two inputs)
- "Submit Inquiry" — champagne gold button, no rounded corners

Style:
- Dark navy section background
- Gold focus borders on inputs
- Formal, not casual

-----------------------------------
11. FOOTER
-----------------------------------

Minimal dark footer with formal branding.

Include:
- "Hughes Elite Football" in Montserrat, champagne gold
- Nav links in Inter, silver
- Social icons: Instagram, YouTube
- Copyright: "© 2025 Brandon Hughes Elite Football. All rights reserved."
- Disclaimer: "Results may vary. College placement is not guaranteed. Consult a physician before beginning any exercise program."

Style:
- Deep navy background
- Thin champagne gold top border

-----------------------------------
ADDITIONAL REQUIREMENTS
-----------------------------------

- No neon, no glow effects — elegance, not flash
- Champagne gold replaces all instances of electric yellow/orange
- Photography framing should feel editorial and formal
- Use semantic HTML
- Organize code into reusable React components
- Tailwind utility classes only
- Keep implementation clean and production-ready

Output:
Return complete React component code using Tailwind CSS. Name it Layout E — Premium Elite.
```

---

## Layout F — High Energy

**Identity:** Pure kinetic energy. Near-black background with electric teal (#00D4B4), diagonal cuts separating sections, Barlow Condensed Bold headlines. Every section implies motion — offset grids, angled dividers, overlapping elements. Designed for the coach who's also a brand: social media presence, reels, training highlights. The athlete who comes here is driven, social-media-native, hungry.

---

```
Design and build a kinetic, high-energy football coach landing page.

Project Name:
Layout F — High Energy

Tech Stack:
- React
- Tailwind CSS
- Fully responsive
- Single-page architecture
- Production-quality component structure

Font Loading:
- Import Barlow Condensed and Barlow from Google Fonts. Use Barlow Condensed Bold and
  ExtraBold for all headings and display text. Use Barlow Regular for body text.
  Fall back to Impact, Condensed, sans-serif.
- Headings should be very large, very tight, uppercase.

Visual Identity:
Relentless forward motion.
Every section should feel like it's accelerating — diagonal layouts, offset grids,
strong directional lines. The visual language is velocity.

Core inspiration:
- Sports energy drink branding
- Athlete highlight reel aesthetics
- Motion graphics and kinetic typography
- Training montage energy
- Social media athlete content

Color System:
- Background: Near-black (#0A0A0A)
- Primary Accent: Electric Teal (#00D4B4)
- Secondary: White (#FFFFFF)
- Tertiary: Dark teal (#004D45) for section variations
- Text: White and light gray (#CCCCCC)

Typography:
- Barlow Condensed ExtraBold for hero headline and section headings (uppercase)
- Barlow Condensed Bold for subheadings and stats
- Barlow Regular for body text
- Very tight line-height on large headings

Design Style:
- Dark-mode throughout
- Diagonal section dividers (clip-path or SVG) between sections
- Offset grid layouts with elements bleeding across gutters
- Angled background patterns or diagonal stripe texture
- Teal used as a bold fill AND a text color
- Sharp drop shadows in teal on hover
- Strong sense of speed and directionality

Overall feeling:
"This coach moves at a different speed than everyone else."

Placeholder Content:
Use realistic placeholder content throughout — not lorem ipsum. Use:
- Coach name: DeShawn Reed
- City/region: Jacksonville, FL
- Headline: "No Limits. No Excuses. Just Work."
- Subheadline: "Jacksonville's fastest-growing football performance program"
- Stats: "400+ Athletes Trained", "11 Years Coaching", "Speed Specialist"
- Bio: High-energy, first-person voice — short punchy sentences, coach talks directly
  to the athlete
- Services: Speed & Explosiveness, Route Running, Full Combine Prep
- Success stories: Two athletes — improvements in 40-yard dash time, vertical, etc.
  Lead with the numbers
- Testimonials: Two high-energy quotes — athletes, not parents
- Videos: One embed placeholder titled "40-Yard Dash Technique — Unlocked"
- FAQ: 5 questions — focused on results, what the program demands, timeline to results
- Phone: (904) 555-0188 | Email: coach@deshreedperformance.com
- Use placeholder image URLs (e.g. https://placehold.co/1200x800/0A0A0A/00D4B4)
  with dark backgrounds and teal text

Page Structure:
Navigation → Hero → Stats Bar → About → Services → Success Stories →
Testimonials → Video Gallery → Photo Gallery → FAQ → Contact → Footer

-----------------------------------
0. NAVIGATION (STICKY)
-----------------------------------

Bold, kinetic sticky nav.

Include:
- Left: "D. REED PERFORMANCE" in Barlow Condensed Bold, teal
- Right: Nav links in Barlow, uppercase, white
- Far right: "GET STARTED" — teal fill button, no rounded corners, uppercase
- Mobile: Dark panel, teal accents

Style:
- Near-black background
- Teal bottom border on scroll
- Bold and direct

-----------------------------------
1. HERO SECTION
-----------------------------------

Diagonal split hero — the defining visual of this layout.

Layout:
- Photo takes right 60% of screen
- Content block left 40%
- A diagonal line (clip-path or angled border) separates them
- The split angle suggests forward motion (leaning right)

Content block (left):
- Small teal label: "JACKSONVILLE, FL · SPEED & PERFORMANCE"
- Large headline in Barlow Condensed ExtraBold, white, all-caps
- Subheadline in Barlow, teal
- "GET STARTED" — teal fill button, uppercase, sharp corners

Style:
- Photo: color, high contrast, athletic action
- Diagonal separator in teal or a hard clip-path cut
- No soft gradients — hard edges

Mobile:
- Photo full-width on top, content below
- Diagonal becomes horizontal rule

-----------------------------------
2. STATS BAR
-----------------------------------

Kinetic stats strip.

Display 3 statistics:
- 400+ Athletes Trained
- 11 Years Coaching
- Speed Specialist

Style:
- Dark teal background (#004D45)
- Numbers in Barlow Condensed ExtraBold, white, very large
- Labels in Barlow, uppercase, teal-light (#99EEE6)
- Slightly angled (2–3°) rotated text or subtle diagonal background pattern

-----------------------------------
3. ABOUT SECTION
-----------------------------------

Offset two-column with overlapping elements.

Layout:
- Left: Coach photo (tall, action-style if possible)
- Right: Content, offset slightly upward with a teal accent element overlapping the photo
  (e.g. a teal rectangle or number badge)

Content:
- "ABOUT DESHAWN" in Barlow Condensed, teal, uppercase, large
- Bio in Barlow — punchy, first-person, conversational
- "The approach" callout box: dark teal background, bold white text summarizing method

Style:
- Overlapping offset layout — not a simple 2-column grid
- Teal accent element bridges the two columns visually

-----------------------------------
4. SERVICES SECTION
-----------------------------------

Three bold service items in a horizontal strip with diagonal separators.

Layout:
- Full-width dark section
- Three panels side by side with angled dividers between them

Each panel:
- Teal icon (large)
- Service title in Barlow Condensed ExtraBold, white, uppercase
- 2-sentence description in Barlow Regular

Services:
- Speed & Explosiveness
- Route Running
- Full Combine Prep

Style:
- Near-black backgrounds
- Teal top border on each panel
- Subtle diagonal cut between panels

-----------------------------------
5. SUCCESS STORIES SECTION
-----------------------------------

Two performance improvement stories — numbers lead.

Layout:
- Full-width panels, stacked
- Each spans full width with asymmetric image/text layout

Each story:
- The improvement NUMBER is the hero: large, teal, Barlow Condensed ExtraBold
  (e.g. "-0.3s" for 40-yard dash improvement, "+8 inches" for vertical)
- Below number: "40-YARD DASH" or relevant metric label in small caps
- Athlete name and story paragraph in Barlow Regular
- Result line in bold teal

Style:
- Dark background
- The metric/number is treated as the visual anchor, not the athlete name
- Section heading: "THE PROOF" in Barlow Condensed ExtraBold

-----------------------------------
6. TESTIMONIALS SECTION
-----------------------------------

Two bold athlete quotes.

Layout:
- Side by side, dark cards
- Large teal quotation mark

Each card:
- Quote in Barlow Condensed, italic if available, white — large
- Attribution in Barlow, teal, uppercase
- No stars — athlete energy, not customer review energy

Style:
- Slightly angled card or diagonal inner element for kinetic feel

-----------------------------------
7. VIDEO GALLERY SECTION
-----------------------------------

One training video — marketed as training content, not self-promotion.

Layout:
- Full-width or near-full-width embed
- Dark section background

Each video:
- YouTube iframe (16:9)
- Title in Barlow Condensed ExtraBold, teal, above
- Short description in Barlow below
- Sharp teal border frame

Style:
- Section heading: "WATCH THE WORK" in Barlow Condensed ExtraBold

-----------------------------------
8. PHOTO GALLERY SECTION
-----------------------------------

4-column tight action photo grid.

Requirements:
- 8 photos in a 4×2 grid
- No rounded corners
- Hover: teal overlay at 20%
- Very tight gap (2px)

Style:
- Section heading: "IN ACTION." in Barlow Condensed ExtraBold
- Dark background

-----------------------------------
9. FAQ SECTION
-----------------------------------

Direct, no-nonsense Q&A.

Questions to include:
- How fast can I expect to see improvement?
- What separates your program from other speed coaches?
- How many sessions per week do you recommend?
- Do you work with players at all positions?
- What's the minimum commitment to get results?

Style:
- Question in Barlow Condensed Bold, teal, uppercase
- Answer in Barlow Regular, white/80
- Sharp horizontal rules between items

-----------------------------------
10. CONTACT SECTION
-----------------------------------

High-urgency contact section.

Left column:
- Heading: "READY TO PUT IN THE WORK?"
- Urgency subline: "Spots fill fast. Don't wait for the season to make a move."
- Phone and email

Right column — form:
- Name input
- Email input
- Message textarea
- "LET'S GO" — teal fill button, uppercase, sharp corners

Style:
- Dark section background
- Teal focus borders
- Urgent energy — not pushy, but forward-leaning

-----------------------------------
11. FOOTER
-----------------------------------

Minimal dark footer.

Include:
- "DeShawn Reed Performance" in Barlow Condensed Bold, teal
- Nav links in Barlow, white
- Social: Instagram, YouTube, Twitter/X
- Copyright: "© 2025 DeShawn Reed Performance. All rights reserved."
- Disclaimer: "Results may vary. Consult a physician before beginning any exercise program."

Style:
- Near-black background
- Teal top border

-----------------------------------
ADDITIONAL REQUIREMENTS
-----------------------------------

- Every section should feel directional — use diagonal cuts, offsets, and asymmetric layouts
- Motion should suggest speed — fast transitions, hard cuts
- Avoid soft rounded corners on primary elements
- Use semantic HTML
- Organize code into reusable React components
- Tailwind utility classes only

Output:
Return complete React component code using Tailwind CSS. Name it Layout F — High Energy.
```

---

## Layout G — Local Legend

**Identity:** Vintage, community-rooted, deeply local. Warm off-white (#F5F0E8) backgrounds, forest green + rust/burnt orange, a slab serif headline font (Roboto Slab or Arvo), newspaper column grid. This layout feels like a feature story in the local sports section — not a startup, not a national brand. The coach is an institution. "EST. 20XX" badge appears in the hero.

---

```
Design and build a warm, heritage-inspired football coach landing page.

Project Name:
Layout G — Local Legend

Tech Stack:
- React
- Tailwind CSS
- Fully responsive
- Single-page architecture
- Production-quality component structure

Font Loading:
- Import Roboto Slab and Roboto from Google Fonts. Use Roboto Slab Bold for all
  headings. Use Roboto Slab Regular for subheadings and pull quotes. Use Roboto
  Regular for body text and labels. Fall back to Georgia, serif; system sans-serif.
- Slab serif gives a newspaper/editorial feel without being stodgy.

Visual Identity:
Local sports institution.
This is a coach who has been part of the community for years and everyone knows him.
The aesthetic honors that history — warm, grounded, built-in-place.

Core inspiration:
- Local newspaper sports sections
- Small-town high school football traditions
- Vintage athletic posters and pennants
- Heritage brand identities (like old-school sporting goods stores)
- Friday night lights — but the community version, not the cinematic version

Color System:
- Background: Warm off-white (#F5F0E8) and cream (#FEFCE8)
- Primary: Forest Green (#1B5E38)
- Accent: Rust / Burnt Orange (#C45419)
- Text: Dark warm charcoal (#1C1C14)
- Card backgrounds: Cream (#FEFCE8) with subtle warm shadows

Typography:
- Roboto Slab Bold for headings
- Roboto Slab Regular for subheadings and quotes
- Roboto Regular for body text
- Warm, grounded hierarchy — no ultra-thin weights

Design Style:
- Warm off-white dominant
- Newspaper column grid for the About section
- Vintage typographic details: small caps, tracked labels, EST. badge
- Subtle paper texture or warm noise overlay on hero
- Photography: candid, natural, community-feeling
- No neon, no glow — muted, warm, honest

Overall feeling:
"This coach has been part of this community for years. Trust is earned here."

Placeholder Content:
Use realistic placeholder content throughout — not lorem ipsum. Use:
- Coach name: Bobby Simmons
- City/region: Palatka, FL
- EST. year: 2015
- Headline: "Putnam County's Football Coach Since 2015."
- Subheadline: "Developing athletes and leaders in Palatka, FL"
- Stats: "160+ Athletes Coached", "9 Years Coaching", "Community Roots"
- Bio: Warm, community-focused narrative — mentions family, local ties, years in the area
- "Est. 2015" as a design badge in the hero
- Services: Youth Development, Fundamentals Camp, Skills & Drills
- Success stories: Two athletes, told in warm local-paper style —
  mention specific local teams (Palatka High, etc.)
- Testimonials: Three quotes — parent, community member, former athlete
- Videos: One embed placeholder titled "Coach Simmons — Fundamentals Matter"
- FAQ: 5 questions — warm, conversational answers written in the coach's voice
- Phone: (386) 555-0133 | Email: coach@bobbysimmonsfootball.com
- Use placeholder image URLs (e.g. https://placehold.co/800x600/1B5E38/F5F0E8)
  with forest green backgrounds

Page Structure:
Navigation → Hero → Stats Bar → About → Services → Success Stories →
Testimonials → Video Gallery → Photo Gallery → FAQ → Contact → Footer

-----------------------------------
0. NAVIGATION (STICKY)
-----------------------------------

Heritage sticky navigation.

Include:
- Left: "COACH SIMMONS" in Roboto Slab Bold, forest green — with a small pennant or
  helmet icon in rust/orange beside it
- Right: Nav links in Roboto small caps, dark charcoal
- Far right: "Book Training" — forest green outlined button, slightly rounded
- Mobile: Clean menu, warm white background

Style:
- Warm off-white or cream background
- Thin forest green bottom border on scroll
- Grounded and warm

-----------------------------------
1. HERO SECTION
-----------------------------------

Full-bleed hero with warm overlay and "EST." badge.

Layout:
- Full-width photo background (community setting — sideline, field, practice)
- Warm dark overlay (dark warm brown, not black)
- Left-aligned content block

Content:
- "EST. 2015" badge at top — round or shield shape, rust orange, Roboto Slab
- Large headline in Roboto Slab Bold, warm white
- Subheadline in Roboto, warm white/80
- Primary CTA: "Start Training" — forest green fill, slightly rounded
- Optional: small "Palatka, FL" location label in rust orange above headline

Style:
- Warm, not cinematic
- Badge feels like a stamp of local legitimacy
- Subtle paper texture overlay on hero

-----------------------------------
2. STATS BAR
-----------------------------------

Warm heritage stats strip.

Display 3 statistics:
- 160+ Athletes Coached
- 9 Years in the Community
- Local Roots, Real Results

Style:
- Forest green background
- Numbers in Roboto Slab Bold, cream/white
- Labels in Roboto, warm white/80, uppercase, small caps
- Clean, no aggressive glow

-----------------------------------
3. ABOUT SECTION
-----------------------------------

Newspaper column layout — editorial, community feel.

Structure:
- Top: Large section heading "ABOUT COACH SIMMONS" with a thin rust accent line below
- Body: Three-column text layout (newspaper style) on desktop, single column on mobile
- Pull quote floated within the columns in Roboto Slab Italic, large, rust orange
- Portrait photo embedded within the column flow (left column, beside text)

Style:
- Column lines (thin vertical rules between columns, light gray) optional
- Feels like a feature story
- Pull quote visually anchors the section

-----------------------------------
4. SERVICES SECTION
-----------------------------------

Three warm service cards.

Card Style:
- Cream card backgrounds (#FEFCE8)
- Forest green top border accent
- Warm drop shadow
- Slightly rounded corners (8px)
- Rust icon accent

Each card:
- Icon in rust/orange
- Title in Roboto Slab Bold
- 2-sentence description in Roboto

Services:
- Youth Development
- Fundamentals Camp
- Skills & Drills

-----------------------------------
5. SUCCESS STORIES SECTION
-----------------------------------

Two local-paper style athlete feature stories.

Layout:
- Two cards, stacked or side-by-side
- Cream backgrounds, forest green left border

Each story:
- Athlete name in Roboto Slab Bold
- Team/year label: "Palatka High School, Class of '23" — in rust orange
- Story paragraph (3 sentences, warm and specific — mentions the community)
- Result: one sentence in Roboto SemiBold, forest green

Style:
- Feels like a "Local Player Profile" from the sports section
- Section heading: "THEIR STORY" in Roboto Slab

-----------------------------------
6. TESTIMONIALS SECTION
-----------------------------------

Three warm community testimonials.

Layout:
- Three-column on desktop, stacked on mobile
- Cream card backgrounds with warm shadows

Each card:
- Quote in Roboto Slab Regular Italic
- Attribution: name + role (e.g. "Parent of a Palatka High junior")
- Optional: 5-star rating in rust orange

Style:
- Warm, local — reads like a word-of-mouth recommendation
- No glossy marketing feel

-----------------------------------
7. VIDEO GALLERY SECTION
-----------------------------------

One coaching video embed — approachable, real.

Layout:
- Centered, warm cream section background

Each video:
- YouTube iframe (16:9)
- Title in Roboto Slab Bold, forest green, above
- Short description in Roboto below
- Warm forest green border frame

Style:
- Section heading: "FUNDAMENTALS FIRST" in Roboto Slab

-----------------------------------
8. PHOTO GALLERY SECTION
-----------------------------------

Natural, community-feeling 3-column photo grid.

Requirements:
- 6 photos in 3×2 grid
- Slight warm border radius (4px)
- Hover: warm rust tint at 15%
- Tight gap

Style:
- Section heading: "ON THE FIELD" in Roboto Slab
- Warm cream background

-----------------------------------
9. FAQ SECTION
-----------------------------------

Warm, conversational Q&A in the coach's voice.

Questions to include:
- Who do you typically work with?
- Do you need prior experience to train with you?
- Where do sessions take place in Putnam County?
- How long has this program been running?
- What does a typical week look like for your athletes?

Style:
- Question in Roboto Slab Bold, forest green
- Answer in Roboto Regular — warm, direct, reads like the coach talking
- Thin rust separator lines between items
- Accordion with gentle expand

-----------------------------------
10. CONTACT SECTION
-----------------------------------

Warm, inviting contact form.

Include:
- Section heading: "Come Train With Us." in Roboto Slab
- Subheadline: warm invitation, not urgency
- Name, email, message
- "Send a Message" — forest green button

Contact info beside form:
- Phone, email, city, years in community

Style:
- Warm cream section background
- Warm shadows on form container
- Inviting — community notice board energy

-----------------------------------
11. FOOTER
-----------------------------------

Heritage footer.

Include:
- "Coach Bobby Simmons Football · Palatka, FL · Est. 2015" centered in Roboto Slab
- Nav links in Roboto
- Social: Facebook, Instagram
- Copyright: "© 2025 Bobby Simmons Football. All rights reserved."
- Disclaimer: "Results may vary. Consult a physician before beginning any exercise program."

Style:
- Forest green background
- Cream text
- Warm and grounded

-----------------------------------
ADDITIONAL REQUIREMENTS
-----------------------------------

- Never cold or corporate — everything should feel like it came from the community
- Pull quotes, column layouts, and heritage typography are this layout's signature
- Use semantic HTML
- Organize code into reusable React components
- Tailwind utility classes only

Output:
Return complete React component code using Tailwind CSS. Name it Layout G — Local Legend.
```

---

## Layout H — Data Driven

**Identity:** Numbers-first, metrics-obsessed. White background, dark charcoal, bold orange (#FF6B35) as accent. Clean geometric sans-serif (DM Sans or similar). Every section leads with a number, metric, or percentage. This is the layout for the coach who can back up every claim with data — and knows his audience wants proof, not vibes.

---

```
Design and build a metrics-forward football coach landing page.

Project Name:
Layout H — Data Driven

Tech Stack:
- React
- Tailwind CSS
- Fully responsive
- Single-page architecture
- Production-quality component structure

Font Loading:
- Import DM Sans and DM Mono from Google Fonts. Use DM Sans Bold/ExtraBold for
  headings. Use DM Mono for all metric displays, stats, and data callouts.
  Use DM Sans Regular for body text. Fall back to system sans-serif.
- The monospace font for numbers gives a data/analytics dashboard feel.

Visual Identity:
Performance analytics meets athletic coaching.
This site feels like a performance tracker: clean, precise, numbers everywhere.
Every claim is backed by a number. Every section opens with a metric.

Core inspiration:
- Sports analytics dashboards
- Athlete performance tracking apps
- Clean SaaS product landing pages applied to coaching
- Nike Training Club or Whoop app aesthetics

Color System:
- Background: Clean white (#FFFFFF) and very light gray (#F8F9FA)
- Primary: Dark charcoal (#1A1A2E)
- Accent: Bold orange (#FF6B35)
- Secondary: Medium gray (#6B7280) for secondary text
- Data displays: Dark charcoal backgrounds for metric callout boxes

Typography:
- DM Sans ExtraBold for headings
- DM Mono for all numbers, stats, metrics, and data labels
- DM Sans Regular for body text
- Very clean hierarchy — precision over personality

Design Style:
- Light-mode throughout
- White dominant with light gray section alternations
- Orange used strategically for key metrics and CTA elements
- Clean geometric shapes — no organic curves
- Data visualization aesthetic (progress bars, metric cards)
- Tight, precise grid alignment
- Minimal decoration — grid lines and data are the design

Overall feeling:
"This coach knows exactly what he's measuring and exactly how to move the needle."

Placeholder Content:
Use realistic placeholder content throughout — not lorem ipsum. Use:
- Coach name: Aaron Mitchell
- City/region: Ponte Vedra, FL
- Headline: "Every Rep Measured. Every Athlete Improved."
- Subheadline: "Performance-based football coaching in St. Johns County, FL"
- Stats: "92% of athletes improved 40-time within 8 weeks", "11 Years Coaching",
  "150+ Athletes Tracked"
- Hero metric callout: "Average 0.2s improvement in 40-yard dash"
- Bio: Analytical, evidence-based voice — mentions tracking, data, specific methods
- Services: Performance Testing & Baseline, Position-Specific Skills, Progress Tracking
- Success stories: Two athletes with before/after metrics — specific numbers
- Testimonials: Two quotes focused on measurable improvement
- Videos: One embed placeholder titled "How We Measure Progress — A Coach's Breakdown"
- FAQ: 5 questions about measurement, how progress is tracked, what metrics matter,
  how long before results, what the initial assessment looks like
- Phone: (904) 555-0154 | Email: coach@aaronmitchellfootball.com
- Use placeholder image URLs (e.g. https://placehold.co/800x600/1A1A2E/FF6B35)
  with charcoal backgrounds

Page Structure:
Navigation → Hero → Stats Bar → About → Services → Success Stories →
Testimonials → Video Gallery → Photo Gallery → FAQ → Contact → Footer

-----------------------------------
0. NAVIGATION (STICKY)
-----------------------------------

Clean analytical navigation.

Include:
- Left: "MITCHELL PERFORMANCE" in DM Sans Bold, charcoal
- Right: Nav links in DM Sans, dark gray
- Far right: "Get Assessed" — orange fill button, clean geometric shape
- Mobile: White panel, clean hamburger

Style:
- White background
- Thin orange bottom border on scroll
- Clean and precise

-----------------------------------
1. HERO SECTION
-----------------------------------

Split layout with metric callout boxes.

Layout:
- Left 55%: Content
- Right 45%: Photo with overlapping metric callout card

Content:
- Large metric callout at top (styled like a data card):
  dark charcoal background, DM Mono number in orange:
  "0.2s faster" (average 40-yard dash improvement) with label below
- Large headline in DM Sans ExtraBold, charcoal
- Subheadline in DM Sans, gray
- "Get Assessed" — orange button

Photo side:
- Coach photo in clean frame
- Overlapping metric card in bottom-left: another key stat (dark card, orange number)

Style:
- Metrics are the first thing you read on this page
- Clean light background
- No decorative overlays — the data IS the decoration

-----------------------------------
2. STATS BAR
-----------------------------------

Data strip — emphasis on measurable outcomes.

Display 3 statistics:
- 92% Athletes Improved 40-Time
- 11 Years Coaching
- 150+ Athletes Tracked

Style:
- Light gray background strip
- DM Mono numbers in orange, very large
- DM Sans labels, charcoal, uppercase small
- Clean horizontal separators (1px, light gray)

-----------------------------------
3. ABOUT SECTION
-----------------------------------

Two-column layout with baseline metrics.

Left:
- Coach photo
- Below: "BASELINE METRICS" mini-card
  (small dark card listing 3 key things he tracks: 40-time, vertical, agility)
  — in DM Mono, orange accents

Right:
- Section label: "THE APPROACH" in DM Sans uppercase
- Heading in DM Sans ExtraBold
- Bio paragraphs — analytical voice, mentions measurement, progress tracking
- Optional: orange horizontal progress bar (visual metaphor for "improvement")

Style:
- Data card inset is the unique visual detail
- Clean, credible

-----------------------------------
4. SERVICES SECTION
-----------------------------------

Three service cards with progress indicators.

Card Style:
- White cards with orange top border
- Clean geometric shapes, no rounded corners
- Subtle shadow

Each card includes:
- Service title in DM Sans Bold
- Description in DM Sans Regular
- Optional: small progress bar or metric indicator at card bottom
  (visual: "Week 1 → Week 8 → measurable result")

Services:
- Performance Testing & Baseline
- Position-Specific Skills
- Progress Tracking Program

-----------------------------------
5. SUCCESS STORIES SECTION
-----------------------------------

Two before/after athlete profiles — metrics lead everything.

Layout:
- Two-column on desktop
- Each card: clean white, orange left border

Each story:
- Before/After metric display at top:
  two DM Mono values side by side — e.g. "4.9s → 4.7s" (40 time)
  with a small orange arrow between them
- Athlete name and role below
- Story paragraph (2–3 sentences, specific and factual)

Style:
- The metric visual is the hero of each card
- Section heading: "THE NUMBERS" in DM Sans uppercase

-----------------------------------
6. TESTIMONIALS SECTION
-----------------------------------

Two testimonial cards with metric context.

Layout:
- Side by side on desktop

Each card:
- Quote in DM Sans Italic
- Attribution
- Optional: one-line metric callout below attribution:
  "Athlete improved 40-time by 0.3 seconds in 6 weeks." — in DM Mono, orange

Style:
- Clean white cards
- Orange quotation mark accent

-----------------------------------
7. VIDEO GALLERY SECTION
-----------------------------------

One video — framed as a methodology breakdown.

Layout:
- Centered, light gray section background

Each video:
- YouTube iframe (16:9)
- Title in DM Sans Bold above
- Short description below
- Clean orange top border on embed container

Style:
- Section heading: "THE METHOD, ON FILM" in DM Sans uppercase

-----------------------------------
8. PHOTO GALLERY SECTION
-----------------------------------

Precise 3-column grid.

Requirements:
- 6 photos
- No rounded corners
- Hover: orange overlay at 15%
- Light gray gap between photos

Style:
- Section heading: "TRAINING SESSIONS" in DM Sans uppercase
- Light gray section background

-----------------------------------
9. FAQ SECTION
-----------------------------------

Analytical Q&A — specific, concise answers.

Questions to include:
- What does the initial assessment include?
- How do you track and report progress?
- What metrics matter most for my position?
- How long before I see measurable improvement?
- Do you share data reports with athletes and parents?

Style:
- Question in DM Sans SemiBold, charcoal
- Answer in DM Sans Regular — precise and specific
- Orange expand icon
- Clean horizontal rules

-----------------------------------
10. CONTACT SECTION
-----------------------------------

Assessment-focused contact.

Left:
- Heading: "START WITH AN ASSESSMENT."
- Subline: "Know your baseline. Know your goal. Build a plan."
- Phone and email

Right:
- Name, email, and one additional field: "What position does your athlete play?"
- "Book Your Assessment" — orange button

Style:
- Clean white section background
- Precise grid alignment
- Orange focus borders

-----------------------------------
11. FOOTER
-----------------------------------

Clean minimal footer.

Include:
- "Mitchell Performance · Ponte Vedra, FL" in DM Sans
- Nav links
- Social: Instagram, YouTube
- Copyright: "© 2025 Aaron Mitchell Performance. All rights reserved."
- Disclaimer: "Results may vary. Consult a physician before beginning any exercise program."

Style:
- Dark charcoal background
- White text, orange accent links

-----------------------------------
ADDITIONAL REQUIREMENTS
-----------------------------------

- Numbers should appear in DM Mono throughout — never DM Sans for metric displays
- Orange is used sparingly for maximum impact — don't overuse it
- Every section should open with or prominently feature a number or metric
- Use semantic HTML
- Organize code into reusable React components
- Tailwind utility classes only

Output:
Return complete React component code using Tailwind CSS. Name it Layout H — Data Driven.
```

---

## Layout I — Magazine Editorial

**Identity:** Warm white, deep burgundy (#7B1D1D), and cream. Playfair Display headlines, long-form editorial spreads, photography that fills space like a magazine double-page. This layout treats the coach's story as the product — it reads slowly, luxuriously. Designed for the coach who has a compelling personal narrative and wants the site to feel like a profile in a sports magazine.

---

```
Design and build a long-form, editorial football coach landing page.

Project Name:
Layout I — Magazine Editorial

Tech Stack:
- React
- Tailwind CSS
- Fully responsive
- Single-page architecture
- Production-quality component structure

Font Loading:
- Import Playfair Display and Source Sans 3 (or Lato) from Google Fonts.
  Use Playfair Display Bold/Black for headings and large display text.
  Use Playfair Display Italic for pull quotes, testimonials, and featured callouts.
  Use Source Sans 3 (or Lato) Regular/SemiBold for body text, nav, and labels.
  Fall back to Georgia, serif; system sans for body.
- The combination should feel like a premium sports publication.

Visual Identity:
Sports magazine profile.
This isn't a landing page — it's a story. The visitor should feel like they're reading
a well-crafted profile piece about an exceptional coach. Long paragraphs are fine.
Photography fills the space.

Core inspiration:
- Sports Illustrated long-form profiles
- ESPN The Magazine double-page spreads
- Athlete profile books
- High-end sports journalism aesthetics

Color System:
- Background: Warm white (#FDFCFB) and cream (#FAF6EF)
- Primary: Deep burgundy (#7B1D1D)
- Secondary: Warm gray (#8B7D77)
- Text: Near-black warm (#1C1108)
- Card backgrounds: Cream (#FAF6EF)

Typography:
- Playfair Display Black for hero headline (very large)
- Playfair Display Bold for section headings
- Playfair Display Italic for pull quotes (large)
- Source Sans 3 Regular for body text (comfortable reading size)
- Small caps for section labels and eyebrows

Design Style:
- Warm white dominant
- Full-bleed photography between sections (horizontal image breaks)
- Magazine-style pull quotes breaking columns
- Generous leading (line-height) on all body text
- Burgundy used for select headings, borders, and accent elements
- Photography at full section width — not just an inset

Overall feeling:
"This coach's story is worth reading start to finish."

Placeholder Content:
Use realistic placeholder content throughout — not lorem ipsum. Use:
- Coach name: Victor Castillo
- City/region: St. Augustine, FL
- Headline: "The Coach Who Turned This City's Athletes Into Champions."
- Subheadline: "Twelve years building football in St. Johns County."
- Opening statement (large italic display text): 
  "Every player I've ever coached — I still know their name."
- Stats: "12 Years Coaching", "220+ Athletes Coached", "St. Augustine Legacy"
- Bio: Long-form, 3–4 paragraphs — origin story, formative moment, coaching philosophy,
  what drives him
- Pull quotes within bio (2–3 chosen sentences)
- Services: Private Skills Sessions, Pre-Season Intensive, Quarterback Academy
- Success stories: Two athletes with narrative arc — intro, challenge, transformation, outcome.
  Each 4–5 sentences.
- Testimonials: Three quotes — long, specific, personal
- Videos: One embed, titled "Coach Castillo — Twelve Years in St. Augustine"
- FAQ: 5 questions about coaching philosophy, commitment, how he approaches first sessions,
  parent involvement, what to expect in year one
- Phone: (904) 555-0109 | Email: coach@victorcastillofootball.com
- Use placeholder image URLs (e.g. https://placehold.co/1600x800/7B1D1D/FAF6EF)
  with burgundy and cream tones

Page Structure:
Navigation → Hero → Stats Bar → About → Services → Success Stories →
Testimonials → Video Gallery → Photo Gallery → FAQ → Contact → Footer

-----------------------------------
0. NAVIGATION (STICKY)
-----------------------------------

Editorial navigation — minimal and elegant.

Include:
- Left: "Victor Castillo Football" in Playfair Display, burgundy
- Right: Nav links in Source Sans 3, small caps, warm gray
- Far right: "Book a Session" — thin burgundy border text button
- Mobile: Clean, editorial menu panel

Style:
- Warm white background
- Thin burgundy bottom border on scroll
- Elegant, never functional-looking

-----------------------------------
1. HERO SECTION
-----------------------------------

Full-bleed magazine cover hero.

Layout:
- Full-height section
- Large coach photo at right or center (portrait, close, expressive)
- Left-side content block over dark-to-transparent gradient on left side

Content:
- Small label at top: "ST. AUGUSTINE, FL" in Source Sans small caps, burgundy
- Very large headline in Playfair Display Black, white
- Opening statement in Playfair Display Italic, white/85, large — the emotional hook
- CTA: "Read His Story" or "Book a Session" — understated, elegant

Style:
- Photo is warm, personal, expressive — not an action shot
- Color treatment: slightly desaturated with warm tone
- Headline is enormous — the dominant visual element

-----------------------------------
2. STATS BAR
-----------------------------------

Understated editorial stats.

Display 3 statistics:
- 12 Years Coaching
- 220+ Athletes
- St. Augustine Legacy

Style:
- Cream background strip
- Numbers in Playfair Display Bold, burgundy
- Labels in Source Sans small caps, warm gray
- Thin warm horizontal rules above and below strip

-----------------------------------
3. ABOUT SECTION
-----------------------------------

Long-form editorial profile — the heart of this layout.

Structure:
- Full-width intro image (optional — full-bleed photo strip at top of section)
- Heading in Playfair Display Bold, large
- Body text in 2-column Source Sans layout (magazine article feel)
- Pull quotes breaking the columns: Playfair Display Italic, large (40–48px), burgundy
- Portrait photo embedded in column flow or floating beside a paragraph
- Bio should be 3–4 paragraphs — this is deliberately long-form

Style:
- This section is the most distinctive — feels like reading a real article
- Column rules (thin, warm gray) between text columns
- No rush — generous padding, large type, breathing room

-----------------------------------
4. SERVICES SECTION
-----------------------------------

Three editorial service listings.

Layout:
- Not cards — large typographic items with a visual element

Each item:
- Service number (I, II, III) in Playfair Display, very large, burgundy/muted
- Service title in Playfair Display Bold
- Description in Source Sans, 2–3 sentences
- Thin warm separator below each item

Services:
- Private Skills Sessions
- Pre-Season Intensive
- Quarterback Academy

Style:
- Roman numerals as large decorative anchors
- Understated elegant layout — no boxes, no fills

-----------------------------------
5. SUCCESS STORIES SECTION
-----------------------------------

Two full athlete narrative profiles — long form.

Layout:
- Full-width cards, cream background
- Each card is a mini magazine profile

Each story:
- Athlete name in Playfair Display Bold, large
- Team and year in Source Sans small caps, burgundy
- Full narrative paragraph (4–5 sentences) in Source Sans
- Pull quote within the story in Playfair Italic
- Outcome line in Playfair Display SemiBold, burgundy

Style:
- These feel like real feature pieces — detailed, human, specific
- Section heading: "THEIR JOURNEY" in Playfair Display

-----------------------------------
6. TESTIMONIALS SECTION
-----------------------------------

Three long-form testimonials — specific and personal.

Layout:
- Three columns on desktop, stacked on mobile
- Cream card backgrounds

Each card:
- Long quote in Playfair Display Italic (3–5 sentences — not just a tagline)
- Attribution: name, role, relationship to coach
- Warm shadow on card

Style:
- These are not blurbs — they're real statements
- Section heading: "VOICES FROM THE COMMUNITY" in Source Sans small caps

-----------------------------------
7. VIDEO GALLERY SECTION
-----------------------------------

One editorial video feature.

Layout:
- Full-width or near-full-width embed
- Cream section background

Each video:
- Large YouTube iframe
- Title in Playfair Display Bold above
- Longer description (2–3 sentences) in Source Sans below
- Burgundy left border accent on embed container

Style:
- Section heading: "IN HIS OWN WORDS" in Source Sans small caps, burgundy

-----------------------------------
8. PHOTO GALLERY SECTION
-----------------------------------

Full-bleed editorial photo spread.

Requirements:
- 5 photos in a masonry or irregular editorial grid
- Some photos full-width, some side-by-side
- Warm color treatment on hover (cream tint, 15%)
- No rounded corners

Style:
- Section heading: "TWELVE YEARS IN ST. AUGUSTINE" in Playfair Display
- Photos should feel like a photo essay, not a gallery widget

-----------------------------------
9. FAQ SECTION
-----------------------------------

Thoughtful Q&A in the coach's voice.

Questions to include:
- What is your coaching philosophy in one sentence?
- What should parents expect from the first session?
- How involved are you with each athlete beyond the field?
- What is your approach with athletes who are struggling?
- How do you define success for the athletes you coach?

Style:
- Question in Playfair Display SemiBold, burgundy
- Answer in Source Sans — longer, thoughtful, personal
- Thin warm separators between items

-----------------------------------
10. CONTACT SECTION
-----------------------------------

Warm, story-conclusion contact.

Structure:
- Full-width closing statement: a final line in Playfair Display Italic, large —
  a parting thought from Coach Castillo
- Below: simple two-column contact form

Left:
- Phone and email listed elegantly
- Short invitation line: "I answer every message personally."

Right:
- Name, email, message
- "Send a Message" — burgundy button, elegant

Style:
- Cream section background
- The closing quote above the form makes this feel like the end of an article

-----------------------------------
11. FOOTER
-----------------------------------

Editorial footer.

Include:
- "Victor Castillo Football · St. Augustine, FL" in Playfair Display, burgundy
- Nav links in Source Sans small caps
- Social: Instagram, YouTube
- Copyright: "© 2025 Victor Castillo Football. All rights reserved."
- Disclaimer: "Results may vary. Consult a physician before beginning any exercise program."

Style:
- Cream or warm white background
- Thin burgundy top border

-----------------------------------
ADDITIONAL REQUIREMENTS
-----------------------------------

- The page should reward reading — not skimming
- Long-form body text is a feature, not a bug
- Every photo should feel like it belongs in a magazine spread
- Use semantic HTML
- Organize code into reusable React components
- Tailwind utility classes only

Output:
Return complete React component code using Tailwind CSS. Name it Layout I — Magazine Editorial.
```

---

## Layout J — Camp & Clinic

**Identity:** Event poster energy. Black + bold red + white. Anton or Impact headlines, uppercase everything, multiple bold callout boxes suggesting event dates and limited registration. This layout is for the coach whose primary revenue comes from camps and clinics — registration is the primary CTA, and urgency is the design language. Feels like a sports poster or event flyer converted into a landing page.

---

```
Design and build a high-urgency, event-focused football coach landing page.

Project Name:
Layout J — Camp & Clinic

Tech Stack:
- React
- Tailwind CSS
- Fully responsive
- Single-page architecture
- Production-quality component structure

Font Loading:
- Import Anton and Barlow from Google Fonts. Use Anton for all major headings,
  hero text, and section titles. Use Barlow SemiBold for subheadings and callout text.
  Use Barlow Regular for body text and descriptions. Fall back to Impact, Arial Black,
  sans-serif.
- Anton should be used at large sizes — this is a poster, not a website.

Visual Identity:
Sports event poster.
This landing page should feel like a well-designed event flyer — bold, direct, urgent.
Registration is the primary goal of every section. There should always be a CTA within reach.

Core inspiration:
- Sports camp registration flyers
- Nike/Under Armour promotional event materials
- High school all-star game promotional graphics
- Bold screen-printed poster aesthetics

Color System:
- Background: True black (#000000) and very dark charcoal (#0D0D0D)
- Primary Accent: Bold red (#E01E1E or #DC2626)
- Secondary: White (#FFFFFF)
- Highlight: Yellow-white (#FFFDE7) for occasional warmth
- Card backgrounds: Very dark charcoal (#141414)

Typography:
- Anton for hero headline and section titles (very large, uppercase)
- Barlow SemiBold Italic for subheadings and callouts
- Barlow Regular for body text
- Wide letter-spacing on Anton, tight on Barlow headings

Design Style:
- Pure black dominant
- Red used for maximum-urgency elements: CTAs, limited availability badges, section headers
- White for readability
- Event poster geometry: bold rectangles, diagonal accent bars, stencil-style overlays
- Photography: action, intense, competitive — not casual
- Urgency signals throughout: "LIMITED SPOTS", "REGISTER NOW", "SPOTS FILLING FAST"
- Strong sense of "you have a deadline"

Overall feeling:
"If you don't register this week, you'll miss it."

Placeholder Content:
Use realistic placeholder content throughout — not lorem ipsum. Use:
- Coach name: Kevin Davis (known as "Coach K")
- City/region: Orange Park, FL
- Headline: "COACH K'S FOOTBALL CAMP — REGISTER NOW."
- Subheadline: "Clay County's Premier Football Training Experience"
- Urgency copy: "Summer 2025 · Limited Roster · 40 Spots Available"
- Stats: "500+ Camp Alumni", "10 Camps & Counting", "Clay County's Largest Football Camp"
- Bio: Direct, camp-focused — talks about the camp experience, what athletes leave with,
  what makes this camp different
- Services: listed as CAMP SESSIONS with dates, ages, prices:
  - Summer Skills Camp · Ages 8–14 · $149/athlete · July 14–18
  - Elite QB Intensive · Ages 13–18 · $99 · July 21–22
  - Team Defensive Camp · By group · $299/team · August 4
- Success stories: Two athletes who came through the camp and went on to varsity/college
- Testimonials: Three high-energy quotes from parents and athletes
- Videos: One embed placeholder titled "Coach K Summer Camp — 2024 Highlights"
- FAQ: 5 questions about registration, what to bring, age groups, refund policy,
  what the camp schedule looks like
- Phone: (904) 555-0177 | Email: coach@coachkfootball.com
- Registration link: "#register" (anchor — form at bottom)
- Use placeholder image URLs (e.g. https://placehold.co/1200x800/0D0D0D/E01E1E)
  with dark backgrounds and red text

Page Structure:
Navigation → Hero → Stats Bar → About → Services (as camp listings) → Success Stories →
Testimonials → Video Gallery → Photo Gallery → FAQ → Contact/Registration → Footer

-----------------------------------
0. NAVIGATION (STICKY)
-----------------------------------

Bold, event-style navigation.

Include:
- Left: "COACH K FOOTBALL" in Anton, red
- Right: Nav links in Barlow, uppercase, white
- Far right: "REGISTER NOW" — red fill button, no rounded corners, uppercase, Anton
- Sticky urgency bar ABOVE the main nav (optional):
  A thin red strip with "SUMMER 2025 REGISTRATION OPEN · 40 SPOTS AVAILABLE" in white
- Mobile: Dark panel, red accent

Style:
- Black background
- Red bottom border
- Urgent and direct

-----------------------------------
1. HERO SECTION
-----------------------------------

Event poster hero.

Layout:
- Full-bleed background (action photo or dark field at night)
- Strong dark overlay
- Centered content block

Content:
- "SUMMER 2025" badge top center — red rectangle, Anton
- Large event-style headline in Anton, white — very large
- Subheadline in Barlow SemiBold Italic, red
- Urgency line: "40 SPOTS. JULY 14–18. ORANGE PARK, FL." in Barlow, white
- Primary CTA: "REGISTER NOW" — red button, very large, Anton
- Secondary: "CAMP DETAILS ↓" in white text link

Style:
- Poster composition — centered, bold, stacked type
- No soft gradients — high contrast
- Event flyer energy

-----------------------------------
2. STATS BAR
-----------------------------------

Camp-specific stats.

Display 3 statistics:
- 500+ Camp Alumni
- 10 Camps & Counting
- Clay County's #1 Camp

Style:
- Very dark charcoal background
- Anton numbers, white, very large
- Barlow labels, red, uppercase
- Sharp clean strip

-----------------------------------
3. ABOUT SECTION
-----------------------------------

Camp director bio — focused on camp, not generic coaching.

Two-column layout.

Left:
- Coach photo
- Below: "ORANGE PARK, FL" location badge

Right:
- "ABOUT COACH K" in Anton, red
- Heading in Anton, white
- Bio focused on camp experience: what he builds, what athletes get
- Camp philosophy statement in Barlow Italic, white/85

Style:
- Black background
- Red section heading
- Direct, camp-operator energy

-----------------------------------
4. SERVICES SECTION
-----------------------------------

Camp listings — not generic service cards. These are events with dates and prices.

Layout:
- Three camp event cards, side by side

Each card:
- Camp name in Anton, white
- Date in Barlow SemiBold, red
- Age range and price in Barlow Regular, white/80
- Short description (what athletes gain from this camp)
- "REGISTER →" button — red fill, Anton

At bottom of section:
- Bold urgency statement: "SPOTS FILL FAST. PAST CAMPS HAVE SOLD OUT." in white on dark charcoal

Style:
- Dark charcoal cards with red top border
- Price is visible and clear — no hidden fees energy
- This is a purchase decision section

-----------------------------------
5. SUCCESS STORIES SECTION
-----------------------------------

Two camp-to-outcome athlete stories.

Layout:
- Two full-width panels

Each story:
- Athlete name in Anton, white, large
- "CAMP ALUMNI" badge in red
- Story paragraph (3 sentences — what they came in as, what they left with, where they are now)
- Outcome line: e.g. "Earned starting varsity position following summer camp."

Style:
- Section heading: "WHAT CAMP PRODUCES" in Anton, red
- Dark background

-----------------------------------
6. TESTIMONIALS SECTION
-----------------------------------

Three high-energy parent and athlete quotes.

Layout:
- Three columns, dark cards

Each card:
- Short, punchy quote in Barlow SemiBold Italic, white (1–2 sentences max)
- Attribution in Anton, red, uppercase

Style:
- Red quotation mark accent
- Energy is enthusiastic — not testimonial form, real reaction

-----------------------------------
7. VIDEO GALLERY SECTION
-----------------------------------

Camp highlight video — recruitment-style.

Layout:
- Full-width embed
- Dark section background

Each video:
- YouTube iframe (16:9)
- Title in Anton, red, above
- Short description in Barlow below

Style:
- Section heading: "LAST SUMMER. YOUR TURN NEXT." in Anton
- A sub-label: "2024 Camp Highlights — 3 min" in Barlow below the heading

-----------------------------------
8. PHOTO GALLERY SECTION
-----------------------------------

Camp action photo grid — 4 columns, tight.

Requirements:
- 8 photos in a 4×2 grid
- No rounded corners
- Hover: red overlay at 20%
- Very tight gap (2px)

Style:
- Section heading: "LAST SUMMER'S CAMP" in Anton, white
- Dark section background

-----------------------------------
9. FAQ SECTION
-----------------------------------

Registration-focused FAQ.

Questions to include:
- How do I register and what is the deadline?
- What is your refund policy?
- What should my athlete bring to camp?
- Is this camp right for beginners or only experienced players?
- What does the daily schedule look like?

Style:
- Question in Anton, white or red, uppercase
- Answer in Barlow Regular, white/80
- Red expand icon
- Thin red separator lines

-----------------------------------
10. CONTACT / REGISTRATION SECTION
-----------------------------------

Registration call-to-action — the page's goal.

Layout:
- Full-width section with registration as the primary call

Left column:
- Section heading: "LOCK IN YOUR SPOT." in Anton, white
- Availability status: "37 of 40 spots claimed." (progress bar in red)
- Urgency: "Registration closes June 30, 2025."
- Phone and email

Right column:
- Name, athlete age/position, email inputs
- "REGISTER NOW" — large red button, Anton
- Below: "Questions? Email us first — we'll reply same day."

Style:
- Black section background
- Red urgency signals
- Progress bar showing limited availability

-----------------------------------
11. FOOTER
-----------------------------------

Direct footer with next camp dates.

Include:
- "Coach K Football · Orange Park, FL" in Anton, red
- "NEXT CAMP: JULY 14, 2025" as a callout in Barlow, white
- Nav links in Barlow
- Social: Instagram, YouTube
- Copyright: "© 2025 Coach K Football. All rights reserved."
- Disclaimer: "Results may vary. Consult a physician before beginning any exercise program."

Style:
- Black background
- Red accent

-----------------------------------
ADDITIONAL REQUIREMENTS
-----------------------------------

- Registration CTAs should appear in Nav, Hero, Services, Contact, and Footer
- Urgency signals should be present but not annoying — visual design, not popups
- Every section should have a clear next action
- Use semantic HTML
- Organize code into reusable React components
- Tailwind utility classes only

Output:
Return complete React component code using Tailwind CSS. Name it Layout J — Camp & Clinic.
```

---

## Post-Generation Checklist

After each Claude Design session, do the following before integrating:

1. **Replace all hardcoded colors** with CSS custom properties:
   - `text-gold` → `text-[var(--accent)]`
   - `#F59E0B` → `var(--accent)`
   - `rgba(245,158,11,0.1)` → `bg-[rgba(var(--accent-rgb),0.1)]`

2. **Replace placeholder content** with config reads:
   - `"Darius Carter"` → `{config.about.name}`
   - Hardcoded stats → `{config.stats.map(...)}`
   - Hardcoded services → `{config.services.map(...)}`

3. **Add `CoachConfig` type annotation** to all component props

4. **Wire design variants** — add `config.design.{variant_key}` fallback checks per section

5. **Add `.reveal` class** to all major section children for scroll animation

6. **Register in LayoutA.tsx** (or the appropriate LayoutX.tsx wrapper) sectionMap

7. **Run `npx tsc --noEmit`** — zero type errors before shipping
