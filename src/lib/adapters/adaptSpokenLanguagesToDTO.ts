import type { SpokenLanguage, SpokenLanguageDTO } from '$lib/schemas/spokenLanguage.schema';

export function adaptSpokenLanguagesToDTO(language: SpokenLanguage): SpokenLanguageDTO {
	return {
		...language,
		englishName: language.english_name,
		iso6391: language.iso_639_1
	};
}
