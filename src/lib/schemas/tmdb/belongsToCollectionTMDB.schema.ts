import z from 'zod';

export const belongsToCollectionTMDBSchema = z.object({
	id: z.number(),
	name: z.string(),
	poster_path: z.string().nullable(),
	backdrop_path: z.string().nullable()
});

// export const belongsToCollectionDTOSchema = z.object({
// 	id: z.number().optional(),
// 	name: z.string(),
// 	posterPath: z.string().nullable(),
// 	backdropPath: z.string().nullable()
// });

export type BelongsToCollectionTMDB = z.infer<typeof belongsToCollectionTMDBSchema>;

// export type BelongsToCollectionDTO = z.infer<typeof belongsToCollectionDTOSchema>;
