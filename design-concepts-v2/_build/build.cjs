// Generates three whole-site prototypes from one shared content model.
// Run: node _build/build.js   (from design-concepts-v2/)
// No dependencies, no network, no production files touched.
const fs = require('fs');
const path = require('path');
const C = require('./content.cjs');
const { BASE, concepts } = require('./themes.cjs');

const OUT = path.join(__dirname, '..');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------- shell ----------
function shell(cfg, { page, title, body }) {
  const nav = C.NAV.map(
    (n) => `<li><a href="${n.href}"${n.href === page ? ' aria-current="page"' : ''}>${n.label}</a></li>`
  ).join('');
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · ${esc(cfg.name)}</title>
<style>${BASE}${cfg.css}</style>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-hd">
  <div class="hd-in">
    <a class="brand" href="index.html"${page === 'index.html' ? ' aria-current="page"' : ''}><span class="t">~/</span>${C.SITE.brand}</a>
    <nav class="pri" aria-label="Primary"><ul id="navmenu">${nav}</ul></nav>
    <div class="hd-ctl">
      <button class="icon-btn" id="themebtn" aria-haspopup="true" aria-expanded="false" aria-controls="thememenu">Theme</button>
      <button class="icon-btn" id="navtog" aria-expanded="false" aria-controls="navmenu">Menu</button>
    </div>
    <div class="tmenu" id="thememenu">
      <button data-theme-value="system" aria-pressed="false"><span class="ck" aria-hidden="true">&#10003;</span>System</button>
      <button data-theme-value="dark" aria-pressed="false"><span class="ck" aria-hidden="true">&#10003;</span>Dark</button>
      <button data-theme-value="light" aria-pressed="false"><span class="ck" aria-hidden="true">&#10003;</span>Light</button>
    </div>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site"><div>
  <span>&copy; 2026 ${C.SITE.name} · Static site, no cookies, no trackers</span>
  <span class="proto-tag">design prototype, not the live site</span>
</div></footer>
<script>
(function(){
  var KEY='dwproto-theme', root=document.documentElement;
  var mq=window.matchMedia('(prefers-color-scheme: dark)');
  function read(){try{var v=localStorage.getItem(KEY);return v==='dark'||v==='light'?v:'system'}catch(e){return 'system'}}
  var pref=read();
  function apply(){
    root.setAttribute('data-theme', pref==='system' ? (mq.matches?'dark':'light') : pref);
    document.querySelectorAll('[data-theme-value]').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.themeValue===pref));
    });
  }
  document.querySelectorAll('[data-theme-value]').forEach(function(b){
    b.addEventListener('click', function(){
      pref=b.dataset.themeValue; try{localStorage.setItem(KEY,pref)}catch(e){}
      apply(); menu.removeAttribute('data-open'); tb.setAttribute('aria-expanded','false'); tb.focus();
    });
  });
  mq.addEventListener('change', function(){ if(pref==='system') apply(); });
  var tb=document.getElementById('themebtn'), menu=document.getElementById('thememenu');
  tb.addEventListener('click', function(){
    var open=menu.hasAttribute('data-open');
    if(open){menu.removeAttribute('data-open')}else{menu.setAttribute('data-open','')}
    tb.setAttribute('aria-expanded', String(!open));
  });
  var nt=document.getElementById('navtog'), nm=document.getElementById('navmenu');
  nt.addEventListener('click', function(){
    var open=nm.hasAttribute('data-open');
    if(open){nm.removeAttribute('data-open')}else{nm.setAttribute('data-open','')}
    nt.setAttribute('aria-expanded', String(!open));
  });
  document.addEventListener('keydown', function(e){
    if(e.key!=='Escape') return;
    if(menu.hasAttribute('data-open')){menu.removeAttribute('data-open');tb.setAttribute('aria-expanded','false');tb.focus()}
    if(nm.hasAttribute('data-open')){nm.removeAttribute('data-open');nt.setAttribute('aria-expanded','false');nt.focus()}
  });
  document.addEventListener('click', function(e){
    if(menu.hasAttribute('data-open') && !menu.contains(e.target) && e.target!==tb){
      menu.removeAttribute('data-open'); tb.setAttribute('aria-expanded','false');
    }
  });
  apply();
})();
</script>
</body>
</html>`;
}

// ---------- section helper ----------
// Concept B renders a running left rail; A and C render a heading with an
// optional "##" motif reserved for primary sections.
let secIndex = 0;
function sec(cfg, o, inner) {
  const first = o.first ? ' first' : '';
  const id = o.id ? ` id="${o.id}"` : '';

  // Concept D: a rule spanning the full usable content width, with the number
  // and category sitting directly beneath its start, then the title. The
  // number and category only appear where the caller supplies them, so the
  // numbered sequence stays on the homepage instead of being stamped onto
  // every detail page.
  if (cfg.sectionStyle === 'bar') {
    const bar = o.num
      ? `<p class="secbar"><span class="n">${esc(o.num)}</span><span class="cat">${esc(o.cat || o.kind || '')}</span></p>`
      : '';
    return `<section class="s${first}"${id}>${bar}<h2 class="sec">${esc(o.title)}</h2>${
      o.note ? `<p class="sec-note">${esc(o.note)}</p>` : ''
    }${inner}</section>`;
  }

  if (o.primary === false) {
    return `<section class="s${first}"${id}><h2 class="sub">${esc(o.title)}</h2>${
      o.note ? `<p class="sec-note">${esc(o.note)}</p>` : ''
    }${inner}</section>`;
  }
  secIndex += 1;
  const n = String(secIndex).padStart(2, '0');
  const head = `<h2 class="sec">${cfg.hashHeadings ? '<span class="h" aria-hidden="true">##</span>' : ''}${esc(o.title)}</h2>${
    o.note ? `<p class="sec-note">${esc(o.note)}</p>` : ''
  }`;
  if (cfg.rail) {
    return `<section class="s${first}"${id}><div class="railed">
      <div class="rail"><span class="n">${n}</span>${esc(o.kind || 'Section')}</div>
      <div>${head}${inner}</div></div></section>`;
  }
  return `<section class="s${first}"${id}>${head}${inner}</section>`;
}

function fig(src, alt, caption, cls) {
  const d = C.DIM[src];
  if (!d) throw new Error('no intrinsic dimensions recorded for ' + src);
  return `<figure class="evidence${cls ? ' ' + cls : ''}"><img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async" width="${d[0]}" height="${d[1]}">
    ${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}</figure>`;
}

function projectCard(cfg, p) {
  const tags = p.tags.slice(0, 2).map((t) => `<span class="tag">${esc(t)}</span>`).join(' ');
  const status = `<span class="tag ${p.status === 'shipped' ? 'badge-ship' : ''}">${p.status === 'in-progress' ? 'in progress' : p.status}</span>`;
  const href = p.href || 'projects.html';
  if (cfg.cardStyle === 'entry') {
    return `<a class="entry" href="${href}">
      <div style="display:flex;flex-wrap:wrap;gap:.4rem 1rem;justify-content:space-between;align-items:baseline">
        <h3>${esc(p.title)}</h3><span class="meta mono">${esc(p.date)}</span></div>
      <p>${esc(p.description)}</p>
      <div style="margin-top:.6rem;display:flex;gap:.6rem;flex-wrap:wrap">${status} ${tags}</div></a>`;
  }
  return `<a class="card" href="${href}">
    <div style="display:flex;flex-wrap:wrap;gap:.4rem 1rem;justify-content:space-between;align-items:baseline">
      <h3>${esc(p.title)}</h3><span class="meta mono">${esc(p.date)}</span></div>
    <p style="color:var(--muted);margin:.5rem 0 0;font-size:.93rem">${esc(p.description)}</p>
    <div style="margin-top:.8rem;display:flex;gap:.5rem;flex-wrap:wrap">${status} ${tags}</div></a>`;
}

// ---------- pages ----------
function home(cfg) {
  const D = cfg.sectionStyle === 'bar';

  // Concept D gives AO-SINT the dominant treatment: the landscape evidence
  // image at the widest tier, then the context, placement, method, and action.
  const proof = D
    ? `${fig(C.IMG.ierochos, C.ALT.ierochos, 'BroncoCTF 2026 challenge screenshot: the foreground pillar and multi-island sightline placed the character on Ierochos.')}
  <div class="feature" style="margin-top:1.6rem">
    <p class="kicker">BroncoCTF 2026 &middot; OSINT</p>
    <h3 style="margin-top:.5rem"><a href="ao-sint.html" style="text-decoration:none;color:inherit">AO-SINT: evidence-first game geolocation</a></h3>
    <p class="why">Used topography, architecture, map geometry, and sightline reconstruction to identify four Arcane Odyssey locations from four screenshots.</p>
    <p class="result">${esc(C.WRITEUP.teamResult)}</p>
    <p style="margin:1.2rem 0 0"><a class="btn btn-1" href="ao-sint.html">Read the writeup</a></p>
  </div>`
    : `
  ${fig(C.IMG.ierochos, C.ALT.ierochos, 'BroncoCTF 2026 challenge screenshot: the foreground pillar and multi-island sightline placed the character on Ierochos.')}
  <div style="max-width:var(--evidence)">
    <p class="kicker">BroncoCTF 2026 &middot; OSINT</p>
    <h3 style="margin-top:.35rem;font-size:1.35rem"><a href="ao-sint.html" style="text-decoration:none;color:var(--ink)">AO-SINT: evidence-first game geolocation</a></h3>
    <p style="color:var(--muted);max-width:42rem;margin:.5rem 0 0">Used topography, architecture, map geometry, and sightline reconstruction to identify four Arcane Odyssey locations from four screenshots.</p>
    <p style="margin:.6rem 0 0;font-weight:600;color:var(--accent);font-size:.95rem">${esc(C.WRITEUP.teamResult)}</p>
    <p style="margin:.9rem 0 0"><a class="tlink" href="ao-sint.html">Read the writeup &rarr;</a></p>
  </div>`;

  // Both supporting projects only have tall portrait diagrams (560x712 and
  // 560x596), which would be illegible squeezed into a wide thumbnail, so
  // they get a text-first treatment and a clearly subordinate label.
  const secondary = D
    ? `<div class="supporting">
      <h3 class="subhead">Supporting work</h3>
      <div class="grid2" style="margin-top:1rem;max-width:var(--evidence)">
        ${projectCard(cfg, C.PROJECTS[0])}
        ${projectCard(cfg, C.PROJECTS[2])}
      </div></div>`
    : `<div class="grid2" style="margin-top:2rem">
    ${projectCard(cfg, C.PROJECTS[0])}
    ${projectCard(cfg, C.PROJECTS[2])}
  </div>`;

  const comptia = C.CERTIFICATIONS.filter((c) => c.issuer === 'CompTIA');
  const creds = `<p style="font-size:1.02rem;color:var(--muted);margin:.9rem 0 0">
      <strong style="color:var(--ink)">5x CompTIA certified:</strong>
      ${comptia.map((c) => `<a href="${c.verify}" rel="noopener noreferrer">${esc(c.short)}</a>`).join(' <span class="sep" aria-hidden="true">·</span> ')}
    </p>
    <p style="font-size:1.02rem;color:var(--muted);margin:.4rem 0 0">
      <strong style="color:var(--ink)">Also earned:</strong>
      <a href="${C.CERTIFICATIONS[5].verify}" rel="noopener noreferrer">AWS Certified AI Practitioner</a>
      <span class="sep" aria-hidden="true">·</span>
      <a href="${C.CERTIFICATIONS[6].verify}" rel="noopener noreferrer">Microsoft Office Specialist: Word Associate</a>
    </p>
    <p style="margin:1rem 0 0"><a class="tlink" href="achievements.html">All verified credentials &rarr;</a></p>`;

  const exp = `<ul class="clean rowlist" style="margin-top:1.2rem;max-width:52rem">
    ${C.EXPERIENCE.map((j) => `<li><span><strong>${esc(j.role)}</strong> <span style="color:var(--muted)">· ${esc(j.org)}</span></span><span class="meta mono">${esc(j.period)}</span></li>`).join('')}
  </ul>
  <p style="margin:1rem 0 0"><a class="tlink" href="resume.html">Full resume &rarr;</a></p>`;

  const direction = `<ul class="clean" style="margin-top:1.1rem;display:grid;gap:.55rem;max-width:40rem">
    ${C.ABOUT.direction.map((d) => `<li class="dash">${esc(d.text)}${d.note ? ` <span style="color:var(--faint)">(${esc(d.note)})</span>` : ''}</li>`).join('')}
  </ul>`;

  const body = `
