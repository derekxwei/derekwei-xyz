// Three visual systems. Same HTML skeleton, same content, different CSS and a
// few structural switches. Each one answers the audit's measured problems in a
// different way:
//   - h2 at 14px/400 was smaller and lighter than 16px body (inverted rank)
//   - ~45 identical "## LABEL" headers site-wide
//   - 34 to 41 panels per page
//   - 54 to 70 monospace elements per page
//   - AO-SINT evidence at 768px inside a 1920px viewport
// No external fonts, no external requests, no motion libraries.

const BASE = `
*,*::before,*::after{box-sizing:border-box}
html{color-scheme:dark}
:root[data-theme='light']{color-scheme:light}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);
  line-height:1.6;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
img{max-width:100%;height:auto;display:block}
a{color:var(--accent)}
a:focus-visible,button:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:3px}
.skip{position:absolute;left:-9999px}
.skip:focus{left:1rem;top:1rem;z-index:99;background:var(--accent);color:var(--bg);padding:.5rem .75rem;border-radius:6px}
.mono{font-family:var(--mono)}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* header shell */
.site-hd{position:sticky;top:0;z-index:20}
.hd-in{display:flex;align-items:center;gap:1rem;max-width:var(--wide);margin:0 auto;padding:.85rem var(--pad)}
.brand{font-family:var(--mono);font-weight:600;text-decoration:none;color:var(--ink);font-size:.95rem;letter-spacing:-.01em}
.brand .t{color:var(--accent)}
nav.pri{margin-left:auto}
nav.pri ul{display:flex;flex-wrap:wrap;gap:.15rem;list-style:none;margin:0;padding:0}
nav.pri a{display:block;padding:.5rem .6rem;font-size:.82rem;text-decoration:none;color:var(--muted);border-radius:6px}
nav.pri a:hover{color:var(--ink);background:var(--surf-2)}
nav.pri a[aria-current=page]{color:var(--accent);background:var(--surf-2);font-weight:600}
nav.pri a:active{transform:translateY(1px)}
.hd-ctl{display:flex;align-items:center;gap:.4rem}
.icon-btn{font:inherit;font-size:.8rem;color:var(--muted);background:var(--surf-2);border:1px solid var(--line);
  border-radius:7px;padding:.45rem .7rem;cursor:pointer;min-height:34px}
.icon-btn:hover{color:var(--ink);border-color:var(--line-2)}
.icon-btn:active{transform:translateY(1px)}
.tmenu{position:absolute;right:var(--pad);top:100%;background:var(--surf-1);border:1px solid var(--line);
  border-radius:9px;padding:.3rem;min-width:9rem;box-shadow:var(--shadow);display:none}
.tmenu[data-open]{display:block}
.tmenu button{display:flex;width:100%;gap:.5rem;align-items:center;font:inherit;font-size:.82rem;text-align:left;
  background:none;border:0;color:var(--muted);padding:.5rem .6rem;border-radius:6px;cursor:pointer;min-height:36px}
.tmenu button:hover{background:var(--surf-2);color:var(--ink)}
.tmenu button:active{transform:translateY(1px)}
.tmenu button[aria-pressed=true]{color:var(--ink)}
.tmenu .ck{visibility:hidden;color:var(--accent)}
.tmenu button[aria-pressed=true] .ck{visibility:visible}
#navtog{display:none}
/* At 320px the brand plus the Theme and Menu buttons do not fit inside a
   header padded to the page gutter, and the two buttons push about 4px past
   the viewport. Tighten the header row only, so the page gutter and every
   other surface keep their normal spacing. */
@media (max-width:400px){
  .hd-in{padding-left:1rem;padding-right:1rem;gap:.5rem}
  .icon-btn{padding-left:.55rem;padding-right:.55rem}
  .tmenu{right:1rem}
}
@media (max-width:900px){
  #navtog{display:inline-block}
  nav.pri ul{position:absolute;left:0;right:0;top:100%;flex-direction:column;background:var(--surf-1);
    border-bottom:1px solid var(--line);padding:.5rem var(--pad);gap:0;display:none;box-shadow:var(--shadow)}
  nav.pri ul[data-open]{display:flex}
  nav.pri a{padding:.7rem .5rem;min-height:44px;display:flex;align-items:center}
}
main{max-width:var(--wide);margin:0 auto;padding:0 var(--pad) 4rem}
/* Prose stacks use display:grid for their paragraph rhythm. A grid track
   defaults to auto, which sizes to max-content, so one long code span or
   quotation pushes the whole text column past the viewport. Pin the single
   column to minmax(0,1fr) so it can shrink, and let long tokens break. */
.prose{max-width:var(--measure);grid-template-columns:minmax(0,1fr);overflow-wrap:break-word}
footer.site{border-top:1px solid var(--line);margin-top:3rem}
footer.site div{max-width:var(--wide);margin:0 auto;padding:1.6rem var(--pad) 2.5rem;color:var(--faint);font-size:.82rem;
  display:flex;flex-wrap:wrap;gap:.5rem 1.5rem;justify-content:space-between}
.proto-tag{font-family:var(--mono);font-size:.72rem;color:var(--faint);border:1px dashed var(--line-2);
  border-radius:5px;padding:.15rem .45rem}
/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;text-decoration:none;
  font-weight:600;cursor:pointer;border:1px solid transparent;font-size:.92rem;min-height:44px;padding:.6rem 1.1rem;
  border-radius:var(--r-sm);transition:background-color .15s ease,border-color .15s ease,color .15s ease}
.btn:active{transform:translateY(1px)}
.btn-1{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.btn-1:hover{background:var(--accent-2);border-color:var(--accent-2)}
.btn-2{background:var(--surf-2);color:var(--ink);border-color:var(--line)}
.btn-2:hover{border-color:var(--line-2)}
.tlink{color:var(--accent);text-decoration:none;font-weight:600;font-size:.9rem}
.tlink:hover{text-decoration:underline}
.tlink:active{transform:translateY(1px);display:inline-block}
/* WCAG 2.5.8 target size. A link sitting in a list row, a table cell, or a
   definition list is a standalone target, so it gets a 24px minimum; a link
   inside a sentence is exempt and is left alone. This is vertical padding on
   an inline box, so the hit area grows without moving any line: using
   inline-flex here would stop long link text from wrapping and reintroduce
   horizontal overflow at 320px. */
li a, td a, dd a, dt a, h2 a, h3 a, h4 a, .tlink, a.tag{padding-block:.22rem}
summary{padding-block:.2rem}
/* generic lists */
ul.clean{list-style:none;margin:0;padding:0}
.dash{padding-left:1.1rem;position:relative;color:var(--muted)}
.dash::before{content:"";position:absolute;left:0;top:.75em;width:.5rem;height:1px;background:var(--accent)}
.meta{color:var(--faint);font-size:.8rem}
/* Purely decorative separator between meta items. It carries no meaning, so
   it is hidden from assistive tech, but it is still rendered text, so it is
   held to the same contrast floor as the items it sits between. */
.sep{color:var(--faint)}
figure{margin:0}
figcaption{color:var(--faint);font-size:.8rem;margin-top:.5rem;line-height:1.5}
details{border:1px solid var(--line);border-radius:var(--r-sm);padding:.7rem .9rem;background:var(--surf-1)}
details summary{cursor:pointer;font-weight:600;font-size:.9rem}
details pre{margin:.6rem 0 0;background:var(--surf-2);padding:.6rem .7rem;border-radius:6px;overflow-x:auto;
  font-family:var(--mono);font-size:.82rem;color:var(--ink)}
table{width:100%;border-collapse:collapse;font-size:.86rem}
th,td{text-align:left;padding:.55rem .6rem;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--faint);font-weight:600;font-size:.76rem;text-transform:uppercase;letter-spacing:.06em}
.tbl-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:var(--r-md)}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms !important;transition-duration:.01ms !important;scroll-behavior:auto !important}
}
`;

