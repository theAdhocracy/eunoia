export const formatAlbumSlug = (slug: string) => {
	// Remove country subfolder
	const cleanSlug = slug.split("/").pop();

	return cleanSlug;
};
