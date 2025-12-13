import z from 'zod';

export const belongsToCollectionTMDBSchema = z.object({
	id: z.number(),
	name: z.string(),
	poster_path: z.string().nullable(),
	backdrop_path: z.string().nullable()
});

/**
 * Ce type sert uniquement à récupérer les données de l'API The Movie Database.
 */
export type BelongsToCollectionTMDB = z.infer<typeof belongsToCollectionTMDBSchema>;
