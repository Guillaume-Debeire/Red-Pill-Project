import { updateFilmStatus } from '$lib/api/userFilmEntry';
import type { FilmStatus } from '$lib/types/FilmStatus.types';

interface Params {
	filmId: number;
	status: FilmStatus;
}

export async function changeStatus({ filmId, status }: Params) {
	if (!filmId) return;

	return await updateFilmStatus(filmId, status);
}
