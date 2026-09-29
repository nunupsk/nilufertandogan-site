# SEO pass — 2026-09-13

**Goal (from Florian):** when someone searches "Nilüfer Tandoğan" or "Hatice Nilüfer Tandoğan" on any search engine, on phone or PC, her site should be the top result. A quick check that day found only weak, unrelated competition for the short name (a primary-school teacher's staff page) and no competition at all for the full name — so this is achievable with clean indexing signals, not paid tactics.

## What changed (all 6 pages: index, about, psychology, blog, contact, interactive)

- **Canonical URLs** added, pointed at the *extensionless* path (e.g. `/about` not `/about.html`) — confirmed Cloudflare Pages serves the clean URL as canonical and 308-redirects the `.html` version to it by default.
- **Internal links** (nav, wordmark) switched from `about.html` etc. to `about` etc., so browsers/crawlers hit the final URL directly instead of following a redirect hop.
- **Open Graph + Twitter Card tags** added to every page (previously only `index.html` had partial OG tags): title, description, url, site_name, image, image dimensions, locale (`tr_TR` + `en_US` alternate), `twitter:card=summary_large_image`.
- **`og-image.png`** (1200×630, brand colors/typeface) generated and added at the site root; referenced by every page's OG/Twitter tags.
- **JSON-LD `Person` schema** added to every page: `name: "Nilüfer Tandoğan"`, `alternateName: "Hatice Nilüfer Tandoğan"` — this is the main technical lever for the full-name query, since it tells search engines both names refer to the same entity/page.
- **On-page full-name mention**: added a "Tam Ad — Hatice Nilüfer Tandoğan" line to the About page's meta row (real, crawlable text — stronger signal than metadata alone, and matches what she told me directly: she wants both name forms to lead to this site).
- **`meta name="robots" content="index, follow"`** and **`meta name="author"`** added to every page.
- **`sitemap.xml`** created (all 6 clean URLs) and **`robots.txt`** created (`Allow: /` + sitemap reference) — neither existed before.

## Manual follow-ups Florian/Nilüfer still need to do (I can't do these without account access)

1. **Deploy this build** the usual way: upload the new `site.zip` in the Cloudflare Pages dashboard (project `nunussite` → Deployments → Create deployment → file → select zip → Save and deploy).
2. **Google Search Console**: add `nilufertandogan.com` as a property (domain property via DNS TXT record is easiest since the domain is already on Cloudflare), submit `https://nilufertandogan.com/sitemap.xml`, and use "Request indexing" on the homepage and About page to speed up discovery.
3. **Bing Webmaster Tools**: same idea — verify the domain and submit the sitemap (feeds Bing/Yahoo and, via API, some AI answer engines).
4. Once she has any public profile (Instagram, LinkedIn, a directory listing, etc.), add it as a link from the site and it can be added to the JSON-LD `sameAs` array — external profiles that link back reinforce which entity owns the name.
5. Confirm `merhaba@nilufertandogan.com` actually receives mail (Cloudflare Email Routing) — unrelated to search ranking but still an open item from the original build.

## Notes for whoever picks this up next

- Site is still 100% static HTML/CSS/JS, no build step — these are hand-edited files, not generated.
- Don't reintroduce the university name (per earlier decision) or claim any professional/clinical review of the interactive tools that hasn't happened (per earlier decision) — both constraints are unrelated to SEO but still apply to any future copy edits.
- If new pages are added later, remember to give them the same canonical/OG/Twitter/JSON-LD block and add them to `sitemap.xml`.
