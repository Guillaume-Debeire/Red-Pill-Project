export interface FilmCollection {
	id?: number;
	name: string;
	poster_path: string | null;
	backdrop_path: string | null;
}

export interface FilmCollectionDTO {
	id?: number;
	name: string;
	posterPath: string | null;
	backdropPath: string | null;
}
