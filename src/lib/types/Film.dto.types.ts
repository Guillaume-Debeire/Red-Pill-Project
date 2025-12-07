import type { BelongsToCollectionDTO } from './FilmCollection.types';
import type { Genre } from './Genre.types';
import type { ProductionCompanyDTO } from './ProductionCompany.types';
import type { ProductionCountryDTO } from './ProductionCountry.types';
import type { SpokenLanguageDTO } from './SpokenLanguage.types';

export interface FilmBaseDTO {
	adult: boolean;
	backdropPath: string | null;
	belongsToCollection: BelongsToCollectionDTO | null;
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
	releaseStatus: string;
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
}
