import { PUBLIC_TMDB_KEY } from '$env/static/public';
import { adaptFilmDetailsToDTO } from '$lib/adapters/FilmAdapter';
import { filmDetailsSchema } from '$lib/schemas/film.schema';
import { filmDetailDTOSchema } from '$lib/schemas/FilmDTO.types';
import type { FilmBaseDTO, FilmDetailsDTO } from '$lib/types/Film.dto.types';

const TMDB_API = 'https://api.themoviedb.org/3';

export async function searchTMDB(query: string) {
	if (!query.trim()) return [];

	const res = await fetch(
		`${TMDB_API}/search/movie?query=${encodeURIComponent(query)}&api_key=${PUBLIC_TMDB_KEY}`
	);

	const data = await res.json();
	return data.results || [];
}

export async function getFilmByTmdbId(id: number): Promise<FilmDetailsDTO | null> {
	try {
		// 1️⃣ Essayer la base interne
		const localRes = await fetch(`/api/films/${id}`);

		if (localRes.ok) {
			const localData = await localRes.json();

			const parsed = filmDetailDTOSchema.safeParse({
				...localData
			});

			console.log('localData', localData);
			console.log('parsed', parsed.data);
			if (!parsed.success) {
				console.error('Film DB data invalid:', parsed.error.format());
				return null;
			}

			return parsed.data;
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
		const saveRes = await fetch(`/api/films`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(validatedFilm)
		});

		if (!saveRes.ok) {
			console.error('Could not save film to DB:', saveRes.status);
			// On retourne quand même le film TMDB validé
		}

		const filmLocal = adaptFilmDetailsToDTO(validatedFilm);

		return filmLocal;
	} catch (err) {
		console.error('Unexpected getFilmByTmdbId error:', err);
		return null;
	}
}
