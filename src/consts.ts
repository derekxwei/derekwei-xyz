/**
 * Single source of truth for site metadata and biography facts.
 * Edit here; pages import from this file instead of hard-coding.
 * Facts mirror the maintained resume. Keep placements and dates verifiable.
 */

export const SITE = {
  name: 'Derek Wei',
  domain: 'derekwei.xyz',
  url: 'https://derekwei.xyz',
  title: 'Derek Wei - Cybersecurity',
  description:
    'Cybersecurity portfolio of Derek Wei: UTSA B.S. Cybersecurity Honors student, 5x CompTIA certified, 1st of 1,692 teams in the NCL High School division.',
  email: 'derekxwei@gmail.com',
  location: 'San Antonio, Texas',
  linkedin: 'https://linkedin.com/in/derekxwei',
  /** Exact wording, do not paraphrase. */
  clearance: 'U.S. citizen eligible to obtain a Secret security clearance.',
} as const;

/**
 * Public professional contact identity, used by the Contact page, /card, and
 * the vCard. The Google Voice number here is intentionally public; it is the
 * only telephone number that may appear anywhere on this site or in any
 * generated asset. This data renders in the browser on purpose - it is not a
 * secret and does not belong in environment variables.
 */
export const CONTACT = {
  name: SITE.name,
  title: 'B.S. Cybersecurity Honors Student',
  institution: 'The University of Texas at San Antonio',
  email: SITE.email,
  phoneDisplay: '(210) 716-0226',
  phoneE164: '+12107160226',
  website: SITE.url,
  linkedin: SITE.linkedin,
  resumePdf: '/Derek_Wei_Resume_Public.pdf',
  projects: '/projects/',
  location: SITE.location,
  vcard: '/derek-wei.vcf',
} as const;

