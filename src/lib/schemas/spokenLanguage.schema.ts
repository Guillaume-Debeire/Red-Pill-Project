import z from 'zod';

export const spokenLanguageDTOSchema = z.object({
	englishName: z.string(),
	iso6391: z.string(),
	name: z.string()
});

export type SpokenLanguageDTO = z.infer<typeof spokenLanguageDTOSchema>;
