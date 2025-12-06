import { z } from 'zod';

export const userFilmCreateSchema = z.object({
	filmId: z.number(),
	status: z.enum(['vu', 'a-voir']),
	dateWatched: z.string().optional(), // ISO string
	rating: z.number().min(1).max(10).optional()
});

export type UserFilmCreateInputZod = z.infer<typeof userFilmCreateSchema>;
