import { PUBLIC_TMDB_KEY } from '$env/static/public';
import type { FilmDetails } from '$lib/types/Film.type';

const TMDB_API = 'https://api.themoviedb.org/3';

export async function searchTMDB(query: string) {
	if (!query.trim()) return [];

	const res = await fetch(
		`${TMDB_API}/search/movie?query=${encodeURIComponent(query)}&api_key=${PUBLIC_TMDB_KEY}`
	);

	const data = await res.json();
	return data.results || [];
}

export async function getFilmByTmdbId(id: number): Promise<FilmDetails | null> {
	const res = await fetch(`${TMDB_API}/movie/${id}?api_key=${PUBLIC_TMDB_KEY}`);
	if (!res.ok) {
		console.error('TMDb API error', res.status, await res.text());
		return null;
	}
	return (await res.json()) as FilmDetails;
}
