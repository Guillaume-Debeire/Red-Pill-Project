import { env } from '$env/dynamic/private';
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

	return resolve(event);
}
