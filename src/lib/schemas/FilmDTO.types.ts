// import z from 'zod';
// import { productionCompanyDTOSchema } from './tmdb/productionCompanyTMDB.schema';
// import { productionCountryDTOSchema } from './tmdb/productionCountryTMDB.schema';
// import { genreSchema } from './genre.schema';
// import { spokenLanguageDTOSchema } from './spokenLanguage.schema';
// import { belongsToCollectionDTOSchema } from './tmdb/belongsToCollectionTMDB.schema';

// export const filmBaseDTOSchema = z.object({
// 	adult: z.boolean(),
// 	backdropPath: z.string().nullable(),
// 	belongsToCollection: belongsToCollectionDTOSchema.nullable(),
// 	budget: z.number().nullable(),
// 	genres: z.array(genreSchema).nullable(),
// 	homepage: z.string().nullable(),
// 	imdbId: z.string().nullable(),
// 	originCountry: z.array(z.string()).nullable(),
// 	originalLanguage: z.string().nullable(),
// 	originalTitle: z.string().nullable(),
// 	overview: z.string().nullable(),
// 	popularity: z.number().nullable(),
// 	posterPath: z.string().nullable(),
// 	productionCompanies: z.array(productionCompanyDTOSchema).nullable(),
// 	productionCountries: z.array(productionCountryDTOSchema).nullable(),
// 	releaseDate: z.string().nullable(), // YYYY-MM-DD
// 	revenue: z.number().nullable(),
// 	runtime: z.number().nullable(),
// 	spokenLanguages: z.array(spokenLanguageDTOSchema).nullable(),
// 	releaseStatus: z.string().nullable(),
// 	tagline: z.string().nullable(),
// 	title: z.string(),
// 	video: z.boolean().nullable(),
// 	voteAverage: z.number().nullable(),
// 	voteCount: z.number().nullable()
// });

// export const filmDetailDTOSchema = filmBaseDTOSchema.extend({
// 	tmdbId: z.number()
// });

// export const filmLocalSchema = filmDetailDTOSchema.extend({
// 	id: z.number()
// });

// export type FilmDetailsDTO = z.infer<typeof filmDetailDTOSchema>;

// export type FilmLocal = z.infer<typeof filmLocalSchema>;