/* ============================ CONCEPT A ============================
   Evolved current identity. Same navy/blue/terminal brand, but the type
   hierarchy is inverted back the right way, the "##" motif is reserved for
   primary sections, panels are limited to selectable objects, and evidence
   gets a wider column than prose. Signature: a thin accent "evidence rail"
   that marks blocks backed by a real artifact. */
const A = `
:root{
  --bg:#0a0f1a;--surf-1:#101827;--surf-2:#0c1320;--line:#1e293b;--line-2:#334862;
  --ink:#e8eef6;--muted:#9db0c6;--faint:#6e829f;--accent:#38bdf8;--accent-2:#7dd3fc;
  --on-accent:#06121f;--shadow:0 10px 30px rgb(0 0 0 / .45);
  --sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,"Cascadia Code","JetBrains Mono",Menlo,Consolas,monospace;
  --wide:76rem;--measure:44rem;--evidence:64rem;--pad:1.5rem;--r-sm:7px;--r-md:11px;
}
:root[data-theme='light']{
  --bg:#f6f8fb;--surf-1:#fff;--surf-2:#eef2f7;--line:#d8e0ea;--line-2:#b6c4d6;
  --ink:#101a2e;--muted:#45536b;--faint:#5d6b82;--accent:#0b63c5;--accent-2:#0e7490;
  --on-accent:#fff;--shadow:0 10px 26px rgb(16 26 46 / .10);
}
.site-hd{background:color-mix(in srgb,var(--bg) 90%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
@media (prefers-reduced-transparency:reduce){.site-hd{background:var(--bg);backdrop-filter:none}}
h1{font-size:clamp(2.4rem,5.5vw,3.5rem);line-height:1.02;letter-spacing:-.03em;margin:.4rem 0 0;font-weight:650}
.kicker{font-family:var(--mono);font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);margin:0}
/* Primary section: real landmark. 17px/650 in ink, above body rank. */
h2.sec{font-size:1.0625rem;font-weight:650;letter-spacing:-.01em;color:var(--ink);margin:0 0 .2rem}
h2.sec .h{color:var(--accent);font-family:var(--mono);margin-right:.4rem;font-weight:500}
/* Secondary section: quieter, no ## motif. Not every heading shouts. */
h2.sub{font-size:.8rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--faint);margin:0 0 .2rem}
h3{font-size:1.02rem;font-weight:600;letter-spacing:-.01em;margin:0}
.lede{color:var(--muted);font-size:1.05rem;max-width:40rem}
section{padding:2.6rem 0;border-top:1px solid var(--line)}
section.first{border-top:0;padding-top:2rem}
.sec-note{color:var(--faint);font-size:.85rem;margin:.15rem 0 0}
/* Evidence rail: the signature. Marks anything backed by a real artifact. */
.evidence{max-width:var(--evidence);border-left:2px solid var(--accent);padding-left:1.25rem;margin:1.5rem 0}
.evidence img{border-radius:var(--r-md);border:1px solid var(--line)}
.card{display:block;text-decoration:none;color:inherit;background:var(--surf-1);border:1px solid var(--line);
  border-radius:var(--r-md);padding:1.1rem 1.2rem;transition:border-color .15s ease}
.card:hover{border-color:var(--line-2)}
.card:active{transform:translateY(1px);border-color:var(--accent)}
.card h3{color:var(--ink)}
.card:hover h3{color:var(--accent)}
.grid2{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
@media(min-width:760px){.grid2{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.rowlist li{display:flex;flex-wrap:wrap;gap:.2rem 1.5rem;justify-content:space-between;
  padding:.75rem 0;border-bottom:1px solid var(--line)}
.rowlist li:last-child{border-bottom:0}
.tag{font-family:var(--mono);font-size:.7rem;color:var(--faint);border:1px solid var(--line);
  border-radius:999px;padding:.1rem .5rem}
.badge-ship{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 40%,transparent)}
`;

