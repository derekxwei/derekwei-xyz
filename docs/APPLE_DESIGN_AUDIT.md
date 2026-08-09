# Apple Design audit

Read-only design audit of the live site at https://derekwei.xyz, using the
`apple-design` skill from `emilkowalski/skills` (installed outside this
repository; skill hash `0d19303902efa64eace10e6b183eb29ef3220d424c1a7fd1eafc52adde216932`).

Audited: 2026-08-08. No production file was modified for this audit. Every
measurement below comes from the rendered production site, not from reading
source alone.

**Scope.** Interaction, motion, typography, spatial system, depth, themes,
accessibility, and generic or AI-generated visual signals. Not audited: factual
content, resume wording, certifications, SEO, security posture, infrastructure,
or information architecture.

---

## 1. Executive verdict

This is a fast, disciplined, accessible site whose weakest dimension is not
taste but **hierarchy and acknowledgment**. Two measurable things drive most of
the "generic" reaction reviewers reported:

1. **Nothing acknowledges a press.** There are zero `:active` rules in the
   entire stylesheet. On touch, the interface gives no signal between tap and
   navigation.
2. **Everything is weighted the same.** Section headings render at 14px/400,
   which is *smaller and lighter than body text* at 16px/400. Combined with
   about 45 identically styled `## LABEL` headers, 34 to 41 bordered panels per
   page, and 54 to 70 monospace elements per page, the eye finds no landmarks
   and reads the page as one flat plane of equally important blocks.

Neither problem is the dark theme, the terminal brand, or the explicit
navigation. Those are working. The site does not need an Apple look; it needs
Apple's *discipline about emphasis and response*.

Performance and restraint are genuinely strong: 72ms TTFB, 102ms to
interactive, 9KB transferred, 12 resources, zero `@keyframes`, and a strict CSP
that measurably blocks a third-party beacon.

**No P0 issues were found.** Nothing is broken and no accessibility success
criterion is failing.

---

## 2. Current strengths

- **Response is excellent.** TTFB 72ms, `domInteractive` 102ms, full load
  595ms, 9KB transfer, 12 resources. Static delivery means no spinner state is
  ever needed. (Skill section 1.)
- **Motion restraint is correct, not lazy.** Zero `@keyframes`, one 150ms
  colour transition. The skill explicitly prefers no motion over decorative
  motion, and this site earns that.
- **Reduced motion is implemented and verified working.** Under
  `prefers-reduced-motion: reduce`, transitions collapse to 0.01ms and
  `scroll-behavior` falls back from `smooth` to `auto`.
- **Focus is real.** Tab lands on the skip link first, `:focus-visible` matches,
  and a visible outline renders. Five `:focus-visible` rules exist.
- **Both themes are legible.** Measured light-theme contrast: body 10.6:1,
  captions 5.07:1, code 10.03:1, inline code 15.45:1. Dark theme is unchanged
  from the approved design.
- **No horizontal overflow at any tested width** (320, 390, 430, 834, 1920).
- **The architecture page shows the site's best craft**: real `<figure>` and
  `<figcaption>`, and a table in a keyboard-focusable scroll container
  (`tabindex="0"`).
- **The card page is genuinely restrained**: 1 panel, 6 monospace elements, no
  site chrome. It is the most confident page on the site.
- **Maintenance model is clean**: colour tokens in one stylesheet, content facts
  in one `consts.ts`.

---

## 3. Five strongest weaknesses

1. **Zero press feedback.** No `:active` state anywhere (0 rules in 46KB of
   CSS). Violates the skill's foundational rule: respond on pointer-down, not
   on release.
2. **Inverted type hierarchy.** Section headings (14px, weight 400) are smaller
   and lighter than body copy (16px). Hierarchy is carried by colour and
   letter-spacing alone.
3. **Uniform repetition at scale.** About 45 identical `## LABEL` section
   headers site-wide, 34 to 41 panels per page, 28 badges on `/projects/`
   across 6 cards.
4. **Monospace overuse.** 54 to 70 monospace elements per page, applied to
   headings, metadata, dates, links, and footers, not just technical values.
5. **Flagship evidence is under-displayed.** The AO-SINT screenshots render at
   768px inside a 1024px container inside a 1920px viewport, with 448px of dead
   gutter on each side.

---

## 4. Page-by-page findings

Measured structural density (production HTML):

