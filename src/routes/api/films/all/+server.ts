import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma.server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const films = await prisma.film.findMany({
		where: { userId: locals.user.id },
		orderBy: { dateWatched: 'desc' }
	});

	return json(films);
};
