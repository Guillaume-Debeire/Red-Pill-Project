import z from 'zod';

export const productionCountryTMDBSchema = z.object({
	iso_3166_1: z.string(),
	name: z.string()
});

/**
 * Ce type sert uniquement à récupérer les données de l'API The Movie Database.
 */
export type ProductionCountryTMDB = z.infer<typeof productionCountryTMDBSchema>;
