import Dexie from 'dexie';
import type { Film } from '$lib/types/film';

// Étape 1 : déclarer l'interface de ta DB
export interface RedPillDB extends Dexie {
	films: Dexie.Table<Film, number>; // <type de la table, type de clé primaire>
}

export const db = new Dexie('RedPillDB') as RedPillDB;

// Définition de la BDD et indexes
db.version(1).stores({
	films: '++id, tmdbId, title, year, dateWatched, rating, genres, director'
});

// =========================
// CRUD
// =========================

export async function addFilm(film: Film) {
	return await db.films.add(film);
}

export async function getAllFilms() {
	return await db.films.toArray();
}

export async function getFilmById(id: number) {
	return await db.films.get(id);
}

export async function updateFilm(id: number, updated: Partial<Film>) {
	return await db.films.update(id, updated);
}

export async function deleteFilm(id: number) {
	return await db.films.delete(id);
}

// =========================
// Filtres & recherches
// =========================

export async function searchFilms(query: string) {
	return await db.films
		.filter((f) => f.title.toLowerCase().includes(query.toLowerCase()))
		.toArray();
}

export async function filterByGenre(genre: string) {
	return await db.films.filter((f) => f.genres?.includes(genre)).toArray();
}

export async function filterByYear(year: number) {
	return await db.films.filter((f) => f.year === year).toArray();
}

// =========================
// Stats persos
// =========================

export async function statsTotalFilms() {
	const films = await getAllFilms();
	return films.length;
}

export async function statsByYear() {
	const films = await getAllFilms();
	const map: Record<number, number> = {};
	films.forEach((f) => {
		map[f.year] = (map[f.year] || 0) + 1;
	});
	return map; // { 2025: 12, 2024: 8, ... }
}

export async function statsByGenre() {
	const films = await getAllFilms();
	const map: Record<string, number> = {};
	films.forEach((f) => {
		f.genres?.forEach((g) => {
			map[g] = (map[g] || 0) + 1;
		});
	});
	return map; // { Action: 5, Drama: 8, ... }
}

export async function statsTotalRuntime() {
	const films = await getAllFilms();
	return films.reduce((sum, f) => sum + (f.runtime || 0), 0);
}

export async function statsRatingDistribution() {
	const films = await getAllFilms();
	const map: Record<number, number> = {}; // note -> count
	films.forEach((f) => {
		if (f.rating != null) {
			map[f.rating] = (map[f.rating] || 0) + 1;
		}
	});
	return map; // { 5: 2, 4: 10, ... }
}
