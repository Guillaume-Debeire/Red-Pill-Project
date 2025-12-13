import z from 'zod';

export const spokenLanguageTMDBSchema = z.object({
	english_name: z.string(),
	iso_639_1: z.string(),
	name: z.string()
});

/**
 * Ce type sert uniquement à récupérer les données de l'API The Movie Database.
 */
export type SpokenLanguageTMDB = z.infer<typeof spokenLanguageTMDBSchema>;
