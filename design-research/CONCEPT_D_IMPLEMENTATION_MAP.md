# Concept D implementation map

Written before any production file was edited. Branch: `design/concept-d-production`, cut from `main` at `adde2e7`.

The prototype at `design-concepts-v2/concept-d-evolved-evidence/` is a reference, not a source. Nothing is copied wholesale. Every change below is expressed through the existing Astro components, the existing content sources, and the existing Tailwind token layer.

## Ground rules for this implementation

- No new dependency. The width tiers and the section system are Tailwind 4 `@theme` tokens plus existing utility classes.
- No factual edit. Every string continues to come from `src/consts.ts` or a content collection. Where the homepage gains a section, it renders data already present in `consts.ts`.
- No route, redirect, or navigation-label change.
- `public/_headers`, `astro.config.mjs`, the sitemap filter, the resume PDF, and the vCard are out of scope entirely.

## Width system

Four semantic tiers added to the `@theme` block in `src/styles/global.css`. Tailwind 4 turns the `--container-*` namespace into `max-w-*` utilities, so this adds no configuration file and no dependency.

| Tier | Token | Value | Used for | Replaces |
|---|---|---|---|---|
| Shell | `--container-shell` | 90rem | Header, main, footer, section rules | `max-w-5xl` (64rem) |
| Wide | `--container-evidence` | 76rem | Screenshots, diagrams, tables, featured work | no equivalent today |
| Medium | `--container-mid` | 58rem | Resume-like content, experience, credentials | mixed ad-hoc `max-w-*` |
| Reading | `--container-measure` | 44rem | Long prose, About text, CTF explanation | `max-w-3xl` (48rem) in `Prose.astro` |

Prototype used a 96rem shell. Production drops to 90rem because production pages carry real page padding at every breakpoint and 96rem plus padding starts to strand the nav against the viewport edge on a 1440px laptop, which is the more common review machine.

---

## Element map

### Header

| Field | Value |
|---|---|
| Prototype element | Sticky header, brand left, nav right, theme control |
| Astro source | `src/components/Header.astro` |
| Component reused | Existing header, `ThemeToggle.astro` |
| Content source | `NAV` in `src/consts.ts` |
| Styling change | Container widens from `max-w-5xl` to `max-w-shell`. Nothing else structural. |
| Accessibility | `nav aria-label="Primary"`, `aria-current="page"` on the active item, existing Escape handling retained |
| Mobile | Existing disclosure at `lg:` retained. Header row padding tightens below 400px so brand plus two buttons cannot overflow at 320px, which is the defect found in the prototype |
| Theme | Uses tokens only, so both themes follow automatically |
| Regression risk | Low. Width class only, plus one narrow-screen padding rule |

### Terminal brand

| Field | Value |
|---|---|
| Prototype element | `~/derekwei.xyz` with accent `~/` |
| Astro source | `src/components/Header.astro` lines 14 to 19 |
| Component reused | Existing anchor, unchanged markup |
| Content source | Literal, already present |
| Styling change | None to the brand itself. Gains `aria-current="page"` on the homepage, because there is no Home nav item and the homepage otherwise has no current-page signal |
| Accessibility | The `~/` stays `aria-hidden`, so the accessible name remains `derekwei.xyz` |
| Mobile | Unchanged |
| Theme | Unchanged |
| Regression risk | Very low |

### Navigation

| Field | Value |
|---|---|
| Prototype element | Nine explicit items, no Home |
| Astro source | `src/components/Header.astro`, `NAV` in `src/consts.ts` |
| Component reused | Existing list rendering |
| Content source | `NAV`, unchanged |
| Styling change | None to labels, order, or hrefs. Only the container width changes |
| Accessibility | Closed mobile menu must keep its links out of the tab order, which the existing `hidden` class already achieves |
| Mobile | Unchanged disclosure behavior |
| Theme | Unchanged |
| Regression risk | Very low. Explicitly no information-architecture change |

### Theme control

| Field | Value |
|---|---|
| Prototype element | Theme button opening System / Dark / Light |
| Astro source | `src/components/ThemeToggle.astro` |
| Component reused | Entirely. No behavioral change |
| Content source | Literal options |
| Styling change | None required. Add `aria-haspopup="true"` to the trigger, which the prototype showed was missing |
| Accessibility | `aria-expanded`, `aria-pressed` per option, check mark as a non-colour cue, Escape closes and returns focus. All already correct |
| Mobile | Unchanged |
| Theme | Persists under `derekwei-theme`. Unchanged |
| Regression risk | Very low |

