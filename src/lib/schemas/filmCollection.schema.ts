import z from 'zod';

export const filmCollectionSchema = z.object({
	id: z.number().optional(),
	name: z.string(),
	poster_path: z.string().nullable(),
	backdrop_path: z.string().nullable()
});

export const filmCollectionDTOSchema = z.object({
	id: z.number().optional(),
	name: z.string(),
	posterPath: z.string().nullable(),
	backdropPath: z.string().nullable()
});
