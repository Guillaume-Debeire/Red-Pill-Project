import { filmDTOToPrismaCreateInput } from '$lib/adapters/filmDTOToPrismaCreateInput';
import type { UserFilmEntryClient } from '$lib/types/FilmUser.types';
import { getTmdbFilm } from './tmdb/tmdb';

export async function getUserFilmEntryByTMDBId(id: number): Promise<UserFilmEntryClient | null> {
	try {
		// 1️⃣ Essayer la base interne
		const localRes = await fetch(`/api/user/film/${id}`);

		if (localRes.ok) {
			const localData = (await localRes.json()) as UserFilmEntryClient;

			return localData;
		}
		return null;
	} catch (e) {
		throw new Error();
	}
}
export async function getOrCreateFilmEntryByTmdbId(
	id: number
): Promise<UserFilmEntryClient | null> {
	try {
		// 1️⃣ Déjà en DB ?
		const existing = await getUserFilmEntryByTMDBId(id);
		if (existing) return existing;

		const filmData = await getTmdbFilm(id);

		const prismaData = filmDTOToPrismaCreateInput({
			...filmData
		});

		console.log('prismaData');

		// 2️⃣ Laisser le serveur gérer le reste
		const res = await fetch('/api/user-film-entry', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				filmId: id,
				entryStatus: 'PAS_VU'
			})
		});

		if (!res.ok) {
			console.error('Could not create UserFilmEntry', res.status);
			return null;
		}

		return (await res.json()) as UserFilmEntryClient;
	} catch (err) {
		console.error('getOrCreateFilmEntryByTmdbId failed', err);
		return null;
	}
}
