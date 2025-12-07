import z from 'zod';
import { productionCompanySchema } from './productionCompany.schema';
import { productionCountrySchema } from './productionCountry.schema';
import { genreSchema } from './genre.schema';
import { filmCollectionSchema } from './filmCollection.schema';
import { spokenLanguageSchema } from './spokenLanguage.schema';

export const filmBaseSchema = z.object({
	adult: z.boolean(),
	backdrop_path: z.string().nullable(),
	belongs_to_collection: filmCollectionSchema.nullable(),
	budget: z.number(),
	genres: z.array(genreSchema),
	homepage: z.string().nullable(),
	imdb_id: z.string().nullable(),
	origin_country: z.array(z.string()),
	original_language: z.string(),
	original_title: z.string(),
	overview: z.string().nullable(),
	popularity: z.number(),
	poster_path: z.string().nullable(),
	production_companies: z.array(productionCompanySchema),
	production_countries: z.array(productionCountrySchema),
	release_date: z.string(), // YYYY-MM-DD
	revenue: z.number(),
	runtime: z.number().nullable(),
	spoken_languages: z.array(spokenLanguageSchema),
	status: z.string(),
	tagline: z.string().nullable(),
	title: z.string(),
	video: z.boolean(),
	vote_average: z.number(),
	vote_count: z.number()
});

export const filmDetailsSchema = filmBaseSchema.extend({
	id: z.number()
});

export type FilmDetails = z.infer<typeof filmDetailsSchema>;
