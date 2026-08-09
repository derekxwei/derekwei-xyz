// Shared factual content for all three prototypes.
// Every value here is copied from current production (src/consts.ts, the
// content collections, and the live pages) so the three concepts differ only
// in visual design, never in facts. Do not invent content in this file.

const NAV = [
  { label: 'Resume', href: 'resume.html' },
  { label: 'Achievements', href: 'achievements.html' },
  { label: 'Projects', href: 'projects.html' },
  { label: 'CTF', href: 'ctf.html' },
  { label: 'Lab', href: 'lab.html' },
  { label: 'Tools', href: 'tools.html' },
  { label: 'Architecture', href: 'architecture.html' },
  { label: 'About', href: 'about.html' },
  { label: 'Contact', href: 'contact.html' },
];

const SITE = {
  brand: 'derekwei.xyz',
  name: 'Derek Wei',
  email: 'derekxwei@gmail.com',
  phoneDisplay: '(210) 716-0226',
  phoneE164: '+12107160226',
  linkedin: 'https://linkedin.com/in/derekxwei',
  location: 'San Antonio, Texas',
  clearance: 'U.S. citizen eligible to obtain a Secret security clearance.',
  resumePdf: '../../public/Derek_Wei_Resume_Public.pdf',
  vcard: '../../public/derek-wei.vcf',
  credly: 'https://www.credly.com/users/derek-wei.f1a98326',
};

const HERO = {
  kicker: 'Cybersecurity student',
  lede:
    'Incoming B.S. Cybersecurity student in the Honors College at The University of Texas at San Antonio, focused on red-team fundamentals, penetration testing labs, Capture the Flag methodology, and practical security tooling. Preparing for the Certified Penetration Testing Specialist (CPTS).',
  credentialLine:
    '5x CompTIA certified (CySA+, PenTest+, Security+, Network+, ITF+) · AWS Certified AI Practitioner · graduate of the NEISD iCSI Cybersecurity Program, Class of 2026',
};

// Real local assets only. Paths are relative to a concept directory.
const A = (p) => `../../public${p}`;
const IMG = {
  ierochos: A('/images/ctf/broncoctf-2026-ao-sint/location-1-ierochos.webp'),
  bronzeMap: A('/images/ctf/broncoctf-2026-ao-sint/bronze-sea-map.webp'),
  portMistral: A('/images/ctf/broncoctf-2026-ao-sint/location-2-port-mistral.webp'),
  makrinaos: A('/images/ctf/broncoctf-2026-ao-sint/location-3-makrinaos.webp'),
  ravenna: A('/images/ctf/broncoctf-2026-ao-sint/location-4-ravenna.webp'),
  nimbusMap: A('/images/ctf/broncoctf-2026-ao-sint/nimbus-sea-map.webp'),
  cptsDiagram: A('/images/architecture/cpts-notes-pipeline.svg'),
  siteDiagram: A('/images/architecture/derekwei-site-architecture.svg'),
  travelDiagram: A('/images/architecture/secure-travel-network.svg'),
};

// Intrinsic pixel dimensions, read from the real asset files (webp headers and
// svg viewBox), not guessed. Emitting these as width/height attributes lets the
// browser reserve the correct box before a lazy image loads: without them the
// figures collapse to zero height and every later image jumps on scroll.
const DIM = {
  [IMG.ierochos]: [1600, 717],
  [IMG.bronzeMap]: [1000, 1769],
  [IMG.portMistral]: [1539, 422],
  [IMG.makrinaos]: [1565, 791],
  [IMG.ravenna]: [1600, 603],
  [IMG.nimbusMap]: [1000, 598],
  [IMG.cptsDiagram]: [560, 712],
  [IMG.siteDiagram]: [560, 596],
  [IMG.travelDiagram]: [560, 596],
};

