// src/routes/api/friends/+server.ts
import { prisma } from '$lib/server/prisma.server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	const user = locals.user;
	if (!user) return new Response('Not authenticated', { status: 401 });

	try {
		const friends = await prisma.user.findUnique({
			where: { id: user.id },
			include: {
				sentFriendRequests: {
					where: { status: 'ACCEPTED' },
					include: { receiver: true }
				},
				receivedFriendRequests: {
					where: { status: 'ACCEPTED' },
					include: { sender: true }
				}
			}
		});

		// On merge les deux côtés pour une liste simple
		const friendList = [
			...(friends?.sentFriendRequests.map((fr) => fr.receiver) ?? []),
			...(friends?.receivedFriendRequests.map((fr) => fr.sender) ?? [])
		];

		return new Response(JSON.stringify(friendList), { status: 200 });
	} catch (err) {
		console.error(err);
		return new Response('Server error', { status: 500 });
	}
};