| Page | Panels | Badges | `##` headers | Mono elements |
| --- | --- | --- | --- | --- |
| `/` | 37 | 10 | 6 | 54 |
| `/resume/` | 35 | 0 | 10 | 66 |
| `/achievements/` | 34 | 0 | 8 | 70 |
| `/projects/` | 41 | 28 | 0 | 49 |
| `/projects/cpts-notes-pipeline/` | 17 | 5 | 0 | 22 |
| `/ctf/` | 26 | 5 | 4 | 34 |
| `/ctf/broncoctf-2026-ao-sint/` | 19 | 7 | 0 | 24 |
| `/lab/` | 19 | 0 | 3 | 24 |
| `/tools/` | 35 | 11 | 4 | 31 |
| `/architecture/` | 14 | 0 | 4 | 46 |
| `/about/` | 13 | 0 | 4 | 23 |
| `/contact/` | 15 | 0 | 2 | 26 |
| `/card/` | 1 | 1 | 0 | 6 |

- **`/`** Seven sections, each introduced by the identical header treatment, so
  "Selected proof" (the strongest content) has the same visual rank as
  "Focus". The hero is the only place with real scale contrast.
- **`/resume/`** Ten `##` headers and 66 monospace elements on a document meant
  for fast human scanning. The credential strip, core areas, certifications,
  and roadmap are four consecutive card grids with near-identical texture.
- **`/achievements/`** Highest monospace density on the site (70). Certification
  cards, stackable chips, and scholarship cards are three card systems stacked
  in sequence.
- **`/projects/`** 28 badges across 6 cards, roughly 4.7 per card. Status plus
  four or five tech tags per card compete with the project titles.
- **`/projects/cpts-notes-pipeline/`** The embedded diagram uses a plain
  `<img>` in a paragraph, not `<figure>`, unlike the architecture page.
- **`/ctf/`** Reads correctly as a publication index; the featured full-width
  first card is the best hierarchy decision on the site.
- **`/ctf/broncoctf-2026-ao-sint/`** The flagship page. Six evidence images, all
  constrained to the 768px prose measure, none wrapped in `<figure>`. Captions
  are visually subordinate (13px, 5.07:1) but only *visually* associated.
  Twelve `<h2>` elements in one document with no intermediate scale step.
- **`/lab/`, `/tools/`, `/about/`, `/contact/`** Consistent and clean. `/tools/`
  form controls are correctly themed in both modes (input background
  `#eef2f7`, text `#101a2e`, border `#d8e0ea` in light).
- **`/architecture/`** Best-crafted page: real figure semantics, focusable
  table wrapper, honest caveat copy.
- **`/card/`** Correctly minimal. Do not change it.

---

## 5. Motion inventory

The complete inventory. There is very little motion, which is appropriate.

| Element | Trigger | Duration | Easing | Property | Reduced motion | Helps? | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Links, buttons, nav items, cards | hover | 150ms | `cubic-bezier(.4,0,.2,1)` | colour, background, border | collapses to 0.01ms | Yes, confirms hover target | Keep |
| Card border on hover | hover | 150ms | same | `border-color` (`--color-line` to `--line-2`) | collapses | Weakly; change is subtle | Keep, strengthen contrast |
| Anchor jump (`#selected-work`) | click | n/a | `scroll-behavior: smooth` | scroll position | falls back to `auto` | Yes, preserves orientation | Keep |
| Mobile nav open/close | click | none | n/a | `display` toggle | n/a | Appears instantly | Acceptable; see P2-6 |
| Theme menu open/close | click | none | n/a | `display` toggle | n/a | Appears instantly | Acceptable |
| Theme change (dark to light) | click | none | n/a | all colours swap at once | n/a | No, it is an abrupt full-viewport brightness jump | Change (P2-5) |
| Spoiler `<details>` | click | none | n/a | `display` | n/a | Adequate | Optional |