const ALT = {
  ierochos:
    'Arcane Odyssey character standing on a high narrow rock pillar with several distant islands visible through severe weather.',
  bronzeMap:
    'Bronze Sea map used to compare Ierochos with Cedar Arch, Elm Island, Dawn Island, and Frostmill Island.',
  portMistral:
    'Port Mistral waterfront with timber-framed buildings, cargo, market structures, and red-brown roofs.',
  makrinaos:
    'Interior of the Dead Halls at Makrinaos with Assassin Syndicate signage, dark stone walls, and wooden construction.',
  ravenna:
    'Ravenna terrain and distant structures under red lighting, with an airborne whale visible as an unreliable physics clue.',
  cptsDiagram:
    'Pipeline diagram from authorized study material through Claude processing and human accuracy review into an Obsidian vault.',
  siteDiagram:
    "Delivery pipeline diagram: local development pushes to a private GitHub repository, which triggers a Cloudflare Pages build that produces static output served from the Cloudflare edge over HTTPS.",
  travelDiagram:
    'Network diagram of trusted devices connecting through a travel router and encrypted VPN gateway to public Wi-Fi and the internet.',
};

const CERTIFICATIONS = [
  { name: 'CompTIA CySA+', short: 'CySA+', issuer: 'CompTIA', year: '2026', expires: 'May 14, 2029', verify: 'https://www.credly.com/badges/c567b6a1-ce8c-4b22-9707-a6ef7ed6b773/public_url' },
  { name: 'CompTIA PenTest+', short: 'PenTest+', issuer: 'CompTIA', year: '2026', expires: 'April 29, 2032', verify: 'https://www.credly.com/badges/9755d071-4b25-4765-af4d-12cdd5a6f563/public_url' },
  { name: 'CompTIA Security+', short: 'Security+', issuer: 'CompTIA', expires: 'April 29, 2032', verify: 'https://www.credly.com/badges/3a66db4e-f145-4eaa-a953-41d95ccfe70e/public_url' },
  { name: 'CompTIA Network+', short: 'Network+', issuer: 'CompTIA', expires: 'April 29, 2032', verify: 'https://www.credly.com/badges/a9116ea8-2afb-4fbb-af6e-1d5267c7c0f3/public_url' },
  { name: 'CompTIA IT Fundamentals+', short: 'ITF+', issuer: 'CompTIA', issued: 'April 26, 2023', verify: 'https://www.credly.com/badges/c3447ccb-bffa-4505-80f8-6771fe62983e/public_url' },
  { name: 'AWS Certified AI Practitioner', short: 'AWS AI Practitioner', issuer: 'Amazon Web Services', year: '2026', issued: 'August 7, 2026', expires: 'August 7, 2029', verify: 'https://www.credly.com/badges/8197c6ef-1a3f-4449-b0e0-739b5329dcd2/public_url' },
  { name: 'Microsoft Office Specialist: Word Associate', short: 'MOS Word', issuer: 'Microsoft', issued: 'December 8, 2023', verify: 'https://www.credly.com/badges/03879611-277a-42a3-af16-ec92f94f51ff/public_url' },
];

const STACKABLE = [
  { name: 'CompTIA Network Security Professional (CNSP)', short: 'CNSP', issuer: 'CompTIA', expires: 'May 14, 2029', verify: 'https://www.credly.com/badges/c98ebc78-0824-4359-af3a-e1305ee31dde/public_url' },
  { name: 'CompTIA Network Vulnerability Assessment Professional (CNVP)', short: 'CNVP', issuer: 'CompTIA', expires: 'April 29, 2032', verify: 'https://www.credly.com/badges/dd01f58a-4a40-4be6-b77f-475568bcae1c/public_url' },
  { name: 'CompTIA Security Analytics Professional (CSAP)', short: 'CSAP', issuer: 'CompTIA', expires: 'May 14, 2029', verify: 'https://www.credly.com/badges/1de0b981-705a-445b-8b6f-3ec041228470/public_url' },
];

const STACKABLE_NOTE =
  'CompTIA awards stackable certifications for earning qualifying combinations of underlying certifications. These credentials are listed separately and do not represent additional certification exams.';

const NJHS = {
  name: 'National Junior Honor Society Outstanding Achievement Award Recipient',
  year: '2022',
  verify: 'https://www.credly.com/badges/da66bf02-d8d2-4a3f-a8c1-57b7bb71d584/public_url',
};

const ROADMAP = [
  { label: 'In progress', items: ['Hack The Box Certified Penetration Testing Specialist (CPTS)'] },
  { label: 'Next', items: ['AWS Certified Solutions Architect - Associate'] },
];

const SCHOLARSHIPS = [
  { name: 'Distinguished Presidential Scholarship', institution: 'University of Texas at San Antonio', year: '2026', amount: '$5,000' },
  { name: 'Honors College Collaborative Scholarship', institution: 'University of Texas at San Antonio', year: '2026', amount: '$1,000' },
];

