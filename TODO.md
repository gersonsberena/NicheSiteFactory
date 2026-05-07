# First Coast Spotlight — Master To-Do List
> Last updated: 2026-05-06 (football coach template + config system done, Layouts B-D and stock photos remaining)

---

## Phase 0 — Foundation (Do Before Any Outreach)

| Done | Priority | Task | Notes |
|---|---|---|---|
| ✅ | 1 | Set up Stripe account | Done — you have Stripe |
| ✅ | 2 | Build football coach template (Next.js + Tailwind) | Layout A done — 7 sections, dark-athletic theme, port 3002 |
| ✅ | 3 | Wire up `useConfig()` hook | Done — deep-merge of base.config.json + coach JSON, fs.readFileSync |
| ☐ | 4 | Add all 4 Claude Design layouts (A, B, C, D) | Use prompts in CONVERSATION-NOTES.md Section 9 |
| ✅ | 5 | Build `generate-configs.js` script | Done — scripts/generate-configs.js reads CSV, rotates stock photos |
| ✅ | 6 | Build `deploy.js` script | Done — scripts/deploy.js prints step-by-step Vercel + DNS instructions |
| ✅ | 7 | Rebuild firstcoastspotlight.com as agency site | Built in Next.js — all 8 sections done, running at localhost:3001 |
| ☐ | 8 | Create Calendly link for discovery calls | Free tier is fine |
| ☐ | 9 | Write 2-message outreach DM script | Template in CONVERSATION-NOTES.md Section 5 |
| ☐ | 10 | Set up contract template | Bonsai, HelloSign, or DocuSign free tier (3 envelopes/month) |

**Do not start prospecting until: Stripe ✅, Calendly, DM script, and contract are all ready.**

---

## Stripe Setup Checklist ✅ Complete

| Done | Task |
|---|---|
| ✅ | Stripe account created |
| ✅ | Payment Links: Starter ($297), Growth ($497), Pro ($797) |
| ✅ | Subscription products: Starter ($75/mo), Growth ($125/mo), Pro ($175/mo) |
| ☐ | Test a payment end-to-end with a $1 test charge before your first real client |
| ☐ | Set up Stripe email notifications for failed payments |

---

## Phase 1 — Prospecting (Week 2–4)

| Done | Task | Notes |
|---|---|---|
| ☐ | Build prospect CSV with 30–50 football coaches | Google Maps, Facebook groups, Instagram — NE Florida |
| ☐ | Generate 30–50 demo sites from CSV | `node scripts/generate-configs.js` |
| ☐ | Deploy all demos to `[slug].firstcoastspotlight.com` | `node scripts/deploy.js` |
| ☐ | QA pass on 5–6 random demos | Name correct, theme looks sharp, mobile check |
| ☐ | Build 4 showcase sites for portfolio | `showcase-bold`, `showcase-community`, `showcase-minimal`, `showcase-story` |
| ☐ | Send Message 1 to first 15 coaches (no link) | No link in Message 1 — see DM script |
| ☐ | Track all responses in CSV `status` column | `no_reply / replied / demo_sent / interested / declined` |
| ☐ | Follow up after 3 days of no reply (once only) | One follow-up — no spam |
| ☐ | Send Message 2 with demo link to anyone who replies | |
| ☐ | Review results, adjust pitch, send next 15 | |

---

## Phase 2 — First Client Close

When someone says yes, run through this sequence in order:

| Done | Step |
|---|---|
| ☐ | Schedule 30-min discovery call — send Calendly link |
| ☐ | On call: confirm scope, explain packages, close on setup fee |
| ☐ | Send contract + Stripe invoice same day (do NOT start without both) |
| ☐ | Wait for signed contract AND payment — then send onboarding questionnaire |
| ☐ | Collect assets: logo, photos, bio, testimonials, YouTube links (5-day deadline) |
| ☐ | Customize their site (5–7 business days from asset receipt) |
| ☐ | Send preview link — give them 3 days to review |
| ☐ | Make 1 round of revisions (additional rounds = $50 each) |
| ☐ | Buy their domain + point DNS to Vercel |
| ☐ | Launch |
| ☐ | Set up recurring monthly billing in Stripe |
| ☐ | Send welcome email with update request process |

---

## Phase 3 — Ongoing Operations

| Frequency | Task |
|---|---|
| As received | Process client update requests (48hr turnaround) |
| 1st of each month | Send monthly analytics report to each client |
| Day 8 of missed payment | Follow up on failed Stripe payments |
| When you have capacity | Prospect 1–2 new coaches |
| After 5 stable clients | Expand to second niche (personal trainer is easiest reuse) |

---

## Revenue Targets

| Clients | Avg Monthly Revenue | Monthly Time |
|---|---|---|
| 5 | ~$500–625 | 3–5 hrs |
| 10 | ~$1,000–1,250 | 6–10 hrs |
| 15 | ~$1,500–1,875 | 10–15 hrs |
| 20 | ~$2,000–2,500 | 15–20 hrs (solo limit) |

---

## What's Next Right Now

**You have Stripe. Next action is:**

> Build the football coach template — one layout (Layout A — Bold Athlete), wired to the config system. Get one working demo deployed to a `[slug].firstcoastspotlight.com` subdomain. Everything else depends on this.

Use the Layout A Claude Design prompt from [CONVERSATION-NOTES.md](CONVERSATION-NOTES.md) Section 9 to generate the React components, then drop them into `/templates/football-coach/layouts/layout-a/`.
