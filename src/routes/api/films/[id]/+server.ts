import { json } from '@sveltejs/kit';
import { getFilmById } from '$lib/server/filmRepository.server';

export async function GET({ params, locals }) {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	const id = Number(params.id);

	console.log('id server', id);

	const film = await getFilmById(id);

	if (!film) {
		return json({ error: 'Film not found' }, { status: 404 });
	}

	return json(film);
}
