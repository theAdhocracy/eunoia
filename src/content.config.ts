import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: () =>
		z.object({
			id: z.string(),
			title: z.string(),
			slug: z.string(),
			author: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
		}),
});

const comments = defineCollection({
	// Load Markdown and MDX files in the `src/content/comments/` directory.
	loader: glob({ base: "./src/content/comments", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: () =>
		z.object({
			postID: z.string(),
			author: z.string(),
			date: z.coerce.date(),
		}),
});

export const collections = { blog, comments };
