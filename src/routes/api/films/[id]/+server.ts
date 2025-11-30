import { json } from '@sveltejs/kit';
import { getFilmById } from '$lib/server/filmRepository.server';

export async function GET({ params }) {
	const id = Number(params.id);

	const film = await getFilmById(id);

	if (!film) {
		return json({ error: 'Film not found' }, { status: 404 });
	}

	return json(film);
}
