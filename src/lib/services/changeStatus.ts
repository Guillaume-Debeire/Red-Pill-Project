import { updateFilmStatus } from '$lib/api/userFilmEntry';
import type { FilmStatus } from '$lib/types/FilmStatus.types';
import type { UserFilmEntryClient } from '$lib/types/FilmUser.types';
import { Prisma } from '@prisma/client';

interface Params {
	userFilmEntryClient: UserFilmEntryClient;
	status: FilmStatus;
	saving: boolean;
}
export async function changeStatus({ userFilmEntryClient, status, saving }: Params) {
	if (!userFilmEntryClient) return;
	saving = true;
	try {
		const updated = await updateFilmStatus(userFilmEntryClient.filmId, status);
		userFilmEntryClient.userStatus = updated.userStatus;
	} finally {
		saving = false;
	}
}
