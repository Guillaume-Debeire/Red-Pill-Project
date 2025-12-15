import { prisma } from '$lib/server/prisma.server';

export async function GET({ locals }) {
	const user = locals.user;

	if (!user) {
		return new Response(JSON.stringify([]), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const items = await prisma.userCollectionEntry.findMany({
		where: { userId: user.id },
		include: {
			collection: true
		}
	});

	return new Response(JSON.stringify(items), {
		headers: { 'Content-Type': 'application/json' }
	});
}