### Hero

| Field | Value |
|---|---|
| Prototype element | Kicker, large name, lede, credential line, clearance, three actions, faded blueprint grid |
| Astro source | `src/pages/index.astro` lines 44 to 76 |
| Component reused | Existing `.bg-grid` and `.hero-fade` |
| Content source | `SITE.clearance` from `consts.ts`; hero prose already in the page |
| Styling change | Name scales up, lede moves from `text-muted` at body size to `--color-prose-body` at a larger size, actions grow to the Concept D button height. Grid overlay bleed pinned to the page gutter so it cannot overflow |
| Accessibility | Single `h1`. Clearance stays real text, not an image or badge graphic |
| Mobile | Name uses a clamp so 320px stays inside the viewport |
| Theme | Grid uses `--color-grid-line`, which is already theme-aware |
| Regression risk | Medium. Type scale is the most visible change on the site |

### Primary, secondary, and tertiary actions

| Field | Value |
|---|---|
| Prototype element | Filled primary, outlined secondary, plain text link |
| Astro source | `.btn`, `.btn-primary`, `.btn-ghost` in `src/styles/global.css` |
| Component reused | Existing button classes, no new component |
| Content source | Literal labels, unchanged destinations |
| Styling change | Minimum height rises to 48px with matching padding. `.btn-primary` keeps its existing accent treatment |
| Accessibility | 48px clears the 24px minimum comfortably. Focus ring unchanged at 2px accent, 2px offset |
| Mobile | Buttons wrap rather than shrink |
| Theme | Token-driven |
| Regression risk | Low, but every page using `.btn` grows slightly |

### Numbered section bars

| Field | Value |
|---|---|
| Prototype element | Full-width rule, then `01` and `EVIDENCE` in mono, then the title |
| Astro source | New `src/components/Section.astro` |
| Component reused | New, but composed only of existing tokens and utilities |
| Content source | Numbers and categories are presentational labels passed by the page, not facts |
| Styling change | `border-t border-line` spanning the shell content box, mono number in accent, mono category in muted, `h2` in the sans stack at roughly twice body size |
| Accessibility | The number and category are decorative and `aria-hidden`, so the accessible heading text stays the title alone. Every section is labelled by its `h2` via `aria-labelledby` |
| Mobile | Bar stacks naturally; the rule still spans the content width |
| Theme | Token-driven |
| Regression risk | Low in isolation, but it replaces the `##` motif site-wide, which is the largest visual change |

### AO-SINT feature

| Field | Value |
|---|---|
| Prototype element | Dominant landscape evidence image, context, placement, method, action |
| Astro source | `src/pages/index.astro` |
| Component reused | Plain `figure` at the evidence width, existing `.btn` |
| Content source | Image `public/images/ctf/broncoctf-2026-ao-sint/location-1-ierochos.webp`; placement text from the writeup collection, unchanged wording, still stated as a team result |
| Styling change | Image renders at the evidence tier instead of inside a two-column card grid |
| Accessibility | Existing alt text reused verbatim. `width` and `height` attributes added so the lazy image reserves space |
| Mobile | Image is fluid, caption below |
| Theme | Border uses `--color-line` |
| Regression risk | Medium. The homepage currently links AO-SINT from a `Card`; the card is replaced by a feature block. The destination URL is identical |

### Supporting project cards

| Field | Value |
|---|---|
| Prototype element | Two smaller text-first entries below the feature |
| Astro source | `src/pages/index.astro`, `src/components/Card.astro` |
| Component reused | Existing `Card.astro` unchanged |
| Content source | `getCollection('projects')` filtered to featured, exactly as today |
| Styling change | None to the card. It simply sits under a quiet "Supporting work" label at a smaller heading size than the feature |
| Accessibility | `Card` already uses a stretched link with no nested anchor. Preserved |
| Mobile | Existing single-column stacking |
| Theme | Unchanged |
| Regression risk | Low |

Both supporting projects have only tall portrait diagrams, 560 by 712 and 560 by 596. Neither gets an image on the homepage, because squeezing either into a wide thumbnail makes it unreadable. No screenshot is invented.

### Experience list

