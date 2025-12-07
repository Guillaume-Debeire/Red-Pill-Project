import type { Film, UserFilm } from '@prisma/client';

export interface UserFilmClient extends UserFilm {
	film: Film | null; // le film complet
}
