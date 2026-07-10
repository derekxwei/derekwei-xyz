import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Files starting with "_" (templates) are excluded by the glob pattern.
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/[^_]*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['shipped', 'in-progress', 'planned']),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    link: z.string().url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const writeups = defineCollection({
  loader: glob({ base: './src/content/writeups', pattern: '**/[^_]*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    event: z.string(),
    category: z.enum(['web', 'crypto', 'forensics', 'pwn', 'rev', 'osint', 'network', 'misc']),
    difficulty: z.enum(['easy', 'medium', 'hard', 'insane']).optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const labNotes = defineCollection({
  loader: glob({ base: './src/content/lab-notes', pattern: '**/[^_]*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writeups, 'lab-notes': labNotes };