<section class="s first">
  <p class="kicker">${esc(C.HERO.kicker)}</p>
  <h1>${esc(C.SITE.name)}</h1>
  <p class="lede" style="margin-top:1.1rem">${esc(C.HERO.lede)}</p>
  <p class="meta" style="margin-top:1rem;max-width:44rem">${esc(C.HERO.credentialLine)}</p>
  <p class="meta" style="margin-top:.5rem">${esc(C.SITE.clearance)}</p>
  <div style="display:flex;flex-wrap:wrap;gap:.75rem;align-items:center;margin-top:1.8rem">
    <a class="btn btn-1" href="#work">View selected work</a>
    <a class="btn btn-2" href="${C.SITE.resumePdf}">Download resume (PDF)</a>
    <a class="tlink" href="contact.html">Contact &rarr;</a>
  </div>
</section>
${sec(cfg, { title: 'Selected work', kind: 'Evidence', cat: 'Evidence', num: '01', id: 'work', note: 'Real work, each with its own writeup or project page.' }, proof + secondary)}
${sec(cfg, { title: D ? 'Relevant experience' : 'Experience', kind: 'History', cat: 'Experience', num: '02' }, exp)}
${sec(cfg, { title: 'Verified credentials', kind: 'Credentials', cat: 'Credentials', num: '03' }, creds)}
${sec(cfg, { title: 'Current direction', kind: 'Now', cat: 'Direction', num: '04', primary: D ? true : false }, direction)}
${sec(cfg, { title: D ? 'Contact and résumé' : 'Contact', kind: 'Contact', cat: 'Contact', num: '05' },
  D
    ? `<p class="prose" style="margin:.9rem 0 0">Open to cybersecurity internships, CTF collaboration, and security projects.</p>
       <div style="display:flex;flex-wrap:wrap;gap:.85rem;margin-top:1.5rem">
         <a class="btn btn-1" href="contact.html">Contact Derek</a>
         <a class="btn btn-2" href="${C.SITE.resumePdf}">Download resume (PDF)</a>
       </div>`
    : `<p style="color:var(--muted);max-width:36rem;margin:.9rem 0 0">Open to cybersecurity internships, CTF collaboration, and security projects.</p>
   <p style="margin:1.4rem 0 0"><a class="btn btn-1" href="contact.html">Contact Derek</a></p>`)}`;
  return shell(cfg, { page: 'index.html', title: C.SITE.name, body });
}

function projects(cfg) {
  const body = `
