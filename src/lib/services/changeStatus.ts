import { updateFilmStatus } from '$lib/api/userFilmEntry';
import type { FilmStatus } from '$lib/types/FilmStatus.types';
import type { UserFilmEntry } from '@prisma/client';

interface Params {
	filmId: number;
	status: UserFilmEntry['entryStatus'];
}

export async function changeStatus({ filmId, status }: Params) {
	if (!filmId) return;

	return await updateFilmStatus(filmId, status);
}
