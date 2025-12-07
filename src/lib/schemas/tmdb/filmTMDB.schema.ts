import z from 'zod';
import { genreSchema } from '../genre.schema';
import { spokenLanguageSchema } from '../spokenLanguage.schema';
import { belongsToCollectionTMDBSchema } from './belongsToCollectionTMDB.schema';
import { productionCompanyTMDBSchema } from './productionCompanyTMDB.schema';
import { productionCountryTMDBSchema } from './productionCountryTMDB.schema';

export const filmBaseSchema = z.object({
	adult: z.boolean().nullable(),
	backdrop_path: z.string().nullable(),
	belongs_to_collection: belongsToCollectionTMDBSchema.nullable(),
	budget: z.number().nullable(),
	genres: z.array(genreSchema).optional(),
	homepage: z.string().nullable(),
	imdb_id: z.string().nullable(),
	origin_country: z.array(z.string()).nullable(),
	original_language: z.string().nullable(),
	original_title: z.string().nullable(),
	overview: z.string().nullable(),
	popularity: z.number().nullable(),
	poster_path: z.string().nullable(),
	production_companies: z.array(productionCompanyTMDBSchema).optional(),
	production_countries: z.array(productionCountryTMDBSchema).optional(),
	release_date: z.string().nullable(), // YYYY-MM-DD
	revenue: z.number().nullable(),
	runtime: z.number().nullable(),
	spoken_languages: z.array(spokenLanguageSchema).optional(),
	status: z.string().nullable(),
	tagline: z.string().nullable(),
	title: z.string(),
	video: z.boolean().nullable(),
	vote_average: z.number().nullable(),
	vote_count: z.number().nullable()
});

export const filmDetailsSchema = filmBaseSchema.extend({
	id: z.number()
});

export type FilmDetails = z.infer<typeof filmDetailsSchema>;
