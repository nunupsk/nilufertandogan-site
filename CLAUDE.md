# Nilüfer Tandoğan website — handover to Claude Code

Personal website for **Nilüfer Tandoğan** (Hatice Nilüfer Tandoğan), a psychologist, at **nilufertandogan.com**, hosted on **Cloudflare Pages** (project name: `nunussite`, on her own Cloudflare account).

## Deploy pipeline (git-connected, as of 2026-09-29)

This repo (`nunupsk/nilufertandogan-site` on GitHub, owner account `nunupsk` — Nilüfer's own GitHub account, with `exponomic` as a collaborator) is connected to the `nunussite` Cloudflare Pages project. **Every push to `main` auto-deploys to production** — no manual zip upload, no dashboard interaction needed.

**Important:** don't use Cloudflare's dashboard "rollback to a previous deployment" as a way to change what's live long-term. A dashboard rollback only repoints production at an old deployment — it does **not** update this git repo. The next push to `main` (even an unrelated one) redeploys whatever is in git and silently reverts the rollback. If you ever need to go back to an older version, pull that version's files into this repo and commit/push — don't rely on dashboard rollback alone. (This exact confusion happened once already, on 2026-09-29 — a manual rollback via the dashboard didn't match what was actually in git, which took a while to untangle.)

## Architecture (as of 2026-09-29 — rewritten from scratch, replaced the old flat multi-page site)

**Single self-contained `index.html`** — inline `<style>`, inline JS, embedded base64 images. No separate `style.css`/`script.js`/build step. It's a client-side SPA: nav buttons call a JS router that shows/hides `.page` sections and updates `location.hash` (`#anasayfa`, `#hakkimda`, `#calisma`, `#blog`, `#iletisim`). Cloudflare Pages' `_redirects` (`/*  /index.html  200`) serves this same file for **every** URL path — so `/anything` and `/nilufertandogan.com/` return byte-identical content, and only the JS decides what's shown.

Other repo files:
- `favicon.png`, `apple-touch-icon.png` — real PNG icons (replaced the old inline-SVG favicon)
- `og-image.jpg` (1200×630) — referenced by OG/Twitter meta tags
- `robots.txt`, `sitemap.xml` — plain static files (see SEO note below for why they matter more than usual here)
- `_redirects` — the SPA fallback rule described above

**SEO implication of the single-file SPA architecture:** because every path serves the same document and "pages" only exist as JS-toggled sections behind `#hash` fragments, there is only **one** genuinely distinct, crawlable URL: `https://nilufertandogan.com/`. `sitemap.xml` reflects this (lists only the root) — don't add hash-fragment URLs to it, search engines don't reliably index those as separate pages. If per-page SEO (distinct titles/descriptions per section, separately indexable About/Focus Areas/Blog/Contact) becomes a priority again, that needs real per-path routing (separate files or server-side rendering per route), which is a bigger change than a content edit — ask before doing that rework.

`index.html`'s `<head>` carries: canonical tag, full OG + Twitter tags (absolute image URL), and a JSON-LD `Person` schema (`name: "Nilüfer Tandoğan"`, `alternateName: "Hatice Nilüfer Tandoğan"`) — this is what ties both name forms to the site for search engines, same technique as the old site's SEO pass, just now only on the one real document.

## Content decisions — updated 2026-09-29 (supersedes older notes)

Two decisions from earlier sessions were explicitly **reversed by the user** on 2026-09-29 — don't revert to the old behavior:

1. **University name is now shown.** "Üsküdar Üniversitesi Psikoloji Bölümü" appears in the About section, plus internship/clinical-observation detail (Bakırköy Prof. Dr. Mazhar Osman Training and Research Hospital, NPİSTANBUL Brain Hospital). Previously this was deliberately omitted — that's no longer the case.
2. **A real photo of Nilüfer is now used** (site header + About section). Previously the site was explicitly text-only/no-photo — that's no longer the case.

Still true, not revisited:
- **No fabricated professional review claims.** Don't describe any tool or content on the site as clinically validated/expert-reviewed unless that review has actually happened.
- Ask before making further content decisions (bio text, credentials, claims) — this is a real person's professional site.

## What's *not* in this version (dropped in the 2026-09-29 rewrite, confirmed intentional)

- **No Cal.com booking widget.** The old site had a "15min" Cal.com popup embed on every page. This version has none — contact is a form that builds a `mailto:` link (client-side only, same no-backend limitation as before). Confirmed with the user this is fine as-is; don't add Cal.com back without asking again.
- **Contact email is `psk.nilufertandogan@gmail.com`** (not `merhaba@nilufertandogan.com`, which older notes referenced). Confirmed intentional.
- **No interactive Stroop game / reflection quiz.** The old `interactive.html` (Stroop game + radar-chart quiz) doesn't exist in this version at all — there's no `#interactive` route in the JS router's `VALID_PAGES` list. If this is supposed to come back, that's new feature work, not a bug fix.

## Bilingual system

Still Turkish-default with an English toggle, client-side only (no separate `/en/` URLs — same tradeoff as before, don't try to "fix" with hreflang unless separate language URLs are explicitly wanted). Implementation changed: instead of the old `data-tr`/`data-en` dual-attribute pattern, this version uses an `I18N` dictionary object (`I18N.tr`, `I18N.en`) keyed by `data-i18n="some.key"` attributes on elements, swapped via `applyLang(lang)`. Follow this pattern for any new copy.

## Design system

Cormorant Garamond (serif, headings) + Jost (sans, body), Google Fonts. Palette: paper `#FBF7F1`, ink `#2B2118`, gold accent `#A97C3F` / `#7C5A26`, line `#E7DDCD`. This replaced the earlier Inter/terracotta design entirely.

## Open items (carried over / still relevant)

- **Google Search Console / Bing Webmaster Tools**: submit `nilufertandogan.com` (domain property via DNS TXT, since the domain's on Cloudflare) and the sitemap. Needs account access, can't be done by an agent.
- **`merhaba@nilufertandogan.com`** — still unverified whether it actually receives mail; may be moot now that the contact form points at the Gmail address instead, but worth clarifying with Nilüfer if that domain email should be set up or abandoned.
- **`www.nilufertandogan.com`** — optionally wanted as a second custom domain, never confirmed added.
- If Nilüfer gets a public Instagram/LinkedIn, link it from the site and add it to the JSON-LD `sameAs` array.
- Blog content — check whether the blog section has real posts yet or is still placeholder; wasn't audited in detail during the 2026-09-29 pass.

## Working style for this project

- Ask before making content decisions (bio text, credentials, claims, dropping/adding features like the booking widget) — this is a real person's professional site.
- The whole site is one `index.html` now — when editing, remember every "page" is a section in the same file, and copy changes need to go into both `I18N.tr` and `I18N.en`.
- Don't reintroduce a build step/framework unless explicitly asked.
