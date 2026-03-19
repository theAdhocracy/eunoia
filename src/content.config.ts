import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

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
			description: z.string().optional(),
			tags: z.array(z.string()).optional(),
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
			reply: z.string().optional(),
			replyLevel: z.number().optional(),
		}),
});

const albums = defineCollection({
	// Load Markdown and MDX files in the `src/content/albums/` directory.
	loader: glob({ base: "./src/content/albums", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: () =>
		z.object({
			title: z.string(),
			author: z.string(),
			description: z.string().optional(),
			date: z.coerce.date(),
			thumbnail: z.string().optional(),
			images: z
				.array(
					z.object({
						url: z.string(),
						caption: z.string().optional(),
						comments: z
							.array(
								z.object({
									text: z.string(),
								}),
							)
							.optional(),
					}),
				)
				.optional(),
		}),
});

const chat = defineCollection({
	loader: file("./src/content/thoughts/chat.json"),
});

export const collections = { blog, comments, albums, chat };
