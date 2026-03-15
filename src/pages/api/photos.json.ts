import { getCollection } from "astro:content";

import { formatDate } from "../../utilities/formatDate";
import { formatAlbumSlug } from "../../utilities/formatAlbumSlug";

export async function GET() {
	const albums = await getCollection("albums");

	// Retrieve relevant data for the search index
	const index = albums.map((album) => {
		const date = formatDate(album.data.date);
		const slug = formatAlbumSlug(album.id);

		return {
			title: album.data.title,
			slug: slug,
			date: date.html,
			images: album.data.images,
		};
	});

	return new Response(
		JSON.stringify({
			index,
		}),
	);
}
