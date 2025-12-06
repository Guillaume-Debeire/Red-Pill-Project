import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { prisma } from '$lib/server/prisma.server';
import { createJwt } from '$lib/server/auth';
import type { RequestHandler } from './$types';
import { signupSchema } from '$lib/validation/user';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const body = await request.json();
		const parsed = signupSchema.safeParse(body);
		if (!parsed.success) {
			return json({ error: parsed.error.flatten() }, { status: 400 });
		}

		const { email, password, username } = parsed.data;

		const existing = await prisma.user.findUnique({ where: { email } });
		if (existing) return json({ error: 'Email déjà utilisé.' }, { status: 400 });

		const hashed = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: { email, password: hashed, username }
		});

		const token = createJwt({ id: user.id, email: user.email, username: user.username });

		// Cookie HttpOnly
		cookies.set('session', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 7 // 7 jours
		});

		return json(
			{ message: 'Compte créé', user: { id: user.id, email: user.email, username: user.username } },
			{ status: 201 }
		);
	} catch (err) {
		console.error('Signup error:', err);
		return json({ error: 'Erreur serveur' }, { status: 500 });
	}
};
