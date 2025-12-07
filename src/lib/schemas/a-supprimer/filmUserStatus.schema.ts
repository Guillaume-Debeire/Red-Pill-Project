import z from 'zod';

export const filmUserStatusSchema = z.enum(['vu', 'a-voir']);

export type FilmUserStatus = z.infer<typeof filmUserStatusSchema>;
