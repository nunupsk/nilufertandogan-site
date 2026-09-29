# Nilüfer Tandoğan website — handover to Claude Code

You're picking up a project that's been developed across several Cowork/claude.ai sessions and is now moving to Claude Code so it can be handled with proper version control and a real deploy pipeline instead of manual zip uploads. Read this whole file before touching anything — it captures decisions that aren't obvious from the code alone.

## Where the files are

This file should sit at the root of the project folder, next to the site files (`index.html`, `style.css`, etc.). If you're starting from scratch and the folder only has this `CLAUDE.md`, ask the user to unzip `site.zip` (shared with them in the Cowork conversation this came from) into this same folder before you start.

## What this is

Personal website for **Nilüfer Tandoğan** (a psychology graduate) at **nilufertandogan.com**, hosted on **Cloudflare Pages** (project name: `nunussite`). Plain static HTML/CSS/JS — no framework, no build step, no npm, no bundler. Everything lives flat in one directory.

## Files

- `index.html` — Home
- `about.html` — About Me
- `psychology.html` — Psychology topics list
- `blog.html` — Blog (3 placeholder "coming soon" posts, no real content yet)
- `contact.html` — Contact form + booking + email
- `interactive.html` — Stroop game + reflection quiz
- `style.css` — all shared styles
- `script.js` — language toggle, burger nav, footer year, contact form mailto fallback
- `interactive.js` — Stroop game logic + reflection quiz + SVG radar chart
- `sitemap.xml`, `robots.txt` — added in the most recent SEO pass
- `og-image.png` — 1200×630 branded social/search preview image, also added in the SEO pass
- `seo-notes.md` — write-up of that SEO pass, worth reading if you touch metadata or URLs

## Design system

Minimalist, Suitsupply-inspired, warmed up with earthy tones:

- Background `#f8f2e9` (warm cream), ink `#2b2420` (warm espresso-brown, not pure black), ink-soft `#6b5c4e`, line `#e7dbc8`, paper `#fffaf3`, accent `#bd6b3e` (terracotta), accent-soft `#f0ddc9`
- `--radius: 10px`, `--radius-lg: 20px`, soft card shadows
- Full-screen black/brown burger nav overlay with big bold links
- Google Fonts **Inter**, weights 300–900
- **No photo anywhere on the site** — this was an explicit, deliberate choice for a text-only look. Don't add one unless the user asks.

## Bilingual system

Turkish is the default language; English is a toggle, not separate URLs. Every translatable element carries `data-tr="..." data-en="..."` attributes. `script.js` defines a global `setLang(lang)` that swaps `.textContent` on every `[data-tr]` element and persists the choice in `localStorage` under the key `nt-lang`. Any page with its own dynamic JS-rendered content (like `interactive.js`) has to wrap `window.setLang` to re-render that content too — see the pattern at the bottom of `interactive.js` for how that's done. If you add new pages or new dynamic content, follow the same pattern.

Because the language toggle is client-side only (no `/en/` URLs), search engines will mostly see the Turkish version — that's expected and fine, don't try to "fix" it with hreflang tags unless the user specifically wants separate language URLs (a bigger restructure).

## Content decisions to preserve — don't relitigate these

1. **No university name anywhere.** It was explicitly removed at the user's request (previously said Üsküdar Üniversitesi). The site now just says "Psikoloji Mezunu" / "Psychology Graduate" with no institution named. Don't reintroduce it unless the user asks.
2. **No fabricated professional review claims.** The user originally wanted the interactive section (Stroop game + reflection quiz) described as "checked and approved by a consortium of medical, psychological and legal experts." That review never happened, so a previous session declined to state it and instead built two honestly-labeled, clearly non-diagnostic tools, each carrying bilingual disclaimers that they're for entertainment/self-awareness only. Keep that framing in any future copy changes — don't claim clinical validity or expert review that hasn't actually occurred.

## Booking integration

Cal.com (plain cal.com, **not** cal.eu — that was corrected once already, so double-check any link you touch), username `nilufer`, event type `15min`. Seven booking buttons across the site (nav CTA on all 6 pages, hero button on `index.html`, secondary CTA on `contact.html`) use a "popup via element click" embed:

```html
data-cal-link="nilufer/15min" data-cal-namespace="15min" data-cal-config='{"layout":"month_view"}'
```

plus a fallback `href="https://cal.com/nilufer/15min"`. The embed init `<script>` is duplicated at the bottom of every page's `<body>`, right after `script.js`. If you ever centralize this into a shared snippet, make sure it still runs on every page.

## Open items (not yet resolved — ask before assuming a direction)

