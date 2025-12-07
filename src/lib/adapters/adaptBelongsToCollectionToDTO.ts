import type { BelongsToCollectionTMDB } from '$lib/schemas/tmdb/belongsToCollectionTMDB.schema';

import type { BelongsToCollection } from '@prisma/client';

export function adaptBelongsToCollectionToDTO(
	belongsToCollection: BelongsToCollectionTMDB
): BelongsToCollection {
	return {
		...belongsToCollection,
		backdropPath: belongsToCollection.backdrop_path,
		posterPath: belongsToCollection.poster_path
	};
}
