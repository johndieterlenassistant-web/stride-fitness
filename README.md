# Stride — your next stronger day

An Android-installable, offline-first fitness companion. No accounts, backend, subscriptions or analytics.

## Open & install

**https://johndieterlenassistant-web.github.io/stride-fitness/**

Open in Android Chrome → menu (⋮) → **Add to Home screen → Install**. Open once online and let the app finish loading before going offline. In Settings, choose your actual plan start date. Personal details are optional. This is a Progressive Web App (PWA), not an APK or Play Store app.

## Features

- Four Planet Fitness-friendly workouts, recovery schedule and 12-week progression.
- Trident-inspired workout flow: per-set load/reps or seconds, automatic rest timer, previous-session entries, exercise notes and warm-up checkoffs.
- Expand every exercise for two-position example photos, adapted setup cues, a clearly labeled YouTube tutorial search, and a programmed alternative. Photos/cues work offline; external video searches require internet. Variations shown in photos are explicitly labeled. Dumbbell loads use a consistent per-hand convention.
- Busy-day mode: first three movements, two sets each, ten minutes easy cardio.
- Twelve rotating weekly meal-prep plans: one lunch and one dinner repeated for all seven days, with 24 distinct recipes across the block. Each lunch/dinner has about 3 palms (8 oz cooked) of lean protein, ½ cup cooked rice/pasta or ½ large potato, 2 cups vegetables and 1 tsp cooking oil. Breakfasts, snacks and extras retain the original daily pattern. The week picker previews any week without changing the plan start date or workout logs.
- Download a real week-specific meal-plan PDF, including both seven-serving recipes, batch amounts, daily menus, serving-quantity totals, meal-prep notes and a copyable ChatGPT prompt for a Kroger grocery list. All seven days, meals, snacks and extras included. Prompt requests cooked-to-raw shopping conversions and honest price estimates within a $150 budget target. It does not connect to Kroger or ChatGPT automatically.
- Dated check-ins, weight averages and trend chart, waist, steps, sleep, daily habits and weekly reflections.
- Phone-local saving and JSON backup/restore. No prefilled personal measurements, workout logs or original PDFs are published.

## Privacy & backups

All personal entries stay in this browser's localStorage, on this device. They are not automatically synced. Clearing site data, switching browsers or losing the device can remove entries. **Download backups regularly in Settings** and store them privately, e.g. in your own Drive. Backup restoration replaces current records after an explicit confirmation. Updates do not deliberately clear saved data; download a backup before major updates. For the first update from v1.0, open once online, close **all** Stride browser tabs and the installed app, then reopen (repeat once if the old screen was still open while the update downloaded). Version 1.1 adds Settings → Check for app update and an **Update app** banner for future waiting updates. The version is shown in Settings. Existing storage keys and the backup format remain unchanged. Never clear app/site data to update.

GitHub Pages hosts the public reusable app and plan templates. It receives normal static site requests, not workout entries. YouTube/GitHub links open separate sites only when tapped.

## Plan interpretation

The workout prescription, progression and tracker structure follow the three provided guides. At John’s request, v1.1 replaces the daily-varying lunches/dinners with rotating weekly batch recipes and increases protein while reducing starch portions. These recipes are adaptations, not a literal transcription of the original diet. Personal profile data and original PDFs were intentionally excluded. Meal cup/palm conversions are approximate; use consistent sizes. Where source vegetables, berries or sauce quantities were unspecified, practical standard serving sizes were selected and disclosed. Cooked meat/grain serving totals in the PDF are **not raw purchase weights**. ChatGPT must explicitly estimate cooking yields and package sizes. No weight-loss deadline or automatic diet reduction is applied. Fitness content is general guidance; the source's recovery and pain guidance is retained.

Workout C's cable curl and rope pressdown each have their own rows (two sets each). They are a programmed pair. Other exercises are not arbitrarily converted into Trident supersets. Record alternate-machine use in exercise notes and use consistent load conventions; different equipment is not directly comparable.

## Development

Node 24 recommended.

```sh
npm ci
npm test
npm run dev
npm run build
npm run preview -- --port 4179
node scripts/browser-check.mjs
```

Browser checks require Playwright Chromium and its runtime dependencies. On the original workspace host:

```sh
LD_LIBRARY_PATH=/tmp/trident-browser-libs/root/usr/lib/x86_64-linux-gnu node scripts/browser-check.mjs
```

Set `STRIDE_URL` to check a deployed URL. The production build generates a content-versioned service worker that precaches the complete app, PDFs' runtime libraries and all exercise images. Source maps and personal data are not included. GitHub Actions runs domain tests, builds and deploys through free Pages hosting.

## Credits

Exercise reference photos: [free-exercise-db](https://github.com/yuhonas/free-exercise-db), public-domain / Unlicense, included in `public/exercise-data-license.txt`. Setup cues are adapted for this beginner plan. Images illustrate positions, not personalized coaching. React, Vite, Lucide and jsPDF are maintained open-source components. Existing-solution preflight considered wger; its hosted backend/account model was unnecessary for this phone-local single-user plan.

Physical Android home-screen installation must be verified on the recipient's own device; automated browser checks do not substitute for that.

## Meal-prep update v1.1.0

All 12 weeks have a distinct pair of lunch/dinner recipes (seven servings each). Choose the plan start date once; the current week follows it. The meal-week picker is only a preview/export selector, and the daily checkoffs are disabled when previewing a different week/date. Workouts, old daily logs, measurements and backups are untouched. Shopping totals count daily servings once, not again as extra batches. Recipe meat/grain quantities are cooked serving amounts; the Kroger prompt asks for honest raw-purchase conversions and package sizes. Sunday preparation includes promptly freezing later-week containers rather than keeping a full seven days in the fridge.

A rough internal check using generic ingredient values placed weekly-average daily energy at approximately 2,190–2,455 kcal, depending on the menu. This is an estimate, not verified branded-food nutrition or a personalized new calorie prescription. The app continues to display portions, not calorie-counting targets.

Additional browser verification:

```sh
# Preserve an actual previous built release before building the new one:
cp -a dist /tmp/stride-before-meal-update
npm run build
node scripts/meal-update-check.mjs
```

This check serves the old/new builds at the same subpath, updates an existing installed worker, verifies unchanged stored logs, browses all 12 weeks, downloads selected-week PDFs offline and exercises the in-app waiting-update button. Set `STRIDE_OLD_DIST` for another old build path.
