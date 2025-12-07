import { json } from '@sveltejs/kit';
import { addFilm } from '$lib/server/filmRepository.server';

export async function POST({ request, locals }) {
	console.log('on tente !!');
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	try {
		const film = await request.json();
		const created = await addFilm(film);

		return json(created, { status: 201 });
	} catch (error) {
		console.error('Erreur API add film :', error);
		return json({ error: 'Erreur interne' }, { status: 500 });
	}
}
