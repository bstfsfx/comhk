# Changelog — AI Workflow Automation Site

**Session window:** ~4 hours of active development
**Commits:** 14
**Files changed:** 13 (934 insertions, 62 deletions)
**Deployments:** 14 production deploys to Vercel
**Production URL:** https://ai-workflow-iota-two.vercel.app/

---

## Table of Contents

**Part 1 — What changed (§1–§5)**
1. [Summary](#summary)
2. [Commit Log](#commit-log)
3. [§1 — Case Studies Marquee](#1-case-studies-marquee-7bd0fe3--88e339c)
4. [§2 — Social Media Links](#2-social-media-links-bca2a0b)
5. [§3 — Footer Rebuild](#3-footer-rebuild-bb87618)
6. [§4 — Brand Logo Recolor](#4-brand-logo-recolor-d3fce1b)
7. [Files Changed Overall](#files-changed-overall) · [i18n Coverage](#i18n-coverage) · [Verification](#verification-performed) · [Deployments](#deployment-history) · [Outstanding](#outstanding-items) · [Gotchas](#notes--gotchas-encountered)

**Part 2 — Technical implementation guide (§6–§17) — for replicating on a similar repo**
8. [§6 — Tech Stack & Environment](#6-tech-stack--environment)
9. [§7 — Change 1: Full-Width Container](#7-change-1--full-width-container-apply-first)
10. [§8 — Change 2: Three-Row Marquee](#8-change-2--three-row-marquee)
11. [§9 — Change 3: Footer Rebuild](#9-change-3--footer-rebuild)
12. [§10 — Change 4: Newsletter](#10-change-4--newsletter-staticjsnewsletterjs)
13. [§11 — Change 5: i18n Keys](#11-change-5--i18n-keys)
14. [§12 — Change 6: Logo Recolour](#12-change-6--logo-recolour)
15. [§13 — PWA / Service Worker](#13-pwa--service-worker--must-not-be-forgotten)
16. [§14 — Deployment](#14-deployment)
17. [§15 — Local Development & Testing](#15-local-development--testing)
18. [§16 — Replication Checklist](#16-replication-checklist)
19. [§17 — Known Risks](#17-known-risks-for-the-replication)

---

## Summary

Four major feature areas were delivered in this session:

1. **Case Studies marquee** — built a Framer-style horizontal showcase, then evolved it from 1 row → 2 opposing rows → 3 rows with a parallax speed layer
2. **Full-width layout** — removed all container gutters so the whole page spans the browser edge-to-edge
3. **Footer rebuild** — professional multi-section footer with social links, CTA, newsletter, columns, disclaimer and legal row
4. **Brand recolor** — recolored the company logo from an off-palette electric blue onto the site's indigo gradient

---

## Commit Log

| # | Commit | Subject | Files | +/- |
|---|--------|---------|-------|-----|
| 1 | `7bd0fe3` | Add horizontal sites showcase marquee to case studies | 4 | +208 |
| 2 | `ec6f231` | Fix sites showcase mask gradient - center was hidden | 1 | +8 / -8 |
| 3 | `7b8f589` | Convert sites showcase marquee to two opposing rows | 2 | +72 / -5 |
| 4 | `f71c138` | Fix second marquee row direction | 1 | +6 |
| 5 | `38eb9d1` | Make container full width across all breakpoints | 1 | +5 / -6 |
| 6 | `6e1a8eb` | Halve sites-showcase mask edge thickness | 1 | +8 / -8 |
| 7 | `a300e83` | Thin sites-showcase mask edge fade to 1% | 1 | +8 / -8 |
| 8 | `7644199` | Make sites-showcase marquee fully responsive | 1 | +31 |
| 9 | `3374165` | Remove marquee mask and reverse 2nd row order | 2 | +39 / -58 |
| 10 | `2f42b48` | Add 3rd parallax row to sites-showcase marquee | 2 | +51 |
| 11 | `88e339c` | Rearrange 3rd parallax row with custom order | 1 | +26 / -26 |
| 12 | `bca2a0b` | Add social media links to footer | 3 | +183 / -3 |
| 13 | `bb87618` | Rebuild footer with full professional layout | 4 | +634 / -77 |
| 14 | `d3fce1b` | Recolor company logo to match site indigo palette | 11 | +6 / -6 |

---

## 1. Case Studies Marquee (`7bd0fe3` → `88e339c`)

### Initial build — `7bd0fe3`

Added a Framer-style horizontal site-preview marquee above the existing `.projects-grid` in `index.html`.

**Markup conventions adopted:**
- `style="opacity: 1;"` on the showcase container for instant first paint
- Duplicated tile list for a seamless `-50%` loop
- `will-change: transform` on the track
- `overflow: hidden` viewport (no page-level horizontal scrollbar)
- Pause on `:hover` / `:focus-within`
- `prefers-reduced-motion` fallback → `overflow-x: auto` + scroll-snap
- Duplicate cards marked `aria-hidden="true"` with links `tabindex="-1"`

### Mask fix — `ec6f231`

The initial `mask-image` gradient was inverted, hiding the center of the marquee and leaving only the edges visible. Corrected so black/opaque = visible and transparent = hidden.

### Two opposing rows — `7b8f589`

Converted the single track into two rows inside a flex-column viewport.

| Track | Direction | Animation | Keyframes |
|---|---|---|---|
| Top (`sites-track--forward`) | Content moves **left** | `sites-scroll-forward` 50s linear infinite | `translate3d(0% → -50%)` |
| Bottom (`sites-track--reverse`) | Content moves **right** | `sites-scroll-reverse` 50s linear infinite | `translate3d(-50% → 0%)` |

Both rows carry all 20 projects with their own duplicated `aria-hidden` group (80 tiles total).

### Reverse-row direction bug — `f71c138`

`sites-scroll-reverse` specified only a `to { transform: translate3d(0%) }` keyframe with no `from`. Since the track's default transform was already `0%`, the animation ran `0% → 0%` and the second row never moved.

Fixed by adding an explicit `from { transform: translate3d(-50%, 0, 0); }`, so the reverse track animates `-50% → 0%` (rightward) while the forward track runs `0% → -50%` (leftward).

### Full-width container — `38eb9d1`

Removed the side gutters across all breakpoints.

| Rule | Before | After |
|---|---|---|
| `body` padding | `1rem` | `0` |
| `.container` | `width: 95%; max-width: 1000px` | `width: 100%; max-width: none` |
| `body` @ ≤768px | `padding: 0.75rem` | `padding: 0` |
| `.container` @ ≤768px | `width: 100%; padding: 0 0.5rem` | `width: 100%` |
| `body` @ ≤480px | `padding: 0.5rem` | `padding: 0` |

Measured on a 1143px viewport: `container.x = 0`, `container.width = 1143`, `scrollWidth === clientWidth`.

### Mask thinning — `6e1a8eb`, `a300e83`

| Mask band | Original | Half (`6e1a8eb`) | Ultra-thin (`a300e83`) |
|---|---|---|---|
| Fully-transparent left edge | 0–6% | 0–3% | 0–1% |
| Left transition | 6–10% | 3–5% | 1–2% |
| Visible center | 10–90% | 5–95% | 2–98% |
| Right transition | 90–94% | 95–97% | 98–99% |
| Fully-transparent right edge | 94–100% | 97–100% | 99–100% |

### Responsive pass — `7644199`

| Breakpoint | Row gap | Tile gap | Showcase margin | Tile width | Image height |
|---|---|---|---|---|---|
| ≤768px | 0.75rem | 0.75rem | 1.5rem / 2rem | 240px | 140px |
| ≤480px | 0.5rem | 0.5rem | 1rem / 1.5rem | 200px | 120px |
| ≤360px | — | — | — | 160px | 100px |

### Mask removal + row reversal — `3374165`

- Removed `mask-image` / `-webkit-mask-image` entirely for sharp edge-to-edge rendering
- Reversed the 2nd row order (Bowtique → Arashiyama) so it reads naturally moving right, mirrored against the top row
- Also removed the now-unused `mask-image: none` reset from the `prefers-reduced-motion` block

### Third parallax row — `2f42b48`

Added a third track moving left at half speed for a depth effect.

| Row | Direction | Speed |
|---|---|---|
| Top (forward) | Left | 50s |
| Middle (reverse) | Right | 50s |
| Bottom (parallax) | Left | **100s** |

New CSS rule:

```css
.sites-track--parallax {
    animation: sites-scroll-forward 100s linear infinite;
}
```

Total tiles: **120** (3 rows × 2 groups × 20 projects).

### Custom 3rd row order — `88e339c`

Replaced the duplicated top-row order with a distinct shuffle:

> GradGallery → Sushi → Travel Ashen → ECG → Bukaafe → Mood → TianTaiYi → PetLife Hub → Stock → Dimsum → MORPH3D → Social → Web2Print → Mall → AQUA NEXUS → Tete → Survey → Bloom & City → Arashiyama → Bowtique

---

## 2. Social Media Links (`bca2a0b`)

Added Facebook, Instagram, Threads, WhatsApp and Behance to the footer.

- **Inline SVG** brand icons — no external image files, no extra network requests
- Rounded square tiles (40×40px, 10px radius) with glass borders matching the site aesthetic
- Brand-tinted hover states with 3px lift and 0.25s transitions
- Uppercase letter-spaced "Follow us" label
- Accessible: `role="list"`, `aria-label` + `title` on every link, visible focus-visible ring
- i18n: +6 keys per locale (EN / zh-TW / JA)

---

## 3. Footer Rebuild (`bb87618`)

Rebuilt the footer following a supplied reference structure, adapted to the site's dark glassmorphic theme.

### Structure (top → bottom)

1. **Brand** — logo + wordmark + tagline
2. **Social + CTA + Newsletter row** (flex, 3-up)
   - 5 social icons with **brand-color fill on hover**
   - "Get in touch" pill CTA → `#contact`
   - Newsletter signup with validation + status feedback
3. **Footer columns** — Company / Services / Legal
4. **Disclaimer** — moved from `<main>` into the footer
5. **Copyright + legal link row**

### Brand-color hover fills

| Platform | Hover background |
|---|---|
| Facebook | `#1877f2` |
| Instagram | `linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)` |
| Threads | `#000` |
| WhatsApp | `#25d366` |
| Behance | `#1769ff` |

### Newsletter — new `static/js/newsletter.js` (+99 lines)

- Client-side email validation with red border + inline error message
- Success / error status messages, i18n-aware (re-reads translations at submit time)
- Persists the subscriber email to `localStorage`
- `NEWSLETTER_ENDPOINT` constant ready — set to a Formspree / Apps Script URL to go live
- Input cleared on success

### Columns

| Company | Services | Legal |
|---|---|---|
| About | AI Workflow Implementation | Privacy Policy |
| Case Studies | Process Automation Consulting | Terms of Service |
| Contact Us | Integration & API Development | Disclaimer |
| Back to top | Data Analytics & AI | |
| | Custom Web Applications | |
| | IoT & Embedded Solutions | |

### Responsive

| Breakpoint | Columns | Newsletter controls | Social tile |
|---|---|---|---|
| Desktop | 3-col grid | side-by-side | 40px |
| ≤768px | 2-col grid | stacked full-width | 36px |
| ≤480px | 1-col grid | stacked full-width | 34px |

### Pre-existing i18n bug fixed

`applyTranslations` only processed `data-i18n`, so `data-i18n-placeholder` and `data-i18n-alt` were silently ignored. The contact form placeholders and the intro video's `alt` text were stuck in English regardless of locale.

Added handling for both attributes — placeholders and alt text now translate correctly in all three locales.

---

## 4. Brand Logo Recolor (`d3fce1b`)

### Color analysis

| Element | Before | Hue | Sat |
|---|---|---|---|
| Logo image | `#107FFC` | **212°** (cyan-blue) | **98%** |
| Site `--primary` | `#6366F1` | 239° (indigo) | 84% |
| Site CTA gradient | `#6366F1 → #8B5CF6` | 239° → 258° | 84% |

A 27° hue gap and much higher saturation — the logo visually detached from the indigo/violet scheme.

| Element | After | Hue | Sat |
|---|---|---|---|
| Logo image | `#6E63F2` | **245°** | 85% |

Now 6° off the site primary, sitting between indigo and violet.

### Recolour method

The source logo's **luminance** was mapped onto the `#6366F1 → #8B5CF6` ramp rather than applying a flat fill, so:
- Original internal shading (bright body + darker center glyph `#0963D6`) preserved
- **White code-glyph strokes pixel-identical** (detected via saturation, not brightness)
- Alpha / transparency edges untouched

### Chrome aligned

| Element | Before | After |
|---|---|---|
| `.nav-logo` background fallback | `#0f7efd` | `#6366f1` |
| `.footer-logo` background fallback | `#0f7efd` | `#6366f1` |
| Nav logo border | `rgba(255,255,255,0.85)` | `rgba(165,180,252,0.65)` |
| Footer logo border | `rgba(129,140,248,0.5)` | `rgba(165,180,252,0.55)` |
| `meta theme-color` | `#0f172a` | `#6366f1` |
| `manifest.json` theme_color | `#0f172a` | `#6366f1` |

### Assets regenerated

| File | Before | After |
|---|---|---|
| `logo.png` | 181,959 B | 99,249 B |
| `logo.webp` | 12,946 B | 10,524 B |
| `logo-16.png` | 883 B | 640 B |
| `logo-32.png` | 1,642 B | 1,599 B |
| `logo-180.png` | 29,758 B | 20,315 B |
| `logo-192.png` | 33,447 B | 22,631 B |
| `logo-512.png` | 181,959 B | 99,249 B |
| `logo-512-maskable.png` | 93,411 B | 81,465 B |

`logo-512-maskable.png` was regenerated with proper safe-zone padding (logo scaled to 80% on a transparent canvas).

---

## Files Changed Overall

```
 index.html                          | 215 +++++++++++++-
 static/css/style.css                | 574 +++++++++++++++++++++++++++++++++---
 static/images/logo-16.png           | Bin 883 -> 640 bytes
 static/images/logo-180.png          | Bin 29758 -> 20315 bytes
 static/images/logo-192.png          | Bin 33447 -> 22631 bytes
 static/images/logo-32.png           | Bin 1642 -> 1599 bytes
 static/images/logo-512-maskable.png | Bin 93411 -> 81465 bytes
 static/images/logo-512.png          | Bin 181959 -> 99249 bytes
 static/images/logo.png              | Bin 181959 -> 99249 bytes
 static/images/logo.webp             | Bin 12946 -> 10524 bytes
 static/js/i18n.js                   | 106 ++++++-
 static/js/newsletter.js             |  99 +++++++
 static/manifest.json                |   2 +-
 13 files changed, 934 insertions(+), 62 deletions(-)
```

---

## i18n Coverage

| Locale | Keys before | Keys after |
|---|---|---|
| English (`en`) | 111 | **133** |
| Traditional Chinese (`zh-TW`) | 111 | **133** |
| Japanese (`ja`) | 111 | **133** |

22 keys added per locale — 6 social + 10 footer + 5 newsletter + 1 tagline. All three locales verified to have **identical key sets** (no missing, no extra) and every `data-i18n*` attribute in the HTML resolves.

---

## Verification Performed

| Area | Checks |
|---|---|
| Marquee | 3 tracks, 120 tiles, all animations running, opposite directions confirmed via `translateX` delta, no horizontal scrollbar (`scrollWidth === clientWidth`) at 390 / 480 / 994 / 1143 / 1920px |
| Reduced motion | Animations disabled, `overflow-x: auto` fallback, duplicate groups hidden |
| Layout | Container x=0 / width=viewport, hero + cards + marquee full-bleed |
| Footer | All sections present, brand-color hover fills confirmed in computed styles, newsletter invalid-email error + valid-email success + localStorage persistence |
| Mobile | 320px and 390px — drawer open/close, overlay, language switcher, social icon rendering, tap-to-open in new tab |
| i18n | EN / zh-TW / JA switching verified for footer labels, placeholders, alt text and newsletter messages |
| Assets | Live server color sampling confirms `#6D64F2` (H=244°) dominant |

---

## Deployment History

All commits pushed to `main` and deployed to Vercel production (`bstfsfxs-projects/ai-workflow`).

| Commit | Deployment |
|---|---|
| `7b8f589` | `ai-workflow-ays2na7cs` |
| `f71c138` | `ai-workflow-of9j6rueq` |
| `38eb9d1` | `ai-workflow-3pzo0nfm1` |
| `6e1a8eb` | `ai-workflow-5w7wd2mpl` |
| `a300e83` | `ai-workflow-itq7izxsi` |
| `7644199` | `ai-workflow-9hf1hra5x` |
| `3374165` | `ai-workflow-hly2koqtf` |
| `2f42b48` | `ai-workflow-q0ycdjf7o` |
| `88e339c` | `ai-workflow-k070ddd9i` |
| `bca2a0b` | `ai-workflow-99vm0st1z` |
| `bb87618` | `ai-workflow-jr2fvnqd7` |
| `d3fce1b` | `ai-workflow-jr2fvnqd7` → latest |

Production alias: **https://ai-workflow-iota-two.vercel.app/**

---

## Outstanding Items

| Item | Status |
|---|---|
| Social platform URLs | Placeholder homepage roots — swap for real brand pages |
| Newsletter backend | `NEWSLETTER_ENDPOINT` is `null` — wire to Formspree / Apps Script |
| Privacy & Terms pages | Currently anchor to the footer disclaimer block — no dedicated pages exist |
| Footer logo cache | Filename unchanged, so browsers may serve a stale logo — hard refresh required |

---

## Notes & Gotchas Encountered

- **Browser CSS caching** repeatedly masked changes during verification. Mitigation: cache-bust the stylesheet URL (`?cb=<timestamp>`) or switch to a fresh server port between checks.
- **Marquee keyframe direction**: a `to`-only keyframe silently animates `0% → 0%` when the element's default transform is already `0%`. Always specify an explicit `from`.
- **Logo hue gap**: the original `#107FFC` was not merely "a different blue" — it was 27° off-hue from the site primary, which is why it read as a separate brand color.
- **`data-i18n-placeholder` / `data-i18n-alt`** were present in the markup for a long time but never wired into `applyTranslations`.

---
---

# PART 2 — TECHNICAL IMPLEMENTATION GUIDE

> **Purpose:** This section is written as a self-contained replication guide. The target repository is assumed to be **~95% identical** to this one. Follow these steps in order; each references the exact files and rules in this codebase.
>
> **Prerequisites:** confirm the target repo has the structure described in §6.1 and the CSS custom properties in §6.2 before starting.
>
> **Section map:** §6 Stack · §7 Full-width · §8 Marquee · §9 Footer · §10 Newsletter · §11 i18n · §12 Logo · §13 PWA · §14 Deploy · §15 Testing · §16 Checklist · §17 Risks

---

## 6. Tech Stack & Environment

### 6.1 Stack

| Layer | Technology | Notes |
|---|---|---|
| Markup | Plain HTML5 | Single page, `index.html` (936 lines after changes) |
| Styling | Plain CSS3 | No preprocessor, no framework. `static/css/style.css` (1,765 lines) + `static/css/contact.css` (167 lines) |
| Scripting | Vanilla ES6+ | No bundler, no npm deps, no build step. IIFE + global functions |
| Fonts | Google Fonts — `Outfit` (300/400/600) | Loaded via `<link>` with `preconnect` |
| i18n | Custom `translations` object | `static/js/i18n.js` (558 lines) — EN / zh-TW / JA |
| Hosting | Vercel | `vercel.json` static + serverless routes |
| Serverless | Vercel Node functions | `api/contact.js` (Resend email), `api/status.js` |
| PWA | Web App Manifest + Service Worker | `static/manifest.json`, `sw.js` |
| Icons | PNG + WebP | `static/images/logo*.png`, `logo.webp` |
| Analytics | None | No tracking, no cookies, no third-party scripts |
| Build tooling | **None** | Plain static — `python3 -m http.server` for local dev |

**No dependencies to install.** There is no `package.json`, no `node_modules`, no lockfile. Any change here is pure file editing.

### 6.2 CSS Custom Properties (`:root` in `static/css/style.css`)

```css
:root {
    --primary: #6366f1;          /* indigo — the site accent */
    --primary-hover: #4f46e5;
    --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
    --card-bg: rgba(255, 255, 255, 0.05);
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --glass-border: rgba(255, 255, 255, 0.1);
    --success: #10b981;
    --info: #3b82f6;
}
```

**The site's colour tone is indigo → violet.** This is the anchor for every colour decision below.

### 6.3 Breakpoint System

| Breakpoint | Applied to |
|---|---|
| `max-width: 768px` | Nav collapses to drawer, grids → 1–2 col, tiles shrink, footer 3→2 col |
| `max-width: 480px` | Tighter paddings, footer → 1 col, newsletter stacks, tiles shrink further |
| `max-width: 360px` | Smallest tiles, smallest label text |
| `prefers-reduced-motion: reduce` | Animations disabled, marquee → scrollable, smooth-scroll off |

All breakpoints live in `static/css/style.css`. **Two separate `@media (max-width: 768px)` blocks exist** — one at line 904 (marquee-specific), one at line 1367 (site-wide). The 480px blocks are at lines 922 and 1553. When adding responsive rules, place marquee rules with the marquee block and general rules with the general block.

### 6.4 File Map — where each change lands

```
index.html                          → markup (nav, hero, sections, contact, footer)
static/css/style.css                → ALL styling
static/css/contact.css             → contact form + contact section only
static/js/i18n.js                   → translations object + applyTranslations()
static/js/newsletter.js             → NEW in this session
static/js/contact.js                → contact form handler (unchanged)
static/js/nav.js                    → mobile drawer / scroll lock (unchanged)
static/manifest.json                → PWA manifest
static/images/logo*.png|webp        → logo asset set
sw.js                               → service worker (CACHE version + precache list)
vercel.json                         → build routes (unchanged)
```

---

## 7. Change 1 — Full-Width Container (apply FIRST)

**Why first:** it changes the layout box every later step inherits.

### 7.1 Problem
`body { padding: 1rem }` + `.container { width: 95%; max-width: 1000px }` produced ~71px side gutters on a 1143px viewport.

### 7.2 Edits — `static/css/style.css`

**Base rules (~line 29):**
```css
body {
    /* ...existing props... */
    padding: 0;              /* was: 1rem; */
}

.container {
    width: 100%;             /* was: 95%; */
    max-width: none;         /* was: 1000px; */
    text-align: center;      /* unchanged */
}
```

**In `@media (max-width: 768px)`:**
```css
body {
    padding: 0;              /* was: 0.75rem; */
}

.container {
    width: 100%;             /* was: width:100%; padding: 0 0.5rem; */
}
```

**In `@media (max-width: 480px)`:**
```css
body {
    padding: 0;              /* was: 0.5rem; */
}
```

### 7.3 Verification
```js
document.querySelector('.container').getBoundingClientRect().x  // must be 0
document.querySelector('.container').getBoundingClientRect().width // must === innerWidth
document.documentElement.scrollWidth === document.documentElement.clientWidth // must be true
```

---

## 8. Change 2 — Three-Row Marquee

### 8.1 HTML structure

Insert **above** the existing `.projects-grid` inside `#case-studies`:

```html
<section class="sites-showcase" data-framer-name="sites" style="opacity: 1;"
         aria-labelledby="sites-showcase-title">
    <h3 id="sites-showcase-title" class="sr-only" data-i18n="sites-showcase-title">Featured Sites</h3>
    <div class="sites-viewport">
        <div class="sites-track sites-track--forward">   <!-- row 1: moves LEFT  -->
            <div class="sites-group">  ...20 tiles... </div>
            <div class="sites-group" aria-hidden="true"> ...same 20 tiles... </div>
        </div>
        <div class="sites-track sites-track--reverse">   <!-- row 2: moves RIGHT -->
            <div class="sites-group">  ...20 tiles... </div>
            <div class="sites-group" aria-hidden="true"> ...same 20 tiles... </div>
        </div>
        <div class="sites-track sites-track--parallax">  <!-- row 3: moves LEFT, slow -->
            <div class="sites-group">  ...20 tiles... </div>
            <div class="sites-group" aria-hidden="true"> ...same 20 tiles... </div>
        </div>
    </div>
</section>
```

**Tile template (real group):**
```html
<a class="site-tile" href="https://example.vercel.app/" target="_blank" rel="noopener noreferrer"><img src="static/images/photo.jpg" alt="" loading="lazy"><span class="site-tile-label" data-i18n="project-x-title"></span></a>
```

**Tile template (duplicate group) — 2 required changes:**
```html
<a aria-hidden="true" class="site-tile" href="https://example.vercel.app/" target="_blank" rel="noopener noreferrer" tabindex="-1"><img src="static/images/photo.jpg" alt="" loading="lazy"><span class="site-tile-label" data-i18n="project-x-title"></span></a>
```
1. Add `aria-hidden="true"` on the `<a>`
2. Add `tabindex="-1"` on the `<a>`

**Row order:**
| Row | Tile order |
|---|---|
| 1 (`--forward`) | 1 → 20 (Arashiyama → Bowtique) |
| 2 (`--reverse`) | 20 → 1 (Bowtique → Arashiyama) — **reversed** |
| 3 (`--parallax`) | Custom shuffle, distinct from rows 1 & 2 |

### 8.2 Generate the markup with a script

Because the 120-tile markup is highly repetitive and error-prone to hand-edit, generate it with Python:

```python
# -*- coding: utf-8 -*-
projects = [
    ("project-arashiyama-title", "https://arashiyama-beta.vercel.app/", "static/images/ARASHIYAMA.jpg"),
    # ... 20 entries ...
]
I = " "
TILE_I = I * 32

def tile_full(key, href, img, hidden=False):
    ha = ' aria-hidden="true"' if hidden else ""
    tb = ' tabindex="-1"' if hidden else ""
    return (f"{TILE_I}<a{ha} class=\"site-tile\" href=\"{href}\" target=\"_blank\" "
            f"rel=\"noopener noreferrer\"{tb}>"
            f"<img src=\"{img}\" alt=\"\" loading=\"lazy\">"
            f"<span class=\"site-tile-label\" data-i18n=\"{key}\"></span></a>")

def group_block(keys, hidden=False):
    return "\n".join(tile_full(k, h, i, hidden) for k, h, i in projects)

def track(cls, keys):
    return (f"{I*24}<div class=\"sites-track {cls}\">\n"
            f"{I*28}<div class=\"sites-group\">\n{group_block(keys)}\n{I*28}</div>\n"
            f"{I*28}<div class=\"sites-group\" aria-hidden=\"true\">\n"
            f"{group_block(keys, True)}\n{I*28}</div>\n{I*24}</div>\n")
```

**Insertion technique (safe):** find the `<div class="sites-track sites-track--reverse">` line, then walk forward tracking `<div` / `</div>` depth to find the matching close. Do **not** match the first `</div>` — that closes the inner `.sites-group`, not the track. This bug corrupted the markup once during this session.

### 8.3 CSS — `static/css/style.css`

```css
.sites-showcase {
    width: 100%;
    margin: 2rem 0 3rem;
    position: relative;
    overflow: hidden;
}

.sites-viewport {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* NOTE: no mask-image — removed this session for sharp edges */
}

.sites-track {
    display: flex;
    width: max-content;
    will-change: transform;
}

/* Row 1: content moves LEFT */
.sites-track--forward  { animation: sites-scroll-forward 50s linear infinite; }
/* Row 2: content moves RIGHT */
.sites-track--reverse  { animation: sites-scroll-reverse 50s linear infinite; }
/* Row 3: content moves LEFT at HALF speed (parallax depth) */
.sites-track--parallax { animation: sites-scroll-forward 100s linear infinite; }

@keyframes sites-scroll-forward {
    from { transform: translate3d(0%, 0, 0); }
    to   { transform: translate3d(-50%, 0, 0); }
}

@keyframes sites-scroll-reverse {
    from { transform: translate3d(-50%, 0, 0); }
    to   { transform: translate3d(0%, 0, 0); }
}

.sites-group {
    display: flex;
    gap: 1rem;
    padding-right: 1rem;
}
.sites-group:last-child { padding-right: 0; }

.site-tile {
    flex: 0 0 300px;
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease;
}
.site-tile img {
    width: 100%; height: 180px; object-fit: cover; display: block;
    transition: transform 0.4s ease;
}
.site-tile:hover img { transform: scale(1.05); }

.site-tile-label {
    position: absolute; inset: 0;
    display: flex; align-items: flex-end; padding: 0.75rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
    color: var(--text-main);
    font-size: 0.85rem; font-weight: 600; letter-spacing: 0.02em;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.site-tile:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
    border-color: rgba(99, 102, 241, 0.35);
    z-index: 2;
}

/* Pause on hover / focus */
.sites-showcase:hover .sites-track,
.sites-showcase:focus-within .sites-track { animation-play-state: paused; }
```

### 8.4 Critical CSS gotcha — `from` keyframe is mandatory

`sites-scroll-reverse` originally had only a `to` block. Because the track's default `transform` is already `0%`, the animation resolved to `0% → 0%` and **the row never moved**. Always declare both `from` and `to`.

### 8.5 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
    .sites-track { animation: none; transform: none; }
    .sites-viewport {
        overflow-x: auto;
        scroll-snap-type: x mandatory;
    }
    .sites-group:last-child { display: none; }  /* hide the duplicate group */
}
```

### 8.6 Responsive rules (marquee block, ~line 904)

```css
@media (max-width: 768px) {
    .sites-viewport  { gap: 0.75rem; }
    .sites-group    { gap: 0.75rem; }
    .sites-showcase { margin: 1.5rem 0 2rem; }
    .site-tile      { flex: 0 0 240px; }
    .site-tile img  { height: 140px; }
}
@media (max-width: 480px) {
    .sites-viewport  { gap: 0.5rem; }
    .sites-group    { gap: 0.5rem; }
    .sites-showcase { margin: 1rem 0 1.5rem; }
    .site-tile      { flex: 0 0 200px; }
    .site-tile img  { height: 120px; }
}
@media (max-width: 360px) {
    .site-tile       { flex: 0 0 160px; }
    .site-tile img   { height: 100px; }
    .site-tile-label { font-size: 0.75rem; padding: 0.5rem; }
}
```

### 8.7 Verification

```js
// 3 tracks, 120 tiles
document.querySelectorAll('.sites-track').length   // 3
document.querySelectorAll('.site-tile').length     // 120

// directions: forward tx decreases, reverse tx increases toward 0
const mm = s => { const v=getComputedStyle(s).transform;
  const p=v.match(/matrix\(([^)]*)\)/); return p?parseFloat(p[1].split(',')[4]):null; };
// sample twice ~2s apart and compare deltas
```

---

## 9. Change 3 — Footer Rebuild

### 9.1 HTML — replace the entire `<footer>` in `index.html`

```html
<footer class="site-footer">
    <div class="footer-inner">

        <!-- 1. BRAND -->
        <div class="footer-brand">
            <a href="#top" class="footer-brand-link" aria-label="AI Workflow Automation - home">
                <picture class="footer-logo-wrap">
                    <source srcset="static/images/logo.webp" type="image/webp">
                    <img class="footer-logo" src="static/images/logo.png"
                         alt="AI Workflow Automation logo" width="44" height="44">
                </picture>
                <span class="footer-brand-name">AI Workflow Automation</span>
            </a>
            <p class="footer-tagline" data-i18n="footer-tagline">…</p>
        </div>

        <!-- 2. SOCIAL + CTA + NEWSLETTER -->
        <div class="footer-social-row">
            <div class="footer-social-block">
                <span class="footer-section-title" data-i18n="social-follow">Follow us</span>
                <div class="social-links" role="list">
                    <a class="social-link social-link--facebook" href="…" target="_blank"
                       rel="noopener noreferrer" role="listitem" aria-label="Facebook" title="Facebook">
                        <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path fill="currentColor" d="…"/>
                        </svg>
                    </a>
                    <!-- instagram, threads, whatsapp, behance -->
                </div>
            </div>

            <a href="#contact" class="footer-cta" data-i18n="footer-cta">Get in touch</a>

            <form class="footer-newsletter" id="newsletter-form" novalidate>
                <label class="footer-section-title" for="newsletter-email"
                       data-i18n="newsletter-title">Newsletter</label>
                <div class="newsletter-controls">
                    <input type="email" id="newsletter-email" name="email" required
                           data-i18n-placeholder="newsletter-placeholder"
                           placeholder="Enter your email address"
                           aria-describedby="newsletter-status">
                    <button type="submit" class="newsletter-btn" data-i18n="newsletter-submit">Subscribe</button>
                </div>
                <p class="newsletter-status" id="newsletter-status" role="status" aria-live="polite"></p>
            </form>
        </div>

        <!-- 3. COLUMNS -->
        <div class="footer-columns">
            <div class="footer-column">
                <h3 class="footer-section-title" data-i18n="footer-company">Company</h3>
                <ul class="footer-link-list">
                    <li><a href="#about" data-i18n="nav-about">About</a></li>
                    <li><a href="#case-studies" data-i18n="nav-cases">Case Studies</a></li>
                    <li><a href="#contact" data-i18n="nav-contact">Contact Us</a></li>
                    <li><a href="#top" data-i18n="footer-back-to-top">Back to top</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3 class="footer-section-title" data-i18n="footer-services">Services</h3>
                <ul class="footer-link-list">
                    <li><a href="#about" data-i18n="expertise-ai">…</a></li>
                    <!-- 6 items, reuse existing expertise-* keys -->
                </ul>
            </div>
            <div class="footer-column">
                <h3 class="footer-section-title" data-i18n="footer-legal">Legal</h3>
                <ul class="footer-link-list">
                    <li><a href="#footer-disclaimer" data-i18n="footer-privacy">Privacy Policy</a></li>
                    <li><a href="#footer-disclaimer" data-i18n="footer-terms">Terms of Service</a></li>
                    <li><a href="#footer-disclaimer" data-i18n="footer-disclaimer-link">Disclaimer</a></li>
                </ul>
            </div>
        </div>

        <!-- 4. DISCLAIMER (moved here from <main>) -->
        <div class="footer-disclaimer" id="footer-disclaimer">
            <p class="footer-section-title" data-i18n="footer-disclaimer-title">Disclaimer</p>
            <p class="footer-disclaimer-text" data-i18n="disclaimer-general">…</p>
            <p class="footer-disclaimer-text" data-i18n="disclaimer-privacy">…</p>
        </div>

        <!-- 5. COPYRIGHT + LEGAL -->
        <div class="footer-bottom">
            <p data-i18n="footer">© 2026 …</p>
            <nav class="footer-bottom-links" aria-label="Legal">
                <a href="#footer-disclaimer" data-i18n="footer-privacy">Privacy Policy</a>
                <span aria-hidden="true">·</span>
                <a href="#footer-disclaimer" data-i18n="footer-terms">Terms of Service</a>
            </nav>
        </div>
    </div>
</footer>
```

**Also remove** the standalone `.disclaimer-section` div from `<main>` — the disclaimer now lives in the footer.

**Also add** the script tag in the scripts block:
```html
<script src="static/js/newsletter.js"></script>
```

### 9.2 CSS — replace the old `footer {}` / `.footer-logo` / social rules

```css
/* ============ Footer ============ */
.site-footer {
    margin-top: 4rem;
    padding: 3rem 0 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(0, 0, 0, 0.18);
}
.footer-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    text-align: left;
}

.footer-brand { display: flex; flex-direction: column; gap: 0.75rem; }
.footer-brand-link {
    display: inline-flex; align-items: center; gap: 0.75rem;
    text-decoration: none; width: fit-content;
}
.footer-brand-name {
    color: #e2e8f0; font-size: 1.05rem; font-weight: 600; letter-spacing: -0.01em;
}
.footer-brand-link:hover .footer-brand-name { color: #a5b4fc; }
.footer-logo-wrap { display: block; line-height: 0; }
.footer-logo {
    width: 44px; height: 44px; border-radius: 28%; object-fit: cover;
    background: #6366f1;                                  /* recoloured — see §10 */
    border: 2px solid rgba(165, 180, 252, 0.55);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.35);
}
.footer-tagline {
    color: #64748b; font-size: 0.85rem; line-height: 1.6; max-width: 420px; margin: 0;
}

.footer-section-title {
    display: block; color: #94a3b8; font-size: 0.75rem; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 0.75rem;
}

.footer-social-row {
    display: flex; align-items: flex-start; justify-content: space-between;
    flex-wrap: wrap; gap: 1.5rem 2rem;
    padding-bottom: 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.footer-social-block { display: flex; flex-direction: column; }

.social-links { display: flex; align-items: center; flex-wrap: wrap; gap: 0.75rem; }
.social-link {
    display: inline-flex; align-items: center; justify-content: center;
    width: 40px; height: 40px; border-radius: 10px;
    color: #94a3b8;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: color .25s ease, background-color .25s ease,
                border-color .25s ease, transform .25s ease, box-shadow .25s ease;
}
.social-icon { width: 18px; height: 18px; display: block; }
.social-link:hover, .social-link:focus-visible {
    color: #fff; transform: translateY(-3px); outline: none;
}
.social-link:focus-visible { box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.7); }

/* BRAND-COLOUR FILL ON HOVER */
.social-link--facebook:hover, .social-link--facebook:focus-visible {
    background: #1877f2; border-color: #1877f2; color: #fff;
}
.social-link--instagram:hover, .social-link--instagram:focus-visible {
    background: linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);
    border-color: rgba(225,96,139,.75); color: #fff;
}
.social-link--threads:hover, .social-link--threads:focus-visible {
    background: #000; border-color: rgba(255,255,255,.7); color: #fff;
}
.social-link--whatsapp:hover, .social-link--whatsapp:focus-visible {
    background: #25d366; border-color: #25d366; color: #fff;
}
.social-link--behance:hover, .social-link--behance:focus-visible {
    background: #1769ff; border-color: #1769ff; color: #fff;
}

.footer-cta {
    display: inline-flex; align-items: center; gap: .4rem;
    padding: .7rem 1.5rem; border-radius: 999px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff; font-size: .85rem; font-weight: 600;
    text-decoration: none; white-space: nowrap;
    box-shadow: 0 4px 16px rgba(99,102,241,.35);
    transition: transform .25s ease, box-shadow .25s ease, filter .25s ease;
}
.footer-cta:hover, .footer-cta:focus-visible {
    color: #fff; transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99,102,241,.5); filter: brightness(1.08); outline: none;
}

.footer-newsletter { flex: 1 1 320px; max-width: 420px; min-width: 260px; }
.newsletter-controls { display: flex; gap: .5rem; }
.newsletter-controls input {
    flex: 1 1 auto; min-width: 0; padding: .7rem 1rem; border-radius: 10px;
    border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.05);
    color: var(--text-main); font-family: inherit; font-size: .85rem;
    transition: border-color .25s ease, background-color .25s ease;
}
.newsletter-controls input::placeholder { color: #64748b; }
.newsletter-controls input:focus {
    outline: none; border-color: rgba(129,140,248,.6); background: rgba(255,255,255,.08);
}
.newsletter-controls input.input-error { border-color: rgba(248,113,113,.75); }
.newsletter-btn {
    padding: .7rem 1.4rem; border-radius: 10px;
    border: 1px solid rgba(129,140,248,.4); background: rgba(99,102,241,.18);
    color: #c7d2fe; font-family: inherit; font-size: .85rem; font-weight: 600;
    cursor: pointer; white-space: nowrap;
    transition: background-color .25s ease, color .25s ease, transform .25s ease;
}
.newsletter-btn:hover { background: rgba(99,102,241,.32); color: #fff; }
.newsletter-btn:active { transform: scale(.97); }
.newsletter-status { margin: .5rem 0 0; font-size: .75rem; min-height: 1rem; color: #64748b; }
.newsletter-status.is-success { color: #4ade80; }
.newsletter-status.is-error   { color: #f87171; }

.footer-columns { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 2rem; }
.footer-column { min-width: 0; }
.footer-link-list {
    list-style: none; margin: 0; padding: 0;
    display: flex; flex-direction: column; gap: .55rem;
}
.footer-link-list a {
    color: #64748b; font-size: .85rem; text-decoration: none; transition: color .2s ease;
}
.footer-link-list a:hover, .footer-link-list a:focus-visible { color: #c7d2fe; outline: none; }

.footer-disclaimer {
    padding: 1.25rem 1.5rem; border-radius: 14px;
    background: rgba(0,0,0,.25); border: 1px solid rgba(255,255,255,.07);
}
.footer-disclaimer-text { color: #64748b; font-size: .8rem; line-height: 1.65; margin: 0 0 .5rem; }
.footer-disclaimer-text:last-child { margin-bottom: 0; }

.footer-bottom {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: .75rem; padding-top: 1.5rem;
    border-top: 1px solid rgba(255,255,255,.06);
}
.footer-bottom p { margin: 0; color: #475569; font-size: .78rem; }
.footer-bottom-links { display: flex; align-items: center; gap: .6rem; }
.footer-bottom-links a {
    color: #64748b; font-size: .78rem; text-decoration: none; transition: color .2s ease;
}
.footer-bottom-links a:hover, .footer-bottom-links a:focus-visible { color: #c7d2fe; outline: none; }
.footer-bottom-links span { color: #334155; font-size: .78rem; }
```

**Important — delete the OLD rules** that this replaces, or they will conflict:
- `footer { margin-top: 3rem; color: var(--text-muted); font-size: 0.9rem; }`
- the old `.footer-logo-wrap` / `.footer-logo` block (replaced above)
- the old `.social-section` / `.social-label` block

### 9.3 Responsive footer rules

**In `@media (max-width: 768px)`:**
```css
.site-footer   { margin-top: 2.5rem; padding: 2.25rem 0 1.5rem; }
.footer-inner  { padding: 0 1.25rem; gap: 1.75rem; }
.footer-social-row { gap: 1.25rem; padding-bottom: 1.5rem; }
.footer-newsletter { flex-basis: 100%; max-width: none; min-width: 0; }
.footer-columns { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 1.5rem; }
.footer-bottom { padding-top: 1.25rem; }
.social-links { gap: .6rem; }
.social-link  { width: 36px; height: 36px; border-radius: 9px; }
.social-icon  { width: 17px; height: 17px; }
```

**In `@media (max-width: 480px)`:**
```css
.site-footer   { margin-top: 2rem; padding: 1.75rem 0 1.25rem; }
.footer-inner  { padding: 0 1rem; gap: 1.5rem; }
.footer-brand-name { font-size: .95rem; }
.footer-tagline     { font-size: .8rem; }
.footer-section-title { font-size: .68rem; letter-spacing: .12em; }
.footer-social-row { gap: 1.25rem; padding-bottom: 1.25rem; }
.footer-cta { padding: .6rem 1.25rem; font-size: .8rem; }
.newsletter-controls { flex-direction: column; }
.newsletter-btn { padding: .65rem 1rem; }
.footer-columns { grid-template-columns: 1fr; gap: 1.25rem; }
.footer-bottom { flex-direction: column; align-items: flex-start; gap: .5rem; }
.social-links { gap: .5rem; }
.social-link  { width: 34px; height: 34px; border-radius: 8px; }
.social-icon  { width: 16px; height: 16px; }
```

### 9.4 Social SVG icons

Use inline `<svg class="social-icon" viewBox="0 0 24 24">` with `<path fill="currentColor" d="…"/>`. Official brand paths (24×24):

- **Facebook** — `M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z`
- **Instagram** — `M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.98c-3.14 0-3.51.01-4.75.07-1.15.05-1.77.24-2.19.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.42-.35 1.04-.4 2.19-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.15.24 1.77.4 2.19.21.55.47.94.88 1.35.41.41.8.67 1.35.88.42.16 1.04.35 2.19.4 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.15-.05 1.77-.24 2.19-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.42.35-1.04.4-2.19.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.15-.24-1.77-.4-2.19-.21-.55-.47-.94-.88-1.35-.41-.41-.8-.67-1.35-.88-.42-.16-1.04-.35-2.19-.4C15.51 4.15 15.14 4.14 12 4.14Zm0 3.23a4.63 4.63 0 1 1 0 9.26 4.63 4.63 0 0 1 0-9.26Zm0 7.64a3.01 3.01 0 1 0 0-6.02 3.01 3.01 0 0 0 0 6.02Zm5.9-7.83a1.08 1.08 0 1 1-2.17 0 1.08 1.08 0 0 1 2.17 0Z`
- **Threads** — `M16.49 9.53c-.13-.06-.25-.12-.38-.17-.22-3.24-1.95-5.1-4.94-5.13h-.04c-1.79 0-3.28.85-4.19 2.39l1.44.99c.72-1.21 1.84-1.53 2.75-1.53h.03c.91 0 1.68.22 2.29.66.44.32.77.76.98 1.31-.76-.19-1.6-.29-2.5-.29-2.51 0-4.18 1.26-4.18 3.36 0 1.07.5 1.96 1.42 2.56.77.5 1.74.75 2.81.75 1.37 0 2.46-.45 3.21-1.32.59-.68.94-1.58 1.05-2.68.53.33.92.79 1.14 1.37.44 1.13.48 2.87-.94 4.44-1.26 1.39-2.79 1.97-4.62 1.97-2.03 0-3.66-.72-4.85-2.15C3.06 13.82 2.51 12.1 2.5 10c.01-2.1.56-3.82 1.61-5.14C5.31 3.42 6.94 2.68 9.03 2.67c2.1.01 3.75.75 4.96 2.2 1.18 1.42 1.74 3.28 1.72 5.66h2.02c.03-2.73-.64-4.9-1.99-6.53C14.6 2.2 12.4 1.32 9.03 1.31h-.01c-2.37 0-4.44.89-6.06 2.6C1.33 6.63.5 8.86.5 11.32c0 2.46.83 4.69 2.46 6.4 1.62 1.72 3.69 2.6 6.06 2.61h.01c2.36-.01 4.36-.85 5.86-2.48 1.98-2.13 2.12-4.6 1.3-6.63-.58-1.44-1.82-2.58-3.16-2.89Zm-5.36 6.32c-1.31 0-2.69-.61-2.69-2.05 0-1.07.87-1.75 2.82-1.75.72 0 1.48.08 2.19.23-.28 3.17-1.5 3.57-2.32 3.57Z`
- **WhatsApp** — `M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.76 9.76 0 0 1-4.97-1.36l-.36-.21-3.7.97.99-3.61-.23-.37a9.71 9.71 0 0 1-1.49-5.19c0-5.38 4.38-9.76 9.77-9.76 2.61 0 5.06 1.02 6.9 2.86a9.7 9.7 0 0 1 2.86 6.91c0 5.38-4.38 9.76-9.76 9.76ZM20.52 3.45A11.66 11.66 0 0 0 12.05.22C5.7.22.55 5.36.55 11.71c0 2.06.54 4.07 1.56 5.85L.44 24l6.58-1.73a11.66 11.66 0 0 0 5.03 1.28h.01c6.35 0 11.5-5.15 11.5-11.49 0-3.07-1.2-5.96-3.37-8.13Z`
- **Behance** — `M7.5 11.2c.93 0 1.68-.24 2.25-.71.57-.47.86-1.1.86-1.9 0-.86-.35-1.54-1.05-2.04-.7-.5-1.61-.75-2.73-.75H2v10.66h4.9c1.19 0 2.14-.3 2.85-.91.7-.6 1.05-1.45 1.05-2.55 0-.85-.29-1.52-.86-2-.58-.48-1.53-.8-2.44-.8Zm-3.36-4.02h2.14c.66 0 1.16.14 1.48.42.32.28.48.67.48 1.17 0 .51-.16.9-.48 1.18-.32.27-.82.41-1.5.41H4.14V7.18Zm3.62 7.84c-.35.4-.86.6-1.53.6H4.14v-3.13h2.16c.71 0 1.24.17 1.59.5.34.34.52.79.52 1.35 0 .55-.18 1.02-.55 1.38ZM21.1 15.38c.08-.19.12-.39.12-.61 0-.75-.15-1.4-.45-1.93-.3-.54-.72-.95-1.25-1.24-.53-.3-1.16-.44-1.87-.44-.73 0-1.38.16-1.93.47-.55.3-.98.74-1.28 1.3-.3.55-.45 1.21-.45 1.96 0 .73.15 1.38.44 1.93.29.54.71.95 1.25 1.23.54.29 1.19.43 1.95.43.65 0 1.2-.1 1.65-.29.46-.19.84-.5 1.15-.92l-1.84-1.4c-.14.24-.33.42-.57.55-.24.13-.53.2-.86.2-.48 0-.85-.14-1.12-.43-.26-.28-.4-.7-.42-1.26h6.32v-.31Zm-3.55-2.72c.03-.55.19-.96.47-1.24.28-.27.67-.4 1.15-.4.47 0 .85.14 1.13.42.28.27.44.68.46 1.22h-3.21ZM15.34 5.9h4.29v1.35h-4.29V5.9Z`

---

## 10. Change 4 — Newsletter (`static/js/newsletter.js`)

**Create the file (99 lines):**

```js
// Newsletter Signup Handler
// Client-side validation + localStorage persistence.
// Wire up a real endpoint by setting NEWSLETTER_ENDPOINT.

const NEWSLETTER_ENDPOINT = null; // e.g. 'https://formspree.io/f/xxxxxxx'
const NEWSLETTER_STORAGE_KEY = 'aiwf_newsletter_email';

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getTranslation(key, fallback) {
    if (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang][key]) {
        return translations[currentLang][key];
    }
    if (typeof translations !== 'undefined' && translations.en && translations.en[key]) {
        return translations.en[key];
    }
    return fallback;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    const input = document.getElementById('newsletter-email');
    const status = document.getElementById('newsletter-status');
    const submitBtn = form.querySelector('.newsletter-btn');

    function setStatus(message, type) {
        if (!status) return;
        status.textContent = message;
        status.className = 'newsletter-status' + (type ? ' is-' + type : '');
    }
    function clearError() {
        if (input) input.classList.remove('input-error');
    }

    input?.addEventListener('input', clearError);

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = (input?.value || '').trim();

        if (!email || !isValidEmail(email)) {
            input?.classList.add('input-error');
            setStatus(getTranslation('newsletter-error', 'Please enter a valid email address.'), 'error');
            input?.focus();
            return;
        }

        clearError();
        const originalText = submitBtn?.textContent || 'Subscribe';
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = '...'; }

        try {
            if (NEWSLETTER_ENDPOINT) {
                const response = await fetch(NEWSLETTER_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                if (!response.ok) throw new Error('Newsletter request failed');
            }

            try { localStorage.setItem(NEWSLETTER_STORAGE_KEY, email); } catch (e) {}

            setStatus(getTranslation('newsletter-success', 'Thanks for subscribing!'), 'success');
            if (input) input.value = '';
        } catch (error) {
            console.error('Newsletter error:', error);
            setStatus(getTranslation('newsletter-error', 'Please enter a valid email address.'), 'error');
        } finally {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
        }
    });
});
```

**Register it** in `index.html`:
```html
<script src="static/js/newsletter.js"></script>
```

**To go live:** set `NEWSLETTER_ENDPOINT` to a real provider URL. Optionally add a Vercel serverless function mirroring `api/contact.js` (POST + CORS + validation) at `api/newsletter.js`.

---

## 11. Change 5 — i18n Keys

### 11.1 Keys added

**Social (6)** — `social-follow`, `social-facebook`, `social-instagram`, `social-threads`, `social-whatsapp`, `social-behance`

**Footer (10)** — `footer-tagline`, `footer-cta`, `footer-company`, `footer-services`, `footer-legal`, `footer-back-to-top`, `footer-privacy`, `footer-terms`, `footer-disclaimer-link`, `footer-disclaimer-title`

**Newsletter (5)** — `newsletter-title`, `newsletter-placeholder`, `newsletter-submit`, `newsletter-success`, `newsletter-error`, `newsletter-already`

### 11.2 Values per locale

| Key | EN | zh-TW | JA |
|---|---|---|---|
| `social-follow` | Follow us | 關注我們 | フォローする |
| `footer-tagline` | Enterprise workflow automation, implementation and integration consultants. | 企業流程自動化、落地實作與系統整合顧問。 | エンタープライズのワークフロー自動化、実装および統合コンサルティング。 |
| `footer-cta` | Get in touch | 聯絡我們 | お問い合わせ |
| `footer-company` | Company | 公司 | 会社情報 |
| `footer-services` | Services | 服務項目 | サービス |
| `footer-legal` | Legal | 法律條款 | 法的情報 |
| `footer-back-to-top` | Back to top | 返回頂部 | ページ上部へ |
| `footer-privacy` | Privacy Policy | 私隱政策 | プライバシーポリシー |
| `footer-terms` | Terms of Service | 服務條款 | 利用規約 |
| `footer-disclaimer-link` | Disclaimer | 免責聲明 | 免責事項 |
| `footer-disclaimer-title` | Disclaimer | 免責聲明 | 免責事項 |
| `newsletter-title` | Newsletter | 電子報 | ニュースレター |
| `newsletter-placeholder` | Enter your email address | 請輸入您的電子郵件地址 | メールアドレスを入力 |
| `newsletter-submit` | Subscribe | 訂閱 | 登録する |
| `newsletter-success` | Thanks for subscribing! Please check your inbox to confirm. | 感謝您的訂閱！請查看您的收件箱以確認。 | ご購読ありがとうございます。確認のため受信箱をご確認ください。 |
| `newsletter-error` | Please enter a valid email address. | 請輸入有效的電子郵件地址。 | 有効なメールアドレスを入力してください。 |
| `newsletter-already` | You are already subscribed. Thank you! | 您已訂閱過，感謝您！ | すでに購読済みです。ありがとうございます。 |

**Platform names (`social-facebook` etc.) are identical in all locales** — proper nouns are not translated.

### 11.3 CRITICAL — fix `applyTranslations` for placeholders and alt text

The existing `applyTranslations()` in `static/js/i18n.js` only handled `data-i18n`. **`data-i18n-placeholder` and `data-i18n-alt` were silently ignored** — a long-standing bug that left contact-form placeholders and the video `alt` text in English in every locale.

**Add these two blocks immediately after the existing `data-i18n` loop:**

```js
    // Translate placeholder attributes (e.g. data-i18n-placeholder="...")
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.setAttribute('placeholder', t[key]);
        }
    });

    // Translate alternate attributes such as data-i18n-alt="..."
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
        const key = el.getAttribute('data-i18n-alt');
        if (t[key]) {
            el.setAttribute('alt', t[key]);
        }
    });
```

### 11.4 Verification script

```python
import io, re
src = io.open('static/js/i18n.js', encoding='utf-8').read()
starts = {}
for n, p in (('en', r'^    "?(en)"?:\s*\{'),
             ('zh-TW', r'^    "?(zh-TW)"?:\s*\{'),
             ('ja', r'^    "?(ja)"?:\s*\{')):
    starts[n] = re.search(p, src, re.M).end()
order = ['en', 'zh-TW', 'ja']
KEY = re.compile(r'^\s*"([^"]+)"\s*:', re.M)
sets = {}
for i, n in enumerate(order):
    s = starts[n]
    nxt = (re.search(r'^    "?[a-zA-Z\-]+"?:\s*\{', src[s:], re.M).start() + s
           if i + 1 < len(order) else len(src))
    ks = KEY.findall(src[s:nxt])
    sets[n] = set(ks)
    print(f"{n}: {len(ks)} keys")
en = sets['en']
for n in order[1:]:
    print(f"  {n} missing: {en - sets[n] or 'none'} | extra: {sets[n] - en or 'none'}")

# every data-i18n* in the HTML must exist in en
html = io.open('index.html', encoding='utf-8').read()
used = set(re.findall(r'data-i18n(?:-placeholder)?="([^"]+)"', html))
print(f"HTML uses {len(used)} keys; missing: {used - en or 'none'}")
```

Expected: all three locales at the **same count**, zero missing, zero extra, zero HTML orphans.

---

## 12. Change 6 — Logo Recolour

### 12.1 Why

The logo's blue (`#107FFC`, H=212°, S=98%) was **27° off-hue** from the site primary (`#6366F1`, H=239°) and far more saturated — it read as a separate brand colour.

### 12.2 Recolour script (run from repo root, needs Pillow)

```python
from PIL import Image
import numpy as np

im = Image.open('static/images/logo.png').convert('RGBA')
a = np.array(im).astype(np.float32) / 255.0
r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]

INDIGO = np.array([0x63, 0x66, 0xF1], dtype=np.float32) / 255.0   # --primary
VIOLET = np.array([0x8B, 0x5C, 0xF6], dtype=np.float32) / 255.0   # CTA gradient end

# Detect the white glyph strokes by SATURATION (not brightness) so we
# preserve them pixel-identically while recolouring everything else.
mx = a[..., :3].max(axis=2)
mn = a[..., :3].min(axis=2)
sat = (mx - mn) / np.maximum(mx, 1e-6)
white = (mx > 0.82) & (sat < 0.25)

# Map the source logo's LUMINANCE onto the indigo->violet ramp.
lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
t = np.clip((lum - 0.10) / (0.62 - 0.10), 0, 1) ** 1.9 * 0.62   # compress toward indigo

newc = INDIGO * (1 - t[..., None]) + VIOLET * t[..., None]
mask = (~white) & (al > 0)
out_rgb = np.where(mask[..., None], newc, np.stack([r, g, b], axis=2))
res = np.concatenate([out_rgb, al[..., None]], axis=2)
out = Image.fromarray((np.clip(res, 0, 1) * 255).astype(np.uint8))
out.save('static/images/logo.png')
```

**Tuning knobs:**
| Param | Effect |
|---|---|
| `** 1.9` exponent | Higher = more indigo-dominant. `1.0` = full ramp (too violet) |
| `* 0.62` factor | Scales how far toward violet the brightest pixels travel |
| `(lum - 0.10) / (0.62 - 0.10)` | Source luminance range — adjust if the source logo differs |
| `white` thresholds `0.82 / 0.25` | Glyph detection; lower `sat` threshold if the glyph is tinted |

**Result:** dominant `#6E63F2` (H=245°, S=85%, L=67%) — 6° from the site primary.

### 12.3 Regenerate the full asset set

```python
from PIL import Image
import os

src = Image.open('static/images/logo.png').convert('RGBA')   # already recoloured

src.save('static/images/logo.webp', 'WEBP', quality=92)
src.save('static/images/logo-512.png', 'PNG', optimize=True)

for s in (16, 32, 180, 192):
    src.resize((s, s), Image.LANCZOS).save(f'static/images/logo-{s}.png', 'PNG', optimize=True)

# Maskable: scale to 80% on a transparent canvas (Android safe zone)
m = src.resize((int(512 * 0.80), int(512 * 0.80)), Image.LANCZOS)
canvas = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
canvas.alpha_composite(m, ((512 - m.width) // 2, (512 - m.height) // 2))
canvas.save('static/images/logo-512-maskable.png', 'PNG', optimize=True)
```

### 12.4 Align the surrounding chrome

| File | Rule | Change |
|---|---|---|
| `static/css/style.css` | `.nav-logo` | `background: #0f7efd` → `#6366f1`; `border: 2px solid rgba(255,255,255,0.85)` → `rgba(165,180,252,0.65)` |
| `static/css/style.css` | `.footer-logo` | `background: #0f7efd` → `#6366f1`; `border` → `rgba(165,180,252,0.55)` |
| `index.html` | `<meta name="theme-color">` | `#0f172a` → `#6366f1` |
| `static/manifest.json` | `theme_color` | `#0f172a` → `#6366f1` |

Keep `background_color: #0f172a` in the manifest — that is the splash-screen background and should stay dark.

### 12.5 Verify the live colour

```bash
curl -s "https://<domain>/static/images/logo.webp?v=2" -o /tmp/live.webp
python3 - <<'PY'
from PIL import Image
from collections import Counter
import colorsys
im = Image.open('/tmp/live.webp').convert('RGBA')
px = im.load(); w, h = im.size
c = Counter()
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a > 200: c[(r, g, b)] += 1
for (r, g, b), n in c.most_common(3):
    hh, ll, ss = colorsys.rgb_to_hls(r/255, g/255, b/255)
    print(f"#{r:02x}{g:02x}{b:02x}  {n/w/h*100:.1f}%  H={hh*360:.0f} S={ss*100:.0f} L={ll*100:.0f}")
print("target: #6366f1  H=239 S=84 L=67")
PY
```

---

## 13. PWA / Service Worker — MUST NOT BE FORGOTTEN

`sw.js` precaches assets by **fixed filename**. Because `style.css`, `i18n.js` and the logo images kept the same names, users kept receiving **stale cached copies**. This was the single biggest source of confusion during the session ("my change isn't showing").

### 13.1 Add the new file to the precache list

In `sw.js`, add to the `CORE` array:
```js
    '/static/js/newsletter.js',
```

### 13.2 Bump the cache version

```js
const CACHE = 'pwa-v1';   // → 'pwa-v2'
```

The `activate` handler deletes all caches not matching `CACHE`, so bumping this forces every client to re-fetch.

### 13.3 Bump it on EVERY deploy that changes a precached asset

The precache list currently includes:
```
'/', '/static/css/style.css', '/static/css/contact.css',
'/static/js/i18n.js', '/static/js/contact.js', '/static/js/nav.js',
'/static/manifest.json',
'/static/images/logo.webp', '/static/images/logo.png',
'/static/images/logo-192.png', '/static/images/logo-512.png',
'/static/images/logo-512-maskable.png', '/static/images/logo-180.png',
'/static/images/logo-32.png'
```

Any change to `style.css`, `i18n.js`, `nav.js`, `contact.js` or a logo file **requires a cache bump** or users will see the old version indefinitely.

> **Alternative for the target repo:** rename assets with a content hash (`style.a1b2c3.css`) and reference them from `index.html`. More work, but eliminates the problem permanently. Not done here because the site has no build step.

---

## 14. Deployment

### 14.1 Commands

```bash
git add -A
git commit -m "…"
git push origin main
vercel --prod --yes
vercel ls --yes          # confirm the new deployment shows "Ready"
```

### 14.2 `vercel.json` — no change needed

```json
{
  "version": 2,
  "builds": [
    { "src": "api/*.js", "use": "@vercel/node" },
    { "src": "index.html", "use": "@vercel/static" },
    { "src": "sw.js", "use": "@vercel/static" },
    { "src": "static/**", "use": "@vercel/static" }
  ]
}
```

New files under `static/` and `api/` are picked up automatically by the `static/**` and `api/*.js` globs.

### 14.3 Post-deploy verification

```bash
# 1. HTML structure
curl -s "https://<domain>/?v=2" | grep -o 'sites-track--[a-z]*' | sort -u
curl -s "https://<domain>/?v=2" | grep -o 'footer-brand\|footer-social-row\|footer-columns\|footer-disclaimer\|footer-bottom\|newsletter-form' | sort | uniq -c

# 2. CSS rules present
curl -s "https://<domain>/static/css/style.css?v=2" | grep -c 'site-footer'
curl -s "https://<domain>/static/css/style.css?v=2" | grep -A3 'sites-track--parallax'

# 3. New JS file served
curl -s -o /dev/null -w "%{http_code}\n" "https://<domain>/static/js/newsletter.js?v=2"

# 4. i18n key counts
curl -s "https://<domain>/static/js/i18n.js?v=2" | grep -c 'footer-tagline\|newsletter-success'

# 5. Logo colour (see §12.5)
```

**Always append `?v=2`** (or a timestamp) to the asset URLs — otherwise `curl` and the browser both serve stale cached copies.

---

## 15. Local Development & Testing

### 15.1 Serve

```bash
python3 -m http.server 8000        # from the repo root
# open http://localhost:8000
```

No build step. No npm install. The `api/` functions only run on Vercel.

### 15.2 Cache-bust during development

The browser caches `style.css` aggressively. To force a fresh read:

```js
// In the browser console
document.querySelectorAll('link[rel="stylesheet"]')
  .forEach((l, i) => { l.href = l.href.split('?')[0] + '?cb=' + Date.now() + '_' + i; });
```

Or restart the server on a **different port** — the port change makes it a new origin with an empty cache.

### 15.3 Browser test checklist

| Area | Assertions |
|---|---|
| Marquee | 3 `.sites-track`; 120 `.site-tile`; all `animation-play-state: running`; forward `translateX` decreasing, reverse increasing toward 0; `scrollWidth === clientWidth` |
| Row order | row 1 first tile = `project-arashiyama-title`; row 2 first tile = `project-bowtique-title`; row 3 first tile = custom |
| Reduced motion | `animation: none`; viewport `overflow-x: auto`; duplicate groups `display: none` |
| Full width | `.container` x = 0, width = `innerWidth`; hero + cards + marquee span the viewport |
| Footer | `.site-footer` exists; 3 `.footer-column`; 5 `.social-link`; newsletter form present; old `.disclaimer-section` gone |
| Hover fills | computed `backgroundColor` per platform on `:hover` |
| Newsletter | invalid email → `is-error` + `input-error`; valid → `is-success` + input cleared + localStorage set |
| i18n | switch EN / zh-TW / JA → footer labels, placeholders, alt text and newsletter messages all change |
| Mobile | 320px and 390px — drawer opens, overlay dims, body locks, language buttons work, social icons render, tap opens a new tab |
| Accessibility | `aria-label` + `title` on social links; `role="list"`; `aria-hidden` on duplicate tiles; focus-visible rings |

### 15.4 Screenshotting the footer

`scrollIntoView` is unreliable here because `html { scroll-behavior: smooth }` animates the scroll and the screenshot fires mid-animation. Force it:

```js
document.documentElement.style.scrollBehavior = 'auto';
const f = document.querySelector('.site-footer');
window.scrollTo({ top: f.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
```

---

## 16. Replication Checklist

Copy this list into the target repo's task tracker.

### Phase A — Layout foundation
- [ ] `body { padding: 0 }` at base, ≤768px, ≤480px
- [ ] `.container { width: 100%; max-width: none }` at base and ≤768px
- [ ] Verify `.container` x = 0 and no horizontal scrollbar

### Phase B — Marquee
- [ ] Insert `.sites-showcase` above `.projects-grid` in `#case-studies`
- [ ] Generate 3 tracks × 2 groups × N tiles via script
- [ ] Real group tiles: plain `<a class="site-tile">`
- [ ] Duplicate group tiles: `aria-hidden="true"` **and** `tabindex="-1"`
- [ ] Row 1 order = A→B; Row 2 order = B→A; Row 3 order = custom shuffle
- [ ] CSS: `.sites-viewport` (flex column, `overflow: hidden`, **no mask**)
- [ ] CSS: `.sites-track` (`display:flex; width:max-content; will-change:transform`)
- [ ] CSS: `--forward` 50s, `--reverse` 50s, `--parallax` 100s
- [ ] Keyframes: **both** `from` and `to` declared explicitly
- [ ] CSS: hover/focus pause; reduced-motion block
- [ ] Responsive: 768 / 480 / 360 tile sizes + gaps + margins

### Phase C — Footer
- [ ] Replace `<footer>` wholesale with the 5-block structure
- [ ] Remove the old `.disclaimer-section` from `<main>`
- [ ] CSS: delete old `footer {}`, `.footer-logo*`, `.social-section`, `.social-label` rules
- [ ] CSS: add the new `.site-footer` / `.footer-*` / `.social-*` rules
- [ ] Responsive footer rules at 768 and 480
- [ ] Create `static/js/newsletter.js`, register in `index.html`

### Phase D — i18n
- [ ] Add 21 keys to each of `en`, `zh-TW`, `ja` in `static/js/i18n.js`
- [ ] Add `data-i18n-placeholder` + `data-i18n-alt` handling to `applyTranslations()`
- [ ] Run the key-count verification script — all three locales equal, no HTML orphans

### Phase E — Brand
- [ ] Recolour logo assets onto the indigo→violet ramp (§12.2)
- [ ] Regenerate all sizes + webp + maskable (§12.3)
- [ ] Update `.nav-logo` / `.footer-logo` CSS + `meta theme-color` + `manifest theme_color`

### Phase F — PWA & deploy
- [ ] Add `/static/js/newsletter.js` to the `sw.js` `CORE` array
- [ ] Bump `sw.js` `CACHE` constant
- [ ] Commit → push `main` → `vercel --prod --yes`
- [ ] Verify the deployment shows `Ready`
- [ ] Run the post-deploy curl checks (§14.3) with `?v=2`
- [ ] Run the browser test checklist (§15.3)

---

## 17. Known Risks for the Replication

| Risk | Mitigation |
|---|---|
| Stale service-worker cache hides all changes | Bump `sw.js` `CACHE`; add new files to `CORE` |
| Browser CSS cache masks edits during dev | Cache-bust the `<link>` or use a new server port |
| `to`-only keyframe → row doesn't move | Always declare `from` |
| Nested `<div>` matching grabs the wrong close | Track nesting depth, not the first `</div>` |
| Script stdout leaking into HTML | Write the block to a file; don't `print()` into the redirect target |
| `data-i18n-placeholder` silently ignored | Wire it into `applyTranslations()` |
| Logo colour mismatch | Measure the source hue before recolouring; don't eyeball |
| Duplicate tile group focusable by keyboard | `aria-hidden="true"` **and** `tabindex="-1"` |
| Marquee causing page-level h-scroll | `overflow: hidden` on `.sites-viewport`; verify `scrollWidth === clientWidth` |

