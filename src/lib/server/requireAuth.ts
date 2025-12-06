import { json } from '@sveltejs/kit';

export function requireAuth(locals: App.Locals) {
	if (!locals.user) throw json({ error: 'Unauthorized' }, { status: 401 });
	return locals.user;
}
