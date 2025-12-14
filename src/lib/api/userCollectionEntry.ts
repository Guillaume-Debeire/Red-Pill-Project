import { PUBLIC_TMDB_KEY } from '$env/static/public';
import { TMDB_API } from '$lib/services/tmdb/tmdb';
import type { UserCollectionEntryClient } from '$lib/types/UserCollection.types';
import type { BelongsToCollection } from '@prisma/client';

export async function getUserCollectionEntryByCollectionId(
	id: number
): Promise<UserCollectionEntryClient | null> {
	try {
		// 1️⃣ Essayer la base interne
		const localRes = await fetch(`/api/user-collection-entry/${id}`);

		if (localRes.ok) {
			const localData = (await localRes.json()) as UserCollectionEntryClient;
			console.log('userCollection', localData);
			return localData;
		}
		return null;
	} catch (e) {
		throw new Error();
	}
}

export async function getBelongsToCollectionById(id: number): Promise<BelongsToCollection | null> {
	try {
		// 1️⃣ Essayer la base interne
		const localRes = await fetch(`/api/user/belongs-to-collection/${id}`);

		if (localRes.ok) {
			const localData = (await localRes.json()) as BelongsToCollection;

			return localData;
		}

		return null;
	} catch (e) {
		throw new Error();
	}
}

export async function getOrCreateBelongsToCollectionById(
	id: number
): Promise<BelongsToCollection | null> {
	try {
		// 1️⃣ Base interne
		const localCollection = await getBelongsToCollectionById(id);
		if (localCollection) {
			return localCollection;
		}

		// 2️⃣ TMDB
		const tmdbRes = await fetch(
			`${TMDB_API}/collection/${id}?api_key=${PUBLIC_TMDB_KEY}&language=fr-FR`
		);

		if (!tmdbRes.ok) {
			return null;
		}

		const tmdbCollection = await tmdbRes.json();

		// 3️⃣ Création en DB
		const createRes = await fetch('/api/user/belongs-to-collection', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				tmdbId: tmdbCollection.tmdbId,
				name: tmdbCollection.name,
				posterPath: tmdbCollection.poster_path,
				backdropPath: tmdbCollection.backdrop_path
			})
		});

		if (!createRes.ok) {
			return null;
		}

		return (await createRes.json()) as BelongsToCollection;
	} catch (e) {
		console.error('getOrCreateBelongsToCollectionById error', e);
		return null;
	}
}

export async function getOrCreateCollectionEntryById(
	collectionId: number
): Promise<UserCollectionEntryClient | null> {
	try {
		// 1️⃣ Entry utilisateur
		const existingEntry = await getUserCollectionEntryByCollectionId(collectionId);
		if (existingEntry) {
			return existingEntry;
		}

		// 2️⃣ S'assurer que la collection existe
		const collection = await getOrCreateBelongsToCollectionById(collectionId);
		if (!collection) {
			return null;
		}
		// 3️⃣ Créer l'entry utilisateur
		const createRes = await fetch('/api/user-collection-entry', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				collectionId: collection.tmdbId,
				entryStatus: 'A_VOIR'
			})
		});

		if (!createRes.ok) {
			return null;
		}

		return (await createRes.json()) as UserCollectionEntryClient;
	} catch (e) {
		console.error('getOrCreateCollectionEntryById error', e);
		return null;
	}
}
