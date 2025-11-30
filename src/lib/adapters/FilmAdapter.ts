import type { FilmDetailsDTO } from '$lib/types/Film.dto.types';
import type { FilmDetails } from '$lib/types/Film.type';
import { adaptFilmProductionCompanyToDTO } from './adaptFilmProductionCompanyToDTO';
import { adaptFilmProductionCountryToDTO } from './adaptFilmProductionCountryToDTO';
import { adaptSpokenLanguagesToDTO } from './adaptSpokenLanguagesToDTO';

export function adaptFilmDetailsToDTO(film: FilmDetails): FilmDetailsDTO {
	return {
		tmdbId: film.id,
		adult: film.adult,
		backdropPath: film.backdrop_path,
		budget: film.budget,
		homepage: film.homepage,
		imdbId: film.imdb_id,
		originCountry: film.origin_country,
		originalLanguage: film.original_language,
		originalTitle: film.original_title,
		overview: film.overview,
		popularity: film.popularity,
		posterPath: film.poster_path,
		releaseDate: new Date(film.release_date),
		revenue: film.revenue,
		runtime: film.runtime,
		status: film.status,
		tagline: film.tagline,
		title: film.title,
		video: film.video,
		voteAverage: film.vote_average,
		voteCount: film.vote_count,
		genres: film.genres,
		productionCompanies: film.production_companies.map((production_company) =>
			adaptFilmProductionCompanyToDTO(production_company)
		),
		productionCountries: film.production_countries.map((country) =>
			adaptFilmProductionCountryToDTO(country)
		),
		spokenLanguages: film.spoken_languages.map((language) => adaptSpokenLanguagesToDTO(language))
	};
}
