import type { ProductionCompanyTMDB } from '$lib/schemas/tmdb/productionCompanyTMDB.schema';
import type { ProductionCompany } from '@prisma/client';

export function adaptFilmProductionCompanyToDTO(
	prodcutionCompany: ProductionCompanyTMDB
): ProductionCompany {
	return {
		...prodcutionCompany,
		logoPath: prodcutionCompany.logo_path,
		originCountry: prodcutionCompany.origin_country
	};
}
