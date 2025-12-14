import type { Film, BelongsToCollection } from '@prisma/client';

export interface FilmWithCollection extends Film {
	belongsToCollection?: BelongsToCollection | null;
}