/* ============================ CONCEPT B ============================
   Technical publication. Near-black canvas, a running metadata column on the
   left at desktop, almost no card borders, and evidence figures that break out
   to a wider measure than the prose. Monospace is reserved for genuinely
   technical strings. Signature: the persistent left rail that carries section
   number, kind, and date like a journal running head. */
const B = `
:root{
  --bg:#07090d;--surf-1:#0d1117;--surf-2:#11161f;--line:#1b2330;--line-2:#2c3848;
  --ink:#eef2f7;--muted:#9aa8bb;--faint:#748192;--accent:#4ea3ff;--accent-2:#8ecbff;
  --on-accent:#04080e;--shadow:0 14px 40px rgb(0 0 0 / .5);
  --sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,"Cascadia Code","JetBrains Mono",Menlo,Consolas,monospace;
  --wide:82rem;--measure:40rem;--evidence:72rem;--pad:1.75rem;--r-sm:4px;--r-md:6px;
}
:root[data-theme='light']{
  --bg:#fbfbfc;--surf-1:#fff;--surf-2:#f1f3f6;--line:#e2e5ea;--line-2:#c3c9d2;
  --ink:#12161c;--muted:#4a525e;--faint:#656e7a;--accent:#0a5fd0;--accent-2:#0e7490;
  --on-accent:#fff;--shadow:0 12px 32px rgb(18 22 28 / .10);
}
.site-hd{background:var(--bg);border-bottom:1px solid var(--line)}
h1{font-size:clamp(2.6rem,6vw,4.1rem);line-height:.98;letter-spacing:-.035em;margin:.5rem 0 0;font-weight:700}
.kicker{font-family:var(--mono);font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin:0}
h2.sec{font-size:1.6rem;font-weight:680;letter-spacing:-.025em;color:var(--ink);margin:0 0 .3rem;line-height:1.15}
h2.sec .h{display:none}
h2.sub{font-size:.74rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--faint);margin:0 0 .3rem}
h3{font-size:1.12rem;font-weight:650;letter-spacing:-.015em;margin:0}
.lede{color:var(--muted);font-size:1.12rem;line-height:1.55;max-width:38rem}
/* Running left rail: section index, kind, and date sit outside the text block. */
section{padding:3.2rem 0;border-top:1px solid var(--line)}
section.first{border-top:0;padding-top:2.2rem}
.railed{display:grid;gap:.6rem 2.5rem;grid-template-columns:minmax(0,1fr)}
@media(min-width:1000px){.railed{grid-template-columns:11rem minmax(0,1fr)}}
.rail{font-family:var(--mono);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);
  line-height:1.7;border-top:2px solid var(--accent);padding-top:.5rem;align-self:start}
.rail .n{display:block;color:var(--accent);font-size:1rem;letter-spacing:0}
.sec-note{color:var(--faint);font-size:.9rem;margin:.2rem 0 0;max-width:38rem}
/* Figures break out wider than the prose measure. */
.evidence{max-width:var(--evidence);margin:1.75rem 0}
.evidence img{border-radius:var(--r-md);border:1px solid var(--line)}
.evidence figcaption{max-width:44rem}
/* Almost no cards: entries are rules + type. */
.entry{display:block;text-decoration:none;color:inherit;padding:1.35rem 0;border-bottom:1px solid var(--line)}
.entry:first-of-type{border-top:1px solid var(--line)}
.entry:hover h3{color:var(--accent)}
.entry:active{transform:translateY(1px)}
.entry p{color:var(--muted);margin:.4rem 0 0;max-width:44rem;font-size:.95rem}
.card{display:block;text-decoration:none;color:inherit;background:var(--surf-1);border:1px solid var(--line);
  border-radius:var(--r-md);padding:1.1rem 1.2rem}
.card:active{transform:translateY(1px)}
.grid2{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
@media(min-width:760px){.grid2{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.rowlist li{display:flex;flex-wrap:wrap;gap:.2rem 1.5rem;justify-content:space-between;
  padding:.8rem 0;border-bottom:1px solid var(--line)}
.rowlist li:last-child{border-bottom:0}
.tag{font-family:var(--mono);font-size:.7rem;color:var(--faint)}
.tag+.tag::before{content:"/";margin-right:.4rem;color:var(--line-2)}
.badge-ship{color:var(--accent)}
`;

