import { getCollection } from "astro:content";
import { formatDate } from "../../utilities/formatDate";

export async function GET() {
	const collection = await getCollection("chat");
	const chat = collection.sort((a: any, b: any) =>
		a.data.date < b.data.date ? 1 : -1,
	);

	// Retrieve relevant data for the search index
	const index = chat.map((message, index) => {
		const date = formatDate(message.data.date);
		const comment = message.data.comment.replace(
			/^<p>/,
			`<p><span>${message.data.author}:</span> `,
		);

		// Calculate which page the message belongs to
		const page = Math.floor(index / 25) + 1;

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