- **Contact form has no real backend.** `contact.html`'s form currently just opens a `mailto:` link pre-filled with the message (handled in `script.js`). Options discussed but not built: Web3Forms, Formspree, or a Cloudflare Pages Function. If the user wants this fixed, ask which they'd prefer before picking one.
- **`merhaba@nilufertandogan.com` — unverified whether it actually receives mail.** Cloudflare Email Routing was recommended but never confirmed set up.
- **Cal.com popup was never verified live post-deploy** from a sandboxed session (outbound calls to `app.cal.com` were blocked there). Worth a real click-through test once you can browse.
- **Blog posts and Psychology page topics are placeholder copy** — 3 "coming soon" posts, generic topic blurbs. Needs real content, ideally from Nilüfer herself.
- **About page bio is generic placeholder text** — needs to be personalized by/with Nilüfer.
- **`www.nilufertandogan.com`** — mentioned as optionally wanted, never confirmed added as a second custom domain on the Pages project.

## SEO pass (most recent session, 2026-09-13)

The user's stated goal: when someone searches **"Nilüfer Tandoğan"** or **"Hatice Nilüfer Tandoğan"** (her fuller name) on any search engine, phone or PC, this site should be the top result. A check that day found only weak, unrelated competition for the short name and none for the full name, so this is realistic with clean signals rather than anything aggressive.

What's already in place — don't strip it out casually:

- Canonical `<link>` tags on every page pointing at the **extensionless** URL (`/about`, not `/about.html`) — confirmed Cloudflare Pages 308-redirects `.html` URLs to the clean form by default, so internal nav links were also updated to the clean form to skip that redirect hop. If you ever move off Cloudflare Pages, re-verify this assumption.
- Full Open Graph + Twitter Card tags on every page, referencing `og-image.png`.
- A JSON-LD `Person` schema on every page: `name: "Nilüfer Tandoğan"`, `alternateName: "Hatice Nilüfer Tandoğan"`. This is the main technical lever tying both name forms to the same entity — keep it in sync if the name ever changes.
- A real, visible "Tam Ad — Hatice Nilüfer Tandoğan" line on the About page (in the meta row near the bottom) — deliberate, matches what the user asked for directly.
- `sitemap.xml` (all 6 clean URLs) and `robots.txt` (allow-all + sitemap reference).

Still outstanding, needs the user's own account access (can't be done by an agent without credentials):

1. Submit `nilufertandogan.com` to Google Search Console (domain property via DNS TXT is easiest since the domain's on Cloudflare) and submit the sitemap.
2. Same for Bing Webmaster Tools.
3. If/when Nilüfer has a public Instagram or LinkedIn, link it from the site and add it to the JSON-LD `sameAs` array.

If you add new pages, give them the same canonical/OG/Twitter/JSON-LD block and add them to `sitemap.xml`.

## Deployment — this is the main thing to fix

Up to now, every deploy has been **fully manual**: build/edit files → zip into `site.zip` → user uploads it by hand in the Cloudflare dashboard (project `nunussite` → Deployments → Create deployment → file upload → select `site.zip` → Save and deploy, Production). The custom domain `nilufertandogan.com` is already attached via CNAME and confirmed working.

**The whole point of moving this to Claude Code is to stop doing that by hand.** Early in your first session, work out with the user which of these they want, and set it up:

- **Option A — git-connected Cloudflare Pages.** Turn this folder into a git repo (GitHub/GitLab), push it, then connect that repo to the `nunussite` Pages project so every push to the main branch auto-deploys. This is the standard Cloudflare Pages workflow and means you (Claude Code) just commit and push — no dashboard interaction needed for routine changes. Needs the user to create/authorize the repo connection once in the Cloudflare dashboard.
- **Option B — Wrangler CLI deploys.** Keep it repo-optional and deploy directly with `wrangler pages deploy .` using a Cloudflare API token. Faster to set up if the user doesn't want GitHub involved, but every deploy is still a manual command (even if a single one instead of a dashboard click-through).

Either way, **set up git version history for this project regardless** — even with Option B, having commits means you can track what changed between deploys instead of only ever having the latest zip. There's no repo yet, so this is a clean `git init`.

Don't deploy anything to production without the user's go-ahead the first time you wire up whichever option they pick — confirm it actually deployed correctly (check the live domain) before treating either pipeline as trustworthy for future unattended changes.

## Working style for this project

- Keep it flat, plain HTML/CSS/JS. Don't introduce a framework or build step unless the user explicitly asks for one — that would be a significant change to how this whole project works.
- Preserve the bilingual `data-tr`/`data-en` pattern for any new copy.
- Ask before making content decisions (bio text, blog posts, credentials, claims) — this is a real person's professional site and the content has to be accurate and something she'd actually sign off on, not filler.
