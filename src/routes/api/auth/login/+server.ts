import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { prisma } from '$lib/server/prisma.server';
import { createJwt } from '$lib/server/auth';
import type { RequestHandler } from './$types';
import { loginSchema } from '$lib/validation/user';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const body = await request.json();
		const parsed = loginSchema.safeParse(body);
		if (!parsed.success) {
			return json({ error: parsed.error.flatten() }, { status: 400 });
		}

		const { email, password } = parsed.data;
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return json({ error: 'Email ou mot de passe incorrect.' }, { status: 400 });

		const ok = await bcrypt.compare(password, user.password);
		if (!ok) return json({ error: 'Email ou mot de passe incorrect.' }, { status: 400 });

		const token = createJwt({ id: user.id, email: user.email, username: (user as any).username });

		cookies.set('session', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 7
		});

		return json({
			message: 'Connexion ok',
			user: { id: user.id, email: user.email, username: (user as any).username }
		});
	} catch (err) {
		console.error('Login error:', err);
		return json({ error: 'Erreur serveur' }, { status: 500 });
	}
};
