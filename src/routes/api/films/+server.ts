import { json } from '@sveltejs/kit';
import { addFilm } from '$lib/server/filmRepository.server';

export async function POST({ request }) {
	console.log('ye');
	try {
		const film = await request.json();
		const created = await addFilm(film);

		return json(created, { status: 201 });
	} catch (error) {
		console.error('Erreur API add film :', error);
		return json({ error: 'Erreur interne' }, { status: 500 });
	}
}

export function GET() {
	console.log('api connected');
	return json({ message: 'ok' });
}
