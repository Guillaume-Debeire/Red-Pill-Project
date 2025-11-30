import type { FilmCollection } from './FilmCollection.type';
import type { Genre } from './Genre.type';
import type { ProductionCompany } from './ProductionCompany.type';
import type { ProductionCountry } from './ProductionCountry.type';
import type { SpokenLanguage } from './SpokenLanguage.type';

export interface FilmBase {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: FilmCollection | null;
	budget: number;
	genres: Genre[];
	homepage: string | null;
	imdb_id: string | null;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string | null;
	popularity: number;
	poster_path: string | null;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string; // YYYY-MM-DD
	revenue: number;
	runtime: number | null; // en minutes
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string | null;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface FilmDetails extends FilmBase {
	id: number; // TMDb ID
}
