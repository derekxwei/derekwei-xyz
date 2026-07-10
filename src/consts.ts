/**
 * Single source of truth for site metadata and biography facts.
 * Edit here — pages import from this file instead of hard-coding.
 */

export const SITE = {
  name: 'Derek Wei',
  domain: 'derekwei.xyz',
  url: 'https://derekwei.xyz',
  title: 'Derek Wei — Cybersecurity',
  description:
    'Cybersecurity portfolio of Derek Wei: incoming UTSA B.S. Cybersecurity Honors student, CompTIA-certified, CTF competitor, blue-team focused.',
  email: 'derekxwei@gmail.com',
  location: 'San Antonio, Texas',
  /** Exact wording — do not paraphrase. */
  clearance: 'U.S. citizen eligible to obtain a Secret security clearance.',
} as const;

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Resume', href: '/resume/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Writeups', href: '/writeups/' },
  { label: 'Lab Notes', href: '/lab-notes/' },
  { label: 'Tools', href: '/tools/' },
  { label: 'Architecture', href: '/architecture/' },
  { label: 'Now', href: '/now/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/** Listed in the order earned (CompTIA progression), then vendor certs. */
export const CERTIFICATIONS = [
  { name: 'CompTIA IT Fundamentals+', short: 'ITF+', issuer: 'CompTIA' },
  { name: 'CompTIA Network+', short: 'Network+', issuer: 'CompTIA' },
  { name: 'CompTIA Security+', short: 'Security+', issuer: 'CompTIA' },
  { name: 'CompTIA CySA+', short: 'CySA+', issuer: 'CompTIA' },
  { name: 'CompTIA PenTest+', short: 'PenTest+', issuer: 'CompTIA' },
  {
    name: 'Microsoft Office Specialist: Word Associate',
    short: 'MOS Word',
    issuer: 'Microsoft',
  },
] as const;

export const COMPETITIONS = [
  { name: 'National Cyber League', kind: 'Cybersecurity skills competition' },
  { name: 'CyberPatriot', kind: 'National Youth Cyber Defense Competition' },
  { name: 'BYU CTF', kind: 'Capture the Flag' },
  { name: 'RowdyCon', kind: 'Capture the Flag' },
  { name: 'CTF@CIT', kind: 'Capture the Flag' },
  { name: 'Squ1rrel CTF', kind: 'Capture the Flag' },
] as const;

export const EDUCATION = [
  {
    school: 'The University of Texas at San Antonio',
    program: 'B.S. Cybersecurity, Honors College',
    detail: 'Incoming student — beginning Fall 2026',
  },
  {
    school: 'NEISD iCSI Cybersecurity Program',
    program: 'Career and technical cybersecurity program',
    detail: 'Completed — Class of 2026',
  },
  {
    school: 'MacArthur High School',
    program: 'High school diploma',
    detail: 'Graduate — Class of 2026',
  },
] as const;
