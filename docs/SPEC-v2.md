# Portfolio v2 spec: SEO + Blog

Repo: `aadityatamrakar/aadityatamrakar.github.io`, static site on GitHub Pages, no build step.
Existing: `index.html`, `assets/style.css`, `assets/app.js`, `assets/data.js`, `404.html`, `.nojekyll`.
Design tokens: see `assets/style.css` `:root` (IBM Plex Mono for code, Rubik for prose, ink `#303055`, lavender `#e8e8f2`). Light theme only. No shadows except code blocks. Radius 4px / 8px.

Site URL: `https://aadityatamrakar.github.io` (canonical base). Author: Aaditya Tamrakar, handle `aadityatamrakar`, email `aaditya.span@gmail.com`, X `@t_aaditya`.

## 1. Profile updates (owner: main session)

- Journey: Viasat role is **2023 — Dec 2025** (left in Dec 2025). Add a current entry: **2026 — Present · Independent · building trading tools and open source SDKs, open to roles.**
- Hero status string in `index.html` code block: `"open to work"`.

## 2. SEO (owner: agent `seo`)

Files: `index.html`, `404.html`, new `robots.txt`, `sitemap.xml`, `feed.xml`, `assets/og.png` (1200×630, generated with a script, design tokens, text only: name, tagline, site URL), `site.webmanifest`.

Requirements for every HTML page (home, blog index, each article):
- `<title>` ≤ 60 chars, unique; `<meta name="description">` 120–160 chars, unique.
- `<link rel="canonical">` absolute URL.
- Open Graph: `og:type`, `og:title`, `og:description`, `og:url`, `og:image` (absolute `https://aadityatamrakar.github.io/assets/og.png`), `og:site_name`.
- Twitter: `twitter:card=summary_large_image`, `twitter:site=@t_aaditya`, `twitter:creator`, title, description, image.
- `<meta name="author">`, `<meta name="robots" content="index,follow">`, `theme-color #303055`.
- JSON-LD: home = `Person` (name, url, sameAs [github, linkedin, x, aadityatamrakar.in], jobTitle, knowsAbout) + `WebSite`; article = `BlogPosting` (headline, datePublished, dateModified, author Person, image, mainEntityOfPage, keywords); blog index = `Blog` with `blogPost` list.
- Home: add a `<noscript>` block inside `#projects` listing every project from `assets/data.js` as plain `<ul>` links (name + summary + GitHub link) so crawlers without JS see content. Generate it from data.js with a one-off script; keep in sync manually.
- Semantic landmarks: one `<h1>` per page, `<main>`, `<nav aria-label>`, `<article>` on cards is fine.
- `robots.txt`: allow all, `Sitemap:` line.
- `sitemap.xml`: home, `/blog/`, every article URL from section 4, with `lastmod`.
- `feed.xml`: RSS 2.0 with every article (title, link, guid, pubDate, description). Add `<link rel="alternate" type="application/rss+xml">` on all pages.
- Performance: `font-display=swap` already; add `<link rel="preload">` for the stylesheet? No. Add `loading="lazy"` on any images. Keep page under 200 KB.
- Verify with a script: every page has title/description/canonical/og/twitter/JSON-LD; sitemap URLs equal actual files; run `python3 -c` XML parse on sitemap and feed.

## 3. Blog infrastructure (owner: agent `blog-infra`)

- URL scheme: `/blog/` index, `/blog/<slug>/` articles (`blog/<slug>/index.html`).
- `assets/blog.css`: article typography on top of `style.css`: `.post` max-width 720px, `h2` 20px, `h3` 18px, body 15px/1.8, code blocks reuse `.code-block`, inline `code` lavender bg 4px radius, tables hairline borders, blockquote with left 2px ink border, `.post-meta` mono 12px fog, `.toc` optional, `.post-nav` prev/next, tags as `.tag`.
- `blog/index.html`: same header/footer as home (copy markup, nav link "Blog" active), list of all articles from section 4, newest first, grouped by series tag chips (client-side filter in `assets/blog.js`, must also render fully without JS, so the list is static HTML and JS only hides/shows).
- `assets/blog.js`: tag filter on index, reading-time estimate injected into `.post-meta`, copy button on code blocks, active nav.
- Article template `docs/ARTICLE-TEMPLATE.html`: full HTML skeleton with all SEO head tags from section 2 as placeholders, header (nav with Blog active), `<main><article class="post">` with `<p class="eyebrow">series</p><h1>`, `.post-meta` (date · reading time · tags), body, `.post-nav`, footer. Relative asset paths must be absolute from root (`/assets/style.css`) because articles live two levels deep.
- Home page: add nav link "Blog" (header + footer) and a section `07 · Writing` after Projects listing the 4 newest articles (static HTML, title + one line + date), with "All posts >" link.
- Project modal: `assets/app.js` reads optional `post` field on a project (`post: "/blog/<slug>/"`) and renders a "Read the write-up >" link. Add `post` fields to `assets/data.js` per the mapping in section 4.

## 4. Articles (owners: agents `writer-a`, `writer-b`, `writer-c`)

Rules: write in first person as Aaditya. Plain, direct, technical. 900–1500 words each. Every claim must be consistent with the repo README facts given below; where details are unknown, write generally about the technique rather than inventing numbers. Each article has: intro (problem), what I built, how it works (with 2–4 code blocks using the `.code-block` markup and syntax spans `c-plum` strings, `c-cobalt` keys, `c-teal` types/keywords, `c-rust` numbers, `c-mist` comments), learnings (bulleted), links to the repo. Include a "Try it" or "How to" section where marked how-to. Use the template in `docs/ARTICLE-TEMPLATE.html` exactly; fill title, description, canonical, dates, keywords, JSON-LD. Dates below are publication dates to use.

