import { defineCollection, z } from "astro:content";

const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
    date: z.coerce.date().optional(),
    description: z.string().optional(),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional().default([]),
    series: z
      .object({
        name: z.string(),
        part: z.number(),
      })
      .optional(),
  }),
});

const navLink = z.object({ label: z.string(), href: z.string() });

const pages = defineCollection({
  type: "content",
  schema: z.object({
    // nav.md
    siteTitle: z.string().optional(),
    copyright: z.string().optional(),
    links: z.array(navLink).optional(),
    socialLinks: z.array(navLink).optional(),
    // 404.md
    lede: z.string().optional(),
  }),
});

export const collections = { writing, pages };
