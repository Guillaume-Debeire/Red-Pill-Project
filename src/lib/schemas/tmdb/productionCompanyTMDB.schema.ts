import z from 'zod';

export const productionCompanyTMDBSchema = z.object({
	id: z.number(),
	logo_path: z.string().nullable(),
	name: z.string(),
	origin_country: z.string()
});

// export const productionCompanyDTOSchema = z.object({
// 	id: z.number(),
// 	logoPath: z.string().nullable(),
// 	name: z.string(),
// 	originCountry: z.string()
// });

export type ProductionCompanyTMDB = z.infer<typeof productionCompanyTMDBSchema>;

// export type ProductionCompanyDTOS = z.infer<typeof productionCompanyDTOSchema>;