/* ============================ CONCEPT C ============================
   Tactile technical interface. Depth is used only to say what is interactive:
   base surface, raised control, floating chrome. Controls are larger, and the
   pressed state is the loudest state in the system. Translucency appears in
   exactly one place (the floating header) and has a reduced-transparency
   fallback. Signature: the raised "control surface" with a real pressed depth
   change, carried consistently across buttons, cards, and the theme control. */
const C = `
:root{
  --bg:#0b1017;--surf-1:#141b25;--surf-2:#1a222e;--line:#243040;--line-2:#38485c;
  --ink:#e9eef5;--muted:#a3b1c2;--faint:#7b8aa0;--accent:#3ba9f0;--accent-2:#7ed0ff;
  --on-accent:#05121d;--shadow:0 14px 34px rgb(0 0 0 / .5);
  --lift:0 1px 0 rgb(255 255 255 / .05) inset,0 2px 6px rgb(0 0 0 / .35);
  --lift-2:0 1px 0 rgb(255 255 255 / .07) inset,0 8px 20px rgb(0 0 0 / .45);
  --press:0 1px 3px rgb(0 0 0 / .5) inset;
  --sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,"Cascadia Code","JetBrains Mono",Menlo,Consolas,monospace;
  --wide:78rem;--measure:42rem;--evidence:66rem;--pad:1.5rem;--r-sm:10px;--r-md:14px;
}
:root[data-theme='light']{
  --bg:#eef1f6;--surf-1:#fff;--surf-2:#f7f9fc;--line:#d5dde8;--line-2:#b0bdcd;
  --ink:#0f1725;--muted:#44526a;--faint:#5c6b82;--accent:#0b63c5;--accent-2:#0e7490;
  --on-accent:#fff;--shadow:0 14px 30px rgb(15 23 37 / .12);
  --lift:0 1px 0 rgb(255 255 255 / .9) inset,0 1px 3px rgb(15 23 37 / .10);
  --lift-2:0 1px 0 rgb(255 255 255 / .9) inset,0 8px 18px rgb(15 23 37 / .12);
  --press:0 1px 3px rgb(15 23 37 / .18) inset;
}
.site-hd{background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:blur(14px) saturate(150%);
  border-bottom:1px solid var(--line)}
@media (prefers-reduced-transparency:reduce){.site-hd{background:var(--bg);backdrop-filter:none}}
h1{font-size:clamp(2.5rem,5.5vw,3.6rem);line-height:1.03;letter-spacing:-.03em;margin:.4rem 0 0;font-weight:680}
.kicker{font-family:var(--mono);font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin:0}
h2.sec{font-size:1.15rem;font-weight:680;letter-spacing:-.015em;color:var(--ink);margin:0 0 .25rem}
h2.sec .h{color:var(--accent);font-family:var(--mono);margin-right:.4rem;font-weight:500}
h2.sub{font-size:.78rem;font-weight:650;letter-spacing:.14em;text-transform:uppercase;color:var(--faint);margin:0 0 .25rem}
h3{font-size:1.05rem;font-weight:650;letter-spacing:-.01em;margin:0}
.lede{color:var(--muted);font-size:1.06rem;max-width:40rem}
section{padding:2.8rem 0}
section+section{border-top:1px solid var(--line)}
.sec-note{color:var(--faint);font-size:.86rem;margin:.15rem 0 0}
.evidence{max-width:var(--evidence);margin:1.6rem 0}
.evidence img{border-radius:var(--r-md);box-shadow:var(--lift-2)}
/* Raised control surface: the tactile signature. */
.btn{box-shadow:var(--lift)}
.btn:active{transform:translateY(1px);box-shadow:var(--press)}
.icon-btn{box-shadow:var(--lift);border-radius:10px}
.icon-btn:active{box-shadow:var(--press);transform:translateY(1px)}
nav.pri a:active{box-shadow:var(--press)}
.tmenu button:active{box-shadow:var(--press)}
.card{display:block;text-decoration:none;color:inherit;background:var(--surf-1);border:1px solid var(--line);
  border-radius:var(--r-md);padding:1.15rem 1.25rem;box-shadow:var(--lift);
  transition:box-shadow .16s ease,border-color .16s ease}
.card:hover{box-shadow:var(--lift-2);border-color:var(--line-2)}
.card:active{transform:translateY(1px);box-shadow:var(--press);border-color:var(--accent)}
.card h3{color:var(--ink)}
.card:hover h3{color:var(--accent)}
.grid2{display:grid;gap:1.1rem;grid-template-columns:minmax(0,1fr)}
@media(min-width:760px){.grid2{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.rowlist li{display:flex;flex-wrap:wrap;gap:.2rem 1.5rem;justify-content:space-between;padding:.8rem 0;border-bottom:1px solid var(--line)}
.rowlist li:last-child{border-bottom:0}
.tag{font-family:var(--mono);font-size:.7rem;color:var(--faint);background:var(--surf-2);
  border:1px solid var(--line);border-radius:999px;padding:.15rem .55rem}
.badge-ship{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,transparent)}
/* Segmented theme control reads as one physical switch. */
.tmenu{border-radius:12px}
`;

