import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export async function handle({ event, resolve }) {
	const token = event.cookies.get('session');

	if (token) {
		try {
			const decoded = jwt.verify(token, env.JWT_SECRET);
			event.locals.user = decoded as { id: number; email: string; username: string };
		} catch (err) {
			event.locals.user = undefined;
		}
	} else {
		event.locals.user = undefined;
	}

	if (event.locals.user && event.url.pathname === '/') {
		throw redirect(302, '/films');
	}

	return resolve(event);
}
