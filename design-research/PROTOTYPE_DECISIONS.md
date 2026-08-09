# Prototype decisions

Decisions taken while building the four prototypes in `design-concepts-v2/`, with the reasoning and the measurement behind each. Recorded so the implementation does not have to rediscover them.

## Method

All four concepts render from one shared content model, `design-concepts-v2/_build/content.cjs`, copied from `src/consts.ts`, the content collections, and the live pages. A single generator emits every page for every concept. This was deliberate: it makes the concepts differ in design only, and a text diff across all 13 pages proves it. Concept D against Concept C differs in exactly three things: the concept name in the title, the removed `##` motif, and the numbered section labels.

The prototypes are plain HTML with inlined CSS and one small inline script. No build step, no dependency, no network request.

## What the audit actually measured, and what each concept did about it

| Audit finding | Production | A | B | C | D |
|---|---|---|---|---|---|
| Section heading smaller and lighter than body | 14px / 400 under 16px body | 17px / 650 | 25.6px / 680 | 18.4px / 680 | 33.6px / 680 |
| `## LABEL` heading repeated site-wide | about 45 | 29 | 0 | 29 | 0 |
| Panels per page | 34 to 41 | 7.2 | 2.3 | 6.5 | 7.3 |
| Monospace elements per page | 54 to 70 | 11.6 | 14.0 | 11.6 | 10.5 |
| AO-SINT evidence width at 1920 | 768px | 1002px | 1040px | 1056px | 1312px |

The inverted heading rank was the audit's central complaint and all four concepts fix it. The distinguishing question turned out not to be whether a concept fixed the audit, but what it cost to do so.

## Decisions

**Concept D uses production's tokens rather than its own.** B and C each invented a palette close to production's but not equal to it: B moved the page surface to `#07090d` and the accent to `#4ea3ff`, C to `#0b1017` and `#3ba9f0`. Both then have to be kept in sync with production forever. D declares the 28 production tokens verbatim, verified byte-exact against `src/styles/global.css` in both themes. This is the single largest reason D scored highest on identity preservation.

**The `##` motif was removed rather than restyled.** It appeared roughly 45 times across production. At that frequency it stops being an accent and becomes the texture of the page. A and C kept it at 29 occurrences and still read as busy. B and D removed it entirely and lost nothing, because the heading itself now carries the rank.

**B's short section line was rejected in favour of a full-width rule.** B drew a short accent line as a section marker, which floats without connecting to anything. D replaces it with a 1px `--color-line` rule spanning the entire usable content width, measured at 1456px inside a 1536px shell at 1920 and verified equal to the shell content box. The number and category sit directly beneath its start.

**One width became four.** Production applies roughly one content width to everything, which is why the AO-SINT evidence sat at 768px inside a 1920px viewport while prose sat at the same width. D separates them: shell 1536px, evidence 1312px, medium 960px for resume-like content, and reading measure 704px, which is 77 characters at the body size. Wide things get wide, prose stays readable.

**Supporting projects are text-first because their assets are portrait.** CPTS Study Notes Pipeline and Secure Travel Network only have tall diagrams, 560 by 712 and 560 by 596. Squeezed into a wide homepage thumbnail either becomes unreadable. No project screenshot was invented, so both are presented text-first below AO-SINT, at 17.6px against AO-SINT's 28px.

**The numbered sequence is homepage-only.** Applied to every page it becomes the same mechanical texture the `##` motif was. Detail pages get the full-width rule and the title, with no number. Verified: zero numbered bars on `ao-sint.html`.

**`--color-faint` was restricted rather than recoloured in the prototype.** The brief required exact production tokens, and the token fails AA only on panel surfaces (4.35:1). The prototype keeps the token exactly and never places faint small text on a panel; cards use `--color-muted` at 8.0:1. The underlying token remains a production question.

## Defects found and fixed during prototype testing

Each was a real bug in the prototypes, found by measurement rather than by eye.

1. **Prose columns overflowed by up to 145px at 320px.** The paragraph stacks used `display:grid` for rhythm. A grid track defaults to `auto`, which sizes to max-content, so one long code span pushed the whole column past the viewport. Fixed by pinning the single column to `minmax(0,1fr)` and allowing long tokens to break. The same hazard existed in `.grid2` and in `.railed` below its breakpoint and was fixed in all three.

2. **Standalone links were below the 24px target minimum.** Credential links, arrow links, and card title links measured 20 to 23px. Fixed with vertical padding on the inline box rather than `display:inline-flex`, because inline-flex stops long link text from wrapping and would have reintroduced horizontal overflow at 320px.

3. **`--faint` failed WCAG AA in all three original concepts** at 4.35, 4.43, and 4.21 against 4.5. Corrected in A, B, and C by the smallest lightness step that clears the floor. Concept D solved it by restriction instead, since it may not alter production tokens.

4. **A decorative separator rendered at 1.6 to 2.05:1.** It carried no meaning, so it was hidden from assistive technology and lifted to the same contrast floor as the text it separates.

5. **The card page ignored the theme preference.** Production renders `/card` with the layout's minimal flag, which drops the header and footer but still runs `theme-boot.js`. The prototype had omitted the script, so the card was always dark. Fixed with a blocking inline resolver.

6. **Lazy images had no intrinsic dimensions** and collapsed to about 2px until loaded, shifting layout on scroll. Fixed by reading real dimensions from the asset files, webp headers and svg viewBox, and emitting width and height attributes.

7. **Concept D's hero grid overlay bled 8px past the viewport at every width.** A pseudo-element does not appear in the DOM, so no element query could find it. Found by noticing the overflow was a constant 8px rather than content-dependent. Fixed by pinning the bleed to the page gutter.

8. **Concept B's header controls overflowed by 4px at 320px.** B uses a larger page gutter, so the brand plus two buttons did not fit. Fixed by tightening the header row alone below 400px.

## Testing note

Concepts A, B, and C were inspected visually before the browser preview pane stopped compositing frames. Concept D was verified by direct measurement of the rendered DOM only: no screenshot of Concept D was captured. A render integrity pass across 13 pages at 390 and 1920 confirmed no zero-size text, no clipped text, no collapsed or overflowing images, no text rendered in its own background colour, and the header pinned on every page. That establishes the geometry is correct. It does not establish that it looks good, which is what `design-concepts-v2/HUMAN_REVIEW.md` is for.

Final layout verification: 4 concepts by 13 pages by 5 widths, 260 checks, zero horizontal overflow.
