import z from 'zod';

export const productionCountryTMDBSchema = z.object({
	iso_3166_1: z.string(),
	name: z.string()
});

// export const productionCountryDTOSchema = z.object({
// 	iso31661: z.string(),
// 	name: z.string()
// });

export type ProductionCountryTMDB = z.infer<typeof productionCountryTMDBSchema>;

// export type ProductionCountryDTOS = z.infer<typeof productionCountryDTOSchema>;
