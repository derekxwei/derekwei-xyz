# Design constraints

Fixed constraints that any design for derekwei.xyz has to satisfy. These are drawn from the existing codebase and infrastructure, not from preference, so a concept that violates one of them is not a candidate.

## Delivery and security

- **Static output only.** Astro builds to static files served from the Cloudflare edge. There is no server at request time, so no design may assume a backend, a form endpoint, or server-side personalisation.
- **Strict Content Security Policy**, served from `public/_headers`:
  `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; upgrade-insecure-requests`
  This rules out CDN scripts, external stylesheets, remote fonts, remote images, third-party badge embeds, analytics pixels, and iframes. Any design element requiring one of those is out of scope, not a tradeoff.
- **No external font.** `font-src 'self'` plus the decision to avoid a webfont download means type must come from the system stack already defined in `src/styles/global.css`.
- **No new dependency.** Motion libraries, animation frameworks, and page-transition frameworks are excluded both by the CSP and by the decision to keep the build dependency-free.

## Theme

- Three states: Dark, Light, and System. Persisted in `localStorage` under `derekwei-theme`, storing only `system`, `dark`, or `light`.
- `public/theme-boot.js` is a small same-origin blocking script that resolves the preference and stamps `data-theme` on the root element before first paint. No design may introduce a theme flash.
- With the script blocked or JavaScript off, the site must render the approved dark defaults.
- Light is not an afterthought. Every text pair must meet WCAG AA in both themes.

## Information architecture, settled

The condensed navigation experiment was built, reviewed, and rejected, then rolled back. That decision stands:

- Nine explicit navigation items: Resume, Achievements, Projects, CTF, Lab, Tools, Architecture, About, Contact.
- No Home item. The terminal brand `~/derekwei.xyz` is the homepage link.
- No grouping of routes under abstract categories.
- No route renaming.

A design may change how navigation looks. It may not change what it contains.

## Content integrity

- Facts live in `src/consts.ts` and the content collections. Design work reads them and never rewrites them.
- Team results are stated as team results. `Team idktheflag placed 8th of 753 teams at BroncoCTF 2026` is not an individual placement.
- The site states five CompTIA certifications. Stackable certifications are listed separately and explicitly described as awarded for combinations of the underlying certifications, not as additional exams.
- Credential links point at Credly public badge URLs and are never edited or invented.
- The AO-SINT flag stays behind its spoiler.
- The only public telephone number is the Google Voice number. No other number appears anywhere.
- Where no evidence exists, no link is invented. There is no public GitHub profile link because none exists.

## Accessibility floor

- WCAG AA contrast for all text in both themes.
- Visible keyboard focus on every interactive control.
- Standalone pointer targets at least 24 by 24 CSS pixels. Links inside a sentence are exempt under WCAG 2.5.8.
- No horizontal overflow from 320px upward.
- `prefers-reduced-motion` and `prefers-reduced-transparency` both honoured.
- Press feedback must be perceptible on touch, where no hover state exists, and must never be the only signal a control gives.
- Images carry alt text and intrinsic dimensions so lazy loading does not shift layout.

## Known inherited defect

`--color-faint` (`#6b7f9c`) measures 4.35:1 against `--color-panel` (`#101827`), below the 4.5:1 floor for normal-size text. It passes on the page background (4.69:1) and on `--color-panel-2` (4.55:1). This predates the design work. A concept may either restrict where the token is used or correct the token, but it must not silently ship small faint text on a panel.

## Motion policy

Restrained by intent, not only by dependency limits. Excluded: scroll reveals, parallax, spring animation, cards flying into view, animated counters, magnetic buttons, navigation that shrinks on scroll, background particles, animated gradients, page-transition frameworks, and glassmorphism used as decoration rather than as a functional surface.

Permitted: immediate pointer-down feedback, and smooth anchor scrolling that becomes instant under reduced motion.

## Audience

The site is read by recruiters, hiring managers, and technical reviewers, often quickly and often on a phone. Two consequences: the strongest evidence has to be findable in seconds, and nothing may make a modest, accurate claim look inflated.
