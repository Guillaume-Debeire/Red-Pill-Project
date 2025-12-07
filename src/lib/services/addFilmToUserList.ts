import { userFilmCreateSchema, type UserFilmCreateInputZod } from '$lib/schemas/userFilm.schema';
import type { FilmDetails } from '$lib/types/Film.types';

interface Props {
	input: UserFilmCreateInputZod;
	film: FilmDetails;
}
export async function addFilmToUserList({ input, film }: Props) {
	const parsed = userFilmCreateSchema.safeParse(input);

	if (!parsed.success) throw new Error('Invalid data');

	const res = await fetch('/api/user-films', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			userInfo: parsed.data,
			filmData: film
		})
	});

	if (!res.ok) throw new Error('Erreur serveur');

	return res.json();
}
