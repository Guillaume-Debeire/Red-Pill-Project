export const load = async ({ fetch }) => {
	const res = await fetch('/api/user/collections');

	if (!res.ok) {
		return {
			collections: []
		};
	}

	const collections = await res.json();

	return {
		userCollectionEntryClient: collections ?? []
	};
};
