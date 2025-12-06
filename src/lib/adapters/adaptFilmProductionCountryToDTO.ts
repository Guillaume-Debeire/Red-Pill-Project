import type { ProductionCountry, ProductionCountryDTO } from '$lib/types/ProductionCountry.types';

export function adaptFilmProductionCountryToDTO(country: ProductionCountry): ProductionCountryDTO {
	return { ...country, iso31661: country.iso_3166_1 };
}
