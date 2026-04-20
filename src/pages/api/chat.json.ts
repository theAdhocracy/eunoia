import { getCollection } from "astro:content";
import { formatDate } from "../../utilities/formatDate";

export async function GET() {
	const collection = await getCollection("chat");
	const chat = collection.sort((a: any, b: any) =>
		a.data.date < b.data.date ? 1 : -1,
	);

	// Combine with all other thoughts so that pagination can be calculated correctly
	const allThoughts = await getCollection("tweets").then((collection) =>
		[...collection, ...chat].sort((a: any, b: any) =>
			a.data.date < b.data.date ? 1 : -1,
		),
	);

	// Retrieve relevant data for the search index
	const index = chat.map((message, index) => {
		const date = formatDate(message.data.date);
		const comment = message.data.comment.replace(
			/^<p>/,
			`<p><span>${message.data.author}:</span> `,
		);

		// Calculate which page the message belongs to
		const allThoughtLocation = allThoughts.findIndex(
			(thought) => thought.data.id === message.data.id,
		);
		const page = Math.floor(allThoughtLocation / 25) + 1;

		return {
			id: message.data.id,
			author: message.data.author,
			date: date,
			comment: comment,
			page: page,
		};
	});

	return new Response(
		JSON.stringify({
			index,
		}),
	);
}
