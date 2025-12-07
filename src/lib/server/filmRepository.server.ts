import { prisma } from '$lib/server/prisma.server';
import { filmDTOToPrismaCreateInput } from '$lib/adapters/filmDTOToPrismaCreateInput';
import type { FilmDetails } from '$lib/schemas/tmdb/filmTMDB.schema';
import type { Film } from '@prisma/client';

// =========================
// CRUD
// =========================

export async function addFilm(film: FilmDetails) {
	const prismaData = filmDTOToPrismaCreateInput({
		...film
	});

	return await prisma.film.create({
		data: prismaData
	});
}

export async function getAllFilms() {
	return await prisma.film.findMany({
		orderBy: { title: 'desc' }
	});
}

export async function getFilmById(id: number) {
	return await prisma.film.findUnique({
		where: { tmdbId: id }
	});
}
