export async function updateFilmStatus(filmId: number, status: 'A_VOIR' | 'VU' | 'PAS_VU') {
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