const AWARDS = [
  '1st of 1,692 teams, National Cyber League High School division (Spring 2026)',
  '1st place, THEM?!CTF (Team idktheflag, 2026)',
];

const NCL = {
  name: 'National Cyber League',
  period: 'Spring 2026',
  bullets: [
    'Placed 1st of 1,692 teams in the High School division and 5th of 3,638 in the Standard Team division (Team Difference)',
    'Competed across cryptography, password cracking, digital forensics, log analysis, network traffic analysis, OSINT, enumeration, and web application exploitation',
  ],
};

const COMPETITIONS = [
  { name: 'THEM?!CTF', result: '1st place, Team idktheflag (2026)' },
  { name: 'BYU CTF', result: '3rd of 566 teams, Team idktheflag (2026)' },
  { name: 'Hackerverse Cyber Games (EC-Council)', result: '3rd of 72 players, solo, reverse engineering (2026)' },
  { name: 'RowdyCon CTF', result: '3rd of 85 teams (2026)' },
  { name: 'BroncoCTF 2026', result: '8th of 753 teams with 3,777 points, Team idktheflag', writeup: { label: 'Read the AO-SINT writeup', href: 'ao-sint.html' } },
  { name: 'CTF@CIT', result: '25th of 759 teams (2026)' },
];

const COMPETITIONS_NO_RESULT = ['Squ1rrel CTF', 'CyberPatriot'];

const EXPERIENCE = [
  {
    role: 'Cybersecurity Summer Camp Intern',
    org: 'CyberTexas Foundation',
    period: 'Jun 2026 to Present',
    bullets: [
      "Guide students through hands-on cybersecurity exercises at St. Mary's University",
      'Support instructors during classroom and lab activities',
      'Troubleshoot laptops, Windows issues, software problems, network connectivity issues, and workstation failures',
      'Resolve real technical issues including blue screens, corrupted files, installation problems, and OS troubleshooting',
    ],
  },
  {
    role: 'Technical Support',
    org: 'NEISD Institute of CyberSecurity and Innovation (iCSI)',
    period: 'Aug 2022 to May 2026',
    bullets: [
      'Provided technical support across Linux and Windows systems for students and staff in a cybersecurity program serving seven NEISD high schools, diagnosing hardware, software, and network connectivity issues',
      'Maintained the virtualized lab environments used for hands-on cybersecurity training: configuring virtual machines, restoring lab images, and clearing network issues so classes ran without interruption',
      'Authored and maintained technical documentation and troubleshooting workflows, standardizing common fixes for instructors and students',
    ],
  },
];

const EDUCATION = [
  { school: 'The University of Texas at San Antonio (UTSA)', program: 'B.S. Cybersecurity, Honors College', detail: 'Expected May 2030' },
  { school: 'MacArthur High School / NEISD Institute of CyberSecurity and Innovation (iCSI)', program: 'High school diploma', detail: 'May 2026', note: "Member of iCSI's first four-year cybersecurity graduating class" },
];

const SKILL_GROUPS = [
  { label: 'Security', items: 'Vulnerability scanning, network traffic analysis, log analysis, incident detection and response, digital forensics, penetration testing fundamentals, cryptography, OSINT, password cracking, web application exploitation' },
  { label: 'Systems and tooling', items: 'Kali Linux, Windows, Linux command line, virtual machine (VM) environments, TCP/IP networking, Wireshark, Nmap, Metasploit, Burp Suite, hashcat, John the Ripper' },
  { label: 'Scripting and documentation', items: 'Python, Bash, Git, technical documentation, Microsoft Word (MOS certified), Microsoft Excel' },
  { label: 'Languages', items: 'English (native), Mandarin Chinese (native/bilingual)' },
];

const LEADERSHIP = [
  { role: 'Education Mentor, NEISD iCSI', period: '2023 to Present', detail: 'Mentor incoming students and teach introductory cybersecurity topics in a hands-on classroom setting' },
  { role: 'Class President, Reagan High School', period: '2022 to 2024', detail: 'Led the officer team in planning class events, fundraisers, and student initiatives' },
];

