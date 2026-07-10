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
    'Cybersecurity portfolio of Derek Wei: incoming UTSA B.S. Cybersecurity Honors student, 5x CompTIA certified, 1st of 1,692 teams in the NCL High School division.',
  email: 'derekxwei@gmail.com',
  location: 'San Antonio, Texas',
  github: 'https://github.com/B1ueBurD',
  linkedin: 'https://www.linkedin.com/in/derekxwei',
  repo: 'https://github.com/B1ueBurD/derekwei-xyz',
  /** Exact wording, do not paraphrase. */
  clearance: 'U.S. citizen eligible to obtain a Secret security clearance.',
} as const;

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Resume', href: '/resume/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'CTF', href: '/ctf/' },
  { label: 'Lab', href: '/lab/' },
  { label: 'Tools', href: '/tools/' },
  { label: 'Architecture', href: '/architecture/' },
  { label: 'Now', href: '/now/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export interface Certification {
  name: string;
  short: string;
  issuer: string;
  year?: string;
}

/** Most advanced first, matching the resume. */
export const CERTIFICATIONS: readonly Certification[] = [
  { name: 'CompTIA CySA+', short: 'CySA+', issuer: 'CompTIA', year: '2026' },
  { name: 'CompTIA PenTest+', short: 'PenTest+', issuer: 'CompTIA', year: '2026' },
  { name: 'CompTIA Security+', short: 'Security+', issuer: 'CompTIA' },
  { name: 'CompTIA Network+', short: 'Network+', issuer: 'CompTIA' },
  { name: 'CompTIA IT Fundamentals+', short: 'ITF+', issuer: 'CompTIA' },
  {
    name: 'Microsoft Office Specialist: Word Associate',
    short: 'MOS Word',
    issuer: 'Microsoft',
  },
];

export const CERTIFICATION_NOTE =
  'Security+ and CySA+ satisfy the DoD 8570 Information Assurance (IA) baseline.';

export const CERTIFICATIONS_IN_PROGRESS = [
  'Hack The Box Certified Penetration Testing Specialist (CPTS)',
  'AWS Certified AI Practitioner',
] as const;

export interface Competition {
  name: string;
  kind: string;
  /** Verifiable placement, straight from the resume. Omit when none. */
  result?: string;
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

export interface EducationEntry {
  school: string;
  program: string;
  detail: string;
  note?: string;
}

export const EDUCATION: readonly EducationEntry[] = [
  {
    school: 'The University of Texas at San Antonio (UTSA)',
    program: 'B.S. Cybersecurity, Honors College; planned minor in AI/Data Science',
    detail: 'Expected May 2030',
  },
  {
    school: 'MacArthur High School / NEISD Institute of CyberSecurity and Innovation (iCSI)',
    program: 'High school diploma',
    detail: 'May 2026',
    note: "Member of iCSI's first four-year cybersecurity graduating class",
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
    period: 'Jun 2026 to Jul 2026',
    bullets: [
      "Support delivery of hands-on cybersecurity training to area students at St. Mary's University, assisting instructors with labs, exercises, and classroom activities",
      'Build and configure hands-on lab exercises in virtual machine (VM) environments so students can safely practice core security tasks, reducing instructor setup time and standardizing each station',
      'Reinforce foundational security topics, including incident detection and response, by guiding students through live exercises and resolving hardware, software, and connectivity issues in real time',
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
  {
    role: 'Founder',
    org: 'LearnLabs (learnlabs.us)',
    period: 'Jul 2023 to Present',
    bullets: [
      'Founded and operate an education initiative delivering tutoring and skill-building: developing curriculum, leading outreach, and coordinating instructors',
      'Design and refine instructional materials by researching topics, gathering learner feedback, and iterating on content; communicate with students and parents in English and Mandarin Chinese',
    ],
  },
];

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
    label: 'Languages',
    items: 'English (native), Mandarin Chinese (native/bilingual)',
  },
];

export const LEADERSHIP = [
  {
    role: 'Education Mentor, NEISD iCSI',
    period: '2023 to Present',
    detail:
      'Mentor incoming students and teach introductory cybersecurity topics in a hands-on classroom setting',
  },
  {
    role: 'Class President, Reagan High School Class of 2026',
    period: '2022 to 2024',
    detail:
      'Led the officer team in planning class events, fundraisers, and student initiatives',
  },
] as const;
