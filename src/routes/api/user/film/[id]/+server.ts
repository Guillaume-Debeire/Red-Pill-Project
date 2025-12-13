import { prisma } from '$lib/server/prisma.server';
import type { UserFilmEntryClient } from '$lib/types/FilmUser.types';

export async function GET({ params, locals }) {
	const user = locals.user;
	if (!user) {
		return new Response('Accès non autorisé', { status: 401 });
	}

	const filmId = Number(params.id);
	if (Number.isNaN(filmId)) {
		return new Response('ID invalide', { status: 400 });
	}

	const userFilmEntry = await prisma.userFilmEntry.findUnique({
		where: {
			userId_filmId: {
				userId: user.id,
				filmId
			}
		},
		include: {
			film: true
		}
	});

	if (!userFilmEntry) {
		return new Response('Film non trouvé', { status: 404 });
	}

	const userFilmEntryClient: UserFilmEntryClient = userFilmEntry;

	return new Response(JSON.stringify(userFilmEntryClient), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
