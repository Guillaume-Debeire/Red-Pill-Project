import { prisma } from '$lib/server/prisma.server';
import { json } from '@sveltejs/kit';

const ALLOWED_STATUS = ['A_VOIR', 'VU', 'PAS_VU', 'PAS_INTERESSE'] as const;
type FilmStatus = (typeof ALLOWED_STATUS)[number];

export async function PATCH({ params, request, locals }) {
	const user = locals.user;
	if (!user) {
		return new Response('Non autorisé', { status: 401 });
	}

	const filmId = Number(params.filmId);
	if (Number.isNaN(filmId)) {
		return new Response('ID invalide', { status: 400 });
	}

	const body = await request.json();
	const status: FilmStatus = body.status;

	if (!ALLOWED_STATUS.includes(status)) {
		return new Response('Statut invalide', { status: 400 });
	}

	const updatedEntry = await prisma.userFilmEntry.update({
		where: {
			userId_filmId: {
				userId: user.id,
				filmId
			}
		},
		data: {
			entryStatus: status,
			dateWatched: status === 'VU' ? new Date() : null
		}
	});

	return json(updatedEntry);
}
