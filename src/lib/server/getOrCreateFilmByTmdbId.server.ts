import type { Film } from '@prisma/client';
import { prisma } from './prisma.server';
import { TMDB_API } from '$lib/services/tmdb/tmdb';
import { PUBLIC_TMDB_KEY } from '$env/static/public';
import { filmDetailsSchema } from '$lib/schemas/tmdb/filmTMDB.schema';
import { addFilm } from './filmRepository.server';

export async function getTmdbFilmById(id: number): Promise<Film | null> {
	const existing = await prisma.film.findUnique({
		where: { tmdbId: id }
	});

	if (existing) return existing;
	return null;
}

export async function getOrCreateFilmByTmdbId(id: number): Promise<Film | null> {
	const localRes = await getTmdbFilmById(id);
	if (localRes) {
		return localRes;
	}

	const tmdbRes = await fetch(`${TMDB_API}/movie/${id}?api_key=${PUBLIC_TMDB_KEY}`);

	if (!tmdbRes.ok) {
		console.error('TMDB film introuvable', id);
		return null;
	}

	const tmdbData = await tmdbRes.json();

	// 3️⃣ Validation Zod
	const parsed = filmDetailsSchema.safeParse(tmdbData);

	if (!parsed.success) {
		console.error('TMDB film invalide', parsed.error.format());
		return null;
	}

	const film = parsed.data;

	// 4️⃣ Création Prisma SAFE
	try {
		return await addFilm(film);
	} catch (e) {
		console.error('Erreur Prisma création film', id, e);
		return null;
	}
}
