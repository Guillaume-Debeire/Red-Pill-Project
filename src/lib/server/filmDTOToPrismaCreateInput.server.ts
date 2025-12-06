import { adaptFilmDetailsToDTO } from '$lib/adapters/FilmAdapter';
import type { FilmDetailsDTO } from '$lib/types/Film.dto.types';
import type { FilmDetails } from '$lib/types/Film.types';
import type { Prisma } from '@prisma/client';

export function filmDTOToPrismaCreateInput(
	film: Omit<FilmDetails, 'localid'>
): Prisma.FilmCreateInput {
	const formattedFilm = {
		...adaptFilmDetailsToDTO(film),
		// 🌟 Collection (1:N)
		filmCollection: film.belongs_to_collection?.id
			? {
					connectOrCreate: {
						where: { id: film.belongs_to_collection?.id },
						create: {
							id: film.belongs_to_collection?.id,
							name: film.belongs_to_collection.name,
							posterPath: film.belongs_to_collection.poster_path,
							backdropPath: film.belongs_to_collection.backdrop_path
						}
					}
				}
			: undefined,

		// 🌟 Genres (N:N)
		genres: {
			connectOrCreate: film.genres.map((g) => ({
				where: { id: g.id },
				create: { id: g.id, name: g.name }
			}))
		},

		// 🌟 Production Companies (N:N)
		productionCompanies: {
			connectOrCreate: film.production_companies.map((pc) => ({
				where: { id: pc.id },
				create: {
					id: pc.id,
					name: pc.name,
					logoPath: pc.logo_path,
					originCountry: pc.origin_country
				}
			}))
		},
		productionCountries: {
			connectOrCreate: film.production_countries.map((pc) => ({
				where: { iso31661: pc.iso_3166_1 },
				create: {
					iso31661: pc.iso_3166_1,
					name: pc.name
				}
			}))
		},
		spokenLanguages: {
			connectOrCreate: film.spoken_languages.map((sl) => ({
				where: { iso6391: sl.iso_639_1 },
				create: {
					englishName: sl.english_name,
					iso6391: sl.iso_639_1,
					name: sl.name
				}
			}))
		},
		dateWatched: new Date()
	};
	return formattedFilm;
}
