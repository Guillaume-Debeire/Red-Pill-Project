import type { UserCollectionEntry, BelongsToCollection, Film } from '@prisma/client';

export interface CollectionWithFilms extends BelongsToCollection {
	films: Film[];
}

export interface UserCollectionEntryClient extends UserCollectionEntry {
	collection: CollectionWithFilms;
}