| Field | Value |
|---|---|
| Prototype element | Role, organisation, period rows at the medium width |
| Astro source | `src/pages/index.astro`, new section 02 |
| Component reused | Plain list, existing type utilities |
| Content source | `EXPERIENCE` in `src/consts.ts`, already used by `/resume/` |
| Styling change | New on the homepage. Constrained to `max-w-mid` |
| Accessibility | Real list markup, `role="list"` retained where list-style is removed |
| Mobile | Period wraps beneath the role rather than truncating |
| Theme | Token-driven |
| Regression risk | Low. Renders existing data in a new place, no new facts |

### Credentials

| Field | Value |
|---|---|
| Prototype element | "5x CompTIA certified" plus verify links, then also-earned line |
| Astro source | `src/pages/index.astro`, section 03 |
| Component reused | Existing `.link` class |
| Content source | `CERTIFICATIONS` in `src/consts.ts` including `verifyUrl` |
| Styling change | Replaces the current grid of certification panels with a denser text treatment at the medium width |
| Accessibility | Each verify link keeps its `aria-label` naming the credential, and the visible text remains contained in that label so Label in Name holds |
| Mobile | Links wrap; separators are `aria-hidden` |
| Theme | Token-driven |
| Regression risk | Medium. The five-CompTIA count and the separate treatment of AWS and Microsoft must both survive verbatim |

### Current direction

| Field | Value |
|---|---|
| Prototype element | Short dashed list, section 04 |
| Astro source | `src/pages/index.astro` |
| Component reused | Existing dashed list pattern from `/about/` |
| Content source | The same three items `/about/` already renders, including the "in progress, not currently held" qualifier on CPTS |
| Styling change | New homepage section at the reading width |
| Accessibility | The qualifier stays visible text, never a tooltip |
| Mobile | Single column |
| Theme | Token-driven |
| Regression risk | Low, provided the CPTS qualifier is carried across exactly |

### Contact section

| Field | Value |
|---|---|
| Prototype element | Section 05, one line plus two actions |
| Astro source | `src/pages/index.astro` |
| Component reused | `.btn btn-primary`, `.btn btn-ghost` |
| Content source | Existing `/contact/` route and `SITE.resumePdf` path |
| Styling change | New section |
| Accessibility | Both actions are real links with descriptive text |
| Mobile | Buttons wrap |
| Theme | Token-driven |
| Regression risk | Low. The resume path must remain `/Derek_Wei_Resume_Public.pdf` |

### Project index

| Field | Value |
|---|---|
| Prototype element | Page header, then a card grid |
| Astro source | `src/pages/projects/index.astro` |
| Component reused | `PageHeader.astro`, `Card.astro` |
| Styling change | Inherits the wider shell. Numbered bars are not applied |
| Accessibility | Unchanged |
| Mobile | Unchanged |
| Theme | Unchanged |
| Regression risk | Very low |

### Project detail page

| Field | Value |
|---|---|
| Prototype element | Header, diagram at the evidence tier, prose at the reading tier |
| Astro source | `src/pages/projects/[slug].astro`, `Prose.astro` |
| Component reused | Both |
| Content source | `src/content/projects/*.md`, unchanged |
| Styling change | Prose narrows to `max-w-measure`. Diagrams keep their intrinsic width and are not stretched |
| Accessibility | Figure captions and alt text unchanged |
| Mobile | Unchanged |
| Theme | Unchanged |
| Regression risk | Low |

### Resume page

| Field | Value |
|---|---|
| Prototype element | Medium-width structured sections |
| Astro source | `src/pages/resume.astro` |
| Component reused | `PageHeader.astro`, existing section markup |
| Content source | `consts.ts`, unchanged |
| Styling change | `##` headings replaced by the section rule and title. Content constrained to `max-w-mid`. Print styles untouched |
| Accessibility | Heading hierarchy preserved, one `h1` |
| Mobile | Row lists wrap |
| Theme | Token-driven |
| Regression risk | Medium. This page carries the most factual content and the print stylesheet |

### Achievements page

| Field | Value |
|---|---|
| Prototype element | Credential cards, awards, scholarships, competition results |
| Astro source | `src/pages/achievements.astro` |
| Component reused | Existing panels |
| Content source | `CERTIFICATIONS`, `STACKABLE_CERTIFICATIONS`, `SCHOLARSHIPS`, `COMPETITIONS`, `NJHS_AWARD` |
| Styling change | Section headings updated. Stackable disclaimer stays adjacent to the stackable list |
| Accessibility | Certification links keep Credly `aria-label`s |
| Mobile | Grid collapses to one column |
| Theme | Token-driven |
| Regression risk | Medium. AWS issue and expiry dates and the stackable disclaimer must not move or change |

