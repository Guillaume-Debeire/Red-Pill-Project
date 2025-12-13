// src/routes/api/user-films/+server.ts
import { json } from '@sveltejs/kit';
import { z } from 'zod';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma.server';
import { filmDTOToPrismaCreateInput } from '$lib/adapters/filmDTOToPrismaCreateInput';

export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;
	if (!user) return json({ error: 'Not authenticated' }, { status: 401 });

	const body = await request.json();

	const { userInfo, filmData } = body;

	try {
		const prismaFilm = await prisma.film.upsert({
			where: { tmdbId: userInfo.filmId },
			update: {}, // rien à updater si déjà présent
			create: filmDTOToPrismaCreateInput({
				...filmData
			})
		});
		const userFilmEntry = await prisma.userFilmEntry.create({
			data: {
				userId: user.id,
				filmId: userInfo.filmId,
				userStatus: userInfo.userStatus,
				dateWatched: userInfo.dateWatched ? new Date(userInfo.dateWatched) : undefined,
				rating: userInfo.rating
			},
			include: {
				film: true // on renvoie aussi les infos du film
			}
		});

		return json(userFilmEntry, { status: 201 });
	} catch (err: any) {
		// Gestion de la contrainte unique userId+filmId
		if (
			err.code === 'P2002' &&
			err.meta?.target?.includes('userId') &&
			err.meta?.target?.includes('filmId')
		) {
			return json({ error: 'Film already exists for this user' }, { status: 409 });
		}
		console.error('Error creating userFilmEntry:', err);
		return json({ error: 'Server error' }, { status: 500 });
	}
};