const CORE_AREAS = [
  'Web Application Security', 'Capture the Flag (CTF)', 'Digital Forensics',
  'Open Source Intelligence (OSINT)', 'Network Analysis', 'Password Auditing',
  'Penetration Testing Fundamentals', 'Security Tooling',
];

const PROJECTS = [
  { slug: 'cpts-notes-pipeline', title: 'CPTS study notes pipeline', status: 'in-progress', date: 'Jul 10, 2026', tags: ['automation', 'obsidian', 'claude', 'workflow'], featured: true, href: 'project-cpts.html', image: IMG.cptsDiagram, alt: ALT.cptsDiagram, description: 'A Claude Code, Claude Haiku, and Obsidian workflow that turns pasted CPTS study material into structured notes, checklists, and review artifacts, with human review.' },
  { slug: 'derekwei-xyz', title: 'derekwei.xyz (this site)', status: 'shipped', date: 'Jul 9, 2026', tags: ['astro', 'typescript', 'tailwind', 'cloudflare-pages'], featured: true, image: IMG.siteDiagram, alt: ALT.siteDiagram, description: 'This site: a fast, static Astro 5 build with a strict CSP, no cookies or trackers, and no third-party requests, deployed on Cloudflare Pages.' },
  { slug: 'secure-travel-network', title: 'Secure travel network setup', status: 'in-progress', date: 'Jul 8, 2026', tags: ['networking', 'vpn', 'travel', 'hardening'], image: IMG.travelDiagram, alt: ALT.travelDiagram, description: 'A GL.iNet GL-SFT1200 (Opal) travel router configured as a VPN gateway for safer, more consistent routing across multiple devices on public Wi-Fi.' },
  { slug: 'browser-tool-hub', title: 'Browser-based cybersecurity tool hub', status: 'shipped', date: 'Jul 8, 2026', tags: ['tools', 'client-side', 'web'], description: 'A set of client-side security utilities for encoding, hashing, password entropy, IOC parsing, subnetting, and header checks. Runs entirely in the browser.' },
  { slug: 'ctf-writeup-archive', title: 'CTF writeup archive', status: 'in-progress', date: 'Jul 6, 2026', tags: ['ctf', 'writeups', 'methodology'], description: 'A structured archive of Capture the Flag methodology: sanitized writeups covering enumeration, failed attempts, tools used, and defensive takeaways.' },
  { slug: 'home-security-lab', title: 'Offensive security home lab', status: 'in-progress', date: 'Jul 5, 2026', tags: ['homelab', 'pentest', 'ctf', 'virtualization'], description: 'An authorized home lab for penetration testing practice, CTF challenges, and GPU-assisted password cracking, built on a local virtualization workstation.' },
];

