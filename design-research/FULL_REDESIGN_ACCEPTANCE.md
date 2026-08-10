# Full redesign acceptance

Branch `design/full-portfolio-redesign`, cut from `main` at `5f43d4a`. Nothing merged. Production is still on `main`.

**Preview:** https://design-full-portfolio-redesi.derekwei-xyz.pages.dev

Cloudflare truncates branch aliases at 28 characters, so the slug is clipped one letter short of the branch name. The preview carries `x-robots-tag: noindex` and is not the custom domain. No Cloudflare setting was changed.

## The direction, in one line

Security work is recorded in registries and scoreboards: issuer, date, expiry, verification link; placement, field size, year, evidence. So every factual claim is now an aligned record row with somewhere to verify it, instead of a card. That is the change.

## Already verified automatically

`astro check` clean. 31 pages built. No horizontal overflow across 13 routes at 320, 390, 430, 768, 1366 and 1920. WCAG AA in both themes on every route. No undersized targets, no console errors, no external resources, no broken images or links. All 23 checked facts and every credential, phone, resume and vCard link intact. No em dashes. Homepage, AO-SINT writeup, all project detail pages, lab-notes, 404 and every tool page are textually identical to `main`.

---

## Per page

For each: is hierarchy clear, is space used intentionally, does the composition fit the content, does it still feel like Derek's site, does anything still look generated, is the evidence easy to find, dark, light, mobile, anything missing.

- [ ] **Homepage** (unchanged this pass, kept from Concept D)
- [ ] **Resume** (rebuilt: masthead, ledgers, timeline, skill inventory)
- [ ] **Achievements** (rebuilt: credential register, scoreboard, recognition ledger)
- [ ] **Projects** (rebuilt: lead project plus record index)
- [ ] **Project detail** (unchanged this pass)
- [ ] **CTF** (rebuilt: publication index)
- [ ] **AO-SINT** (unchanged this pass)
- [ ] **Lab** (named sections added)
- [ ] **Tools** (deliberately untouched: a utility keeps its utility layout)
- [ ] **Architecture** (named sections added)
- [ ] **About** (named sections added, introduction intact)
- [ ] **Contact** (rebuilt: one primary action, then alternatives, then supporting)
- [ ] **Card** (untouched, still minimal, still no nav)

## Polish pass, added after the first review

- [ ] **CompTIA dates corrected.** CySA+ active May 14 2026, expires May 14 2029. PenTest+ active April 29 2026, expires April 29 2032. Security+ active May 7 2026, expires April 29 2032. Network+ active April 23 2024, expires April 29 2032. ITF+ active April 26 2023.
- [ ] **ITF+ displays "Never expires"**, not a blank or N/A.
- [ ] **AWS dates preserved**: issued August 7 2026, expires August 7 2029.
- [ ] **Credly links preserved**: all eleven badge URLs byte-identical, 28 references across the build.
- [ ] **Shipped colour approved** (accent blue, dot plus label).
- [ ] **In-progress colour approved** (amber, dot plus label).
- [ ] **Project ledger still readable** with the status colours added.
- [ ] **Phone appears once** on Contact.
- [ ] **Call action works** (`tel:+12107160226`).
- [ ] **Text action works** (`sms:+12107160226`).
- [ ] **Contact two-column desktop composition approved** (3:2, email column wider).
- [ ] **Contact mobile stack approved** (primary action first).

## Approve or reject, item by item

- [ ] **Header and Theme placement.** Brand, nine destinations, Theme far right behind a divider. Active page underlined, not colour alone.
- [ ] **Internal editorial rules.** Named categories (Credentials, Competitions, Recognition, Writing, Experience) rather than numbers, because those sections are a set and not a sequence. The homepage keeps 01 to 05.
- [ ] **Resume timeline.** Role and date on one line, organisation below, evidence bullets under both.
- [ ] **Credential ledger.** Credential, issuer, issued, expires, with the credential name as the only verification link.
- [ ] **Competition ledger.** Placement leads its own column, the recorded result string follows verbatim.
- [ ] **Recognition ledger.** Scholarships and the NJHS award in one register.
- [ ] **Project hierarchy.** One lead project, the rest as record rows with status and date.
- [ ] **CTF publication layout.** Event, category, difficulty, date, summary, team result, tags, read action.
- [ ] **Wide evidence figures.** Kept from Concept D, unchanged.
- [ ] **Minimal motion.** Pointer-down feedback only. No scroll reveals, parallax, springs, counters, sticky rails, or shrinking header.
- [ ] **Card preservation.** Still minimal, still no site navigation, still noindex.

## Known and deliberate

- **Two podium bullets were dropped from Achievements.** They restated the National Cyber League and THEM?!CTF placements that the competition ledger now shows in full. Both placements are still on the page.
- **The separate "Verify badge" link is gone.** The credential name is the link, per the no-duplicate-button requirement.
- **The Resume lede changed** to a hiring-oriented sentence, and the print note moved under the contact strip. Both were requested; no claim changed.
- **Tool pages keep their existing look.** Forcing ledger or publication styling onto an interactive utility would make it worse.
- **Microsoft Office Specialist has no year on the Resume ledger and no expiry on Achievements.** Only an issue date is verified for it, and none was invented. Achievements states "No expiration recorded" rather than claiming it never expires.
- **Contact swapped Projects for Website** in the supporting list, per the requested left/right split. Projects is still in the main navigation.

## Still needs your eyes

I inspected the header, Resume, Achievements, CTF index and Contact on desktop, plus Resume and Achievements on mobile. Verified programmatically but **not** visually inspected in this pass: Projects, Lab, Tools, Architecture, About, Card, and the unchanged Homepage, project detail and AO-SINT pages. Please look at those on the preview before approving.

## To approve

> Merge design/full-portfolio-redesign into main

Anything else, including a defect list, will be treated as changes to make first.
