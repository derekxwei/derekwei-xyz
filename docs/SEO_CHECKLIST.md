# SEO checklist

derekwei.xyz is a small personal site - the SEO goal is modest and specific: when a recruiter searches "Derek Wei cybersecurity," this site should be the top result, and each writeup/project should be individually indexable. Most of this is already built in; this checklist is for verifying it and keeping it true as content grows.

## Already handled by the build

- **Per-page `<title>` and `<meta name="description">`** - every page passes `title` and a unique `description` to `BaseLayout`. Descriptions should be roughly 140–160 characters and genuinely describe the page.
- **Canonical URLs** - `BaseLayout` emits `<link rel="canonical">` from `Astro.site` (`https://derekwei.xyz` in `astro.config.mjs`), so there's one canonical host.
- **Open Graph + Twitter Card tags** - title, description, type, and URL, for link previews in chat and social.
- **Sitemap** - `@astrojs/sitemap` generates `sitemap-index.xml` at build; new pages and published (non-draft) content are included automatically.
- **robots.txt** - allows all crawlers and points at the sitemap.
- **JSON-LD `Person` schema** on the home page - name, URL, email, role, education/affiliation, for rich understanding by search engines.
- **Semantic HTML + fast static delivery** - clean heading structure and near-instant loads both help ranking.

## Per-page checklist (when adding a page or content entry)

- [ ] **Unique title.** Not a duplicate of another page. `BaseLayout` appends `· Derek Wei` automatically - don't repeat the name in the `title` prop.
- [ ] **Unique, descriptive `description`, ~140–160 chars.** Write it for a human reading a search result. Avoid keyword stuffing.
- [ ] **One `<h1>` per page** - supplied by `PageHeader`/frontmatter title. Body headings start at `<h2>`.
- [ ] **Descriptive slug** - lowercase, hyphenated, meaningful (`byuctf-2026-jwt-forgery`, not `post-3`).
- [ ] **Internal links** - link new content from relevant existing pages (e.g. a project links to a related writeup). Crawlers and readers both follow them.
- [ ] **Not left as `draft: true`** if it's meant to be public - drafts are excluded from the production build and sitemap.

## Post-deploy / periodic

- [ ] Submit `https://derekwei.xyz/sitemap-index.xml` to [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters). Do this once after the domain goes live.
- [ ] Verify domain ownership in Search Console (DNS TXT record via Cloudflare is easiest).
- [ ] After publishing significant content, check **Search Console → Pages** for indexing status and **URL Inspection** for a specific new page.
- [ ] Confirm `https://derekwei.xyz/robots.txt` and the sitemap both return 200 in production.
- [ ] Search `site:derekwei.xyz` on Google periodically to see what's indexed.
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on the home page - a static Astro site should score near 100; investigate any regression.
- [ ] Confirm Open Graph previews render correctly by pasting a URL into a chat app or the [OpenGraph debugger](https://www.opengraph.xyz/).

## Deliberately not done

- **No analytics / tracking pixels.** This is a privacy choice (see [SECURITY_CHECKLIST.md](SECURITY_CHECKLIST.md)) and it's the right call for this site - Search Console gives you indexing data without embedding a third-party script and weakening the CSP. If you ever add analytics, use a privacy-respecting, self-hosted or cookieless option and extend the CSP with the narrowest possible `connect-src`/`script-src` addition.
- **No keyword gaming.** The content is the SEO. Real writeups and projects, honestly described, are what make the site rank for the terms that matter.
