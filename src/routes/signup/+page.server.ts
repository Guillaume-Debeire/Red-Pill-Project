import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma.server';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import { signupSchema, type SignupData } from '$lib/validation/user';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/films');
	}

	return {};
};

// export const actions = {
// 	default: async ({ request }) => {
// 		const data = Object.fromEntries(await request.formData());

// 		const parsed = signupSchema.safeParse(data);

// 		if (!parsed.success) {
// 			return fail(400, {
// 				error: parsed.error.message
// 			});
// 		}

// 		const { email, password, username } = parsed.data satisfies SignupData;

// 		const existing = await prisma.user.findUnique({ where: { email } });
// 		if (existing) {
// 			return fail(400, { error: 'Cet email est déjà utilisé.' });
// 		}

// 		const hashed = await bcryptjs.hash(password, 10);

// 		console.log('hashed', hashed);

// 		await prisma.user.create({
// 			data: { email, password: hashed, username }
// 		});

// 		throw redirect(303, '/login');
// 	}
// };
