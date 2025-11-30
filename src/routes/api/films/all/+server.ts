import { getAllFilms } from '$lib/server/filmRepository.server';
import { json } from '@sveltejs/kit';

export async function GET() {
	const films = await getAllFilms();
	return json(films);
}
