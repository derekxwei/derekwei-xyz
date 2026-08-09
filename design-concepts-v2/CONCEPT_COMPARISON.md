# Concept comparison

Prototypes only. Nothing in this folder is wired to production, and no production file was changed to produce any of it.

Every concept renders the same factual content from `_build/content.cjs`, which is copied from `src/consts.ts`, the content collections, and the live pages. The concepts differ in visual design only. A text diff of Concept D against Concept C across all 13 pages returns no factual difference: the only changes are the concept name in the `<title>`, the removal of the `##` heading motif, and the numbered section labels on the homepage.

| Concept | Directory | Idea |
|---|---|---|
| A | `concept-a-evolved-dark/` | Evolved current identity |
| B | `concept-b-technical-publication/` | Technical publication |
| C | `concept-c-tactile-technical/` | Tactile technical interface |
| D | `concept-d-evolved-evidence/` | Evolved evidence interface |

Concept D was built after review of B and C, on the approved decision to take C as the structural foundation and borrow B's numbered evidence treatment.

---

## 1. Measured baseline

"Production" figures are the measurements recorded in `docs/APPLE_DESIGN_AUDIT.md`. Concept figures were measured directly in the browser at 1920 by 1080 across 12 content pages.

| Measure | Production | A | B | C | D |
|---|---|---|---|---|---|
| Section heading size and weight | 14px / 400 | 17px / 650 | 25.6px / 680 | 18.4px / 680 | 33.6px / 680 |
| Body text size | 16px | 16px | 16px | 16px | 16px |
| Heading larger than body | no | yes | yes | yes | yes |
| `## LABEL` headings across 12 pages | about 45 | 29 | 0 | 29 | 0 |
| Bordered or filled panels per page | 34 to 41 | 7.2 | 2.3 | 6.5 | 7.3 |
| Monospace elements per page | 54 to 70 | 11.6 | 14.0 | 11.6 | 10.5 |
| AO-SINT evidence image width at 1920 | 768px | 1002px | 1040px | 1056px | 1312px |
| Prose column at 1920 | not separated | 704px | 640px | 672px | 704px |

The audit's central complaint was that the section heading was both smaller and lighter than the body text it introduced. All four concepts fix it. Concept D fixes it hardest: the section title is 2.1 times the body size.

Concept D also carries the largest evidence tier. At 1920 the AO-SINT screenshot renders 1312px wide against production's 768px, a 71 percent increase, while long prose stays at 704px, which measures 77 characters per line.

---

## 2. Scores

Scale 1 to 5, 5 is best. For **Implementation risk** and **Maintenance complexity**, 5 means lowest risk and lowest complexity. Evidence is given for every score below 4.

| Criterion | B | C | D |
|---|:--:|:--:|:--:|
| Human-designed appearance | 4 | 4 | 5 |
| Technical credibility | 5 | 4 | 5 |
| Evidence prominence | 4 | 4 | 5 |
| Recruiter scanning | 4 | 3 | 5 |
| Typography | 5 | 4 | 5 |
| Navigation clarity | 5 | 5 | 5 |
| Mobile usability | 4 | 4 | 5 |
| Accessibility | 5 | 4 | 5 |
| Preservation of current identity | 2 | 3 | 5 |
| Implementation risk | 3 | 4 | 4 |
| Maintenance complexity | 3 | 4 | 4 |
| **Total (55 possible)** | **44** | **43** | **53** |

### Evidence for scores below 4

