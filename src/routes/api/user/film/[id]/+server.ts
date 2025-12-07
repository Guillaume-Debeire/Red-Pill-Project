import { prisma } from '$lib/server/prisma.server';
import { redirect } from '@sveltejs/kit';

export async function GET({ params, locals }) {
	const user = locals.user;
	if (!user) {
		throw new Error('Accès non autorisé');
	}

	const id = Number(params.id);

	const item = await prisma.userFilm.findUnique({
		where: { userId_filmId: { filmId: id, userId: user.id } },
		include: { film: true }
	});

	return new Response(JSON.stringify(item), {
		headers: { 'Content-Type': 'application/json' }
	});
}