<section class="s first">
  <p class="kicker">~/projects</p>
  <h1 style="font-size:clamp(2rem,4vw,2.6rem)">Projects</h1>
  <p class="lede" style="margin-top:.9rem">Practical security tooling and infrastructure built to learn by doing. Each entry documents what it is, how it is built, and where it actually stands.</p>
</section>
${sec(cfg, { title: 'All projects', kind: 'Index', first: false },
  cfg.cardStyle === 'entry'
    ? C.PROJECTS.map((p) => projectCard(cfg, p)).join('')
    : `<div class="grid2" style="margin-top:1.2rem">${C.PROJECTS.map((p) => projectCard(cfg, p)).join('')}</div>`)}`;
  return shell(cfg, { page: 'projects.html', title: 'Projects', body });
}

function projectDetail(cfg) {
  const p = C.PROJECTS[0];
  const body = `
<section class="s first">
  <p style="margin:0 0 1rem"><a class="tlink" href="projects.html">&larr; All projects</a></p>
  <p class="kicker">Project &middot; in progress</p>
  <h1 style="font-size:clamp(2rem,4vw,2.7rem)">${esc(p.title)}</h1>
  <p class="lede" style="margin-top:.9rem">${esc(p.description)}</p>
  <p class="meta" style="margin-top:.8rem">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join(' ')}</p>
</section>
${sec(cfg, { title: 'Architecture', kind: 'Diagram' },
  fig(C.IMG.cptsDiagram, C.ALT.cptsDiagram, 'Authorized study material, Claude processing, structured notes, review artifacts, human accuracy review, then the Obsidian vault.'))}
${sec(cfg, { title: 'How it works', kind: 'Method' },
  `<div class="prose" style="color:var(--muted);margin-top:1rem">
    <p>Study material is pasted into a local workflow that produces structured notes, checklists, and review artifacts. Every generated artifact passes a human accuracy review before it reaches the vault.</p>
    <p>The pipeline exists to make revision reproducible: the same source produces the same structure, and the review step is where correctness is decided. Certified Penetration Testing Specialist (CPTS) preparation is the current use case. The certification is not yet held.</p>
  </div>
  <ol class="clean" style="margin-top:1.2rem;display:grid;gap:.5rem;max-width:40rem;counter-reset:step">
    ${['Authorized study material', 'Claude Code and Claude Haiku processing', 'Structured notes and checklists', 'Review artifacts', 'Human accuracy review', 'Obsidian vault']
      .map((s, i) => `<li class="dash"><span class="mono" style="color:var(--accent)">${String(i + 1).padStart(2, '0')}</span> &nbsp;${esc(s)}</li>`).join('')}
  </ol>`)}`;
  return shell(cfg, { page: 'projects.html', title: p.title, body });
}

function resume(cfg) {
  const certs = C.CERTIFICATIONS.map(
    (c) => `<li><span><a href="${c.verify}" rel="noopener noreferrer">${esc(c.name)}</a>
      <span style="color:var(--faint)"> · ${esc(c.issuer)}</span></span>${c.year ? `<span class="meta mono">${esc(c.year)}</span>` : ''}</li>`
  ).join('');
  const body = `
