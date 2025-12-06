import type { UserSession } from '$lib/types/User.types.js';

export async function load({ locals }): Promise<{ user: UserSession }> {
	return {
		user: locals.user
	};
}
