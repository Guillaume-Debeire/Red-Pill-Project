import type {} from '$lib/schemas/spokenLanguage.schema';
import type { SpokenLanguageTMDB } from '$lib/schemas/tmdb/SpokenLanguageTMDB.schema';
import type { SpokenLanguage } from '@prisma/client';

export function adaptSpokenLanguagesToDTO(language: SpokenLanguageTMDB): SpokenLanguage {
	return {
		...language,
		englishName: language.english_name,
		iso6391: language.iso_639_1
	};
}
