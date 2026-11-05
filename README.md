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
- Seven full meal days using cups, eggs and approximate palm portions, not calorie targets. Source weights remain as small cooked-ounce references for protein accuracy.
- Download a real weekly meal-plan PDF, including serving-quantity totals, meal-prep notes and a copyable ChatGPT prompt for a Kroger grocery list. All seven days, meals, snacks and extras included. Prompt requests cooked-to-raw shopping conversions and honest price estimates within a $150 budget target. It does not connect to Kroger or ChatGPT automatically.
- Dated check-ins, weight averages and trend chart, waist, steps, sleep, daily habits and weekly reflections.
- Phone-local saving and JSON backup/restore. No prefilled personal measurements, workout logs or original PDFs are published.

## Privacy & backups

All personal entries stay in this browser's localStorage, on this device. They are not automatically synced. Clearing site data, switching browsers or losing the device can remove entries. **Download backups regularly in Settings** and store them privately, e.g. in your own Drive. Backup restoration replaces current records after an explicit confirmation. Updates do not deliberately clear saved data; download a backup before major updates. To receive a waiting update, close all Stride tabs and the installed app, then reopen. Never clear app/site data to update.

GitHub Pages hosts the public reusable app and plan templates. It receives normal static site requests, not workout entries. YouTube/GitHub links open separate sites only when tapped.

## Plan interpretation

The workout prescription, progression, diet template and tracker structure follow the three provided guides. Personal profile data and original PDFs were intentionally excluded. Meal cup/palm conversions are approximate; use consistent sizes. Where source vegetables, berries or sauce quantities were unspecified, practical standard serving sizes were selected and disclosed. Cooked meat/grain serving totals in the PDF are **not raw purchase weights**. ChatGPT must explicitly estimate cooking yields and package sizes. No weight-loss deadline or automatic diet reduction is applied. Fitness content is general guidance; the source's recovery and pain guidance is retained.

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
