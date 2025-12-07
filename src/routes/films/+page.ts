import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/user/films');

	if (!res.ok) {
		throw new Error('Failed to fetch user films');
	}

	const data = await res.json();

	console.log('data', data);

	return {
		films: data // tableau de UserFilm + Film
	};
};
