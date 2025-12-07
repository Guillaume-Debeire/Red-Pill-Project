import type { ProductionCountryTMDB } from '$lib/schemas/tmdb/productionCountryTMDB.schema';
import type { ProductionCountry } from '@prisma/client';

export function adaptFilmProductionCountryToDTO(country: ProductionCountryTMDB): ProductionCountry {
	return { ...country, iso31661: country.iso_3166_1 };
}
