export interface Film {
	id: string;
	tmdbId?: number;
	title: string;
	releaseDate: Date;
	year: number;
	runtime: number;
	genres: string[];
	director?: string;
	dateWatched: Date;
	overview?: string;
	rating?: number;
	tags?: string[];
	note?: string;
}

export interface FilmDetails {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string | null;
		backdrop_path: string | null;
	} | null;
	budget: number;
	genres: {
		id: number;
		name: string;
	}[];
	homepage: string | null;
	id: number; // TMDb ID
	imdb_id: string | null;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string | null;
	popularity: number;
	poster_path: string | null;
	production_companies: {
		id: number;
		logo_path: string | null;
		name: string;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	}[];
	release_date: string; // YYYY-MM-DD
	revenue: number;
	runtime: number | null; // en minutes
	spoken_languages: {
		english_name: string;
		iso_639_1: string;
		name: string;
	}[];
	status: string;
	tagline: string | null;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
