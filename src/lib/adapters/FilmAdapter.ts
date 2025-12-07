import type { FilmDetails } from '$lib/schemas/tmdb/filmTMDB.schema';
import type { Prisma } from '@prisma/client';

export function adaptFilmDetailsToFilmCreateInput(
	film: Omit<FilmDetails, 'localid'>
): Prisma.FilmCreateInput {
	return {
		tmdbId: film.id,
		adult: film.adult === true,
		backdropPath: film.backdrop_path,
		budget: film.budget,
		homepage: film.homepage,
		imdbId: film.imdb_id,
		originCountry: film.origin_country ?? undefined,
		originalLanguage: film.original_language,
		originalTitle: film.original_title,
		overview: film.overview,
		popularity: film.popularity,
		posterPath: film.poster_path,
		releaseDate: film.release_date ? new Date(film.release_date) : undefined,
		revenue: film.revenue,
		runtime: film.runtime,
		releaseStatus: film.status,
		tagline: film.tagline,
		title: film.title,
		video: film.video,
		voteAverage: film.vote_average,
		voteCount: film.vote_count
	};
}
