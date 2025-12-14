import type { UserFilmEntry } from '@prisma/client';
import type { FilmWithCollection } from './FilmWithCollection.types';

export interface UserFilmEntryClient extends UserFilmEntry {
	film: FilmWithCollection; // le film complet
}