| # | slug | title | series | date | repo | owner |
|---|------|-------|--------|------|------|-------|
| 1 | `nse-option-chain-analysis` | Building an NSE option chain analyser in Node.js | Trading | 2026-10-12 | option_chain_analysis | writer-a |
| 2 | `reading-open-interest-buildups` | How to read open interest: long buildup, short covering and friends | Trading · How-to | 2026-10-11 | option_chain_analysis | writer-a |
| 3 | `cash-futures-spread-chart` | Charting the cash vs futures spread for NSE stocks | Trading | 2026-10-10 | futures_spread_chart | writer-a |
| 4 | `broker-sdks-open-source` | What I built and maintain for the open source trading community | Open Source | 2026-10-09 | gokiteconnect, xts-interactive-nodeJS-api-v2, 5paisa-js, hbot-remote-client-py, option-pricing | writer-a |
| 5 | `captcha-solver-scikit-learn` | Solving captchas with scikit-learn: a 99.7% pipeline | ML | 2026-10-08 | captcha_ai | writer-b |
| 6 | `fantasy-cricket-team-optimiser` | A fantasy cricket team optimiser is a constraint solver | ML · Data | 2026-10-07 | dream11-cricket-team-builder | writer-b |
| 7 | `offline-first-notes-pwa` | How to build an offline-first notes app with a service worker | Web · How-to | 2026-10-06 | pwa_notes | writer-b |
| 8 | `realtime-distress-alarm-socketio` | How to broadcast live video to a room with Socket.io | Web · How-to | 2026-10-05 | DistressAlarmSystem | writer-b |
| 9 | `shipping-food-delivery-solo` | Shipping a food delivery product solo: Laravel, Ionic and lessons | Web · Lessons | 2026-10-04 | food_delivery_app, food_delivery_app_backend_admin, food_delivery_app_frontend | writer-c |
| 10 | `dealership-reporting-laravel-cron` | Reporting engines for small businesses: cron, email and AdminLTE | Web · Lessons | 2026-10-03 | city_cars, multilevel-marketing-app, creative_accounting | writer-c |
| 11 | `options-ui-for-beginners-cs615` | Designing an options trading UI for beginners (CS615 project) | Academic · Design | 2026-10-02 | umbtrading | writer-c |
| 12 | `ten-years-of-public-code` | Ten years of public code: what changed from 2016 to 2026 | Career | 2026-10-01 | all | writer-c |

Repo facts to stay consistent with:
- option_chain_analysis: fetches NSE Nifty option chain on each visit; expiry selector; classification table price change × OI change → long buildup (bullish), short buildup (bearish), short covering (bullish), long liquidation (bearish); suggested actions bullish = buy calls/sell puts, bearish = sell calls/buy puts; cURL used for scraping because Node request/https were blocked; FINNIFTY switch via app.js; Handlebars + Bootstrap + Node; hosted on Heroku in 2019; education only; 106 stars 77 forks.
- futures_spread_chart: Node + Express, `spreadData.js`, `/chart.html`, daily cash vs futures spread.
- captcha_ai: pipeline trim → split letters → rotate → remove padding/resize → pixels → scikit-learn model (`model.pkl`); PHP API + HTML/jQuery front; matplotlib; reported 99.7% accuracy on one captcha style (test set unspecified).
- dream11: top 18 players by pick frequency; rules like 3-3-3-2 / 4-4-2-1; enumerate and validate all lineups; choose randomly or by points; JSON inputs (`contest.json`, `player_points.json`, `playing11.json`, `teams.json`).
- pwa_notes: localStorage + service worker + manifest; installable on Android; offline.
- DistressAlarmSystem: Socket.io rooms + browser video broadcasting.
- food delivery: Laravel/MySQL backend + admin with reporting and SMS API; Bootstrap 3 web frontend with AJAX search and payment gateway; Ionic/AngularJS app.
- city_cars: Laravel reporting for a Maruti Suzuki dealership, AdminLTE 2, cron scheduler, email sender. multilevel-marketing-app: Laravel, tree algorithms, REST. creative_accounting: JS accounting app.
- umbtrading: CS615 UI design, UMass Boston, Dec 2021; goals: easier options trading, simplify learning, learn through the interface; GitHub Pages prototype.
- Forks/SDKs: gokiteconnect (Go, Zerodha Kite Connect), xts-interactive-nodeJS-api-v2 (Node, XTS), 5paisa-js (Node), hbot-remote-client-py (Python, Hummingbot), option-pricing (CCP formulas), zenbot (crypto bot). Write as "forked, adapted, and used in my own tooling; contributed fixes where I hit bugs" without inventing specific merged PRs.
- Career: freelance 2016–2019, quant dev at a prop trading desk 2019–2021, Viasat intern 2022, CS240 teaching fellow Fall 2022–Spring 2023, UMass Boston MS 2021–2023 (CS615 UI design, CS240 C programs Fall 2022), Viasat 2023–Dec 2025, independent 2026.

## 5. Verification (owner: main session)

- Playwright screenshots desktop + mobile for `/`, `/blog/`, one article; no horizontal scroll, no JS errors.
- SEO checker script passes on all 14 pages.
- Commit, push, PR, merge.
