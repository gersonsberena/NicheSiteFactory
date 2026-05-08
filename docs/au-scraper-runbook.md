# Athletes Untapped Scraper — Runbook

## Prerequisites

Make sure you have Node.js installed:
```bash
node --version
```

---

## Run for Florida (already configured)

```bash
# Test run — fetches coaches, no files written
node scripts/scrape-athletesuntapped.js --dry-run

# Full run — fetches all coaches + generates demo site configs
node scripts/scrape-athletesuntapped.js

# Or via npm shortcut
npm run leads:au
```

---

## Run for a Different State

1. Open `scripts/scrape-athletesuntapped.js`

2. Replace `FL_SEARCH_CITIES` (around line 43) with city centers for the new state — one city every ~80 miles to avoid gaps:
   ```js
   const FL_SEARCH_CITIES = [
     { name: "Atlanta", lat: 33.7490, lng: -84.3880 },
     // ... more cities
   ]
   ```

3. Find the `searchCoaches()` function and update the `region` and `state` params:
   ```js
   // Change these two values
   region=Georgia
   state=GA
   ```

4. Test it:
   ```bash
   node scripts/scrape-athletesuntapped.js --dry-run
   ```

5. Full run:
   ```bash
   node scripts/scrape-athletesuntapped.js
   ```

---

## All CLI Flags

| Flag | What it does |
|---|---|
| *(none)* | Full run — fetch all coaches + write configs |
| `--dry-run` | Fetch only — no config files written |
| `--refresh` | Re-fetch everything, preserve `contacted` state in au-leads.json |
| `--limit=10` | Only process first 10 coaches (good for testing) |
| `--debug` | Verbose API response logging |

---

## Output Files

| File | Purpose |
|---|---|
| `data/au-leads.json` | All coaches found — flip `contacted: true` as you reach out |
| `prospects/configs/{slug}.json` | One demo site config per coach |

Preview any coach site at:
```
http://localhost:3000/?coach={slug}
```

---

## How the API Works

- **Endpoint**: `https://api.athletesuntapped.com/api/v1/coaches`
- **No API key required** — same public endpoint the AU website uses
- **Max radius**: 50 miles per search — that's why we use a multi-city grid
- **Deduplication**: coaches near city borders show up in multiple searches; the script deduplicates by profile URL automatically

---

## Florida City Grid (current)

| City | Covers |
|---|---|
| Jacksonville | NE Florida |
| Daytona Beach | NE/Central coast |
| Gainesville | North Central |
| Orlando | Central FL |
| Tampa | West Central |
| Fort Myers | Southwest |
| Miami | South FL |
| Pensacola | Panhandle west |
| Panama City | Panhandle east |
| Ocala | Central (gap fill) |
| Port St Lucie | Treasure Coast |
| West Palm Beach | SE Coast |

Current FL total: **39 coaches** (as of 2026-05-07)
