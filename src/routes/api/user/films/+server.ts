import { prisma } from '$lib/server/prisma.server';

export async function GET({ locals }) {
	const user = locals.user;
	if (!user) {
		throw new Error('Accès non autorisé');
	}

	const items = await prisma.userFilmEntry.findMany({
		where: { userId: user?.id },
		include: { film: true }
	});

	return new Response(JSON.stringify(items), {
		headers: { 'Content-Type': 'application/json' }
	});
}
