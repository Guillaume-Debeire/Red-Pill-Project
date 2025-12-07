import { PUBLIC_TMDB_KEY } from '$env/static/public';
import { filmDetailsSchema } from '$lib/schemas/tmdb/filmTMDB.schema';
import { filmDTOToPrismaCreateInput } from '$lib/adapters/filmDTOToPrismaCreateInput';
import type { FilmBaseDTO, FilmDetailsDTO } from '$lib/types/Film.dto.types';
import type { Film, UserFilm } from '@prisma/client';

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

export async function getUserFilmById(id: number): Promise<UserFilm | null> {
	try {
		// 1️⃣ Essayer la base interne
		const localRes = await fetch(`/api/user/film/${id}`);

		if (localRes.ok) {
			const localData = (await localRes.json()) as UserFilm;

			console.log('localData', localData);

			return localData;
		}
		return null;
	} catch (e) {
		throw new Error();
	}
	return null;
}

export async function getOrCreateFilmByTmdbId(id: number): Promise<UserFilm | null> {
	try {
		console.log('id', id);
		const userFilm = await getUserFilmById(id);

		console.log('user film ', userFilm);

		if (userFilm) {
			return userFilm;
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
		// const dataToDB = filmDTOToPrismaCreateInput(validatedFilm);

		// 3️⃣ Sauvegarder automatiquement le film en base
		const res = await fetch('/api/user-films', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				userInfo: {
					filmId: validatedFilm.id,
					userStatus: 'pas-vu'
				},
				filmData: validatedFilm
			})
		});
		if (!res.ok) {
			console.error('Could not save film to DB:', res.status);
			// On retourne quand même le film TMDB validé
		}

		// console.log('saveRes', await saveRes.json());

		// const filmLocal = adaptFilmDetailsToDTO(validatedFilm);

		const response = await res.json();

		console.log('response ici', response);

		const film = await getUserFilmById(response.filmId);

		return film;
	} catch (err) {
		console.error('Unexpected getFilmByTmdbId error:', err);
		return null;
	}
	return null;
}
