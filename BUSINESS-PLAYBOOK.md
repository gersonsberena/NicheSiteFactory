# First Coast Spotlight — Business Playbook
> Last updated: 2026-05-06. This is your operating manual from zero to first paying client and beyond.

---

## Table of Contents
1. [Master Roadmap](#1-master-roadmap)
2. [Tech Stack Decisions](#2-tech-stack-decisions)
3. [Pricing Tiers](#3-pricing-tiers)
4. [Scope Limits — What You Do and Don't Do](#4-scope-limits)
5. [Video & Media Hosting](#5-video--media-hosting)
6. [Client Onboarding Process](#6-client-onboarding-process)
7. [Client Questionnaire](#7-client-questionnaire)
8. [Contracts & Legal Basics](#8-contracts--legal-basics)
9. [Ownership — Who Owns What](#9-ownership--who-owns-what)
10. [Cancellation Policy](#10-cancellation-policy)
11. [Payment & Billing Setup](#11-payment--billing-setup)
12. [Client Capacity & Sustainability](#12-client-capacity--sustainability)
13. [Brutal Honest Questions You Must Answer](#13-brutal-honest-questions-you-must-answer)

---

## 1. Master Roadmap

### Phase 0 — Foundation (Week 1–2, DO THIS FIRST)

These are non-negotiable before you send a single outreach message.

| Priority | Task | Done? |
|---|---|---|
| 1 | Set up Stripe account (or Wave) for payment processing | ✅ |
| 2 | Rebuild firstcoastspotlight.com as your agency site on Vercel | ☐ |
| 3 | Build the football coach template (Next.js + Tailwind, 1 theme) | ☐ |
| 4 | Wire up config system (`useConfig()` hook reading JSON) | ☐ |
| 5 | Add all 4 color themes | ☐ |
| 6 | Build `generate-configs.js` script (CSV → JSON) | ☐ |
| 7 | Build `deploy.js` script (auto-adds subdomain to Vercel) | ☐ |
| 8 | Create your Calendly link for discovery calls | ☐ |
| 9 | Write your outreach DM script (2-message structure) | ☐ |
| 10 | Set up a simple contract template (see Section 8) | ☐ |

**Do not start prospecting until items 1, 2, 8, 9, 10 are done.** If someone says yes and you have no contract and no way to collect payment, you will either lose the client or work for free.

---

### Phase 1 — Prospecting (Week 2–4)

| Task | Notes |
|---|---|
| Build prospect CSV with 30–50 coaches | Google Maps, Facebook groups, Instagram |
| Generate 30–50 demo sites from CSV | All variations, no two look alike |
| Deploy all to `[slug].firstcoastspotlight.com` | Automated via deploy script |
| Do visual QA pass on 5–6 random demos | Name shows correctly, theme looks sharp |
| Send Message 1 to first 15 coaches | Instagram DM or Facebook — no link yet |
| Track responses in CSV `status` column | `no_reply / replied / demo_sent / interested / declined` |
| Follow up after 3 days of no reply | One follow-up only — no spam |
| Send Message 2 (with demo link) to anyone who replies | |
| Send next 15 outreach messages | Adjust pitch based on first batch results |

---

### Phase 2 — First Client Close (whenever it happens)

When someone says yes, this is the exact sequence:

```
1. Schedule 30-min discovery call (send Calendly link)
2. On call: confirm scope, explain packages, answer questions
3. Send contract + invoice for setup fee (same day after call)
4. Wait for signed contract + payment (do NOT start work without both)
5. Send onboarding questionnaire (Section 7)
6. Collect all assets: logo, photos, bio, testimonials
7. Customize their site (5–7 business days)
8. Send preview link for their review
9. Make 1 round of revisions
10. Buy their domain + point DNS
11. Launch
12. Set up recurring monthly billing in Stripe
13. Send welcome email with how to submit future update requests
```

---

### Phase 3 — Operations (Ongoing)

| Task | Frequency |
|---|---|
| Process client update requests | As they come in (48-hr turnaround commitment) |
| Send monthly analytics report | 1st of each month (Google Analytics summary, 15 min per client) |
| Invoice follow-up on failed payments | Day 8 if autopay fails |
| Prospect new coaches | Whenever you have capacity for 1–2 more clients |
| Expand to second niche (personal trainer, etc.) | Once you have 5 stable retainer clients |

---

## 2. Tech Stack Decisions

### Next.js + Vercel (Your Stack) — DO NOT Offer Self-Maintenance

Your system is built on Next.js with a JSON config layer. This is powerful for YOU but not manageable by clients. Here is your firm policy:

**You maintain the site. Always. That is the product.**

Never offer a "build it and hand it off" option for Next.js sites. If a client insists on owning and editing the code themselves, refer them to Squarespace and charge a one-time consulting fee ($300–500) to set it up. Wish them well and move on. You lose the retainer but you don't waste time maintaining something you don't control.

### Why NOT Squarespace for your retainer clients

| Factor | Next.js (Your Stack) | Squarespace |
|---|---|---|
| Monthly cost per client | $0 (Vercel free tier) | $16–23/month (eats your margin) |
| Client can leave easily | Harder (they can't take the code) | Easy (they just log in and cancel) |
| Update speed | 10–15 min (JSON edit + redeploy) | 5–10 min (but they can do it themselves) |
| Your control | Total | Partial |
| Scale to 20 clients | $0 extra | $320–460/month in subscriptions |

At 20 Squarespace clients you'd pay $400/month just in platform fees. At 20 Next.js clients you pay $0 (or $20/month Vercel Pro for wildcard subdomains). The math is obvious.

---

## 3. Pricing Tiers

### One-Time Setup Fee (charged upfront, non-refundable)

| Package | Setup Fee | What's Included |
|---|---|---|
| **Starter** | $297 | 6-section site, stock photos, 1 theme, contact form, Calendly button embed |
| **Growth** | $497 | Everything in Starter + photo gallery (up to 12 real photos), Google Analytics, 1 round of copy edits |
| **Pro** | $797 | Everything in Growth + video section (YouTube embeds), Instagram handle in footer, Google Business Profile setup, testimonials section |

### Monthly Retainer (recurring, billed on launch date)

| Package | Monthly Fee | What's Included |
|---|---|---|
| **Starter** | $75/month | Hosting, 1 update request/month (text or photo swap), annual domain renewal management |
| **Growth** | $125/month | Hosting, 2 update requests/month, monthly analytics email summary |
| **Pro** | $175/month | Hosting, 4 update requests/month (48hr turnaround), monthly analytics report, priority support |

### Add-On Services (priced separately)

| Add-On | One-Time | Monthly |
|---|---|---|
| Instagram feed embed | $75 setup | +$15/month (third-party widget cost + management) |
| Logo design (basic, Canva-grade) | $100 | — |
| Additional round of copy edits | $50 | — |
| Rush turnaround (48hr → 24hr) | $75/request | — |
| Google Business Profile setup | $100 | — (included in Pro) |
| Domain purchase + setup | $25 service fee + domain cost | — |
| "Build only" handoff (Squarespace, no retainer) | $500–800 | $0 (you walk away) |

### What to Say When They Ask for a Discount

> "The setup fee covers my time building and customizing your site. The monthly fee is what keeps it live, maintained, and updated. I don't discount the setup fee, but if budget is tight I can start you on the Starter plan and upgrade later."

Do not discount. Discounting before they've even signed signals that your prices weren't real.

---

## 4. Scope Limits

### What You Do

- Static informational websites (who you are, what you offer, how to contact)
- Photo galleries (client-provided photos uploaded to Cloudinary)
- Video sections (YouTube or Vimeo embed links only — you do NOT host video files)
- Testimonials sections
- Contact forms (name, email, message → goes to client's email via Formspree or EmailJS)
- Calendly / booking button embed
- Google Analytics tracking
- Instagram handle link in footer
- Google Business Profile setup (one-time, Pro package)
- Domain purchase and DNS management
- Monthly text and photo updates (within request limit per package)

### What You Do NOT Do (ever, for any price)

| Off-Limits | Why |
|---|---|
| E-commerce / online payments on their site | Liability, PCI compliance, complexity — it's a different business |
| Member portals / login systems | Backend database work, far outside scope |
| Email marketing setup (Mailchimp, etc.) | Refer out — not your product |
| Custom mobile apps | Different tech stack, different pricing universe |
| SEO content writing | You can install analytics and basic meta tags, not write blog content |
| Google/Facebook ad campaigns | Different skill, different service |
| Anything requiring a backend database | Your sites are static/config-driven by design |
| Building features mid-retainer for free | Any new feature request beyond the update limit is a separate quote |

When a client asks for something off-limits, your script is:

> "That's outside what I specialize in, but I can point you to someone who does that well. What I focus on is making sure your site looks great and stays updated — that's what the retainer covers."

---

## 5. Video & Media Hosting

### Videos — Never Host Yourself

Hosting video files on Vercel or Cloudinary will consume bandwidth and cost you money at scale. Your policy:

| Scenario | Solution |
|---|---|
| Client has YouTube videos | They send you the YouTube link → you embed it (unlisted is fine) |
| Client has no YouTube channel | Tell them to upload to YouTube (free), set to Unlisted, send you the link |
| Client sends you a raw video file | Upload it to YouTube for them as part of Pro package onboarding |
| Short clips / highlight reels | Cloudinary free tier (25GB) — fine for clips under 2 min |

**YouTube unlisted** is your default recommendation. Clean player, free forever, no bandwidth cost to you, and clients already understand YouTube.

### Photos

- Client provides: you upload to Cloudinary, get URL, add to their config
- Cloudinary free tier: 25GB storage, 25GB bandwidth/month — sufficient for 20+ clients
- You own the Cloudinary account. Their photos live there. At cancellation, you zip and send their photos.

### Logo

- Client must provide their logo as a PNG file with transparent background
- If they don't have a logo: offer basic logo design as an add-on ($100) or tell them to make one in Canva and send it to you
- You are not a logo designer — don't pretend to be one for free

---

## 6. Client Onboarding Process

### Step 1 — Discovery Call (15–30 min, free)

Your goals on this call:
- Confirm they're a real prospect (are they actually running a coaching business?)
- Understand what they need (which package fits)
- Explain what's included and what isn't
- Set expectations on timeline and process
- Close on the setup fee

Questions to ask on the call:
- "Do you currently have a website?"
- "What's the main thing you want people to do when they land on your site?" (call, book, email)
- "Do you have photos we can use, or do you need stock photos for now?"
- "Do you have a logo, or do we need to figure that out?"
- "What's your timeline — when would you ideally want this live?"

Close at the end of the call:
> "Based on what you've described, I'd recommend the [Package]. The setup fee is $[X] and the monthly is $[X]/month. I'll send over the contract and invoice today — once both are signed and paid, I'll send you the onboarding questionnaire and we can get started."

### Step 2 — Contract + Invoice (send same day)

Send both in one email. Do not start work without:
- Signed contract (DocuSign free tier, or HelloSign, or even a PDF they sign and email back)
- Setup fee paid in full

### Step 3 — Onboarding Questionnaire

See Section 7. Send after contract is signed.

### Step 4 — Asset Collection

Give them 5 business days to send you:
- Logo file (PNG, transparent background)
- 5–10 photos (headshots + action shots)
- 3 testimonials (name + quote — they can be from real people or paraphrased from reviews)
- Their bio (or bullet points you can write from)
- YouTube video links (if applicable)

If they miss the 5-day deadline, the project clock pauses. Be clear about this upfront.

### Step 5 — Build (5–7 business days from asset receipt)

Update their JSON config with all real content. Swap stock photos for real photos in Cloudinary. Deploy to their subdomain for review.

### Step 6 — Review + Revisions

Send preview link. Give them 3 business days to review. They get 1 round of revisions included. Additional rounds are $50 each.

### Step 7 — Launch

- Buy their domain (or have them buy it and give you DNS access)
- Point DNS to Vercel
- Confirm everything works on the custom domain
- Set up recurring billing in Stripe
- Send welcome email with update request process

---

## 7. Client Questionnaire

Send this as a simple Google Form or email after contract is signed.

```
SECTION 1 — BUSINESS INFO
- Full name (as you want it on the site)
- Business name (if different from your name)
- City and county
- Phone number (for the contact section)
- Email address (for the contact form submissions to go to)
- Website you want (e.g., johnsmithcoaching.com) — or we can suggest one

SECTION 2 — YOUR STORY
- How long have you been coaching?
- What age groups do you work with?
- What is your specialty or focus?
- Any certifications, credentials, or notable achievements?
- Write 2–3 sentences about yourself (we'll clean it up)
  OR: answer these and we'll write it for you:
  → Why did you start coaching?
  → What do you do differently from other coaches?
  → What result do you most often help athletes achieve?

SECTION 3 — SERVICES
- List up to 5 services you offer (e.g., 1-on-1 training, group sessions, film review)
- For each: brief description (1 sentence) and price if you want it shown

SECTION 4 — TESTIMONIALS
- Provide 3 testimonials: Name, role (e.g., "Parent, St. Johns"), quote (1–3 sentences)
- If you don't have written ones, paraphrase real feedback you've received

SECTION 5 — DESIGN PREFERENCES
- Color vibe preference: dark/athletic, navy/gold, green/community, clean/minimal
- Any sites you like the look of? (paste URLs)
- Any sites you do NOT want to look like?

SECTION 6 — MEDIA ASSETS
- Upload your logo (PNG with transparent background preferred)
- Upload 5–10 photos (headshot + action shots)
- YouTube video links (paste URLs, or tell us if you have none)
- Instagram handle (optional — for footer link)

SECTION 7 — FUNCTIONALITY
- Do you use Calendly or another booking tool? (paste your Calendly link if yes)
- Do you want a contact form, or just display your email/phone?
- Anything specific you want on the site that we haven't asked about?
```

---

## 8. Contracts & Legal Basics

You need one document that covers everything. Use a service like:
- **Bonsai** (freelancer-focused, ~$17/month, has templates)
- **HelloSign** (free for 3 docs/month — enough when starting)
- **DocuSign** (free tier: 3 envelopes/month)
- Or a signed PDF emailed back (legally valid in Florida)

### Key Clauses Your Contract Must Include

**1. Scope of Work**
Exactly what is included in the package they selected. Reference this playbook's scope limits. Anything not listed requires a separate quote.

**2. Payment Terms**
- Setup fee due in full before work begins. Non-refundable.
- Monthly retainer billed on the same day each month (the launch date).
- 7-day grace period on failed payments. After 7 days, site goes to maintenance mode (page shows "site under maintenance") until payment is received.
- After 30 days of non-payment, contract is terminated and site is taken offline.

**3. Client Responsibilities**
- Provide all assets within 5 business days of contract signing
- Failure to provide assets pauses the project timeline (not your fault)
- Client is responsible for the accuracy of their own content

**4. Revisions**
One included round per package. Additional rounds are $50 each, invoiced separately.

**5. Intellectual Property**
- The website code belongs to you (First Coast Spotlight).
- The client's content (photos, logo, text, testimonials) belongs to the client.
- At cancellation, you will provide a zip file of their content within 14 days.
- Client does NOT receive the source code.

**6. Minimum Commitment**
3 months from launch date. Client may cancel after 3 months with 30 days written notice.

**7. Termination**
Either party may terminate with 30 days written notice after the minimum commitment period. You may terminate immediately for non-payment (after the grace period).

**8. What Happens at Cancellation**
See Section 10 below.

**9. Limitation of Liability**
You are not responsible for: loss of business, lost revenue, search engine rankings, or any claim arising from content the client provided. Maximum liability is limited to the most recent month's retainer fee.

**10. Governing Law**
Florida law. St. Johns County, Florida jurisdiction.

---

## 9. Ownership — Who Owns What

This needs to be crystal clear in your mind and in your contract.

| Asset | Who Owns It | Notes |
|---|---|---|
| The website code | YOU | They cannot take the Next.js codebase |
| Their domain name | CLIENT | They should buy it, you manage DNS |
| Their photos | CLIENT | You store them on your Cloudinary, return at cancellation |
| Their logo | CLIENT | |
| Their text/bio/testimonials | CLIENT | |
| The Vercel account | YOU | Site lives on your infrastructure |
| The Cloudinary account | YOU | Their media lives here, you return it at cancellation |
| Google Analytics property | CLIENT | Create under their Google account, give yourself access |

### Domain Strategy — Important

**The right way:** Client buys their own domain on Namecheap (~$12/year). They give you DNS management access. You point it to Vercel. They own the domain forever regardless of what happens with you.

**The wrong way:** You buy the domain in your name. If you have a dispute, you hold their domain hostage (legally and ethically bad). Don't do this.

**Why this matters:** If a client ever claims you stole their business, the domain ownership is exhibit A. Keep it clean. Their domain = their name.

---

## 10. Cancellation Policy

### During Minimum Commitment (first 3 months)

Client cannot cancel. If they try, remind them of the contract. If they dispute the charge with their bank, your signed contract is your defense.

### After Minimum Commitment (month 4+)

- 30 days written notice required (email is sufficient)
- Final invoice sent for the 30-day notice period
- After final payment clears:
  - Site goes offline (you redirect the subdomain to a "this site is no longer active" page)
  - You zip their content (photos, logo, text) and email it within 14 days
  - If they want their domain transferred to a new registrar account: $25 transfer fee
  - They do NOT get the source code

### If They Want Another Developer to Rebuild It

That's their right. Provide their content zip. The new developer starts from scratch. Your code stays yours.

### If They Want to Come Back

Treat them as a new client. New setup fee applies (you can offer a returning client discount of 25% on setup if you want to — your call).

### What You Do NOT Do at Cancellation

- Do not delete their content immediately (14-day retention)
- Do not take the site down without completing the notice period
- Do not get emotional or burn the bridge — a cancelled client can refer you to someone else

---

## 11. Payment & Billing Setup

### Recommended: Stripe

- Sign up at stripe.com (free account)
- 2.9% + 30¢ per transaction (standard card processing)
- Set up:
  - **One-time payment** for setup fee (send a Payment Link via Stripe)
  - **Recurring subscription** for monthly retainer (Stripe Billing)
- Clients enter their card once, it auto-bills monthly
- You get notified of failed payments automatically

### Invoicing for Ad-Hoc Work

Use **Wave** (free) or **Stripe Invoicing** for one-off add-ons like additional revisions, rush fees, or logo design.

### Tax Note

If you're operating as a sole proprietor in Florida, you need to track income and pay quarterly estimated taxes. Consult a CPA when you hit your first paying client. This is not optional.

---

## 12. Client Capacity & Sustainability

### Realistic Numbers

| Clients | Monthly Revenue | Monthly Time Estimate | Notes |
|---|---|---|---|
| 5 | ~$500–625 | 3–5 hrs/month | Comfortable. Plenty of time to prospect. |
| 10 | ~$1,000–1,250 | 6–10 hrs/month | Still manageable solo. |
| 15 | ~$1,500–1,875 | 10–15 hrs/month | Getting busy in heavy months. |
| 20 | ~$2,000–2,500 | 15–20 hrs/month | Upper limit for solo. |
| 25+ | $2,500+ | 20+ hrs/month | Hire a VA or part-time assistant for update requests |

The update requests are the time sink. A client on Starter ($75/month, 1 update/month) takes you 15 minutes. A client on Pro ($175/month, 4 updates/month) takes you up to an hour. At 20 clients with mixed packages, plan for 15–20 hours/month of maintenance work.

### Do Clients Update Frequently?

Honest answer: most clients will go weeks without requesting a single change, then suddenly want 3 things at once because "we have a tournament coming up." A few will be high-maintenance and want weekly tweaks. The update limit per package is your protection against the high-maintenance ones.

Enforce the limit. When someone submits their 3rd update request in a month on a Starter plan, you reply:

> "You've used your 1 included update this month. I can process this as an add-on ($50) or roll it into next month's update. Which works better for you?"

Do this every time. Never do free extra work because you feel guilty. It sets a precedent that kills your margins.

### Instagram Feed Integration — When to Offer It

Do NOT include this in demo sites. Offer it as a paid add-on ($75 setup + $15/month) only after a client signs. Use a service like **Elfsight** ($0/month for 200 views, $5/month Lite for more) or **SnapWidget**. The widget is an iframe embed — no code complexity. You just paste the embed code into their component.

---

## 13. Brutal Honest Questions You Must Answer

Before you send your first outreach message, sit down and write honest answers to these. If you can't answer them, you have a gap to close first.

**1. Can you close on a 15-minute phone call?**
Sales is a skill. If you've never done a sales call, your first few will feel awkward and you will lose deals because of it. Practice your call script out loud, alone, before your first real call. Record yourself. Listen back.

**2. What do you do when a client submits 6 update requests in a month on a $75 plan?**
If you don't have a scripted response ready, you will either do the work for free (losing margin) or get in an argument with a client (losing the retainer). Write the script now.

**3. What is your turnaround time commitment and can you actually hit it?**
If you promise 48 hours and you have a day job, a family, or get sick — what happens? Set a turnaround time you can guarantee on a bad week, not your best week.

**4. What happens if you get 5 clients at once and can't keep up?**
Great problem to have, but it will kill your reputation if you miss deadlines. Know your cap before you hit it.

**5. What if a client has ZERO photos, no logo, no bio, and no testimonials?**
More common than you think. Coaches are often not prepared for this. Your questionnaire will reveal it. Have a clear policy: "Stock photos are the default until you provide real ones. Logo is required before launch — here is a Canva tutorial link if you need help making one."

**6. What if a client disputes their charge with their bank?**
Your signed contract + payment record is your defense. Stripe gives you a dispute management dashboard. You submit the contract as evidence. Disputes take 60–90 days to resolve. You will win if you have the signed contract.

**7. Do you know how to explain to a coach why they need a website when they already have Instagram?**
This is the most common objection. Have a 30-second answer. Example: "Instagram is rented land — if they change the algorithm or your account gets flagged, you lose everything. Your website is yours forever. It also shows up on Google when someone searches 'football coach St. Johns County' — your Instagram doesn't."

**8. What if a competitor undercuts you at $30/month?**
You will face this. Fiverr and overseas freelancers exist. Your answer is local + relationship: "I'm here in Northeast Florida. You can call me. I built this specifically for coaches in this area. I know the market." Price is rarely the real objection — trust is.

**9. Are you building a business or a job?**
20 clients at $125/month average = $2,500/month revenue. That's $30k/year. After Stripe fees, taxes, Vercel Pro, and time — it's a meaningful side income, not a replacement income at this scale. To make it a real business you need to either raise prices, expand niches, or hire. Know which you're building toward.

**10. What does success look like in 6 months?**
Write the number down. 3 clients? 10 clients? $1,000/month? Without a concrete target you won't know if you're winning. Set it now.

---

## Quick Reference Card

```
Starter Package:   $297 setup + $75/month  — 6 sections, stock photos, 1 update/month
Growth Package:    $497 setup + $125/month — + real photos, Google Analytics, 2 updates/month
Pro Package:       $797 setup + $175/month — + video, Instagram link, analytics report, 4 updates/month

Minimum commitment:  3 months
Cancellation notice: 30 days written
Update turnaround:   48 hours (Pro: 24 hours)
Revisions included:  1 round (additional: $50/round)
E-commerce:          Never. Non-negotiable.
Video hosting:       YouTube embed only (client provides link)
Logo:                Client provides PNG. No logo = no launch.
Domain:              Client buys, you manage DNS. Never in your name.
Code ownership:      Yours. Always.
Content ownership:   Theirs. Return at cancellation.
```
