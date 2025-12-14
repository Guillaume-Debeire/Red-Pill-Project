// src/routes/api/user-films/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma.server';
import { getOrCreateFilmByTmdbId } from '$lib/server/getOrCreateFilmByTmdbId.server';

export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;
	if (!user) return json({ error: 'Not authenticated' }, { status: 401 });

	const body = await request.json();
	const { filmId, entryStatus, dateWatched } = body;

	if (!filmId || !entryStatus) {
		return json({ error: 'Missing fields' }, { status: 400 });
	}

	try {
		// 1️⃣ S’assurer que le film existe (TMDB + collections incluses)
		const film = await getOrCreateFilmByTmdbId(filmId);

		if (!film) {
			return json({ error: 'Film not found' }, { status: 404 });
		}

		// 2️⃣ Créer l’entrée user (ou retourner l’existante)
		const userFilmEntry = await prisma.userFilmEntry.upsert({
			where: {
				userId_filmId: {
					userId: user.id,
					filmId: film.tmdbId
				}
			},
			update: {
				entryStatus,
				dateWatched: dateWatched ? new Date(dateWatched) : undefined
			},
			create: {
				userId: user.id,
				filmId: film.tmdbId,
				entryStatus,
				dateWatched: dateWatched ? new Date(dateWatched) : undefined
			},
			include: {
				film: true
			}
		});

		return json(userFilmEntry, { status: 201 });
	} catch (err) {
		console.error('Error creating userFilmEntry:', err);
		return json({ error: 'Server error' }, { status: 500 });
	}
};
