import type { FilmDashboardStats } from '$lib/types/FilmStats.types';
import type { UserFilmEntryClient } from '$lib/types/FilmUser.types';

export function computeDashboardStats(entries: UserFilmEntryClient[] = []): FilmDashboardStats {
	const watched = entries.filter((e) => e.userStatus === 'VU');
	const toWatch = entries.filter((e) => e.userStatus === 'A_VOIR');
	const notSeen = entries.filter((e) => e.userStatus === 'PAS_VU');

	const totalRuntimeWatched = watched.reduce((sum, e) => sum + (e.film.runtime ?? 0), 0);

	const rated = watched.filter((e) => e.rating != null);

	const averageRating =
		rated.length > 0
			? rated.reduce((sum, e) => sum + (e.rating ?? 0), 0) / rated.length
			: undefined;

	const topRated = rated.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))[0];

	return {
		total: entries.length,
		watched: watched.length,
		toWatch: toWatch.length,
		notSeen: notSeen.length,
		totalRuntimeWatched,
		averageRating,
		topRated: topRated
			? {
					title: topRated.film.title,
					rating: topRated.rating!
				}
			: undefined
	};
}
