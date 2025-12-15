import { prisma } from '$lib/server/prisma.server';
import type { RequestHandler } from '../$types';

export const GET: RequestHandler = async ({ locals }) => {
	const user = locals.user;
	if (!user) return new Response('Not authenticated', { status: 401 });

	const pendingRequests = await prisma.friendRequest.findMany({
		where: { receiverId: user.id, status: 'PENDING' },
		include: { sender: true }
	});

	return new Response(JSON.stringify(pendingRequests), { status: 200 });
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;
	if (!user) return new Response('Not authenticated', { status: 401 });

	const { receiverId } = await request.json();
	if (!receiverId) return new Response('receiverId is required', { status: 400 });

	try {
		const friendRequest = await prisma.friendRequest.create({
			data: {
				senderId: user.id,
				receiverId,
				status: 'PENDING'
			}
		});
		return new Response(JSON.stringify(friendRequest), { status: 201 });
	} catch (err: any) {
		if (err.code === 'P2002') {
			return new Response('Friend request already exists', { status: 409 });
		}
		console.error(err);
		return new Response('Server error', { status: 500 });
	}
};
