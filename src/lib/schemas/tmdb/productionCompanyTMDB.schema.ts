import z from 'zod';

export const productionCompanyTMDBSchema = z.object({
	id: z.number(),
	logo_path: z.string().nullable(),
	name: z.string(),
	origin_country: z.string()
});

/**
 * Ce type sert uniquement à récupérer les données de l'API The Movie Database.
 */
export type ProductionCompanyTMDB = z.infer<typeof productionCompanyTMDBSchema>;
