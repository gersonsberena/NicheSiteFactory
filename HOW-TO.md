# NicheSiteFactory — How-To Guide

---

## 1. Adding a New Coach and Generating Their Config

### Step 1 — Add a row to the CSV

Open `prospects/football-coaches.csv` and append a new row. The only required field is `slug`. Everything else falls back to base config defaults.

| Column | Required | Notes |
|---|---|---|
| `id` | Yes | Increment from the last row |
| `slug` | Yes | URL-safe, lowercase, hyphenated (e.g., `sarah-johnson`) — must be unique |
| `name` | Yes | Full name (e.g., `Sarah Johnson`) |
| `city` | Yes | City they coach in |
| `county` | Yes | County name — used for design deduplication within a county |
| `state` | Yes | `FL` |
| `phone` | No | Displayed in contact section and footer |
| `email` | No | Displayed in contact section and footer |
| `layout` | Yes | `A` or `B` |
| `specialty` | No | e.g., `Quarterback Training` |
| `years_experience` | No | Integer |
| `age_groups` | No | e.g., `Youth, High School` |
| `tagline_override` | No | Custom hero headline — leave blank to auto-generate `"{County} County's Premier Football Coach"` |
| `booking_url` | No | Defaults to `#contact` if blank |

Example row:
```
11,sarah-johnson,Sarah Johnson,St. Augustine,St. Johns,FL,(904) 555-1100,sarah@example.com,dark-athletic,A,Quarterback Training,7,"Youth, High School",,,,#contact,no,referral,prospecting,false,,,,,
```

### Step 2 — Run the generator script

```bash
node scripts/generate-configs.js
```

This will:
- Read the CSV
- Assign a unique design + copy variation combo for the coach's county (no two coaches in the same county get the same look)
- Write `prospects/configs/{slug}.json`
- Update `prospects/registry.json` with the assigned combo

Existing coach configs are never overwritten unless you manually clear their registry entry.

### Step 3 — Preview the site locally

```
http://localhost:3000/?coach={slug}
```

### Optional — Manual tweaks after generation

If you want to hand-edit the generated JSON (change accent color, swap a layout variant, write custom copy):

1. Open `prospects/configs/{slug}.json` and edit freely.
2. Open `prospects/registry.json`, find the coach's entry under `assigned_combos`, and set `"manually_tweaked": true`.

```json
"assigned_combos": {
  "sarah-johnson": {
    "manually_tweaked": true,
    ...
  }
}
```

This prevents the script from overwriting your manual edits on future runs.

---

## 2. Separating a Client Into Their Own Repository

Once a client agrees to proceed, give them their own codebase so their site evolves independently from the factory.

### Step 1 — Create a new GitHub repository

Go to GitHub → New repository. Name it after the client (e.g., `james-carter-coaching` or `firstcoastspotlight-james-carter`). Set it to **private**.

### Step 2 — Clone the factory into a new folder

```bash
git clone https://github.com/your-org/NicheSiteFactory james-carter-coaching
cd james-carter-coaching
```

### Step 3 — Point it at the client's new repo

```bash
git remote set-url origin https://github.com/your-org/james-carter-coaching
git push -u origin main
```

### Step 4 — Lock the app to that one client

In `app/page.tsx`, hardcode the slug and remove the multi-coach routing:

```tsx
const slug = "james-carter"
const config = getConfig(slug)

if (config.layout === "B") return <LayoutB config={config} />
return <LayoutA config={config} />
```

You can also delete all other files in `prospects/configs/` — only `james-carter.json` needs to stay. This keeps the repo clean and prevents accidental data leaks.

### Step 5 — Deploy to Vercel

- Go to Vercel → Add New Project → import `james-carter-coaching`
- Framework: Next.js (auto-detected)
- No environment variables needed unless using Formspree for the contact form
- Click Deploy

### Step 6 — Add the custom domain

In Vercel project settings → Domains, add the client's subdomain (e.g., `jamescarter.firstcoastspotlight.com`). Point the DNS CNAME record to `cname.vercel-dns.com`.

### Step 7 — Update the factory records

Back in `NicheSiteFactory`, update the client's row in `prospects/football-coaches.csv`:

| Column | Value |
|---|---|
| `status` | `active` |
| `deployed` | `true` |
| `deploy_url` | `jamescarter.firstcoastspotlight.com` |

This keeps your pipeline records accurate.

---

## 3. Deploying NicheSiteFactory to Vercel for Demo Purposes

One deployment serves all coaches via `?coach=` query params — no separate deploys needed.

### Step 1 — Commit and push all changes

```bash
git add .
git commit -m "Add coach configs and layouts"
git push origin main
```

### Step 2 — Deploy to Vercel

- Go to [vercel.com](https://vercel.com) → Add New Project
- Import the `NicheSiteFactory` repository from GitHub
- Framework: **Next.js** (auto-detected)
- Root directory: leave as-is (it's at the repo root)
- No environment variables needed for the demo
- Click **Deploy**

Vercel will give you a URL like `niche-site-factory.vercel.app`.

### Step 3 — Send demo links to prospects

Append `?coach={slug}` to the base URL. One link per prospect:

| Coach | Demo Link |
|---|---|
| John Smith | `https://niche-site-factory.vercel.app/?coach=john-smith` |
| Mike Jones | `https://niche-site-factory.vercel.app/?coach=mike-jones` |
| Carlos Rivera | `https://niche-site-factory.vercel.app/?coach=carlos-rivera` |
| Darnell Washington | `https://niche-site-factory.vercel.app/?coach=darnell-washington` |
| Tony Bishop | `https://niche-site-factory.vercel.app/?coach=tony-bishop` |
| Marcus Williams | `https://niche-site-factory.vercel.app/?coach=marcus-williams` |
| Derek Johnson | `https://niche-site-factory.vercel.app/?coach=derek-johnson` |
| James Carter | `https://niche-site-factory.vercel.app/?coach=james-carter` |
| Kevin Reed | `https://niche-site-factory.vercel.app/?coach=kevin-reed` |
| Andre Thomas | `https://niche-site-factory.vercel.app/?coach=andre-thomas` |

Each prospect only sees their own link — they have no way to discover the other coaches unless you share those URLs too.

### Step 4 — Update links after deploy

Once Vercel gives you the real URL (or you set a custom domain like `demos.firstcoastspotlight.com`), replace `niche-site-factory.vercel.app` in the table above with the actual domain.

### Notes

- Every time you push to `main`, Vercel auto-redeploys — no manual action needed.
- Adding a new coach is as simple as running `node scripts/generate-configs.js` and pushing — the new `?coach=` link works immediately after deploy.
- Stock photos in `/public/stock/` are included in the repo and served by Vercel with no extra configuration.