const WRITEUP = {
  title: 'BroncoCTF: AO-SINT',
  event: 'BroncoCTF 2026',
  category: 'osint',
  difficulty: 'hard',
  date: 'Jul 11, 2026',
  tags: ['geolocation', 'roblox', 'arcane-odyssey', 'map-analysis', 'sightline-analysis'],
  description:
    'An evidence-first OSINT writeup using topography, architecture, map geometry, and sightlines to identify four Arcane Odyssey locations from four screenshots.',
  teamResult: 'Team idktheflag placed 8th of 753 teams at BroncoCTF 2026.',
  author: 'blunderous_wonders',
  game: 'Roblox Arcane Odyssey',
  hint:
    'The challenge is talking about the place where the character is, not what they are looking at. This may be the same place in some cases.',
  flagFormat: 'bronco{location1_location2_location3_location4}',
  flag: 'bronco{ierochos_portmistral_makrinaos_ravenna}',
  locations: ['Ierochos', 'Port Mistral', 'Makrinaos', 'Ravenna'],
  primaryEvidence: [
    'Terrain directly beneath the character', 'Elevation', 'Cliff and rock geometry',
    'Architecture', 'Interior layout', 'Vegetation', 'Nearby landmasses',
    'Landmark order', 'Relative landmark size', 'Map direction', 'In-game viewpoint reproduction',
  ],
  supportingEvidence:
    'Weather, lighting, story clues, visual effects, physics behavior, and distant landmarks. Supporting evidence could strengthen a theory, but it was never reliable enough to establish a location by itself.',
  sightline: 'Ierochos → Cedar Arch → Elm Island → Dawn Island → Frostmill Island',
  chapters: [
    {
      n: 1, name: 'Ierochos', answer: 'ierochos', image: IMG.ierochos, alt: ALT.ierochos,
      caption: 'The foreground pillar and multi-island sightline supported Ierochos.',
      observation: 'The player stood at a high elevation on a narrow rocky pillar. Several islands were visible in the distance, including a large frozen landmass that appeared to be Frostmill Island. The most visually prominent island was not necessarily the answer.',
      falseLead: 'Heavy rain initially suggested Dawn Island because Dawn Island is associated with a permanent thunderstorm. That theory was weak because severe weather can occur in other parts of the game.',
      evidence: 'The character stood at very high elevation on a narrow, steep rock formation, multiple islands appeared along the same sightline, and the order and apparent sizes of those islands could be compared against the Bronze Sea map.',
      takeaway: 'The frozen island dominated the screenshot, but Frostmill Island was only a distant reference point. The topography beneath the character and the multi-island sightline identified Ierochos as the standing location.',
      secondImage: IMG.bronzeMap, secondAlt: ALT.bronzeMap,
      secondCaption: 'Landmark order and relative distance helped reconstruct the Bronze Sea sightline.',
    },
    {
      n: 2, name: 'Port Mistral', answer: 'portmistral', image: IMG.portMistral, alt: ALT.portMistral,
      caption: "Port Mistral's merchant architecture and waterfront layout distinguished it from Redwake.",
      observation: 'The second screenshot showed a developed merchant settlement: timber-framed buildings with light plaster walls and red-brown roofs, barrels and cargo crates, market equipment, waterfront infrastructure, and tall vegetated stone formations.',
      falseLead: 'The architecture initially resembled Redwake, an early-game settlement in the Bronze Sea. However, this screenshot belonged to the Nimbus Sea set, which made Redwake an architectural comparison rather than a valid answer.',
      evidence: "The settlement's dense harbor layout, merchant structures, docks, cargo, cranes, and red-roofed buildings closely matched Port Mistral, and the intact appearance was consistent with visiting before the storyline events that alter the settlement.",
      takeaway: 'Architectural style alone created ambiguity because multiple settlements shared design elements. Identifying the correct sea narrowed the candidate set.',
    },
    {
      n: 3, name: 'Makrinaos', answer: 'makrinaos', image: IMG.makrinaos, alt: ALT.makrinaos,
      caption: 'The Nimbus Sea context and Assassin Syndicate interior supported Makrinaos.',
      observation: 'The third screenshot showed the interior of an Assassin Syndicate facility: a red banner, a contract board, dark stone walls, wooden construction, weapons and supplies, and a facility built inside mountainous terrain.',
      falseLead: 'The room resembled the Red Corner inside Whitesummit, making Whitesummit a strong initial candidate. However, the screenshot belonged to the Nimbus Sea set.',
      evidence: "Makrinaos contains the Dead Halls, the Assassin Syndicate's Nimbus Sea base. The challenge referenced a miniboss hidden inside somewhere, which appeared to match Architect Kalliste, and the tornado references align with the Veiling Storms.",
      takeaway: "The room's appearance alone could have indicated Whitesummit. The sea classification and miniboss clue were necessary to distinguish the two facilities.",
    },
    {
      n: 4, name: 'Ravenna', answer: 'ravenna', image: IMG.ravenna, alt: ALT.ravenna,
      caption: 'The airborne whale was treated as a low-confidence physics glitch rather than geographic evidence.',
      observation: 'The fourth screenshot contained strong red lighting, reduced visibility, distant structures and terrain, and a whale apparently flying through the air.',
      falseLead: 'The flying whale initially suggested a hallucination associated with Akursius Keep, which is connected to Insanity effects. The theory was ultimately unreliable.',
      evidence: 'Flying whales can occur as a physics glitch, and lighting effects are not unique to one island, so the analysis focused on terrain beneath the character, nearby structures, general landform, and settlement geometry.',
      takeaway: 'The whale was memorable but geographically useless. The correct answer came from the terrain and structures around the character.',
    },
  ],
  lessons: [
    { t: 'Identify the camera position, not the landmark', d: 'The most important question was what terrain is directly beneath the character, and from which location the visible landmarks would align in this order.' },
    { t: 'Topography is more reliable than weather', d: 'Elevation, cliff shape, rock geometry, vegetation, architecture, nearby landmasses, and sightline direction outrank weather and lighting.' },
    { t: 'Physics glitches are usually noise', d: 'Unusual game behavior can be memorable without being useful. A clue should not gain weight merely because it looks strange.' },
    { t: 'Separate verified components from guesses', d: 'Assigning each location a confidence level prevents a partially correct flag from turning into uncontrolled brute force.' },
  ],
  verification:
    'I later reproduced the viewpoint in-game and compared the elevation, foreground pillar, landmark order, and relative size of the visible islands. The verification screenshot is omitted to avoid publishing account-identifying information. The challenge was designed to be solvable without downloading Roblox.',
};

