import type { Genre } from './Genre.type';
import type { ProductionCompanyDTO } from './ProductionCompany.type';
import type { ProductionCountryDTO } from './ProductionCountry.type';
import type { SpokenLanguageDTO } from './SpokenLanguage.type';

export interface FilmBaseDTO {
	adult: boolean;
	backdropPath: string | null;
	budget: number;
	genres: Genre[];
	homepage: string | null;
	imdbId: string | null;
	originCountry: string[];
	originalLanguage: string;
	originalTitle: string;
	overview: string | null;
	popularity: number;
	posterPath: string | null;
	productionCompanies: ProductionCompanyDTO[];
	productionCountries: ProductionCountryDTO[];
	releaseDate: Date;
	revenue: number;
	runtime: number | null;
	spokenLanguages: SpokenLanguageDTO[];
	status: string;
	tagline: string | null;
	title: string;
	video: boolean;
	voteAverage: number;
	voteCount: number;
}

export interface FilmDetailsDTO extends FilmBaseDTO {
	tmdbId: number;
}

export interface FilmLocal extends FilmDetailsDTO {
	localid: number;
	dateWatched: Date;
}