<section class="s first">
  <p class="kicker">~/resume</p>
  <h1 style="font-size:clamp(2rem,4vw,2.6rem)">Resume</h1>
  <p class="lede" style="margin-top:.9rem">Education, certifications, competition results, and experience.</p>
  <div style="display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.5rem">
    <a class="btn btn-1" href="${C.SITE.resumePdf}">Download PDF</a>
    <a class="btn btn-2" href="achievements.html">Achievements</a>
  </div>
  <p class="meta" style="margin-top:1.2rem">
    <a href="mailto:${C.SITE.email}">${C.SITE.email}</a> &middot;
    <a href="tel:${C.SITE.phoneE164}">${C.SITE.phoneDisplay}</a> &middot;
    <a href="${C.SITE.linkedin}" rel="noopener noreferrer">LinkedIn</a> &middot; ${esc(C.SITE.location)}
  </p>
  <p class="meta" style="margin-top:.35rem">${esc(C.SITE.clearance)}</p>
</section>
${sec(cfg, { title: 'Education', kind: 'Education' },
  `<ul class="clean rowlist" style="margin-top:1rem;max-width:54rem">${C.EDUCATION.map((e) =>
    `<li><span><strong>${esc(e.program)}</strong><br><span style="color:var(--muted)">${esc(e.school)}</span>${e.note ? `<br><span class="meta">${esc(e.note)}</span>` : ''}</span><span class="meta mono">${esc(e.detail)}</span></li>`).join('')}</ul>`)}
${sec(cfg, { title: 'Scholarships', kind: 'Awards' },
  `<ul class="clean rowlist" style="margin-top:1rem;max-width:54rem">${C.SCHOLARSHIPS.map((s) =>
    `<li><span><strong>${esc(s.name)}</strong><br><span style="color:var(--muted)">${esc(s.institution)}</span></span><span class="meta mono">${esc(s.amount)} · ${esc(s.year)}</span></li>`).join('')}</ul>`)}
${sec(cfg, { title: 'Certifications', kind: 'Credentials' },
  `<ul class="clean rowlist" style="margin-top:1rem;max-width:54rem">${certs}</ul>
   <p style="margin:1rem 0 0"><a class="tlink" href="${C.SITE.credly}" rel="noopener noreferrer">View all verified credentials on Credly &rarr;</a></p>
   <p class="meta" style="margin-top:1rem">In progress: ${esc(C.ROADMAP[0].items[0])} &middot; Next: ${esc(C.ROADMAP[1].items[0])}</p>`)}
${sec(cfg, { title: 'Selected technical writing', kind: 'Writing' },
  `<div style="margin-top:1rem;max-width:54rem">
     <div style="display:flex;flex-wrap:wrap;gap:.3rem 1rem;justify-content:space-between;align-items:baseline">
       <h3><a href="ao-sint.html" style="text-decoration:none;color:var(--ink)">AO-SINT: evidence-first game geolocation</a></h3>
       <span class="meta mono">BroncoCTF 2026 · OSINT</span></div>
     <p style="color:var(--muted);margin:.5rem 0 0">Used topography, architecture, map geometry, and sightline reconstruction to identify four Arcane Odyssey locations. ${esc(C.WRITEUP.teamResult)}</p>
     <p style="margin:.7rem 0 0"><a class="tlink" href="ao-sint.html">Read the AO-SINT writeup &rarr;</a></p>
   </div>`)}
${sec(cfg, { title: 'Experience', kind: 'History' },
  C.EXPERIENCE.map((j) => `<div style="margin-top:1.3rem;max-width:54rem">
      <div style="display:flex;flex-wrap:wrap;gap:.3rem 1rem;justify-content:space-between;align-items:baseline">
        <h3>${esc(j.role)} <span style="font-weight:400;color:var(--muted)">· ${esc(j.org)}</span></h3>
        <span class="meta mono">${esc(j.period)}</span></div>
      <ul class="clean" style="margin-top:.6rem;display:grid;gap:.4rem">${j.bullets.map((b) => `<li class="dash">${esc(b)}</li>`).join('')}</ul>
    </div>`).join(''))}
${sec(cfg, { title: 'Core areas', kind: 'Skills', primary: false },
  `<p style="color:var(--muted);margin-top:.8rem;max-width:54rem">${C.CORE_AREAS.map(esc).join(' &middot; ')}</p>`)}
${sec(cfg, { title: 'Technical skills', kind: 'Skills' },
  `<dl style="margin:1rem 0 0;display:grid;gap:.9rem;max-width:56rem">${C.SKILL_GROUPS.map((g) =>
    `<div><dt style="font-weight:650;font-size:.9rem">${esc(g.label)}</dt>
     <dd style="margin:.15rem 0 0;color:var(--muted);font-size:.93rem">${esc(g.items)}</dd></div>`).join('')}</dl>`)}
${sec(cfg, { title: 'Leadership and activities', kind: 'Leadership', primary: false },
  `<ul class="clean" style="margin-top:.9rem;display:grid;gap:.7rem;max-width:54rem">${C.LEADERSHIP.map((l) =>
    `<li class="dash"><strong>${esc(l.role)}</strong> <span class="meta">(${esc(l.period)})</span><br><span style="color:var(--muted)">${esc(l.detail)}</span></li>`).join('')}</ul>`)}`;
  return shell(cfg, { page: 'resume.html', title: 'Resume', body });
}

function achievements(cfg) {
  const certCard = (c) => `<div class="card" style="cursor:default">
    <h3 style="font-size:.98rem"><a href="${c.verify}" rel="noopener noreferrer" style="text-decoration:none">${esc(c.name)}</a></h3>
    <p class="meta" style="margin:.35rem 0 0">${esc(c.issuer)}${c.year ? ' · ' + esc(c.year) : ''}</p>
    ${c.issued || c.expires ? `<p class="meta" style="margin:.2rem 0 0">${c.issued ? 'Issued ' + esc(c.issued) : ''}${c.issued && c.expires ? ' · ' : ''}${c.expires ? 'Expires ' + esc(c.expires) : ''}</p>` : ''}
  </div>`;
  const body = `
