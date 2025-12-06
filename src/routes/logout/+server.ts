import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.set('session', '', {
		path: '/',
		expires: new Date(0)
	});

	return new Response(null, {
		status: 302,
		headers: { location: '/' }
	});
};
