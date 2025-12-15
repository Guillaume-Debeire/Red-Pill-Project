import { prisma } from '$lib/server/prisma.server';
import type { RequestHandler } from '../../$types';

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	const user = locals.user;
	if (!user) return new Response('Not authenticated', { status: 401 });

	const requestId = Number(params.id);
	if (isNaN(requestId)) return new Response('Invalid ID', { status: 400 });

	const { action } = await request.json(); // "ACCEPT" | "DECLINE" | "BLOCK"
	if (!['ACCEPT', 'DECLINE', 'BLOCK'].includes(action)) {
		return new Response('Invalid action', { status: 400 });
	}

	try {
		const friendRequest = await prisma.friendRequest.updateMany({
			where: {
				id: requestId,
				receiverId: user.id
			},
			data: {
				status: action === 'ACCEPT' ? 'ACCEPTED' : action === 'DECLINE' ? 'DECLINED' : 'BLOCKED'
			}
		});

		if (friendRequest.count === 0) return new Response('Friend request not found', { status: 404 });

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		console.error(err);
		return new Response('Server error', { status: 500 });
	}
};
