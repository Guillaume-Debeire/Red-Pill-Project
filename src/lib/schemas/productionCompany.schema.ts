import z from 'zod';

export const productionCompanySchema = z.object({
	id: z.number(),
	logo_path: z.string().nullable(),
	name: z.string(),
	origin_country: z.string()
});

export const productionCompanyDTOSchema = z.object({
	id: z.number(),
	logoPath: z.string().nullable(),
	name: z.string(),
	originCountry: z.string()
});