**B, Preservation of current identity, 2.** Concept B replaces the production palette with a near black page surface (`#07090d`) and a different blue (`#4ea3ff` instead of `#38bdf8`), and removes the `##` motif entirely (0 occurrences against production's approximately 45). It also drops panels to 2.3 per page, so the card-based surfaces that currently carry the site's structure largely disappear. It reads as a different site rather than the same site improved.

**B, Implementation risk, 3.** The running left rail is a two-column grid that only engages at 1000px and collapses to a stacked block below it, so every section gains a second responsive state that production does not have today. Porting it means touching the layout of every page, not just the theme tokens.

**B, Maintenance complexity, 3.** The rail needs a number and a category for every section on every page. That is a per-section editorial obligation with no current equivalent, and a section added later without them renders an empty rail column.

**C, Recruiter scanning, 3.** C keeps the `##` motif on 29 headings and 6.5 panels per page, and its section title is only 18.4px against 16px body. The heading rank is correct but shallow, so a page of C still reads as a fairly even field of similar-weight blocks. AO-SINT and the two supporting projects are rendered with the same card treatment and the same title size, so the strongest single piece of evidence does not visually lead.

**C, Preservation of current identity, 3.** C is close in spirit but its palette is approximated rather than exact: page `#0b1017` against production `#0a0f1a`, accent `#3ba9f0` against `#38bdf8`, ink `#e9eef5` against `#e8eef6`. Small individually, but it is a second palette to keep in sync.

**C, Accessibility, 4.** C's header is 82 percent translucent with a 14px blur. With the nav text in muted, the worst realistic composite measures 4.6:1 against a bright screenshot scrolling underneath, which passes AA but with almost no margin. Concept D's 90 percent header measures 5.82:1 in the same worst case.

**D, Implementation risk, 4.** Not a defect, a scope statement. Adopting D means changing the section component, the width system, and the type scale across every page. The colour work is nil because the tokens are already production's, but the layout work is real.

**D, Maintenance complexity, 4.** The homepage numbered sequence is hand-authored, so inserting a section between 02 and 03 means renumbering the ones after it. This is bounded to five sections on one page, unlike B's site-wide rail, but it is not free.

---

## 3. Where each Concept D element came from

### From production, unchanged

- **All 28 colour tokens**, verified byte-exact against `src/styles/global.css` in both themes: `--color-bg`, `--color-panel`, `--color-panel-2`, `--color-line`, `--color-line-2`, `--color-ink`, `--color-muted`, `--color-faint`, `--color-accent`, `--color-accent-2`, `--color-warn`, `--color-danger`, `--color-prose-body`, `--color-grid-line`.
- **Both font stacks**, `--font-sans` and `--font-mono`, character for character. No external font is loaded.
- **The focus ring**: 2px solid accent at 2px offset, exactly production's `:focus-visible` rule.
- **The terminal brand** `~/derekwei.xyz` as the homepage link, in monospace, with the `~/` in accent.
- **The nine explicit nav items** in production order, with no Home item and no grouping.
- **The blueprint grid**, production's `.bg-grid` pattern at 36px, used once behind the hero and faded out.
- **The accent button colour pairing**: accent background with `--color-bg` text, which is what production's `.skip-link` already does. Measures 8.94:1 dark and 5.48:1 light.

### From Concept B

- **The numbered evidence treatment.** The section number and category in monospace, sequenced 01 through 05 down the homepage.
- **A section title that clearly outranks body text.** B proved the larger, heavier heading works; D pushes it further, to 33.6px.
- **Nothing else.** B's near-black palette, its alternate blue, its `.entry` rule-based cards, and its two-column running rail were all left behind.

### From Concept C

- **Structural foundation**: the overall page skeleton, section rhythm, and card model.
- **Scale**: larger hero (68px at 1920), larger body (1.0625rem), larger lede (19.2px), and more generous section spacing (5.5rem between sections).
- **Button sizing**: 48px minimum height, 0.72rem by 1.4rem padding.
- **Evidence prominence**: C established that the evidence image should be the widest thing on the page. D extends that tier from 1056px to 1312px.
- **The tactile press signal**: `translateY(1px)` plus an inset shadow, kept restrained.

### New in Concept D

- **The full-width section rule.** B's short isolated blue line was rejected. In D the rule is a 1px `--color-line` border spanning the entire usable content width, measured at 1456px inside a 1536px shell at 1920, and verified equal to the shell content box. The number and category sit directly beneath the start of that rule, and the title aligns to the same left edge as all body content.
- **A layered width system.** Four tiers instead of one: shell 1536px, evidence 1312px, mid 960px for resume-like and list content, measure 704px for long prose. Long paragraphs never stretch across the viewport.
- **AO-SINT as the dominant feature.** Its title renders at 28px against 17.6px for the two supporting projects, above a 1312px landscape image. The supporting projects are grouped under a quiet "Supporting work" label.
- **A text-first treatment for the supporting projects.** Both CPTS Study Notes Pipeline and Secure Travel Network only have tall portrait diagrams (560 by 712 and 560 by 596). Forcing either into a wide thumbnail would make it unreadable, so neither carries an image on the homepage. No project screenshot was invented.
- **A restriction on `--color-faint`.** Production's `--color-faint` (`#6b7f9c`) measures 4.35:1 on `--color-panel`, below the 4.5:1 WCAG AA floor for small text. This is inherited from production, not introduced here. Concept D keeps the token exactly as production defines it and instead never places faint small text on a panel surface: inside cards the same role uses `--color-muted`, which measures 8.0:1. No colour was changed or invented.

### Deliberately rejected

- B's palette, B's alternate blue, B's `.entry` cards, and B's running two-column rail.
- B's short disconnected section line.
- Applying the numbered sequence to detail pages. Detail pages get the full-width rule and the title, with no number and no category. Verified: 0 `secbar` elements on `ao-sint.html`.
- The `##` motif. 0 occurrences across all 13 Concept D pages.
- Springs, bounce, magnetic buttons, scroll reveals, parallax, page transitions, and animated backgrounds. None are present.
- Adding any feature from A. A was not part of the approved direction and contributed nothing to D.

---

## 4. Test results

All figures measured in the browser against the built files.

| Test | Result |
|---|---|
| Horizontal overflow | None on 13 pages at 320, 360, 390, 414, 768, 1024, 1280, 1440, and 1920 |
| Contrast, dark theme | All text meets WCAG AA |
| Contrast, light theme | All text meets WCAG AA |
| Target size | Every standalone control at least 24 by 24 CSS px at 390 |
| Keyboard focus | 30 focusable controls, every one shows a ring under `:focus-visible` |
| Tab order | Skip link, brand, nine nav items, Theme, then hero actions |
| Skip link | Present and reachable on first Tab |
| Press feedback | `:active` on buttons, theme control, menu control, nav links, text links, and cards, with no cascade conflict |
| Reduced motion | Verified live: the test browser has the preference on, and button transition duration resolves to 0.00001s |
| Reduced transparency | Verified live: the preference is on, header backdrop filter resolves to `none` and the background to an opaque token |
| Mobile menu at 390 | Toggle 57 by 40, nine links at 45px each, zero links reachable when closed, `aria-expanded` tracks state |
| Theme control | Opens on click, closes on Escape, returns focus to the button, exposes `aria-haspopup` and `aria-pressed` |
| Current page | Exactly one current-page marker per page; the brand carries it on the homepage since there is no Home item |
| Headings | No skipped levels, exactly one `h1` per page |
| Images | All carry alt text and intrinsic width and height, so lazy images reserve space and nothing shifts on scroll |
| Local assets | 8 asset references per concept, 0 missing |
| Internal links | 167 links, 0 broken |
| External requests | 0. Every request is `file:` |
| Console | No messages of any level |
| Trackers | None. No third-party script, iframe, pixel, or font |
| Em dashes | 0 across all generated pages |

Screenshots could not be captured for Concept D: the browser preview pane stopped compositing frames partway through the session, and every screenshot attempt timed out. Concept D was therefore verified by direct measurement of the rendered DOM rather than by eye. As a substitute for visual inspection, a render integrity pass across 13 pages at 390 and 1920 confirmed no zero-size text, no clipped text, no collapsed or overflowing images, no text rendered in its own background colour, and the header pinned on every page. Concepts A, B, and C were seen rendered earlier in the session before the pane failed.

---

## 5. Recommendation

**Concept D**, at 53 of 55.

The reasoning is that D is the only concept that improves the design without spending the site's existing identity to do it. It scores 5 on preservation of current identity because it does not approximate the brand, it reuses it: 28 tokens and 2 font stacks verified identical to `src/styles/global.css`. B scores 2 there and C scores 3, and in both cases the cost is a second palette that has to be maintained alongside production's.

On the audit's actual complaints D is also the strongest result. The inverted heading rank is corrected by the widest margin of any concept (33.6px against 16px). The repeated `##` motif is gone entirely. Panels are down from 34 to 41 per page to 7.3. Monospace elements are down from 54 to 70 to 10.5, the lowest of any concept, while monospace is still doing deliberate work on the brand, section numbers, categories, routes, and flags. And the audit's specific finding that AO-SINT evidence sat at 768px inside a 1920px viewport is answered with 1312px, while prose is independently held at 77 characters per line.

Confidence is high on the measurable claims, because they are measurements rather than judgements. Confidence is moderate on the aesthetic claims, for the reason in the next section.

### What could overturn this

- **A human looking at it.** Every claim above is a measurement. "Looks least generated" is not measurable, and it is the criterion the user cares about most. If D reads as sterile or template-like in person, the score on human-designed appearance is wrong and D loses its margin over B.
- **The lost screenshots.** I could not see Concept D rendered. Measurements confirm the geometry is correct and nothing is broken, but they cannot confirm it looks good.
- **The numbered sequence not earning its place.** If reviewers find 01 through 05 decorative rather than orienting, the main thing D borrowed from B should be dropped, and D collapses toward a cleaner Concept C.
- **The homepage rule reading as heavy.** Five full-width horizontal rules down one page is more structure than production has. If it reads as a spreadsheet, the rule should get lighter or shorter, which would partly reopen the question the user already settled against B.
- **Scale at 1920 being too large.** 68px hero and 33.6px section titles are a deliberate step up. If they read as shouty rather than confident, the type scale needs to come down and D's typography score with it.
