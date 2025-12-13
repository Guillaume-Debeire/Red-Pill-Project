import { PUBLIC_TMDB_KEY } from '$env/static/public';
import { filmDetailsSchema } from '$lib/schemas/tmdb/filmTMDB.schema';
import type { FilmBaseDTO, FilmDetailsDTO } from '$lib/types/Film.dto.types';
import type { UserFilmEntryClient } from '$lib/types/FilmUser.types';
import type { Film, UserFilmEntry } from '@prisma/client';

const TMDB_API = 'https://api.themoviedb.org/3';

export async function searchTMDB(query: string) {
	if (!query.trim()) return [];

	console.log('query', query);

	const res = await fetch(
		`${TMDB_API}/search/movie?query=${encodeURIComponent(query)}&api_key=${PUBLIC_TMDB_KEY}`
	);

	const data = await res.json();
	return data.results || [];
}

export async function getUserFilmEntryByTMDBId(id: number): Promise<UserFilmEntryClient | null> {
	try {
		// 1️⃣ Essayer la base interne
		const localRes = await fetch(`/api/user/film/${id}`);

		if (localRes.ok) {
			const localData = (await localRes.json()) as UserFilmEntryClient;

			console.log('localData', localData);

			return localData;
		}
		return null;
	} catch (e) {
		throw new Error();
	}
}

export async function getOrCreateFilmByTmdbId(id: number): Promise<UserFilmEntryClient | null> {
	try {
		const userFilmEntry = await getUserFilmEntryByTMDBId(id);

		if (userFilmEntry) {
			return userFilmEntry;
		}

		// 2️⃣ Film pas en base → fetch TMDB
		const tmdbRes = await fetch(`${TMDB_API}/movie/${id}?api_key=${PUBLIC_TMDB_KEY}`);

		if (!tmdbRes.ok) {
			console.error('TMDb fetch error:', tmdbRes.status);
			return null;
		}

		const tmdbData = await tmdbRes.json();
		const parsedTmdb = filmDetailsSchema.safeParse(tmdbData);

		if (!parsedTmdb.success) {
			console.error('TMDb data invalid:', parsedTmdb.error.format());
			return null;
		}

		const validatedFilm = parsedTmdb.data;

		// 3️⃣ Sauvegarder automatiquement le film en base
		const res = await fetch('/api/user-film-entry', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				userInfo: {
					filmId: validatedFilm.id,
					userStatus: 'PAS_VU'
				},
				filmData: validatedFilm
			})
		});
		if (!res.ok) {
			console.error('Could not save film to DB:', res.status);
			// On retourne quand même le film TMDB validé
		}

		const response = await res.json();

		const film = await getUserFilmEntryByTMDBId(response.filmId);

		return film;
	} catch (err) {
		console.error('Unexpected getOrCreateFilmByTmdbId error:', err);
		return null;
	}
}
