import type { Film, UserFilmEntry } from '@prisma/client';

export interface UserFilmEntryClient extends UserFilmEntry {
	film: Film; // le film complet
}
