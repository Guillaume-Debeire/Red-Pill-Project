import z from 'zod';
import { productionCompanyDTOSchema } from './productionCompany.schema';
import { productionCountryDTOSchema } from './productionCountry.schema';
import { genreSchema } from './genre.schema';
import { filmCollectionDTOSchema } from './filmCollection.schema';
import { spokenLanguageSchema } from './spokenLanguage.schema';

export const filmBaseDTOSchema = z.object({
	adult: z.boolean(),
	backdropPath: z.string().nullable(),
	belongsToCollection: filmCollectionDTOSchema.nullable(),
	budget: z.number(),
	genres: z.array(genreSchema),
	homepage: z.string().nullable(),
	imdbId: z.string().nullable(),
	originCountry: z.array(z.string()),
	originalLanguage: z.string(),
	originalTitle: z.string(),
	overview: z.string().nullable(),
	popularity: z.number(),
	posterPath: z.string().nullable(),
	productionCompanies: z.array(productionCompanyDTOSchema),
	productionCountries: z.array(productionCountryDTOSchema),
	releaseDate: z.string(), // YYYY-MM-DD
	revenue: z.number(),
	runtime: z.number().nullable(),
	spokenLanguages: z.array(spokenLanguageSchema),
	releaseStatus: z.string(),
	tagline: z.string().nullable(),
	title: z.string(),
	video: z.boolean(),
	voteAverage: z.number(),
	voteCount: z.number()
});

export const filmDetailDTOSchema = filmBaseDTOSchema.extend({
	tmdbId: z.number()
});

export const filmLocalSchema = filmDetailDTOSchema.extend({
	localid: z.number()
});

export type FilmDetailsDTO = z.infer<typeof filmDetailDTOSchema>;
