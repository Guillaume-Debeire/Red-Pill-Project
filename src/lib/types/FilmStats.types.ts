export interface FilmDashboardStats {
	total: number;

	watched: number;
	toWatch: number;
	notSeen: number;

	totalRuntimeWatched: number; // en minutes
	averageRating?: number;

	topRated?: {
		title: string;
		rating: number;
	};
}
