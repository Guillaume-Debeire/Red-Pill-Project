import type { FilmUser } from './FilmUser.types';

export type User = {
	id: number;
	email: string;
	username: string;
	createdAt: Date;
	updatedAt: Date;
	films: FilmUser[];
};

export type UserSession =
	| {
			id: number;
			email: string;
			username: string;
	  }
	| undefined;
