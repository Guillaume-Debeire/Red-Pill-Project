import { PUBLIC_TMDB_KEY } from '$env/static/public';
import type { FilmDetails } from '$lib/schemas/tmdb/filmTMDB.schema';

export const TMDB_API = 'https://api.themoviedb.org/3';
export async function searchTMDB(query: string) {
	if (!query.trim()) return [];
	const res = await fetch(
		`${TMDB_API}/search/movie?query=${encodeURIComponent(query)}&api_key=${PUBLIC_TMDB_KEY}`
	);

	const data = await res.json();
	return data.results || [];
}

export async function getTmdbFilm(id: number) {
	const tmdbRes = await fetch(`${TMDB_API}/movie/${id}?api_key=${PUBLIC_TMDB_KEY}`);

	if (!tmdbRes.ok) {
		console.error('TMDB film introuvable', id);
		return null;
	}

	const tmdbData = await tmdbRes.json();
	return tmdbData;
}
