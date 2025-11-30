import type { Film } from '$lib/types/film';

interface Props {
	films: Film[];
}

export function generateStats({ films }: Props) {
	return 'stats';
}