### CTF index

| Field | Value |
|---|---|
| Prototype element | Header, published writeups, method list |
| Astro source | `src/pages/ctf/index.astro` |
| Component reused | `PageHeader.astro`, `Card.astro` |
| Styling change | Section headings updated. This is the one index where numbered labels may help scanning, but they are not applied in the first implementation |
| Accessibility | Unchanged |
| Mobile | Unchanged |
| Theme | Unchanged |
| Regression risk | Low |

### Writeup layout

| Field | Value |
|---|---|
| Prototype element | Wide evidence images, narrow prose |
| Astro source | `src/pages/ctf/[slug].astro`, `Prose.astro`, `.prose-custom` rules in `global.css` |
| Component reused | Both |
| Content source | `src/content/writeups/broncoctf-2026-ao-sint.md`, unchanged |
| Styling change | Prose column narrows to the reading tier while figures are allowed to break out to the evidence tier. This is the audit's headline finding: evidence rendered at 768px inside a 1920px viewport |
| Accessibility | The flag spoiler stays a real `details` element and stays closed by default. Captions stay subordinate to their figures |
| Mobile | Figures are fluid |
| Theme | Token-driven |
| Regression risk | Highest of any page. The markdown pipeline, the spoiler, and the figure-plus-caption pattern all have to keep working |

### About page

| Field | Value |
|---|---|
| Prototype element | Intro prose, direction, principles, context, destinations |
| Astro source | `src/pages/about.astro` |
| Component reused | `PageHeader.astro` |
| Content source | Page-local arrays, unchanged wording |
| Styling change | `##` headings replaced. Intro prose constrained to the reading tier |
| Accessibility | Unchanged |
| Mobile | Two-column principle grid collapses |
| Theme | Token-driven |
| Regression risk | Low |

### Contact page

| Field | Value |
|---|---|
| Prototype element | Direct contact block, details list |
| Astro source | `src/pages/contact.astro` |
| Component reused | `PageHeader.astro` |
| Content source | `CONTACT` in `src/consts.ts` |
| Styling change | Section headings updated only |
| Accessibility | `mailto:`, `tel:`, and `sms:` links keep their visible text |
| Mobile | Unchanged |
| Theme | Unchanged |
| Regression risk | Medium by consequence rather than complexity. The Google Voice number is the only permitted phone number and must be untouched |

### Card page compatibility

| Field | Value |
|---|---|
| Prototype element | Minimal standalone contact card |
| Astro source | `src/pages/card.astro` with `BaseLayout minimal` |
| Component reused | Existing page, no structural change |
| Content source | `CONTACT`, `CREDLY_PROFILE` |
| Styling change | None beyond whatever it inherits from shared tokens. It must not gain site navigation, and it must not get longer |
| Accessibility | Unchanged |
| Mobile | Unchanged, this page is phone-first by design |
| Theme | Already correct: `minimal` drops the header and footer but `theme-boot.js` still runs, so a stored Light preference applies |
| Regression risk | Low, but the `.btn` height increase does reach this page, so its stacked action buttons need a visual check |

---

## Faint token decision, recorded before implementation

`--color-faint` is `#6b7f9c`. Measured against production surfaces:

| Surface | Ratio | Verdict |
|---|---|---|
| `--color-bg` `#0a0f1a` | 4.69:1 | passes |
| `--color-panel` `#101827` | 4.35:1 | fails the 4.5:1 normal-text floor |
| `--color-panel-2` `#0c1320` | 4.55:1 | passes |

The token carries meaningful normal-size text on panel surfaces today: card metadata in `Card.astro` and the certification name line in `src/pages/index.astro`. That makes it a real failure rather than a decorative one, so Stage 5 corrects the token rather than only restricting its use. Light-theme faint (`#5d6b82`) already passes on all three light surfaces and is left alone.

## Sequence

1. Faint token correction, committed alone.
2. Width tokens, `Section.astro`, `BaseLayout`, `Header`, `Footer`, `Prose`, and the homepage.
3. The remaining pages.
4. Press feedback.
5. Responsive corrections found in testing.