/* ============================ CONCEPT D ============================
   Evolved evidence interface. Concept C's structural foundation (scale,
   spacing, button sizing, evidence prominence) carrying Concept B's numbered
   evidence treatment, corrected so the section rule spans the full usable
   content width instead of sitting as a short disconnected line.

   Colour is NOT a prototype palette here: every token below is copied
   verbatim from src/styles/global.css, dark defaults and the
   :root[data-theme='light'] override, so the prototype cannot drift from the
   production brand.

   One deliberate restriction: production's --color-faint (#6b7f9c) measures
   4.35:1 on --color-panel, below the 4.5:1 WCAG AA floor for small text. The
   token is kept exactly as production defines it, and instead the design
   never places faint small text on a panel surface: inside cards and other
   filled surfaces the same role uses --muted (8.0:1). Nothing is recoloured,
   nothing is invented. */
const D = `
:root{
  /* verbatim from global.css @theme (dark defaults) */
  --bg:#0a0f1a;--surf-1:#101827;--surf-2:#0c1320;--line:#1e293b;--line-2:#334862;
  --ink:#e8eef6;--muted:#9db0c6;--faint:#6b7f9c;--accent:#38bdf8;--accent-2:#7dd3fc;
  --prose:#c3cedb;--warn:#fbbf24;--danger:#f87171;--grid-line:rgb(148 163 184 / 0.05);
  /* production paints accent buttons with text-bg, i.e. --color-bg */
  --on-accent:#0a0f1a;
  --shadow:0 12px 34px rgb(0 0 0 / .45);
  --lift:0 1px 2px rgb(0 0 0 / .30);
  --lift-2:0 10px 26px rgb(0 0 0 / .40);
  --press:0 1px 2px rgb(0 0 0 / .45) inset;
  /* verbatim from global.css @theme */
  --sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,"Cascadia Code","JetBrains Mono",Menlo,Consolas,"Liberation Mono",monospace;
  /* layered width system: prose stays readable while evidence goes wide */
  --wide:96rem;      /* outer shell */
  --evidence:82rem;  /* screenshots, diagrams, tables, featured work */
  --mid:60rem;       /* resume-like and list content */
  --measure:44rem;   /* long prose */
  --pad:1.5rem;--r-sm:8px;--r-md:12px;
}
@media (min-width:1400px){:root{--pad:2.5rem}}
:root[data-theme='light']{
  /* verbatim from global.css :root[data-theme='light'] */
  --bg:#f6f8fb;--surf-1:#ffffff;--surf-2:#eef2f7;--line:#d8e0ea;--line-2:#b6c4d6;
  --ink:#101a2e;--muted:#45536b;--faint:#5d6b82;--accent:#0b63c5;--accent-2:#0e7490;
  --prose:#2f3b50;--warn:#b45309;--danger:#b91c1c;--grid-line:rgb(71 85 105 / 0.08);
  --on-accent:#f6f8fb;
  --shadow:0 12px 30px rgb(16 26 46 / .10);
  --lift:0 1px 2px rgb(16 26 46 / .07);
  --lift-2:0 10px 24px rgb(16 26 46 / .10);
  --press:0 1px 2px rgb(16 26 46 / .16) inset;
}
/* Production's focus ring, exactly: 2px accent at 2px offset. */
a:focus-visible,button:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
body{font-size:1.0625rem;line-height:1.65}
.site-hd{background:color-mix(in srgb,var(--bg) 90%,transparent);backdrop-filter:blur(10px);
  border-bottom:1px solid var(--line)}
@media (prefers-reduced-transparency:reduce){.site-hd{background:var(--bg);backdrop-filter:none}}
nav.pri a{font-size:.86rem}

/* ---- hero ---- */
.s.first{position:relative}
/* production's blueprint grid, kept as a quiet identity cue behind the hero */
/* Bleed exactly as far as the page gutter, never further: a fixed -2rem bleed
   pushed 8px past the viewport at every width and produced a horizontal
   scrollbar that no element query could find, because a pseudo-element does
   not appear in the DOM. */
.s.first::before{content:"";position:absolute;top:-1rem;bottom:auto;
  left:calc(var(--pad) * -1);right:calc(var(--pad) * -1);height:22rem;z-index:-1;pointer-events:none;
  background-image:linear-gradient(to right,var(--grid-line) 1px,transparent 1px),
    linear-gradient(to bottom,var(--grid-line) 1px,transparent 1px);
  background-size:36px 36px;
  -webkit-mask-image:linear-gradient(to bottom,#000,transparent);mask-image:linear-gradient(to bottom,#000,transparent)}
h1{font-size:clamp(2.75rem,5.6vw,4.25rem);line-height:1.02;letter-spacing:-.032em;margin:.5rem 0 0;font-weight:680}
.kicker{font-family:var(--mono);font-size:.8rem;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);margin:0}
.lede{color:var(--prose);font-size:1.2rem;line-height:1.6;max-width:52rem}

/* ---- section system: full-width rule, then number, category, title ---- */
section{padding:0}
.s{margin-top:5.5rem;border-top:1px solid var(--line);padding-top:1.6rem}
.s.first{margin-top:0;border-top:0;padding-top:3.5rem}
.secbar{display:flex;align-items:baseline;gap:1.1rem;font-family:var(--mono);font-size:.78rem;
  letter-spacing:.16em;text-transform:uppercase;line-height:1}
.secbar .n{color:var(--accent);font-weight:650}
.secbar .cat{color:var(--faint)}
h2.sec{font-family:var(--sans);font-size:clamp(1.6rem,2.1vw,2.1rem);font-weight:680;letter-spacing:-.025em;
  color:var(--ink);margin:.85rem 0 0;line-height:1.15}
h2.sub{font-family:var(--sans);font-size:1.25rem;font-weight:650;letter-spacing:-.02em;color:var(--ink);margin:.85rem 0 0}
h3{font-size:1.1rem;font-weight:650;letter-spacing:-.012em;margin:0;color:var(--ink)}
.sec-note{color:var(--muted);font-size:1rem;margin:.6rem 0 0;max-width:var(--measure)}
.prose{color:var(--prose);max-width:var(--measure)}
.prose p{margin:0}
.rowlist,.mid{max-width:var(--mid)}

/* ---- evidence: the widest tier ---- */
.evidence{max-width:var(--evidence);margin:2rem 0 0}
.evidence img{border-radius:var(--r-md);border:1px solid var(--line)}
figcaption{font-size:.86rem;color:var(--muted);margin-top:.7rem;max-width:var(--evidence)}
.tbl-wrap{max-width:var(--evidence)}

/* ---- featured selected work ---- */
.feature{max-width:var(--evidence)}
.feature h3{font-size:clamp(1.35rem,1.9vw,1.75rem);letter-spacing:-.02em}
.feature .why{color:var(--prose);max-width:46rem;margin:.7rem 0 0;font-size:1.05rem}
.feature .result{margin:.8rem 0 0;font-weight:650;color:var(--accent)}
.supporting{margin-top:3.2rem}
.supporting h3.subhead{font-family:var(--mono);font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;
  color:var(--faint);font-weight:600}

/* ---- controls: Concept C sizing, production colour ---- */
.btn{min-height:48px;padding:.72rem 1.4rem;font-size:.98rem;border-radius:var(--r-sm);box-shadow:var(--lift)}
.btn-1{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.btn-1:hover{background:var(--accent-2);border-color:var(--accent-2)}
.btn-2{background:var(--surf-1);color:var(--ink);border-color:var(--line)}
.btn-2:hover{border-color:var(--line-2)}
.btn:active{transform:translateY(1px);box-shadow:var(--press)}
.icon-btn{min-height:40px;border-radius:var(--r-sm);box-shadow:var(--lift)}
.icon-btn:active{transform:translateY(1px);box-shadow:var(--press)}
nav.pri a:active{transform:translateY(1px)}
.tmenu{border-radius:10px}
.tmenu button:active{transform:translateY(1px)}
.tlink{font-size:.98rem}

/* ---- cards ---- */
.card{display:block;text-decoration:none;color:inherit;background:var(--surf-1);border:1px solid var(--line);
  border-radius:var(--r-md);padding:1.35rem 1.45rem;box-shadow:var(--lift);
  transition:border-color .15s ease,box-shadow .15s ease}
.card:hover{border-color:var(--line-2);box-shadow:var(--lift-2)}
.card:active{transform:translateY(1px);box-shadow:var(--press);border-color:var(--accent)}
.card h3{color:var(--ink)}
.card:hover h3{color:var(--accent)}
/* --color-faint is 4.35:1 on --color-panel, so panel surfaces use --muted for
   the same role. The token itself is untouched. */
.card .meta,.card .tag,.card p{color:var(--muted)}
.grid2{display:grid;gap:1.4rem;grid-template-columns:minmax(0,1fr)}
@media(min-width:900px){.grid2{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.rowlist li{display:flex;flex-wrap:wrap;gap:.2rem 1.5rem;justify-content:space-between;
  padding:.9rem 0;border-bottom:1px solid var(--line)}
.rowlist li:last-child{border-bottom:0}
.tag{font-family:var(--mono);font-size:.72rem;color:var(--muted);background:var(--surf-2);
  border:1px solid var(--line);border-radius:999px;padding:.2rem .6rem}
.badge-ship{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,transparent)}
.meta{color:var(--faint);font-size:.86rem}
`;

module.exports = {
  BASE,
  concepts: [
    { id: 'concept-a-evolved-dark', name: 'Concept A: Evolved current identity', css: A, hashHeadings: true, cardStyle: 'card', rail: false },
    { id: 'concept-b-technical-publication', name: 'Concept B: Technical publication', css: B, hashHeadings: false, cardStyle: 'entry', rail: true },
    { id: 'concept-c-tactile-technical', name: 'Concept C: Tactile technical interface', css: C, hashHeadings: true, cardStyle: 'card', rail: false },
    { id: 'concept-d-evolved-evidence', name: 'Concept D: Evolved evidence interface', css: D, hashHeadings: false, cardStyle: 'card', rail: false, sectionStyle: 'bar' },
  ],
};
