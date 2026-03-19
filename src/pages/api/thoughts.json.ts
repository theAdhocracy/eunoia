import { getCollection } from "astro:content";
import { formatDate } from "../../utilities/formatDate";

export async function GET() {
	const chat = await getCollection("chat");

	// Retrieve relevant data for the search index
	const index = chat.map((message) => {
		const date = formatDate(message.data.date);
		const comment = message.data.comment.replace(
			/^<p>/,
			`<p><span>${message.data.author}:</span> `,
		);

		return {
			id: message.data.id,
			author: message.data.author,
			date: date,
			comment: comment,
		};
	});

	return new Response(
		JSON.stringify({
			index,
		}),
	);
}
