import { prisma } from '$lib/server/prisma.server';
import type { FilmDetails } from '$lib/types/Film.types';
import { filmDTOToPrismaCreateInput } from '$lib/server/filmDTOToPrismaCreateInput.server';

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
		orderBy: { dateWatched: 'desc' }
	});
}

export async function getFilmById(id: number) {
	return await prisma.film.findUnique({
		where: { tmdbId: id }
	});
}