<section class="s first">
  <p class="kicker">~/achievements</p>
  <h1 style="font-size:clamp(2rem,4vw,2.6rem)">Achievements</h1>
  <p class="lede" style="margin-top:.9rem">Certifications, competition results, scholarships, and leadership. Placements are verifiable and stated only where they are.</p>
</section>
${sec(cfg, { title: 'Certifications', kind: 'Credentials' },
  `<div class="grid2" style="margin-top:1.1rem">${C.CERTIFICATIONS.map(certCard).join('')}</div>
   <h3 style="margin-top:1.8rem;font-size:.82rem;text-transform:uppercase;letter-spacing:.12em;color:var(--faint)">CompTIA stackable certifications</h3>
   <div class="grid2" style="margin-top:.7rem">${C.STACKABLE.map(certCard).join('')}</div>
   <p class="meta" style="margin-top:.9rem;max-width:46rem">${esc(C.STACKABLE_NOTE)}</p>
   <p style="margin:1rem 0 0"><a class="tlink" href="${C.SITE.credly}" rel="noopener noreferrer">View all verified credentials on Credly &rarr;</a></p>`)}
${sec(cfg, { title: 'Awards and recognition', kind: 'Awards' },
  `<ul class="clean" style="margin-top:1rem;display:grid;gap:.5rem;max-width:50rem">
     ${C.AWARDS.map((a) => `<li class="dash">${esc(a)}</li>`).join('')}
     <li class="dash">${esc(C.NJHS.name)}, ${esc(C.NJHS.year)} · <a href="${C.NJHS.verify}" rel="noopener noreferrer">Verify badge</a></li>
   </ul>`)}
${sec(cfg, { title: 'Scholarships', kind: 'Awards', primary: false },
  `<ul class="clean rowlist" style="margin-top:.9rem;max-width:50rem">${C.SCHOLARSHIPS.map((s) =>
    `<li><span><strong>${esc(s.name)}</strong><br><span style="color:var(--muted)">${esc(s.institution)}</span></span><span class="meta mono">${esc(s.amount)} · ${esc(s.year)}</span></li>`).join('')}</ul>`)}
