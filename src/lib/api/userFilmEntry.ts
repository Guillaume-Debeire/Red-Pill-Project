import type { UserFilmEntry } from '@prisma/client';

export async function updateFilmStatus(filmId: number, status: UserFilmEntry['entryStatus']) {
	const res = await fetch(`/api/user-film-entry/${filmId}/status`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ status })
	});

	if (!res.ok) {
		throw new Error('Impossible de modifier le statut');
	}

	return res.json();
}
