import type { PageLoad } from './$types';
import type { FilmLocal } from '$lib/types/Film.dto.types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/films/all');
	const films: FilmLocal[] = await res.json();

	return { films }; // ✅ clé 'films' correspond à `export let films` dans Svelte
};