${sec(cfg, { title: 'Competition results', kind: 'Results' },
  `<div style="margin-top:1.1rem;max-width:52rem">
     <div style="display:flex;flex-wrap:wrap;gap:.3rem 1rem;justify-content:space-between;align-items:baseline">
       <h3>${esc(C.NCL.name)}</h3><span class="meta mono">${esc(C.NCL.period)}</span></div>
     <ul class="clean" style="margin-top:.5rem;display:grid;gap:.4rem">${C.NCL.bullets.map((b) => `<li class="dash">${esc(b)}</li>`).join('')}</ul>
   </div>
   <ul class="clean rowlist" style="margin-top:1.4rem;max-width:52rem">
     ${C.COMPETITIONS.map((c) => `<li><span><strong>${esc(c.name)}</strong><br><span class="meta">${esc(c.result)}</span>${
       c.writeup ? `<br><a class="tlink" href="${c.writeup.href}">${esc(c.writeup.label)} &rarr;</a>` : ''}</span></li>`).join('')}
   </ul>
   <p class="meta" style="margin-top:1rem">Also competed in ${C.COMPETITIONS_NO_RESULT.map(esc).join(' and ')}.</p>`)}`;
  return shell(cfg, { page: 'achievements.html', title: 'Achievements', body });
}

function ctfIndex(cfg) {
  const card = `<a class="${cfg.cardStyle === 'entry' ? 'entry' : 'card'}" href="ao-sint.html">
    <div style="display:flex;flex-wrap:wrap;gap:.3rem 1rem;justify-content:space-between;align-items:baseline">
      <h3>${esc(C.WRITEUP.title)}</h3><span class="meta mono">${esc(C.WRITEUP.event)} · ${esc(C.WRITEUP.date)}</span></div>
    <p style="color:var(--muted);margin:.5rem 0 0;max-width:46rem">${esc(C.WRITEUP.description)}</p>
    <p class="meta" style="margin:.5rem 0 0">${esc(C.WRITEUP.teamResult)}</p>
    <div style="margin-top:.7rem;display:flex;gap:.5rem;flex-wrap:wrap">
      <span class="tag">${esc(C.WRITEUP.category)}</span><span class="tag">${esc(C.WRITEUP.difficulty)}</span>
      ${C.WRITEUP.tags.slice(0, 3).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
    </div></a>`;
  const body = `
<section class="s first">
  <p class="kicker">~/ctf</p>
  <h1 style="font-size:clamp(2rem,4vw,2.6rem)">CTF writeups</h1>
  <p class="lede" style="margin-top:.9rem">Offensive-security methodology from Capture the Flag competitions, written to learn in public: reasoning and approach over flag spoilers.</p>
  <p class="meta" style="margin-top:.8rem">Also under writing: <a href="lab.html">Lab notes</a></p>
</section>
${sec(cfg, { title: 'Published writeups', kind: 'Index' }, `<div style="margin-top:1.1rem">${card}</div>`)}
${sec(cfg, { title: 'How I structure a writeup', kind: 'Method', primary: false },
  `<ol class="clean" style="margin-top:.9rem;display:grid;gap:.4rem;max-width:44rem">
    ${['Challenge, event, category, and difficulty', 'Goal and initial observations', 'Enumeration and recon',
       'Failed attempts (the useful part)', 'Breakthrough and solution summary', 'Defensive takeaway', 'Lessons learned']
      .map((s, i) => `<li class="dash"><span class="mono" style="color:var(--accent)">${String(i + 1).padStart(2, '0')}</span> &nbsp;${esc(s)}</li>`).join('')}
  </ol>`)}`;
  return shell(cfg, { page: 'ctf.html', title: 'CTF writeups', body });
}

function aoSint(cfg) {
  const w = C.WRITEUP;
  const chapter = (ch) => `
  <div style="margin-top:2.4rem">
    <h3 style="font-size:1.25rem"><span class="mono" style="color:var(--accent)">${String(ch.n).padStart(2, '0')}</span> &nbsp;${esc(ch.name)}</h3>
    ${fig(ch.image, ch.alt, ch.caption)}
    <div class="prose" style="color:var(--muted);display:grid;gap:.7rem;margin-top:1rem">
      <p><strong style="color:var(--ink)">Observation.</strong> ${esc(ch.observation)}</p>
      <p><strong style="color:var(--ink)">False lead.</strong> ${esc(ch.falseLead)}</p>
      <p><strong style="color:var(--ink)">Evidence.</strong> ${esc(ch.evidence)}</p>
    </div>
    ${ch.secondImage ? fig(ch.secondImage, ch.secondAlt, ch.secondCaption) : ''}
    <p style="margin-top:1rem"><span class="meta">Answer</span> <code class="mono" style="color:var(--accent)">${esc(ch.answer)}</code></p>
    <p class="prose" style="color:var(--muted);margin-top:.5rem"><strong style="color:var(--ink)">Key takeaway.</strong> ${esc(ch.takeaway)}</p>
  </div>`;

  const body = `
<section class="s first">
  <p style="margin:0 0 1rem"><a class="tlink" href="ctf.html">&larr; All CTF writeups</a></p>
  <p class="kicker">${esc(w.event)} &middot; Open Source Intelligence</p>
  <h1 style="font-size:clamp(2.1rem,4.5vw,3rem)">${esc(w.title)}</h1>
  <p class="lede" style="margin-top:.9rem">${esc(w.description)}</p>
  <p class="meta" style="margin-top:1rem">${esc(w.date)} &middot; difficulty ${esc(w.difficulty)} (my own rating) &middot; challenge author <code class="mono">${esc(w.author)}</code></p>
  <p style="margin-top:.6rem;font-weight:600;color:var(--accent)">${esc(w.teamResult)}</p>
  <div style="margin-top:.9rem;display:flex;gap:.5rem;flex-wrap:wrap">
    <span class="tag">${esc(w.category)}</span>${w.tags.slice(0, 4).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
  </div>
</section>
${sec(cfg, { title: 'Challenge overview', kind: 'Overview' },
  `<div class="prose" style="color:var(--muted);display:grid;gap:.7rem;margin-top:1rem">
     <p>AO-SINT provided four screenshots from the Roblox game <em>Arcane Odyssey</em>: two from the Bronze Sea and two from the Nimbus Sea. The objective was to identify the island where the player character was <strong style="color:var(--ink)">actually standing</strong> in each screenshot.</p>
     <p>Flag format: <code class="mono">${esc(w.flagFormat)}</code></p>
     <blockquote style="margin:0;padding-left:1rem;border-left:2px solid var(--line-2);color:var(--muted)">${esc(w.hint)}</blockquote>
     <p>That distinction defined the entire solve. Several screenshots prominently displayed distant islands, unusual weather, or visual glitches. Those details were often distractions rather than reliable evidence of the character's location.</p>
   </div>`)}
${sec(cfg, { title: 'Final result', kind: 'Result', id: 'final-result' },
  `<ol class="clean" style="margin-top:1rem;display:grid;gap:.35rem;max-width:30rem">
     ${w.locations.map((l, i) => `<li class="dash"><span class="mono" style="color:var(--accent)">${String(i + 1).padStart(2, '0')}</span> &nbsp;${esc(l)}</li>`).join('')}
   </ol>
   <details style="margin-top:1.2rem;max-width:34rem"><summary>Spoiler: show the final flag</summary><pre>${esc(w.flag)}</pre></details>`)}
${sec(cfg, { title: 'Methodology', kind: 'Method' },
  `<p class="prose" style="color:var(--muted);margin-top:1rem">I approached each screenshot as a geolocation problem rather than a landmark-recognition problem, and separated the evidence into two ranks.</p>
   <div class="grid2" style="margin-top:1.2rem;align-items:start">
     <div><h3 style="font-size:.95rem">Primary evidence</h3>
       <ul class="clean" style="margin-top:.5rem;display:grid;gap:.3rem">${w.primaryEvidence.map((e) => `<li class="dash">${esc(e)}</li>`).join('')}</ul></div>
     <div><h3 style="font-size:.95rem;color:var(--faint)">Supporting evidence</h3>
       <p style="color:var(--muted);margin-top:.5rem;font-size:.93rem">${esc(w.supportingEvidence)}</p></div>
   </div>`)}
${sec(cfg, { title: 'Location analysis', kind: 'Evidence' }, w.chapters.map(chapter).join(''))}
${sec(cfg, { title: 'Sightline reconstruction', kind: 'Analysis', primary: false },
  `<p class="prose" style="color:var(--muted);margin-top:.8rem">The approximate sightline from the standing position:</p>
   <p class="mono" style="margin-top:.7rem;color:var(--accent);font-size:.95rem">${esc(w.sightline)}</p>
   <p class="prose" style="color:var(--muted);margin-top:1rem">${esc(w.verification)}</p>`)}
${sec(cfg, { title: 'Lessons learned', kind: 'Lessons' },
  `<dl style="margin-top:1rem;display:grid;gap:1rem;max-width:52rem">${w.lessons.map((l, i) =>
    `<div><dt style="font-weight:650"><span class="mono" style="color:var(--accent)">${String(i + 1).padStart(2, '0')}</span> &nbsp;${esc(l.t)}</dt>
     <dd style="margin:.25rem 0 0 0;color:var(--muted)">${esc(l.d)}</dd></div>`).join('')}</dl>
   <p class="prose" style="color:var(--muted);margin-top:1.4rem">The full flag is behind the spoiler under <a href="#final-result">Final result</a> above.</p>`)}`;
  return shell(cfg, { page: 'ctf.html', title: w.title, body });
}

function about(cfg) {
  const body = `
<section class="s first">
  <p class="kicker">~/about</p>
  <h1 style="font-size:clamp(2rem,4vw,2.6rem)">About Derek</h1>
  <p class="lede" style="margin-top:.9rem">Who I am, what I am working toward, and how I approach technical work.</p>
</section>
${sec(cfg, { title: 'Introduction', kind: 'Bio', primary: false },
  `<div class="prose" style="color:var(--muted);display:grid;gap:.8rem;margin-top:.9rem">${C.ABOUT.intro.map((p) => `<p>${esc(p)}</p>`).join('')}</div>`)}
${sec(cfg, { title: 'Current direction', kind: 'Now' },
  `<ul class="clean" style="margin-top:1rem;display:grid;gap:.5rem;max-width:42rem">${C.ABOUT.direction.map((d) =>
    `<li class="dash">${esc(d.text)}${d.note ? ` <span style="color:var(--faint)">(${esc(d.note)})</span>` : ''}</li>`).join('')}</ul>`)}
${sec(cfg, { title: 'How I work', kind: 'Principles' },
  `<dl style="margin-top:1rem;display:grid;gap:1.1rem;max-width:52rem">${C.ABOUT.principles.map((p) =>
    `<div><dt style="font-weight:650;color:var(--accent)">${esc(p.t)}</dt>
     <dd style="margin:.25rem 0 0;color:var(--muted)">${esc(p.d)}</dd></div>`).join('')}</dl>`)}
${sec(cfg, { title: 'Professional context', kind: 'Context', primary: false },
  `<ul class="clean" style="margin-top:.9rem;display:grid;gap:.4rem;max-width:42rem">${C.ABOUT.context.map((c) => `<li class="dash">${esc(c)}</li>`).join('')}</ul>`)}
${sec(cfg, { title: 'Where to go next', kind: 'Links', primary: false },
  `<p style="margin-top:.9rem;display:flex;flex-wrap:wrap;gap:.5rem 1.4rem">
     <a class="tlink" href="projects.html">View projects &rarr;</a>
     <a class="tlink" href="ctf.html">Read CTF writeups &rarr;</a>
     <a class="tlink" href="achievements.html">View achievements &rarr;</a>
     <a class="tlink" href="${C.SITE.resumePdf}">Download resume (PDF) &rarr;</a>
     <a class="tlink" href="contact.html">Contact Derek &rarr;</a></p>`)}`;
  return shell(cfg, { page: 'about.html', title: 'About', body });
}

function contact(cfg) {
  const body = `
<section class="s first">
  <p class="kicker">~/contact</p>
  <h1 style="font-size:clamp(2rem,4vw,2.6rem)">Contact</h1>
  <p class="lede" style="margin-top:.9rem">Email is the fastest way to reach me. Calls, texts, and LinkedIn work too.</p>
</section>
${sec(cfg, { title: 'Direct contact', kind: 'Contact' },
  `<div style="margin-top:1.1rem;display:grid;gap:1.1rem;max-width:34rem">
     <div><p class="meta">Email Derek</p>
       <p style="margin:.2rem 0 0"><a class="mono" style="font-size:1.05rem" href="mailto:${C.SITE.email}?subject=Professional%20Inquiry%20for%20Derek%20Wei">${C.SITE.email}</a></p></div>
     <div><p class="meta">Call or text Derek</p>
       <p style="margin:.2rem 0 0;display:flex;gap:1.2rem;flex-wrap:wrap;align-items:baseline">
         <a class="mono" style="font-size:1.05rem" href="tel:${C.SITE.phoneE164}">${C.SITE.phoneDisplay}</a>
         <a class="tlink" href="sms:${C.SITE.phoneE164}">Text Derek</a></p></div>
     <div><p class="meta">Connect on LinkedIn</p>
       <p style="margin:.2rem 0 0"><a href="${C.SITE.linkedin}" rel="noopener noreferrer">linkedin.com/in/derekxwei</a></p></div>
   </div>
   <div style="display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.8rem">
     <a class="btn btn-1" href="mailto:${C.SITE.email}?subject=Professional%20Inquiry%20for%20Derek%20Wei">Email Derek</a>
     <a class="btn btn-2" href="${C.SITE.resumePdf}">Download resume (PDF)</a>
   </div>`)}
${sec(cfg, { title: 'Details', kind: 'Details', primary: false },
  `<ul class="clean rowlist" style="margin-top:.9rem;max-width:40rem">
     <li><span>Location</span><span class="meta">${esc(C.SITE.location)}</span></li>
     <li><span>Clearance</span><span class="meta">${esc(C.SITE.clearance)}</span></li>
     <li><span>Status</span><span class="meta">Seeking cybersecurity internships</span></li>
   </ul>
   <p class="meta" style="margin-top:1.2rem;max-width:42rem">There is no contact form here on purpose: the site is fully static, with no backend to receive one. That is a deliberate part of its <a href="architecture.html">security architecture</a>.</p>`)}`;
  return shell(cfg, { page: 'contact.html', title: 'Contact', body });
}

// Card page keeps its minimal standalone structure: no site nav, no theme menu.
function cardPage(cfg) {
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Professional Contact · ${esc(cfg.name)}</title>
<script>
/* Production renders /card with BaseLayout's minimal flag: no header, no
   footer, but theme-boot.js still runs. The card must therefore honour a
   stored Light preference even though it shows no theme control. Blocking
   and before first paint, so the card never flashes the wrong theme. */
(function(){try{var v=localStorage.getItem('dwproto-theme');
  var t=(v==='dark'||v==='light')?v:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.setAttribute('data-theme',t);}catch(e){}})();
</script>
<style>${BASE}${cfg.css}
main{max-width:24rem;padding-top:2.5rem}
.mono-badge{width:5rem;height:5rem;border-radius:50%;border:2px solid var(--accent);display:flex;align-items:center;
  justify-content:center;font-family:var(--mono);font-size:1.5rem;font-weight:650;color:var(--accent);margin:0 auto;background:var(--surf-1)}
.card-actions{display:grid;gap:.7rem;margin-top:2rem}
.card-actions .btn{width:100%}
</style></head>
<body>
<a class="skip" href="#main">Skip to content</a>
<main id="main" style="text-align:center">
  <div class="mono-badge" aria-hidden="true">DW</div>
  <h1 style="font-size:1.9rem;margin-top:1.2rem">${C.SITE.name}</h1>
  <p class="kicker" style="margin-top:.5rem">B.S. Cybersecurity Honors Student</p>
  <p class="meta" style="margin-top:.3rem">The University of Texas at San Antonio</p>
  <p style="color:var(--muted);font-size:.93rem;margin-top:1rem">Cybersecurity competitions, technical support, offensive security, and defensive analysis.</p>
  <div class="card-actions">
    <a class="btn btn-1" href="${C.SITE.vcard}" download>Save Contact</a>
    <a class="btn btn-2" href="sms:${C.SITE.phoneE164}">Text Derek</a>
    <a class="btn btn-2" href="mailto:${C.SITE.email}?subject=Following%20up%20with%20Derek%20Wei">Email Derek</a>
    <a class="btn btn-2" href="tel:${C.SITE.phoneE164}">Call Derek</a>
  </div>
  <nav aria-label="Professional links" style="margin-top:2rem;border-top:1px solid var(--line);padding-top:1.4rem">
    <ul class="clean" style="display:grid;gap:.55rem;font-size:.9rem">
      <li><a href="${C.SITE.linkedin}" rel="noopener noreferrer">LinkedIn</a></li>
      <li><a href="${C.SITE.resumePdf}">Resume (PDF)</a></li>
      <li><a href="projects.html">Projects</a></li>
      <li><a href="index.html">Full Website</a></li>
    </ul>
  </nav>
  <p class="meta mono" style="margin-top:2rem;font-size:.75rem">CySA+ | PenTest+ | Security+ | Network+ | ITF+</p>
  <p style="margin-top:.4rem"><a class="tlink" style="font-size:.8rem" href="${C.SITE.credly}" rel="noopener noreferrer">View verified credentials</a></p>
  <p class="meta" style="margin-top:2rem;font-size:.78rem">${C.SITE.brand}<br>${esc(C.SITE.location)}</p>
  <p style="margin-top:1.5rem"><span class="proto-tag">design prototype, not the live site</span></p>
</main>
</body></html>`;
}

function lab(cfg) {
  const body = `
<section class="s first">
  <p class="kicker">~/lab</p>
  <h1 style="font-size:clamp(2rem,4vw,2.6rem)">Lab</h1>
  <p class="lede" style="margin-top:.9rem">${esc(C.LAB.lede)}</p>
</section>
${sec(cfg, { title: 'Lab notes', kind: 'Notes' },
  `<p style="color:var(--muted);margin-top:1rem;max-width:44rem">${esc(C.LAB.note)}</p>
   <p class="meta" style="margin-top:1rem">Notes are published as they are written. No note is listed here until it exists.</p>`)}`;
  return shell(cfg, { page: 'lab.html', title: 'Lab', body });
}

function tools(cfg) {
  const body = `
<section class="s first">
  <p class="kicker">~/tools</p>
  <h1 style="font-size:clamp(2rem,4vw,2.6rem)">Browser tools</h1>
  <p class="lede" style="margin-top:.9rem">Small client-side security utilities. Everything runs in the browser: no upload, no backend, no third-party requests.</p>
</section>
${sec(cfg, { title: 'Available tools', kind: 'Index' },
  `<div class="grid2" style="margin-top:1.1rem">${C.TOOLS.map((t) =>
    `<a class="${cfg.cardStyle === 'entry' ? 'entry' : 'card'}" href="tools.html"><h3 style="font-size:.98rem">${esc(t)}</h3></a>`).join('')}</div>`)}`;
  return shell(cfg, { page: 'tools.html', title: 'Tools', body });
}

function architecture(cfg) {
  const body = `
<section class="s first">
  <p class="kicker">~/architecture</p>
  <h1 style="font-size:clamp(2rem,4vw,2.6rem)">How this site works</h1>
  <p class="lede" style="margin-top:.9rem">${esc(C.ARCHITECTURE.lede)}</p>
</section>
${sec(cfg, { title: 'Delivery', kind: 'Diagram' },
  fig(C.IMG.siteDiagram, C.ALT.siteDiagram, 'Local development, a push to the private GitHub repository, a Cloudflare Pages build, the Cloudflare edge over HTTPS, then the visitor browser.'))}
${sec(cfg, { title: 'Stack', kind: 'Stack' },
  `<dl style="margin-top:1rem;display:grid;gap:1rem;max-width:52rem">${C.ARCHITECTURE.stack.map((s) =>
    `<div><dt style="font-weight:650">${esc(s.t)}</dt><dd style="margin:.2rem 0 0;color:var(--muted);font-size:.94rem">${esc(s.d)}</dd></div>`).join('')}</dl>`)}
${sec(cfg, { title: 'Content Security Policy', kind: 'Security', primary: false },
  `<div class="tbl-wrap" style="margin-top:.9rem"><table><caption class="sr">Content Security Policy served on every response</caption>
     <tbody><tr><th scope="row">Content-Security-Policy</th><td><code class="mono" style="font-size:.78rem">${esc(C.ARCHITECTURE.csp)}</code></td></tr></tbody>
   </table></div>`)}`;
  return shell(cfg, { page: 'architecture.html', title: 'Architecture', body });
}

// ---------- run ----------
const PAGES = [
  ['index.html', home], ['projects.html', projects], ['project-cpts.html', projectDetail],
  ['resume.html', resume], ['achievements.html', achievements], ['ctf.html', ctfIndex],
  ['ao-sint.html', aoSint], ['about.html', about], ['contact.html', contact],
  ['card.html', cardPage], ['lab.html', lab], ['tools.html', tools], ['architecture.html', architecture],
];

let total = 0;
for (const cfg of concepts) {
  const dir = path.join(OUT, cfg.id);
  fs.mkdirSync(dir, { recursive: true });
  for (const [file, fn] of PAGES) {
    secIndex = 0; // rail numbering restarts per page
    fs.writeFileSync(path.join(dir, file), fn(cfg));
    total += 1;
  }
  console.log(`${cfg.id}: ${PAGES.length} pages`);
}
console.log(`total: ${total} files`);
