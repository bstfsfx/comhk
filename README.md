# AI Workflow Automation — Company Site

A single-page marketing site for an AI workflow automation consulting business, with a static front-end (`index.html` + `static/`) and a serverless `/api/status` endpoint.

Live: https://personal-ten-sandy.vercel.app
Repo: https://github.com/bstfsfx/comtw

## Features

- Sticky glass top navigation with logo, anchor links, language switcher (EN / 中文 / 日本語), and a responsive hamburger drawer with overlay and scroll lock
- Hero carousel, case studies, services, intro videos, and a contact form
- Internationalization (en, zh-TW, ja) with localStorage persistence
- PWA: installable web app manifest, maskable app icons, and a service worker for offline shell caching and stale-while-revalidate asset updates
- Responsive design at 768px and 480px breakpoints
- Smooth anchor scrolling with `prefers-reduced-motion` support

## Project structure

```
.
├── index.html         # Main page (nav, hero, sections, contact, footer)
├── sw.js              # Service worker (offline shell + SWR caching)
├── vercel.json        # Build routes: api/*.js (Node), index.html, sw.js, static/**
├── api/               # Serverless functions (e.g. /api/status, /api/contact)
├── static/
│   ├── css/           # style.css, contact.css
│   ├── js/            # i18n.js, contact.js, nav.js
│   └── images/        # Logo variants, hero/case images, videos
└── templates/         # Legacy Flask template (not deployed)
```

## Local development

Serve the static site from the project root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

The site is plain static HTML/CSS/JS — no build step is required for the front-end.
Serverless functions under `api/` are only used by the Vercel deployment.

## Deployment

1. Install the Vercel CLI and log in:

   ```bash
   npm i -g vercel
   vercel login
   ```

2. From the project root, deploy to production:

   ```bash
   vercel --prod
   ```

The static site is served from `index.html`, `sw.js`, and `static/`. The API endpoint is at `/api/status`.

## Internationalization

Translation keys live in `static/js/i18n.js`. To add a new key, add it to the `en`, `zh-TW`, and `ja` objects and reference it in HTML via `data-i18n="key"` (or `data-i18n-placeholder` for inputs).

## PWA

- Manifest: `static/manifest.json` — change `name`, `theme_color`, and icons there
- Service worker: `sw.js` — bump the `CACHE` constant when you ship a change you want users to pick up immediately
- App icons: `static/images/logo-192.png`, `logo-512.png`, `logo-512-maskable.png` (Android), `logo-180.png` (Apple)
