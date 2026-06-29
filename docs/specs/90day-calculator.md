# Spec: Thailand 90-Day Report Calculator

Clone of the functionality at https://www.richardbarrow.com/90day/. Reverse-engineered
via Playwright + source inspection. Build as a new tool page on this portfolio, matching
the existing `qr/` and `json/` multi-entry pattern.

## 1. Purpose

Single-purpose calculator. User enters their arrival date in Thailand; tool computes the
three dates relevant to the TM.47 90-day immigration notification, plus live countdowns,
and offers calendar export + shareable image.

## 2. The date math (exact — verified against source)

Given `arrival` (local midnight, `new Date(val + 'T00:00:00')`):

| Result | Formula | Example (arrived 15 Jan 2025) |
|---|---|---|
| `due` — 90-day deadline | `arrival + 89 days` | Mon 14 Apr 2025 |
| `early` — earliest you can report | `due - 14 days` (= arrival + 75) | Mon 31 Mar 2025 |
| `late` — absolute last day / fine | `due + 7 days` (= arrival + 96) | Mon 21 Apr 2025 |

- Day of arrival counts as day 1, so the 90th day is `arrival + 89`.
- All arithmetic via `Date.setDate(getDate() + n)` (handles month/year rollover & DST-safe local dates).
- No timezone handling beyond local midnight; no validation that arrival is in the past.

### Countdowns (relative to `today` at local midnight)
- `daysUntil(d) = Math.round((d - today) / 86_400_000)`
- Per-date subtitle: `n < 0` → `"<abs(n)> days ago"`, `n === 0` → `"Today"`, else `"In <n> days"`.
- Three stat boxes:
  1. **Days in Thailand** = `max(0, round((today - arrival)/86.4M))`
  2. **Days until due** = `max(0, daysUntil(due))` — styled `urgent` if `daysUntil(due) < 14`, else `safe`
  3. **Days until fine** = `max(0, daysUntil(late))` — styled `urgent` if `daysUntil(late) < 7`

## 3. UI / states

Single centered card. Two states toggled in place (no routing):

**Input state**
- Label: "Date you arrived in Thailand"
- Native `<input type="date">` rendered invisibly over a styled `dd/mm/yyyy` display box
  (so the placeholder/format is controlled while still using the OS date picker). On change,
  display text updates to `dd/mm/yyyy`.
- Button: "Calculate my reporting dates". Empty value → `alert('Please select your arrival date.')`.

**Results state** (input + button hidden, results shown)
- Arrival summary: ✈️ "Arrived in Thailand" + `fmtLong(arrival)`.
- Countdown row (3 stat boxes above).
- "Your reporting window" — three result cards, each with badge + label + long date + relative subtitle:
  - 🟢 **Earliest** — "Earliest you can report"
  - 🔵 **Due date** — "90-day deadline"
  - 🔴 **⚠ Fine if missed** — "Absolute last day"
- 💡 Warning box: "**Leaving Thailand?** If you leave before your due date, your 90-day clock
  resets on the day you return. Use this calculator again with your new arrival date."
- Disclaimer box (verbatim): "This tool is not affiliated with, endorsed by, or connected to
  the Thai Immigration Bureau or any government authority. It is provided for convenience only.
  Always verify your dates with official sources. We accept no responsibility for errors,
  omissions, or any changes to immigration regulations."
- Buttons: "↓ Save to camera roll", "Add to Google Calendar" (toggles menu), "← Calculate another date" (reset).
- Footer: "Missing the deadline results in a **฿2,000 fine**. Report at your local immigration
  office or online via **immigration.go.th**"

`fmtLong(d)` → `"Wednesday 15 January 2025"` (weekday D MonthName YYYY).

## 4. Google Calendar export

Opens `https://calendar.google.com/calendar/render?action=TEMPLATE` all-day events
(`&dates=YYYYMMDD/YYYYMMDD+1day`, `&sf=true&output=xml`). Four menu options:

| Option | Title | Details |
|---|---|---|
| early | `Thailand 90-Day Report — Earliest Date` | "The earliest you can submit your 90-day notification to Thai Immigration (TM.47)…" |
| due | `Thailand 90-Day Report — Due Date` | "Your 90-day immigration notification (TM.47) is due today. Report at … immigration.go.th" |
| late | `Thailand 90-Day Report — LAST DAY (Fine if missed)` | "FINAL deadline … Missing this date results in a 2,000 Baht fine. …" |
| all | — | opens early/due/late in sequence (`setTimeout` 0 / 600 / 1200 ms) |

## 5. Save-as-image

Renders an off-screen "snapshot card" (static dates, no countdown) to PNG.
- Original uses `html2canvas` (CDN, `scale: 3`, bg `#f5f0e8`).
- iOS path: Web Share API (`navigator.share({files:[png]})`) → native share sheet; fallback
  overlay tells user to long-press the image to "Add to Photos".
- Desktop/Android: anchor `download="thailand-90day-report.png"` click.
- **For our build**: prefer a maintained lib (e.g. `html-to-image`) or `<canvas>` draw; keep the
  same Web Share + download fallback logic.

## 6. Visual design (reference — adapt to our taste)

- Bg `#0a1628` (deep navy); card `#f5f0e8` (cream). Thai-flag red/white/blue accents.
- Fonts: Playfair Display (heading), Sarabun (body). Result accents: green `#2e7d32`, navy
  `#1a3a5c`, red `#c62828`.
- Mobile-first, single column, ~max 420px card.

## 7. Build plan (fits this repo)

- New Vite entry `ninetyday_main: resolve(__dirname, "90day/index.html")` in `vite.config.ts`.
- `90day/index.html` (copy `qr/index.html` head pattern; set title/OG to the calculator).
- `src/90day/main.tsx` + `src/90day/NinetyDayCalculator.tsx` (React 19 + TS + Tailwind v4).
- Pure date logic in `src/90day/dates.ts` (testable): `computeDates(arrival)` returning
  `{ early, due, late }` + the countdown helpers. Add unit tests for the rollover cases.
- Link the tool from the portfolio Toolbox section in `src/App.tsx`.

## 8. Out of scope / deliberately omit

- No backend, accounts, storage, or analytics — fully client-side & static.
- No multi-entry/exit tracking; tool explicitly tells users to re-run after leaving.
- No input validation beyond "date required" (consider adding: warn if arrival > today).
