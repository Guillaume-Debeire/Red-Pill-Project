import type { ProductionCompany, ProductionCompanyDTO } from '$lib/types/ProductionCompany.type';

export function adaptFilmProductionCompanyToDTO(
	prodcutionCompany: ProductionCompany
): ProductionCompanyDTO {
	return {
		...prodcutionCompany,
		logoPath: prodcutionCompany.logo_path,
		originCountry: prodcutionCompany.origin_country
	};
}
