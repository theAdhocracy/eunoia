import { getCollection } from "astro:content";
import { formatDate } from "../../utilities/formatDate";

export async function GET() {
	const blogs = await getCollection("blog");

	// Retrieve relevant data for the search index
	const index = blogs.map((post) => {
		const date = formatDate(post.data.pubDate);

		return {
			title: post.data.title,
			author: post.data.author,
			tags: post.data.tags || [],
			htmlDate: date.html,
			date: date.short,
			slug: post.data.slug,
			body: post.body?.replace(/<[^>]+>/g, "") || "",
		};
	});

	return new Response(
		JSON.stringify({
			index,
		})
	);
}
