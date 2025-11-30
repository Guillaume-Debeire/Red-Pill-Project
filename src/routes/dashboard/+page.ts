import { getAllFilms } from '$lib/services/localdb';
import { generateStats } from '$lib/services/stats';

export async function load() {
	const films = await getAllFilms();
	const stats = generateStats({ films });

	return { stats };
}