const ABOUT = {
  intro: [
    'I am Derek Wei, an incoming Bachelor of Science in Cybersecurity Honors student at The University of Texas at San Antonio. My background is hands-on: nearly four years of technical support across Windows and Linux systems, cybersecurity lab work, and Capture the Flag competition, alongside documented technical projects I build and write up on this site.',
    'I focus on offensive-security fundamentals and the defensive analysis that connects findings back to real systems, and I am comfortable troubleshooting problems down to their root cause. I learn best by investigating real problems, documenting what failed, and turning the result into something another person can reproduce. I am bilingual in English and Mandarin Chinese, and a U.S. citizen eligible to obtain a security clearance.',
  ],
  direction: [
    { text: 'Beginning UTSA Cybersecurity Honors coursework' },
    { text: 'Preparing for the Hack The Box Certified Penetration Testing Specialist (CPTS)', note: 'in progress, not currently held' },
    { text: 'Building practical projects and publishing Capture the Flag writeups' },
  ],
  principles: [
    { t: 'Evidence over assumptions', d: 'The AO-SINT writeup identified each location from topography, map geometry, and sightlines rather than the most prominent visual clue, which was usually a distraction.' },
    { t: 'Reproducible technical documentation', d: 'My writeups and lab notes record the evidence, the approaches that failed, and how the result was validated, so another person can follow the same path.' },
    { t: 'Practical work over unsupported claims', d: 'Credentials, competition results, and projects link to inspectable or independently verifiable evidence where it exists.' },
  ],
  context: [
    'Bilingual in English and Mandarin Chinese',
    'Cybersecurity competition participation',
    'Technical-support experience across Windows and Linux',
    'Mentoring incoming cybersecurity students at NEISD iCSI',
    'Interest in both offensive and defensive security',
  ],
};

const TOOLS = [
  'Base64 encoder/decoder', 'URL encoder/decoder', 'Hex / text converter',
  'ROT13 / Caesar converter', 'Hash generator', 'Hash identifier',
  'Password entropy estimator', 'IOC parser & defanger', 'Regex tester',
  'Security headers checklist', 'IPv4 subnet calculator',
];

const LAB = {
  lede: 'The environment behind the CTF and penetration testing practice: an authorized home lab for offensive-security learning, plus the tooling that keeps it safe and documented.',
  note: 'Lab notes are published as they are written. Sensitive details such as exact topology, addresses, and credentials are never published.',
};

const ARCHITECTURE = {
  lede: 'A security-focused site should be able to explain itself. This page documents the stack, deployment model, and security controls the site uses.',
  stack: [
    { t: 'Astro 5, static output', d: 'Every page is prerendered to plain HTML at build time. There is no server, no runtime, and no rendering on request.' },
    { t: 'TypeScript, strict', d: 'The project extends Astro\'s strict tsconfig, and astro check type-checks every page and component.' },
    { t: 'Zero client JS by default', d: 'Pages ship no JavaScript. The only scripts are the mobile nav toggle, the theme control, and the interactive tools.' },
    { t: 'No external requests', d: 'System font stack, no CDN scripts, no remote images, no third-party anything.' },
  ],
  csp: "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; upgrade-insecure-requests",
};

module.exports = {
  NAV, SITE, HERO, IMG, DIM, ALT, CERTIFICATIONS, STACKABLE, STACKABLE_NOTE, NJHS,
  ROADMAP, SCHOLARSHIPS, AWARDS, NCL, COMPETITIONS, COMPETITIONS_NO_RESULT,
  EXPERIENCE, EDUCATION, SKILL_GROUPS, LEADERSHIP, CORE_AREAS, PROJECTS,
  WRITEUP, ABOUT, TOOLS, LAB, ARCHITECTURE,
};
