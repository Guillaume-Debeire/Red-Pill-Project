import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	// On récupère l'utilisateur depuis le load du layout (si tu as un layout qui set locals.user)
	const { user } = await parent();

	if (!user) {
		throw redirect(302, '/');
	}

	return {};
};