// The ~/derekwei.xyz brand mark is the link home, so no separate Home item.
export const NAV = [
  { label: 'Resume', href: '/resume/' },
  { label: 'Achievements', href: '/achievements/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'CTF', href: '/ctf/' },
  { label: 'Lab', href: '/lab/' },
  { label: 'Tools', href: '/tools/' },
  { label: 'Architecture', href: '/architecture/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export interface Certification {
  name: string;
  short: string;
  issuer: string;
  year?: string;
  /** From the public Credly badge, verbatim. Omit when Credly lists none. */
  issued?: string;
  expires?: string;
  /**
   * True only where the issuer states the credential does not expire, as
   * CompTIA does for ITF+. Distinct from omitting `expires`, which means no
   * expiration is recorded here rather than that none exists.
   */
  neverExpires?: boolean;
  /** Public Credly badge URL. Never link Credly edit or account pages. */
  verifyUrl?: string;
}

/** Public Credly verification profile (the public URL, never the edit URL). */
export const CREDLY_PROFILE = 'https://www.credly.com/users/derek-wei.f1a98326';

/** Most advanced first, matching the resume. */
export const CERTIFICATIONS: readonly Certification[] = [
  {
    name: 'CompTIA CySA+',
    short: 'CySA+',
    issuer: 'CompTIA',
    year: '2026',
    issued: 'May 14, 2026',
    expires: 'May 14, 2029',
    verifyUrl: 'https://www.credly.com/badges/c567b6a1-ce8c-4b22-9707-a6ef7ed6b773/public_url',
  },
  {
    name: 'CompTIA PenTest+',
    short: 'PenTest+',
    issuer: 'CompTIA',
    year: '2026',
    issued: 'April 29, 2026',
    expires: 'April 29, 2032',
    verifyUrl: 'https://www.credly.com/badges/9755d071-4b25-4765-af4d-12cdd5a6f563/public_url',
  },
  {
    name: 'CompTIA Security+',
    short: 'Security+',
    issuer: 'CompTIA',
    year: '2026',
    issued: 'May 7, 2026',
    expires: 'April 29, 2032',
    verifyUrl: 'https://www.credly.com/badges/3a66db4e-f145-4eaa-a953-41d95ccfe70e/public_url',
  },
  {
    name: 'CompTIA Network+',
    short: 'Network+',
    issuer: 'CompTIA',
    year: '2024',
    issued: 'April 23, 2024',
    expires: 'April 29, 2032',
    verifyUrl: 'https://www.credly.com/badges/a9116ea8-2afb-4fbb-af6e-1d5267c7c0f3/public_url',
  },
  {
    name: 'CompTIA IT Fundamentals+',
    short: 'ITF+',
    issuer: 'CompTIA',
    year: '2023',
    issued: 'April 26, 2023',
    neverExpires: true,
    verifyUrl: 'https://www.credly.com/badges/c3447ccb-bffa-4505-80f8-6771fe62983e/public_url',
  },
  {
    name: 'AWS Certified AI Practitioner',
    short: 'AWS AI Practitioner',
    issuer: 'Amazon Web Services',
    year: '2026',
    issued: 'August 7, 2026',
    expires: 'August 7, 2029',
    verifyUrl: 'https://www.credly.com/badges/8197c6ef-1a3f-4449-b0e0-739b5329dcd2/public_url',
  },
  {
    name: 'Microsoft Office Specialist: Word Associate (Microsoft 365 Apps)',
    short: 'MOS Word',
    issuer: 'Microsoft',
    year: '2023',
    issued: 'December 8, 2023',
    neverExpires: true,
    verifyUrl: 'https://www.credly.com/badges/03879611-277a-42a3-af16-ec92f94f51ff/public_url',
  },
  {
    name: 'Microsoft Office Specialist: Excel Associate (Microsoft 365 Apps)',
    short: 'MOS Excel',
    issuer: 'Microsoft',
    year: '2026',
    issued: 'August 25, 2026',
    expires: 'August 25, 2031',
    verifyUrl: 'https://www.credly.com/badges/3e6cbff7-2a1c-4060-bbbd-4453a647b224/public_url',
  },
];

/**
 * CompTIA stackable certifications. Awarded for qualifying combinations of
 * the underlying certifications above - they are not additional exams and
 * are never counted toward the "5x CompTIA certified" statement.
 */
export const STACKABLE_CERTIFICATIONS: readonly Certification[] = [
  {
    name: 'CompTIA Network Security Professional (CNSP)',
    short: 'CNSP',
    issuer: 'CompTIA',
    expires: 'May 14, 2029',
    verifyUrl: 'https://www.credly.com/badges/c98ebc78-0824-4359-af3a-e1305ee31dde/public_url',
  },
  {
    name: 'CompTIA Network Vulnerability Assessment Professional (CNVP)',
    short: 'CNVP',
    issuer: 'CompTIA',
    expires: 'April 29, 2032',
    verifyUrl: 'https://www.credly.com/badges/dd01f58a-4a40-4be6-b77f-475568bcae1c/public_url',
  },
  {
    name: 'CompTIA Security Analytics Professional (CSAP)',
    short: 'CSAP',
    issuer: 'CompTIA',
    expires: 'May 14, 2029',
    verifyUrl: 'https://www.credly.com/badges/1de0b981-705a-445b-8b6f-3ec041228470/public_url',
  },
];

export const STACKABLE_NOTE =
  'CompTIA awards stackable certifications for earning qualifying combinations of underlying certifications. These credentials are listed separately and do not represent additional certification exams.';

/** Academic recognition from Credly. Never listed as a technical certification. */
export const NJHS_AWARD = {
  name: 'National Junior Honor Society Outstanding Achievement Award Recipient',
  year: '2022',
  verifyUrl: 'https://www.credly.com/badges/da66bf02-d8d2-4a3f-a8c1-57b7bb71d584/public_url',
} as const;

/**
 * Certification roadmap. These are goals in various stages, not earned
 * credentials. Never present them as held certifications.
 */
export const CERT_ROADMAP = {
  inProgress: ['Hack The Box Certified Penetration Testing Specialist (CPTS)'],
  next: ['AWS Certified Solutions Architect - Associate'],
  planned: [],
} as const;

export interface Competition {
  name: string;
  kind: string;
  /** Verifiable placement, straight from the resume. Omit when none. */
  result?: string;
  /** Published writeup that evidences this result, if one exists. */
  writeup?: { label: string; href: string };
}

export const COMPETITIONS: readonly Competition[] = [
  {
    name: 'National Cyber League',
    kind: 'Cybersecurity skills competition',
    result:
      '1st of 1,692 teams, High School division; 5th of 3,638, Standard Team division (Team Difference, Spring 2026)',
  },
  {
    name: 'THEM?!CTF',
    kind: 'Capture the Flag',
    result: '1st place, Team idktheflag (2026)',
  },
  {
    name: 'BYU CTF',
    kind: 'Capture the Flag',
    result: '3rd of 566 teams, Team idktheflag (2026)',
  },
  {
    name: 'Hackerverse Cyber Games (EC-Council)',
    kind: 'Capture the Flag',
    result: '3rd of 72 players, solo, reverse engineering (2026)',
  },
  {
    name: 'RowdyCon CTF',
    kind: 'Capture the Flag',
    result: '3rd of 85 teams (2026)',
  },
  {
    name: 'BroncoCTF 2026',
    kind: 'Capture the Flag',
    result: '8th of 753 teams with 3,777 points, Team idktheflag',
    writeup: { label: 'Read the AO-SINT writeup', href: '/ctf/broncoctf-2026-ao-sint/' },
  },
  {
    name: 'CTF@CIT',
    kind: 'Capture the Flag',
    result: '25th of 759 teams (2026)',
  },
  { name: 'Squ1rrel CTF', kind: 'Capture the Flag' },
  { name: 'CyberPatriot', kind: 'National Youth Cyber Defense Competition' },
];

/** Categories competed in at NCL, straight from the resume. */
export const NCL_CATEGORIES =
  'cryptography, password cracking, digital forensics, log analysis, network traffic analysis, OSINT, enumeration, and web application exploitation';

/** Competition skill areas, shown as a titled list on the homepage. */
export const COMPETITION_SKILLS = [
  'Web exploitation',
  'Cryptography',
  'Reverse engineering',
  'Digital forensics',
  'Open source intelligence (OSINT)',
  'Password cracking',
  'Network analysis',
  'Scripting and automation',
] as const;

export interface EducationEntry {
  school: string;
  program: string;
  detail: string;
  note?: string;
}

export const EDUCATION: readonly EducationEntry[] = [
  {
    school: 'The University of Texas at San Antonio (UTSA)',
    program: 'B.S. Cybersecurity, Honors College',
    detail: 'Expected May 2030',
  },
  {
    school: 'MacArthur High School / NEISD Institute of CyberSecurity and Innovation (iCSI)',
    program: 'High school diploma',
    detail: 'May 2026',
    note: "Member of iCSI's second four-year cybersecurity graduating class",
  },
];

export interface Scholarship {
  name: string;
  institution: string;
  year: string;
  /** Merit award amount. Omit when not applicable. */
  amount?: string;
}

/** Verified merit scholarships. Merit awards only, never need-based aid. */
export const SCHOLARSHIPS: readonly Scholarship[] = [
  {
    name: 'Distinguished Presidential Scholarship',
    institution: 'University of Texas at San Antonio',
    year: '2026',
    amount: '$5,000',
  },
  {
    name: 'Honors College Collaborative Scholarship',
    institution: 'University of Texas at San Antonio',
    year: '2026',
    amount: '$1,000',
  },
];

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  bullets: readonly string[];
}

export const EXPERIENCE: readonly ExperienceEntry[] = [
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

/** Concise, ATS-friendly core areas shown near the top of the resume. */
export const CORE_AREAS = [
  'Web Application Security',
  'Capture the Flag (CTF)',
  'Digital Forensics',
  'Open Source Intelligence (OSINT)',
  'Network Analysis',
  'Password Auditing',
  'Penetration Testing Fundamentals',
  'Security Tooling',
] as const;

export interface SkillGroup {
  label: string;
  items: string;
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    label: 'Security',
    items:
      'Vulnerability scanning, network traffic analysis, log analysis, incident detection and response, digital forensics, penetration testing fundamentals, cryptography, OSINT (open source intelligence), password cracking, web application exploitation',
  },
  {
    label: 'Systems and tooling',
    items:
      'Kali Linux, Windows, Linux command line, virtual machine (VM) environments, TCP/IP networking, Wireshark, Nmap, Metasploit, Burp Suite, hashcat, John the Ripper',
  },
  {
    label: 'Scripting and documentation',
    items:
      'Python, Bash, Git, technical documentation, Microsoft Word (MOS certified), Microsoft Excel',
  },
  {
    label: 'Professional skills',
    items:
      'Communication, technical documentation, troubleshooting, teamwork, mentoring, problem solving',
  },
  {
    label: 'Languages',
    items: 'English (native), Mandarin Chinese (native/bilingual)',
  },
];

export const LEADERSHIP = [
  {
    role: 'Esports and Finance Officer, Roadrunner Gaming (RRG)',
    period: 'Aug 2026 to Present',
    detail:
      'Manage esports managers, game rosters, and the competition calendar, and run fundraising for the club',
  },
  {
    role: 'Logistics Team Member, RowdyCon',
    period: 'Aug 2026 to Present',
    detail: 'Plan event logistics and manage the logistics budget for the conference',
  },
  {
    role: 'Education Mentor, NEISD iCSI',
    period: '2023 to Present',
    detail:
      'Mentor incoming students and teach introductory cybersecurity topics in a hands-on classroom setting',
  },
  {
    role: 'Class President, Reagan High School',
    period: '2022 to 2024',
    detail:
      'Led the officer team in planning class events, fundraisers, and student initiatives',
  },
] as const;
