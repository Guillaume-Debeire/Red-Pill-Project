import { adaptFilmDetailsToFilmCreateInput } from '$lib/adapters/FilmAdapter';
import type { FilmDetails } from '$lib/schemas/tmdb/filmTMDB.schema';
import type { Prisma } from '@prisma/client';

export function filmDTOToPrismaCreateInput(
	film: Omit<FilmDetails, 'localid'>
): Prisma.FilmCreateInput {
	const formattedFilm = {
		...adaptFilmDetailsToFilmCreateInput(film),
		// 🌟 Collection (1:N)
		belongsToCollection: film.belongs_to_collection?.id
			? {
					connectOrCreate: {
						where: { tmdbId: film.belongs_to_collection?.id },
						create: {
							tmdbId: film.belongs_to_collection?.id,
							name: film.belongs_to_collection.name,
							posterPath: film.belongs_to_collection.poster_path,
							backdropPath: film.belongs_to_collection.backdrop_path
						}
					}
				}
			: undefined,

		// 🌟 Genres (N:N)
		genres: film.genres
			? {
					connectOrCreate: film.genres.map((g) => ({
						where: { id: g.id },
						create: { id: g.id, name: g.name }
					}))
				}
			: undefined,

		// 🌟 Production Companies (N:N)
		productionCompanies: {
			connectOrCreate: film.production_companies?.map((pc) => ({
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
			connectOrCreate: film.production_countries?.map((pc) => ({
				where: { iso31661: pc.iso_3166_1 },
				create: {
					iso31661: pc.iso_3166_1,
					name: pc.name
				}
			}))
		},
		spokenLanguages: {
			connectOrCreate: film.spoken_languages?.map((sl) => ({
				where: { iso6391: sl.iso_639_1 },
				create: {
					englishName: sl.english_name,
					iso6391: sl.iso_639_1,
					name: sl.name
				}
			}))
		}
	};
	return formattedFilm;
}