Zero `@keyframes`, zero transform animations, no scroll effects, no parallax,
no spring physics, no animation libraries. **This is the correct posture and
should not change.** The only motion worth *adding* is a short cross-fade on
theme change, which the skill explicitly calls for (section 14: "ease dark to
light theme changes", "avoid abrupt brightness jumps").

Nothing on the site introduces artificial latency, and no animation begins
after the action completes.

---

## 6. Typography findings

Measured on production:

| Role | Size | Line height | Tracking | Weight |
| --- | --- | --- | --- | --- |
| `h1` (hero) | 48px | 48px (1.0) | -1.2px (-0.025em) | 600 |
| `h2` (section header) | 14px | 20px | +2.1px (+0.15em) | **400** |
| `h3` (card title) | 16px | n/a | normal | 500 |
| Body / lede | 16px | 26px (1.63) | normal | 400 |
| Kicker (`~/route`, `$ whoami`) | 12px | 16px | +2.4px (+0.2em) | 400 |
| Figure caption | 13px | 1.5 | normal | 400 |

- **The `h1` is textbook correct**: 1.0 leading with negative tracking at
  display size is exactly the skill's section 15 guidance.
- **`h2` is the core problem.** At 14px/400 it is smaller and lighter than the
  16px body text it introduces. The skill says to build hierarchy from *weight
  plus size plus leading as a set*; here it is built from colour (`--color-faint`)
  and tracking only. Consequence: no scannable landmarks, and on long pages
  (resume, achievements, the writeup) the reader has to hunt for structure.
- **`h3` at 16px/500 is one weight step from body**, so cards and their titles
  read at nearly the same rank.
- **Monospace is doing non-technical work.** 54 to 70 elements per page. The
  skill's guidance is to default to the system font and override with a reason.
  Dates, section labels, footer text, and navigation are not technical values.
  Restricting mono to genuinely technical strings (routes, flags, code,
  commands, credential IDs) would make the remaining mono *mean* something.
- **Tracking is fixed per class, not per size.** `.kicker` uses `0.2em` and
  section headers `0.15em` regardless of context, which is the "one value for
  all sizes" pattern the skill warns against. This is mild here because both
  are small text, where positive tracking is correct.
- **Light and dark both read well.** No contrast failures found.

---

## 7. Spatial and width findings

- **Container:** `max-width: 1024px`. At 1920 that leaves **448px of empty
  gutter on each side**.
- **Prose measure:** 768px (`max-w-3xl`) on writeups. This is a good reading
  measure and should stay narrow.
- **The layered width system is half-built.** Two tiers exist (1024 container,
  768 prose) but there is **no wider tier for evidence**. The AO-SINT
  screenshots, the site's single strongest artifact, render at 768px on a
  1920px display.
- **Recommendation:** add a third tier for evidence only (screenshots,
  diagrams, tables), roughly 1100 to 1280px, while prose stays at 768. Do not
  widen prose.
- **Alignment is consistent.** Dates, metadata, and card padding align
  predictably across pages; the resume and achievements pages use one shared
  right-aligned date pattern.
- **Radii are not consistent.** Six distinct values appear in the compiled CSS:
  `0`, `0.25rem`, `0.3125rem`, `0.375rem`, `--radius-md`, `--radius-lg`, plus
  full-round badges. The skill's craft principle calls for one primary and one
  compact radius.
- **Panel repetition is the dominant texture.** With 34 to 41 panels per page,
  the bordered card stops signalling "this is a discrete object" and becomes
  wallpaper.

---

## 8. Theme findings

- Dark, Light, and System all resolve correctly, persist across navigation, and
  follow live OS changes while System is selected. Verified.
- **The switch itself is abrupt.** No transition exists on `body`
  background-color or colour, so dark to light is an instantaneous
  full-viewport brightness jump. The skill calls this out directly.
- **`prefers-reduced-transparency` is not handled.** The sticky header uses
  `backdrop-filter: blur(8px)` with a 90%-opaque background. The audit browser
  had this preference active and the blur still applied. Skill section 14 asks
  for frostier or solid surfaces under this preference.
- **`prefers-contrast: more` is not handled.** Optional, but cheap.
- **Header translucency is close to decorative.** At 90% background opacity, an
  8px blur is barely perceptible, so the material is paying a compositing cost
  without communicating hierarchy. Either commit to it (lower the opacity, let
  content read through, and replace the hard 1px bottom border with a scroll
  edge fade) or drop the blur. Skill section 12.
- **Dark diagram insets in light mode are intentional** and read as deliberate
  technical figures rather than as bugs. No change recommended.

---

## 9. Accessibility findings

Classified per the brief: standards violation, usability concern, or preference.

**No standards violations were found.**

- **Focus:** visible, `:focus-visible` based, skip link first in tab order.
  Pass.
- **Target size (WCAG 2.5.8 AA, 24px):** the nav toggle is 38x30 and the theme
  toggle 60x33, both above the 24px minimum. The 20px-tall credential links
  pass through the **spacing exception**: nearest neighbouring targets measured
  30px to 66px away, so the 24px circles do not intersect. **Pass.**
  *Usability concern, not a violation:* 30 to 33px is below Apple's 44px
  comfort guidance for primary touch controls.
- **Figure and caption association:** the writeup's six images and the CPTS
  project image use `<p><img></p>` followed by an italic paragraph, so captions
  are only *visually* associated. The architecture page does it correctly with
  `<figure>` and `<figcaption>`. **Usability concern and an internal
  inconsistency**, not a failure, since alt text is present and descriptive.
- **Reduced motion:** implemented. *Minor note:* it collapses **all**
  transitions including colour fades. The skill says reduced motion means a
  gentler equivalent, and colour or opacity changes that aid comprehension may
  remain; only vestibular motion needs removing.
- **Headings:** one `h1` per page, ordered descent. Pass. The writeup's twelve
  `h2` elements with no intermediate step is a hierarchy concern, not an a11y
  one.
- **Link purpose, label in name, `aria-current`, native control colour scheme
  (`color-scheme` set per theme):** all pass.
- **Zoom and reflow:** no horizontal overflow at 320, 390, 430, 834, or 1920.
  Code blocks scroll inside their own container rather than the page.

---

## 10. AI-generated appearance findings

Each item is a specific, observed decision, not a verdict on the site.

**A. Identical section-header treatment repeated about 45 times**
*Where:* every `<h2>` on `/`, `/resume/`, `/achievements/`, `/ctf/`, `/lab/`,
`/tools/`, `/architecture/`, `/about/`, `/contact/` (`## LABEL`, mono,
uppercase, 14px, weight 400, `--color-faint`).
*Why it reads as generated:* a human editor varies emphasis because some
sections matter more. Perfect uniformity across nine pages signals a template
loop. It also makes every section equally important, which is the same as none
being important.
*Confidence:* High. *Correction:* keep the `##` motif but reserve it for
primary sections; raise primary headings to 16 to 18px at weight 600 in
`--color-ink`, and let secondary sections use a quieter label.
*Benefit:* scannable landmarks. *Effort:* Medium. *Risk:* Low. *Human review:*
Yes, this touches the brand.

**B. Panel-as-default (34 to 41 per page)**
*Where:* homepage Focus and Certifications, resume roadmap and core areas,
achievements certification grid, tools index.
*Why:* when nearly every block is a bordered card, the border no longer means
"discrete object". Generated layouts default to cards because cards are safe.
*Confidence:* High. *Correction:* keep cards for genuinely selectable objects
(projects, writeups, credential records, downloads); render explanatory lists
as editorial text with rules and whitespace. Some of this was already done in
an earlier pass; the remaining density is on `/resume/` and `/achievements/`.
*Benefit:* the remaining cards regain meaning. *Effort:* Medium. *Risk:* Low.

**C. Badge density on `/projects/` (28 badges, 6 cards)**
*Why:* four to five pills per card compete with the titles and read as
auto-generated metadata.
*Confidence:* High. *Correction:* cap at status plus two tags per card.
*Effort:* Small. *Risk:* Low.

**D. Monospace as the default voice (54 to 70 elements per page)**
*Why:* when dates, footers, labels, and links are all monospace, the font stops
signalling "technical" and becomes texture. `/achievements/` at 70 is the
clearest case.
*Confidence:* High. *Correction:* restrict mono to routes, code, flags,
commands, and identifiers. *Effort:* Medium. *Risk:* Low. *Human review:* Yes.

**E. Equal visual weight across unrelated content**
*Where:* homepage, where "Selected proof" (real evidence) and "Focus"
(descriptive copy) carry identical header and card weight.
*Why:* a designer would make the proof louder than the description.
*Confidence:* Medium-High. *Correction:* fold into A; give the proof section
more scale and space. *Effort:* Small once A is done. *Risk:* Low.

**F. Terminal motif applied by rule rather than by intent**
*Where:* `~/route` kicker on every page plus `##` before every heading.
*Why:* the motif is good and intentional, but applying it to 100% of headings
on 100% of pages is the mechanical part. The brand reads stronger when it
appears where it means something.
*Confidence:* Medium. *Correction:* keep the `~/derekwei.xyz` brand and the
`~/route` kicker; reduce the per-heading `##`. *Effort:* Small. *Risk:* Low.
*Human review:* Yes, this is explicitly an intentional design decision.

**Not an AI signal, deliberately excluded:** the dark theme, explicit
navigation, evidence-first layout, the detailed writeup, the absence of
decorative imagery, and the minimal card page. These are working.

---

## 11. Prioritized backlog

### P0: none

No breakage and no accessibility failure was found.

### P1

**P1-1. Add press feedback (`:active`) to every interactive control**
*Page:* all. *Component:* `.btn`, `.link`, `.card-link`, nav items, theme
options, spoiler summary.
*Evidence:* 0 `:active` rules in 46KB of compiled CSS; 16 `:hover` rules exist,
so pointer users get feedback and touch users get none.
*Principle:* Section 1, "respond on pointer-down, not on release"; section 10,
"highlight on touch-down, commit on touch-up".
*Consequence:* on mobile, a tap produces no acknowledgment until the next page
paints, which reads as an unresponsive site.
*Recommendation:* CSS only, in `global.css`:
`.btn:active { transform: scale(0.98); }`, and a background or border shift on
`.panel:active` and nav items. Keep it under 100ms and exempt it under
`prefers-reduced-motion` by using colour rather than transform.
*Effort:* Small. *Risk:* Low. *Human review:* No.

**P1-2. Fix the inverted heading hierarchy**
*Page:* all. *Component:* section `<h2>`.
*Evidence:* `h2` is 14px weight 400; body is 16px weight 400.
*Principle:* Section 15, hierarchy from weight plus size plus leading.
*Consequence:* no scannable landmarks; recruiters scanning `/resume/` and
`/achievements/` (10 and 8 headings) get a flat wall.
*Recommendation:* raise primary section headings to 16 to 18px, weight 600, in
`--color-ink`, keeping the mono and the `##` motif if desired.
*Effort:* Small to Medium. *Risk:* Low. *Human review:* Yes, brand-adjacent.

### P2

**P2-1. Give evidence images a wider tier.** Writeup images at 768px on a
1920px screen; add a 1100 to 1280px evidence tier, prose stays 768.
Effort Medium, Risk Low. (Section 9 spatial.)

**P2-2. Use `<figure>` and `<figcaption>` in markdown evidence.** Six images on
the flagship writeup lack programmatic caption association; `/architecture/`
already does this correctly. Effort Medium (markdown pipeline), Risk Low.

**P2-3. Reduce panel density on `/resume/` and `/achievements/`.** 35 and 34
panels. Convert explanatory grids to editorial lists. Effort Medium, Risk Low.

**P2-4. Cap badges per project card at three.** 28 across 6 cards today.
Effort Small, Risk Low.

**P2-5. Ease the theme change.** Add a short colour cross-fade (about 150 to
200ms on background and colour) so dark to light is not an abrupt brightness
jump; disable it under `prefers-reduced-motion`. Effort Small, Risk Low.
(Section 14.)

**P2-6. Handle `prefers-reduced-transparency` and `prefers-contrast`.** Make
the header solid and drop the blur under reduced transparency; add a defined
border under increased contrast. Effort Small, Risk Low. (Section 14.)

**P2-7. Consolidate border radii.** Six values in use; standardise on one
primary plus one compact plus full-round badges. Effort Small, Risk Low.

**P2-8. Decide the header material.** Either commit to translucency (lower
opacity, scroll edge fade instead of the 1px divider) or drop the blur.
Effort Small, Risk Low. (Section 12.)

### P3

**P3-1. Raise primary touch targets toward 44px.** Nav and theme toggles are
30 to 33px tall; they pass WCAG but sit below comfort guidance. Effort Small.

**P3-2. Let reduced motion keep colour fades.** Currently all transitions
collapse to 0.01ms; colour changes are non-vestibular and aid comprehension.
Effort Small.

**P3-3. Silence the Cloudflare beacon.** Cloudflare injects
`static.cloudflareinsights.com/beacon.min.js` plus an inline loader into every
page. The site's CSP **blocks both**, so no tracking data flows and the privacy
posture holds, but every page load logs two CSP errors, and the site's own copy
states there are no third-party requests. The fix is a Cloudflare dashboard
toggle, not a code change. Effort Small, Risk Low, **Human review: Yes** (this
is the owner's decision, and it is infrastructure rather than source).

**P3-4. Shiki inline `<pre>` style is CSP-blocked.** Three inline
`style="background-color:#24292e..."` attributes on the writeup are blocked by
`style-src 'self'`. **Verified to cause no visual defect**: the stylesheet
supplies both the themed background and `overflow-x: auto`, and code blocks
scroll correctly at 320px. Console noise only. Effort Small, Risk Low.

---

## 12. Scorecard

| Dimension | Score | Evidence if below 4 |
| --- | --- | --- |
| Response | 5 | |
| Feedback | **2** | Zero `:active` rules site-wide; 16 hover rules, so touch users get no acknowledgment between tap and navigation |
| Spatial consistency | 4 | |
| Navigation predictability | 4 | |
| Typography | **3** | `h2` at 14px/400 is smaller and lighter than 16px body; hierarchy carried by colour and tracking only; 54 to 70 mono elements per page |
| Restraint | **3** | 34 to 41 panels per page; 28 badges across 6 project cards; about 45 identical section headers |
| Depth | **3** | One flat panel treatment everywhere; header translucency imperceptible at 90% opacity; no elevation language distinguishing object types |
| Motion quality | **3** | Only a 150ms colour fade exists. Restraint is correct, but the one place motion would help (theme change) has none |
| Reduced-motion support | 4 | Works; blunt in that it also removes non-vestibular colour fades |
| Dark-theme coherence | 5 | |
| Light-theme coherence | 4 | |
| Mobile usability | 4 | |
| Accessibility | 4 | |
| Human-designed appearance | **2** | About 45 identical headers, panel-as-default, 4.7 badges per project card, monospace as default voice |
| Technical credibility | 4 | |
| Recruiter scanning | **3** | Flat heading hierarchy on the two pages recruiters read most (`/resume/` 10 headings, `/achievements/` 8), all rendered quieter than body text |
| Maintenance simplicity | 5 | |

---

## 13. Changes explicitly rejected

These were considered against the skill and **rejected** for this site:

- **Spring physics, Motion or Framer Motion, page-transition frameworks.** The
  skill's spring guidance applies to gesture-driven UI. This site has no drags,
  sheets, or swipes. Adding a dependency would violate the CSP and performance
  posture for zero user benefit.
- **Glassmorphism and heavier translucency.** The skill warns never to stack
  translucent surfaces and to drop blur when it costs clarity. Recommending
  more glass on a text-dense technical site would reduce legibility.
- **Scroll animations, parallax, cursor effects, magnetic buttons, animated
  gradients, background particles.** Decorative, and directly against both the
  skill and the site's identity.
- **Any Apple visual imitation.** The navy and blue identity, terminal brand,
  and evidence-first layout stay.
- **A new font.** The system stack already ships optical sizing and legibility
  tuning. Fix the existing scale before adding a dependency.
- **Widening prose toward 1920.** Prose should stay near 768px; only evidence
  gets a wider tier.
- **Light theme by default, or removing the dark default.** System-resolved
  dark is intentional and correct.
- **Redesigning `/card/`.** It is the most disciplined page on the site.
- **Changing navigation labels or structure.** Explicitly out of scope and
  previously settled.

---

## 14. Recommended first implementation batch

**Three small, CSS-only changes, all in `src/styles/global.css`, independently
reversible by reverting that one file.** Do not implement without approval.

1. **Press feedback (P1-1).** Add `:active` states for `.btn`, `.panel` cards,
   nav links, and theme options. Colour or background shift by default; a
   `scale(0.98)` transform only outside `prefers-reduced-motion`.
2. **Theme cross-fade (P2-5).** Add a 150 to 200ms transition on body
   background and colour, suppressed under `prefers-reduced-motion`.
3. **Preference queries (P2-6).** Add `prefers-reduced-transparency: reduce`
   (solid header, no blur) and `prefers-contrast: more` (defined borders).

Why this batch: it fixes the single highest-impact finding (no acknowledgment
of a press), removes the one genuinely abrupt visual event, and closes two
accessibility preference gaps. It touches no markup, no content, no route, and
no infrastructure, and carries no regression risk to the CSP or to either
theme.

**Deliberately held back for a second batch** (needs human agreement first
because it is brand-adjacent): the heading hierarchy fix (P1-2) and the
monospace reduction (D), which together would do the most to remove the
generic impression.

---

## 15. Manual human-review questions

Show the live site. Do **not** share any finding from this audit before
collecting answers.

1. What does Derek do?
2. What appears to be Derek's strongest technical work?
3. What is the first thing you would click?
4. Can you find the resume quickly?
5. Can you find verified credentials quickly?
6. Does any part look generic or AI-generated?
7. What specifically causes that impression?
8. Does the interface react immediately to clicks and taps?
9. Does motion help explain what changed?
10. Which element feels least polished?
11. What would you remove?
12. Does the Light theme feel like the same website as the Dark theme?

Ask question 8 on a phone specifically, since that is where the missing press
feedback is most noticeable.
