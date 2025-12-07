import z from 'zod';

export const spokenLanguageSchema = z.object({
	english_name: z.string(),
	iso_639_1: z.string(),
	name: z.string()
});

export const spokenLanguageDTOSchema = z.object({
	englishName: z.string(),
	iso6391: z.string(),
	name: z.string()
});

export type SpokenLanguage = z.infer<typeof spokenLanguageSchema>;

export type SpokenLanguageDTO = z.infer<typeof spokenLanguageDTOSchema>;
