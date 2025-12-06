import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma.server';
import bcrypt from 'bcryptjs';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		// Si déjà loggé → pas besoin d'aller ici
		throw redirect(302, '/films');
	}

	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const email = form.get('email')?.toString() ?? '';
		const password = form.get('password')?.toString() ?? '';

		if (!email || !password) {
			return { error: 'Email ou mot de passe manquant.' };
		}

		// Vérifier utilisateur
		const user = await prisma.user.findUnique({
			where: { email }
		});

		if (!user) {
			return { error: 'Identifiants invalides.' };
		}

		// Vérifier password
		const valid = await bcrypt.compare(password, user.password);

		if (!valid) {
			return { error: 'Identifiants invalides.' };
		}

		// TODO : créer la session (cookie / Lucia / JWT)
		console.log('User connecté :', user.email);

		return { success: true };
	}
};
