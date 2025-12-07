import z from 'zod';

export const productionCountrySchema = z.object({
	iso_3166_1: z.string(),
	name: z.string()
});

export const productionCountryDTOSchema = z.object({
	iso31661: z.string(),
	name: z.string()
});
