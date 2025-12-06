import type { FilmLocal } from './Film.dto.types';
import type { FilmUserStatus } from './FilmUserStatus.types';

export type FilmUser = {
	id: number; // l'id du UserFilm / FilmListItem
	userId: number; // id de l'utilisateur
	filmId: number; // id du film
	film: FilmLocal; // le film complet
	userStatus: FilmUserStatus; // état du film pour cet utilisateur
	dateWatched?: Date; // date de visionnage, optionnelle si 'a voir'
	rating?: number; // note de 1 à 10
	createdAt: Date; // date de création dans la table UserFilm
	updatedAt: Date; // date de mise à jour
};

export type FilmUserCreateInput = {
	filmId: number;
	userStatus: FilmUserStatus;
	dateWatched?: string; // ISO date string
	rating?: number; // 1 à 10
};
